---
name: clean-code
description: Apply Clean Code principles to review, refactor, and write maintainable codebases. Use for code review, naming cleanup, function/class refactors, readability hardening, and reducing technical debt. Triggers on "review my code", "clean code", "refactor this", "improve maintainability", "code smells", "messy code", "naming issues", or "make this code cleaner".
license: MIT
metadata:
  author: Robert C. Martin inspired
  version: 3.0.0
  category: code-quality
  tags: [clean-code, maintainability, refactoring, code-review, readability]
---

# Clean Code

Write and review code that is easy to read, safe to change, and cheap to maintain.

## When To Use

Use this skill when the user wants:
- Code review focused on quality, not just correctness
- Refactoring for readability and maintainability
- Better naming and function boundaries
- Code smell detection and prioritization
- A stronger long-term codebase structure

Prefer pairing with:
- `code-quality-engineering` for broader senior-level quality passes
- `testing-quality` when behavior changes or regression risk is significant

## Mission

Produce code that is:
- Correct
- Readable
- Testable
- Evolvable
- Boring in the best way (predictable, unsurprising)

## Maintainability Contract (Agent Behavior)

Always enforce these rules:
1. Preserve behavior first. Refactor without changing outputs unless asked.
2. Make intent obvious. Names should remove guesswork.
3. Keep units focused. One function/class should have one clear reason to change.
4. Reduce cognitive load. Prefer straight-line logic over nested cleverness.
5. Keep error paths explicit. Fail loudly with actionable context.
6. Add or update tests proportionate to risk.
7. Leave the touched area cleaner than it was.

Never do these:
- Over-abstract for style points
- Introduce indirection with vague helper names
- Rewrite whole modules when a surgical refactor solves the issue
- Hide uncertainty; call out assumptions and risks explicitly

## Cute Code Policy

"Cute code" means delightful readability, not gimmicks.

Allowed:
- Small expressive helpers with precise names
- Intent-revealing variables that read like prose
- Minimal, tasteful comments for non-obvious "why"

Not allowed:
- Joke names in production code
- Clever one-liners that reduce clarity
- Decorative comments, emoji comments, or noisy style tricks

## Fast Review Workflow (5-10 min)

1. Read for intent: What is this code responsible for?
2. Find top 3 issues: prioritize by maintenance risk.
3. Classify issues: naming, function shape, structure, error handling, tests.
4. Propose minimal high-impact fixes.
5. Report findings with severity and concrete examples.

## Deep Refactor Workflow

### Phase 1: Safety
1. Confirm expected behavior and constraints.
2. Identify existing tests; add guard tests if needed.

### Phase 2: Clarity
1. Rename unclear identifiers.
2. Replace magic values with named constants.
3. Flatten deeply nested control flow where possible.

### Phase 3: Boundaries
1. Split multi-purpose functions.
2. Remove flag-argument branches by splitting intent into separate functions.
3. Isolate side effects from pure logic.

### Phase 4: Design Hygiene
1. Enforce single responsibility in classes/modules.
2. Reduce coupling via clearer interfaces.
3. Remove dead code and redundant comments.

### Phase 5: Verification
1. Run tests/lint/types.
2. Confirm no unintentional behavior changes.
3. Summarize residual risk.

## Prioritization Matrix

Fix in this order:
1. Correctness and data-loss risk
2. Error-handling ambiguity
3. Hard-to-read hot paths
4. Naming and API clarity
5. Structural debt (coupling/cohesion)
6. Cosmetic cleanup

## Quality Checklist

### Naming
- Names reveal intent and domain meaning
- Booleans read as predicates (`is`, `has`, `should`)
- No vague placeholders (`tmp`, `data`, `misc`, `util`)

### Functions
- One level of abstraction per function
- Minimal parameters (prefer 0-3, justify beyond)
- Command-query separation where practical
- No hidden side effects

### Modules/Classes
- Single clear responsibility
- Cohesive public API
- Dependencies point inward to stable abstractions

### Error Handling
- Include actionable context in errors
- Avoid silent fallback that hides failures
- Distinguish "empty result" vs "failed operation"

### Tests
- Cover critical behavior and failure paths
- Add regression tests for bugs/refactors
- Avoid brittle tests that mirror implementation details

## Output Format For Reviews

When returning review feedback, use:
1. Findings first, sorted by severity (`high`, `medium`, `low`)
2. For each finding: location, issue, why it matters, minimal fix
3. Open questions/assumptions
4. Short change plan (smallest safe sequence)

## Examples

### Example: Naming

Bad:
```javascript
let d; // elapsed days
let flg;
```

Good:
```javascript
const elapsedDays = 3;
const isEligibleForRetry = true;
```

### Example: Flag Argument

Bad:
```javascript
function processPayment(isRefund) {
  if (isRefund) refund();
  else charge();
}
```

Good:
```javascript
function refundPayment() {
  refund();
}

function chargePayment() {
  charge();
}
```

### Example: Comment Cleanup

Bad:
```javascript
// increment retry count
retryCount++;
```

Good:
```javascript
retryCount++;
```

## Troubleshooting

### Reviews are shallow
- Force severity-based findings (not generic praise)
- Require concrete code references and minimal patches

### Too many suggestions
- Limit to highest impact first pass
- Split into iterative rounds: naming -> functions -> structure

### Refactor resistance
- Explain maintenance payoff in concrete terms (faster onboarding, safer edits, fewer regressions)
- Use incremental diffs, not big-bang rewrites

## References

Read only as needed:
- `references/code-smells.md` for smell catalog and heuristics
- `references/naming-patterns.md` for naming conventions
- `references/refactoring-patterns.md` for extraction and decomposition patterns
- `references/javascript-examples.md` for JS-focused examples

## Success Criteria

This skill succeeds when code after the pass is:
- Faster to understand
- Safer to modify
- Easier to test
- Less coupled
- Free of avoidable ambiguity
