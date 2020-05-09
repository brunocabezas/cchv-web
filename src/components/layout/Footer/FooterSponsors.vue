<template>
  <div class="footerSponsors">
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
</template>

<script lang="ts">
import { createComponent } from "@vue/composition-api";

export default createComponent({
  name: "FooterSponsors",
  setup() {
    return {
      sponsors: [
        {
          url: "https://www.eda.admin.ch/santiago",
          logo:
            "http://www.bienaldeartesmediales.cl/14/wp-content/uploads/2019/10/Unesco-01-2-300x145.png",
          id: 1
        },
        {
          url: "https://um.dk/en/",
          logo:
            "http://www.bienaldeartesmediales.cl/14/wp-content/uploads/2019/10/Unesco-01-2-300x145.png",
          id: 2
        },
        {
          url: "https://english.kum.dk/",
          logo:
            "http://www.bienaldeartesmediales.cl/14/wp-content/uploads/2019/10/Unesco-01-2-300x145.png",
          id: 3
        }
      ]
    };
  }
});
</script>

<style lang="stylus" scoped>
.footerSponsors
  color: white;

  .sponsorsCategory
    font-family Montserrat

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
