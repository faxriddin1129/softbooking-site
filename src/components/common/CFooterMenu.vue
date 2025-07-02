<template>
  <div
      class="pt-3 pb-7 px-3 bg-white-layout dark:bg-black-input w-full text-[16px] sm:hidden block fixed bottom-[-1px] z-[199] rounded-t-2xl"
      id="c-footer"
  >
    <div class="flex items-center justify-around relative">
      <RouterLink
          :to="{ name: 'Home', }"
          exact-active-class="active"
          class="flex items-center flex-col gap-[2px] px-[10px] p-bot"
      >
        <div>
          <Plane class="dark-m" :size="18"/>
        </div>
        <p class="dark-m">{{ $t('61') }}</p>
      </RouterLink>
      <RouterLink
          :to="{ name: 'lastSearch', }"
          exact-active-class="active"
          class="flex items-center flex-col gap-[2px] px-[10px] p-bot"
      >
        <div>
          <History class="dark-m" :size="18"/>
        </div>
        <p class="dark-m">{{ $t('59') }}</p>
      </RouterLink>
      <RouterLink
          :to="{ name: 'Orders', }"
          exact-active-class="active"
          class="flex items-center flex-col gap-[2px] px-[10px] p-bot"
      >
        <div>
          <Ticket class="dark-m" :size="18"/>
        </div>
        <p class="dark-m">{{ $t('62') }}</p>
      </RouterLink>
      <RouterLink
          :to="{ name: 'Profile', }"
          exact-active-class="active"
          class="flex items-center flex-col gap-[2px] px-[10px] p-bot"
      >
        <div>
          <User class="dark-m" :size="18"/>
        </div>
        <p class="dark-m">{{ $t('profile') }}</p>
      </RouterLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import {Plane, User, History, Ticket} from "lucide-vue-next";

</script>
<style scoped lang="scss">
p {
  font-size: 12px;
}

.p-bot {
  padding: 3px 8px;
}

.active {
  color: #0965cc;
}
.dark-m{
  color: #d1d5db;
}
.active .dark-m {
  color: white;
}

</style>
