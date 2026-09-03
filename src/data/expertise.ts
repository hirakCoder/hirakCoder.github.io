export type Expertise = {
  title: string;
  pills: string[];
  icon: string;
};

export const expertise: Expertise[] = [
  {
    title: "Test Automation",
    pills: ["Java", "Selenium", "Cucumber", "REST Assured", "XCUITest"],
    icon: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
  },
  {
    title: "iOS Development",
    pills: ["Swift", "SwiftUI", "WidgetKit", "ActivityKit"],
    icon: "M5 2 H19 V22 H5 Z M11.5 18 H12.5",
  },
  {
    title: "AI & Automation",
    pills: ["Claude Code", "AI Agents", "MCP Servers"],
    icon: "M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5",
  },
  {
    title: "Video & Audio",
    pills: ["DaVinci Resolve", "CapCut", "FL Studio"],
    icon: "M23 7 L16 12 L23 17 Z M1 5 H16 V19 H1 Z",
  },
  {
    title: "Cloud & APIs",
    pills: ["REST", "GraphQL", "Postman", "MongoDB", "Cloudflare"],
    icon: "M22 12 H18 L15 21 L9 3 L6 12 H2",
  },
  {
    title: "Creative Engineering",
    pills: ["Code + Creativity", "Rapid Prototyping", "Product Design"],
    icon: "M12 2 a10 10 0 1 0 0 20 a10 10 0 0 0 0 -20 M8 14 s1.5 2 4 2 4-2 4-2",
  },
];
