<template>
  <div
    class="footerSponsors"
    v-bind:class="{ [`footerSponsors--loading`]: isLoading }"
  >
    <Loader color="white" :loading="isLoading" />
    <div
      v-for="cat in sponsorsCategories"
      v-bind:key="cat.id"
      class="sponsorCategory"
    >
      <h3 class="sponsorsCategory">{{ cat.name }}</h3>
      <div class="sponsorsGrid">
        <a
          class="sponsor"
          target="_blank"
          :href="sponsor.url"
          :title="sponsor.name"
          v-for="sponsor in cat.sponsors"
          v-bind:style="{
            'background-image': `url(${sponsor.logo})`,
            height: `100px`
          }"
          v-bind:key="sponsor.id"
        >
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";
import useSponsors from "@/factories/useSponsors";
import { AsyncDataStatus } from "@/factories/useAsyncData";
import Loader from "@/components/Loader.vue";

export default defineComponent({
  name: "FooterSponsors",
  components: { Loader },
  setup() {
    const {
      sponsorsCategories,
      fetchSponsorsAndCategories,
      isLoading
    } = useSponsors();

    fetchSponsorsAndCategories();
    return {
      sponsorsCategories,
      isLoading
    };
  }
});
</script>

<style lang="stylus" scoped>
.footerSponsors
  position: relative;
  display: flex;
  color: white;

  &--loading
    justify-content: center;

    .loader
      width: auto;

  .sponsorsCategory
    font-family: Montserrat;

  .sponsorsGrid
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: flex-start;

    .sponsor
      flex: 1;
      margin: 2em 15px;
      max-height: 100px;
      box-sizing: border-box;
      width: calc(20% - 30px);
      background-position: center center;
      background-repeat: no-repeat;
      background-size: contain;
</style>
