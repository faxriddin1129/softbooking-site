<template>
  <div class="relative h-full" ref="target">
    <button
      @click="toggleDropdown"
      class="w-full h-full dark:bg-black-input config-border-radius-card dark:text-gray-400 border dark:border-black border-theme min-h-[50px] transition-150 cursor-pointer"
    >
      <span>{{ $t("adult") }} {{ form.adult_qnt }}, </span>
      <span v-if="form.child_qnt > 0"
        >{{ $t("child") }} {{ form.child_qnt }},
      </span>
      <span v-if="form.infant_qnt > 0"
        >{{ $t("infant") }} {{ form.infant_qnt }},
      </span>

      <span v-if="form.class === 'B'">{{ $t("business") }}</span>
      <span v-if="form.class === 'E'">{{ $t("economic") }}</span>
    </button>

    <transition name="dropdown">
      <div
        v-if="isOpen"
        class="dropdown-content bg-white dark:bg-black-input rounded-lg shadow-lg absolute mt-2 right-0 w-full z-10 px-5 py-4"
      >
        <div class="flex items-center justify-between">
          <div class="leading-4 dark:text-gray-400">
            <div class="text-[16px]">{{ $t("adult") }}</div>
            <div class="text-[13px]">{{ $t("adult_text") }}</div>
          </div>
          <div class="flex items-center gap-3">
            <button type="button">
              <CircleMinus
                :size="30"
                @click="adtMinusFunction"
                class="cursor-pointer dark:text-gray-400"
              />
            </button>
            <div class="dark:text-gray-400 w-[15px] text-center">
              {{ form.adult_qnt }}
            </div>
            <button type="button">
              <CirclePlus
                :size="30"
                @click="adtPlusFunction"
                class="cursor-pointer dark:text-gray-400"
              />
            </button>
          </div>
        </div>

        <div class="flex items-center justify-between mt-3">
          <div class="leading-4 dark:text-gray-400">
            <div class="text-[16px]">{{ $t("child") }}</div>
            <div class="text-[13px]">{{ $t("child_text") }}</div>
          </div>
          <div class="flex items-center gap-3">
            <button type="button">
              <CircleMinus
                :size="30"
                @click="chdMinusFunction"
                class="cursor-pointer dark:text-gray-400"
              />
            </button>
            <div class="dark:text-gray-400 w-[15px] text-center">
              {{ form.child_qnt }}
            </div>
            <button type="button">
              <CirclePlus
                :size="30"
                @click="chdPlusFunction"
                class="cursor-pointer dark:text-gray-400"
              />
            </button>
          </div>
        </div>

        <div class="flex items-center justify-between mt-3">
          <div class="leading-4 dark:text-gray-400">
            <div class="text-[16px]">{{ $t("infant") }}</div>
            <div class="text-[13px]">{{ $t("infant_text") }}</div>
          </div>
          <div class="flex items-center gap-3">
            <button type="button">
              <CircleMinus
                :size="30"
                @click="infMinusFunction"
                class="cursor-pointer dark:text-gray-400"
              />
            </button>
            <div class="dark:text-gray-300 w-[15px] text-center">
              {{ form.infant_qnt }}
            </div>
            <button type="button">
              <CirclePlus
                :size="30"
                @click="infPlusFunction"
                class="cursor-pointer dark:text-gray-400"
              />
            </button>
          </div>
        </div>

        <div class="mt-3">
          <div
            class="w-full px-4 py-2.5 config-border-radius border border-theme dark:border-black outline-none dark:bg-black dark:text-white"
          >
            <select
              v-model="form.class"
              class="w-full config-border-radius border-none outline-none dark:bg-black dark:text-gray-400"
            >
              <option value="E">{{ $t("economic") }}</option>
              <option value="B">{{ $t("business") }}</option>
            </select>
          </div>
        </div>
      </div>
    </transition>
  </div>

  <div class="block sm:hidden col-span-5 mt-1 ml-1">
    <div class="dark:text-gray-400 dark:bg-black-input py-1 config-border-radius-card">
      <div class="flex items-center justify-center">
        <CalendarDays :size="18"/>
        <div class="ml-1">{{$t('73')}}</div>
      </div>
    </div>
  </div>


</template>

<script setup lang="ts">
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import {CirclePlus, CircleMinus, CalendarDays} from "lucide-vue-next";

interface Props {
  searchForm: {
    adult_qnt: number;
    child_qnt: number;
    infant_qnt: number;
    class: string;
  };
}
const props = defineProps<Props>();

const form = ref(props.searchForm);
const isOpen = ref(false);
const target = ref(null);
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const adtPlusFunction = function () {
  if (form.value.adult_qnt < 9) {
    form.value.adult_qnt++;
    console.log("add", form.value);
  }
};
const adtMinusFunction = function () {
  if (form.value.adult_qnt > 1) {
    form.value.adult_qnt--;
  }
};
const chdPlusFunction = function () {
  if (form.value.child_qnt < 9) {
    form.value.child_qnt++;
  }
};
const chdMinusFunction = function () {
  if (form.value.child_qnt >= 1) {
    form.value.child_qnt--;
  }
};
const infPlusFunction = function () {
  if (form.value.infant_qnt < 9) {
    form.value.infant_qnt++;
  }
};
const infMinusFunction = function () {
  if (form.value.infant_qnt >= 1) {
    form.value.infant_qnt--;
  }
};

onClickOutside(target, () => (isOpen.value = false));
</script>

<style scoped></style>
