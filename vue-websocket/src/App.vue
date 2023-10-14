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
      <div style="display: flex; align-items: center">
        <el-icon :size="20"><Avatar /></el-icon>
        <div>{{ userStore.user.username }}</div>
      </div>
    </div>

    <ChatBox />

    <div class="tools">
      <el-icon :size="20" @click="logOut"><BottomLeft /></el-icon>
      <el-icon :size="20" @click="cleanHistory">
        <Delete />
      </el-icon>
    </div>

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
import { Delete, Avatar, BottomLeft } from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";
import CreateUser from "./components/CreateUser.vue";
import ChatBox from "./components/ChatBox.vue";

const userStore = useUserStore();
const messageStore = useMessageStore();

const createUserVisible = ref(false);

const logOut = () => {
  ElMessageBox.confirm("Are you sure to logout this user?")
    .then(() => {
      userStore.logOut();
    })
    .catch(() => {
      // catch error
    });
};
const cleanHistory = () => {
  ElMessageBox.confirm("Are you sure to clean all messages locally?")
    .then(() => {
      messageStore.cleanLocalHistory();
    })
    .catch(() => {
      // catch error
    });
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
  margin: 20px;
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
.tools {
  display: flex;
  justify-content: flex-end;
  margin: 15px;
  gap: 20px;
  padding-right: 30px;
}
.tools > .el-icon {
  cursor: pointer;
}
</style>
