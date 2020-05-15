<template>
  <div
    class="footerSponsors"
    v-bind:class="{ [`footerSponsors--loading`]: isLoading }"
  >
    <Loader color="white" :loading="isLoading" />
    <div v-if="!isLoading" class="sponsorCategory">
      <h3 class="sponsorsCategory">Category</h3>
      <div class="sponsorsGrid">
        <a
          class="sponsor"
          target="_blank"
          :href="sponsor.url"
          :title="sponsor.name"
          v-for="sponsor in sponsors"
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
    const { sponsors, fetchSponsorsAndCategories, isLoading } = useSponsors();

    fetchSponsorsAndCategories();
    return {
      sponsors: computed(() => {
        console.log(sponsors.value);
        return sponsors.value;
      }),
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
      margin: 2em 15px;
      max-height: 100px;
      box-sizing: border-box;
      display: inline-block;
      width: calc(20% - 30px);
      background-position: center center;
      background-repeat: no-repeat;
      background-size: contain;
</style>
