<template>
  <el-dialog
    v-model="props.visable"
    title="Create User: "
    :before-close="handleClose"
  >
    <div style="display: flex; align-items: center; flex-wrap: wrap">
      <span style="margin: 0 5px">UserName: </span>
      <el-input v-model.trim="username" @keyup.enter="createUser" />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
        <el-button type="primary" @click="createUser"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ElMessage } from "element-plus";
import { useUserStore } from "../stores/user.store";
import { ref } from "vue";

const props = defineProps({
  visable: {
    type: Boolean,
  },
});

const user = useUserStore();

const emit = defineEmits(["close"]);

const username = ref<string>();

const handleClose = () => {
  emit("close");
};

const createUser = () => {
  fetch(`${import.meta.env.VITE_NEST_PORT}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.id) {
        ElMessage.success("Create user success.");
        user.saveuser(data);
        emit("close");
      }
    })
    .catch(() => {
      ElMessage.error("Oops, Failed to create user.");
    });
};
</script>
<style scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
