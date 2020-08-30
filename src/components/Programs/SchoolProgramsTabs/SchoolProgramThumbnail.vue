<template>
  <div class="schoolProgramThumbnail">
    <div v-if="program" class="schoolProgramMedia">
      <router-link
        v-if="program.is_active && program.gallery && program.gallery[0]"
        :title="program.name"
        :to="getUrlBySlug(program.slug)"
      >
        <ProgressiveImage :height="mediaHeight" :src="program.gallery[0].url" />
      </router-link>
      <ProgressiveImage
        v-else-if="program.gallery && program.gallery[0]"
        :height="mediaHeight"
        :src="program.gallery[0].url"
      />
    </div>
    <div v-if="program" class="schoolProgramInfo">
      <h3 class="schoolProgramName">
        <router-link
          v-if="program.is_active"
          :title="program.name"
          :to="getUrlBySlug(program.slug)"
          >{{ program.name }}</router-link
        >
        {{ !program.is_active ? program.name : "" }}
      </h3>
      <p class="schoolProgramAbstract" v-html="program.abstract"></p>
      <DownloadLink
        v-if="program.pdf"
        label="Descargar programa completo"
        :url="program.pdf"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";
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
@import '../../../styles/variables.styl';

.schoolProgramThumbnail
  display: flex;
  width: 100%;

  @media (max-width: $md)
    flex-direction: column;

  &:not(:first-child)
    @media (max-width: $md)
      margin-top: 1.5em;

  .schoolProgramMedia, .schoolProgramInfo
    flex: 1;

  .schoolProgramMedia
    width: 60%;
    padding-left: 0;
    margin-right: 1em;

    @media (max-width: $md)
      width: auto;
      margin: 0 $mobile_padding;

  .schoolProgramInfo
    padding-right: 0;
    font-size: 18px;
    padding: 0 1em;

    @media (max-width: $md)
      width: 100%;

    .schoolProgramAbstract
      margin-top: 0;
      text-align: justify;

    .schoolProgramName
      color: $blue;
      margin-top: 0;
      margin-bottom: 0;

      @media (max-width: $md)
        margin-top: 5px;
</style>
