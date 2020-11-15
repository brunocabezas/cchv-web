<template>
  <div class="app" id="app">
    <Header />
    <Nuxt class="appContent" />
    <Footer />
  </div>
</template>

<script>
import { defineComponent } from "@nuxtjs/composition-api";
import Footer from "~/layouts/Footer/Footer";
import Header from "~/layouts/Header/Header";

export default defineComponent({
  name: "Default",
  components: { Footer, Header }
});
</script>
<style lang="stylus">
@import '~/assets/variables.styl';

.app
  .appContent
    margin-top: $header_height;

    @media (max-width: $md)
      margin-top: $header_mobile_height;
</style>
