<template>
  <div class="chat">
    <MessageList :messageList="messageStore.messageList" />

    <div class="editor">
      <textarea
        v-model="editor_input"
        type="text"
        @keydown.enter.prevent="sendMessage"
        class="editor_input"
      />
      <span class="editor_send" @click="sendMessage">Send</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import MessageList from "../components/MessageList.vue";
import { ElMessage } from "element-plus";
import { useUserStore } from "../stores/user.store";
import { useMessageStore } from "../stores/message.store";
import { client } from "../libs/socket.io";

onMounted(() => {
  client.connect();
});

const userStore = useUserStore();
const messageStore = useMessageStore();

const editor_input = ref<string>();

client.on("connect", () => {
  ElMessage.success("Socket connected.");
});

client.on("message", (message) => {
  messageStore.messageList.push(message);
});

const sendMessage = () => {
  if (!editor_input.value) {
    ElMessage.error("Please input message.");
    return;
  }
  if (!userStore.user) {
    ElMessage.error("Please create user first.");
    localStorage.removeItem("user");
  } else {
    client.emit("createMessage", {
      userId: userStore.user.id,
      content: editor_input.value,
    });
    editor_input.value = "";
  }
};
</script>
<style scoped>
.chat {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 60vw;
  height: 60vh;
  background: #eeeeee;
  border-radius: 5px;
  margin: 0 auto;
}
.editor {
  display: flex;
  flex-direction: column;
  background: white;
  margin: 5px;
  border-radius: 5px;
}
.editor_input {
  resize: none;
  border: none;
  border-radius: 2px;
  outline: none;
  padding: 10px;
}
.editor_send {
  width: fit-content;
  padding: 3px 6px;
  border-radius: 3px;
  cursor: pointer;
  margin-left: auto;
  user-select: none;
  transition: all 0.3s ease-in-out;
  color: rgb(0, 132, 255);
}
.editor_send:hover {
  text-shadow: rgb(0, 153, 255) 1px 0 10px;
}
</style>
