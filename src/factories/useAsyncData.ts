import apiRoutes from "@/api/apiRoutes"
import client from "@/api/client"
import Vue from "vue"
import VueCompositionApi, { ref, computed } from "@vue/composition-api"

Vue.use(VueCompositionApi)

export enum AsyncDataStatus {
  Initial,
  Loading,
  Success,
  Error,
}

const status = ref(AsyncDataStatus.Initial)

export default function useAsyncData<T>(url: apiRoutes) {
  const data = ref<T>([])
  // Fetch data from the url with GET
  function fetch() {
    // Only fetch data when data status is not success
    if (status.value !== AsyncDataStatus.Success) {
      status.value = AsyncDataStatus.Loading
      client
        .get(url)
        .then((t) => {
          data.value = t.data
          status.value = AsyncDataStatus.Success
        })
        .catch((err) => {
          status.value = AsyncDataStatus.Error
        })
    }
  }

  return {
    status: computed(() => status.value),
    data,
    fetch,
  }
}
