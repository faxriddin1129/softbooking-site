<template>
  <div class="pb-8 sm:pb-4">
    <div class="sm:hidden block">
      <div class="flex justify-center">
        <img
          class="w-[70px] bg-white-card dark:bg-black-input rounded-xl px-1 py-2 mb-[-30px]"
          src="/logo/svg/logo-blue.svg"
          alt=""
        />
      </div>
    </div>
  </div>
  <div class="grid grid-cols-12 pb-5 transition-150">

    <!-- auto complate -->
    <div class="md:col-span-2 col-span-12 mt-1">
      <div class="relative h-full">
        <div class="block sm:hidden" @click="drawerOpen('departure')">
          <AutoCompleteComponent
            class="pointer-events-none"
            sub-key=""
            :options="airports"
            v-model="departure"
            :placeholder="$t('74')"
            value-key="code"
            label-key="name"
            :loading="directionLoading"
            :selected-option="forms.selectedDeparture"
            @on-select="onDepartureSelect"
            @update:modelValue="fetchOptions"
            @on-focus="airports = []"
          />
        </div>
        <div class="hidden sm:block">
          <AutoCompleteComponent
            sub-key=""
            :options="airports"
            v-model="departure"
            :placeholder="$t('74')"
            value-key="code"
            label-key="name"
            :loading="directionLoading"
            :selected-option="forms.selectedDeparture"
            @on-select="onDepartureSelect"
            @update:modelValue="fetchOptions"
            @on-focus="airports = []"
          />
        </div>
        <PlaneTakeoff :size="20" class="plane-icon text-gray-500" />
      </div>
    </div>
    <div class="md:col-span-2 col-span-12 mt-1">
      <div class="plane-input h-full">
        <div class="block sm:hidden" @click="drawerOpen('arrival')">
          <AutoCompleteComponent
            class="pointer-events-none"
            sub-key=""
            :options="airports"
            v-model="arrival"
            :placeholder="$t('75')"
            value-key="code"
            label-key="name"
            :loading="directionLoading"
            :selected-option="forms.selectedArrival"
            @on-select="onArrivalSelect"
            @update:modelValue="fetchOptions"
            @on-focus="airports = []"
          />
        </div>
        <div class="hidden sm:block">
          <AutoCompleteComponent
            sub-key=""
            :options="airports"
            v-model="arrival"
            :placeholder="$t('75')"
            value-key="code"
            label-key="name"
            :loading="directionLoading"
            :selected-option="forms.selectedArrival"
            @on-select="onArrivalSelect"
            @update:modelValue="fetchOptions"
            @on-focus="airports = []"
          />
        </div>
        <PlaneLanding :size="20" class="plane-icon text-gray-500" />
      </div>
    </div>

    <!-- select date -->
    <div class="md:col-span-2 hidden sm:block col-span-6 mt-1">
      <el-date-picker
        class="!w-full text-[12px]"
        v-model="forms.date"
        type="date"
        :placeholder="$t('76')"
        format="DD/MM/YYYY"
        value-format="YYYY-MM-DD"
        :disabled-date="disableDate"
        :default-value="calendarDates?.on?.[0]"
        :disabled="dashboardStore.loading"
        ref="calendar"
        @focus="getCalendarDates"
      >
        <template #default="cell">
          <div
            class="date-box flex items-center justify-center flex-col"
            :class="{ charter: isCharter(cell) }"
          >
            <span class="date !leading-[11px]">{{ cell.text }}</span>
            <div
              class="text-green-500 cccc !text-[10px] leading-4"
              v-if="
                regularPrices.find(
                  (item) => item.date === cell.dayjs.format('YYYY-MM-DD'),
                ) && configStore.currency === 'USD'
              "
            >
              {{ getDatePrices(cell.dayjs.format("YYYY-MM-DD")).price_usd }} $
            </div>
            <div
              class="text-green-500 cccc !text-[10px] !leading-4"
              v-if="
                regularPrices.find(
                  (item) => item.date === cell.dayjs.format('YYYY-MM-DD'),
                ) && configStore.currency === 'UZS'
              "
            >
              {{ getDatePrices(cell.dayjs.format("YYYY-MM-DD")).price_uzs }}
            </div>
          </div>
        </template>
      </el-date-picker>
    </div>
    <div class="md:col-span-2 hidden sm:block col-span-6 mt-1">
      <el-date-picker
        class="!w-full text-[12px]"
        v-model="returnDate"
        type="date"
        :placeholder="$t('77')"
        format="DD/MM/YYYY"
        value-format="YYYY-MM-DD"
        :disabled-date="disableDate"
        :default-value="calendarDates?.on?.[0]"
        :disabled="dashboardStore.loading"
        ref="calendar"
        @focus="getCalendarDates"
      >
        <template #default="cell">
          <div
            class="date-box flex items-center justify-center flex-col"
            :class="{ charter: isCharter(cell) }"
          >
            <span class="date !leading-[11px]">{{ cell.text }}</span>
          </div>
        </template>
      </el-date-picker>
    </div>
    <div
      v-if="forms.selectedDeparture?.code && forms.selectedArrival?.code"
      class="block sm:hidden col-span-5 mt-1"
    >
      <div
        class="dark:text-gray-400 cursor-pointer dark:bg-black-input py-2 config-border-radius-card bg-theme text-white dark:border-none"
      >
        <div
          @click="drawerOpen('date')"
          class="flex items-center justify-center"
        >
          <CalendarDays
            v-if="forms?.date.length >= 0 && !returnDate"
            :size="15"
            class="mr-1"
          />

          <div class="text-center text-[14px] lowercase">
            <span v-if="forms?.date && !returnDate">{{
              dayjs(forms?.date).format("DD-MMM,dd")
            }}</span>
            <span
              v-else-if="forms?.date && returnDate"
              class="flex items-center gap-1"
            >
              <span>{{ dayjs(forms?.date).format("DD-MMM") }}</span>
              <span>|</span>
              <span>{{ dayjs(returnDate).format("DD-MMM") }}</span>
            </span>
            <span v-else>{{ $t("78") }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- select date -->

    <!-- select passenger -->
    <div class="md:col-span-3 hidden sm:block col-span-12 mt-5 md:mt-1">
      <SearchPassengerSelectComponent :search-form="searchForm" />
    </div>
    <div
      v-if="forms.selectedDeparture?.code && forms.selectedArrival?.code"
      class="block sm:hidden col-span-5 mt-1 ml-1"
      @click="drawerOpen('passengerSelect')"
    >
      <div
        class="text-[14px] dark:text-gray-400 cursor-pointer dark:bg-black-input py-2 config-border-radius-card bg-theme text-white dark:border-none flex justify-center items-center gap-1"
      >
        <UserIcon :size="18" />
        <div class="mlx-1">
          {{
            searchForm.adult_qnt + searchForm.child_qnt + searchForm.infant_qnt
          }},
        </div>
        <span v-if="searchForm.class === 'B'" class="lowercase">{{
          $t("business")
        }}</span>
        <span v-if="searchForm.class === 'E'" class="lowercase">{{
          $t("economic")
        }}</span>
      </div>
    </div>
    <!-- select passenger -->

    <div class="md:col-span-1 hidden sm:block col-span-12 mt-1">
      <button
        @click="onSearch"
        :disabled="loading"
        class="transition-150 dark:bg-theme bg-theme-btn w-full h-full config-border-radius-card text-white text-lg min-h-[45px]"
      >
        <span class="flex gap-0.5 justify-center items-center">
          <span>{{ $t("79") }}</span>
        </span>
      </button>
    </div>

    <div
      v-if="forms.selectedDeparture?.code && forms.selectedArrival?.code"
      class="col-span-2 block sm:hidden mt-1"
    >
      <div
        @click="drawerOpen('filter')"
        class="dark:text-gray-400 cursor-pointer dark:bg-black-input py-3 config-border-radius-card bg-theme text-white dark:border-none flex justify-center items-center ml-1"
      >
        <Filter :size="14" />
<!--        <div class="text-[14px]">{{ $t("66") }}</div>-->
      </div>
    </div>

    <div v-if="loading" class="col-span-12 mt-1">
      <span class="loader"></span>
    </div>
  </div>
  <div class="bg-black-input">
    <el-drawer
      v-model="drawer"
      size="100%"
      :with-header="true"
      direction="btt"
      class="bg-black-input"
    >
      <div v-if="drawerType === 'date'">
        <div>
          <div class="flex mb-2">
            <el-input :placeholder="$t('76')" v-model="forms.date" readonly>
              <template #suffix>
                <span @click="onClearDepartureDate">
                  <CircleX :size="18" />
                </span>
              </template>
            </el-input>
            <el-input :placeholder="$t('77')" v-model="returnDate" readonly>
              <template #suffix>
                <span @click="onClearReturnDate"> <CircleX :size="18" /> </span>
              </template>
            </el-input>
          </div>
          <VueDatePicker
            v-model="selectedDate"
            model-type="yyyy-MM-dd"
            @update:model-value="onInternalModelChange"
            :month-change-on-scroll="false"
            :disabled-dates="disabledDates"
            inline
            range
            model-auto
            auto-apply
            multi-calendars
            :enable-time-picker="false"
          >
            <template #day="{ day, date }">
              <div class="leading-4">
                <div>{{ day }}</div>
                <div
                  class="text-green-500 !text-[9px] !leading-4"
                  v-if="
                    regularPrices.find(
                      (item) => item.date === dayjs(date).format('YYYY-MM-DD'),
                    )
                  "
                >
                  <div
                    class="flex items-center"
                    v-if="configStore.currency === 'USD'"
                  >
                    <span class="text-ca">{{
                      getDatePrices(dayjs(date).format("YYYY-MM-DD")).price_usd
                    }}</span>
                    <span class="ml-0.5"> $</span>
                  </div>
                  <div class="flex items-center" v-else>
                    <span class="text-ca">{{
                      getDatePrices(dayjs(date).format("YYYY-MM-DD")).price_uzs
                    }}</span>
                  </div>
                </div>
              </div>
            </template>
          </VueDatePicker>
          <div
            class="mt-10 w-full"
            v-if="selectedDate && !Array.isArray(selectedDate)"
          >
            <div class="returnDate w-full px-4 mb-2">
              <div
                @click="onCalendarButton"
                class="w-full rounded-[12px] py-4 text-center dark:text-gray-300 dark:border dark:border-theme bg-theme text-white cursor-pointer"
              >
                {{ $t("80") }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="drawerType === 'filter'">
        <div>
          <FlightFilterComponent
            v-if="store.tickets.length > 0"
            :loading="loading"
            :filter="filter"
            @on-filter="onFilterChange"
            class="mb-12 sm:mb-0"
          />
        </div>

        <div class="mt-10 w-full">
          <div class="returnDate applyBtn w-full px-4 mb-2">
            <div
              @click="drawer = false"
              class="w-full rounded-[12px] py-4 text-center dark:text-gray-300 dark:border dark:border-theme bg-theme text-white cursor-pointer"
            >
              {{ $t("81") }}
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="drawerType === 'passengerSelect'">
        <SearchPassengerSelectMiniComponent :search-form="searchForm" />
        <div class="mt-10 w-full">
          <div class="returnDate w-full px-4 mb-2 applyBtn">
            <div
              @click="onCalendarButton"
              class="w-full rounded-[12px] py-4 text-center dark:text-gray-300 dark:border dark:border-theme bg-theme text-white cursor-pointer"
            >
              {{ $t("81") }}
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="drawerType === 'departure'">
        <AutoCompleteMiniComponent
          sub-key=""
          :options="airports"
          v-model="departure"
          :placeholder="$t('74')"
          value-key="code"
          label-key="name"
          :loading="directionLoading"
          :selected-option="forms.selectedDeparture"
          @on-select="onDepartureSelect"
          @update:modelValue="fetchOptions"
          @on-focus="airports = []"
        />
      </div>
      <div v-else-if="drawerType === 'arrival'">
        <AutoCompleteMiniComponent
          sub-key=""
          :options="airports"
          v-model="arrival"
          :placeholder="$t('75')"
          value-key="code"
          label-key="name"
          :loading="directionLoading"
          :selected-option="forms.selectedArrival"
          @on-select="onArrivalSelect"
          @update:modelValue="fetchOptions"
          @on-focus="airports = []"
        />
      </div>
    </el-drawer>
  </div>
</template>
<script setup lang="ts">
import AutoCompleteComponent from "@/components/common/search/AutoCompleteComponent.vue";
import {
  computed,
  onMounted,
  reactive,
  type Ref,
  ref,
  unref,
  watch,
} from "vue";
import "v-calendar/style.css";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import {
  PlaneLanding,
  PlaneTakeoff,
  CalendarDays,
  CircleX,
  Filter,
  UserIcon,
} from "lucide-vue-next";
import SearchPassengerSelectComponent from "@/components/common/search/SearchPassengerSelectComponent.vue";
import { debounce } from "@/utils";
import { useApi } from "@/composables/useApi";
import { useI18n } from "vue-i18n";
import { useAviaStore } from "@/stores/avia";
import type { ISearchData } from "@/types";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useRoute, useRouter } from "vue-router";
import { useConfigStore } from "@/stores/config";
import { ElNotification } from "element-plus";
import SearchPassengerSelectMiniComponent from "@/components/common/search/SearchPassengerSelectMiniComponent.vue";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import isoWeek from 'dayjs/plugin/isoWeek'
import updateLocale from "dayjs/plugin/updateLocale";
import { useDashboardStore } from "@/stores/dashboard";
import FlightFilterComponent from "@/components/common/search/FlightFilterComponent.vue";
import AutoCompleteMiniComponent from "@/components/common/search/AutoCompleteMiniComponent.vue";
interface Props {
  loading: boolean;
}

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
dayjs.extend(isoWeek)


const filter = ref({
  sort: "price",
  page: 1,
  pageSize: 20,
  stops: [],
  only_baggage: 0,
  airlines: [],
  depTimes: [],
  arrTimes: [],
  min_price: 0,
  max_price: 0,
  pagination: 1,
  count: 0,
});
const props = defineProps<Props>();
const $emit = defineEmits<{
  (e: "on-fetch-offers", val: ISearchData): void;
}>();
const store = useAviaStore();
const router = useRouter();
const route = useRoute();
const configStore = useConfigStore();
const dashboardStore = useDashboardStore();
const { t } = useI18n();
const regularPrices: Ref<{ date: string; price: number; expire: number }[]> =
  ref([]);
const searchForm = reactive({
  adult_qnt: 1,
  child_qnt: 0,
  infant_qnt: 0,
  class: "E",
  currency: configStore.currency,
  directions: [
    {
      departure_code: "TAS",
      arrival_code: "IST",
      date: "2024-08-23",
    },
  ],
});
const { locale } = useI18n();
const masks = ref({
  modelValue: "YYYY-MM-DD",
});
const airports = ref([
  {
    id:"1",
    type:"city",
    code:"TAS",
    name:"Ташкент",
    main_airport_name:"Ташкент",
    country_name:"Узбекистан",
  }
]);
const departure = ref("");
const arrival = ref("");
const selectedDate = ref("");
const forms = ref({
  selectedDeparture: null,
  selectedArrival: null,
  date: "",
});
const returnDate = ref("");
const directionLoading = ref(false);
const drawer = ref(false);
const drawerType = ref("");
const getDatePrices = (targetDate: string) => {
  return regularPrices.value.find((item) => item.date === targetDate);
};
const calendarDates = computed(() => dashboardStore.calendarDates);
const rules = computed(() => {
  return {
    selectedDeparture: { required },
    selectedArrival: { required },
    date: { required },
  };
});
const $v = useVuelidate(rules.value, forms.value);
const onDepartureSelect = (option) => {
  console.log(option);
  departure.value = option.name;
  forms.value.selectedDeparture = option;
  drawer.value = false;
};
const isCharter = ({ dayjs }) => {
  return calendarDates.value?.on?.includes(dayjs.format("YYYY-MM-DD"));
};

const onArrivalSelect = (option) => {
  arrival.value = option.name;
  forms.value.selectedArrival = option;
  drawer.value = false;
};

async function getCalendarDates() {
  if (
    forms.value.selectedArrival?.code &&
    forms.value.selectedDeparture?.code
  ) {
    // await dashboardStore.getTourCalendarData(
    //   store.searchData.directions[0].departure_code,
    //   store.searchData.directions[0].arrival_code,
    //   1,
    // );
    try {
      const res = await useApi().$get(
        `/v1/flight/calendar?route=${forms.value.selectedDeparture?.code}${forms.value.selectedArrival?.code}`,
      );
      regularPrices.value = res.data;
      console.log(regularPrices.value);
    } catch (err) {
      console.log(err);
    }
  }
}

const onFilterChange = async () => {
  try {
    filter.value.page = 1;
    await store.fetchAviaTickets({
      ...filter.value,
      min_price: filter.value.min_price || undefined,
      max_price: filter.value.max_price || undefined,
    });
  } catch (err) {
    console.log(err);
  }
};

const disableDate = function (date) {
  return date < new Date(Date.now() - 86400000);
};
const fetchOptions = (query: string) => {
  directionLoading.value = true;
  debounce(
    "options",
    async () => {
      try {
        const res = await useApi().$get("/v1/flight/airports", {
          params: {
            lang: locale.value,
            code: query,
          },
        });
        airports.value = res.data;
      } catch (err) {
        console.log(err);
      } finally {
        directionLoading.value = false;
      }
    },
    500,
  );
};
const assignValues = () => {
  searchForm.directions[0].arrival_code = forms.value.selectedArrival?.code;
  searchForm.directions[0].departure_code = forms.value.selectedDeparture?.code;
  searchForm.directions[0].date = forms.value.date;
  if (searchForm.directions.length > 1) {
    searchForm.directions.splice(1, 1);
  }
  if (returnDate.value) {
    searchForm.directions.push({
      arrival_code: forms.value.selectedDeparture?.code,
      departure_code: forms.value.selectedArrival?.code,
      date: returnDate.value,
    });
  }
};
const onSearch = async () => {
  store.tickets = [];
  $v.value.$touch();
  if ($v.value.$invalid) {
    ElNotification({
      title: "Error",
      message: t("82"),
      type: "error",
    });

    return;
  }
  assignValues();
  try {
    searchForm.currency = configStore.currency;
    $emit("on-fetch-offers", searchForm);
    await router.push({
      query: {
        dep_str: departure.value,
        dep_code: searchForm.directions[0].departure_code,
        arr_str: arrival.value,
        arr_code: searchForm.directions[0].arrival_code,
        dep_date: searchForm.directions[0].date,
        arr_date: searchForm.directions?.[1]?.date,
        adult: searchForm.adult_qnt,
        child: searchForm.child_qnt,
        inf: searchForm.infant_qnt,
        class: searchForm.class,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
const drawerOpen = function (type) {
  if (type === "date") {
    getCalendarDates();
  }
  drawerType.value = type;
  drawer.value = true;
  selectedDate.value = "";
};
const onInternalModelChange = (date: string | string[]) => {
  if (!date) return;
  if (typeof date == "string") {
    forms.value.date = date;
    returnDate.value = "";
  }
  if (Array.isArray(date) && date.length > 1) {
    forms.value.date = dayjs(date[0]).format("YYYY-MM-DD");
    returnDate.value = dayjs(date[1]).format("YYYY-MM-DD");
    drawer.value = false;
    onSearch();
  }
};
const onClearDepartureDate = () => {
  forms.value.date = "";
  returnDate.value = "";
  selectedDate.value = "";
};
const onClearReturnDate = () => {
  returnDate.value = "";
  selectedDate.value = forms.value.date;
};
const onCalendarButton = () => {
  drawer.value = false;
  onSearch();
};
const disabledDates = (date: Date) => {
  const today = new Date();
  return today > date;
};
const initiator = () => {
  if (!Object.keys(route.query)?.length) return;
  departure.value = route.query?.dep_str as string;
  arrival.value = route.query?.arr_str as string;
  forms.value.selectedDeparture = {
    code: route.query?.dep_code as string,
  };
  forms.value.selectedArrival = {
    code: route.query?.arr_code as string,
  };
  forms.value.date = route.query?.dep_date as string;
  returnDate.value = route.query?.arr_date as string;
  searchForm.adult_qnt = Number(route.query?.adult || 1) as number;
  searchForm.child_qnt = Number(route.query?.child || 0) as number;
  searchForm.infant_qnt = Number(route.query?.inf || 0) as number;
  searchForm.class = route.query?.class as string;
};
watch(
  () => route.query?.readyTicket,
  () => {
    if (route.query?.readyTicket) initiator();
  },
  {
    deep: true,
    immediate: true,
  },
);
onMounted(() => {
  initiator();
  assignValues();
  $emit("on-fetch-offers", searchForm);
});
</script>
<style>

.el-date-picker__next-btn button:nth-of-type(2) {
  display: none;
}

.el-date-picker__next-btn button:nth-of-type(1) {
  border: 1px solid #1ebad1;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 50%;
}

.el-date-picker__prev-btn button:nth-of-type(1) {
  display: none;
}
.el-date-picker__prev-btn button:nth-of-type(2) {
  border: 1px solid #1ebad1;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 50%;
}

.dark .el-date-picker__prev-btn button:nth-of-type(2) {
  border: 1px solid white;
}

.dark .el-date-picker__next-btn button:nth-of-type(1) {
  border: 1px solid white;
}

.dark .el-drawer__body {
  background: #0f172a !important;
}

.dark .dp__menu_inner {
  background: #1e293b !important;
  border-radius: 12px;
}

.dark .el-input__wrapper {
  background: #1e293b !important;
  box-shadow: 0 0 0 1px #0f172a;
  border: none;
}

.el-input__wrapper {
  border-radius: 12px;
  height: 50px;
  box-shadow: none;
  border: 1px solid #11b1c9;
  transition: 0.2s ease-in-out;
  background: none !important;
}

.el-input__wrapper:focus-visible {
  border: none;
}

.dark .el-input__inner {
  color: #c0c4cc !important;
}

.dark .dp__menu {
  background-color: #0f172a;
  border: none;
}

.dark .dp__calendar_item {
  color: #f4f4f4 !important;
}

.dark .dp__calendar_header {
  color: #777070 !important;
}

.dark .dp__btn,
.dp--time-overlay-btn,
.dp--time-invalid,
.dp--qr-btn {
  color: #adb0b6;
}

.dark .dp__overlay {
  color: white;
  background: #1b2331;
}

.dark .dp__inner_nav:hover {
  background: #0f172a;
}

.dark .dp__cell_disabled {
  color: #3d3d3d;
}

.el-drawer__header {
  margin-bottom: 0 !important;
}

.el-drawer__body {
  padding: 7px !important;
}

.dark .dp__overlay_cell {
  color: #c0c4cc !important;
}

.dark .el-drawer__header {
  background-color: #0f172a;
}

.el-drawer__close-btn {
  margin-top: -10px !important;
}

.text-ca {
  font-size: 9px;
  font-weight: 400;
  line-height: 12px;
}

.dp__cell_inner,
.el-date-table td {
  padding: 0 !important;
}

.dark .el-input--large .el-input__wrapper {
  border: none !important;
}

.dark .el-input__wrapper {
  box-shadow: none;
}

.dark .el-popper.is-pure {
  background-color: #1e293b;
}

.dark .el-date-picker__header {
  background-color: #1e293b;
}

.dark .el-date-picker .el-picker-panel__content {
  background-color: #1e293b !important;
}

.dark .el-picker-panel__body {
  background-color: #1e293b !important;
}

.dark .el-date-table td.disabled .el-date-table-cell {
  background-color: #1a2435;
}

.dark .el-popper.is-light {
  border: none;
  box-shadow: 0 0 4px #0e141d;
}

.dark .el-date-picker__header-label {
  color: #d1d5db;
}

.dark .el-date-picker__next-btn button {
  color: #d1d5db;
}

.dark .el-date-picker__prev-btn button {
  color: #d1d5db;
}

.dark .available div span {
  color: #d1d5db !important;
}

.dark .disabled div span {
  background-color: #1a2435 !important;
  border: none !important;
}

.dark .el-input--large .el-input__inner {
  color: #d1d5db;
}

.cccc {
  color: #11b1c9 !important;
}
</style>
<style scoped>
.calendar-icon-mon {
  position: relative;
}

.calendar-icon {
  position: absolute;
  right: 15px;
  top: 15px;
}

.plane-input {
  position: relative;
}

.plane-icon {
  position: absolute;
  right: 15px;
  top: 15px;
}

.returnDate {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 200;
  margin-bottom: 20px;
}

.applyBtn {
  margin-bottom: 30px;
}

.loader::after {
  content: "";
  width: 192px;
  height: 4.8px;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  animation: animloader 1s linear infinite;
}

.loader {
  width: 100%;
  height: 4.8px;
  display: inline-block;
  background: rgba(255, 255, 255, 0.15);
  position: relative;
  overflow: hidden;
}

.loader::after {
  content: "";
  width: 0;
  height: 5px;
  background-color: #11b1c9;
  background-image: linear-gradient(
    45deg,
    whitesmoke 25%,
    transparent 25%,
    transparent 50%,
    whitesmoke 50%,
    whitesmoke 75%,
    transparent 75%,
    transparent
  );
  background-size: 15px 15px;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  animation:
    animFw 15s linear forwards,
    shimmer 2s linear infinite;
}

@keyframes animFw {
  0% {
    width: 1%;
  }
  35% {
    width: 40%;
  }
  70% {
    width: 70%;
  }
  100% {
    width: 100%;
  }
}

@keyframes shimmer {
  0% {
    background-position: -15px 0;
  }
  100% {
    background-position: 15px 0;
  }
}
</style>
