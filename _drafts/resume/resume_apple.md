# Hirak Banerjee — Résumé (Apple, Tools & Automation Backend Quality Engineer, App Store Analytics, Vancouver, 200663122)

## Hirak Banerjee

**Senior Quality Engineer · Backend Test Automation, Data Validation and AI-Assisted Tooling · Java · Python · Kafka · REST · CI/CD**

St. Thomas, Ontario · Open to relocation to Vancouver · Canadian citizen, no sponsorship required

hirak.b@hotmail.com · 226-899-1154 · [hirakcoder.github.io](https://hirakcoder.github.io) · [linkedin.com/in/hirak-banerjee-906aa940](https://linkedin.com/in/hirak-banerjee-906aa940) · [github.com/hirakcoder](https://github.com/hirakcoder)

## Summary

Quality engineer with 14 years on financial-services backends, the last five on a Big-5 Canadian bank's production bulk-payments platform: REST API testing, Kafka event validation, and data validation across Oracle, MongoDB, SQL Server and mainframe, with the regression and release cycle nearly fully automated as scheduled runs and CI/CD gates in Jenkins. Builds the tooling the team tests with: an LLM-powered test-case generator used every release, a one-click payment-trace and evidence tool that reconciles a payment across the payment network, database and Kafka, and a configurable test-data generator, all built with coding agents in days. Applies LLMs to the testing workflow and measures them: a public evaluation harness for LLM-generated test cases (deterministic metrics plus an LLM-as-judge with a bias check), and a multi-model code-generation pipeline with 499 logged runs and a published failure analysis. Java first, Python working. Working principle: AI output is verified, not trusted.

## Core skills

| Area | Skills |
| --- | --- |
| Backend test automation | Java (primary), Python; REST Assured, Postman, SoapUI; Selenium WebDriver, Cucumber BDD, TestNG, Appium, XCUITest; JUnit, pytest |
| Data validation | SQL (Oracle, SQL Server), MongoDB, mainframe datasets, ETL testing (Apache NiFi), reconciliation across systems, synthetic test-data generation with per-environment configuration |
| Streaming and analytics | Apache Kafka on a production platform (event lookup by key, ordering, reconciliation against the database); analytics-style validation of aggregates against source records |
| CI/CD and shift-left | Jenkins (scheduled regression, smoke, gate runs), GitHub Actions, Docker, Git; test strategy with product and engineering before code lands; code review of test code |
| AI applied to testing | LLM-powered test-case generation; LLM evaluation and eval harnesses; prompt engineering; multi-model orchestration with fallbacks and schema-enforced output; GitHub Copilot, Claude Code, MCP |

## Experience

**Senior Software Quality Engineer, AI-Augmented Test Automation** — Tata Consultancy Services, for a Big-5 Canadian bank (bulk payments) · Ontario, Canada · Aug 2021 – present

- Own quality for a production, event-driven payments platform: REST API testing, Kafka streaming flows validated end to end (event lookup by key, ordering, reconciliation), and data validation across Oracle, MongoDB, SQL Server and mainframe; regression and release cycle nearly fully automated as scheduled nightly regression, smoke suites and CI/CD gates in Jenkins.
- Built a one-click payment-trace tool: finds a bulk payment in the payment network, confirms it in the database, locates the matching Kafka event by key, and writes the tracking record and an audit-ready evidence document with screenshots; runs standalone or from Jenkins.
- Built an LLM-powered (GitHub Copilot) test-case generator: user story or requirements page in, structured test cases out, for review or direct upload to test management. In use by the team every release.
- Built a payment test-data generator with per-environment configuration, so one scenario runs unchanged in every test environment.
- Built the tools above with coding agents (Copilot, Claude Opus) in days rather than weeks; maintain the Java / Selenium / Cucumber BDD and REST Assured frameworks on the bank's enterprise automation standards, plus XCUITest suites across iPhone and iPad; drive shift-left reviews with business analysts and developers.

**Senior Quality Engineer / Test Lead** — Cognizant, insurance and wealth management (Manulife, Canada Life, a major US insurer) · London, ON and Kolkata, India · Dec 2012 – Aug 2021

- Test Lead in an onshore-offshore model: estimation, test strategy, stakeholder sign-off, defect triage and mentoring.
- Built and maintained automation frameworks in Selenium/Java, TestNG, Cucumber BDD, Robot Framework and UFT with Jenkins CI; tested cloud-based file upload/download APIs (SoapUI, UFT), ETL pipelines (Apache NiFi) and data across SQL Server and MongoDB.
- Drove automation proofs of concept to break-even; reviewed and approved QA merge requests; contributed to mainframe modernization programmes.
- Awards: Best Innovation of the Year 2016 (automatic form-test validator), Best Innovation of the Year 2014 (automated rate validation), Best Project of the Year 2014 (mainframe re-hosting for a US insurer).

## Selected projects (LLMs applied to testing, built and measured solo)

**testgen-evals** — open-source evaluation harness for LLM-generated test cases · Oct 2026 · [github.com/hirakCoder/testgen-evals](https://github.com/hirakCoder/testgen-evals)

- Deterministic metrics first (schema validity, acceptance-criteria coverage, near-duplicates, negative/edge ratio, untestable steps), then an LLM-as-judge rubric on a sample with a position-bias check that reports the judge's noise floor. Committed run: 10 stories, 71 cases, Sonnet generating, Opus judging. Finding: tag-level coverage read 100% while the judge scored 9 of 52 cases 2/5 on completeness; coverage tags are necessary, not sufficient. Python, pytest, GitHub Actions, MIT.

**SwiftGen AI** — multi-model code-generation workflow with verification gates · Jan–Apr 2026 · [swiftgenai.dev](https://swiftgenai.dev)

- Plain-English description to a built, running SwiftUI app: router across Claude, GPT, Gemini and Grok with fallbacks and schema-enforced output; a zero-LLM pre-validator (193 patterns, safety guard, explicit fixes for fabricated APIs); a repair loop bounded at three attempts; launch, screenshot and crash-log verification.
- Measured from an append-only log of 499 runs (early-2026 models): 66% end-to-end success, 83% on modifications, repair loop rescued 46% of failed first builds, median 2.4 minutes. Failure analysis: of 113 failures, 88 exhausted the healer and 25 never reached the compiler; promoting recurring repairs into the validator lifted first-pass success from 43.5% to 53%. \~70k lines Python, \~20k TypeScript, \~130 tests.

**DayDrop** — iOS countdown app, live on the App Store · [daydrop.beatroot.dev](https://daydrop.beatroot.dev)

- 5,500+ installs in 175 countries, 4.6★ from 81 ratings. Committed XCUITest regression suites, device checks, and an independent oracle (lunar-calendar logic verified against official tables for 1,078 days, zero mismatches); listing localized into 16 languages by an automated pipeline.

**Stackwrite** — developer reference produced by an 8-agent pipeline with an adversarial fact-check gate · [stackwrite.com](https://stackwrite.com)

- Nothing ships without a fact-check pass that re-fetches every source; scheduled and unattended.

## Education and recognition

- **B.Tech, Civil and Transportation Engineering** — National Institute of Technology, Agartala, 2008–2012 (verified by World Education Services, 2020)
- Claude Code in Action — Anthropic Academy, 2026
- Best Innovation of the Year 2016 and 2014, Best Project of the Year 2014 — Cognizant
