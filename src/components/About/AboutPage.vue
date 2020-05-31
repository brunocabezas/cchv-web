<template>
  <div class="page">
    <div class="pageTitle">
      <h1 class="pageTitleText">Somos</h1>
    </div>
    <div v-if="aboutPage" class="pageContent">
      <div class="pageRow">
        <Media :gallery="aboutPage.gallery" />
      </div>
      <div v-html="aboutPage.text" class="pageRow pageBody"></div>
      <div class="pageRow">
        <a :href="teamUrl" title="Equipo" class="aboutSquareLink">
          Equipo
        </a>
        <a
          :href="transparencyUrl"
          title="Transparencia"
          class="aboutSquareLink"
        >
          Transparencia
        </a>
      </div>
    </div>
    <Loader :loading="isLoading" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "@vue/composition-api";
import usePages from "@/factories/usePages";
import Loader from "@/components/Loader.vue";
import Media from "@/components/Media/Media.vue";
import AppUrls from "@/utils/urls";

export default defineComponent({
  name: "AboutPage",
  components: { Loader, Media },
  setup() {
    const { isLoading, fetchPages, aboutPage } = usePages();

    fetchPages();

    return {
      isLoading,
      aboutPage,
      displayContent: !!aboutPage,
      transparencyUrl: AppUrls.AboutTransparency,
      teamUrl: AppUrls.AboutTeam
    };
  }
});
</script>
<style scoped lang="stylus">
@import '../../styles/variables.styl';

.aboutSquareLink
  background-color: $blue;
  width: 50%;
  color: white;
  font-size: 36px;
  padding: 1em;
  text-align: center;
  font-family: NoeDisplay;
  margin: 15px;
  transition: background-color 0.2s;

  &:hover
    background-color: darken($blue, 10);

  &:first-child
    margin-left: 0;

  &:last-child
    margin-right: 0;
</style>
