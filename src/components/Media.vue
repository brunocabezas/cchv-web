<template>
  <div class="media"></div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

const Media = defineComponent({
  name: "Media"
});

export default Media;
</script>
<style lang="stylus">
@import '../styles/variables.styl';

.media
  display: block;
  width: 100%;
  background-color: $blue;
  height: 500px;
</style>
