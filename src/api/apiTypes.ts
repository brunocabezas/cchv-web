// Backend entities

// Arrays
type Team = TeamMember[];
type HomeSlides = HomeSlide[];
type ContestVideos = ContestVideo[];
type Sponsors = Sponsor[];

// Displayed on footer
interface Sponsor {}
// clarify if needed
interface Videos {}
interface HomeSlide {
  image: string,
  url?: string
}
// For display on the Contest page
interface ContestVideo {}
interface News {
  abstract: string
}

interface TeamMember {
  position: string,
  name: string
}

// how do we define a wordpress page
// title
// content
// images? (slider when more than one image)
// files? (about>transparency uses links to the right, if defined?)
// they should have url and name
