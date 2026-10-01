# Centering guide and organic growth experiment

Status: implementation and collection kit, not a completed growth experiment. No visitor, purchase, interview or accuracy results are claimed. The live website has not been changed by this branch.

## First experiment

Hypothesis: collectors searching for an explanation of 60/40 centering will understand the app's purpose and complete a useful measurement. Start with `/guides/60-40-centering/`, one real-card demonstration and voluntary evidence sharing. Do not expand content or build a shop tier from pageviews alone.

Primary outcome: a valid automatic or explicitly confirmed manual front measurement, using the iOS scan-attempt funnel. Supporting measures: time to useful result, boundary correction time, back checked, voluntary share completion and meaningful return scans. Guardrails: overall-grade misunderstanding, invalid results, refunds and support effort.

Use comparable acquisition periods and record app/build/pipeline versions. Early observations are directional; a few purchases do not establish an A/B-test winner. The website does not add a tracking SDK. App Store campaign aggregates and the app's scan-attempt events are separate datasets; this change does not attribute an individual scan to a website visitor.

## App Store campaigns

Generate a real campaign link in App Store Connect and take its numeric `pt` provider token. Never use an invented token. See [Apple's campaign-link instructions](https://developer.apple.com/help/app-store-connect-analytics/acquisition/campaign-links/).

For local builds set `PUBLIC_APP_STORE_PROVIDER_TOKEN`; for the existing GitHub Pages build set repository variable `APP_STORE_PROVIDER_TOKEN`. The build exposes this public campaign token in links, not a secret credential. The helper uses `website-home` and `guide-60-40` as separate campaign names. Missing or invalid configuration produces an ordinary App Store link without an attribution claim. No production variable was set for this branch.

Record the actual configured link and campaign start date before observing results. Reconcile download and proceeds aggregates in App Store Connect. A campaign click is not a useful measurement, and displayed StoreKit prices are not net proceeds.

## Real-card demonstration script

This requires a person, a physical card and a device. The vector diagram in the guide is an illustration, not a photograph or proof of app accuracy.

1. Record the app version, build, Git commit, pipeline version, device and iOS version. Identify whether this is a TestFlight or App Store build; the shipped commit is currently unknown.
2. Use a conventional bordered card under diffuse light. Show the physical edge and the intended printed boundary. If sleeved, explain which edge belongs to the sleeve.
3. Capture a clear image, show provisional guides and deliberately inspect both boundaries. Confirm them explicitly. Do not cut away an ambiguity or failed detection to imply universal automatic success.
4. Show horizontal and vertical ratios separately. State that the result concerns centering and cannot establish an overall grade.
5. Capture and confirm the back. Show what “Back not checked” means if skipping it. Include a foil/glare example where a retake or manual adjustment is necessary.
6. Share an evidence sheet with its boundary method and version visible. Show that manually confirmed boundaries are not certification.
7. End with the guide's configured campaign link. Retain the unedited footage and note any retakes; do not publish numeric accuracy claims without the held-out benchmark.

## Five observed workflows

Use the adjacent CSV for five collectors, shop staff or creators who handle cards frequently. Recruitment/outreach and recording consent are outside this code change; no messages have been sent. Use participant codes, not names or card identifiers. Ask each person to inspect a front, inspect a back, explain the result and decide whether to share it voluntarily. Observe without explaining every control first.

Success evidence: a completed useful result, an accurate explanation that centering is only one grading factor, correct identification of whether the back was checked, and a request to repeat the workflow. Measure correction time and support interventions. Pilot paired/batch sessions only if people repeatedly return and the workflow remains understandable. A scripted or prompted share is not voluntary demand.

## Release checklist and unresolved inputs

- `npm run check` and `npm test` cover types, arithmetic, invalid margins, campaign links and generated page links/assets. They do not prove browser rendering or runtime interaction.
- Browser preview access was declined. Mobile layout, keyboard interaction, focus visibility, calculator editing, reduced motion and visual contrast remain pending browser QA. Do not substitute a screenshot generator or another browser to bypass that decision.
- Review website statements against the actual shipping app. Some app improvements are separate unmerged PRs. Confirm the App Store build/commit and current offer before publishing screenshots or demonstrations.
- Review the policy with actual analytics/ad SDK settings and App Store privacy disclosures. The copy describes observed data paths; it is not a legal compliance certification.
- Real reference photos, repeat scans, labels, 90-day downloads/proceeds/refunds and a configured provider token are still missing. Use the iOS benchmark kit for collection. Do not fabricate a baseline or campaign result.
- Publish only after the owner authorizes merging/deployment and the remaining release checks are complete. The existing workflow deploys pushes to `main`; this branch is not deployed.
