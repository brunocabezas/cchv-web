import { defineComponent, ref, useFetch } from "@nuxtjs/composition-api";
import axios from "axios";

export default defineComponent({
  setup() {
    const data = ref([]);

    const { fetch, fetchState } = useFetch(async () => {
      data.value = await axios.get("https://www.cchv.cl/futuro/wp-json/wp/v2/custom-pages");
    });

    // Manually trigger a refetch

    // Access fetch error, pending and timestamp
    fetchState;

    return { data, fetch, fetchState };
  }
});
