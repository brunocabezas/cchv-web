<template>
  <div class="header">
    <Logo />
    <HeaderNav />
  </div>
</template>

<script lang="ts">
import HeaderNav from "@/components/layout/Header/HeaderNav.vue";
import Logo from "@/components/Logo.vue";
import { createComponent } from "@vue/composition-api";

const Header = createComponent({
  name: "Header",
  components: { Logo, HeaderNav }
});

export default Header;
</script>
<style scoped lang="stylus">
@import '../../../styles/variables.styl';

.header
  display: flex;
  height: $header_height;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid $grey;
</style>
