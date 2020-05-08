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
          Redes Sociales
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
    <FooterSponsors />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import FooterSponsors from "@/components/layout/Footer/FooterSponsors.vue";
import { SOCIAL_NETWORKS } from "@/utils/static";

export default defineComponent({
  name: "Footer",
  components: { FooterSponsors },
  setup(props) {
    const socialNetworks = SOCIAL_NETWORKS;

    return { socialNetworks };
  }
});
</script>

<style lang="stylus" src="./footer.styl"></style>
