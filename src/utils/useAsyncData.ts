import Vue from "vue"
import VueCompositionApi, { ref, computed, Ref } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import client from "../../api/client"
import { AxiosResponse } from "axios"

Vue.use(VueCompositionApi)

export enum AsyncDataStatus {
  Initial,
  Loading,
  Success,
  Error,
}

interface asyncData<T> {
  status: Readonly<Ref<AsyncDataStatus>>
  isLoading: Readonly<Ref<boolean>>
  fetch: (
    urlParams?: AxiosParams | undefined,
    pagination?: boolean
  ) => Promise<AxiosResponse<T>>
  data: Ref<T[]>
}

interface AxiosParams {
  [paramKey: string]: string | number
}

export default function useAsyncData<T>(url: apiRoutes): asyncData<T> {
  const status = ref(AsyncDataStatus.Initial)
  const data = ref<Array<T>>([])
  // Fetch data from the url with GET
  function fetch(
    urlParams?: AxiosParams,
    // If pagination is defined as true, res.data is pushed to data
    pagination: boolean = false
  ): Promise<AxiosResponse<T>> {
    // Normally, fetch is avoided when status is loading or success
    // If pagination is active, data is fetched when status is different from loading
    const fetchData =
      (status.value !== AsyncDataStatus.Loading &&
        status.value !== AsyncDataStatus.Success) ||
      (status.value !== AsyncDataStatus.Loading && pagination)

    if (fetchData) {
      status.value = AsyncDataStatus.Loading

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
          console.error(err)
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
