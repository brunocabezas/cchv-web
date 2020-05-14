<template>
  <div class="page newsPost">
    <div class="pageTitle">
      <h1 v-if="post" class="pageTitleText">{{ post.title }} </h1>
      <!-- <div class="pageTitleInput">search input</div>-->
    </div>
    <Loader v-if="loading" />
  </div>
</template>

<script lang="ts" src="./newsPost.ts"></script>
<style scoped lang="stylus">
@import '../../../styles/variables.styl';
</style>
