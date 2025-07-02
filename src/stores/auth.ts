import { defineStore } from "pinia";
import { useApi } from "@/composables/useApi";
import type { IUser } from "@/types";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    user: null as IUser | null,
  }),
  actions: {
    getTokens() {
      return localStorage.getItem("access_token");
    },
    setTokens(token: string) {
      localStorage.setItem("access_token", token);
    },
    fetchUser() {
      return new Promise((resolve, reject) => {
        useApi()
          .$get<IUser>("/v1/user/get-me?include=userDetail")
          .then((res) => {
            this.user = res.data;
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    updateUser(data) {
      return new Promise((resolve, reject) => {
        useApi()
            .$put<IUser>("/v1/user/update?include=userDetail",data)
            .then((res) => {
              this.user = res.data;
              resolve(res.data);
            })
            .catch((err) => {
              reject(err);
            });
      });
    },
    removeToken() {
      return localStorage.removeItem("access_token");
    },
    logout() {
      this.removeToken();
      this.user = null;
    },
  },
});
