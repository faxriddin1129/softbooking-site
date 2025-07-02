<template>
  <div class="grid grid-cols-12 mb-10 sm:mb-0">
    <div class="sm:col-span-3 col-span-12 sm:pe-1 mt-2 hidden sm:block">
      <div class="dark:bg-black-input config-border-radius bg-white-card p-3 transition-150">
        <div class="flex items-center gap-2 dark:text-gray-300 transition-150 bg-white dark:bg-black mb-2 px-2 py-2 config-border-radius">
          <div class="flex justify-center w-full">
            <div>
              <div>
                <img class="w-[150px]" src="/logo/svg/logo-blue.svg" alt="">
              </div>
              <div class="text-center md:text-[25px]">
                SOFTBOOKING
              </div>
            </div>
          </div>
        </div>
        <div @click="updateTab('menu')" class="flex items-center gap-2 dark:text-gray-300 transition-150 bg-white dark:bg-black mb-2 px-2 py-2 config-border-radius cursor-pointer">
          <User v-if="menu === 'menu' " class="text-blue"/>
          <User v-else/>
          <div v-if="menu === 'menu'" class="text-blue">{{ $t("41") }}</div>
          <div v-else>{{ $t("41") }}</div>
        </div>
        <div @click="updateTab('active')" class="flex items-center gap-2 dark:text-gray-300 transition-150 bg-white dark:bg-black mb-2 px-2 py-2 config-border-radius cursor-pointer">
          <Ticket v-if="menu === 'active' " class="text-blue"/>
          <Ticket v-else/>
          <div v-if="menu === 'active' " class="text-blue">{{ $t("33") }}</div>
          <div v-else>{{ $t("33") }}</div>
        </div>
        <div @click="updateTab('history')" class="flex items-center gap-2 dark:text-gray-300 transition-150 bg-white dark:bg-black mb-2 px-2 py-2 config-border-radius cursor-pointer">
          <Ticket v-if="menu === 'history' " class="text-blue"/>
          <Ticket v-else/>
          <div v-if="menu === 'history' " class="text-blue">{{ $t("34") }}</div>
          <div v-else>{{ $t("34") }}</div>
        </div>
      </div>
    </div>
    <div class="sm:col-span-9 col-span-12 sm:ps-1 mt-2">

      <div v-if="menu === 'menu' ">

        <div v-if="role_id === 3" class="dark:bg-black-input config-border-radius bg-white-card p-3 transition-150 mb-3 block sm:hidden">
          <router-link to="/agency"  class="dark:text-gray-300 transition-150 text-[16px] font-bold text-center sm:text-left flex gap-2 items-center justify-center cursor-pointer">
            {{$t('104')}}
            <ArrowBigRightDash/>
          </router-link>
        </div>

        <div class="dark:bg-black-input config-border-radius bg-white-card py-3 px-4 sm:px-7 transition-150 mb-2">
          <h1 class="dark:text-gray-300 transition-150 text-[20px] font-bold text-center sm:text-left mb-3">{{ $t("41") }}</h1>
          <div class="grid grid-cols-12">

            <div class="col-span-12 sm:col-span-6 mb-5 icon-relative">

              <div v-if="role_id !== 3">
                <input v-model="model.email" placeholder="Email" class="w-full sm:w-80 dark:bg-black dark:text-gray-300 transition-150" type="email">
              </div>
              <div v-else>
                <input v-model="model.email" placeholder="Email" disabled class="w-full sm:w-80 dark:bg-black dark:text-gray-300 transition-150" type="email">
              </div>

              <Mail class="dark:bg-black dark:text-gray-300 transition-150 icon-input"/>
            </div>

            <div class="col-span-12 sm:col-span-6 mb-5 icon-relative">
              <input v-model="model.phone" :placeholder="$t('27')" class="w-full sm:w-80 dark:bg-black dark:text-gray-300 transition-150" type="tel">
              <Phone class="dark:bg-black dark:text-gray-300 transition-150 icon-input"/>
            </div>

            <div class="col-span-12 sm:col-span-6 mb-5 icon-relative">
              <input v-model="model.first_name" :placeholder="$t('6')" class="w-full sm:w-80 dark:bg-black dark:text-gray-300 transition-150" type="text">
              <UserIcon class="dark:bg-black dark:text-gray-300 transition-150 icon-input"/>
            </div>

            <div class="col-span-12 sm:col-span-6 mb-5 icon-relative">
              <input v-model="model.last_name" :placeholder="$t('5')" class="w-full sm:w-80 dark:bg-black dark:text-gray-300 transition-150" type="text">
              <UserIcon class="dark:bg-black dark:text-gray-300 transition-150 icon-input"/>
            </div>

            <div class="col-span-12">
              <button id="saveUpdateBtn" @click="saveUserInfo" type="button" class="bg-blue config-border-radius px-10 py-2 text-white">{{btnText}}</button>
            </div>




          </div>
          
        </div>

        <div class="dark:bg-black-input config-border-radius bg-white-card py-3 px-4 sm:px-7 mb-2 transition-150">

          <div class="dark:text-gray-300 font-bold grid grid-cols-2">
            <div class="col-span-2 sm:col-span-1 flex justify-center sm:justify-start">
              <div class="flex gap-2 items-center text-[20px]">
                <span class="text-yellow-400 dark:hidden block transition-150"><Sun/></span>
                <span class="text-purple-600 dark:block hidden transition-150"><MoonStar/></span>
                <span>{{$t('42')}}</span>
              </div>
            </div>
            <div class="col-span-2 sm:col-span-1">

              <div class="bg-white dark:bg-black py-1 px-2 config-border-radius mt-2 sm:mt-0">
                <div v-if="useConfig.mode === 'light'" class="flex gap-2">
                  <div @click="toggleTheme('light')" class="w-full text-center bg-white-card dark:bg-black-input px-4 sm:px-10 py-2 config-border-radius cursor-pointer">{{$t('43')}}</div>
                  <div @click="toggleTheme('dark')" class="w-full text-center px-4 sm:px-10 py-2 config-border-radius cursor-pointer">{{$t('44')}}</div>
                </div>

                <div v-if="useConfig.mode === 'dark'" class="flex gap-2">
                  <div @click="toggleTheme('light')" class="w-full text-center px-4 sm:px-10 py-2 config-border-radius cursor-pointer">{{$t('43')}}</div>
                  <div @click="toggleTheme('dark')" class="w-full text-center bg-white-card dark:bg-black-input px-4 sm:px-10 py-2 config-border-radius cursor-pointer">{{$t('44')}}</div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div class="dark:bg-black-input config-border-radius bg-white-card py-3 px-4 sm:px-7 transition-150 mb-2">
          <h1 class="dark:text-gray-300 transition-150 text-[20px] font-bold mb-2">{{$t('45')}}</h1>

          <div class="grid grid-cols-2">
            <div class="sm:col-span-1 col-span-2 mb-2">
              <label class="font-bold dark:text-gray-300 transition-150 me-2">{{$t('46')}}</label>
              <select v-model="locale" @change="updateLanguage()" class="rounded-md px-4 py-2 dark:bg-black dark:text-gray-300 outline-none border-none">
                <option v-for="(item,elem4) in locales" :key="elem4" :value="item.code">{{item.name}}</option>
              </select>
            </div>

            <div class="sm:col-span-1 col-span-2 mb-2">
              <label class="font-bold dark:text-gray-300 transition-150 me-2">{{$t('47')}}</label>
              <select v-model="currency" @change="updateCurrency()" class="rounded-md px-4 py-2 dark:bg-black dark:text-gray-300 outline-none border-none">
                <option v-for="(item,elem6) in currencies" :key="elem6" :value="item.code">{{item.name}}</option>
              </select>
            </div>
          </div>

        </div>

        <div class="block sm:hidden dark:bg-black-input config-border-radius bg-white-card p-3 transition-150 mb-2 dark:text-gray-300">
          <div class="col-span-12">
            <div>
              <h3 class="mb-4 font-bold uppercase">{{$t('contact')}}</h3>
              <ul>
                <li class="mb-1"><a href="mailto:info@softbooking.uz" class="flex gap-1 items-center"> <Mail :size="16"/> <span>info@softbooking.uz</span> </a></li>
                <li class="mb-1"><a href="mailto:sale@softbooking.uz" class="flex gap-1 items-center"> <Mail :size="16"/> <span>sale@softbooking.uz</span> </a></li>
                <li class="mb-1"><a href="tel:+998772650929" class="flex gap-1 items-center"> <Phone :size="16"/> <span>77 265 09 29</span> </a></li>
                <li class="mb-1"><a target="_blank" href="https://t.me/help_softbooking" class="flex gap-1 items-center"><Send :size="16"/> <span>@help_softbooking</span> </a></li>
                <li class="text-center"><a  target="_blank" class="text-blue" href="/public_offer_softbooking.pdf">Публичная оферта</a></li>
                <li class="text-center"><router-link class="text-blue" to="/privacy">{{ $t("29") }}</router-link></li>
              </ul>
            </div>
          </div>
        </div>

        <div class="dark:bg-black-input config-border-radius bg-white-card p-3 transition-150 mb-3">
          <h1 @click="logoutSys" class="dark:text-gray-300 transition-150 text-[16px] font-bold text-center sm:text-left flex gap-2 items-center justify-center cursor-pointer">
            <LogOut/>
            {{$t('48')}}
          </h1>
        </div>

      </div>

      <div v-if="menu === 'active' ">
        <OrdersActiveView/>
      </div>

      <div v-if="menu === 'history' ">
        <OrdersHistoryView/>
      </div>

    </div>
  </div>
