import Vue from "vue"
import VueCompositionApi, { computed } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import useAsyncData from "../utils/useAsyncData"
import { WPResponseItem } from "@/types/wordpressTypes"
import { getCustomField, getWPTitle } from "@/utils/api"
import { TeamMembersKeys } from "@/types/customFieldsKeysTypes"

Vue.use(VueCompositionApi)

const { data, fetch: fetchTeamMembers, isLoading } = useAsyncData<
  WPResponseItem
>(apiRoutes.Team)

export default function useTeamMembers() {
  const team = computed<any>(() => {
    return data.value.map((teamMemberPost): any => ({
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
