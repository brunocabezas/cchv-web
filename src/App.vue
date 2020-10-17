<template>
  <div class="app" id="app">
    <Header />
    <router-view class="appContent"></router-view>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import Header from "@/components/layout/Header/Header.vue";
import Footer from "@/components/layout/Footer/Footer.vue";

const App = defineComponent({
  components: { Header, Footer },
  name: "App",
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Inicio",
    // all titles will be injected into this template
    titleTemplate: "CChV | %s",
    meta: [
      {
        property: "og:title",
        content: "Title",
        // following template options are identical
        // template: '%s - My page',
        template: (chunk: any) => {
          console.log(chunk);
          return `${chunk} - My page`;
        },
        vmid: "og:title"
      }
    ]
  }
});

export default App;
</script>

<style lang="stylus" scoped>
@import './styles/variables.styl';

.app
  .appContent
    margin-top: $header_height;

    @media (max-width: $md)
      margin-top: $header_mobile_height;
</style>
