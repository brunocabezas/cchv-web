<template>
  <div class="footer">
    <div class="footerTop">
      <div class="footerTopSection">
        <h3 class="footerTitle">
          Contacto
        </h3>
        <ul>
          <li><a href="mailto:info@cchv.cl"></a>info@cchv.cl</li>
          <li>Hipolito Irigoyen #562 Providecia, Santiago.</li>
        </ul>
      </div>
      <div class="footerTopSection">
        <h3 class="footerTitle">
          Redes Social
        </h3>
        <ul>
          <li v-bind:key="sn.name" v-for="sn in socialNetworks">
            {{ sn.label }}
          </li>
        </ul>
      </div>
      <div class="footerTopSection">
        <h3 class="footerTitle">
          Newsletter
        </h3>
        <div>[NEWSLETTER_FORM]</div>
      </div>
    </div>
    <Sponsors />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Sponsors from "@/components/layout/Footer/Sponsors";
import { SOCIAL_NETWORKS } from "@/types/static";

export default defineComponent({
  components: { Sponsors },
  setup(props) {
    const socialNetworks = SOCIAL_NETWORKS;

    return { socialNetworks };
  }
});
</script>

<style scoped lang="stylus"></style>
