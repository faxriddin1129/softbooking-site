<template>
  <div class="dark:bg-black-input pb-3 config-border-radius bg-white-card transition-150">

    <div v-if="data?.data?.length === 0" class="text-center flex items-center justify-center gap-2 dark:text-gray-300 transition-150">
      <span class="sm:block hidden">{{$t('58')}}</span>
      <span><Search :size="18"/></span>
    </div>
    <div v-for="(item, key1) in data.data" :key="key1">
      <div @click="pushOrder(item.data.id)" class="grid grid-cols-12 dark:text-gray-300 transition-150 mt-2 dark:border-black-card border-[1px] shadow-xl cursor-pointer p-2 config-border-radius">
        <div class="sm:col-span-3 col-span-12">


          <div class="block sm:hidden">
            <div class="flex justify-between">
              <div class="text-[14px] sm:text-[16px]">ID:{{ item.data.id }} / {{ item.data.date }}</div>
              <div class="text-[14px] sm:text-[16px]">{{ item.data.price_uzs }} UZS</div>
            </div>
          </div>
          <div class="hidden sm:block">
            <div class="text-[14px] sm:text-[16px]">ID:{{ item.data.id }}</div>
            <div class="text-[14px] sm:text-[16px]">Date: {{ item.data.date }}</div>
            <div class="text-[14px] sm:text-[16px]">Price: {{ item.data.price_uzs }} UZS</div>

            <div v-if="authStore.user?.data?.data?.role_id === 3" class="text-[14px] sm:text-[16px]">Agency Fare: {{ item.data.agent_fare }} UZS</div>
          </div>


        </div>
        <div class="sm:col-span-9 col-span-12">
          <div class="grid grid-cols-12" v-for="(segment,key2) in item.data.services" :key="key2">
            <div class="sm:col-span-4 col-span-6 mt-2 text-[14px] sm:text-[16px]">
              <div>{{segment.departure_city}}-{{segment.departure_code}}</div>
              <div>{{segment.departure_date}} {{segment.departure_time}}</div>
            </div>
            <div class="sm:col-span-4 col-span-6 mt-2 text-[14px] sm:text-[16px]">
              <div>{{segment.arrival_city}} - {{segment.arrival_code}}</div>
              <div>{{segment.arrival_date}} {{segment.arrival_time}}</div>
            </div>
            <div class="sm:col-span-4 col-span-12 mt-2">
              <div class="flex items-center justify-between gap-2">
                <div class="flex items-center gap-2">
                  <img class="w-[28px] h-[28px] rounded-full" :src="`https://img.avs.io/pics/al_square/${segment.carrier_code}@avif?rs=fit:64:64`" alt="SOFTBOOKING">
                  <div class="text-[14px] sm:text-[16px]">{{segment.carrier_name}}</div>
                </div>
                <div class="block sm:hidden">
                  <div class="flex items-center">
                    <span><Luggage :size="16"/></span>
                    <span>:{{segment.baggage}}</span>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-5">
                <div class="hidden sm:block">
                  <div class="flex items-center">
                    <div><Luggage :size="14"/></div>
                    <div class="text-[14px] sm:text-[16px]">:{{segment.baggage}}</div>
                  </div>
                </div>
                <div class="hidden sm:block">
                  <div class="flex items-center">
                    <span><TicketCheck :size="16"/></span>
                    <span>: {{segment.flight_number}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>
<script setup lang="ts">
import type {ITicket} from "@/types";
import { Luggage, TicketCheck, Search } from "lucide-vue-next";
import {useRouter} from "vue-router";
import {useAuthStore} from "@/stores/auth";

interface Props {
  data: ITicket
}
defineProps<Props>();

const authStore = useAuthStore()
const router = useRouter();

const pushOrder = async function (id) {
  await router.push({
    name: "Order",
    query: { id: id },
  });
}

</script>
<style scoped>

</style>