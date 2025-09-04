<template>
  <div class="dark:text-gray-300 mt-3 px-3 mb-14 sm:mb-0">
    <h1 class="text-center">{{$t('privacy.title')}}</h1>

    <h2>{{$t('privacy.sections.introduction.title')}}</h2>
    <p class="p-3">{{$t('privacy.sections.introduction.content')}}</p>

    <h2>{{$t('privacy.sections.data_collection.title')}}</h2>
    <p class="px-3">{{$t('privacy.sections.data_collection.content')}}</p>
    <ul class="list-disc mx-10 mb-4">
      <li>{{$t('privacy.sections.data_collection.item_1')}}</li>
      <li>{{$t('privacy.sections.data_collection.item_2')}}</li>
      <li>{{$t('privacy.sections.data_collection.item_3')}}</li>
      <li>{{$t('privacy.sections.data_collection.item_4')}}</li>
    </ul>

    <h2>{{$t('privacy.sections.data_usage.title')}}</h2>
    <p class="px-3">{{$t('privacy.sections.data_usage.content')}}</p>
    <ul class="list-disc mx-10 mb-4">
      <li>{{$t('privacy.sections.data_usage.item_1')}}</li>
      <li>{{$t('privacy.sections.data_usage.item_2')}}</li>
      <li>{{$t('privacy.sections.data_usage.item_3')}}</li>
      <li>{{$t('privacy.sections.data_usage.item_4')}}</li>
      <li>{{$t('privacy.sections.data_usage.item_5')}}</li>
    </ul>

    <h2>{{$t('privacy.sections.data_disclosure.title')}}</h2>
    <p class="px-3">{{$t('privacy.sections.data_disclosure.content')}}</p>
    <ul class="list-disc mx-10 mb-4">
      <li>{{$t('privacy.sections.data_disclosure.item_1')}}</li>
      <li>{{$t('privacy.sections.data_disclosure.item_2')}}</li>
      <li>{{$t('privacy.sections.data_disclosure.item_3')}}</li>
    </ul>

    <h2>{{$t('privacy.sections.data_storage.title')}}</h2>
    <p class="px-3 mb-4">{{$t('privacy.sections.data_storage.content')}}</p>

    <h2>{{$t('privacy.sections.your_rights.title')}}</h2>
    <p class="px-3">{{$t('privacy.sections.your_rights.content')}}</p>
    <ul class="list-disc mx-10 mb-4">
      <li>{{$t('privacy.sections.your_rights.item_1')}}</li>
      <li>{{$t('privacy.sections.your_rights.item_2')}}</li>
      <li>{{$t('privacy.sections.your_rights.item_3')}}</li>
      <li>{{$t('privacy.sections.your_rights.item_4')}}</li>
    </ul>

    <h2>{{$t('privacy.sections.contact.title')}}</h2>
    <p class="px-3">{{$t('privacy.sections.contact.content')}}</p>
    <ul class="list-disc mx-10 mb-4">
      <li>{{$t('privacy.sections.contact.item_1')}} info@travelist.uz</li>
      <li>{{$t('privacy.sections.contact.item_2')}} sale@travelist.uz</li>
      <li>{{$t('privacy.sections.contact.item_3')}}</li>
    </ul>

    <h2>{{$t('privacy.sections.changes.title')}}</h2>
    <p class="px-3">{{$t('privacy.sections.changes.content')}}</p>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

document.title = t("29")
</script>
<style scoped>

</style>
