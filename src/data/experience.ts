export type Job = {
  date: string;
  role: string;
  company: string;
  description: string;
  awards?: string[];
};

export const jobs: Job[] = [
  {
    date: "2021 — Present",
    role: "Senior Software Quality Engineer",
    company: "Tata Consultancy Services · Banking & Financial Services",
    description:
      "Leading enterprise automation frameworks, API testing, iOS mobile automation, and CI/CD pipelines via Jenkins for major banking clients.",
  },
  {
    date: "2018 — 2021",
    role: "Senior QE / Test Lead",
    company: "Cognizant · Insurance & Wealth Management",
    description:
      "Led offshore-onshore automation POCs, mentored junior engineers, and drove shift-left QA adoption across insurance platforms.",
  },
  {
    date: "2012 — 2018",
    role: "Quality Engineer",
    company: "Cognizant · Insurance & Wealth Management",
    description:
      "Built automation frameworks with Selenium, TestNG, and Robot Framework. BDD/TDD adoption, ETL testing, and cross-browser validation.",
    awards: ["Best Innovation 2016", "Best Innovation 2014", "Best Project 2014"],
  },
];

export const education = {
  label: "Education",
  title: "B.Tech, Electronics & Communication",
  sub: "National Institute of Technology, Agartala · 2008–2012",
};

export const recognition = {
  label: "Recognition",
  title: "3 Innovation & Project Awards",
  sub: "Cognizant Technology Solutions · 2014–2016",
};
