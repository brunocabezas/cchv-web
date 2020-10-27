<template>
  <div>
    <Nuxt />
    <Footer/>
  </div>
</template>

<script>
import { defineComponent } from "@nuxtjs/composition-api";
import Footer from "~/layouts/Footer/Footer"

export default defineComponent({
  name: "Default",
  components: { Footer }
})
</script>
