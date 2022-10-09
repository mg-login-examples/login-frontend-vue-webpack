import { defineStore } from "pinia";
import mitt, { Emitter } from "mitt";

import { WebSocketWrapper } from "@/utils/webSocketUtils";
import { SocketEvents } from "@/types/socket-event-emitter.type";

const socketEventEmitter = mitt<SocketEvents>();

interface WebSocketState {
  socketUrl: string;
  socketWrapper: { socket: WebSocket } | null;
  socketEventEmitter: Emitter<SocketEvents>;
}

export const useWebSocketStore = defineStore("websocket", {
  state: (): WebSocketState => ({
    socketUrl: process.env.VUE_APP_BACKEND_WEBSOCKET_URL,
    socketWrapper: null,
    socketEventEmitter: socketEventEmitter,
  }),
  getters: {
    socketReady: (state) => state.socketWrapper?.socket.readyState,
  },
  actions: {
    connect() {
      if (!this.socketWrapper) {
        this.socketWrapper = WebSocketWrapper(
          this.socketUrl,
          this.socketEventEmitter
        );
      }
    },
    disconnect() {
      if (this.socketWrapper) {
        this.socketWrapper.socket.close();
        this.socketWrapper = null;
      }
    },
    reconnect() {
      this.disconnect();
      this.connect();
    },
    sendBySocket(payload: { action: string; channel: string; data?: object }) {
      if (this.socketWrapper) {
        const payload_as_string = JSON.stringify(payload);
        this.socketWrapper.socket.send(payload_as_string);
      }
    },
    subscribeToChannel(channelName: string) {
      this.sendBySocket({ action: "subscribe", channel: channelName });
    },
    unsubscribeFromChannel(channelName: string) {
      this.sendBySocket({ action: "unsubscribe", channel: channelName });
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
