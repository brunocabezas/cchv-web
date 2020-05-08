<template>
  <div class="home-carousel">
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
    <div>
      <carousel>
        <slide>
          Slide 1 Content
        </slide>
        <slide>
          Slide 2 Content
        </slide>
      </carousel>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";
import { useAsyncState } from "@vueuse/core";
import apiRoutes from "../../api/apiRoutes";
import client from "../../api/client";
import Loader from "@/components/Loader.vue";
import { getCustomField } from "../../utils/api";
import { Carousel as CarouselComp, Slide } from "vue-carousel";
import { Carousel, CarouselKeys } from "../../types/customFieldsTypes";
import { WpResponseData, WPResponseItem } from "../../types/wordpressTypes";

const initialState: WpResponseData = [];

const HomeCarousel = defineComponent({
  name: "HomeCarousel",
  components: { Loader, Carousel: CarouselComp, Slide },
  setup() {
    const { state, ready } = useAsyncState<WpResponseData>(
      client.get(apiRoutes.HomeCarousel).then(t => t.data),
      initialState
    );

    // TODO fix type def
    const carousel: any = computed(() => {
      // The first carousel will be used displayed on the home page
      return [];
      // const homeCarousel: WPResponseItem = state.value[0];
      // return { images: getCustomField(homeCarousel, CarouselKeys.images) };
    });

    return { ready, carousel };
  }
});
export default HomeCarousel;
</script>

<style lang="stylus" scoped>
@import '../../styles/variables.styl';

.home-carousel
  background-color: $blue;
  height: 'calc(100vh - %s)' % $header_height;
</style>
