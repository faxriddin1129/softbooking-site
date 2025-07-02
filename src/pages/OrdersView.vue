<template>
  <div class="mb-12">

    <div class="dark:bg-black-input config-border-radius bg-white-card p-3 transition-150">
      <div class="flex justify-around items-center transition-150 dark:text-gray-300">
        <div v-if="tabMenu === 'active' " class="border-b-1 px-4 py-3 text-[14px] config-border-radius bg-theme text-white cursor-pointer">{{$t("33")}}</div>
        <div @click="tabMenu = 'active' " v-else class="border-b-1 px-4 py-3 text-[14px] cursor-pointer">{{$t("33")}}</div>
        <div v-if="tabMenu === 'history' " class="border-b-1 px-4 py-3 text-[14px] config-border-radius bg-theme text-white cursor-pointer">{{$t("34")}}</div>
        <div @click="tabMenu = 'history' " v-else class="border-b-1 px-4 py-3 text-[14px] cursor-pointer">{{$t("34")}}</div>
      </div>
    </div>

    <div v-if="tabMenu === 'active' " class="mt-2">
      <OrdersActiveView/>
    </div>

    <div v-if="tabMenu === 'history' " class="mt-2">
      <OrdersHistoryView/>
    </div>

  </div>
</template>
<script setup lang="ts">
import OrdersHistoryView from "@/pages/OrdersHistoryView.vue";
import OrdersActiveView from "@/pages/OrdersActiveView.vue";
import {ref} from "vue";

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const tabMenu = ref('active')



document.title = t("35")
</script>
<style scoped>

</style>