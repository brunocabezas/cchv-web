import Vue from "vue"
import VueCompositionApi, { computed } from "@vue/composition-api"
import apiRoutes from "../../api/apiRoutes"
import useAsyncData from "../utils/useAsyncData"
import { WPResponseItem } from "@/types/wordpressTypes"
import { getCustomField, getWPTitle } from "@/utils/api"
import { TeamMembersKeys } from "@/types/customFieldsKeysTypes"
import { TeamMember } from "@/types"
import { TeamMemberPosition } from "@/utils/teamMembers"
import { TeamMemberType } from "@/types/customFieldsTypes"
import {
  groupTeamMembersByPosition,
  sortGrouptedTeamMembers,
} from "@/utils/teamMembers"

Vue.use(VueCompositionApi)

const { data, fetch: fetchTeamMembers, isLoading } = useAsyncData<
  WPResponseItem
>(apiRoutes.Team)

export default function useTeamMembers() {
  const teamMembers = computed<TeamMember[]>(() => {
    return data.value.map(
      (teamMemberPost): TeamMember => ({
        id: teamMemberPost.id,
        name: getWPTitle(teamMemberPost),
        position: getCustomField(teamMemberPost, TeamMembersKeys.position),
        order: getCustomField<number>(teamMemberPost, TeamMembersKeys.order),
        type: getCustomField(teamMemberPost, TeamMembersKeys.type),
      })
    )
  })

  const team = computed(() => {
    const team = teamMembers.value.filter(
      (person) => person.type === TeamMemberType.Team
    )
    return sortGrouptedTeamMembers(groupTeamMembersByPosition(team))
  })

  const staff = computed<TeamMemberPosition[]>(() => {
    const staff = teamMembers.value.filter(
      (person) => person.type === TeamMemberType.Staff
    )

    return sortGrouptedTeamMembers(groupTeamMembersByPosition(staff))
  })

  return {
    fetchTeamMembers,
    team,
    staff,
    isLoading,
  }
}
