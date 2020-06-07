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
        :scale="small ? 1.5 : 4"
        :color="MAIN_COLOR"
        :name="sn.iconName"
      />
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { MAIN_COLOR } from "@/utils/static";
import Icon from "vue-awesome/components/Icon.vue";
import useSocialNetworks from "@/factories/useSocialNetworks";

const SocialNetworks = defineComponent({
  name: "SocialNetworks",
  components: { "v-icon": Icon },
  props: {
    small: {
      type: Boolean,
      default: false
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
@import '../styles/variables.styl';

.socialNetworks
  width: 100%;
  display: flex;
  align-items: center;

  .socialNetwork
    flex: 1;
    border: none;
    margin: 0 1em;
    transition: all 0.2s;

    &:hover
      opacity: 0.8;

  &--small
    width: auto;
    display: inline-block;
</style>
