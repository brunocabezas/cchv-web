<template>
  <div class="carousel">
    <div>home slides</div>
    <Loader v-if="!ready" />
    <div v-if="ready" class="carousel">
      <img
        v-bind:key="img.ID"
        v-for="img in carousel"
        :src="img.url"
        :alt="img.name"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useAsyncState } from "@vueuse/core";
import apiRoutes from "../../api/apiRoutes";
import client from "../../api/client";
import Loader from "@/components/Loader.vue";
import { getCustomField } from "../../utils/api";
import { Carousel, CarouselKeys } from "../../types/customFieldsTypes";
import { WpResponseData, WPResponseItem } from "../../types/wordpressTypes";

const initialState: WpResponseData = [];

const HomeCarousel = defineComponent({
  name: "HomeCarousel",
  components: { Loader },
  setup() {
    const { state, ready } = useAsyncState<WpResponseData>(
      client.get(apiRoutes.HomeCarousel).then(t => t.data),
      initialState
    );

    const carousel: Carousel = computed(() => {
      // The first carousel will be used displayed on the home page
      const homeCarousel: WPResponseItem = state.value[0];
      return getCustomField(homeCarousel, CarouselKeys.images);
    });

    return { ready, carousel };
  }
});
export default HomeCarousel;
</script>

<style scoped></style>
