<template>
  <div class="schoolProgramThumbnail">
    <div v-if="program" class="schoolProgramMedia">
      <!-- displayed link on <ProgressiveImage/> only if program is active -->
      <nuxt-link
        v-if="program.is_active && program.gallery && program.gallery[0]"
        :title="program.name"
        :to="getUrlBySlug(program.slug)"
      >
        <ProgressiveImage :height="mediaHeight" :src="program.gallery[0].url" />
      </nuxt-link>
      <ProgressiveImage
        v-else-if="program.gallery && program.gallery[0]"
        :height="mediaHeight"
        :src="program.gallery[0].url"
      />
    </div>
    <div v-if="program" class="schoolProgramInfo">
      <h3 class="schoolProgramName">
        <!-- displayed link on name only if program is active -->
        <nuxt-link
          v-if="program.is_active"
          :title="program.name"
          :to="getUrlBySlug(program.slug)"
          >{{ program.name }}</nuxt-link
        >
        {{ !program.is_active ? program.name : "" }}
      </h3>
      <p class="schoolProgramAbstract" v-html="program.abstract"></p>
      <DownloadLink
        v-if="program.pdf"
        label="Descargar programa completo"
        :url="program.pdf"
      />
      <hr class="schoolProgramThumbnailSeparator" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "@nuxtjs/composition-api";
import ProgressiveImage from "@/components/ProgressiveImage.vue";
import DownloadLink from "@/components/DownloadLink.vue";
import useSchoolPrograms from "@/models/useSchoolPrograms";
import { SchoolProgram } from "@/types";
import useMediaQueries from "@/hooks/useMediaQueries";

const SchoolProgramThumbnail = defineComponent({
  name: "SchoolProgramThumbnail",
  components: {
    ProgressiveImage,
    DownloadLink
  },
  props: {
    program: Object,
    isWorkshop: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { onBigScreen } = useMediaQueries();
    const {
      getSchoolProgramUrlBySlug,
      getWorkshopUrlBySlug
    } = useSchoolPrograms();
    return {
      getUrlBySlug: computed(() =>
        props.isWorkshop ? getWorkshopUrlBySlug : getSchoolProgramUrlBySlug
      ),
      mediaHeight: computed(() => (onBigScreen.value ? "300px" : "180px"))
    };
  }
});

export default SchoolProgramThumbnail;
</script>
<style lang="stylus">
@import '~/assets/variables.styl';

.schoolProgramThumbnail
  display: flex;
  width: 100%;

  @media (max-width: $md)
    flex-direction: column;

  &:not(:first-child)
    @media (max-width: $md)
      margin-top: 1.5em;

  &:last-child
    .schoolProgramThumbnailSeparator
      display: none;

  .schoolProgramThumbnailSeparator
    border: 1px solid darken($grey, 10);

  .schoolProgramMedia, .schoolProgramInfo
    flex: 1;

  .schoolProgramMedia
    width: 60%;
    padding-left: 0;
    margin-right: 1em;

    @media (max-width: $md)
      width: auto;
      padding: 0 $mobile_padding;
      margin: 0;

  .schoolProgramInfo
    padding-right: 0;
    font-size: 18px;
    padding: 0 1em;

    @media (max-width: $md)
      width: 100%;
      padding: 0 $mobile_padding;

    .schoolProgramAbstract
      margin-top: 0;
      text-align: justify;

    .schoolProgramName
      color: $blue;
      margin-top: 0;
      margin-bottom: 0;

      @media (max-width: $md)
        margin-top: 5px;

      &:hover
        text-decoration: underline;
</style>
