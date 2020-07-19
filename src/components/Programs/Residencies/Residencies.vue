<template>
  <div class="residencies">
    <Loader :loading="isLoading" />
    <div
      class="residency"
      v-bind:key="residency.id"
      v-for="residency in residencies"
    >
      <ProgressiveImage
        v-if="residency.gallery"
        :src="residency.gallery[0].url"
        height="200px"
      />
      <h4>{{ residency.date }}</h4>
      <h2>
        <router-link
          :title="residency.name"
          :to="getResidencyUrlBySlug(residency.slug)"
          >{{ residency.name }}</router-link
        >
      </h2>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";
import Loader from "@/components/Loader.vue";
import ProgressiveImage from "@/components/ProgressiveImage.vue";
import useResidencies from "@/factories/useResidencies";

const Residencies = defineComponent({
  name: "Residencies",
  components: {
    Loader,
    ProgressiveImage
  },
  setup(props) {
    const {
      residencies,
      fetchResidencies,
      getResidencyUrlBySlug,
      isLoading
    } = useResidencies();

    fetchResidencies();

    return { residencies, isLoading, getResidencyUrlBySlug };
  }
});

export default Residencies;
</script>
<style lang="stylus">
@import '../../../styles/variables.styl';

$margin_between_videos = 2em;

.residencies
  position: relative;
  margin-top: 2em;
  display: flex;
  flex-wrap: wrap;

  // edition has different background colors
  .residency
    width: 33.3%;
    padding-right: 20px;

    &:nth-child(3n+1)
      padding-right: 0;
</style>
