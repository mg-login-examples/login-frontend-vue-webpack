import { Emitter } from "mitt";

import { SocketEvents } from "@/types/socket-event-emitter.type";

export const WebSocketWrapper = (
  webSocketUrl: string,
  socketEventEmitter: Emitter<SocketEvents>,
  wrapper: { socket: WebSocket } | null = null
): { socket: WebSocket } => {
  const socket = new WebSocket(webSocketUrl);
  wrapper = wrapper ? wrapper : { socket: socket };

  socket.onopen = function (ev: Event) {
    socketEventEmitter.emit("socketConnected");
  };

  socket.onerror = function (ev) {
    console.log("WebSocket Error: ", ev);
  };

  // Reconnect logic
  socket.onclose = function (ev) {
    if (ev.code === 1006 || !ev.wasClean) {
      socketEventEmitter.emit("socketDisconnected");
      console.log(
        "Websocket closed unexpectedly. Trying to reconnect in 1 sec..."
      );
      setTimeout(function () {
        const throwAwayWrapper = WebSocketWrapper(
          webSocketUrl,
          socketEventEmitter,
          wrapper
        );
        (wrapper as { socket: WebSocket }).socket = throwAwayWrapper.socket;
      }, 1000);
    } else {
      console.log("Websocket closed");
    }
  };

  // Emit payload on message
  socket.onmessage = (ev) => {
    const obj = JSON.parse(ev.data);
    if (typeof obj != "object") return;
    socketEventEmitter.emit("message", obj);
  };

  if (!wrapper) {
    wrapper = { socket: socket };
  } else {
    wrapper.socket = socket;
  }

  return wrapper as { socket: WebSocket };
};

export function getWebSocketUrlFromWindow(webSocketPath: string) {
  const loc = window.location;
  let new_uri;
  if (loc.protocol === "https:") {
    new_uri = "wss:";
  } else {
    new_uri = "ws:";
  }
  new_uri += "//" + loc.host;
  new_uri += webSocketPath;
  return new_uri;
}
