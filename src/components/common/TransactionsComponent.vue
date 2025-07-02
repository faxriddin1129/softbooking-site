<template>
  <div class="dark:bg-black-input config-border-radius bg-white-card p-3 transition-150 p-7">
    <div v-if="loading" class="text-center dark:text-gray-300 transition-150">Loading...</div>
    <div v-else>
      <div class="div flex gap-4">
        <h6 class="text-xl dark:text-gray-300 transition-150 mb-3"><b>Balance: {{formatNumber( (data.balance || 0) )}} UZS</b></h6>
        <h6 class="text-xl dark:text-gray-300 transition-150 mb-3"><b>Credit Limit: {{formatNumber((authStore.user?.data.data.limit_credit || 0))}} UZS</b></h6>
      </div>
      <table v-if="data.data.length !== 0" class="table dark:text-gray-300 transition-150">
        <tr class="text-center">
          <th>ID</th>
          <th>{{ $t("108") }}</th>
          <th>{{ $t("15") }}</th>
          <th>{{ $t("107") }}</th>
          <th>{{ $t("106") }}</th>
        </tr>
        <tr v-for="(item,index) in data.data" :key="index" class="text-center">
          <td>#{{item.id}}</td>
          <td>{{item.order_id}}</td>
          <td v-if="item.amount > 0" class="text-green-600">+{{item.amount}}</td>
          <td v-else class="text-red-600">{{item.amount}}</td>
          <td>{{item.date_pay}}</td>
          <td class="uppercase">{{item.tag}}</td>
        </tr>
      </table>
      <div v-else class="text-center flex items-center justify-center gap-2 dark:text-gray-300 transition-150">
        <span class="sm:block hidden">{{$t('58')}}</span>
        <span><Search :size="18"/></span>
      </div>
    </div>

  </div>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useApi} from "@/composables/useApi";
import type {ICheckUser} from "@/types";
import {ElNotification} from "element-plus";

import { useI18n } from 'vue-i18n';
import {useAuthStore} from "@/stores/auth";
import {Search} from "lucide-vue-next";
const { t } = useI18n();
const authStore = useAuthStore()
const loading = ref(true)
const data = ref()

const getOrders = async function () {
  try {
    const res = await useApi().$get<ICheckUser>("v1/user/transactions");
    data.value = res?.data
    loading.value = false
  } catch (err) {
    ElNotification({
      title: 'Error',
      message: err?.response?.data?.message,
      type: 'error',
    })
  }
}

const formatNumber = (num) => {
  if (num < 0) {
    return '-' + Math.abs(num).toLocaleString('ru-RU');
  } else {
    return num.toLocaleString('ru-RU');
  }
};

onMounted(() => {
  getOrders()
})

document.title = t("100")
</script>
<style scoped>
.table{
  width: 100%;
}
.table tr td{
  padding: 5px;
  border: 1px solid #ffffff;
  transition: 0.2s ease-in-out;
}
.table tr th{
  padding: 5px;
  border: 1px solid #ffffff;
  transition: 0.2s ease-in-out;
}
.dark .table tr td{
  border: 1px solid #414142;
}
.dark .table tr th{
  border: 1px solid #414142;
}
</style>