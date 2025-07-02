<template>
  <div class="w-full h-full relative" ref="target">
    <div
        class="flex items-center w-full h-full config-border-radius-input"
        @click="isOpen = !isOpen"
        @mouseenter="focused = true"
        @mouseleave="focused = false"
    >
      <slot name="prefix"/>
      <input
          type="text"
          :value="modelValue"
          @focus="$emit('on-focus')"
          autocomplete="new password"
          :placeholder="placeholder"
          @input="
          $emit('update:modelValue', $event.target?.value);
          isOpen = true;
        "
          class="w-full h-full config-input-padding-search border dark:border-black border-theme min-h-[65px] sm:min-h-[50px] config-border-radius-card b-o-none dark:bg-black-input transition-150 dark:text-white"
      />
      <slot name="suffix">
        <div
            v-if="modelValue && focused"
            @click="$emit('update:modelValue', '')"
        ></div>
      </slot>
    </div>
    <Transition name="select" mode="out-in">
      <div
          v-if="isOpen && modelValue.length > 1"
          :class="{ '!min-h-fit': options.length <= 4 }"
          class="absolute shadow bg-white dark:bg-black-input py-2 mt-1.5 w-full rounded-[4px] z-10"
      >
        <Transition name="fade" mode="out-in">
          <div :key="loading + 'loader'">

            <ul
                class="autocomplete__dropdown max-h-[280px] transition-200 md:overflow-y-hidden overflow-y-auto hover:!overflow-y-auto overflow-x-hidden"
            >
              <li
                  v-for="(item, index) in options"
                  :key="index + 'item'"
                  @click="onHandleSelect(item)"
                  :class="{
                  '!bg-blue-100/40':
                    selectedOption?.[valueKey] === item?.[valueKey],
                }"
                  class="px-2.5 py-2.5 transition-200 hover:bg-blue-100/40 cursor-pointer"
              >
                <div
                    class="flex items-center justify-between dark:text-white font-bold"
                >
                  <span>{{ item[labelKey] }}</span>
                  <span>{{ item[valueKey] }}</span>
                </div>
              </li>
              <li
                  v-if="!options.length"
                  class="px-3 py-2 text-gray-500 text-center text-sm font-medium"
              >
                Loading...
              </li>
            </ul>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>
<script setup lang="ts">
import {onClickOutside} from "@vueuse/core";
import {ref} from "vue";

interface Props {
  modelValue: string;
  placeholder: string;
  valueKey: string;
  labelKey: string;
  subKey: string;
  options: any[];
  selectedOption: any;
  loading: boolean;
}

const props = defineProps<Props>();
const $emit = defineEmits<{
  (e: "update:modelValue", val: string): void;
  (e: "on-select", val: any): void;
  (e: "on-focus"): void;
}>();
const target = ref(null);
const isOpen = ref(false);
const focused = ref(false);
onClickOutside(target, (event) => {
  isOpen.value = false;
});
const onHandleSelect = (el) => {
  $emit("on-select", el);
  isOpen.value = false;
};
const onFocus = () => {
  $emit("on-focus");
  isOpen.value = true;
};
</script>
<style lang="scss" scoped></style>
