import Vue from "vue"
import VueCompositionApi, { ref, computed, Ref } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import client from "../../api/client"
import { HasDefined } from "@vue/composition-api/dist/types/basic"

Vue.use(VueCompositionApi)

export enum AsyncDataStatus {
  Initial,
  Loading,
  Success,
  Error,
}

// TODO type async data
interface asyncData<T> {
  status: Readonly<Ref<AsyncDataStatus>>
  isLoading: Readonly<Ref<Boolean>>
  fetch: () => void
  data: Ref<HasDefined<T>>
}

export default function useAsyncData<T>(url: apiRoutes) {
  const status = ref(AsyncDataStatus.Initial)
  const data = ref<T>([])
  // Fetch data from the url with GET
  function fetch() {
    // Only fetch data when data status is not success
    if (status.value !== AsyncDataStatus.Success) {
      status.value = AsyncDataStatus.Loading
      client
        .get(url)
        .then((res) => {
          data.value = res.data
          status.value = AsyncDataStatus.Success
        })
        .catch((err) => {
          status.value = AsyncDataStatus.Error
        })
    }
  }

  const isLoading = computed(() => {
    return status.value === AsyncDataStatus.Loading
  })

  return {
    status: computed(() => status.value),
    data,
    fetch,
    isLoading,
  }
}
