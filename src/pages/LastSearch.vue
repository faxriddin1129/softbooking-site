<template>
  <div class="col-span-12 mb-2">
    <h1 class="text-theme transition-150 dark:text-white text-center leading-6 font-bold mt-5 md:mt-5 mb-4 md:mb-0">
      <span class="xl:text-[44px] lg:text-[40px] sm:text-[30px] text-[30px]">
        {{$t('22')}}
      </span>
    </h1>
  </div>
  <ReadyRouteComponent/>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import ReadyRouteComponent from "@/components/common/ReadyRouteComponent.vue";

document.title = t('21')
</script>
<style scoped>

</style>