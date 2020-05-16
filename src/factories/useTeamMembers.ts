import Vue from "vue"
import VueCompositionApi, { Ref, computed } from "@vue/composition-api"
import apiRoutes from "@/api/apiRoutes"
import View from "@/types/viewTypes"
import useAsyncData from "./useAsyncData"
import { WpResponseData } from "@/types/wordpressTypes"
import { getCustomField, getWPTitle } from "@/utils/api"
import { TeamMembersKeys } from "@/types/customFieldsKeysTypes"

Vue.use(VueCompositionApi)

const { data, fetch: fetchTeamMembers, isLoading } = useAsyncData<
  WpResponseData
>(apiRoutes.Team)

export default function useTeamMembers() {
  const team = computed<View.Team>(() => {
    return data.value.map((teamMemberPost) => ({
      id: teamMemberPost.id,
      name: getWPTitle(teamMemberPost),
      position: getCustomField(teamMemberPost, TeamMembersKeys.position),
    }))
  })

  return {
    fetchTeamMembers,
    team,
    isLoading,
  }
}
