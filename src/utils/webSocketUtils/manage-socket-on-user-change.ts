import { useUserStore } from "@/store/user";
import { useWebSocketStore } from "@/store/webSocket";

const userStore = useUserStore();
const webSocketStore = useWebSocketStore();

export function connectDisconnectSocketOnUserLogin() {
  userStore.$subscribe((a, userState) => {
    if (userState.user) {
      // user login or authenticate
      webSocketStore.reconnectSocket();
    } else {
      webSocketStore.disconnectSocketIfConnected();
    }
  });
}
