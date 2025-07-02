<template>
  <div>
    <h1 class="text-center text-[100px] md:text-[180px] dark:text-gray-300 transition-150">404</h1>
    <h1 class="text-center text-[20px] dark:text-gray-300 transition-150">{{$t('32')}}</h1>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

document.title = t('32')+ ' #404'
</script>
<style scoped>

</style>