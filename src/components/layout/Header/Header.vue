<template>
  <div class="header">
    <Logo />
    <HeaderNav />
  </div>
</template>

<script lang="ts" src="./header.ts"></script>
<style scoped lang="stylus">
@import '../../../styles/variables.styl'
.header
  display: flex;
  height $header_height
  align-items center
  justify-content center
  border-bottom 1px solid $grey
</style>
