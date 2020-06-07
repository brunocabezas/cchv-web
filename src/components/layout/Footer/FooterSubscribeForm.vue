<template>
  <!-- Begin Mailchimp Signup Form -->
  <div class="footerSubscribeForm" id="mc_embed_signup">
    <form
      :action="subscribeUrl"
      method="post"
      id="mc-embedded-subscribe-form"
      name="mc-embedded-subscribe-form"
      class="validate"
      target="_blank"
      novalidate
    >
      <div id="mc_embed_signup_scroll">
        <div class="mc-field-group">
          <label class="subscribeFormEmailLabel" for="mce-NAME">Nombre </label>
          <input
            type="name"
            title="Ingresa tu nombre"
            placeholder="Nombre apellido"
            value
            name="NAME"
            class="subscribeFormEmailInput required name"
            id="mce-NAME"
          />
        </div>
        <div class="mc-field-group">
          <label class="subscribeFormEmailLabel" for="mce-EMAIL"
            >Direccion de email
          </label>
          <input
            type="email"
            title="Ingresa tu correo"
            placeholder="tudireccion@correo.com"
            value
            name="EMAIL"
            class="subscribeFormEmailInput required email"
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
        <div class="clear">
          <input
            type="submit"
            value="Subscribirse"
            name="subscribe"
            id="mc-embedded-subscribe"
            title="Subscribirse al newsletter"
            class="button subscribeFormButton"
          />
        </div>
      </div>
    </form>
  </div>
  <!--End mc_embed_signup-->
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import { NEWSLETTER_SUBSCRIBE_URL } from "../../../utils/static";

export default defineComponent({
  name: "FooterSubscribeForm",
  setup() {
    return { subscribeUrl: NEWSLETTER_SUBSCRIBE_URL };
  }
});
</script>

<style lang="stylus" scoped>
@import '../../../styles/variables.styl';

.footerSubscribeForm
  #mc_embed_signup_scroll
    display: flex;

    .mc-field-group
      margin: 0 2em;

      &:first-child
        margin-left: 0;

.subscribeFormEmailLabel
  font-family: Montserrat;
  color: grey;
  font-size: 14px;
  display: block;
  margin-bottom: 5px;

.subscribeFormEmailInput
  padding: 5px 5px 5px 0;
  font-family: Montserrat;
  background-color: transparent;
  border-bottom: 2px solid black;
  border-top: none;
  border-left: none;
  border-right: none;

.subscribeFormButton
  margin-left: 2em;
  display: block;
  font-family: Montserrat;
  background-color: $blue;
  color: white;
  padding: 1em 2em;
  border-radius: 30px;
  border: 0;
  font-size: 14px;
  cursor: pointer;

  &:hover
    background-color: darken($blue, 10);
</style>
