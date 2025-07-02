<template>
  <div>
    <div
        id="g_id_onload"
        :data-client_id="clientId"
        data-callback="handleCredentialResponse"
        data-auto_select="true"
        data-prompt_parent_id="g_id_signin"
    ></div>
    <div
        class="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
    ></div>
  </div>
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import {useAuthStore} from "@/stores/auth";
import {useApi} from "@/composables/useApi";
import type {IGetTokenResponse} from "@/types";
import {useRouter} from "vue-router";

const clientId = "309333771709-nico0mqt8fkc7unb11373d0siiaec2pv.apps.googleusercontent.com";
const router = useRouter();
const store = useAuthStore();
const handleCredentialResponse = (response: any) => {
  loginViaGoogle(response?.credential);
};

async function loginViaGoogle(token: string) {
  try {
    const res = await useApi().$get<IGetTokenResponse>(
        "v1/user/login-by-google",
        {
          params: {
            token,
          },
        },
    );
    store.setTokens(res.data.data.token);
    await store.fetchUser();
    await router.push({name: "Profile"});
  } catch (err) {
    console.log(err);
  }
}

onMounted(() => {
  (window as any).handleCredentialResponse = handleCredentialResponse;
  const script = document.createElement("script");
  script.src = "https://accounts.google.com/gsi/client";
  document.head.appendChild(script);
});
</script>

<style scoped></style>
