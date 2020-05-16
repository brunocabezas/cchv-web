<template>
  <div class="page">
    <div class="pageTitle">
      <h1 class="pageTitleText">
        Transparencia
      </h1>
    </div>
    <div class="pageRow">
      <div class="pageLeft">left text</div>
      <div class="pageRight">
        <ul>
          <li v-for="doc in documents" v-bind:key="doc.id">
            <a :title="`Descargar ${doc.name}`" :href="doc.url"
              >{{ doc.name }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import useDouseDocuments from "@/factories/useDocuments";
import Loader from "@/components/Loader.vue";

export default defineComponent({
  name: "Transparency",
  components: { Loader },
  setup() {
    const { isLoading, documents, fetchDocuments } = useDouseDocuments();

    fetchDocuments();
    return { documents, isLoading };
  }
});
</script>
<style scoped lang="stylus">
@import '../styles/variables.styl';
</style>
