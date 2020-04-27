<template>
  <div class="logo">
    <a :href="homeUrl" title="Inicio">
      <img alt="Vue logo" src="@/assets/logo.png"
    /></a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppUrls from "../utils/urls";

const Logo = defineComponent({
  name: "Logo",
  setup() {
    return { homeUrl: AppUrls.Home };
  }
});

export default Logo;
</script>
