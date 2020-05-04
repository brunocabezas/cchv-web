<template>
  <div>
    <div>home slides</div>
    {{ ready }} {{ state }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAsyncState } from "@vueuse/core";
import apiRoutes from "../../api/apiRoutes";
import client from "../../api/client";

export default defineComponent({
  name: "HomeSlides",
  setup() {
    const { state, ready } = useAsyncState(
      client.get(apiRoutes.HomeSlides).then(t => t.data),
      []
    );
    // console.log("object", state.value, ready.value);
    return { ready, state };
  }
});
</script>

<style scoped></style>
