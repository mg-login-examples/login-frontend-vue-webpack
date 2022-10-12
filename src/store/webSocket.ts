import { defineStore } from "pinia";
import mitt, { Emitter } from "mitt";

import {
  getWebsocketManager,
  WebSocketManager,
} from "@/utils/webSocketUtils/websocket-manager";
import { SocketEvents } from "@/utils/webSocketUtils/socket-event-emitter.type";

const socketEventEmitter = mitt<SocketEvents>();

interface WebSocketState {
  socketUrl: string;
  socketManager: WebSocketManager | null;
  socketEventEmitter: Emitter<SocketEvents>;
  channelSubscribeCallbacksForSocketReconnect: {
    channel: string;
    callback: () => void;
  }[];
}

export const useWebSocketStore = defineStore("websocket", {
  state: (): WebSocketState => ({
    socketUrl: process.env.VUE_APP_BACKEND_WEBSOCKET_URL,
    socketManager: null,
    socketEventEmitter: socketEventEmitter,
    channelSubscribeCallbacksForSocketReconnect: [],
  }),
  getters: {
    socketReady: (state) => state.socketManager?.socket.readyState,
  },
  actions: {
    connectSocketIfNotConnected() {
      if (!this.socketManager) {
        this.socketManager = getWebsocketManager(
          this.socketUrl,
          this.socketEventEmitter
        );
      }
    },
    disconnectSocketIfConnected() {
      if (this.socketManager) {
        this.socketManager.socket.close();
        this.socketManager = null;
        for (const item of this.channelSubscribeCallbacksForSocketReconnect) {
          this.socketEventEmitter.off("socketConnected", item.callback);
        }
        this.channelSubscribeCallbacksForSocketReconnect = [];
      }
    },
    reconnectSocket() {
      this.disconnectSocketIfConnected();
      this.connectSocketIfNotConnected();
    },
    sendBySocket(payload: { action: string; channel: string; data?: object }) {
      if (this.socketManager) {
        const payload_as_string = JSON.stringify(payload);
        this.socketManager.socket.send(payload_as_string);
      }
    },
    subscribeToChannel(channelName: string) {
      const sendSubscribeMessage = () => {
        this.sendBySocket({ action: "subscribe", channel: channelName });
      };
      sendSubscribeMessage();
      this.socketEventEmitter.on("socketConnected", sendSubscribeMessage);
      this.channelSubscribeCallbacksForSocketReconnect.push({
        channel: channelName,
        callback: sendSubscribeMessage,
      });
    },
    unsubscribeFromChannel(channelName: string) {
      this.sendBySocket({ action: "unsubscribe", channel: channelName });
      this.channelSubscribeCallbacksForSocketReconnect =
        this.channelSubscribeCallbacksForSocketReconnect.filter(
          (item) => item.channel !== channelName
        );
    },
    sendBySocketToChannel(channelName: string, payload: object) {
      this.sendBySocket({
        action: "message",
        channel: channelName,
        data: payload,
      });
    },
  },
});
