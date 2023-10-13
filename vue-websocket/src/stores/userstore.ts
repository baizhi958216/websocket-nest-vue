import { defineStore } from "pinia";
import { ref } from "vue";

interface IUser {
  username: string;
  id: string;
}

export const useUserStore = defineStore(
  "counter",
  () => {
    const user = ref<IUser>();
    function saveuser(user1: IUser) {
      user.value = user1;
    }

    return { user, saveuser };
  },
  {
    persist: true,
  }
);
