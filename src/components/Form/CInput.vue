<template>
  <div>
    <label
      v-if="text"
      :for="id"
      class="text-dark dark:!text-white-100 text-[12px] font-medium mb-1"
    >
      {{ text }} <span class="text-[#0074FF]" v-if="required">*</span></label
    >
    <div
      class="flex items-center border focus-within:border-[#0074FF] rounded bg-white dark:!border-dark-700 dark:!bg-dark-700"
      :class="{ '!border-red-500': error }"
    >
      <slot name="prefix"></slot>
      <input
        v-bind="{
          placeholder,
          type,
          minlength,
          maxlength,
          id,
          required,
          disabled,
          readonly,
        }"
        :value="modelValue"
        @input="handleInput($event.target?.value)"
        @focus="emit('focus')"
        @blur="emit('blur')"
        @change="emit('change')"
        class="outline-none border-none w-full dark:!border-dark-input dark:!bg-dark-input dark:text-white-100 py-2 px-3 rounded text-base text-[#555]"
        :class="inputClass"
      />
      <slot name="suffix"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { convertCyrillicToLatin, isCyrillic } from "@/utils/constants";

interface Props {
  modelValue: string;
  type?: string;
  placeholder: string;
  id?: string;
  maxlength?: number;
  minlength?: number;
  required?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  error?: boolean;
  text: string;
  isLatin?: boolean;
  inputClass?: string;
}
const props = withDefaults(defineProps<Props>(), {
  type: "text",
});
const emit = defineEmits<{
  (e: "update:modelValue", val: string): void;
  (e: "focus"): void;
  (e: "blur"): void;
  (e: "change"): void;
}>();
const handleInput = (e: string) => {
  const val = isCyrillic(e);
  if (val && props.isLatin) {
    emit("update:modelValue", convertCyrillicToLatin(e));
  } else {
    emit("update:modelValue", e);
  }
};
</script>
