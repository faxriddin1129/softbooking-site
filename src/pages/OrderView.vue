<template>
  <div class="mb-14 dark:text-gray-300">
    <div v-if="!loading">
      <div v-if="!botStatus" class="flex">
        <router-link to="/profile?active=1" class="hidden sm:block">
          <el-button type="primary" class="!py-5 !px-10">
            <div class="flex gap-2 items-center">
              <CircleArrowLeft :size="16" />
              <div>{{ $t("35") }}</div>
            </div>
          </el-button>
        </router-link>
        <router-link to="/orders" class="block sm:hidden">
          <el-button type="primary" class="!py-5 !px-10">
            <div class="flex gap-2 items-center">
              <CircleArrowLeft :size="16" />
              <div>{{ $t("35") }}</div>
            </div>
          </el-button>
        </router-link>
        <el-button
            v-if="data.status_pay === 0 && data.status !== 2 && data.agent_fare !== 0"
            @click="payByBalance"
            type="success"
            class="!py-5 !px-4 ms-2"
            :loading="loadingBtn"
        >
          {{ $t("111") }}
        </el-button>
      </div>


      <div
        class="grid grid-cols-12 dark:text-gray-300 transition-150 mt-2 dark:bg-black-input dark:border-black-input border-[1px] shadow-xl py-4 sm:py-8 px-4 sm:px-8 config-border-radius"
      >
        <div class="sm:col-span-3 col-span-12">
          <div class="block sm:hidden">
            <div class="flex justify-between">
              <div class="text-[14px] sm:text-[16px]">
                ID:{{ data.id }} / {{ data.date }}
              </div>
              <div class="text-[14px] sm:text-[16px]">
                {{ data.price_uzs }} UZS
              </div>
            </div>
          </div>
          <div class="hidden sm:block">
            <div class="text-[14px] sm:text-[16px]">ID:{{ data.id }}</div>
            <div class="text-[14px] sm:text-[16px]">Date: {{ data.date }}</div>
            <div class="text-[14px] sm:text-[16px]">
              Price: {{ data.amount }} {{ data.currency }}
            </div>
          </div>
        </div>
        <div class="sm:col-span-9 col-span-12">
          <div
            class="grid grid-cols-12"
            v-for="(segment, key2) in data.services"
            :key="key2"
          >
            <div
              class="sm:col-span-4 col-span-6 mt-2 text-[14px] sm:text-[16px]"
            >
              <div>
                {{ segment.departure_city }}-{{ segment.departure_code }}
              </div>
              <div>
                {{ segment.departure_date }} {{ segment.departure_time }}
              </div>
            </div>
            <div
              class="sm:col-span-4 col-span-6 mt-2 text-[14px] sm:text-[16px]"
            >
              <div>{{ segment.arrival_city }} - {{ segment.arrival_code }}</div>
              <div>{{ segment.arrival_date }} {{ segment.arrival_time }}</div>
            </div>
            <div class="sm:col-span-4 col-span-12 mt-2">
              <div class="flex items-center justify-between gap-2">
                <div class="flex items-center gap-2">
                  <img
                    class="w-[28px] h-[28px] rounded-full"
                    :src="`https://img.avs.io/pics/al_square/${segment.carrier_code}@avif?rs=fit:64:64`"
                    alt="SOFTBOOKING"
                  />
                  <div class="text-[14px] sm:text-[16px]">
                    {{ segment.carrier_name }}
                  </div>
                </div>
                <div class="block sm:hidden">
                  <div class="flex items-center">
                    <span><Luggage :size="16" /></span>
                    <span>:{{ segment.baggage }}</span>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-5">
                <div class="hidden sm:block">
                  <div class="flex items-center">
                    <div><Luggage :size="14" /></div>
                    <div class="text-[14px] sm:text-[16px]">
                      :{{ segment.baggage }}
                    </div>
                  </div>
                </div>
                <div class="hidden sm:block">
                  <div class="flex items-center">
                    <span><TicketCheck :size="16" /></span>
                    <span>: {{ segment.flight_number }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="sm:col-span-9 col-span-12 mt-3">
          <div class="flex gap-5">
            <span
              v-if="data.status === 0"
              class="text-primary flex gap-1 items-center text-yellow-600"
              ><Clock :size="16" /> {{ $t("pending") }}
            </span>
            <span
              v-if="data.status === 1"
              class="text-success flex gap-1 items-center text-green-600"
              ><CircleCheckBig :size="16" /> {{ $t("issued") }}
            </span>
            <span
              v-if="data.status === 2"
              class="text-danger flex gap-1 items-center text-red-600"
              ><Ban :size="16" /> {{ $t("cancel") }}
            </span>
            <span
              v-if="data.status_pay === 0"
              class="text-warning flex gap-1 items-center text-yellow-600"
              ><Clock :size="16" /> {{ $t("notPayed") }}
            </span>
            <span
              v-if="data.status_pay === 1"
              class="text-success flex gap-1 items-center text-green-600"
              ><CircleCheckBig :size="16" /> {{ $t("payed") }}
            </span>
          </div>
        </div>
      </div>

      <div
        class="grid grid-cols-12 dark:text-gray-300 transition-150 mt-2 dark:bg-black-input dark:border-black-input border-[1px] shadow-xl py-4 sm:py-8 px-4 sm:px-8 config-border-radius"
      >
        <div class="col-span-12">
          <h6>{{ $t("37") }}</h6>
        </div>

        <div class="col-span-12">
          <div
            v-for="(value, key2) in data.passengersAll"
            class="grid grid-cols-12"
          >
            <div
              class="col-span-4 mt-2 border-t text-[14px] sm:text-[16px] capitalize"
            >
              {{ value.last_name }} {{ value.first_name }}
            </div>
            <div class="col-span-4 mt-2 border-t text-[14px] sm:text-[16px]">
              {{ value.citizenship }} / {{ value.gender }} / {{ value.birth }}
            </div>
            <div class="col-span-4 mt-2 border-t text-[14px] sm:text-[16px]">
              {{ value.document_number }} / {{ value.document_expire }}
            </div>
          </div>
        </div>
      </div>

      <div
        class="grid grid-cols-12 dark:text-gray-300 transition-150 mt-2 dark:bg-black-input dark:border-black-input border-[1px] shadow-xl py-4 sm:py-8 px-4 sm:px-8 config-border-radius"
      >
        <div class="sm:col-span-9 col-span-12 mt-3">
          <div class="flex gap-5 items-center">
            <div
              v-if="data.status_pay === 0 && data.status !== 2"
              class="flex gap-2 items-center"
            >
              <div class="text-yellow-700 leading-4">
                <div class="text-[14px]">{{ $t("83") }}</div>
                <div>{{ formattedTime }}</div>
              </div>
              <el-button
                @click="openPaymentModal"
                type="primary"
                class="!py-5 !px-8"
              >
                {{ $t("39") }}
              </el-button>
            </div>
            <div>
              <el-button
                v-if="data.status === 1"
                @click="downloadPDF()"
                type="primary"
              >
                {{ $t("40") }}
              </el-button>
            </div>
            <div>
              <a target="_blank" v-if="data?.fiscal_url" class="text-blue-600" :href="data?.fiscal_url">FISCAL CHECK</a>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div v-else class="dark:text-gray-300 text-center">Loading...</div>
    <el-dialog
      v-model="dialogVisible"
      :fullscreen="screenWidth < 576"
      :title="t('85') + ' #' + data?.id"
      width="35%"
    >
      <hr class="border-b-1 mb-3 border-[#000000]"/>
      <CPayment
        :order-id="route.query.id"
        type="flight"
        :email="data?.email"
        type_code="order"
        :return-url="`https://softbooking.uz/order?id=${route.query.id}`"
        @on-submit="dialogVisible = false"
        @on-close="orderItem(route.query.id as string | number)"
      />
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, onUnmounted, computed } from "vue";
import { useApi } from "@/composables/useApi";
import type { ICheckUser, IResponse } from "@/types";
import { ElNotification } from "element-plus";
import { useRoute } from "vue-router";
import {
  Luggage,
  TicketCheck,
  Clock,
  CircleCheckBig,
  Ban,
  CircleArrowLeft,
} from "lucide-vue-next";

