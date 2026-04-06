# clean-code-skill

Maintainability-first skill for AI coding agents.

This skill helps agents review and refactor code using Clean Code principles, with a strong focus on readability, explicit error handling, low coupling, and safe incremental change.

## What This Skill Does

- Finds high-impact code quality issues (not cosmetic noise)
- Prioritizes fixes by risk and maintainability impact
- Enforces clear naming and focused function/module boundaries
- Preserves behavior while refactoring
- Encourages proportional testing and regression safety

## Best For

- "Review my code quality"
- "Refactor this messy function"
- "Improve maintainability without changing behavior"
- "Fix naming and structure issues"
- "Make this code clean and readable"

## Install

### Option 1: Skills CLI (recommended)

```bash
npx skills add dawitlabs/clean-code-skill
```

### Option 2: npm package

```bash
npm i -g @dawitlabs/clean-code-skill
clean-code-skill
```

### Option 3: one-off install

```bash
npx @dawitlabs/clean-code-skill
```

## How To Use In Prompts

Use direct, task-specific requests. Examples:

```text
Use clean-code skill: review this file and list findings by severity with minimal fixes.
```

```text
Refactor this function for maintainability. Preserve behavior and add tests only for risky paths.
```

```text
Apply clean-code principles to improve naming and reduce coupling in this module.
```

## Expected Output Style

When used correctly, responses should be:

1. Findings first, sorted by severity (`high`, `medium`, `low`)
2. Clear location + issue + why it matters + minimal fix
3. Assumptions/open questions
4. Smallest safe change sequence

## Skill Contents

- `SKILL.md`: core workflow, constraints, and review format
- `references/code-smells.md`: smell catalog and heuristics
- `references/naming-patterns.md`: naming patterns
- `references/refactoring-patterns.md`: decomposition/refactor patterns
- `references/javascript-examples.md`: JS examples

## Maintainer Notes

- Version: `3.0.0`
- Scope: code quality and maintainability (not feature architecture design)
- Pairs well with:
  - `code-quality-engineering`
  - `testing-quality`

## License

MIT