</template>
<script setup lang="ts">
import {User, Ticket, Sun, MoonStar, LogOut, Mail, Phone, UserIcon, Send, ArrowBigRightDash} from "lucide-vue-next";
import {onMounted, ref} from "vue";
import {locales,currencies} from "@/layouts/data";
import {useConfigStore} from "@/stores/config";
import {useAuthStore} from "@/stores/auth";
import router from "@/router";
import { ElNotification } from 'element-plus'
import {useI18n} from "vue-i18n";
import OrdersActiveView from "@/pages/OrdersActiveView.vue";
import OrdersHistoryView from "@/pages/OrdersHistoryView.vue";
import {useRoute} from "vue-router";

const { t } = useI18n();
const route = useRoute();
const menu = ref('menu')
const useConfig = useConfigStore()
const authStore = useAuthStore()
const currency = ref(useConfig.currency)
const { locale } = useI18n()
const btnText = ref(t('50'))
const model = ref({
  phone:authStore.user?.data?.data?.phone,
  email:authStore.user?.data?.data?.email,
  first_name:authStore.user?.data?.data?.userDetail?.first_name,
  last_name:authStore.user?.data?.data?.userDetail?.last_name,
})
const role_id = ref(authStore.user?.data?.data?.role_id)

const updateTab = function (menuValue?: string){
  menu.value = menuValue
}
const toggleTheme = (mode = 'light') => {
  document.documentElement.classList.add(mode)
  localStorage.setItem('mode',mode)
  useConfig.mode = mode
  if (mode === 'light'){
    document.documentElement.classList.remove('dark')
  }
}

const logoutSys = () => {
  authStore.logout()
  router.push({'name':'Home'})
}

const updateCurrency = function (){
  useConfig.currency = currency.value
  localStorage.setItem('currency',currency.value)
}

const updateLanguage = function (){
  useConfig.locale = locale.value
  localStorage.setItem('locale',locale.value)
  window.location.reload()
}

const saveUserInfo = async () => {
  btnText.value = 'Loading...'
  try {
    await authStore.updateUser(model.value);
    ElNotification({
      title: 'Success',
      message: t("49"),
      type: 'success',
    })
    btnText.value = t('50')
  } catch (err) {
    ElNotification({
      title: 'Error',
      message: err?.response?.data?.message,
      type: 'error',
    })
    btnText.value = t('50')
  }
};

const res = function (){
  if(route.query.active == 1){
    menu.value = 'active'
  }
}

onMounted( () => {
  res()
})

document.title = t('51')
</script>
<style scoped>
input{
  border: none;
  outline: none;
  padding: 10px 50px;
  border-radius: 6px;
}
.icon-relative{
  position: relative;
}
.icon-input{
  position: absolute;
  left: 10px;
  top: 10px;
}
</style>