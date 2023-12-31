import { defineStore } from "pinia";
import { ref } from "vue";
import { IMessage } from "../types/message.interface";

export const useMessageStore = defineStore(
  "messagestore",
  () => {
    const messageList = ref<Partial<IMessage>[]>([]);

    const cleanLocalHistory = () => (messageList.value = []);

    return { messageList, cleanLocalHistory };
  },
  {
    persist: true,
  }
);
