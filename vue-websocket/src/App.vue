<template>
  <div class="container">
    <div
      v-if="!userStore.user"
      class="createuser"
      @click="createUserVisible = true"
    >
      Create User
    </div>
    <div v-else class="user">
      <div>Current User: {{ userStore.user.username }}</div>
      <el-button
        type="danger"
        plain
        size="small"
        @click="messageStore.cleanLocalHistory"
        >Clean History</el-button
      >
    </div>

    <ChatBox />

    <CreateUser
      v-if="createUserVisible"
      :visable="createUserVisible"
      @close="createUserVisible = false"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "./stores/user.store";
import { useMessageStore } from "./stores/message.store";
import CreateUser from "./components/CreateUser.vue";
import ChatBox from "./components/ChatBox.vue";

const userStore = useUserStore();
const messageStore = useMessageStore();

const createUserVisible = ref(false);
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(#c2c1c1, #7e7e7e);
}

.createuser {
  color: white;
  margin-left: 10%;
  user-select: none;
  cursor: pointer;
  width: fit-content;
}
.user {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
  gap: 20px;
}
</style>
