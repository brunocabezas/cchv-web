<template>
  <div class="footer">
    <div class="footerTop">
      <div class="footerTopSection contactMail">
        <h3 class="footerTitle">
          Contacto
        </h3>
        <div>
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
        <SocialNetworks />
      </div>
      <div class="footerTopSection suscribeForm">
        <h3 class="footerTitle">
          Boletín
        </h3>
        <FooterSubscribeForm />
      </div>
    </div>
    <FooterSponsors />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import FooterSponsors from "@/components/layout/Footer/FooterSponsors.vue";
import SocialNetworks from "@/components/SocialNetworks.vue";
import FooterSubscribeForm from "@/components/layout/Footer/FooterSubscribeForm.vue";
import { CONTACT_EMAIL } from "@/utils/static";

export default defineComponent({
  name: "Footer",
  components: { FooterSponsors, FooterSubscribeForm, SocialNetworks },
  setup(props) {
    return { CONTACT_EMAIL };
  }
});
</script>

<style lang="stylus" src="./footer.styl"></style>
