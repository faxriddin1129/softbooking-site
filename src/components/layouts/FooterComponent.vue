<template>
  <!-- Footer container -->
  <footer class="bg-white-layout dark:bg-black-lg text-white rounded-t-3xl border border-gray-100 dark:border-black-lg transition-150">
    <div class="mx-6 pt-10 text-center md:text-left">
      <div class="grid-cols-12 grid">

        <div class="col-span-12 md:col-span-3 mb-4">
          <div class="flex gap-2 items-center justify-center">
            <router-link to="/">
              <div class="logo">
                <img v-if="configStore.mode !== 'dark' " src="/logo/svg/light.svg" alt="softbooking.uz">
                <img v-else src="/logo/svg/logo-blue.svg" alt="softbooking.uz">
              </div>
            </router-link>
          </div>
          <div>
            <router-link to="/">
              <div class="comp text-center mb-4 font-bold uppercase">SOFTBOOKING</div>
            </router-link>
          </div>
          <div class="flex gap-2 mt-1 justify-center">
            <a>
              <img class="footer-mob-app" src="/img/android.png" alt="softbooking.uz">
            </a>
            <a>
              <img class="footer-mob-app" src="/img/ios.png" alt="softbooking.uz">
            </a>
          </div>
        </div>

        <div class="col-span-12 md:col-span-3 flex justify-center">
          <div>
            <h3 class="mb-4 font-bold uppercase">{{$t('contact')}}</h3>
            <ul>
              <li class="mb-1"><a href="mailto:info@softbooking.uz" class="flex gap-1 items-center"> <Mail :size="16"/> <span>info@softbooking.uz</span> </a></li>
              <li class="mb-1"><a href="mailto:sale@softbooking.uz" class="flex gap-1 items-center"> <Mail :size="16"/> <span>sale@softbooking.uz</span> </a></li>
              <li class="mb-1"><a target="_blank" href="https://t.me/help_softbooking" class="flex gap-1 items-center"><Send :size="16"/> <span>@help_softbooking</span> </a></li>
            </ul>
          </div>
        </div>

        <div class="col-span-12 md:col-span-3 flex justify-center">
          <div class="hidden sm:block">
            <h6 class="mb-4 font-bold uppercase">{{$t('airlines')}}</h6>
            <ul>
              <li><a>Uzairways</a></li>
              <li><a>Turkish airlines</a></li>
              <li><a>Qanotsharq</a></li>
              <li><a>Centrum Air</a></li>
              <li><a>Utair</a></li>
            </ul>
          </div>
        </div>

        <div class="col-span-12 md:col-span-3">
          <div class="flex justify-center">
            <div>
              <h6 class="font-bold uppercase">{{$t('pay_types')}}</h6>
              <div class="flex justify-center items-center">
                <div class="pay-logo">
                  <img src="/img/uscard.png" alt="softbooking.uz">
                </div>
                <div class="pay-logo">
                  <img src="/img/visa.png" alt="softbooking.uz">
                </div>
                <div class="pay-logo">
                  <img src="/img/master.svg" class="max-h-[30px] max-w-[50px]" alt="softbooking.uz">
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-center">
            <a href="https://t.me/AviaBookingBot" target="_blank" class="hover:text-blue">
              <h6 class="mt-4 font-bold uppercase">{{$t('57')}}</h6>
              <div class="flex justify-center items-center">
                <div class="pay-logo">
                  <img src="/img/bot.png" alt="softbooking.uz">
                </div>
              </div>
            </a>
          </div>
        </div>

      </div>
    </div>

    <!--Copyright section-->
    <div class="md:px-16 px-2">
      <div class="mt-8 border-t border-gray-700 py-3 flex flex-col md:flex-row justify-between items-center">
        <div class="text-center md:text-left mb-4 md:mb-0">
          © 2024 softbooking.uz — <router-link class="text-white" to="/privacy">{{$t('29')}}</router-link> — <a  target="_blank" class="text-white" href="/public_offer_softbooking.pdf">Публичная оферта</a>
        </div>
        <div class="flex space-x-4">
          <a href="https://instagram.com/softbookinguz/" target="_blank" class="a">Instagram</a><a href="#"><i class="fa-brands fa-instagram"></i></a>
          <a href="https://t.me/softbooking" target="_blank" class="a">Telegram</a><a href="#"><i class="fa-brands fa-telegram"></i></a>
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
import {Send, Mail, Phone} from "lucide-vue-next";
import {useConfigStore} from "@/stores/config";

const configStore = useConfigStore()

</script>
<style scoped>
.logo{
  width: 100px;
}
.logo img{
  width: 100%;
}
.footer-mob-app{
  width: 150px;
  height: 60px;
}
.comp{
  font-size: 1.3rem;
}
.pay-logo{
  width: 80px;
}
.pay-logo img{
  width: 100%;
}
</style>