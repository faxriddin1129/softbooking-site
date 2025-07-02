<template>
  <div>
    <form @submit.prevent="onPaymentWithCard">
      <div class="grid grid-cols-12 gap-2 items-end mb-2 text-[16px] sm:p-3 p-1">


        <div class="mb-3 md:mb-0 col-span-12 md:col-span-12">
          <label for="cardType" class="form-label">{{ $t("89") }}</label>
          <select required class="form-control border-[#e5e7eb] rounded outline-none w-full border py-4 px-2" v-model="form.cardType" name="cardType" id="cardType">
            <option value="">{{ $t("113") }}</option>
            <option value="uzcard">UsCard</option>
            <option value="humo">Humo</option>
            <option value="bank_card">Visa / Mastercard</option>
          </select>
        </div>

        <div class="mb-3 md:mb-0 col-span-12 md:col-span-12">
          <label for="cardNumberInput" class="form-label">{{ $t("90") }}</label>
          <input
            v-model="form.cardNumber"
            type="text"
            class="form-control border-[#e5e7eb] rounded outline-none w-full border py-4 px-2"
            id="cardNumberInput"
            @input="formatCardNumber"
            placeholder="____-____-____-____"
            required
          />
        </div>

        <div class="mb-6 md:mb-0 col-span-4 md:col-span-4">
          <label for="cardNumberInput" class="form-label">{{ $t("112") }}</label>
          <input
              v-model="form.expire"
              type="text"
              class="form-control border-[#e5e7eb] rounded outline-none w-full border py-4 px-2"
              id="cardNumberInput"
              @input="validateExpiry"
              placeholder='MM/YY'
              required
          />
        </div>


        <div class="mb-6 md:mb-0 col-span-4 md:col-span-4" v-if="form.cardType === 'bank_card'">
          <label for="cardNumberInput" class="form-label">CVV</label>
          <input
            v-model="form.cvv"
            type="text"
            class="form-control border-[#e5e7eb] rounded outline-none w-full border py-4 px-2"
            id="cardNumberInput"
            placeholder="CVV"
            required
            maxlength="5"
          />
        </div>

        <div class="col-span-12 md:col-span-12 sm:mt-5">
          <el-button
            native-type="submit"
            :loading="loading"
            :disabled="loading"
            type="primary"
            class="!h-[50px] order-1 w-full md:order-[0]"
          >
            {{ $t("93") }}
          </el-button>
        </div>

      </div>
      <div
        class="form-check col-span-12 items-center gap-2 flex"
      ></div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, computed} from "vue";
import { useApi } from "@/composables/useApi";
import {ElNotification} from "element-plus";
import {useI18n} from "vue-i18n";

interface Props {
  type: string;
  returnUrl: string;
  orderId: string;
  email: string;
  type_code: string;
}
const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "on-submit"): void;
  (e: "on-close"): void;
}>();


const paymentCardForm = computed(() => {
  return {
    card_number: form.cardNumber.replace(/\s/g, ""),
    expire: form.expire + "",
    type: form.cardType.toLowerCase(),
    cvv: form.cvv || undefined,
    order_type: props.type,
    order_id: Number(props.orderId),
    return_url: props.returnUrl,
  };
});

const { t } = useI18n();
const loading = ref(false);
const form = reactive({
  cardType: "",
  cardNumber: "",
  expire: "",
  cvv: "",
});

const onPaymentWithCard = () => {
  loading.value = true;
  useApi()
      .$post("/v1/flight/payment-octo", paymentCardForm.value)
      .then((response) => {
        emit("on-submit");
        window.location.replace(response?.data?.url)
      })
      .catch((err) => {
        ElNotification({
          title: t("95"),
          message: err?.response?.data?.data?.errMessage || t("94"),
          type: "error",
        });
      })
      .finally(() => {
        loading.value = false;
      });
};

const formatCardNumber = () => {
  let cleanedValue = form.cardNumber.replace(/\D/g, "");
  cleanedValue = cleanedValue.slice(0, 16);
  form.cardNumber = cleanedValue.replace(/(\d{4})(?=\d)/g, "$1 ");
};

const validateExpiry = function (event) {
  let input = form.expire.replace(/\D/g, "");
  if (event.inputType === "deleteContentBackward") {
    return;
  }
  if (input.length >= 2) {
    let month = parseInt(input.slice(0, 2), 10);
    if (month < 1) month = 1;
    if (month > 12) month = 12;
    input = String(month).padStart(2, "0") + "/" + input.slice(2, 4);
  }
  form.expire = input;
}
</script>
