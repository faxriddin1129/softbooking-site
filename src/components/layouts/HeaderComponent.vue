<template>
  <div class="hidden sm:block transition-150">
    <div class="grid grid-cols-12 bg-white-layout dark:bg-black-lg text-white shadow-sm rounded-b-3xl py-3 xl:px-20 md:px-20 px-2 transition-150">
      <div class="col-span-6 flex items-center transition-150">
        <a href="/" class="transition-150">
          <div class="i-logo transition-150">
<!--            <img class="transition-150" v-if="!darkMode" src="/logo/svg/light.svg" alt="softbooking.uz">-->
<!--            <img class="transition-150" v-else src="/logo/svg/logo-blue.svg" alt="softbooking.uz">-->
            <img class="transition-150" v-if="!darkMode" src="/img/lg_2.svg" alt="travelist.uz">
            <img class="transition-150" v-else src="/img/lg_1.svg" alt="travelist.uz">
          </div>
        </a>
      </div>
      <div class="col-span-6 flex items-center justify-end gap-2">
        <button class="btn bg-theme-btn shadow  dark:text-white  cursor-pointer transition-150" @click="toggleTheme">
          <MoonStar v-if="!darkMode" :size="22"/>
          <Sun v-else :size="22"/>
        </button>
        <a target="_blank" href="https://t.me/AviaBookingBot" class="hidden sm:block btn bg-theme-btn shadow dark:text-white transition-150 cursor-pointer">
          <Bot :size="22"/>
        </a>
        <LanguageComponent :darkMode="darkMode"/>
        <router-link to="profile" class="hidden sm:block btn bg-theme-btn shadow dark:text-white transition-150 cursor-pointer">
          <div class="flex gap-0.5 items-center justify-center min-w-[100px]">
            <User :size="18"/>
            <span>{{$t('profile')}}</span>
          </div>
        </router-link>
        <router-link v-if="authStore.user?.data?.data?.role_id === 3" to="/agency" class="hidden sm:block btn bg-theme-btn shadow dark:text-white transition-150 cursor-pointer">
          <div class="flex gap-0.5 items-center justify-center min-w-[100px]">
            <span>{{$t('104')}}</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";
import  {MoonStar, Sun, Bot, User} from "lucide-vue-next";
import LanguageComponent from "@/components/common/LanguageComponent.vue";
import {useConfigStore} from "@/stores/config";
import {useAuthStore} from "@/stores/auth";

const authStore = useAuthStore()
const darkMode = ref(true)
const configStore = useConfigStore()
const toggleTheme = () => {
  darkMode.value = !darkMode.value
  if(darkMode.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('mode','dark')
    configStore.mode = 'dark'
  }else {
    localStorage.setItem('mode','light')
    configStore.mode = 'light'
    document.documentElement.classList.remove('dark')
  }
}


if (!localStorage.getItem('mode')) {
  localStorage.setItem('mode','dark')
  darkMode.value = true
}

if (localStorage.getItem('mode') === 'dark') {
  document.documentElement.classList.add('dark')
  localStorage.setItem('mode','dark')
  configStore.mode = 'dark'
  darkMode.value = true
}
if (localStorage.getItem('mode') === 'light') {
  document.documentElement.classList.remove('dark')
  localStorage.setItem('mode','light')
  configStore.mode = 'light'
  darkMode.value = false
}

configStore.mode = localStorage.getItem('mode') || 'dark'

</script>
<style scoped>
  .i-logo{
    width: 50px;
    height: 40px;
  }
  .i-logo img{
    width: 100%
  }
</style>