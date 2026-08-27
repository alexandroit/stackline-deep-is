# Registry Handoff

## Current State

- Upstream: `deep-is@0.1.4`
- Stackline target: `@stackline/deep-is@1.0.1`
- Decision: GO
- State: PUBLIC RELEASE COMPLETE
- Runtime dependencies: zero
- Verdaccio and public npm: `@stackline/deep-is@1.0.1`, completed and validated
- GitHub: https://github.com/alexandroit/stackline-deep-is
- Docs: https://alexandro.net/docs/vanilla/deep-is/

## Verified Delta

The maintained implementation preserves the historical result matrix while
handling cyclic and deeply nested graphs iteratively. First-party types,
current module metadata, browser verification, package checks, and migration
alias documentation are complete.

## Gate Evidence

- `npm run verify`: PASS
- upstream assertions: 14/14
- baseline differential pairs: 5,625
- core coverage: 100%
- maximum tested depth: 100,000 levels
- TypeScript: 3.9 and 7.0.2 PASS
- `publint`: clean
- AreTheTypesWrong: all green
- `optionator@0.9.4` adoption path: PASS
- Verdaccio and official npm direct and alias installs: PASS
- production dependency audit: 0 findings
- tarball SHA-1: `4fa48fa659fd3538c3de29c5f61241f569bc4fbe`
- tarball integrity: `sha512-z4gQ8m+pdFSQ1Og3kJ/Zxu9q+ajlS6XLUDZ+y1ZewYxD5X87urnuB+et8oIDPV7eX5FtDDw7Re0TJ/IcN5sRJg==`
- CI and CodeQL: PASS
- GitHub release assets: tarball, SHA512SUMS, and CycloneDX SBOM

## Next Gate

Projects 05 and 06 are also public. Project 07 (`cardinal`) is the next fixed
roadmap item.
