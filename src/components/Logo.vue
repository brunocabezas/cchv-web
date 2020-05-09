<template>
  <a class="logo" :href="homeUrl" title="Inicio">
    <img alt="Vue logo" src="@/assets/logo.png" />
  </a>
</template>

<script lang="ts">
import { createComponent } from "@vue/composition-api";
import AppUrls from "@/utils/urls";

const Logo = createComponent({
  name: "Logo",
  setup() {
    return { homeUrl: AppUrls.Home };
  }
});

export default Logo;
</script>
<style lang="stylus">
.logo
  display inline-block
  width 300px
  height 100%
  padding 30px
  img
    width 100%
</style>
