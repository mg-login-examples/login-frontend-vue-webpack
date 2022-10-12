import { Emitter } from "mitt";

import { SocketEvents } from "@/utils/webSocketUtils/socket-event-emitter.type";

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

  socket.onopen = function (ev: Event) {
    socketEventEmitter.emit("socketConnected");
  };

  socket.onerror = function (ev) {
    console.log("WebSocket Error: ", ev);
  };

  // Emit payload on message
  socket.onmessage = (ev) => {
    const obj = JSON.parse(ev.data);
    if (typeof obj != "object") return;
    socketEventEmitter.emit("message", obj);
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
