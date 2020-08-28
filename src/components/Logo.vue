<template>
  <router-link class="logo" :to="homeUrl" title="Inicio">
    <img v-if="onBigScreen" alt="Vue logo" src="@/assets/logo.png" />
    <img v-else alt="Vue logo" src="@/assets/white-logo.png" />
  </router-link>
</template>

<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";
import Urls from "@/utils/urls";
import useMediaQueries from "@/hooks/useMediaQueries";

const Logo = defineComponent({
  name: "Logo",
  setup() {
    const { onBigScreen } = useMediaQueries();

    const logoUrl = computed<string>(() =>
      onBigScreen.value ? "@/assets/logo.png" : "@/assets/white-logo.png"
    );

    return { onBigScreen, homeUrl: Urls.Home, logoUrl };
  }
});

export default Logo;
</script>
<style lang="stylus">
@import '../styles/variables.styl';

.logo
  display: flex;
  width: 300px;
  align-items: center;

  img
    width: 100%;
    padding: 0 30px;

    @media (max-width: $md)
      width: auto;
      height: 40px;
      padding: 0;
</style>
