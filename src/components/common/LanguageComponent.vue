<template>
  <div class="relative" ref="target">
    <button
        @click="toggleDropdown"
        class="flex gap-1 items-center bg-theme-btn btn shadow dark:text-white transition-150 cursor-pointer"
    >
      <span><Settings2 :size="18" /></span>
      <span class="hidden sm:block"> {{ configStore.currency }} </span>
      <span class="hidden sm:block"><Dot :size="6" class="p-0"/></span>
      <span class="hidden sm:block uppercase"> {{ locale }} </span>
    </button>
    <transition name="dropdown">
      <div v-if="isOpen" class="dropdown-content bg-white dark:bg-black-lg rounded-lg shadow-lg absolute mt-2 right-0 min-w-[260px] z-10">
        <div class="grid grid-cols-2 w-full">
          <div
              class="tab px-4 py-3 bg-gray-200 dark:bg-black-input  rounded-tl-lg leading-4 text-black dark:text-white cursor-pointer text-center transition duration-150"
              @click="activeTab = 'language'"
              :class="{ 'text-blue-500 bg-white dark:bg-black-lg': activeTab === 'language' }"
          >
            <div>Язык</div>
            <div> {{ currentLocale?.name }} </div>
          </div>
          <div
              class="tab px-4 py-3 bg-gray-200 dark:bg-black-input rounded-tr-lg leading-4 text-black dark:text-white cursor-pointer text-center transition duration-150"
              @click="activeTab = 'currency'"
              :class="{ 'text-blue-500 bg-white dark:bg-black-lg': activeTab === 'currency' }"
          >
            <div>Валюта</div>
            <div>{{ configStore.currency }}</div>
          </div>
        </div>
        <div class="p-4 text-black dark:text-white">
          <div v-if="activeTab === 'language' ">
            <ul>
              <li
                  class="py-1 hover:text-blue-500 transition duration-150 cursor-pointer"
                  v-for="(item, index) in locales"
                  :key="index"
                  @click="onLocaleChange(item.code)"
              >
                <span class="flex gap-2">
                  <span v-if="item.code === currentLocale?.code" class="text-blue">{{ item.name }}</span>
                  <span v-else>{{ item.name }}</span>
                  <span v-if="item.code === currentLocale?.code" class="text-blue"><Check/></span>
                </span>
              </li>
            </ul>
          </div>
          <div v-else>
            <ul>
              <li
                  class="py-1 hover:text-blue-500 transition duration-150 cursor-pointer"
                  v-for="(item, index) in currencies"
                  :key="index"
                  @click="onCurrencyChange(item.code)"
              >
                <span class="flex gap-1">
                  <span v-if="item.code === configStore.currency" class="text-blue">{{ item.name }}</span>
                  <span v-else>{{ item.name }}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import { Settings2, Dot, Check } from "lucide-vue-next";
import { onClickOutside } from '@vueuse/core';
import {useI18n} from "vue-i18n";
import { locales, currencies } from "@/layouts/data";
import {useConfigStore} from "@/stores/config";


interface Props {
  darkMode: boolean;
}

defineProps<Props>();
const { locale } = useI18n()
const configStore = useConfigStore()

const activeTab = ref('language');
const isOpen = ref(false);
const target = ref(null);
const localeS = ref(localStorage.getItem('locale'))

const currentLocale = computed(() => locales.find((el) => locale.value === el?.code))
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};
const onLocaleChange = (code: string) => {
  localStorage.setItem('locale', code)
  locale.value = code
  window.location.reload()
}
const onCurrencyChange = (code: string) => {
  localStorage.setItem('currency', code)
  configStore.currency = code
}

onClickOutside(target, () => isOpen.value = false);
</script>

<style scoped>

</style>
