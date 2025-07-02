<template>
  <div>
    <TransitionRoot as="template" :show="changeStatus" class="transition-150">
      <Dialog class="relative z-10" @close="changeFunction">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          />
        </TransitionChild>
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0"
          >
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                class="dark:bg-black-input transition-150 dark:text-gray-300 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
              >
                <div
                  class="dark:bg-black-input transition-150 dark:text-gray-300 bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4"
                >
                  <div
                    v-for="(item, key1) in data.offers"
                    :key="key1"
                    class="flex gap-2 items-center"
                  >
                    <b>{{ item.departure.city }}</b>
                    <b><PlaneTakeoff :size="18" /></b>
                    <b>{{ item.arrival.city }}</b>
                  </div>

                  <div v-for="(value, key2) in data.offers" :key="key2">
                    <div
                      v-for="(item, key3) in value.segments"
                      :key="key3"
                      class="grid grid-cols-12 mt-3 w-full"
                    >
                      <div class="col-span-12 flex items-center justify-between gap-2">
                        <div class="flex items-center gap-2">
                          <div>
                            <img
                                :src="item.avia_company.logo_mini"
                                class="w-[35px] h-[35px] rounded-full"
                                alt="SOFTBOOKING"
                            />
                          </div>
                          <div class="leading-4">

                            <div class="text-[16px]">
                              {{ item.avia_company.name }}
                            </div>
                            <div class="text-[14px] text-gray-600">
                              {{ item.duration }} в пути
                            </div>

                          </div>
                        </div>
                        <div class="dark:text-gray-300">
                          <div class=" flex gap-1 items-center justify-end">
                            <Ticket :size="16" />
                            {{data.flight_number}}
                          </div>
                          <div class=" flex gap-1 items-center justify-end">
                            <Ban :size="16" class="text-red-600" />
                            <small>{{$t('96')}}</small>
                          </div>
                        </div>
                      </div>
                      <div class="col-span-1">
                        <div class="flex justify-start items-center h-full">
                          <svg
                            width="30"
                            height="70"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <line
                              x1="15"
                              y1="15"
                              x2="15"
                              y2="50"
                              stroke="#555555"
                              stroke-width="4"
                            />
                            <circle cx="15" cy="15" r="6" fill="#7c7c7c" />
                            <circle cx="15" cy="50" r="6" fill="#7c7c7c" />
                          </svg>
                        </div>
                      </div>
                      <div class="col-span-11">
                        <div class="grid grid-cols-12">
                          <div class="col-span-12 mt-4">
                            <div class="flex gap-5">
                              <div class="leading-5">
                                <div>{{ item.departure.time_format }}</div>
                                <div>
                                  {{
                                    dayjs(
                                      item.departure.date_format,
                                      "DD.MM.YYYY",
                                    ).format("DD-MMM,dd")
                                  }}
                                </div>
                              </div>
                              <div class="leading-5">
                                <div>{{ item.departure.city }}</div>
                                <div>
                                  {{ item.departure.code }}-{{
                                    item.departure.name
                                  }}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-span-12 mt-4">
                            <div class="flex gap-5">
                              <div class="leading-5">
                                <div>{{ item.arrival.time_format }}</div>
                                <div>
                                  {{
                                    dayjs(
                                      item.arrival.date_format,
                                      "DD.MM.YYYY",
                                    ).format("DD-MMM,dd")
                                  }}
                                </div>
                              </div>
                              <div class="leading-5">
                                <div>{{ item.arrival.city }}</div>
                                <div>
                                  {{ item.arrival.code }}-{{
                                    item.arrival.name
                                  }}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="px-4 py-3 sm:flex sm:justify-between sm:gap-5 sm:px-6 mb-3"
                >
                  <div class="inline-flex cursor-pointer sm:mt-0 w-full">
                    <div
                      v-if="
                        data?.offers_tariff?.additional_price ||
                        data?.dir_number_1_baggage_status
                      "
                      class="dark:text-gray-100 transition-150 w-full sm:w-auto"
                    >
                      <div class="row">
                        <el-tooltip
                          class="box-item"
                          effect="dark"
                          :content="
                            'Багаж: ' +
                            (data?.offers_tariff?.baggage === '1PC'
                              ? '1x 32 кг или 23 кг'
                              : data?.offers_tariff?.baggage ||
                                data?.dir_number_1_baggage)
                          "
                          placement="top"
                        >
                          <div
                            class="flex justify-between gap-5 py-2 items-center dark:bg-black bg-white-card config-border-radius-input px-4 transition-150"
                          >
                            <div
                              class="flex justify-between items-center transition-150"
                            >
                              <div
                                class="text-[16px] dark:text-gray-100 mr-1 transition-150"
                              >
                                {{$t('14')}}:
                              </div>

                              <div
                                v-if="data?.offers_tariff?.additional_price"
                                class="text-[16px] text-blue dark:text-gray-100 text-right transition-150"
                              >
                                <span v-if="!data?.buy_bag_status"
                                  >+{{
                                    data?.offers_tariff?.additional_price
                                  }}</span
                                >
                                <span v-else>{{
                                  data?.offers_tariff?.baggage
                                }}</span>
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
                    <div v-else class="dark:text-gray-100 transition-150">
                      <div class="row">
                        <el-tooltip
                          class="box-item"
                          effect="dark"
                          content="Без багажа"
                          placement="bottom"
                        >
                          <div
                            class="flex justify-between items-center dark:bg-black bg-white-card config-border-radius-input px-4 py-1 transition-150"
                          >
                            <div
                              class="flex justify-between items-center transition-150"
                            >
                              <div
                                class="text-[16px] dark:text-gray-100 mr-1 transition-150"
                              >
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

                  <el-button
                    class="inline-flex w-full sm:w-auto justify-center rounded-md !px-3 !py-5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 mt-2 sm:mt-0"
                    @click="checkTicket"
                    :loading="loading"
                    type="primary"
                  >
                    <span class="mr-3">
                      <span
                        v-if="
                          data?.buy_bag_status &&
                          data?.offers_tariff?.additional_price
                        "
                        >{{ formatNumber(data?.offers_tariff?.price) }}</span
                      >
                      <span v-else>{{ formatNumber(data.price) }}</span>
                      <span v-if="data.currency === 'USD'">$ </span>
                      <span v-else class="ml-[4px]"> {{ data.currency }}</span>
                    </span>
                    <span>{{$t('64')}}</span>
                  </el-button>

                  <div
                    class="dark:text-gray-300 transition-150 inline-flex cursor-pointer justify-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 sm:mt-0 position-x"
                    @click="changeFunction"
                    ref="cancelButtonRef"
                  >
                    <CircleX :size="20" />
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>
<script setup lang="ts">
import { inject, type Ref, ref } from "vue";
import type { ITicket } from "@/types";

