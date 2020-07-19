<template>
  <div class="residencies">
    <Loader :loading="isLoading" />
    <div
      class="residency"
      v-bind:key="residency.id"
      v-for="residency in residencies"
    >
      <router-link
        :title="residency.name"
        :to="getResidencyUrlBySlug(residency.slug)"
      >
        <ProgressiveImage :src="residency.gallery[0].url" height="200px" />
      </router-link>
      <h2 class="residencyName">
        <router-link
          :title="residency.name"
          :to="getResidencyUrlBySlug(residency.slug)"
          >{{ residency.name }}</router-link
        >
      </h2>
      <p class="residencyDate">
        {{ residency.readable_date || residency.date }}
      </p>
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

.residencies
  position: relative;
  margin-top: 2em;
  display: flex;
  flex-wrap: wrap;

  .residency
    width: 33.3%;
    padding-right: 20px;

    // The last of a row made of three
    &:nth-child(3n+1)
      padding-right: 0;

    .residencyName
      margin-bottom: 0;

      &:hover
        text-decoration: underline;

    .residencyDate
      margin-top: 0;
</style>
