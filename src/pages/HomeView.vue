<template>
  <div>
    <MainTitleComponent class="sm:block hidden" />
    <div>
      <div>
        <SearchPanelFormComponent
          @on-fetch-offers="onFetchOffers"
          :loading="loading"
        />
      </div>
    </div>

    <div class="grid grid-cols-12">

      <div class="col-span-12">
        <div v-if=" store.tickets.length === 0 && Object.keys($route.query).length && !loading" class="grid grid-cols-12 mb-4">
          <div class="sm:col-span-2"></div>
          <div class="md:col-span-8 col-span-12 bg-white-card dark:bg-black-input dark:text-gray-300 config-border-radius-card flex justify-center pb-6 pt-3 px-10">
            <div class="text-center">
              <div class="flex justify-center">
                <TriangleAlert class="text-yellow-700" :size="56"/>
              </div>
              {{$t('97')}}
            </div>
          </div>
        </div>
      </div>

      <div class="md:col-span-9 col-span-12">
        <div v-if="store.tickets.length > 0" class="mb-14">
          <SearchResultComponent
            :loading="loading"
            v-for="(item, index) in store.tickets"
            :data="item"
            :key="index"
          />
        </div>
        <div
          ref="target"
          v-if="
            !loading &&
            store.allResponse &&
            store.allResponse.count > store.tickets.length
          "
        ></div>
      </div>
      <div class="hidden sm:block md:col-span-3 col-span-12 mt-4 md:ps-4">
        <FlightFilterComponent
          v-if="store.tickets.length > 0"
          :loading="loading"
          :filter="filter"
          @on-filter="onFilterChange"
          class="mb-12 sm:mb-0"
        />
      </div>
    </div>

    <div v-if="store.tickets.length === 0">
      <div class="col-span-12 mb-2">
        <h1
          class="dark:text-gray-300 ms-1 text-xl text-center md:text-left font-semibold flex items-center gap-2"
        >
          <span>{{ $t("21") }}</span>
          <span><History :size="24" /></span>
        </h1>
      </div>
      <ReadyRouteComponent
        @on-fetch-offers="onFetchOffers"
        :loading="loading"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import MainTitleComponent from "@/components/common/MainTitleComponent.vue";
import SearchResultComponent from "@/components/common/search/SearchResultComponent.vue";
import FlightFilterComponent from "@/components/common/search/FlightFilterComponent.vue";
import SearchPanelFormComponent from "@/components/common/search/SearchPanelFormComponent.vue";
import { useAviaStore } from "@/stores/avia";
import { useIntersectionObserver } from "@vueuse/core";
import type { ISearchData } from "@/types";
import { TriangleAlert, History } from "lucide-vue-next";
import ReadyRouteComponent from "@/components/common/ReadyRouteComponent.vue";

const store = useAviaStore();
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

const target = ref(null);
const loading = ref(false);
const onFetchOffers = async (data: ISearchData) => {
  try {
    loading.value = true;
    await store.fetchRequestId(data);
    await store.fetchAviaTickets({
      ...filter.value,
      min_price: filter.value.min_price || undefined,
      max_price: filter.value.max_price || undefined,
    });
  } catch (err) {
    console.log(err);
  } finally {
    loading.value = false;
  }
};
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
const { stop } = useIntersectionObserver(
  target,
  async ([{ isIntersecting }], observerElement) => {
    if (store.allResponse && store.allResponse.count > store.tickets.length) {
      filter.value.page++;
      await store.fetchAviaTickets({
        ...filter.value,
        min_price: filter.value.min_price || undefined,
        max_price: filter.value.max_price || undefined,
      });
    }
  },
);
document.title = "SOFTBOOKING";

onBeforeUnmount(() => {
  store.$reset();
});
</script>
<style scoped></style>
