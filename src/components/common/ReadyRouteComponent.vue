<template>
  <div>
    <div class="grid grid-cols-12 transition-150 md:mb-2 mb-10">
      <div
        v-for="(item, index) in aviaStore.historyData"
        :key="index"
        @click="startSearch(item)"
        class="md:col-span-5 col-span-12 mb-2 mx-1 dark:text-gray-300 transition-150 dark:border-black-input cursor-pointer border-[0.5px] p-2 config-border-radius-input"
      >
        <div class="hidden sm:block">
          <div class="grid grid-cols-12 md:text-[15px]">
            <div class="col-span-5">
              <div class="flex items-center gap-1">
                <div>
                  <img
                    :src="item.data.airline"
                    class="w-[25px] rounded-full"
                    alt="SOFT BOOKING"
                  />
                </div>
                <div>
                  {{ item.data.departure_city }} - {{ item.data.arrival_city }}
                </div>
              </div>
            </div>
            <div class="col-span-3">
              {{ dayjs(item.data.date, "YYYY-MM-DD").format("DD-MMM, dd") }}
            </div>
            <div class="col-span-4">
              <span>от </span>
              <span v-if="aviaStore.currency === 'UZS'" class="text-blue">{{
                item.data.price_uzs
              }}</span>
              <span v-else class="text-blue">{{ item.data.price_usd }} $</span>
            </div>
          </div>
        </div>
        <div class="block sm:hidden">
          <div class="grid grid-cols-12 text-[14px]">
            <div class="col-span-7">
              <div class="flex items-center gap-1">
                <div>
                  <img
                    :src="item.data.airline"
                    class="w-[25px] rounded-full"
                    alt="SOFT BOOKING"
                  />
                </div>
                <div>
                  {{ item.data.departure_city }} - {{ item.data.arrival_city }}
                </div>
              </div>
            </div>
            <div class="col-span-5">
              <div>
                {{ dayjs(item.data.date, "YYYY-MM-DD").format("DD-MMM, dd") }}
              </div>
              <div>
                <span>от </span>
                <span v-if="aviaStore.currency === 'UZS'" class="text-blue">{{
                  item.data.price_uzs
                }}</span>
                <span v-else class="text-blue"
                  >{{ item.data.price_usd }} $</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useApi } from "@/composables/useApi";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import updateLocale from "dayjs/plugin/updateLocale";
import { useConfigStore } from "@/stores/config";
import type { ISearchData } from "@/types";
import type { Props } from "element-plus/es/components/select-v2/src/useProps";
import { useAviaStore } from "@/stores/avia";
import { useRoute, useRouter } from "vue-router";
import { useDashboardStore } from "@/stores/dashboard";

dayjs.extend(updateLocale);
dayjs.locale("ru");
dayjs.updateLocale("ru", {
  monthsShort: [
    "янв",
    "фев",
    "мар",
    "апр",
    "май",
    "июн",
    "июл",
    "авг",
    "сен",
    "окт",
    "ноя",
    "дек",
  ],
});

const aviaStore = useConfigStore();
const getHistory = async () => {
  if (aviaStore.historyGetStatus) {
    useApi()
      .$get("/v1/flight/history")
      .then(async (response) => {
        aviaStore.historyGetStatus = false;
        aviaStore.historyData = response.data;
      });
  }
};

const store = useAviaStore();
const router = useRouter();
const route = useRoute();
const configStore = useConfigStore();
const dashboardStore = useDashboardStore();
const searchForm = ref({
  adult_qnt: 1,
  child_qnt: 0,
  infant_qnt: 0,
  class: "E",
  currency: aviaStore.currency,
  directions: [
    {
      departure_code: null,
      arrival_code: null,
      date: null,
    },
  ],
});

const props = defineProps<Props>();
const $emit = defineEmits<{
  (e: "on-fetch-offers", val: ISearchData): void;
}>();

const startSearch = async function (data) {
  searchForm.value.directions[0].departure_code = data.data.departure_code;
  searchForm.value.directions[0].arrival_code = data.data.arrival_code;
  searchForm.value.directions[0].date = data.data.date;
  console.log(data);
  console.log(searchForm.value);

  store.tickets = [];
  try {
    searchForm.currency = configStore.currency;
    $emit("on-fetch-offers", searchForm.value);

    await router.push({
      name: "Home",
      query: {
        dep_str: data.data.departure_city,
        dep_code: data.data.departure_code,
        arr_str: data.data.arrival_city,
        arr_code: data.data.arrival_code,
        dep_date: data.data.date,
        arr_date: null,
        adult: 1,
        child: 0,
        inf: 0,
        class: "E",
        readyTicket: 1,
      },
    });

    // window.location.reload()
  } catch (err) {
    console.log(err);
  }
};

onMounted(() => {
  getHistory();
});
</script>
<style scoped></style>
