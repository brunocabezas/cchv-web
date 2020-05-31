<template>
  <div class="media">
    <youtube
      v-if="youtubeUrl && youtubeUrl.length"
      :player-vars="playerVars"
      @ready="onPlayerReady"
      min-height="100%"
      width="100%"
      :video-id="youtubeVideoId"
      ref="youtube"
    >
    </youtube>
    <MediaCarousel v-if="gallery && gallery.length > 0" :images="gallery" />
  </div>
</template>

<script lang="ts">
import VueYoutube from "vue-youtube";
import MediaCarousel from "@/components/Media/MediaCarousel.vue";
import { defineComponent, PropType } from "@vue/composition-api";
import View from "@/types/viewTypes";

const Media = defineComponent({
  name: "Media",
  props: {
    youtubeUrl: {
      type: String,
      default: "",
      required: false
    },
    gallery: {
      type: Array as PropType<View.ViewGalleryImage[]>,
      default: () => [],
      required: false
    }
  },
  components: { MediaCarousel },
  setup(props) {
    return {
      youtubeVideoId: 1
    };
  }
});

export default Media;
</script>
<style lang="stylus">
@import '../../styles/variables.styl';

.media
  display: block;
  width: 100%;
  background-color: $blue;
  height: 500px;
</style>
