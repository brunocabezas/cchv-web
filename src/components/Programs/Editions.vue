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
              <div v-if="!!event.brochure_url" class="editionBrochure">
                <a
                  class="editionBrochureLink"
                  target="_blank"
                  title="Ver el catálogo"
                  :href="event.brochure_url"
                  >Ver catálogo
                  <v-icon :color="MAIN_COLOR" name="external-link-alt"> </v-icon
                ></a>
              </div>
            </div>
            <div class="editionMedia">
              <Media
                height="100%"
                :gallery="event.gallery"
                :youtubeUrl="event.video_url"
              />
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
import { MAIN_COLOR } from "@/utils/static";
import Icon from "vue-awesome/components/Icon.vue";
import useEditions from "@/factories/useEditions";

const Editions = defineComponent({
  name: "Editions",
  components: {
    Loader,
    Media,
    "v-icon": Icon
  },
  setup() {
    const { editions, fetchEditions, isLoading } = useEditions();

    fetchEditions();

    return {
      editions,
      isLoading,
      MAIN_COLOR
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
        box-sizing: content-box;
        height: 500px;
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

          .editionBrochure
            display: flex;
            align-items: center;
            justify-content: flex-end;

            .editionBrochureLink
              display: flex;
              align-items: center;
              transition: all 0.2s;

              &:hover
                opacity: 0.7;

              .fa-icon
                margin-left: 10px;

        .editionMedia
          min-height: 500px;
          padding: 100px 0;
          background-color: $blue;
</style>
