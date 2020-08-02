<template>
  <div class="editions">
    <Loader :loading="isLoading" />
    <div class="editionsList">
      <div
        v-bind:key="event.id"
        v-for="event in editions"
        class="editionContainer"
      >
        <div class="editionContainerWrapper">
          <div class="edition">
            <div class="editionInfo">
              <h1 class="editionName">{{ event.name }}</h1>
              <p class="editionDate" v-if="event.date">{{ event.date }}</p>
              <div class="pageBody" v-html="event.text"></div>
            </div>
            <div class="editionMedia">
              <Media height="100%" />
            </div>
          </div>
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
  setup() {
    const { editions, fetchEditions, isLoading } = useEditions();

    fetchEditions();

    return {
      editions,
      isLoading
    };
  }
});

export default Editions;
</script>
<style scoped lang="stylus">
@import '../../styles/variables.styl';

$margin_between_videos = 2em;

.editions
  position: relative;
  margin-top: 2em;

  // edition has different background colors
  .editionContainer
    &:nth-child(odd)
      background-color: $grey;

    .editionContainerWrapper
      max-width: $boxed_content_max_width;
      margin: 0 auto;
      page_padding(0, 0);

      .edition
        min-height: 500px;
        max-height: 700px;
        padding: 3em 0;
        margin: 0 auto;
        display: flex;
        flex-direction: row;

        .editionInfo, .editionMedia
          width: 50%;

        .editionInfo
          text-align: justify;
          padding-right: 1em;
          overflow-y: auto;

          .editionName
            margin-top: 0;
            margin-bottom: 10px;

          .editionDate
            color: $latest_posts_grey;
            font-size: 16px;
            margin-top: 10px;

        .editionMedia
          min-height: 500px;
          background-color: $blue;
</style>
