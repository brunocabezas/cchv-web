<template>
  <div class="downloadLink">
    <span class="downloadLinkLoading" v-if="isLoading"
      >Preparando descarga ...
    </span>
    <a
      :title="linkTitle"
      v-if="!isLoading"
      :href="url"
      v-text="label || url"
      @click.prevent="downloadItem(url, label || url)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import Axios from "axios";

const DownloadLink = defineComponent({
  props: {
    url: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: false
    },
    title: {
      type: String,
      required: false
    }
  },
  name: "DownloadLink",
  setup(props) {
    const loading = ref(false);
    function downloadItem(url: string, label: string) {
      loading.value = true;
      Axios.get(url, { responseType: "blob" })
        .then(response => {
          const blob = new Blob([response.data], { type: "application/pdf" });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = label;
          link.click();
          URL.revokeObjectURL(link.href);
        })
        .catch(err => console.error(err))
        .finally(() => (loading.value = false));
    }

    return {
      downloadItem,
      isLoading: loading,
      linkTitle: props.title || props.label || props.url
    };
  }
});

export default DownloadLink;
</script>
<style lang="stylus">
@import '../styles/variables.styl';

.downloadLink
  font-size: 18px;
  height: auto;

  .downloadLinkLoading
    font-size: 16px;
    color: #344284;
    font-family: OpenSans;
    font-size: 18px;
</style>
