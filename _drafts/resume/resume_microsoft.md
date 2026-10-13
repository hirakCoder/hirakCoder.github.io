# Hirak Banerjee — Résumé (Microsoft, Senior Software Engineer, IC3 experimentation platform, job 200060560)

## Hirak Banerjee

**Senior Software Engineer, Test Infrastructure and AI-Assisted Engineering · Java · Kafka · LLM evaluation**

St. Thomas, Ontario · Remote across Canada · Canadian citizen, no sponsorship required

hirak.b@hotmail.com · 226-899-1154 · [hirakcoder.github.io](https://hirakcoder.github.io) · [linkedin.com/in/hirak-banerjee-906aa940](https://linkedin.com/in/hirak-banerjee-906aa940) · [github.com/hirakcoder](https://github.com/hirakcoder)

## Summary

Senior engineer with 14 years building the test infrastructure, CI gates and verification tooling that let a Big-5 Canadian bank ship a production, Kafka-based bulk-payments platform every release. For the last two years that work has been AI-assisted end to end: an LLM-powered test-case generator the team uses every release, a one-click payment-trace tool that reconciles a payment across the payment network, Oracle and Kafka and writes audit evidence, and a test-data generator, all built with coding agents in days. Outside work, designs and measures LLM systems rather than demos: a multi-model code-generation workflow with deterministic validation, a bounded self-healing build loop and 499 logged evaluation runs; a public evaluation harness for LLM-generated test cases; and an 8-agent content pipeline whose quality gates are the product. Java first, Python and TypeScript working, comfortable with Docker, GitHub Actions, Jenkins and small cloud services. Working principle: AI output is verified, not trusted.

## Core skills

| Area | Skills |
| --- | --- |
| Languages and platforms | Java (primary), Python, TypeScript/JavaScript, Swift, SQL, Bash · Apache Kafka (event lookup, ordering and reconciliation on a production platform), Oracle, MongoDB, SQL Server · Jenkins, GitHub Actions, Docker, Git · Cloudflare Workers, Supabase, Railway, Linux VPS |
| AI-assisted engineering | Coding agents in daily use (GitHub Copilot, Claude Code, MCP, hooks); LLM orchestration with task routing, fallbacks, retries and truncation recovery across Anthropic, OpenAI, Google and xAI APIs; schema-enforced structured output; deterministic pre-validation and self-healing loops for generated code; LLM evaluation (deterministic metrics, LLM-as-judge with bias checks); token and cost tracking |
| Test infrastructure and reliability | Test-automation frameworks (Selenium WebDriver, Cucumber BDD, TestNG, REST Assured, XCUITest, Appium), CI/CD gate design, scheduled regression and smoke suites, synthetic test-data generation, production diagnostics and evidence tooling, shift-left with product and engineering |
| Data and messaging | Kafka, Oracle, SQL Server, MongoDB, ETL testing (Apache NiFi), mainframe validation |

## Experience

**Senior Software Quality Engineer, AI-Augmented Test Automation** — Tata Consultancy Services, for a Big-5 Canadian bank (bulk payments) · Ontario, Canada · Aug 2021 – present

- Own test infrastructure and release gates for a production, event-driven payments platform: Kafka streaming flows validated end to end (event lookup by key, ordering, reconciliation against Oracle, MongoDB, SQL Server and mainframe), with the regression and release cycle nearly fully automated as scheduled nightly regression, smoke suites and CI/CD gates in Jenkins.
- Built a one-click payment-trace tool (production diagnostics): finds a bulk payment in the payment network, confirms it in the database, locates the matching Kafka event by key, and writes the tracking record and an audit-ready evidence document with screenshots; runs standalone or from Jenkins and replaces a manual multi-system audit trail.
- Built an LLM-powered (GitHub Copilot) test-case generator: user story or requirements page in, structured test cases out, for review or direct upload to test management. In use by the team every release.
- Built a payment test-data generator with per-environment configuration, so one scenario runs unchanged in every test environment.
- Built the tools above with coding agents (Copilot, Claude Opus) in days rather than weeks; maintain the Java / Selenium / Cucumber BDD and REST Assured frameworks on the bank's enterprise automation standards, plus XCUITest suites across iPhone and iPad; drive shift-left reviews with business analysts and developers.

**Senior Quality Engineer / Test Lead** — Cognizant, insurance and wealth management (Manulife, Canada Life, a major US insurer) · London, ON and Kolkata, India · Dec 2012 – Aug 2021

- Test Lead in an onshore-offshore model: estimation, test strategy, stakeholder sign-off, defect triage and mentoring.
- Built and maintained automation frameworks in Selenium/Java, TestNG, Cucumber BDD, Robot Framework and UFT with Jenkins CI; tested cloud-based file upload/download APIs (SoapUI, UFT), ETL pipelines (Apache NiFi) and data across SQL Server and MongoDB.
- Drove automation proofs of concept to break-even; reviewed and approved QA merge requests; contributed to mainframe modernization programmes.
- Awards: Best Innovation of the Year 2016 (automatic form-test validator), Best Innovation of the Year 2014 (automated rate validation), Best Project of the Year 2014 (mainframe re-hosting for a US insurer).

## Selected projects (AI systems, built and measured solo)

**SwiftGen AI** — multi-model LLM workflow with verification gates: idea to native SwiftUI, build, repair, launch in the iOS Simulator, edit by chat · Jan–Apr 2026 · [swiftgenai.dev](https://swiftgenai.dev)

- Orchestration: intent and complexity classification routes each task across Claude Sonnet and Opus, GPT-4.1, Gemini 2.5 and Grok with per-task fallbacks, retries, truncation detection and timeouts; \~970 injected rules; schema-enforced screen-by-screen generation for apps with six or more screens.
- Verification of generated code: a zero-LLM pre-validator (193 patterns, \~15 cross-file fixers, a safety guard that rejects any fix that unbalances braces or deletes over half a file, explicit fixes for fabricated APIs), per-file typecheck, build, then launch, screenshot, process-alive and crash-log checks.
- Repair loop bounded at three attempts with de-duplicated errors and escalation to a stronger model; rescued 46% of failed first builds. Every healer error logged (605, 431 fixed) and patterns seen five or more times at 80%+ success promoted upstream, lifting first-pass success from 43.5% to 53% on the last 100 runs.
- Measured from an append-only run log, 499 runs on early-2026 models: 66% end-to-end success (71% last 100), 83% on modifications, median 2.4 minutes; of 113 failures, 88 exhausted the healer and 25 never reached the compiler. 315 commits, \~70k lines Python, \~20k TypeScript, \~130 tests, hybrid VPS + Mac simulator build farm with CI fallback.

**testgen-evals** — open-source evaluation harness for LLM-generated test cases · Oct 2026 · [github.com/hirakCoder/testgen-evals](https://github.com/hirakCoder/testgen-evals)

- Deterministic metrics first (schema validity, acceptance-criteria coverage, near-duplicates, negative/edge ratio, untestable steps), then an LLM-as-judge rubric on a sample with a position-bias check that reports the judge's noise floor. Committed run: 10 stories, 71 cases, Sonnet generating, Opus judging. Finding: tag-level coverage read 100% while the judge scored 9 of 52 cases 2/5 on completeness. Python, pytest, GitHub Actions, MIT.

**Stackwrite** — developer reference produced by an 8-agent editorial pipeline with hard quality gates · [stackwrite.com](https://stackwrite.com)

- Researcher (primary sources only), writer (no facts outside the research table), adversarial fact-checker that re-fetches every source and defaults to hold, SEO, browser-based reviewer and publisher agents; nothing ships without a fact-check pass. Scheduled and unattended; 50+ pages in Bing's top 7.

**DayDrop** — iOS countdown app, live on the App Store · [daydrop.beatroot.dev](https://daydrop.beatroot.dev)

- 5,500+ installs in 175 countries, 4.6★ from 81 ratings. Built with a coding agent under test discipline: committed XCUITest regression suites, device checks, and an independent oracle (lunar-calendar logic verified against official tables for 1,078 days, zero mismatches); AI image generation behind a secured serverless proxy; listing localized into 16 languages by an automated pipeline.

## Education and recognition

- **B.Tech, Civil and Transportation Engineering** — National Institute of Technology, Agartala, 2008–2012 (verified by World Education Services, 2020)
- Claude Code in Action — Anthropic Academy, 2026
- Best Innovation of the Year 2016 and 2014, Best Project of the Year 2014 — Cognizant
