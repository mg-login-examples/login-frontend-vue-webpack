import { Emitter } from "mitt";

import { SocketEvents } from "@/utils/webSocketUtils/socket-event-emitter.type";
import { SocketReceiveChannelSubscriptionStatus } from "@/models/socket-receive-channel-subscription-status.model";
import { SocketReceiveChannelMessage } from "@/models/socket-receive-channel-message.model";

export type WebSocketManager = { socket: WebSocket };

export function getWebsocketManager(
  webSocketUrl: string,
  socketEventEmitter: Emitter<SocketEvents>
): WebSocketManager {
  const socket = getSocket(webSocketUrl, socketEventEmitter);
  const websocketManager = { socket: socket };
  reconnectSocketIfClosedDueToError(
    websocketManager,
    webSocketUrl,
    socketEventEmitter
  );
  return websocketManager;
}

function getSocket(
  webSocketUrl: string,
  socketEventEmitter: Emitter<SocketEvents>
): WebSocket {
  const socket = new WebSocket(webSocketUrl);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  socket.onopen = function (ev: Event) {
    socketEventEmitter.emit("socketConnected");
  };

  socket.onerror = function (ev) {
    console.log("WebSocket Error: ", ev);
  };

  // Emit payload on message
  socket.onmessage = (ev) => {
    const socketReceiveData = JSON.parse(ev.data);
    if (
      socketReceiveData.channel &&
      socketReceiveData.subscribed !== undefined
    ) {
      socketEventEmitter.emit(
        "channelSubscriptionStatus",
        socketReceiveData as SocketReceiveChannelSubscriptionStatus
      );
    } else if (
      socketReceiveData.channel &&
      socketReceiveData.message !== undefined
    ) {
      socketEventEmitter.emit(
        "channelMessage",
        socketReceiveData as SocketReceiveChannelMessage
      );
    } else {
      socketEventEmitter.emit("otherMessage", socketReceiveData);
    }
  };

  return socket;
}

function reconnectSocketIfClosedDueToError(
  webSocketManager: WebSocketManager,
  webSocketUrl: string,
  socketEventEmitter: Emitter<SocketEvents>
) {
  const socket = webSocketManager.socket;
  socket.onclose = function (ev) {
    if (ev.code === 1006 || !ev.wasClean) {
      socketEventEmitter.emit("socketDisconnected");
      console.log(
        "Websocket closed unexpectedly. Trying to reconnect in 1 sec..."
      );
      setTimeout(function () {
        const newSocket = getSocket(webSocketUrl, socketEventEmitter);
        webSocketManager.socket = newSocket;
        reconnectSocketIfClosedDueToError(
          webSocketManager,
          webSocketUrl,
          socketEventEmitter
        );
      }, 1000);
    } else {
      console.log("Websocket closed");
    }
  };
}
