<template>
  <div class="chat">
    <div class="messages">
      <div v-for="(message, index) in messageList" :key="index">
        {{ message }}
      </div>
    </div>
    <div class="editor">
      <textarea
        v-model="editor_input"
        type="text"
        @keyup.enter="sendMessage"
        class="editor_input"
      />
      <span class="editor_send" @click="sendMessage">Send</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { useUserStore } from "../stores/userstore";

interface IMessage {
  id?: string;
  username: string;
  message?: string;
  createTime?: string;
}

const user = useUserStore();

const messageList = ref<IMessage[]>([]);

const editor_input = ref<string>();
const sendMessage = () => {
  if (!editor_input.value) {
    ElMessage.error("Please input message.");
    return;
  }
  if (!user.user) {
    ElMessage.error("Please create user first.");
    localStorage.removeItem("user");
  } else {
    messageList.value.push({
      username: user.user.username,
      message: editor_input.value,
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
.messages {
  width: 100%;
  height: 100%;
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
