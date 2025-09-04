<template>
  <div
    class="grid grid-cols-12 border-[0.5px] border-gray-300 shadow-lg dark:border-black config-border-radius-card dark:bg-black-input transition-150 mt-4 py-5 px-6"
  >
    <div class="col-span-12 flex justify-between items-center transition-150 cursor-pointer" @click="changeFunction">

      <div class="flex gap-1 items-center justify-between transition-150 w-full">

        <div class="flex gap-1 items-center">
          <div>
            <img
                class="logo-air"
                :src="data.offers[0].avia_company.logo_mini"
                alt="TRAVELIST"
            />
          </div>
          <div class="dark:text-gray-300 transition-150 text-[13px] md:text-[16px]">
            {{ data.offers[0].avia_company.name }}
            <i v-if="data?.fareAgency > 0" class="text-yellow-600 text-[10px]">{{data?.fareAgency}}</i>
          </div>
        </div>

        <div class="dark:text-gray-300 flex gap-1 items-center">
          <Ticket :size="16" />
          {{data.flight_number}}
        </div>

      </div>

    </div>
    <div
      class="md:col-span-9 col-span-12"
      v-for="(offer, elem1) in data.offers"
      :key="elem1"
      @click="changeFunction"
    >
      <div class="grid grid-cols-10 cursor-pointer">
        <div
          class="md:col-span-2 col-span-6 dark:text-gray-300 transition-150 mt-3 leading-6 hidden sm:block"
        >
          <div>{{ offer.departure.date_format }}</div>
          <div class="md:text-[25px] text-[20px]">
            {{ offer.departure.time_format }}
          </div>
          <div>{{ offer.departure.city }}</div>
        </div>

        <div class="md:col-span-6 col-span-12 mt-8">
          <div
            class="flex w-full justify-between border-t border-gray-300 plane-begin-end dark:text-gray-300 transition-150"
          >
            <div
              v-for="(segment, elem2) in offer.segments"
              :key="elem2"
              class="leading-4"
            >
              <div class="mt-1 text-left block sm:hidden">{{ segment.departure.city }}</div>
              <div class="mt-1 text-left hidden sm:block">{{ segment.departure.code }}</div>

              <div class="text-[15px]">{{ segment.departure.time_format }}</div>
            </div>
            <div class="leading-4">

              <div class="mt-1 text-right block sm:hidden">{{ offer.segments[offer.segments.length - 1].arrival.city }}</div>
              <div class="mt-1 text-right hidden sm:block">{{ offer.segments[offer.segments.length - 1].arrival.code }}</div>

              <div class="text-[15px]">
                {{
                  offer.segments[offer.segments.length - 1].arrival.time_format
                }}
              </div>

            </div>

            <div class="begin"><PlaneTakeoff /></div>
            <div class="end"><PlaneLanding /></div>
          </div>
        </div>
        <div
          class="md:col-span-2 col-span-6 dark:text-gray-300 transition-150 md:ps-5 mt-3 leading-6 hidden sm:block"
        >
          <div>{{ offer.arrival.date_format }}</div>
          <div class="md:text-[25px] text-[20px]">
            {{ offer.arrival.time_format }}
          </div>
          <div>{{ offer.arrival.city }}</div>
        </div>
      </div>
    </div>
    <div class="md:col-span-3 col-span-12 transition-150 px-3 sm:px-0">
      <div>
        <div
          class="dark:text-gray-300 font-bold transition-150 text-[20px] md:text-[20px] flex justify-center"
        >
          <div>
            <span
              v-if="
                data?.buy_bag_status && data?.offers_tariff?.additional_price
              "
              >{{ formatNumber(data?.offers_tariff?.price) }}</span
            >
            <span v-else>{{ formatNumber(data.price) }}</span>

            <span v-if="data.currency === 'USD'">$ </span>
            <span v-else class="ml-[4px]"> <sup> {{ data.currency }}</sup></span>
          </div>
        </div>
      </div>
      <div
        v-if="
          data?.offers_tariff?.additional_price ||
          data?.dir_number_1_baggage_status
        "
        class="mt-2 dark:text-gray-100 transition-150"
      >
        <div class="row">
          <el-tooltip
            class="box-item"
            effect="dark"
            :content="'Багаж: ' + (data?.offers_tariff?.baggage === '1PC' ? '1x 32 кг или 23 кг' : data?.offers_tariff?.baggage || data?.dir_number_1_baggage)"
            placement="bottom"
          >
            <div
              class="flex justify-between items-center dark:bg-black bg-white-card config-border-radius-card px-4 py-1.5 transition-150"
            >
              <div class="flex justify-between items-center transition-150">
                <div class="text-[16px] dark:text-gray-100 mr-1 transition-150">
                  {{ $t('14') }}:
                </div>

                <div
                  v-if="data?.offers_tariff?.additional_price"
                  class="text-[16px] text-blue dark:text-gray-100 text-right transition-150"
                >
                  <span v-if="!data?.buy_bag_status"
                    >+{{ data?.offers_tariff?.additional_price }}</span
                  >
                  <span v-else>{{ data?.offers_tariff?.baggage }}</span>
                </div>
                <div v-else>
                  <span>{{ data?.dir_number_1_baggage }}</span>
                </div>
              </div>
              <div>
                <el-switch
                  v-model="data.dir_number_1_baggage_status"
                  class="h-[20px] transition-150"
                  inline-prompt
                  v-if="data?.dir_number_1_baggage_status"
                  disabled
                />
                <el-switch
                  v-model="data.buy_bag_status"
                  class="h-[20px] transition-150"
                  inline-prompt
                  v-if="
                    data?.offers_tariff?.additional_price &&
                    !data?.dir_number_1_baggage_status
                  "
                />
              </div>
            </div>
          </el-tooltip>
        </div>
      </div>
      <div v-else class="mt-2 dark:text-gray-100 transition-150">
        <div class="row">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="Без багажа"
            placement="bottom"
          >
            <div
              class="flex justify-between items-center dark:bg-black bg-white-card config-border-radius-card px-4 py-1.5 transition-150"
            >
              <div class="flex justify-between items-center transition-150">
                <div class="text-[16px] dark:text-gray-100 mr-1 transition-150">
                  {{$t('63')}}
                </div>
              </div>
              <div>
                <Ban :size="14" />
              </div>
            </div>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div v-if="authStore?.user?.data?.data?.id === 1" class="text-[4px] text-yellow-600 col-span-12">{{ data.debug }} [{{data.provider}}]</div>
  </div>
  <div v-if="changeStatus">
    <FlightDialogComponent :data="data" />
  </div>
</template>
<script setup lang="ts">
import { PlaneTakeoff, PlaneLanding, Ban, Ticket } from "lucide-vue-next";
import { provide, ref } from "vue";
import type { ITicket } from "@/types";
import { formatNumber } from "@/utils";
const authStore = useAuthStore();
import FlightDialogComponent from "@/components/common/search/FlightDialogComponent.vue";
import {useAuthStore} from "@/stores/auth";
interface Props {
  data: ITicket;
  loading: boolean;
}
defineProps<Props>();

const changeStatus = ref(false);
const changeFunction = function () {
  changeStatus.value = !changeStatus.value;
};
provide("openModal", {
  changeStatus,
  changeFunction,
});
</script>
<style>
.plane-begin-end {
  position: relative;
}
.begin {
  position: absolute;
  top: -30px;
  left: 0;
}
.end {
  position: absolute;
  top: -30px;
  right: 0;
}
.logo-air {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.dark .el-switch__core {
  background: #1e293b !important;
}
.el-switch__core {
  border: none !important;
}
.el-switch.is-checked .el-switch__core {
  background-color: rgb(25 153 166)!important;
}
</style>
