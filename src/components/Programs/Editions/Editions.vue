<template>
  <div class="editions">
    <Loader :loading="isLoading" />
    <div class="editionsList">
      <div
        v-bind:key="event.id"
        v-for="event in editions"
        class="editionContainer"
      >
        <div class="editionContainerWrapper">
          <Edition :edition="event" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./editions.ts"></script>
<style lang="stylus" src="./editions.styl"></style>
