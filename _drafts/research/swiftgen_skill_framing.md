# SwiftGen AI as a skill for big-tech recruiters and hiring managers

Research notes, 2026-10-13. Every number below comes from `_drafts/swiftgen-case-study-facts.md` or was recomputed from `~/SwiftGen_Clean/SwiftGen2/logs/generation_results.jsonl` (499 rows) with a local script; no paid API was called. Web sources are cited inline. Where I could not verify something, it is in a Gaps list, not in the text.

Owner's rules applied throughout: only logged numbers (66% / 71% last 100 / 83% modifications / healer rescues ~46% / median 2.4 min); always say "early-2026 models"; re-run only on request; label marketing-doc claims as unsupported; no hype words.

---

## Key Question 1 — What does SwiftGen actually demonstrate, and what does it not?

### Takeaway
SwiftGen is a solo, 315-commit, ~92k-line orchestrated LLM workflow whose rare part is not generation but the gated verification around it (zero-LLM pre-validation, a bounded build-repair loop, simulator-based verification, append-only run logging with measured outcomes). It does not demonstrate production users, scale, team work, or reviewed code quality, and the repo's own README and YC brief contain unsupported claims that would undercut the measured story if a reviewer found them first.

### Cited Findings (local, verified)

**What exists and is verifiable**
- Pipeline V3: intent classification (Haiku 4.5, gpt-4o-mini fallback) → requirements + complexity rating → rule injection (~970 rules, 13 sections) → generation (Sonnet simple/medium, Opus complex; ≥6 screens = screen-by-screen with schema-enforced JSON + per-file swiftc typecheck) → zero-LLM pre-validator (193 regex patterns + ~15 cross-file structural fixers, safety guard rejects fixes that unbalance braces or delete >50%) → xcodegen + xcodebuild → LLM healer (max 3 attempts, escalates to Opus) → simulator launch + screenshot + process-alive + crash-log scan → MJPEG/WebRTC stream → chat modifications. — `_drafts/swiftgen-case-study-facts.md`
- Model router with task-type fallbacks: claude-sonnet-4-6 default, claude-opus-4-6, gemini-2.5-pro, grok-3, gpt-4.1; gpt-4o vision; gemini-2.0-flash images; retries with backoff, truncation detection + max_tokens retry, per-task timeouts. — facts file; `backend/llm/intelligent_router.py`, `backend/llm/router.py`
- Learning loop: 605 healer errors logged, 431 fixed; patterns seen ≥5× with ≥80% success auto-promote toward the pre-validator. — facts file; `backend/orchestration_v2/healer_error_tracker.py` (`auto_promote_to_prevalidator(min_success_rate=0.8)`, promotes into a *staging* section marked "Review before moving to pre_validator.py")
- Healer implementation: `LLMHealer.max_attempts = 3`; `parse_build_errors` de-duplicates errors with a `seen_errors` set; `_classify_error` + `find_fix_hints` pull hints from the tracked patterns; `heal(..., use_opus=True)` routes the final/complex attempt to Opus via `TaskType.ARCHITECTURE`. — `backend/orchestration_v2/llm_healer.py` (693 lines)
- Pre-validator: 4,874 lines; pattern families = import, deprecation, observable, navigation, color/style, binding, concurrency, protocol, syntax, swiftui, performance, compiler-friendly, swiftdata, dark-mode, search, unified-rules; `_is_safe_fix(before, after)` guard; explicit "LLM HALLUCINATION FIXES" block for fabricated APIs (invented `Calendar.Component` cases such as `.monthOfYear`, `.dayOfWeek`, `.dayOfMonth`, `.hourOfDay`; invented `Font` methods; `Color.primary(x)` called as a function). — `backend/orchestration_v2/pre_validator.py` lines 1466–1580, 1906–1916, 3701
- Runtime validator (patterns that compile but crash; crash-log signature extraction; `learn_from_crash`) and crash monitor (parses `.ips` crash files). — `backend/orchestration_v2/runtime_validator.py` (741 lines), `crash_monitor.py` (457 lines)
- Completeness checker for referenced-but-undefined types. — `backend/agents/code_completeness_checker.py`
- Run logging: 79-line append-only JSONL logger; fields = timestamp, request, app_name, model_used, success, duration_seconds, files_generated, pre_validator_fixes, healing_attempts, errors, detected_app_type, features_detected, is_modification, cost_estimate. — `backend/orchestration_v2/generation_logger.py`
- Scale: 315 commits, first 2026-01-08, last 2026-04-15 (`git log` recount matches facts file); ~70k lines Python, ~20k TS/TSX, 2.2k Swift; 19 agent modules in `backend/agents/`; 136 tests in 8 files (facts file; my `def test_` count over `tests/*.py` top level = 126, so use the facts figure and say "about 130"); persona × complexity UAT harness (`tests/uat_comprehensive.py`, 10 `uat_results_*.json`, 7 `benchmark_*.json`, 8 `vibe_*.json`). — facts file; repo listing
- Hybrid infra: Hetzner VPS (API, auth, Stripe, Next.js in Docker) + Mac build worker with 3 simulators via Cloudflare tunnel + GitHub Actions macOS fallback; Supabase auth, credits, Stripe tiers. — facts file; `docs/ARCHITECTURE_OVERVIEW.md`
- Project state: live at swiftgenai.dev (waitlist off 2026-04-09), last log row 2026-04-16, last commit 2026-04-15; prepared for YC (`YC_REVIEW_BRIEF.md`, then named "SwiftIn"). Paused, not abandoned.

