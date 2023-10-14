<template>
  <div class="messages">
    <div
      class="messages_container"
      v-for="message in messageList"
      :key="message.id"
      :style="{
        flexDirection: message.userId === user.user?.id ? 'row-reverse' : 'row',
      }"
    >
      <div
        class="messages_avatar"
        :style="{
          backgroundColor:
            message.userId === user.user?.id ? '#409EFF' : '#f56c6c',
        }"
      >
        {{ message.username?.charAt(0).toUpperCase() }}
      </div>
      <div class="message_content">
        {{ message.content }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from "../stores/user.store";
import { IMessage } from "../types/message.interface";

defineProps({
  messageList: {
    type: Array<Partial<IMessage>>,
  },
});

const user = useUserStore();
</script>
<style scoped>
.messages {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
.messages_container {
  display: flex;
  align-items: center;
  margin: 15px 10px;
}
.messages_avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: larger;
}
.message_content {
  background-color: white;
  padding: 8px 15px;
  border-radius: 5px;
  margin: 0 10px;
  max-width: 50%;
}
</style>
