<template>
  <div class="relative h-full" ref="target">
    <div
        class="text-[16px] dark:text-gray-400 dark:bg-black-input py-3 config-border-radius-card border border-theme dark:border-none flex justify-center items-center gap-1">
      <UserIcon :size="16"/>

      <div class="mlx-1">
        <span>{{ $t("adult") }} {{ form.adult_qnt }}, </span>
        <span v-if="form.child_qnt > 0"
        >{{ $t("child") }} {{ form.child_qnt }},
      </span>
        <span v-if="form.infant_qnt > 0"
        >{{ $t("infant") }} {{ form.infant_qnt }},
      </span>
      </div>

      <span v-if="form.class === 'B'" class="lowercase">{{ $t("business") }}</span>
      <span v-if="form.class === 'E'" class="lowercase">{{ $t("economic") }}</span>
    </div>

    <div class="dropdown-content bg-white dark:bg-black-input rounded-lg absolute mt-2 right-0 w-full z-10 px-5 py-4">

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
            class="px-4 py-2.5 flex justify-around config-border-radius border border-theme dark:border-black outline-none dark:bg-black dark:text-white"
        >

          <div class="flex justify-center items-center">
            <label for="economic">{{ $t("economic") }}</label>
            <input class="ml-1" v-model="form.class" id="economic" value="E" type="radio">
          </div>

          <div class="flex justify-center items-center">
            <label for="business">{{ $t("business") }}</label>
            <input class="ml-1" v-model="form.class" id="business" value="B" type="radio">
          </div>


        </div>
      </div>

    </div>
  </div>


</template>

<script setup lang="ts">
import {ref} from "vue";
import {CirclePlus, CircleMinus, UserIcon} from "lucide-vue-next";

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
const target = ref(null);

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

</script>

<style scoped>

</style>