**Measured results (499 runs, 2026-01-29 → 2026-04-16, early-2026 models), recomputed from the raw log and matching the facts file exactly**
- Generations: 220/333 = 66.1% end-to-end; last 100 = 71/100; first pass (success with 0 healing attempts) 145/333 = 43.5%, last 100 = 53/100.
- Modifications: 138/166 = 83.1%; first pass 119/166 = 71.7%.
- Healer: 163 generations needed healing, 75 succeeded = 46.0% rescued. (Modifications: 42 needed healing, 19 succeeded.)
- Median duration of successful generations 141.1 s (≈2.4 min); mean 191.9 s; median of *all* generations 164.9 s; median of *failed* generations 224.6 s (failures cost ~60% more wall-clock than successes).
- Median files generated per app: 9.
- Healer fix success 431/605 = 71% (facts file; stored in the tracker's own JSON, not the run log).
- Best benchmark run 7/9 incl. all simple+medium; final full UAT 12/13 (facts file).

**Failure anatomy of the 113 failed generations (34%), from the log**
- 88 (78%) reached the compiler and exhausted all 3 healing attempts ("Build failed after 3 healing attempts").
- 25 (22%) never reached the compiler: 9 "Failed to parse generated code" (model output could not be split into files), 15 screen-by-screen schema/validation failures on multi-screen apps (errors like "Screen Journal generation had validation issues", "Screen Feed …", "Screen Dashboard …"), 1 row with no error recorded. 11 of the 113 produced 0 files.
- Compiler error kinds inside the 88 exhausted-healer failures (counted over the first 3 recorded errors per run, so mentions not runs): string-literal syntax ~26 (single-quoted string literal 19, unterminated 4, multi-line literal placement 3); "expected separator" 15; "cannot call value of non-function type" 8; "ambiguous use of" 8; "invalid redeclaration" 7; "cannot find … in scope" 6; "no exact matches in call to initializer" 5; "missing argument for parameter" 4; plus infrastructure failures misfiled as generation failures: "Unable to find a device matching the provided destination specifier" 4, unreadable Info.plist, missing stickers icon set 2.
- Failures track prompt volume, not a single app type: todo 17/37, counter 17/77, notes 11/33, expense 10/24, weather 7/14, workout 6/10, recipe 8/24.
- Dataset skew an interviewer will spot: 77 of 333 generations are "counter" apps and 50 rows have empty `model_used`/`detected_app_type` (the structured path and parse failures were not fully instrumented; those 50 ran at 50% success vs 68.9% for the 283 Sonnet-labelled rows). Prompts are largely the author's own benchmark/UAT prompts, not user traffic.
- Modification failures (28): 20 "Code compilation issue", 3 "Failed to parse modification response", 1 "AI returned unchanged code", 1 Python `NameError: name 'anti_patterns' is not defined` (a pipeline bug caught by the log, a good interview anecdote), 1 multi-step step failure, 2 misc.

**Unsupported claims that exist in the repo and must not be repeated**
- `README.md`: "Enterprise-grade production system", "Production Ready" badge, "Multi-provider LLM failover for 99.9% availability", "Zero-downtime deployments". No availability measurement exists.
- `YC_REVIEW_BRIEF.md`: "Fast-Path Healing … 62 pre-built error patterns … (~85% coverage)", "Describe your app idea, get a working iOS app in 2 minutes". The 2-minute figure is close to the 2.4-min median but should be stated as a median of successful runs.
- Facts file explicitly bans: "80% first try", "100% success", "85% coverage", "Production Ready", and the "$0.07/app" cost (heuristic `cost_estimate`, not metered).

**Current public presentation (already consistent with the facts)**
- Site `site/index.html` lines 307–349: six-step pipeline list with "gate" tags, Table 1 with 66% / 83% / ~46% / 2.4 m and the early-2026-model caveat, five simulator screenshots "taken by the pipeline's own verify step".
- Résumés `_drafts/resume/resume.md`, `resume_magnet.md`, `resume_bmo.md`, `resume_manulife.md`: one 2–3-bullet Projects entry each, same numbers. `resume_magnet.md` already leads with "Testing an agentic system".
- `~/testgen-evals/README.md` voice to match: TL;DR with the number first, "Tag-level coverage is necessary, not sufficient", judge caveats "stated plainly", "No human calibration yet", costs reported as "as reported by the CLI" or `None` rather than estimated.

### Inferences
- **Honest one-paragraph assessment (ready to use internally):** SwiftGen shows four things that are rare in a candidate portfolio and that big-tech evaluation and AI-platform teams explicitly hire for: a multi-model router with task-type fallbacks; deterministic pre-validation that removes known LLM failure classes (including fabricated APIs) before any build; a bounded, escalating self-repair loop whose evaluator is the Swift compiler and the iOS Simulator rather than another model; and an append-only run log that produced real, reproducible success rates (66% overall, 71% on the last 100, 83% for modifications, 46% of failed builds rescued, 2.4-minute median) plus a learning loop that moved recurring fixes upstream (first-pass 43.5% → 53% on the last 100). It does not show production users or traffic (no usage numbers exist in the facts), scale beyond three simulators, team collaboration or code review, or Python engineering as a team would judge it (one 4,874-line validator file, roughly 130 tests on ~70k lines). The over-claiming risk is concrete: the repo's README says "Production Ready" and "99.9% availability", the YC brief says "~85% coverage", and the generation log records only Sonnet as the generating model, so "multi-model" must be explained as routing and fallback, not as five models each generating apps. Anyone who quotes those documents instead of the log will be caught by a diligent interviewer; the safe position is "measured, on that generation of models, by my own harness, paused in April 2026."
- In Anthropic's taxonomy SwiftGen is a *workflow* with an *evaluator-optimizer* loop, not an autonomous agent. Saying so is more credible to a big-tech reviewer than "multi-agent", and it matches the code (fixed stage order, bounded retries). See Key Question 2.
- The strongest transferable claim is the deterministic-first design shared with testgen-evals: free checks run before paid ones, and the log tells you which lever to pull. The two projects should be presented as one method applied twice.

### Gaps
- No production usage, user count, revenue, or uptime numbers exist in the facts file; do not estimate them.
- The run log does not record which model performed each healing attempt, the complexity rating, or token counts; the Opus-escalation benefit therefore cannot be quantified from the log. State this if asked.
- The 605/431 healer figures live in the tracker's JSON, which I did not open; they are taken from the facts file.

---

## Key Question 2 — How do big-tech postings describe "AI systems" experience in 2026, and what do well-regarded write-ups look like?

### Takeaway
Postings that could be retrieved (Apple, Amazon) ask for evaluation infrastructure, LLM-as-a-judge in pipelines, "agentic evaluation frameworks, monitoring, and feedback loops that ensure correctness", and evaluation design "where ground truth is expensive"; the respected write-ups all say the system around the model is the product, deterministic checks come first, and you must keep looking at logged samples. SwiftGen's verifiable content maps onto every one of those phrases.

### Cited Findings (web)
Apple postings (titles and one-line snippets from the careers search page, all Cupertino unless noted; detail pages are JS-rendered and could not be fetched, so only the snippet text is quoted):
- "Senior Software Development Engineer in Test — LLM Evaluation & Automation" — "automated model evaluation: standing up LLM-as-a-judge in existing and new pipelines" — [Apple Jobs](https://jobs.apple.com/en-us/details/200674941-0836/senior-software-development-engineer-in-test-llm-evaluation-automation-t3e)
- "Machine Learning Engineer - AI Evaluation & LLM Systems" — "develop scalable infrastructure, intelligent evaluators, and data-driven methodologies that measure" — [Apple Jobs](https://jobs.apple.com/en-us/details/200674883-0836/machine-learning-engineer-ai-evaluation-llm-systems)
- "Software Engineer, Evaluation" — "make Siri and Apple Intelligence features smarter for our users" — [Apple Jobs](https://jobs.apple.com/en-us/details/200671986-0836/software-engineer-evaluation)
- "Evaluation Science Lead" — "define how our multilingual Globalization AI solutions are measured and validated" — [Apple Jobs](https://jobs.apple.com/en-us/details/200686562-0836/evaluation-science-lead)
- "Sr. Machine Learning Engineer, Speech LLM Evaluation" — [Apple Jobs](https://jobs.apple.com/en-us/details/200682418-0836/sr-machine-learning-engineer-speech-llm-evaluation)

Amazon postings (from the amazon.jobs search API, query "agentic evaluation"):
- "Software Development Engineer, Generative AI, Annapurna Labs - Neuroboros Team" — "Build and operate agentic evaluation frameworks, monitoring, and feedback loops that ensure correctness" — [Amazon Jobs](https://account.amazon.jobs/jobs/10528626/apply)
- "Principal Applied Scientist, AAIS" — "Experience designing evaluation frameworks for open-ended or subjective tasks where ground truth is expensive" — [Amazon Jobs](https://account.amazon.jobs/jobs/10553806/apply)
- "Sr. GenAI Specialist PSA, Solutions Architecture" — "Hands-on GenAI implementation: LLM integration, RAG (vector databases, semantic search), agentic workflows" — [Amazon Jobs](https://account.amazon.jobs/jobs/10470183/apply)
- "Senior AI Specialist Solutions Architect, AWS (Tokyo)" — "…RAG, FM evaluation, Agentic workflows" — [Amazon Jobs](https://account.amazon.jobs/jobs/10474848/apply)
- "Senior GTM Specialist Solution Architect AI/ML, GenAI (Amsterdam)" — "design/implementation of production AI/ML/GenAI/Agentic systems" — [Amazon Jobs](https://account.amazon.jobs/jobs/10554421/apply)
- "Senior Applied Scientist, Kumo" — "building Agentic AI systems for complex use cases" — [Amazon Jobs](https://account.amazon.jobs/jobs/10539146/apply)

Well-regarded write-ups to model the case study on:
- Anthropic, "Building effective agents": distinguishes *workflows* (predefined code paths) from *agents* (LLM-directed); names the *evaluator-optimizer* pattern; recommends "simple, composable patterns rather than complex frameworks" and adding complexity "only when it demonstrably improves outcomes". — [Anthropic](https://www.anthropic.com/engineering/building-effective-agents)
- Yan, Bischof, Frye, Husain, Liu, Shankar, "What We've Learned From A Year of Building with LLMs" (2024-06-08): "The model isn't the product, the system around it is"; start with assertion-based unit tests from production samples, add LLM-as-judge later; guardrails downstream catch hallucinations; "Look at samples of LLM inputs and outputs every day". — [Applied LLMs](https://applied-llms.org/)
- Hamel Husain, "Your AI Product Needs Evals" (2024-03-29): three levels (unit tests/assertions → human and model evaluation → A/B), log full traces, "Remove ALL friction from looking at data", "You can never stop looking at data". — [hamel.dev](https://hamel.dev/blog/posts/evals/)
- Chip Huyen, "Agents" (2025-01-07): agent failure modes = planning errors, tool failures, efficiency problems; "Planning should be decoupled from execution"; "Reflection and error correction are two different mechanisms that go hand in hand"; evaluate planning validity, tool-call accuracy, efficiency. — [huyenchip.com](https://huyenchip.com/2025/01/07/agents.html)

### Inferences
- The phrases to echo (verbatim from postings, each backed by SwiftGen code): "evaluation frameworks" / "evaluators" (run log + UAT harness + benchmark JSONs), "monitoring, and feedback loops that ensure correctness" (healer error tracker → auto-promotion), "automated model evaluation … in existing pipelines" (verify step inside the pipeline), "where ground truth is expensive" (compile + launch + crash scan as a cheap deterministic oracle instead of a judge model).
- The write-ups agree on a structure for a case study: problem → architecture with the gates drawn → what was measured and how → failure analysis from logged samples → what was learned / changed → caveats. That is the outline used in Key Question 4(f).
- Huyen's failure taxonomy (planning / tool / efficiency) maps cleanly onto the log: the 25 never-reached-compiler failures are planning/format errors, the 88 exhausted-healer failures are tool-level (compiler) errors, and the 225-s median failed run is the efficiency cost. Use that taxonomy in the failure section; it signals familiarity with the literature without name-dropping.

### Gaps
- Google and Microsoft careers pages are client-rendered; the fetches returned navigation/config only, and this session's web-search budget was exhausted, so no Google or Microsoft posting is cited. Before sending anything to those two companies, pull one posting each manually and check the phrasing; the Apple/Amazon vocabulary ("evaluation", "agentic workflows", "feedback loops") is very likely shared but is not verified here.
- Apple detail pages could not be read, so minimum/preferred qualifications (e.g., Python vs Swift, years) are unverified.

---

## Key Question 3 — Skill framing: name the skills as a posting would and map each to proof

### Takeaway
Four posting-style skill names cover everything SwiftGen proves; each maps to a specific module and a logged number, which is what lets a recruiter verify the claim in one click.

### Cited Findings (mapping table; sources are the files named in Key Question 1)

| Skill as a posting would name it | SwiftGen component that proves it | Metric that proves it |
|---|---|---|
| **LLM application engineering / multi-model orchestration** | `backend/llm/intelligent_router.py`, `router.py`: task-type routing across Claude Sonnet/Opus, GPT-4.1, Gemini 2.5, Grok 3; retries with backoff, truncation detection + max_tokens retry, per-task timeouts; intent classification on Haiku with gpt-4o-mini fallback; complexity-based model choice | 66% end-to-end over 333 generations, 71% on last 100; 83% on 166 modifications; median 2.4 min (early-2026 models) |
| **Agentic workflow design (evaluator-optimizer loop)** | `orchestration_v2/llm_healer.py`: 3-attempt bounded loop, error de-duplication, fix hints from tracked patterns, escalation to Opus on the final attempt; compiler + simulator as the evaluator | Healer rescued 46% of failed first builds (75/163); 431/605 healer fixes successful (71%) |
| **Automated verification of generated code** | `orchestration_v2/pre_validator.py` (193 patterns, ~15 structural fixers, `_is_safe_fix` guard, hallucinated-API fixes), per-file `swiftc` typecheck on the structured path, `code_completeness_checker.py`, `runtime_validator.py`, post-launch screenshot + process-alive + crash-log scan | First-pass success 43.5% overall → 53% on last 100 as patterns were promoted; about 130 tests; validator changes tested on ≥3 app types (project rule) |
| **Evaluation and observability of AI systems** | `orchestration_v2/generation_logger.py` (append-only JSONL, 14 fields), `healer_error_tracker.py` (pattern signatures, ≥5× and ≥80% promotion), `tests/uat_comprehensive.py` persona × complexity harness, benchmark JSONs | The 499-run numbers themselves; failure split 88 exhausted-healer / 25 never-compiled; one pipeline bug (`NameError: anti_patterns`) caught only because the log kept error text |
| **Prompt and tooling engineering** (secondary) | ~970 injected rules in 13 sections; schema-enforced JSON for screen-by-screen generation; `prompt_orchestrator.py` | Same success numbers; no isolated ablation exists, so claim the mechanism, not a lift |
| **Reliability engineering for LLM products** (secondary) | v3.1.1 postmortems: credit refunds after crashes, session-loss handling, CSRF misread as paywall, env override bug, Xcode 26 cold start, unauthenticated progress endpoint leaking code | Qualitative only; no SLO numbers exist |

### Inferences
- Lead with "automated verification of generated code" and "evaluation and observability" for QE/SDET-type roles (the Apple SDET posting is the archetype); lead with "LLM application engineering" and "agentic workflow design" for AI-platform SDE roles (the Amazon Annapurna posting is the archetype). Same facts, different first bullet.
- Do not use "multi-agent" as the headline; use "multi-model, multi-stage workflow with verification gates". The generation log records only Sonnet as the generating model, so "multi-agent across five models" invites a question the log cannot answer well.

### Gaps
- No ablation isolates the contribution of the ~970 rules or of Opus escalation; present them as mechanisms, not as measured lifts.

---

## Key Question 4 — Ready-to-paste text (verified facts only, no hype words)

### Takeaway
Six variants below, each using only logged numbers, each carrying the early-2026-model caveat, each avoiding "production-ready", "enterprise", "cutting-edge", "robust", "seamless" and similar.

### Cited Findings (the text; every number traces to Key Question 1)

**(a) Two-line résumé entry, Projects section**

> **SwiftGen AI** — multi-model pipeline that turns a plain-English description into a built, running SwiftUI app · solo · Jan–Apr 2026 · swiftgenai.dev
> Router across Claude, GPT, Gemini and Grok, a 193-pattern zero-LLM pre-validator, a 3-attempt build healer escalating to a stronger model, and simulator verification; 66% end-to-end success and 83% on modifications over 499 logged runs (early-2026 models), median 2.4 min to a running app.

**(b) Four-bullet résumé version for an AI-heavy role**

> **SwiftGen AI** — multi-model LLM workflow with verification gates: idea → native SwiftUI → build → repair → launch in the iOS Simulator → edit by chat · solo · Jan–Apr 2026 · swiftgenai.dev
> - Orchestration: intent and complexity classification routes each task across Claude Sonnet/Opus, GPT-4.1, Gemini 2.5 and Grok with per-task fallbacks, retries, truncation detection and timeouts; ~970 injected rules; schema-enforced screen-by-screen generation for apps with 6+ screens.
> - Verification of generated code: a zero-LLM pre-validator (193 patterns, ~15 cross-file fixers, safety guard that rejects any fix unbalancing braces or deleting over half a file, explicit fixes for fabricated APIs), per-file swiftc typecheck, xcodebuild, then launch, screenshot, process-alive and crash-log checks.
> - Repair loop: healer bounded at 3 attempts, de-duplicates errors, escalates to Opus; rescued 46% of failed first builds. Every healer error logged (605, 431 fixed); patterns seen 5+ times with 80%+ success promoted upstream, lifting first-pass success from 43.5% overall to 53% on the last 100 runs.
> - Measured from an append-only run log, 499 runs, early-2026 models: 66% end-to-end generation success (71% last 100), 83% modification success, median 2.4 min; 315 commits, ~70k lines Python, ~20k TypeScript, about 130 tests, persona × complexity UAT harness.

**(c) LinkedIn Projects description (1,820 characters, limit 2,000)**

> SwiftGen AI — multi-model pipeline from a plain-English app idea to a built, running SwiftUI app. Solo, Jan–Apr 2026, swiftgenai.dev (paused).
>
> What it does: classifies the request, generates native SwiftUI through a router across Claude Sonnet/Opus, GPT-4.1, Gemini 2.5 and Grok (task-type fallbacks, retries, truncation recovery), then puts the output through gates before anyone sees it: a zero-LLM pre-validator (193 regex patterns, ~15 cross-file structural fixers, a safety guard that rejects fixes which unbalance braces or delete more than half a file), xcodegen + xcodebuild, a healer with at most three attempts that escalates to a stronger model, and simulator verification (launch, screenshot, process-alive check, crash-log scan). The app streams to the browser and is modified by chat.
>
> Learning loop: every error that reaches the healer is logged (605 so far, 431 fixed); patterns seen five or more times with at least 80% fix success are promoted toward the pre-validator, so repeat failures stop costing a model call.
>
> Measured from the pipeline's own append-only run log (499 runs, Jan 29–Apr 16 2026, early-2026 models): 66% end-to-end generation success (220/333), 71% over the last 100; 83% modification success (138/166); the healer rescued 46% of failed first builds; median 2.4 minutes to a running app. Of 113 failed generations, 88 exhausted the healer and 25 never reached the compiler (unparseable output or schema failures on multi-screen apps).
>
> Scale: 315 commits, ~70k lines Python, ~20k TypeScript, about 130 tests, a UAT harness across personas × complexity, hybrid infrastructure (Linux VPS for API, auth and billing; Mac build worker with three simulators).
>
> Not claimed: paying users, production traffic, or numbers on current models. The harness is model-agnostic and can be re-run.

**(d) LinkedIn Featured/post draft, framed as an engineering finding (1,206 characters, limit 1,300)**

> An engineering finding from SwiftGen, my pipeline that turns a sentence into a built, running SwiftUI app.
>
> I logged every run: 499 of them, Jan–Apr 2026, early-2026 models. End-to-end success was 66%, 71% over the last 100. The number that taught me the most was the failure split.
>
> Of 113 failed generations, 88 reached the compiler and exhausted three model repair attempts. 25 never got there: the output could not be parsed into files, or a multi-screen app failed schema validation. Two different problems, two different fixes, and only the log told them apart.
>
> The repair loop rescued 46% of failed first builds. Useful, but every rescue is another model call. The cheaper lever was moving fixes upstream: errors reaching the healer were tracked (605 logged, 431 fixed) and recurring ones promoted into a zero-LLM pre-validator. First-pass success went from 43.5% overall to 53% on the last 100 runs.
>
> What I would not claim: that a passing build means a working app. The pipeline launches each app in the simulator, screenshots it and scans crash logs, and that is still a weak check of behaviour.
>
> The harness is model-agnostic; these numbers are from that generation of models, not current ones.

**(e) 60-second spoken answer: "Tell me about a project you're proud of"** (190 words; about 70 seconds at a measured pace. To hit 60 seconds, cut the last paragraph to: "What I'd change: log which model did each repair, and add a functional check beyond 'it launched'.")

> *Situation.* Early this year I built SwiftGen alone: you describe an iOS app in a sentence and it generates native SwiftUI, compiles it, launches it in the simulator and lets you change it by chat. The hard part was not generation, it was stopping bad model output from reaching the user.
>
> *Decisions.* Three. First, deterministic before paid: a regex pre-validator with 193 patterns runs before any build and removes known failure classes, including APIs the model invents. Second, a bounded repair loop: at most three attempts, errors de-duplicated, the last attempt escalated to a stronger model. Third, log every run, append-only, so I could measure instead of guess.
>
> *Measured result.* Over 499 logged runs on early-2026 models: 66% end-to-end success, 71% over the last hundred, 83% on modifications; the repair loop rescued 46% of failed builds; and because recurring repairs were promoted into the validator, first-pass success rose from 43.5% to 53%.
>
> *What I'd change.* Log which model performed each repair, add a functional check beyond "it launched and didn't crash", and freeze a prompt set so re-runs on new models are comparable.

**(f) One-page website case study: outline**

1. **Title and TL;DR** (testgen-evals style, number first): "499 logged runs, early-2026 models: 66% of app ideas became a running app end-to-end, 71% over the last 100; 83% of chat modifications applied. The repair loop rescued 46% of failed builds; promoting repeat repairs into a zero-LLM validator lifted first-pass success from 43.5% to 53%."
2. **Problem.** Model output that compiles is not the same as an app that runs; a user should never see unchecked output. Project rules: never hand-fix a generated app, fix the generator/validators/healer; build success ≠ working app; screenshot every result; validator changes tested on ≥3 app types; no per-app special cases.
3. **Architecture diagram** (one figure, gates marked): classify → rules → generate (router) → pre-validate [gate] → build → heal ×3 [gate] → launch + screenshot + crash scan [gate] → stream → modify. Side loop: healer error tracker → staging patterns → pre-validator. Label it a workflow with an evaluator-optimizer loop, where the evaluator is the compiler and simulator.
4. **What was measured and how.** The 14-field JSONL schema; which fields drive which number; what "success" means (built, installed, launched, process alive, no crash log). State the caveats: `cost_estimate` is heuristic and not published; `model_used` records the generation model only.
5. **Metrics table.**

   | Measure | Result | Basis |
   |---|---|---|
   | New app, idea to running | 66% (220/333) | 71% over the last 100 |
   | First pass, no repair needed | 43.5% (145/333) | 53% over the last 100 |
   | Change by chat | 83% (138/166) | 72% first pass |
   | Failed first builds rescued by the healer | 46% (75/163) | modifications: 19/42 |
   | Healer fixes that worked | 71% (431/605) | tracker JSON, not the run log |
   | Time to a running app | 2.4 min median | successful runs; mean 3.2 min |
   | Time spent on a failed run | 3.7 min median | failures cost ~60% more than successes |
   | Files per generated app | 9 median | |
   | Window and models | Jan 29–Apr 16 2026 | Sonnet 4.6 / Opus 4.6, GPT-4.1, Gemini 2.5 |

6. **Failure analysis: what the 34% looked like.**
   - 78% (88) exhausted three repairs. Dominant compiler errors: string-literal syntax (single-quoted literals, unterminated and misplaced multi-line literals), "expected separator", calling a non-function value (the `Color.primary(x)` class), ambiguous use, invalid redeclaration (duplicate view/type definitions across files), unresolved identifiers, initializer mismatches. Pattern: the healer fixed local errors but struggled when one root cause produced many cascading errors across files.
   - 22% (25) never reached the compiler: 9 unparseable outputs, 15 schema failures on multi-screen apps (Journal/Calendar/Insights, Feed/Search/Messages, Dashboard/Transactions). These are format and planning failures, not Swift failures, and they were cheaper to fix (parser hardening, stricter schema) than any compiler error.
   - Infrastructure misfiled as generation failure: simulator destination not found (4), unreadable Info.plist, missing icon catalogs. Lesson: tag failure *stage* in the log, not just error text.
   - Dataset caveat stated plainly: 77 of 333 prompts were counter apps; prompts were the author's benchmark set, not user traffic; 50 rows lack model and app-type labels.
7. **What changed because of the data.** Hallucinated-API fixes and string-literal patterns added to the pre-validator; healer error de-duplication; screen-by-screen generation with per-file typecheck for complex apps; auto-promotion threshold (≥5 occurrences, ≥80% success) with a staging section reviewed before patterns go live.
8. **What is not shown / what next.** No users or traffic numbers; no functional oracle beyond launch and crash scan; no per-attempt healer model in the log; re-run on current models only with a frozen prompt set. Link to testgen-evals as the same method applied to test generation.

### Inferences
- Variant (c) is 1,930 characters and (d) is 1,247, both under their limits; recount after any edit.
- (b) and (d) contain the one new, defensible narrative the current site lacks: the 88/25 failure split and the 43.5→53 first-pass trend. Both are straight from the log.

### Gaps
- None of the variants mention cost; the only cost field is heuristic. If a recruiter asks, say "not metered".

---

## Key Question 5 — Evidence: what to publish, record, or re-run

### Takeaway
Publish a scrubbed verification-gates extract plus the run-log analysis, not the whole repo; record one dated two-minute capture; do not quote new numbers until a frozen-prompt re-run is requested.

### Cited Findings (local)
- Secrets and sensitive items in the repo root: `.env`, `.env.production`, `.env.development`; VPS IP in `CHANGELOG.md` (~line 112) and in `docs/ARCHITECTURE_OVERVIEW.md`; Stripe/Supabase code under `backend/api`, `supabase/`. — facts file; repo listing
- Error text in the log contains local paths (`/tmp/swiftgen_complex_test/...`, Xcode toolchain paths). — `logs/generation_results.jsonl`
- Marketing-flavoured docs that contradict the measured story: `README.md`, `YC_REVIEW_BRIEF.md`, `docs/BUSINESS_ANALYSIS.md`, `docs/COMPETITIVE_STRATEGY.md`. — repo listing
- The verification code is self-contained in `backend/orchestration_v2/`: `pre_validator.py`, `llm_healer.py`, `healer_error_tracker.py`, `runtime_validator.py`, `crash_monitor.py`, `generation_logger.py`. — repo listing
- testgen-evals already publishes `runs/<id>/report.md` + `summary.json` per run with model names and date at the top. — `~/testgen-evals/README.md`

### Inferences (recommendations)
1. **Do not make the whole repo public.** Reasons: live secrets files, VPS IP, billing code, and documents whose claims the owner has already ruled unsupported. A reviewer would weigh the README's "Production Ready" against the measured 66% and conclude the author over-claims.
2. **Publish an extract, "swiftgen-gates" (or a folder inside a new public repo):** the six `orchestration_v2` files above, their tests, a short README written in the testgen-evals voice, and a diagram. Scrub: any hard-coded paths, the VPS IP, model-provider keys, the `SwiftIn` naming inconsistency. Value to a reviewer: they can read the 193 patterns, the `_is_safe_fix` guard, the de-duplication and escalation in the healer, and the promotion threshold without trusting a summary.
3. **Publish the run-log analysis as Markdown plus the script, not a notebook:** `runs/2026-01-29_2026-04-16/report.md` with the metrics table and failure breakdown above, `analyze.py` (the recompute script, ~60 lines), and the JSONL with `request` reviewed for anything personal and error text with local paths redacted. Markdown matches testgen-evals and renders on GitHub without execution. A notebook adds nothing the reviewer needs.
4. **Record a two-minute screen capture** from the Mac build worker: prompt typed → progress stages visible → simulator launch → one chat modification applied. Overlay the date and the model name; keep it as a demonstration of the mechanism, not as evidence for the numbers. Host on the site case-study page.
5. **Re-run before quoting any new number (only on the owner's request).** Before the re-run, fix the three logging gaps so the next dataset is better than the first: record the healer model per attempt, the complexity rating, and the failure stage (parse / schema / build / launch). Freeze a prompt set (the UAT persona × complexity set is the obvious candidate), run at least 100 generations, publish per-complexity rates. Until then every public number carries "early-2026 models".
6. **Fix the two small presentation inconsistencies now:** `resume.md` says "~90k lines" and the site says "about 90,000 lines"; the facts sum to ~92k (70k + 20k + 2.2k). Either is fine, but keep one. The test count should read "about 130" or "136" consistently.

### Gaps
- I did not inspect `tests/` subfolders for secrets or fixtures containing keys; scrub before any publish.
- Cost of a 100-run re-run is unknown because cost was never metered; do not estimate it.

---

## Key Question 6 — Interviewer questions and strong answers

### Takeaway
Every answer below cites a module or a logged number; none relies on a repo document. The two questions most likely to expose over-claiming are "which model generated the apps?" and "what does success mean?", so those answers are the most careful.

### Cited Findings (answers grounded in `backend/orchestration_v2/*` and the log)

**Q1. How did you detect hallucinated APIs?**
Three layers. First, the zero-LLM pre-validator has an explicit block of fixes for fabricated APIs the models produced repeatedly: invented `Calendar.Component` cases (`.monthOfYear`, `.dayOfWeek`, `.dayOfMonth`, `.hourOfDay` rewritten to `.month`, `.weekday`, `.day`, `.hour`), invented `Font` methods, and `Color.primary(x)` or `Color.red(x)` called as functions (the pattern is scoped so it does not touch custom extension methods). Second, the compiler: anything not caught upstream fails `swiftc` with "cannot find … in scope" or "no exact matches in call to initializer", and the healer gets the exact diagnostic. Third, the learning loop: the healer error tracker builds a signature per error; once a signature appears five or more times with at least 80% fix success it is promoted to a staging section of the pre-validator, so the next hallucination of that kind never costs a model call. (`pre_validator.py` lines ~1466–1580, 1906–1916; `healer_error_tracker.py` `auto_promote_to_prevalidator`)

**Q2. How did the healer avoid loops?**
It is bounded and stateful, not autonomous. `max_attempts = 3`, hard cap. Build errors are parsed into structured records and de-duplicated with a `seen_errors` set, so one root cause does not get fixed three times. Each prompt carries "Attempt N/3" plus the previous diffs, and the final or complex attempt escalates to Opus via a different task type. The pre-validator's safety guard also applies to any healer output: a fix that unbalances braces or deletes more than half a file is rejected rather than built. The log shows the cap working: 88 of 113 failures stopped at exactly three attempts. (`llm_healer.py` lines 69, 99–122, 282, 470–473; `pre_validator.py` `_is_safe_fix`)

**Q3. What did you measure, and why those metrics?**
End-to-end success, because the user's question is "did I get a running app"; first-pass success, because it measures the generator plus validator without the healer's help; healer rescue rate, because it tells me whether repair spend is worth it; and median duration, because a 2-minute promise needs a median not a mean (the mean is 3.2 minutes, dragged by failures at 3.7 minutes median). I logged modifications separately because they are a different task with a different base rate (83% vs 66%). Success was defined strictly: built, installed, launched, process still alive, no crash log. I did not measure cost (heuristic field, never published) or UX quality (no oracle).

**Q4. Which model generated the apps? Five models seems a lot.**
Generation was mostly Claude Sonnet, with Opus for complex apps and for healer escalation; GPT-4.1, Gemini 2.5 and Grok sat behind the router as task-type fallbacks and for other tasks (vision, images, classification fallback). The run log records only the generation model, and it says Sonnet for 283 of 333 rows and is blank for the structured path, so I cannot quantify how often fallbacks fired from that log. That is one of the logging gaps I would close before a re-run.

**Q5. What did the failures look like?**
Two populations. 78% exhausted the healer, mostly string-literal syntax, separator errors, non-function calls, ambiguous uses and duplicate declarations across files; the healer handles local errors well and cascades badly. 22% never reached the compiler: unparseable output or schema failures on 6+-screen apps. The second group was cheaper to fix (parser, schema) and I would not have known it existed without keeping error text in the log. A handful were infrastructure (simulator destination not found) misfiled as generation failures, which is why I would add a failure-stage field.

**Q6. Build success is not a working app. What did you do about that?**
Agreed, and it is written into the project rules. After the build: install, launch, screenshot, process-alive check, crash-log scan, plus a runtime validator for patterns that compile but crash (environment objects injected inside a NavigationStack, tasks inside onAppear). That catches crashes, not wrong behaviour. The honest next step is a functional oracle: scripted taps against the generated app's declared screens, or a vision model grading the screenshot against the request, with a bias check like the one in testgen-evals.

**Q7. What would you do with 10× more runs?**
Three things, in order. Stratify: per-complexity and per-app-type success, because the current set is 23% counter apps. Ablate: run with the ~970 rules off, with the pre-validator off, with escalation off, each on the same frozen prompt set, so I can state lifts instead of mechanisms. Calibrate: have a human label a sample of "successful" apps for whether they actually do what was asked, and report that gap the way testgen-evals reports coverage versus completeness.

**Q8. How does this transfer to testing LLM features in production?**
The method is the same: deterministic checks first because they are free and do not drift; a paid evaluator only where the cheap check saturates; log every interaction with enough structure to split failures by stage; promote recurring fixes upstream; and report numbers with the model and date attached because they expire. I applied it again in testgen-evals, where the deterministic layer read 100% and the judge still found 9 of 52 cases incomplete.

**Q9. Why regex instead of an LLM for the pre-validator?**
Cost, latency and determinism. 193 patterns run in milliseconds, cost nothing, and give the same answer every time, which makes them testable (validator changes must pass on three app types). An LLM pass before the build would double model spend on every run and could introduce new errors; it is reserved for the healer, where the compiler has already told us exactly what is wrong.

**Q10. What broke in production and what did you change?**
Credit refunds after crashes, session loss, a CSRF failure that users read as a paywall, an environment override bug, Xcode 26 cold-start timeouts, and an unauthenticated progress endpoint that leaked generated code. Each got a postmortem in v3.1.1. The endpoint leak is the one I bring up unprompted because it is a security miss I made and fixed.

**Q11. Why is it paused?**
It was prepared for a YC application in early 2026, and the measured numbers (66% end-to-end) were honest but not a product people would pay for yet. I paused rather than sell a 2-in-3 success rate. The harness is model-agnostic, so the sensible restart is a frozen-prompt re-run on current models.

**Q12. What is the weakest part of the codebase?**
The pre-validator is one 4,874-line file, and there are about 130 tests for ~70k lines of Python. Both are solo-project artefacts. I would split the validator by pattern family (the method names already are) and bring the test density up around the gates first, because those are the parts other people would depend on.

**Q13. How did you keep the rules and patterns from fighting each other?**
Each pattern carries a name and description; cross-file fixers run after single-file patterns; the safety guard checks the before/after of every fix; and promoted patterns land in a staging section that must be reviewed before moving into the main file. The project rule "no per-app special cases" exists because the first version had them and they interacted badly.

### Inferences
- Q4 and Q6 are the credibility tests. Answering them with the limitation stated first ("the log records only…", "that catches crashes, not behaviour") is what a Apple Evaluation or Amazon agentic-evaluation interviewer is listening for, per the posting language in Key Question 2.

### Gaps
- Q10 relies on the facts-file summary of v3.1.1 postmortems; I did not read the postmortem documents, so keep the answer at the level stated.
