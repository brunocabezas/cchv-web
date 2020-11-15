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

<script src="./footerSponsors.ts" lang="ts"></script>
<style lang="stylus" scoped src="./footerSponsors.styl"></style>
