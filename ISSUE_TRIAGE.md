# Issue And Pull Request Triage

Audit date: 2026-08-26

| Item | Result | Rationale |
| --- | --- | --- |
| Issue #1: signed zero | Already included | Baseline behavior and tests retained |
| Issue #2 / PR #3: license | Already included | Copyright chain retained verbatim |
| PR #4: `.npmignore` | Reject exact patch | Explicit package files are clearer; repository tests remain public |
| PR #5: smaller npm package | Accept intent | Package only runtime/docs/license/types needed by consumers |
| PR #7 / Issue #9: license metadata | Already included | SPDX `MIT` retained |
| Issue #8: maintenance status | Record nuance | Upstream said stable, not EOL; Stackline avoids abandonment claim |

No open or closed upstream report currently tracks cycle or deep-stack
behavior. Stackline reproduces it independently and documents it as a verified
reliability gap, not as an upstream advisory.
