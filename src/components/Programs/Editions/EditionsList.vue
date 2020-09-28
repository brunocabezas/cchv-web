<template>
  <div class="editions">
    <Loader size="20px" :loading="isLoading" />
    <div v-if="!isLoading" class="editionsList">
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

<script lang="ts" src="./editionsList.ts"></script>
<style lang="stylus" src="./editionsList.styl"></style>
