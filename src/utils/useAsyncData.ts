import Vue from "vue"
import VueCompositionApi, { ref, computed, Ref } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import client from "../../api/client"
import { HasDefined } from "@vue/composition-api/dist/types/basic"
import { AxiosPromise, AxiosResponse } from "axios"

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
  isLoading: Readonly<Ref<boolean>>
  fetch: () => void
  data: Ref<HasDefined<T>>
}

interface AxiosParams {
  [paramKey: string]: string | number
}

export default function useAsyncData<T>(url: apiRoutes) {
  const status = ref(AsyncDataStatus.Initial)
  const data = ref<Array<T>>([])
  // Fetch data from the url with GET
  function fetch(
    urlParams?: AxiosParams,
    // If pagination is defined as true, res.data is pushed to data
    pagination: boolean = false
  ): Promise<AxiosResponse<T>> {
    // Only fetch data when data status is not success
    if (status.value !== AsyncDataStatus.Loading) {
      return client
        .get(url, {
          params: {
            per_page: 100,
            ...urlParams,
          },
        })
        .then((res: AxiosResponse<Array<T>>) => {
          const val = [...data.value, ...res.data]
          data.value = !pagination ? res.data : val
          status.value = AsyncDataStatus.Success

          return res
        })
        .catch((err) => {
          status.value = AsyncDataStatus.Error
          return err
        })
    }

    return new Promise((resolve) => resolve())
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
