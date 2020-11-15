import { computed, useAsync } from "@nuxtjs/composition-api";
import apiRoutes from "~/api/apiRoutes";
import { WPResponseItem } from "@/types/wordpressTypes";
import { getCustomFieldFromPost, getWPTitle } from "@/utils/api";
import { TeamMembersKeys } from "@/types/customFieldsKeysTypes";
import { TeamMember } from "@/types";
import { TeamMemberPosition } from "@/utils/teamMembers";
import { TeamMemberType } from "@/types/customFieldsTypes";
import {
  groupTeamMembersByPosition,
  sortGrouptedTeamMembers
} from "@/utils/teamMembers";
import { DEFAULT_ORDER } from "@/utils/constants";
import client from "~/api/client";

const mapTeamMemberFromWpPost = (
  teamMemberPost: WPResponseItem
): TeamMember => ({
  id: teamMemberPost.id,
  name: getWPTitle(teamMemberPost),
  position: getCustomFieldFromPost(
    teamMemberPost,
    TeamMembersKeys.position,
    ""
  ),
  order: getCustomFieldFromPost<number>(
    teamMemberPost,
    TeamMembersKeys.order,
    DEFAULT_ORDER
  ),
  type: getCustomFieldFromPost(
    teamMemberPost,
    TeamMembersKeys.type,
    TeamMemberType.Staff
  )
});

function useTeamMembers() {
  const data = useAsync(() =>
    client
      .get(apiRoutes.Team)
      .then(res => res.data)
      .catch(() => ({
        data: []
      }))
  );

  const teamMembers = computed<TeamMember[]>(() =>
    data.value ? data.value.map(mapTeamMemberFromWpPost) : []
  );

  const team = computed(() => {
    const team = [...teamMembers.value].filter(
      person => person.type === TeamMemberType.Team
    );
    return sortGrouptedTeamMembers(groupTeamMembersByPosition(team));
  });

  const staff = computed<TeamMemberPosition[]>(() => {
    const staff = [...teamMembers.value].filter(
      person => person.type === TeamMemberType.Staff
    );

    return sortGrouptedTeamMembers(groupTeamMembersByPosition(staff));
  });

  return {
    fetch,
    team,
    staff,
    isLoading: computed(() => false)
  };
}

export default useTeamMembers;
