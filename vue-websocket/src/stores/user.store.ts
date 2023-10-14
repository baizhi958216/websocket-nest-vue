import { defineStore } from "pinia";
import { ref } from "vue";

interface IUser {
  username: string;
  id: string;
}

export const useUserStore = defineStore(
  "userstore",
  () => {
    const user = ref<IUser>();
    const saveuser = (user1: IUser) => {
      user.value = user1;
    };
    const logOut = () => {
      user.value = undefined;
    };

    return { user, saveuser, logOut };
  },
  {
    persist: true,
  }
);
