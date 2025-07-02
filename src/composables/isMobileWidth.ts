import { watch, ref } from "vue";
import { useWindowSize } from "@vueuse/core";

export const useMobileWidth = () => {
  const { width, height } = useWindowSize();
  const screenWidth = ref(width);

  watch(
    () => width,
    () => {
      screenWidth.value = width;
    },
  );
  return { screenWidth };
};

export class screenWidth {}
