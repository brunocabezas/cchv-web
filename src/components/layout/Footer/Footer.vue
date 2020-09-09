<template>
  <div class="footer">
    <div class="footerTop">
      <div class="footerTopSection contactMail">
        <h3 class="footerTitle">
          Contacto
        </h3>
        <div class="contactMailContainer">
          <a
            :title="`Escribir a ${CONTACT_EMAIL}`"
            :href="`mailto:${CONTACT_EMAIL}`"
            >{{ CONTACT_EMAIL }}
          </a>
        </div>
      </div>
      <div class="footerTopSection socialNetworks">
        <h3 class="footerTitle">
          Redes Sociales
        </h3>
        <SocialNetworks :small="onBigScreen" />
      </div>
      <div class="footerTopSection suscribeForm">
        <h3 class="footerTitle">
          Boletín
        </h3>
        <FooterSuscribeForm />
      </div>
    </div>
    <FooterSponsors />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import FooterSponsors from "@/components/layout/Footer/FooterSponsors.vue";
import SocialNetworks from "@/components/SocialNetworks.vue";
import FooterSuscribeForm from "@/components/layout/Footer/FooterSuscribeForm.vue";
import { CONTACT_EMAIL } from "@/utils/constants";
import useMediaQueries from "@/hooks/useMediaQueries";

export default defineComponent({
  name: "Footer",
  components: { FooterSponsors, FooterSuscribeForm, SocialNetworks },
  setup(props) {
    const { onBigScreen } = useMediaQueries();
    return { CONTACT_EMAIL, onBigScreen };
  }
});
</script>

<style lang="stylus" src="./footer.styl"></style>
