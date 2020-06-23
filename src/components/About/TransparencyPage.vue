<template>
  <div class="page transparencyPage">
    <div class="pageTitle">
      <h1 class="pageTitleText">
        Transparencia
      </h1>
    </div>
    <Loader :loading="isLoading" />
    <div class="pageRow">
      <div class="pageLeft">
        <div
          class="pageBody"
          v-if="transparencyPage"
          v-html="transparencyPage.text"
        ></div>
      </div>
      <div class="pageRight">
        <ul v-if="!isLoading">
          <li
            class="transparencyDocument"
            v-for="doc in documents"
            v-bind:key="doc.id"
          >
            <DownloadLink
              :title="`Descargar PDF: ${doc.name}`"
              :label="doc.name"
              :url="doc.documentUrl"
            />
          </li>
        </ul>
      </div>
    </div>
    <hr v-if="!isLoading" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import useDocuments from "@/factories/useDocuments";
import usePages from "@/factories/usePages";
import Loader from "@/components/Loader.vue";
import DownloadLink from "@/components/DownloadLink.vue";

export default defineComponent({
  name: "TransparencyPage",
  components: { Loader, DownloadLink },
  setup() {
    const {
      isLoading: isLoadingDocuments,
      documents,
      fetchDocuments
    } = useDocuments();
    const { isLoading, fetchPages, transparencyPage } = usePages();

    fetchPages();
    fetchDocuments();

    return {
      documents,
      isLoading: isLoading || isLoadingDocuments,
      transparencyPage
    };
  }
});
</script>
<style scoped lang="stylus">
@import '../../styles/variables.styl';

.transparencyPage
  .pageLeft
    margin-right: 20px;
    text-align: justify;

  .pageRight
    position: relative;
    margin-left: 20px;

  .transparencyDocument
    padding: 0 0 1em 0;

    a
      text-transform: uppercase;
      font-size: 20px;
      font-family: Montserrat;

      &:hover
        color: darken($blue, 10);
</style>