import { useI18n } from "vue-i18n";
import CPayment from "@/components/common/CPayment.vue";
import { useMobileWidth } from "@/composables/isMobileWidth";
import type { IOrder } from "@/types/order";

const { screenWidth } = useMobileWidth();
const { t } = useI18n();
const route = useRoute();

const loading = ref(true);
const expireTime = ref();
const data = ref();
const botStatus = ref(0);
const dialogVisible = ref(false);
const loadingBtn = ref(false)

const getOrder = async function () {
  try {
    const res = await useApi().$get<ICheckUser>(
      "v1/flight/order?id=" +
        route.query.id +
        "&include=services,transactions,passengersAll,getVoucher",
    );
    data.value = res?.data?.data;
    console.log("data", data.value.id);
    expireTime.value = data.value.expire;
    loading.value = false;
  } catch (err) {
    ElNotification({
      title: "Error",
      message: err?.response?.data?.message,
      type: "error",
    });
  }
};
const openPaymentModal = async () => {
  dialogVisible.value = true;
};

const timeRemaining = ref(null);
const intervalId = ref();
function calculateTimeRemaining() {
  const currentTime = Math.floor(Date.now() / 1000);
  return expireTime.value - currentTime;
}
function updateTimeRemaining() {
  timeRemaining.value = calculateTimeRemaining();
  if (timeRemaining.value <= 0) {
    clearInterval(intervalId.value);
    if (data.value?.status !== 2 && data.value?.status_pay !== 1) {
      ElNotification({
        title: "Внимание!",
        message: "Ваш заказ будет отменен через 1 минуту.",
        type: "error",
      });
    }
  }
}
const orderItem = (id: number | string) => {
  return new Promise((resolve, reject) => {
    useApi()
      .$get<IResponse<IOrder>>(
        `/v1/flight/order?id=${id}&include=services,transactions`,
      )
      .then((res) => resolve(res?.data?.data))
      .catch((err) => reject(err));
  });
};

