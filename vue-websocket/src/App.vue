<template>
  <div class="container">
    <div v-if="!user.user" class="createuser" @click="createUserVisible = true">
      Create User
    </div>

    <ChatBox />

    <CreateUser
      v-if="createUserVisible"
      :visable="createUserVisible"
      @close="closeCreateUser"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "./stores/userstore";
import CreateUser from "./components/CreateUser.vue";
import ChatBox from "./components/ChatBox.vue";

const user = useUserStore();

const createUserVisible = ref(false);

const closeCreateUser = () => {
  createUserVisible.value = false;
};
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
</style>
