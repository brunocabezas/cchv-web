<template>
  <div
    class="footerSponsors"
    v-bind:class="{ [`footerSponsors--loading`]: isLoading }"
  >
    <Loader color="white" :loading="isLoading" />
    <div
      v-bind:class="{
        'sponsorCategory--big': cat.name === BIG_SPONSOR_CATEGORY_LABEL
      }"
      v-for="cat in sponsorsCategories"
      v-bind:key="cat.id"
      class="sponsorCategory"
    >
      <h3 class="sponsorCategoryTitle">{{ cat.name }}</h3>
      <div class="sponsorsGrid">
        <a
          class="sponsor"
          target="_blank"
          :href="sponsor.url"
          :title="sponsor.name"
          v-for="sponsor in cat.sponsors"
          v-bind:style="{
            'background-image': `url(${sponsor.logo})`
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
import useSponsors from "@/models/useSponsors";
import { BIG_SPONSOR_CATEGORY_LABEL } from "@/utils/static";
import { AsyncDataStatus } from "@/hooks/useAsyncData";
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
      isLoading,
      BIG_SPONSOR_CATEGORY_LABEL
    };
  }
});
</script>

<style lang="stylus" scoped>
// Related to BIG_SPONSOR_CATEGORY_LABEL
$big_sponsor_category_height = 200px;
$sponsor_height = 100px;

.footerSponsors
  position: relative;
  display: flex;
  color: white;
  flex-direction: column;

  &--loading
    justify-content: center;

    .loader
      width: auto;

  .sponsorCategory
    min-width: 100%;
    display: block;
    flex: 1;

    .sponsorCategoryTitle
      font-family: Montserrat;

    &--big
      .sponsorsGrid
        .sponsor
          height: $big_sponsor_category_height;
          width: 50%;
          margin-left: 84px;

  .sponsorsGrid
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: flex-start;

    .sponsor
      margin: 2em 15px;
      width: 20%;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: contain;
      height: $sponsor_height;
</style>
