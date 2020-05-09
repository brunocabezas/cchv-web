<template>
  <div id="app">
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script lang="ts">
import { createComponent } from "@vue/composition-api";
// import { useAsyncState } from "@vueuse/core";
// import api from "./api/client
import Header from "@/components/layout/Header/Header.vue";
import Footer from "@/components/layout/Footer/Footer.vue";

const App = createComponent({
  components: { Header, Footer },
  name: "App"
});

export default App;
</script>
