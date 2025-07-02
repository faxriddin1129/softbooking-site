<template>
  <div class="min-h-screen flex flex-col dark:bg-black transition-150">
    <div class="grow">

      <div class="">
        <HeaderComponent />
      </div>
      <div>
        <CFooterMenu/>
      </div>

      <div class="px-4 md:px-20 xl:px-20 pb-5 pt-3 mb-5 sm:mb-0">
        <div class="md:px-0 xl:px-20">
          <RouterView />
        </div>
      </div>
    </div>
    <FooterComponent class="hidden sm:block" />
  </div>
</template>
<script setup lang="ts">
import HeaderComponent from "@/components/layouts/HeaderComponent.vue";
import FooterComponent from "@/components/layouts/FooterComponent.vue";
import CFooterMenu from "@/components/common/CFooterMenu.vue";
</script>