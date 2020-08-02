import { TeamMember } from "@/types/customFieldsTypes"
import { sortByOrder } from "@/utils/arrays"

export interface TeamMemberPosition {
  name: string
  members: TeamMember[]
  order: number
}

interface MembersGroupedByPosition {
  [positionKey: string]: TeamMemberPosition
}

export const groupTeamMembersByPosition = (
  teamMembers: TeamMember[]
): MembersGroupedByPosition =>
  teamMembers.reduce<MembersGroupedByPosition>((acc, curr) => {
    const key = curr.position
    if (acc[key]) {
      return Object.assign(acc, {
        [key]: {
          name: key,
          members: [...acc[key].members, curr],
          order: acc[key].order > curr.order ? curr.order : acc[key].order,
        },
      })
    } else {
      return Object.assign(acc, {
        [key]: { name: key, members: [curr], order: curr.order },
      })
    }
  }, {})

export const sortGrouptedTeamMembers = (
  groupedTeamMembers: MembersGroupedByPosition
): TeamMemberPosition[] =>
  Object.values(groupedTeamMembers)
    .sort(sortByOrder)
    .map((position) => ({
      ...position,
      members: position.members.sort(sortByOrder),
    }))
