<template>
  <div class="residencies">
    <Loader :loading="isLoading" />
    <div
      class="residency"
      v-bind:key="residency.id"
      v-for="residency in residencies"
    >
      <div class="residencyMedia">
        <router-link
          :title="residency.name"
          :to="getResidencyUrlBySlug(residency.slug)"
        >
          <ProgressiveImage
            :src="residency.gallery[0].url"
            :height="onBigScreen ? '200px' : '120px'"
          />
        </router-link>
      </div>
      <div class="residencyInfo">
        <h2 class="residencyName">
          <router-link
            :title="residency.name"
            :to="getResidencyUrlBySlug(residency.slug)"
            >{{ residency.name }}</router-link
          >
        </h2>
        <p
          class="residencyDate"
          :title="
            `${residency.date} ${
              residency.end_date ? ` - ${residency.end_date}` : ``
            }`
          "
        >
          {{ residency.end_date ? residency.short_date : residency.date }}
          {{ residency.short_end_date ? ` - ${residency.short_end_date}` : "" }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";
import Loader from "@/components/Loader.vue";
import ProgressiveImage from "@/components/ProgressiveImage.vue";
import useResidencies from "@/models/useResidencies";
import useMediaQueries from "@/hooks/useMediaQueries";

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
    const { onBigScreen } = useMediaQueries();

    fetchResidencies();

    return { residencies, isLoading, getResidencyUrlBySlug, onBigScreen };
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
    display: flex;
    flex-direction: column;

    @media (max-width: $md)
      width: 100%;
      padding: 0 20px 0 20px;
      flex-direction: row;

      &:not(:last-child)
        margin-bottom: 20px;

    .residencyInfo
      @media (max-width: $md)
        padding: 0 $mobile_padding;

    .residencyMedia, .residencyInfo
      flex: 1;

      @media (max-width: $md)
        padding-bottom: 20px;
        border-bottom: 1px solid black;

    // The last of a row made of three
    &:nth-child(3n+1)
      padding-right: 0;

    .residencyName
      margin-bottom: 0;

      @media (max-width: $md)
        margin-top: 0;

      a
        @media (max-width: $md)
          color: black;
          font-family: Montserrat;

      &:hover
        text-decoration: underline;

    .residencyDate
      margin-top: 0;
      color: $latest_posts_grey;
</style>
