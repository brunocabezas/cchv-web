<template>
  <div class="page transparencyPage">
    <div class="pageTitle">
      <h1 class="pageTitleText">
        Transparencia
      </h1>
    </div>
    <div class="pageRow">
      <div class="pageLeft">
        <div
          class="pageBody"
          v-if="transparencyPage"
          v-html="transparencyPage.text"
        ></div>
      </div>
      <div class="pageRight">
        <Loader :loading="isLoading" />
        <ul v-if="!isLoading">
          <li
            class="transparencyDocument"
            v-for="doc in documents"
            v-bind:key="doc.id"
          >
            <a :title="`Descargar ${doc.name}`" :href="doc.url"
              >{{ doc.name }}
            </a>
          </li>
        </ul>
      </div>
    </div>
    <hr />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import useDocuments from "@/factories/useDocuments";
import usePages from "@/factories/usePages";
import Loader from "@/components/Loader.vue";

export default defineComponent({
  name: "TransparencyPage",
  components: { Loader },
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
