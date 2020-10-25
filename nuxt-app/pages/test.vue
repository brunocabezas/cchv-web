<template>
  <div class="container">
    <meta
      name="twitter:card"
      content="sumamry of the twiiter card"
      key="twcard"
    />
    <meta name="twitter:creator" content="Twitter creator" key="twhandle" />

    <meta property="og:url" content="currentURL" key="ogurl" />
    <meta property="og:image" content="" key="ogimage" />
    <meta property="og:site_name" content="CChv" key="ogsitename" />
    <meta property="og:title" content="Test Page" key="ogtitle" />
    <meta
      property="og:description"
      content="description description description description"
      key="ogdesc"
    />

    <div>
      <Logo />
      <h1 class="title">
        test
      </h1>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import Vue from "vue";

export default defineComponent({ name: "testPage" });
</script>

<style></style>
