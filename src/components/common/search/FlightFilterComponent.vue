<template>
  <div
    class="border border-gray-300 dark:border-black config-border-radius dark:bg-black-input transition-150 px-4 pt-3 pb-4"
  >
    <h1 class="transition-150 dark:text-gray-300 mb-3 flex gap-1 items-center">
      <span><Filter :size="18"/></span>
      <span>{{ $t('66') }}</span>
    </h1>
    <el-collapse v-model="activeNames">
      <el-collapse-item :title="$t('67')" name="1">
        <el-checkbox-group
            v-model="form.stops"
            class="flex flex-col"
            @change="onFilter"
        >
          <el-checkbox
              v-for="item in filterData?.stops"
              :key="item"
              :label="item"
              :value="item"
          >
            {{ item === 0 ? $t('68') : item + $t('67') }}
          </el-checkbox>
        </el-checkbox-group>
      </el-collapse-item>
      <el-collapse-item :title="$t('69')" name="2">
        <el-checkbox-group
          v-model="form.airlines"
          class="flex flex-col"
          @change="onFilter"
        >
          <el-checkbox
            v-for="(item,elem3) in filterData?.airlines"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          >
            {{ item.name }}
          </el-checkbox>
        </el-checkbox-group>
      </el-collapse-item>
      <el-collapse-item :title="$t('70')" name="4">
        <el-checkbox-group
          v-model="form.depTimes"
          class="flex flex-col"
          @change="onFilter"
        >
          <el-checkbox
            v-for="item in filterData?.departureTimes"
            :key="item.time"
            :label="item.time"
            :value="item.time"
          >
            {{ item.time }}
          </el-checkbox>
        </el-checkbox-group>
      </el-collapse-item>
      <el-collapse-item :title="$t('71')" name="5">
        <el-checkbox-group
          v-model="form.arrTimes"
          class="flex flex-col"
          @change="onFilter"
        >
          <el-checkbox
            v-for="item in filterData?.arrivalTimes"
            :key="item.time"
            :label="item.time"
            :value="item.time"
          >
            {{ item.time }}
          </el-checkbox>
        </el-checkbox-group>
      </el-collapse-item>
    </el-collapse>
    <div class="mt-4">
      <label class="text-sm font-bold dark:text-gray-300 transition-150">
        {{$t('72')}} ({{ configStore.currency }})
      </label>
      <el-slider v-model="prices" range :max="filterData?.max_price" />
      <div class="flex justify-between text-sm dark:text-gray-300 transition-150">
        <span> {{ formatNumber(filterData?.min_price.toFixed(0) || 0) }} </span>
        <span> {{ formatNumber(filterData?.max_price.toFixed(0) || 0) }} </span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { IAviaFilter } from "@/types";
import { computed, ref, unref, watch } from "vue";
import { useAviaStore } from "@/stores/avia";
import { formatNumber } from "@/utils";
import { useConfigStore } from "@/stores/config";
import { Filter } from "lucide-vue-next";


interface Props {
  filter: IAviaFilter;
}
const store = useAviaStore();
const configStore = useConfigStore();
const props = defineProps<Props>();
const $emit = defineEmits<{
  (e: "on-filter"): void;
}>();
const filterData = computed(() => store.allResponse);

const prices = ref([0, 100]);
const form = unref(props.filter);
const activeNames = ref(["1", "2", "3"]);

watch(
  () => filterData.value,
  () => {
    if (!filterData.value) return;
    prices.value = [0, filterData.value.max_price];
  },
  {
    deep: true,
    immediate: true,
  },
);

const onFilter = () => {
  $emit("on-filter");
};
</script>
<style>
.el-slider__bar{
  background-color: rgb(25 153 166);
  transition: 0.2s ease-in-out;
}
.el-slider__button{
  border: 2px solid rgb(25 153 166);
  transition: 0.2s ease-in-out;
}
.el-checkbox__inner{
  padding: 8px!important;
  border-radius: 4px!important;
  transition: 0.2s ease-in-out;
}
.dark .el-collapse-item__header{
  background-color: #1e293b;
  color: #d1d5db;
  transition: 0.2s ease-in-out;
}
.dark .el-collapse-item__content{
  background-color: #1e293b;
  color: #d1d5db;
  transition: 0.2s ease-in-out;
}
.dark .el-checkbox__label{
  color: #d1d5db;
  transition: 0.2s ease-in-out;
}
.dark .el-checkbox__inner{
  background-color: #28344c;
  border: 1px solid #28344c ;;
}
.el-checkbox__inner:after{
  height: 9px;
  left: 6px;
}
</style>
