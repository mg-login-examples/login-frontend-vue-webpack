<template>
  <div class="h-full flex flex-col items-center bg-slate-100">
    <div class="w-96 h-full bg-white p-4">
      <div v-if="!chatEntered" class="h-full flex justify-center items-center">
        <div class="w-48">
          <input
            type="text"
            placeholder="Room"
            v-model="chatName"
            class="p-2 my-4 w-full border"
          />
          <button
            @click="requestChatRoomEntry"
            class="px-2 py-2 my-4 bg-slate-200 w-full"
          >
            Enter Chat Room
          </button>
        </div>
      </div>
      <div v-if="chatEntered" class="h-full flex flex-col">
        <div class="w-full flex">
          <button class="p-2" @click="leaveChatRoom">
            <font-awesome-icon icon="arrow-left" />
          </button>
          <div class="grow flex justify-center p-2">
            {{ chatName }}
          </div>
          <div class="w-8"></div>
        </div>
        <div
          class="flex flex-col flex-grow overflow-auto"
          ref="chatMessagesViewEl"
        >
          <div
            v-for="(message, index) in chatMessages"
            :key="index"
            class="my-1 bg-slate-200 px-2 py-1 flex"
          >
            <div>{{ message.text }}</div>
            <div class="flex-grow"></div>
            <div class="text-slate-500 text-right">{{ message.user }}</div>
          </div>
        </div>
        <input
          v-model="messageToSendText"
          @keyup.enter="sendChatMessage"
          type="text"
          placeholder="Chat"
          class="p-2 border-2"
        />
        <button @click="sendChatMessage" class="p-2 my-2 bg-blue-200">
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted, nextTick } from "vue";

import { useUserStore } from "@/store/user";
import { useWebSocketStore } from "@/store/webSocket";
import { SocketReceiveChannelSubscriptionStatus } from "@/models/socket-receive-channel-subscription-status.model";
import { SocketReceiveChannelMessage } from "@/models/socket-receive-channel-message.model";
import { GroupChatMessage } from "@/models/group-chat-message.model";

const userStore = useUserStore();
const webSocketStore = useWebSocketStore();

const chatName = ref("");
const chatEntered = ref(false);
const roomChannelName = computed(() => `group-chat/${chatName.value}`);

const chatMessages = ref<GroupChatMessage[]>([]);
const messageToSendText = ref("");
const chatMessagesViewEl = ref<HTMLElement>();

// setup listener to handle channel subscription success / failure
webSocketStore.socketEventEmitter.on(
  "channelSubscriptionStatus",
  (channelSubscription: SocketReceiveChannelSubscriptionStatus) => {
    if (channelSubscription.channel === roomChannelName.value) {
      chatEntered.value = channelSubscription.subscribed;
      if (!channelSubscription.subscribed) {
        webSocketStore.socketEventEmitter.off(
          "channelMessage",
          handleChatRoomIncommingMessages
        );
      }
    }
  }
);
function requestChatRoomEntry() {
  if (chatName.value) {
    // setup listener to handle incomming channel messages
    webSocketStore.socketEventEmitter.on(
      "channelMessage",
      handleChatRoomIncommingMessages
    );
    // subscribe to receive messages from chat room
    webSocketStore.subscribeToChannel(roomChannelName.value);
  }
}
function leaveChatRoom() {
  webSocketStore.unsubscribeFromChannel(roomChannelName.value);
  chatEntered.value = false;
  webSocketStore.socketEventEmitter.off(
    "channelMessage",
    handleChatRoomIncommingMessages
  );
  chatName.value = "";
}
function sendChatMessage() {
  if (webSocketStore.socketReady && userStore.user && messageToSendText.value) {
    webSocketStore.sendBySocketToChannel(roomChannelName.value, {
      text: messageToSendText.value,
    });
    messageToSendText.value = "";
  }
}
function handleChatRoomIncommingMessages(
  channelMessage: SocketReceiveChannelMessage
) {
  if (channelMessage.channel === roomChannelName.value) {
    const groupChatMessage = channelMessage.message as GroupChatMessage;
    chatMessages.value.push(groupChatMessage);
    nextTick(() => {
      chatMessagesViewEl.value?.scrollTo(
        0,
        chatMessagesViewEl.value?.scrollHeight
      );
    });
  }
}

onUnmounted(() => {
  leaveChatRoom();
});
</script>
