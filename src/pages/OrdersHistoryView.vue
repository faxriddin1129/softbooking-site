<template>
  <div class="dark:bg-black-input config-border-radius bg-white-card p-3 transition-150">
    <h1 class="text-[18px] dark:text-gray-300 transition-150 hidden sm:block">{{ $t("34") }}</h1>
    <div v-if="loading" class="text-center dark:text-gray-300 transition-150">Loading...</div>
    <div v-else>
      <OrdersListComponent :data="data"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import OrdersListComponent from "@/components/common/OrdersListComponent.vue";
import {onMounted, ref} from "vue";
import {useApi} from "@/composables/useApi";
import type {ICheckUser} from "@/types";
import {ElNotification} from "element-plus";

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const loading = ref(true)
const data = ref()

const getOrders = async function () {
  try {
    const res = await useApi().$get<ICheckUser>("v1/flight/orders-history?include=services");
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

onMounted(() => {
  getOrders()
})

document.title = t("34")
</script>
<style scoped>

</style>