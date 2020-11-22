import { defineComponent, ref, useFetch } from "@nuxtjs/composition-api";
import apiRoutes from "~/api/apiRoutes";
import client from "~/api/client";

export default defineComponent({
  setup() {
    const data = ref([]);

    const { fetch, fetchState } = useFetch(async () => {
      data.value = await client.get(apiRoutes.Pages);
    });

    // Access fetch error, pending and timestamp
    fetchState;

    return { data, fetch, fetchState };
  }
});