import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {PlaneTakeoff, CircleX, Ban, Ticket} from "lucide-vue-next";
import { useApi } from "@/composables/useApi";
import router from "@/router";

interface Props {
  data: ITicket;
}

import dayjs from "dayjs";
import "dayjs/locale/ru";
import updateLocale from "dayjs/plugin/updateLocale";
import { formatNumber } from "@/utils";
import {ElNotification} from "element-plus";
import {useI18n} from "vue-i18n";
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

const loading: Ref<boolean> = ref(false);
const props = defineProps<Props>();
const { changeStatus, changeFunction } = inject("openModal");
const { t } = useI18n();
const checkTicket = async () => {
  loading.value = true;
  let buy_id = props.data.buy_id;
  if (props?.data?.buy_bag_status) {
    buy_id = props?.data?.offers_tariff?.buy_id;
  }
  await useApi()
    .$get("/v1/flight/check", {
      params: {
        buy_id: buy_id,
      },
    })
    .then(async (res) => {
      changeFunction();
      await router.push({
        name: "Booking",
        query: { reservation_id: res?.data?.data?.reservation_id },
      });
    })
    .catch((err) => {
      ElNotification({
        title: "Error",
        message: t('65'),
        type: "error",
      });
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>
<style>
@media (min-width: 640px) {
  .sm\:max-w-lg {
    max-width: 40rem !important;
  }
}
.el-button + .el-button {
  margin-left: 0 !important;
}
.position-x {
  position: absolute;
  top: 2px;
  right: 4px;
}
.dark .el-switch__core {
  background: #1e293b !important;
}
.el-switch__core {
  border: none !important;
}
.el-switch.is-checked .el-switch__core {
  background-color: #3f9eff !important;
}
</style>
