<template>
<div class="page">
  <div class="pageTitle">
    <h1 class="pageTitleText">Equipo</h1>
  </div>
  <div class="teamPositions" v-if="team.length">
    <div v-bind:key="position.name" v-for="position in team" class="teamPosition">
      <h5 class="teamPositionName">{{ position.name }}</h5>
      <p v-for="person in position.members" v-bind:key="person.id" class="teamPositionMember">
        {{ person.name }}
      </p>
    </div>
  </div>
  <Loader :loading="isLoading" />

  <div class="pageTitle" v-if="!isLoading && staff.length">
    <h1 class="pageTitleText">Directorio</h1>
  </div>
  <div class="teamPositions" v-if="staff.length">
    <div v-bind:key="position.name" v-for="position in staff" class="teamPosition">
      <h5 class="teamPositionName">{{ position.name }}</h5>
      <p v-for="person in position.members" v-bind:key="person.id" class="teamPositionMember">
        {{ person.name }}
      </p>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import usePagesFetch from "@/models/usePagesFetch";
import Loader from "@/components/Loader.vue";
import Media from "@/components/Media/Media.vue";
import Urls from "@/utils/urls";
import {
  stripHtmlFromString
} from "@/utils/strings";
import meta from "@/utils/meta";
import {
  computed,
  defineComponent,
  ref,
  ssrRef,
  useFetch,
  useMeta
} from "@nuxtjs/composition-api";
import axios from "axios";
import {
  Page,
  PageExtraContent
} from "~/types/customFieldsTypes";
import {
  WpImage,
  WPResponseItem
} from "~/types/wordpressTypes";
import {
  getCustomFieldFromPost,
  getWPTitle
} from "~/utils/api";
import {
  PageKeys
} from "~/types/customFieldsKeysTypes";
import client from "~/api/client";
import apiRoutes from "~/api/apiRoutes";
import {
  META_IMG_FALLBACK
} from "~/utils/constants";
import useTeamMembers from "~/models/useTeamMembers";

const mapPagesFromWp = (pagePost: any): any => ({
  id: pagePost.id,
  name: pagePost.title.rendered,
  text: getCustomFieldFromPost(pagePost, PageKeys.text, ""),
  gallery: getCustomFieldFromPost < WpImage[] > (pagePost, PageKeys.gallery, []),
  extra_content: getCustomFieldFromPost < PageExtraContent > (
    pagePost,
    PageKeys.extra_content,
    PageExtraContent.None
  )
});

const initialPage = {
  name: "",
  id: 0,
  text: "",
  gallery: [],
  extra_content: PageExtraContent.None
};

export default defineComponent({
  name: "TeamPage",
  components: {
    Loader,
    Media
  },
  head: {},
  setup() {

    const {
      fetch,
      team: data,
      isLoading,
      staff,
    } = useTeamMembers()

    useMeta(() => ({
      title: "Equipo",
      meta: !data.value ? [] : meta({
        title: 'Equipo',
        description: data.value.length ? data.value[0].name : 'description'
      })
    }));

    return {
      isLoading,
      team: data,
      staff,
    };
  }
});
</script>
