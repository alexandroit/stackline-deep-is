# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and this project follows [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [1.0.1] - 2026-08-26

### Added

- Public interactive comparator and machine-readable documentation.
- Pinned CI, CodeQL, and immutable npm publication workflows.
- Documentation build, crawler metadata, package checks, and production audit
  gates.

### Changed

- Public repository metadata to the canonical `stackline-deep-is` repository.

## [1.0.0] - 2026-08-26

### Added

- Cycle-safe and stack-safe iterative object-graph traversal.
- Native ESM and browser distribution entry points.
- TypeScript declarations compatible with legacy CommonJS consumers.
- Differential tests against the complete `deep-is@0.1.4` behavior baseline.
- Deep-graph, cyclic-graph, package, browser, and optionator smoke tests.
- Security, migration, compatibility, provenance, and maintenance documents.

### Changed

- Package name to `@stackline/deep-is` for independent maintenance.
- Development and release verification to current tooling.

### Preserved

- The callable CommonJS API and legacy equality semantics.
- Zero runtime dependencies.
- The original MIT license and copyright notices.

[Unreleased]: https://github.com/alexandroit/stackline-deep-is/compare/v1.0.1...HEAD
[1.0.1]: https://github.com/alexandroit/stackline-deep-is/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/alexandroit/stackline-deep-is/tree/v1.0.0
