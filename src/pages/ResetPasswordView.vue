<template>
  <div class="mt-10 md:mt-20">
    <div class="grid grid-cols-12">
      <div class="md:col-span-4"></div>
      <div class="lg:col-span-4 mt-10 sm:mt-0 mb-20 md:col-span-6 xl:col-span-4 col-span-12">
        <div class="md:p-5 config-border-radius sm:dark:bg-black-input sm:bg-white-card py-4 px-3">
          <h1 class="text-center dark:text-gray-300 md:text-2xl text-xl">{{$t("30")}}</h1>
          <form @submit.prevent="onSubmit">
            <div class="flex items-center my-5 gap-1 dark:text-gray-300 transition-150 login-dev">
              <MailCheck :size="27" class="icon-login text-theme" />
              <input
                  required
                  v-model="form.phone_or_email"
                  id="email"
                  type="text"
                  autocorrect="off"
                  :placeholder="activeTab === 'email' ? $t('26'): $t('27')"
                  class="w-full px-3 py-2 config-border-radius-input dark:bg-black transition-150 border border-theme sm:border-none outline-none"
              />
            </div>

            <div v-show="showAdditionalFields" class="flex items-center my-5 gap-1 dark:text-gray-300 transition-150 login-dev">
              <LockKeyhole :size="27" class="icon-login" />
              <input
                  v-model="form.password"
                  id="password"
                  type="password"
                  :placeholder="$t('52')"
                  class="w-full px-3 py-2 config-border-radius-input dark:bg-black transition-150 border border-theme sm:border-none outline-none"
              />
            </div>
            <div v-show="showAdditionalFields" class="flex items-center my-5 gap-1 dark:text-gray-300 transition-150 login-dev">
              <LockKeyhole :size="27" class="icon-login" />
              <input
                  v-model="form.confirm_code"
                  id="confirm"
                  type="text"
                  :placeholder="$t('28')"
                  class="w-full px-3 py-2 config-border-radius-input dark:bg-black transition-150 border border-theme sm:border-none outline-none"
              />
            </div>

            <div class="flex items-center justify-between mt-8">
              <button class="bg-blue text-white px-10 config-border-radius-input py-2 w-full">
                {{ btnText }}
              </button>
            </div>
            <div class="mt-7 text-center dark:text-gray-300 transition-150 flex items-center justify-center">
              <div class="w-full h-0.5 bg-gray-300/40"></div>
              <router-link class="text-sm mx-5 text-blue" to="/login"><b>{{ $t('25') }}</b></router-link>
              <div class="w-full h-0.5 bg-gray-300/40"></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MailCheck, LockKeyhole } from "lucide-vue-next";
import { ref, watch } from "vue";
import { useApi } from "@/composables/useApi";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import {ElNotification} from "element-plus";
import {useI18n} from "vue-i18n";

const { t } = useI18n();


const store = useAuthStore();
const router = useRouter();
const activeTab = ref("email");
const checkUserResponse = ref(null);
const form = ref({
  phone_or_email: "",
  password: "",
  new_password: "",
  confirm_code: "",
});
const showAdditionalFields = ref(false);
const btnText = ref(t('53'))

const sendCode = async () => {
  btnText.value = 'Loading...'
  try {
    await useApi().$get(
        `/v1/user/send-code?phone_or_email=${form.value.phone_or_email}`
    );
    showAdditionalFields.value = true;
    ElNotification({
      title: 'Success',
      message: t('31'),
      type: 'success',
    })

    btnText.value = t('53')
  } catch (err) {
    ElNotification({
      title: 'Error',
      message: err?.response?.data?.message || t('54'),
      type: 'error',
    })
  }
  btnText.value = t('53')
};

const checkUser = async () => {
  btnText.value = 'Loading...'
  try {
    const res = await useApi().$get("v1/user/check-account", {
      params: {
        phone_or_email: form.value.phone_or_email,
      },
    });
    if (!res.data?.data.user) {
      ElNotification({
        title: 'Error',
        message: t('55'),
        type: 'error',
      })
    } else {
      checkUserResponse.value = res.data?.data.user;
      await sendCode();
    }
    btnText.value = t('53')
  } catch (err) {
    ElNotification({
      title: 'Error',
      message: err?.response?.data?.message || t('54'),
      type: 'error',
    })
    console.log(err);
  }
  btnText.value = t('53')
};

const getToken = async () => {
  btnText.value = 'Loading...'
  try {
    const res = await useApi().$post("/v1/user/sign-in", {
      phone_or_email: form.value.phone_or_email,
      password: form.value.password,
      confirm_code: form.value.confirm_code || undefined,
    });
    store.setTokens(res.data.data.token);
    await store.fetchUser();
    await router.push({ name: "Profile" });
    console.log(res);
    btnText.value = t('53')
  } catch (err) {
    ElNotification({
      title: 'Error',
      message: err?.response?.data?.message || t('54'),
      type: 'error',
    })
  }
  btnText.value = t('53')
};



const resetPassword = async () => {
  btnText.value = 'Loading...'
  try {
    await useApi().$post("/v1/user/reset-password", {
      phone_or_email: form.value.phone_or_email,
      new_password: form.value.password,
      confirm_code: form.value.confirm_code,
    });
    ElNotification({
      title: 'Success',
      message: t('56'),
      type: 'success',
    })
    await getToken()
    btnText.value = t('53')
  } catch (err) {
    ElNotification({
      title: 'Error',
      message: err?.response?.data?.message || t('54'),
      type: 'error',
    })
  }
  btnText.value = t('53')
};

const onSubmit = () => {
  if (!checkUserResponse.value) {
    checkUser();
  }else{
    resetPassword();
  }
};

// Watcher to hide additional fields when phone_or_email changes
watch(
    () => form.value.phone_or_email,
    () => {
      showAdditionalFields.value = false;
      checkUserResponse.value = null;
    }
);

document.title = t('30');
</script>

<style scoped>
.login-dev {
  position: relative;
}

.icon-login {
  position: absolute;
  right: 10px;
}
</style>
