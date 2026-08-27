# Dependency Decisions

Audit date: 2026-08-26

| Dependency | Type | Upstream range | Current maintained version | Status / advisories | Decision | Rationale |
| --- | --- | --- | --- | --- | --- | --- |
| None | runtime | none | none | zero known runtime advisories | Preserve | The algorithm does not need a runtime package |
| None | optional | none | none | n/a | Preserve | No optional features are required |
| None | peer | none | none | n/a | Preserve | No host framework contract exists |
| `tape` | development | `~1.0.2` | `5.10.2` | maintained; no baseline audit finding | Upgrade | Keep the original suite executable while removing its obsolete development tree |
| `esbuild` | development | none | `0.28.2` | development-only | Add | Reproducible CommonJS, ESM, and global browser artifacts |
| `typescript` | development | none | `7.0.2` | development-only | Add | Validate first-party declarations; TypeScript 3.9 is tested separately |
| `eslint`, `c8`, `publint`, `@arethetypeswrong/cli` | development | none | pinned in lockfile | development-only | Add | Static, coverage, and package-contract release gates |

Modern lint, coverage, type, packaging, and browser tools are development-only.
They are pinned through the lockfile and never increase consumer runtime
surface. Production remains zero dependency.
