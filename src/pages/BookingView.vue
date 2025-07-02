<template>
  <div class="grid grid-cols-12 mb-14 sm:mb-0">
    <form
        class="md:col-span-8 col-span-12 md:px-1"
        action=""
        @submit.prevent="bookBtn"
    >
      <div class="">
        <div
            class="dark:bg-black-input px-3 py-4 md:p-5 config-border-radius bg-white-card transition-150 mt-2"
        >
          <h1 class="font-bold transition-150 text-theme">{{ $t("1") }}</h1>
          <div
              v-for="(elem, index) in formData.passengers"
              class="grid grid-cols-12 border-b border-l-gray-100 dark:text-gray-300 transition-150 pb-5"
          >
            <div class="col-span-12">
              <h1 class="text-right dark:text-gray-300">
                <span
                    v-if="elem.type === 'ADT'"
                    class="border-b-2 border-theme font-bold"
                >№ {{ index + 1 }} {{ $t("2") }}</span
                >
                <span
                    v-else-if="elem.type === 'CHI'"
                    class="border-b-2 border-theme font-bold"
                >№ {{ index + 1 }} {{ $t("3") }}</span
                >
                <span v-else class="border-b-2 border-theme font-bold"
                >№ {{ index + 1 }} {{ $t("4") }}</span
                >
              </h1>
            </div>
            <div class="col-span-12 md:col-span-4 p-2">
              <label>{{ $t("5") }}*</label>
              <input
                  type="text"
                  :placeholder="$t('5')"
                  required
                  @input="toUpperCase"
                  v-model="elem.last_name"
                  style="text-transform: uppercase;"
                  class="dark:bg-black-btnInsert transition-150 input"
              />
            </div>
            <div class="col-span-12 md:col-span-4 p-2">
              <label>{{ $t("6") }}*</label>
              <input
                  type="text"
                  :placeholder="$t('6')"
                  required
                  :class="
                  v$.passengers?.$each.$response?.$data[index]?.first_name
                    ?.$error
                "
                  v-model="elem.first_name"
                  style="text-transform: uppercase;"
                  class="dark:bg-black-btnInsert transition-150"
              />
            </div>
            <div class="col-span-12 md:col-span-4 p-2">
              <label>{{ $t("7") }}*</label>
              <el-date-picker
                  class="!w-full dark:text-gray-300 book-date"
                  v-model="elem.birth"
                  :class="{
                  error:
                    v$.passengers.$each.$response?.$data[index]?.birth?.$error,
                }"
                  placeholder="DD.MM.YYYY"
                  type="date"
                  size="large"
                  :disabled-date="
                  elem?.type === 'ADT'
                    ? disableAdultCalendar
                    : elem?.type === 'CHI'
                      ? disableChildCalendar
                      : disableInfantCalendar
                "
                  format="DD/MM/YYYY"
                  value-format="YYYY-MM-DD"
              />
            </div>
            <div class="col-span-12 md:col-span-4 p-2 mt-2">
              <label>{{ $t("8") }}*</label>
              <select
                  v-model="elem.gender"
                  required
                  class="dark:bg-black-btnInsert transition-150"
              >
                <option value="">{{ $t("8") }}</option>
                <option value="M">{{ $t("19") }}</option>
                <option value="F">{{ $t("20") }}</option>
              </select>
            </div>
            <div class="col-span-12 md:col-span-4 p-2 mt-2">
              <label>{{ $t("9") }}*</label>
              <select
                  v-model="elem.citizenship"
                  required
                  class="dark:bg-black-btnInsert transition-150"
              >
                <option value="">{{ $t("9") }}</option>
                <option
                    v-for="(item, key3) in citizenData"
                    :key="key3"
                    :value="item.code"
                >
                  {{ item.name_ru }}
                </option>
              </select>
            </div>
            <div class="col-span-12 md:col-span-4 p-2 mt-2">
              <label>{{ $t("10") }}*</label>
              <input
                  type="text"
                  v-model="elem.document_number"
                  :placeholder="t('10')"
                  required
                  style="text-transform: uppercase;"
                  class="dark:bg-black-btnInsert transition-150"
              />
            </div>
            <div class="col-span-12 md:col-span-4 p-2 mt-2">
              <label>{{ $t("11") }}*</label>
              <el-date-picker
                  class="!w-full book-date"
                  v-model="elem.document_expire"
                  :class="{
                  error:
                    v$.passengers.$each.$response?.$data[index]?.document_expire
                      ?.$error,
                }"
                  placeholder="DD.MM.YYYY"
                  type="date"
                  size="large"
                  :disabled-date="disableFutureDates"
                  format="DD/MM/YYYY"
                  value-format="YYYY-MM-DD"
              />
            </div>
          </div>
        </div>

        <div
            class="dark:bg-black-input px-3 py-4 md:p-5 config-border-radius bg-white-card transition-150 mt-2"
        >
          <h1 class="font-bold text-theme transition-150">{{ $t("12") }}</h1>
          <div class="grid grid-cols-12 dark:text-gray-300 transition-150">
            <div class="col-span-12 md:col-span-4 p-2">
              <label>{{ $t("16") }}*</label>
              <input
                  type="text"
                  v-model="formData.full_name"
                  :placeholder="$t('16')"
                  required
                  class="dark:bg-black-btnInsert transition-150"
              />
            </div>
            <div class="col-span-12 md:col-span-4 p-2">
              <label>Email*</label>
              <input
                  type="email"
                  v-model="formData.email"
                  placeholder="Email"
                  required
                  class="dark:bg-black-btnInsert transition-150"
              />
            </div>
            <div class="col-span-12 md:col-span-4 p-2">
              <label>{{ $t("17") }}*</label>
              <VueTelInput
                  v-bind="editBindProps"
                  v-model="formData.phone"
                  :class="{
                  '!border-red-700':
                    phoneValidation?.number && !phoneValidation?.valid,
                }"
                  @validate="(e) => (phoneValidation = e)"
              ></VueTelInput>
            </div>
          </div>
          <div>
            <div v-if="!phoneValidation.valid" class="text-red-600 text-center text-[14px]">{{ $t("84") }}</div>
          </div>

          <div class="flex items-center justify-between mt-3">
            <div>
              <div class="text-right mb-1 dark:text-gray-300 flex justify-center items-center gap-2 text-[14px]">
                <el-checkbox v-model="checked1" size="large"/> <span>Я принимаю условия</span> <a target="_blank" href="/public_offer_softbooking.pdf" class="text-blue-600">Публичная оферта</a>
              </div>
              <div class="flex gap-2 items-center">
                <el-button
                    v-if="phoneValidation.valid && checked1"
                    native-type="submit"
                    type="primary"
                    size="large"
                    :loading="loading"
                    class="btn bg-theme text-white !py-5"
                >
                  <div>
                    {{ $t("18") }}
                  </div>
                  <div class="ml-2">
                    {{ detailInfo?.data?.product.price }}
                    {{ detailInfo?.data?.product.currency }}
                  </div>
                </el-button>
                <el-button
                    v-else
                    disabled
                    native-type="button"
                    type="primary"
                    size="large"
                    :loading="loading"
                    class="btn bg-theme text-white !py-5 opacity-50"
                >
                  <div>
                    {{ $t("18") }}
                  </div>
                  <div class="ml-2">
                    {{ detailInfo?.data?.product.price }}
                    {{ detailInfo?.data?.product.currency }}
                  </div>
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>

    <div class="md:col-span-4 col-span-12 md:px-1 mt-2">
      <div
          class="bg-white-card dark:bg-black-input rounded-lg shadow-lg max-w-md w-full transition-150"
      >
        <div class="bg-[rgb(27,154,167)] text-white rounded-t-lg pl-6 p-4">
          <h2 class="text-lg font-semibold">{{ $t("13") }}</h2>
        </div>

        <div
            v-for="(offer, i) in detailInfo?.data?.product?.offers"
            :key="i"
            class="px-6 py-4 dark:text-gray-300"
        >
          <div>
            <div class="flex flex-col md:flex-row items-center justify-between">
              <div class="text-gray-600 dark:text-gray-300">
                1. Рейс: {{ offer.flight_number }}
              </div>
              <img
                  :src="offer.avia_company.logo"
                  alt="Airline"
                  class="w-32 h-8 object-cover"
              />
            </div>
            <div>
              <div class="text-gray-600 text-right dark:text-gray-300 my-2">
                <b> {{ $t("14") }}: {{ offer.baggage }}</b>
              </div>
            </div>

            <div class="dark:text-gray-300">
              <div class="flex flex-row justify-between items-center">
                <div class="text-center">
                  <div>{{ offer.departure.city }}</div>
                  <div>{{ offer.departure.date_format }}</div>
                  <div class="text-[22px]">{{ offer.departure.time }}</div>
                </div>
                <div class="sm:block hidden">
                  <div class="flex flex-col items-center">
                    <div>{{ offer.duration }}</div>
                    <div class="relative flex items-center">
                      <div
                          class="w-3 h-3 border-2 border-blue-300 dark:border-blue-500 rounded-full"
                      ></div>
                      <div
                          class="w-24 border border-blue-300 dark:border-blue-500 rounded-full"
                      ></div>
                      <div
                          class="w-3 h-3 border-2 border-blue-300 dark:border-blue-500 rounded-full"
                      ></div>
                    </div>
                  </div>
                </div>

                <div class="text-center">
                  <div>{{ offer.arrival.city }}</div>
                  <div>{{ offer.arrival.date_format }}</div>
                  <div class="text-[22px]">{{ offer.arrival.time }}</div>
                </div>
              </div>
            </div>
          </div>

          <div
              v-if="i === detailInfo?.data?.product?.offers.length - 1"
              class="flex justify-between items-center border-t-[3px] border-theme mt-6"
          >
            <div class="font-semibold">{{ $t("15") }}:</div>
            <div class="font-semibold">
              {{ detailInfo?.data?.product.price }} {{ offer.currency }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {IBookingForm} from "@/types";
import {VueTelInput} from "vue-tel-input";
import "vue-tel-input/vue-tel-input.css";
import {useApi} from "@/composables/useApi";
import {computed, nextTick, onMounted, reactive, ref} from "vue";
import {helpers, required, email} from "@vuelidate/validators";
import {useRoute} from "vue-router";
import router from "@/router";
import {useVuelidate} from "@vuelidate/core";
import {MaskInput} from "maska";
import {useI18n} from "vue-i18n";

const {t} = useI18n();
import {
  disableAdultCalendar,
  disableChildCalendar,
  disableInfantCalendar,
} from "@/utils";
import {useAuthStore} from "@/stores/auth";
import {ElNotification} from "element-plus";

const checked1 = ref(false)
const editBindProps = ref({
  mode: "international",
  dropdownOptions: {
    disabledDialCode: true,
    showDialCodeInList: true,
    showFlags: true,
    showSearchBox: true,
    width: "260px",
  },
  validCharactersOnly: true,
  inputOptions: {
    showDialCode: true,
    maxlength: 25,
  },
});
const phoneValidation = ref({});
const route = useRoute();
const authStore = useAuthStore();
const detailInfo = ref(null);
const formData: IBookingForm = reactive({
  reservation_id: route.query.reservation_id,
  phone: authStore.user?.data?.data?.phone
      ? String(authStore.user?.data?.data?.phone)
      : "",
  email: authStore.user?.data?.data?.email || "",
  full_name:
      (authStore.user?.data?.data?.userDetail?.last_name
          ? authStore.user?.data?.data?.userDetail?.last_name
          : "") +
      (authStore.user?.data?.data?.userDetail?.first_name
          ? authStore.user?.data?.data?.userDetail?.first_name
          : ""),
  from_id: null,
  platform: "site",
  passengers: [],
  user_id: authStore.user?.data?.data?.id || null,
});
const rules = computed(() => {
  return {
    full_name: {
      required,
    },
    email: {
      required,
      email,
    },
    phone: {
      required,
    },
    passengers: {
      $each: helpers.forEach({
        first_name: {
          required,
        },
        last_name: {
          required,
        },
        birth: {
          required,
        },
        gender: {
          required,
        },
        citizenship: {
          required,
        },
        document_number: {
          required,
        },
        document_expire: {
          required,
        },
        parent_document_number: {
          required,
        },
      }),
    },
  };
});
const loading = ref(false);
const v$ = useVuelidate(rules, formData, {
  $lazy: true,
});

const bookBtn = async () => {
  const result = await v$.value.$validate();
  if (result) {
    loading.value = true;
    await useApi()
        .$post("/v1/flight/book", formData)
        .then((res) => {
          loading.value = false;
          router.push({
            name: "Order",
            query: {id: res?.data?.data?.id},
          });
        })
        .catch((err) => {
          loading.value = false;
          ElNotification({
            title: "Error",
            message: err?.response?.data?.message,
            type: "error",
          });
        });
  }
};

function disableFutureDates(time) {
  const currentDate = new Date();
  const oneMonthAhead = new Date();
  oneMonthAhead.setMonth(currentDate.getMonth() + 5);
  return time.getTime() < oneMonthAhead.getTime();
}

const citizenData = ref([]);
const citizen = async function () {
  await useApi()
      .$get("/v1/user/citizenship")
      .then((res) => {
        citizenData.value = res.data;
      });
};

onMounted(async () => {
  await useApi()
      .$get("/v1/flight/reservation-info", {
        params: {
          reservation_id: route.query.reservation_id,
        },
      })
      .then((res) => {
        detailInfo.value = res.data;
        for (let i = 0; i < res.data.data.request.adult_qnt; i++) {
          formData.passengers.push({
            type: "ADT",
            first_name: "",
            last_name: "",
            birth: "",
            gender: "",
            citizenship: "",
            document_number: "",
            document_expire: "",
          });
        }
        for (let i = 0; i < res.data.data.request.child_qnt; i++) {
          formData.passengers.push({
            type: "CHI",
            first_name: "",
            last_name: "",
            birth: "",
            gender: "",
            citizenship: "",
            document_number: "",
            document_expire: "",
          });
        }
        for (let i = 0; i < res.data.data.request.infant_qnt; i++) {
          formData.passengers.push({
            type: "INF",
            first_name: "",
            last_name: "",
            birth: "",
            gender: "",
            citizenship: "",
            document_number: "",
            document_expire: "",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        router.go(-1);
      });

  await nextTick(() => {
    const inputs = document.querySelectorAll(
        ".el-date-editor .el-input__inner",
    );
    for (const key of inputs) {
      if (key) {
        key?.setAttribute("required", "true");
        key?.setAttribute("data-maska", "##/##/####");
        new MaskInput(key, {
          mask: (value) => "##/##/####",
        });
      }
    }
  });

  await citizen();
});

const inputElements = document.querySelectorAll('.vti__input.vti__phone');
inputElements.forEach((input) => {
  input.setAttribute('required', 'true');
});


document.title = t("18");
</script>

<style scoped>
input,
select {
  width: 100%;
  padding: 0.9rem 0.8rem;
  border-radius: 4px;
  border: none;
  outline: none;
}

label {
  font-size: 14px;
}
</style>
<style>
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
  border: 1px solid #d1d5db0a;
}

.dark .disabled div span {
  background-color: #1a2435 !important;
  border: none !important;
}

.dark .el-input--large .el-input__inner {
  color: #d1d5db;
}

.book-date .el-input__wrapper {
  border: none !important;
  background: white !important;
  border-radius: 4px !important;
  height: 55px !important;
}

.dark .book-date .el-input--large .el-input__wrapper {
  background-color: #0f172a;
  border: none !important;
}

.dark .book-date .el-input__wrapper {
  box-shadow: none;
  background: #0f172a !important;
  border-radius: 4px !important;
}

.vue-tel-input {
  height: 50px;
  border: none;
  background-color: #5f636826;
  border-radius: 4px;
  transition: 0.2s ease-in-out;
}

.vti__dropdown {
  border-radius: 4px;
  transition: 0.2s ease-in-out;
}

.vti__dropdown.open {
  background-color: #5f636826;
}

.vti__dropdown:hover {
  background-color: #5f636826;
}

.vti__input {
  transition: 0.2s ease-in-out;
}

.dark .vti__input {
  background-color: #0f172a;
}
</style>
