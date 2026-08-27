# Contributing

Thank you for helping maintain `@stackline/deep-is`.

## Development

Use a current Node.js LTS release and run:

```bash
npm ci
npm run verify
```

Changes to equality behavior must include a focused regression and an explicit
compatibility analysis. Legacy behavior should not be modernized silently.

## Pull Requests

- Keep changes scoped and explain their observable impact.
- Add or update tests before changing implementation behavior.
- Preserve the MIT notices and document imported upstream work.
- Update `CHANGELOG.md` for user-visible changes.
- Do not add runtime dependencies without a documented necessity review.