const formattedTime = computed(() => {
  if (timeRemaining.value == null) {
    return "Loading...";
  }

  const minutes = Math.floor(timeRemaining.value / 60);
  const seconds = timeRemaining.value % 60;
  if (minutes < 0) {
    return "0 : 0";
  }
  return `${minutes} : ${seconds < 10 ? "0" + seconds : seconds}`;
});

const  checkBot = async function (){
  botStatus.value = route.query.bot
  if(route.query.bot == 1){
    document.getElementById('c-footer').style.display = 'none'
  }
}

const  payByBalance = async function (){
  loadingBtn.value = true
  try {
    const res = await useApi().$get<ICheckUser>("/v1/flight/payment-by-balance?order_id="+data.value.id);
    window.location.reload()
  } catch (err) {
    ElNotification({
      title: 'Error',
      message: err?.response?.data?.message,
      type: 'error',
    })
  }finally {
    loadingBtn.value = false
  }
}

onMounted(async () => {
  await getOrder();
  await checkBot()
  intervalId.value = setInterval(updateTimeRemaining, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId.value);
});

const downloadPDF = async () => {
  window.location.replace(
    "https://api.softbooking.uz/v1/flight/voucher?token=" +
      data.value.getVoucher,
  );
};

document.title = t("36") + " #" + route.query.id;
</script>
<style scoped>

</style>
