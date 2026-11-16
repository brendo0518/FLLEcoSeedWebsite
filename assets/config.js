/*
  ECOSEED SITE CONFIG — edit this file to update shared content.
  Anything left empty shows a clearly labelled placeholder on the site.
  Do not publish students' personal phone numbers, home addresses or personal emails.
  Use first names only and get parent/guardian permission before adding photos of students.
*/
window.SITE = {
  teamName: "[Team name]",
  schoolName: "[School name]",
  season: "FIRST LEGO League 2026–27 BIOGLOW",

  /* FORMS
     Paste a form-handling endpoint here (for example a Formspree, Getform or Basin URL,
     or your own server). While this is empty the forms validate input but do NOT send anything,
     and the site says so. */
  formEndpoint: "",

  /* A shared team or school email address (not a student's personal address). Leave empty to show a placeholder. */
  contactEmail: "",

  /* Footer links. Leave url empty and the link is shown as "not set" instead of a dead link. */
  social: [
    { label: "Instagram", url: "" },
    { label: "YouTube", url: "" },
    { label: "Team or school website", url: "" }
  ],

  /* Link to your demo video (YouTube, Vimeo, school server). Opens in a new tab. */
  videoUrl: "",

  /* IMAGES
     Put files in assets/images/ and set the path here, for example "assets/images/drone.jpg".
     Only use photos you took or have permission or a licence to use. Keep concept renders
     labelled as concept renders. Empty = labelled placeholder. */
  images: {
    hero: "",
    drone: "",
    dispenser: "",
    testing: "",
    cad1: "", cad2: "", cad3: "", cad4: "",
    team1: "", team2: "", team3: "", team4: "", team5: "", team6: "",
    habitat: ""
  },
  imageAlt: {
    hero: "Native Western Australian landscape",
    drone: "Our EcoSeed prototype drone",
    dispenser: "Our 3D-printed seed dispenser",
    testing: "Team testing the dispenser"
  },

  /* TEAM — ten profile cards. Set name, role and (optionally) photo path. */
  team: [
    { name: "[Team member 1]", role: "[Role]", photo: "" },
    { name: "[Team member 2]", role: "[Role]", photo: "" },
    { name: "[Team member 3]", role: "[Role]", photo: "" },
    { name: "[Team member 4]", role: "[Role]", photo: "" },
    { name: "[Team member 5]", role: "[Role]", photo: "" },
    { name: "[Team member 6]", role: "[Role]", photo: "" },
    { name: "[Team member 7]", role: "[Role]", photo: "" },
    { name: "[Team member 8]", role: "[Role]", photo: "" },
    { name: "[Team member 9]", role: "[Role]", photo: "" },
    { name: "[Team member 10]", role: "[Role]", photo: "" }
  ],

  /* DEVELOPMENT PROGRESS — state: "done" | "now" | "next" | "" (empty shows "Set status") */
  progress: [
    { label: "Idea and research", state: "" },
    { label: "CAD design", state: "" },
    { label: "Prototype build", state: "" },
    { label: "Testing", state: "" },
    { label: "Improvements", state: "" },
    { label: "Expert feedback", state: "" }
  ],

  /* JOURNEY / TIMELINE — add real dates and short descriptions. */
  timeline: [
    { when: "[Date]", title: "Choosing a problem", text: "[What the team looked at and why biodiversity was chosen.]" },
    { when: "[Date]", title: "Researching", text: "[Sources read, people or organisations contacted.]" },
    { when: "[Date]", title: "Designing", text: "[First sketches and CAD concepts.]" },
    { when: "[Date]", title: "Building a prototype", text: "[First drone attachment, 3D prints.]" },
    { when: "[Date]", title: "Testing and improving", text: "[What was tested, what changed.]" },
    { when: "[Date]", title: "Sharing the idea", text: "[Feedback sessions, presentations, competition events.]" }
  ],

  /* IMPACT INDICATORS — set value to a real number when you have one. null shows an empty tile. */
  indicators: [
    { label: "Experts consulted", value: null },
    { label: "Organisations contacted", value: null },
    { label: "Prototype tests completed", value: null },
    { label: "Design improvements made", value: null },
    { label: "Survey responses received", value: null },
    { label: "People reached (talks, events)", value: null }
  ]
};
