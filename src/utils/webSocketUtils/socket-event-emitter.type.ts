import { SocketReceiveChannelMessage } from "@/models/socket-receive-channel-message.model";
import { SocketReceiveChannelSubscriptionStatus } from "@/models/socket-receive-channel-subscription-status.model";

export type SocketEvents = {
  socketConnected: void;
  socketDisconnected: void;
  channelSubscriptionStatus: SocketReceiveChannelSubscriptionStatus;
  channelMessage: SocketReceiveChannelMessage;
  otherMessage: unknown;
};
