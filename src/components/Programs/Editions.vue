<template>
  <div class="editions">
    <Loader :loading="isLoading" />
    <div class="editionsList">
      <div v-bind:key="event.id" v-for="event in editions" class="edition">
        <div class="editionInfo">
          <h1 class="editionName">{{ event.name }}</h1>
          <div class="pageBody" v-html="event.text"></div>
        </div>
        <div class="editionMedia">
          <Media
            :youtubeUrl="event.video_url"
            height="100%"
            :gallery="event.gallery"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";
import Loader from "@/components/Loader.vue";
import Media from "@/components/Media/Media.vue";
import useEditions from "@/factories/useEditions";

const Editions = defineComponent({
  name: "Editions",
  components: {
    Loader,
    Media
  },
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { editions, fetchEditions, isLoading } = useEditions();

    fetchEditions();

    return { editions, isLoading };
  }
});

export default Editions;
</script>
<style lang="stylus">
@import '../../styles/variables.styl';

$margin_between_videos = 2em;

.editions
  position: relative;

  .edition
    padding: 3em 0;
    min-height: 500px;
    display: flex;
    flex-direction: row;
    background-color: $white;

    &:nth-child(odd)
      background-color: $grey;

    .editionInfo, .editionMedia
      width: 50%;

    .editionInfo
      text-transform: justify;
      padding: 0 2em;

      .editionName
        margin-top: 0;

    .editionMedia
      min-height: 500px;
      background-color: $blue;
</style>
