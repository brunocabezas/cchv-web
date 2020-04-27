<template>
  <div id="app">
    <Header />
    <Footer />
  </div>
</template>

<script lang="ts">
// import { useCounter } from "@vueuse/core";
import { defineComponent } from "vue";
// import { useAsyncState } from "@vueuse/core";
// import api from "./api/client
import Header from "@/components/layout/Header/Header.vue";
import Footer from "@/components/layout/Footer/Footer.vue";

const App = defineComponent({
  components: { Header, Footer },
  name: "App"
});

export default App;
</script>
