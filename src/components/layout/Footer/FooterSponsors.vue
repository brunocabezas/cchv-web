<template>
  <div
    class="footerSponsors"
    v-bind:class="{ [`footerSponsors--loading`]: isLoading }"
  >
    <a
      title="Ver colaboradores"
      class="footerToggleButton"
      v-if="!onBigScreen"
      @click="toggleFooterSponsors"
    >
      Colaboradores
      <v-icon v-if="!isLoading && isFooterOpen" name="chevron-up"> </v-icon>
      <v-icon v-if="!isLoading && !isFooterOpen" name="chevron-down"> </v-icon>
      <Loader size="16px" color="white" :loading="isLoading" />
    </a>
    <collapse-transition v-if="!onBigScreen">
      <div v-show="isFooterOpen">
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
    </collapse-transition>
    <div
      v-else
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
import { defineComponent, computed, ref } from "@vue/composition-api";
import useSponsors from "@/models/useSponsors";
import Icon from "vue-awesome/components/Icon.vue";
import CollapseTransition from "@ivanv/vue-collapse-transition";
import { BIG_SPONSOR_CATEGORY_LABEL } from "@/utils/static";
import { AsyncDataStatus } from "@/hooks/useAsyncData";
import Loader from "@/components/Loader.vue";
import useMediaQueries from "@/hooks/useMediaQueries";

export default defineComponent({
  name: "FooterSponsors",
  components: {
    Loader,
    "v-icon": Icon,
    "collapse-transition": CollapseTransition
  },
  setup() {
    const {
      sponsorsCategories,
      fetchSponsorsAndCategories,
      isLoading
    } = useSponsors();
    const isFooterOpen = ref(false);
    const { onBigScreen } = useMediaQueries();

    function toggleFooterSponsors() {
      const newValue = !isFooterOpen.value;
      isFooterOpen.value = newValue;
    }

    fetchSponsorsAndCategories();
    return {
      sponsorsCategories,
      isLoading,
      onBigScreen,
      isFooterOpen,
      toggleFooterSponsors,
      BIG_SPONSOR_CATEGORY_LABEL
    };
  }
});
</script>

<style lang="stylus" scoped>
@import '../../../styles/variables.styl';

// Related to BIG_SPONSOR_CATEGORY_LABEL
$big_sponsor_category_height = 200px;
$sponsor_height = 100px;

.footerToggleButton
  color: white;
  display: flex;
  align-items: center;
  transition: all 0.2s;
  cursor: pointer;
  padding: 1em;
  justify-content: center;

  .fa-icon
    margin-left: 10px;

  &:hover
    opacity: 0.8;

.footerSponsors
  position: relative;
  display: flex;
  color: white;
  flex-direction: column;
  padding: $footer_padding;
  background-color: $black;
  min-height: 300px;
  justify-content: center;

  @media (max-width: $md)
    padding: $mobile_padding !important;
    min-height: auto !important;
    margin-bottom: 0;

  &--loading
    @media (max-width: $md)
      .loader
        transform: none;
        position: initial;
        width: auto;
        margin-left: 10px;

  .sponsorCategory
    min-width: 100%;
    display: block;
    flex: 1;

    .sponsorCategoryTitle
      font-family: Montserrat;
      color: white;

    // First sponsor is bigger than others
    &--big
      .sponsorsGrid
        .sponsor
          height: $big_sponsor_category_height;
          width: 50%;
          margin-left: 84px;

          @media (max-width: $md)
            width: 100%;
            margin: 0;

  .sponsorsGrid
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: flex-start;

    @media (max-width: $md)
      flex-wrap: no-wrap;

    .sponsor
      margin: 2em 15px;
      width: 20%;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: contain;
      height: $sponsor_height;

      @media (max-width: $md)
        width: 100%;
        margin: 10px 0;
        height: $sponsor_height * 2;
</style>
