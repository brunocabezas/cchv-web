import { ref, computed, Ref, unref, reqSsrRef } from "@nuxtjs/composition-api";
import apiRoutes from "@/api/apiRoutes";
import client from "@/api/client";
import { AxiosResponse } from "axios";
import { WpResponseData } from "@/types/wordpressTypes";

export enum AsyncDataStatus {
  Initial,
  Loading,
  Success,
  Error
}

interface asyncData<T> {
  status: Readonly<Ref<AsyncDataStatus>>;
  isLoading: Readonly<Ref<boolean>>;
  fetch: (
    urlParams?: AxiosParams | undefined,
    usePagination?: boolean,
    forceFetch?: boolean
  ) => Promise<AxiosResponse<T>>;
  data: any;
}

interface AxiosParams {
  [paramKey: string]: string | number;
}

 
export default function useAsyncData<T>(url: apiRoutes): asyncData<T> {
  const status = ref(AsyncDataStatus.Initial);
  const data = reqSsrRef<WpResponseData<T>>([]);
  // Fetch data from the url with GET
  function fetch(
    urlParams?: AxiosParams,
    // If usePagination is defined as true, res.data is pushed to data
    usePagination: boolean = false,
    forceFetch: boolean = false
  ): Promise<AxiosResponse<T>> {
    // Normally, fetch is avoided when status is loading or success
    // If usePagination is active, data is fetched when status is different from loading
    const fetchData =
      forceFetch ||
      (status.value !== AsyncDataStatus.Loading &&
        status.value !== AsyncDataStatus.Success) ||
      (status.value !== AsyncDataStatus.Loading && usePagination);

    if (fetchData) {
      status.value = AsyncDataStatus.Loading;

      return client
        .get(url, { params: { per_page: 100, ...urlParams } })
        .then((res: any) => {
          //
          // TODO enable use of usePagination
          // if (usePagination) {
          //   const arrayWithDataAndResponse = [...unref(data.value), ...res.data];
          //   data.value = arrayWithDataAndResponse;
          // } else {
          // }

          // When pagination is active
          data.value = unref(res.data);

          status.value = AsyncDataStatus.Success;
          return res;
        })
        .catch(err => {
          status.value = AsyncDataStatus.Error;
          console.error(err);
          return err;
        });
    } else {
      return new Promise(resolve => resolve());
    }
  }

  const isLoading = computed(() => status.value === AsyncDataStatus.Loading);

  return {
    status: computed(() => status.value),
    data,
    fetch,
    isLoading
  };
}
