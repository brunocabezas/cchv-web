<template>
  <!-- Begin Mailchimp Signup Form -->
  <div class="footerSuscribeForm" id="mc_embed_signup">
    <form
      :action="suscribeUrl"
      method="post"
      id="mc-embedded-suscribe-form"
      name="mc-embedded-suscribe-form"
      class="validate"
      target="_blank"
      novalidate
    >
      <div id="mc_embed_signup_scroll">
        <div class="mc-field-group">
          <label class="suscribeFormEmailLabel" for="mce-MMERGE1"
            >Nombre Apellido</label
          >
          <input
            type="name"
            title="Ingresa tu nombre"
            value=""
            name="MMERGE1"
            class="suscribeFormEmailInput required name"
            id="mce-MMERGE1"
          />
        </div>
        <div class="mc-field-group">
          <label class="suscribeFormEmailLabel" for="mce-EMAIL"
            >Dirección de email
          </label>
          <input
            type="email"
            title="Ingresa tu correo"
            placeholder=""
            value=""
            name="EMAIL"
            class="suscribeFormEmailInput required email"
            id="mce-EMAIL"
          />
        </div>
        <div id="mce-responses" class="clear">
          <div
            class="response"
            id="mce-error-response"
            style="display:none"
          ></div>
          <div
            class="response"
            id="mce-success-response"
            style="display:none"
          ></div>
        </div>
        <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
        <div style="position: fixed; left: -5000px;" aria-hidden="true">
          <input
            type="text"
            name="b_21121cf28dc5ae821ecbf30c9_4459a2b85e"
            tabindex="-1"
            value
          />
        </div>
        <div class="mc-field-group clear">
          <input
            type="submit"
            value="Suscribirse"
            name="suscribe"
            id="mc-embedded-suscribe"
            title="Suscribirse al newsletter"
            class="button suscribeFormButton"
          />
        </div>
      </div>
    </form>
  </div>
  <!--End mc_embed_signup-->
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import { NEWSLETTER_SUSCRIBE_URL } from "@/utils/constants";

export default defineComponent({
  name: "FooterSuscribeForm",
  setup() {
    return { suscribeUrl: NEWSLETTER_SUSCRIBE_URL };
  },
});
</script>

<style lang="stylus">
@import '../../../styles/variables.styl';

$media_query = 1100px;

.footerSuscribeForm
  height: $footer_form_height;

  @media (max-width: $media_query)
    height: auto;
    min-height: $footer_form_height;

  #mc_embed_signup_scroll
    height: $footer_form_height;
    display: flex;
    flex-wrap: wrap;

    @media (max-width: $media_query)
      display: block;
      height: auto;

    .mc-field-group
      display: inline-flex;
      align-items: center;
      position: relative;

      @media (max-width: $media_query)
        display: block;
        margin-top: 40px;

      &:not(.clear)
        margin-right: 2.5em;

        @media (max-width: 1265px)
          margin-right: 10px;

      &:first-child
        margin-left: 0;

      input:not([type=submit])
        width: 200px;

.suscribeFormEmailLabel
  position: absolute;
  left: 0;
  top: -20px;
  color: grey;
  font-size: 13px;
  display: block;
  margin-bottom: 13px;

.suscribeFormEmailInput
  height: $footer_form_height;
  padding: 0;
  font-size: 16px;
  font-family: Montserrat;
  background-color: transparent;
  border-bottom: 2px solid black;
  border-top: none;
  border-left: none;
  border-right: none;

.suscribeFormButton
  display: block;
  font-family: Montserrat;
  background-color: $blue;
  color: white;
  padding: 12px 2em;
  border-radius: 30px;
  border: 0;
  font-size: 14px;
  cursor: pointer;

  @media (max-width: 1265px)
    margin-top: 10px;

  &:hover
    background-color: darken($blue, 10);
</style>
