<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        test2
      </h1>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useMeta } from "@nuxtjs/composition-api";
import Vue from "vue";

export default defineComponent({
  name: "testPage2",
  head: {},
  setup() {
    useMeta(() => ({
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content:
            "Articles focused on the beautiful art of landscape painting."
        },
        { property: "og:site_name", content: "Redfern Dev" },
        { hid: "og:type", property: "og:type", content: "website" },
        {
          hid: "og:url",
          property: "og:url",
          content: "https://bobross.com"
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "My Amazing Blog on The Joy of Painting"
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "Articles focused on the beautiful art of landscape painting."
        },
        {
          hid: "og:image",
          property: "og:image",
          content: "/a-lovely-image.png"
        },
        { property: "og:image:width", content: "740" },
        { property: "og:image:height", content: "300" },

        { name: "twitter:site", content: "@bobross" },
        { name: "twitter:card", content: "summary_large_image" },
        {
          hid: "twitter:url",
          name: "twitter:url",
          content: "https://bobross.com"
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: "My Amazing Blog on The Joy of Painting"
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content:
            "Articles focused on the beautiful art of landscape painting."
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: "/a-loveley-image.png"
        }
      ]
    }));
  }
});
</script>

<style></style>
