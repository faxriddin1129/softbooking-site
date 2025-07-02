<template>
  <div class="grid grid-cols-12 mb-10 sm:mb-0">
    <div class="sm:col-span-12 col-span-12 sm:pe-1 mt-2">
      <div class="dark:bg-black-input config-border-radius bg-white-card p-3 transition-150 dark:text-gray-300 text-white flex gap-2 overflow-x-auto">
        <button @click="modeFunc($t('99'))" class="btn min-w-[150px] bg-theme-btn shadow dark:border-black-btn dark:text-white cursor-pointer transition-150">{{$t('99')}}</button>
        <button @click="modeFunc($t('100'))" class="btn min-w-[150px] bg-theme-btn shadow dark:border-black-btn dark:text-white cursor-pointer transition-150">{{$t('100')}}</button>
        <button @click="modeFunc($t('101'))" class="btn min-w-[150px] bg-theme-btn shadow dark:border-black-btn dark:text-white cursor-pointer transition-150">{{$t('101')}}</button>
        <button @click="modeFunc($t('103'))" class="btn min-w-[150px] bg-theme-btn shadow dark:border-black-btn dark:text-white cursor-pointer transition-150">{{$t('103')}}</button>
      </div>
    </div>
    <div class="sm:col-span-12 col-span-12 sm:pe-1 mt-2">
        <h1 class="dark:text-gray-300 text-center text-xl transition-150">{{modeVal}}</h1>
    </div>
    <div v-if="modeVal === $t('99')" class="sm:col-span-6 col-span-12 sm:pe-1 mt-2">
      <div class="dark:bg-black-input config-border-radius bg-white-card p-8 transition-150 dark:text-gray-300">
        <div class="dark:border-black-card border border-white transition-150 p-2 config-border-radius mb-1"><b>First Name:</b> {{userData?.userDetail?.first_name}}</div>
        <div class="dark:border-black-card border border-white transition-150 p-2 config-border-radius mb-1"><b>Last Name:</b> {{userData?.userDetail?.last_name}}</div>
        <div class="dark:border-black-card border border-white transition-150 p-2 config-border-radius mb-1"><b>Middle Name:</b> {{userData?.userDetail?.middle_name}}</div>
        <div class="dark:border-black-card border border-white transition-150 p-2 config-border-radius mb-1"><b>Address:</b> {{userData?.userDetail?.address}}</div>
      </div>
    </div>
    <div v-if="modeVal === $t('99')" class="sm:col-span-6 col-span-12 sm:pe-1 mt-2">
      <div class="dark:bg-black-input config-border-radius bg-white-card p-8 transition-150 dark:text-gray-300">
        <div class="dark:border-black-card border border-white transition-150 p-2 config-border-radius mb-1"><b>Phone:</b> {{userData?.phone}}</div>
        <div class="dark:border-black-card border border-white transition-150 p-2 config-border-radius mb-1"><b>Email:</b> {{userData?.email}}</div>
        <div class="dark:border-black-card border border-white transition-150 p-2 config-border-radius mb-1"><b>Stock Ticket:</b> {{userData?.stock_ticket}}%</div>
        <div class="dark:border-black-card border border-white transition-150 p-2 config-border-radius mb-1"><b>Stock Shop:</b> {{userData?.stock_shop}}%</div>
      </div>
    </div>
    <div v-if="modeVal === $t('101')" class="sm:col-span-12 col-span-12 sm:pe-1 mt-2">
      <OrdersAllView/>
    </div>
    <div v-if="modeVal === $t('100')" class="sm:col-span-12 col-span-12 sm:pe-1 mt-2">
      <TransactionsComponent/>
    </div>
    <div v-if="modeVal === $t('103')" class="sm:col-span-12 col-span-12 sm:pe-1 mt-2 dark:text-gray-300">
<!--      <div>{{ $t("109") }}..</div>-->
      <div>
        {{ $t("110") }}: <a target="_blank" href="https://t.me/help_softbooking" class="text-blue-600">@help_softbooking</a>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

import {onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import {useAuthStore} from "@/stores/auth";
import {useRouter} from "vue-router";
import OrdersAllView from "@/pages/OrdersAllView.vue";
import TransactionsComponent from "@/components/common/TransactionsComponent.vue";

const router = useRouter();
const authStore = useAuthStore()
const userData = ref(authStore.user?.data?.data)
const role_id = ref(authStore.user?.data?.data?.role_id)
const { t } = useI18n();
const modeVal = ref(t("99"))


const modeFunc = async function (mode){
  modeVal.value = mode
}

const checkAgency = async function (){
  if (role_id.value !== 3){
    await router.push({ name: "Home" });
  }
}

onMounted( () => {
  checkAgency()
})

document.title = t('98')
</script>
<style scoped>

</style>