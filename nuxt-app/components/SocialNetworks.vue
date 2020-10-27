<template>
  <div
    class="socialNetworks"
    v-bind:class="{
      'socialNetworks--small': small
    }"
  >
    <a
      class="socialNetwork"
      v-bind:key="sn.name"
      v-for="sn in socialNetworks"
      target="_blank"
      :title="sn.name"
      :href="sn.url"
    >
      <v-icon
        :scale="small ? 1.5 : sn.scale"
        :color="color"
        :name="sn.iconName"
      />
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import { MAIN_COLOR } from "@/utils/constants";
import Icon from "vue-awesome/components/Icon.vue";
import useSocialNetworks from "@/models/useSocialNetworks";

const SocialNetworks = defineComponent({
  name: "SocialNetworks",
  components: { "v-icon": Icon },
  props: {
    small: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: MAIN_COLOR
    }
  },
  setup() {
    const {
      fetchSocialNetworks,
      socialNetworks,
      isLoading
    } = useSocialNetworks();

    fetchSocialNetworks();

    return { socialNetworks, MAIN_COLOR };
  }
});

export default SocialNetworks;
</script>
<style scoped lang="stylus">
@import '~/assets/variables.styl';

.socialNetworks
  width: 100%;
  display: flex;
  align-items: center;

  .socialNetwork
    flex: 1;
    display: flex;
    border: none;
    margin: 0 1em;
    transition: all 0.2s;

    &:hover
      opacity: 0.8;

    &:first-child
      margin-left: 0;

    &:last-child
      margin-right: 0;

  &--small
    width: 180px;
    display: inline-flex;
</style>
