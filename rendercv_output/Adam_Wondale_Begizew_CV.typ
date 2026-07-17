// Import the rendercv function and all the refactored components
#import "@preview/rendercv:0.3.0": *

// Apply the rendercv template with custom configuration
#show: rendercv.with(
  name: "Adam Wondale Begizew",
  title: "Adam Wondale Begizew - CV",
  footer: context { [#emph[Adam Wondale Begizew -- #str(here().page())\/#str(counter(page).final().first())]] },
  top-note: [ #emph[Last updated in July 2026] ],
  locale-catalog-language: "en",
  text-direction: ltr,
  page-size: "us-letter",
  page-top-margin: 0.7in,
  page-bottom-margin: 0.7in,
  page-left-margin: 0.7in,
  page-right-margin: 0.7in,
  page-show-footer: true,
  page-show-top-note: true,
  colors-body: rgb(0, 0, 0),
  colors-name: rgb(0, 79, 144),
  colors-headline: rgb(0, 79, 144),
  colors-connections: rgb(0, 79, 144),
  colors-section-titles: rgb(0, 79, 144),
  colors-links: rgb(0, 79, 144),
  colors-footer: rgb(128, 128, 128),
  colors-top-note: rgb(128, 128, 128),
  typography-line-spacing: 0.6em,
  typography-alignment: "justified",
  typography-date-and-location-column-alignment: right,
  typography-font-family-body: "Source Sans 3",
  typography-font-family-name: "Source Sans 3",
  typography-font-family-headline: "Source Sans 3",
  typography-font-family-connections: "Source Sans 3",
  typography-font-family-section-titles: "Source Sans 3",
  typography-font-size-body: 10pt,
  typography-font-size-name: 30pt,
  typography-font-size-headline: 10pt,
  typography-font-size-connections: 10pt,
  typography-font-size-section-titles: 1.4em,
  typography-small-caps-name: false,
  typography-small-caps-headline: false,
  typography-small-caps-connections: false,
  typography-small-caps-section-titles: false,
  typography-bold-name: true,
  typography-bold-headline: false,
  typography-bold-connections: false,
  typography-bold-section-titles: true,
  links-underline: false,
  links-show-external-link-icon: false,
  header-alignment: center,
  header-photo-width: 3.5cm,
  header-space-below-name: 0.7cm,
  header-space-below-headline: 0.7cm,
  header-space-below-connections: 0.7cm,
  header-connections-hyperlink: true,
  header-connections-show-icons: true,
  header-connections-display-urls-instead-of-usernames: false,
  header-connections-separator: "",
  header-connections-space-between-connections: 0.5cm,
  section-titles-type: "with_partial_line",
  section-titles-line-thickness: 0.5pt,
  section-titles-space-above: 0.5cm,
  section-titles-space-below: 0.3cm,
  sections-allow-page-break: true,
  sections-space-between-text-based-entries: 0.3em,
  sections-space-between-regular-entries: 1.2em,
  entries-date-and-location-width: 4.15cm,
  entries-side-space: 0.2cm,
  entries-space-between-columns: 0.1cm,
  entries-allow-page-break: false,
  entries-short-second-row: true,
  entries-degree-width: 1cm,
  entries-summary-space-left: 0cm,
  entries-summary-space-above: 0cm,
  entries-highlights-bullet:  "•" ,
  entries-highlights-nested-bullet:  "•" ,
  entries-highlights-space-left: 0.15cm,
  entries-highlights-space-above: 0cm,
  entries-highlights-space-between-items: 0cm,
  entries-highlights-space-between-bullet-and-text: 0.5em,
  date: datetime(
    year: 2026,
    month: 7,
    day: 17,
  ),
)


= Adam Wondale Begizew

#connections(
  [#connection-with-icon("location-dot")[Addis Ababa, Ethiopia]],
  [#link("mailto:adambegizew@gmail.com", icon: false, if-underline: false, if-color: false)[#connection-with-icon("envelope")[adambegizew\@gmail.com]]],
  [#link("tel:+251-96-782-5821", icon: false, if-underline: false, if-color: false)[#connection-with-icon("phone")[096 782 5821]]],
)


== Summary

I'm a recent Computer Science graduate who builds full-stack web and mobile applications. I work primarily with Next.js, React Native, and Node.js. For my final year project, I led backend development on a community crowdsourcing platform, and I've also built e-commerce web applications and AI-powered exam prep tools. I care most about building practical software that actually works. I adapt quickly to new stacks and excel in team environments through clear and effective communication.

== Experience

#regular-entry(
  [
    #strong[Community Issue Crowdsourcing Platform], Backend Engineer & Project Manager

    - Led backend development and managed the project lifecycle from ideation to delivery for final year university project.

    - Built a robust platform allowing community members to report local issues, implemented with scalable API endpoints.

  ],
  [
  ],
)

#regular-entry(
  [
    #strong[Shoe Store Web App], Full Stack Developer

    - Developed a digital catalog and seamless ordering web application backed by Supabase for a local shoe store.

  ],
  [
  ],
)

#regular-entry(
  [
    #strong[AI-Powered Exit Exam Tool], Developer

    - Created an application that allows users to add questions and receive detailed explanations powered by an AI API.

  ],
  [
  ],
)

#regular-entry(
  [
    #strong[Personal Portfolio Website], Frontend Developer

    - Built a modern, responsive portfolio website using Next.js to showcase projects, skills, and professional experience.

  ],
  [
  ],
)

#regular-entry(
  [
    #strong[CAWEE, Addis Ababa], Data Encoder (Volunteer)

    - Volunteered for 1.5 months to manage data entry, ensure data integrity, and maintain digital records.

  ],
  [
  ],
)

== Education

#education-entry(
  [
    #strong[Unity University], Computer Science

  ],
  [
    Sept 2022 – Apr 2026

  ],
  degree-column: [
    #strong[BS.]
  ],
)

== Skills

#strong[Frontend & Mobile:] Next.js, TailwindCSS, React Native, Flutter

#strong[Backend & Databases:] Express.js, GraphQL, Supabase, Neon DB, Convex

#strong[Tools & DevOps:] Git, GitHub, Docker, Vercel
