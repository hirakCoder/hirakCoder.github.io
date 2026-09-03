export type Project = {
  slug: string;
  name: string;
  role: string;
  description: string;
  tech: string[];
  video: string;
  link: { label: string; href: string };
};

export const projects: Project[] = [
  {
    slug: "swiftgenai",
    name: "SwiftGenAI",
    role: "iOS · In Development",
    description:
      "Build iOS apps from plain English. AI-powered prototyping tool that generates SwiftUI code from natural language.",
    tech: ["Swift", "SwiftUI", "AI", "Claude"],
    video: "/videos/hero-swiftgenai.mp4",
    link: { label: "Visit Site", href: "https://swiftgenai.dev" },
  },
  {
    slug: "daydrop",
    name: "DayDrop",
    role: "iOS · LIVE on App Store · 175 countries",
    description:
      "Countdown widgets for iPhone. Track significant life events and daily milestones with elegance and precision.",
    tech: ["SwiftUI", "WidgetKit", "ActivityKit", "App Store"],
    video: "/videos/hero-daydrop.mp4",
    link: { label: "Live on App Store", href: "https://daydrop.beatroot.dev" },
  },
  {
    slug: "stackwrite",
    name: "Stackwrite",
    role: "Developer Publication · 334 pages",
    description:
      "Developer tools publication. Long-form technical writing for engineers, with a focus on practical workflows.",
    tech: ["Technical Writing", "Developer Tools", "SEO"],
    video: "/videos/hero-stackwrite.mp4",
    link: { label: "Visit Site", href: "https://stackwrite.com" },
  },
  {
    slug: "short-film",
    name: "Short Film",
    role: "Writer · Director · Editor · Festival Submission",
    description:
      "Original short film, written and directed solo. Color graded and edited in DaVinci Resolve.",
    tech: ["DaVinci Resolve", "Screenwriting", "Direction"],
    video: "/videos/hero-film.mp4",
    link: { label: "Coming Soon", href: "#" },
  },
  {
    slug: "footballmemesai",
    name: "FootballMemesAI",
    role: "YouTube · 1,800 subscribers in 2 months",
    description:
      "AI-generated football meme channel. Built the workflow, voice, and editing pipeline from zero.",
    tech: ["YouTube", "AI Content", "CapCut"],
    video: "/videos/hero-youtube.mp4",
    link: { label: "View Channel", href: "https://youtube.com/@footballmemesai" },
  },
  {
    slug: "original-music",
    name: "Original Music",
    role: "Composer · Producer · 2 singles",
    description:
      "Original music composed and produced in FL Studio. Distributed across streaming platforms.",
    tech: ["FL Studio", "Music Production", "Composition"],
    video: "/videos/hero-music.mp4",
    link: { label: "Listen", href: "https://linktr.ee/hirak10" },
  },
];
