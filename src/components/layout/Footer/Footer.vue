<template>
  <div class="footer">
    <div class="footerTop">
      <div class="footerTopSection">
        <h3 class="footerTitle">
          Contacto
        </h3>
        <ul>
          <li class="footerListItem">
            <a
              :title="`Escribir a ${contactEmail}`"
              :href="`mailto:${contactEmail}`"
              >{{ contactEmail }}</a
            >
          </li>
          <li class="footerListItem">
            Hipolito Irigoyen #562 Providecia, Santiago.
          </li>
        </ul>
      </div>
      <div class="footerTopSection">
        <h3 class="footerTitle">
          Redes Sociales
        </h3>
        <ul>
          <li
            class="footerListItem"
            v-bind:key="sn.name"
            v-for="sn in socialNetworks"
          >
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
import { SOCIAL_NETWORKS, CONTACT_EMAIL } from "@/utils/static";

export default defineComponent({
  name: "Footer",
  components: { FooterSponsors },
  setup(props) {
    const socialNetworks = SOCIAL_NETWORKS;

    return { socialNetworks, contactEmail: CONTACT_EMAIL };
  }
});
</script>

<style lang="stylus" src="./footer.styl"></style>
