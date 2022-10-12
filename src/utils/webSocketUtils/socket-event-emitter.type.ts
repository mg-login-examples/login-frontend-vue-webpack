import { SocketReceiveMessage } from "@/models/socket-receive-message.model";

export type SocketEvents = {
  message: SocketReceiveMessage;
  socketConnected: void;
  socketDisconnected: void;
};
