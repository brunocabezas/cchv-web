import { ref, computed, onMounted, onUnmounted } from "@vue/composition-api";

export default function useWindowSize() {
  if (process.client) {
    const width = ref(window.innerWidth);
    const height = ref(window.innerHeight);
    const update = () => {
      width.value = window.innerWidth;
      height.value = window.innerHeight;
    };

    const widthPixel = computed(() => `${width.value}px`);
    const heightPixel = computed(() => `${height.value}px`);

    onMounted(() => {
      window.addEventListener("resize", update);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", update);
    });

    return { width, height, widthPixel, heightPixel };
  } else {
    return {
      width: ref(0),
      height: ref(0),
      widthPixel: ref(0),
      heightPixel: ref(0)
    };
  }
}
