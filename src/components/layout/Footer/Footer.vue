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
      <div class="footerTopSection socialNetworks">
        <h3 class="footerTitle">
          Redes Sociales
        </h3>
        <Loader size="15px" :loading="isLoading" />
      </div>
      <div class="footerTopSection">
        <h3 class="footerTitle">
          Newsletter
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
import FooterSubscribeForm from "@/components/layout/Footer/FooterSubscribeForm.vue";
import Loader from "@/components/Loader.vue";
import { CONTACT_EMAIL } from "@/utils/static";
import useSocialNetworks from "@/factories/useSocialNetworks";

export default defineComponent({
  name: "Footer",
  components: { FooterSponsors, FooterSubscribeForm, Loader },
  setup(props) {
    const {
      fetchSocialNetworks,
      socialNetworks,
      isLoading
    } = useSocialNetworks();

    fetchSocialNetworks();

    return { socialNetworks, contactEmail: CONTACT_EMAIL, isLoading };
  }
});
</script>

<style lang="stylus" src="./footer.styl"></style>
