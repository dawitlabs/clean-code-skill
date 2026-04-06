# Code Smells and Heuristics

Complete reference of code smells from Robert C. Martin's Clean Code, Chapter 17.

Use this file to identify specific violations during code review.

---

## Comments (C)

### C1: Inappropriate Information
- Don't put implementation details in comments
- Don't put change history in comments (use version control)
- Comments should explain intent, not mechanics

### C2: Obsolete Comment
- Update or remove old comments
- If code changes, check if comments still apply
- Stale comments are worse than no comments

### C3: Redundant Comment
- Don't restate the obvious
- Bad: `i++; // increment i`
- Bad: `return count; // returns the count`

### C4: Poorly Written Comment
- Take time to write good comments
- Comments should be clear and grammatical
- Avoid mumbling, incomplete sentences

### C5: Commented-Out Code
- **Delete it**
- Don't leave commented-out code blocks
- If you need it back, it's in version control

---

## Environment (E)

### E1: Build Requires More Than One Step
- Building should be one simple command
- Complex build processes indicate problems
- Automate build steps

### E2: Tests Require More Than One Step
- Running tests should be one simple command
- If tests are hard to run, they won't be run
- Automate test execution

---

## Functions (F)

### F1: Too Many Arguments
- Ideal: 0, 1, or 2 arguments
- Avoid: 3 or more arguments
- Consider wrapping in a parameter object

### F2: Output Arguments
- Output arguments are confusing
- Use return values instead
- If multiple values needed, return an object

### F3: Flag Arguments
- Boolean arguments indicate function does more than one thing
- Split into separate functions instead
- Bad: `render(isSuite)` → Good: `renderForSuite()` and `renderForSingle()`

### F4: Dead Function
- Remove functions that are never called
- Dead code clutters the codebase
- If you need it later, it's in version control

---

## General (G)

### G1: Multiple Languages in One Source File
- Minimize languages per file
- Ideally: one language per file
- Mixing languages increases complexity

### G2: Obvious Behavior Is Unimplemented
- Follow Principle of Least Surprise
- Code should behave as expected
- Don't leave obvious gaps

### G3: Incorrect Behavior at the Boundaries
- Boundary conditions are where bugs hide
- Always test boundaries
- Consider edge cases in conditions

### G4: Overridden Safeties
- Don't turn off compiler warnings
- Don't suppress exceptions without good reason
- Don't bypass security checks

### G5: Duplication
- **Don't Repeat Yourself (DRY)**
- Duplication is the root of all evil
- Extract repeated code into functions or classes
- Types of duplication:
  - Copy-paste: identical code
  - Structural: similar structure, different values
  - Procedural: similar algorithms
  - Data: same data in multiple places

### G6: Code at Wrong Level of Abstraction
- Keep high-level and low-level code separated
- Don't mix abstraction levels in functions
- Base classes should be abstract, concrete details in derivatives

### G7: Base Classes Depending on Derivatives
- Base classes should not know about derivatives
- Violates dependency inversion
- Makes inheritance fragile

### G8: Too Much Information
- Minimize interface surface area
- Don't expose internal details
- Keep classes and modules small

### G9: Dead Code
- Delete unreachable code
- Delete code that can never execute
- Delete commented-out code

### G10: Vertical Separation
- Variables and functions should be close to where they're used
- Declare variables close to their first use
- Private methods should follow the public methods that call them

### G11: Inconsistency
- Be consistent in naming and approach
- Don't use `fetch` in one place and `get` in another
- Follow established patterns in the codebase

### G12: Clutter
- Remove unused variables
- Remove unused imports
- Remove commented-out code
- Remove empty default constructors

### G13: Artificial Coupling
- Don't couple things artificially
- Things that don't depend on each other shouldn't
- Avoid "god objects" that know too much

### G14: Feature Envy
- Method uses data/functions of another class more than its own
- Move method to the class it envies
- Example: `calculatePayroll(Employee)` using mostly `Payroll` data

### G15: Selector Arguments
- Avoid arguments that select behavior
- Bad: `calculate(isWeekend)`
- Good: `calculateWeekend()` and `calculateWeekday()`
- Similar to F3 (Flag Arguments)

### G16: Obscured Intent
- Code should be clear
- Don't use clever tricks
- Don't write code that requires explanation

### G17: Misplaced Responsibility
- Put functions where they belong
- Don't scatter related functionality
- Cohesion matters

### G18: Inappropriate Static
- Prefer non-static methods
- Static methods can't be overridden
- Static state makes testing harder

### G19: Use Explanatory Variables
- Break complex expressions into explanatory variables
- Makes code self-documenting
- Bad: `if (line.split(':')[0].equals("Error"))`
- Good: `String errorFlag = line.split(':')[0]; if (errorFlag.equals("Error"))`

### G20: Function Names Should Say What They Do
- If name doesn't match behavior, fix name or behavior
- Bad: `saveUser()` that also validates
- Fix: `validateAndSaveUser()` or separate functions

### G21: Understand the Algorithm
- Don't use code you don't understand
- Don't copy-paste without understanding
- Understand time/space complexity
- Understand edge cases

### G22: Make Logical Dependencies Physical
- Dependencies should be explicit
- Don't depend on coincidences
- If A depends on B, A should explicitly import/use B

### G23: Prefer Polymorphism to If/Else or Switch/Case
- Use polymorphism for type-based behavior
- Replace switch statements with strategy pattern
- Makes adding new types easier

### G24: Follow Standard Conventions
- Follow team standards
- Follow language conventions
- Follow industry standards
- Consistency aids readability

### G25: Replace Magic Numbers with Named Constants
- Use named constants instead of literal numbers
- Bad: `if (count > 5)`
- Good: `if (count > MAX_RETRY_COUNT)`
- Exception: 0, 1, 2 in obvious contexts (loops, indexing)

### G26: Be Precise
- Be specific in expectations
- Don't be vague in requirements
- Don't be vague in implementation
- Know exactly what your code does

### G27: Structure over Convention
- Use structure (if/else, inheritance) over convention
- Don't rely on "everyone knows to do X"
- Make decisions explicit in code structure

### G28: Encapsulate Conditionals
- Wrap conditionals in well-named functions
- Bad: `if (timer.hasExpired() && !timer.isRecurrent())`
- Good: `if (shouldBeDeleted(timer))`

### G29: Avoid Negative Conditionals
- Positive conditionals are easier to read
- Bad: `if (!isNotFound())`
- Good: `if (isFound())`
- Negatives require mental gymnastics

### G30: Functions Should Do One Thing
- Self-explanatory
- If you can extract another function, you should
- Single Responsibility Principle applies to functions

### G31: Hidden Temporal Couplings
- Make temporal dependencies explicit
- If B must be called after A, make it obvious
- Bad: calling methods in order without structure
- Good: `context.setup(); context.execute(); context.teardown();`

### G32: Don't Be Arbitrary
- Have a reason for structure
- Don't organize code arbitrarily
- Every decision should have a purpose

### G33: Encapsulate Boundary Conditions
- Boundary conditions are hard to get right
- Encapsulate them in variables or functions
- Bad: `if (index < items.length - 1)`
- Good: `if (hasNextItem(index))`

### G34: Functions Should Descend Only One Level of Abstraction
- Each function should be at one abstraction level
- Don't mix high-level policy with low-level details
- The stepdown rule: reading code should descend levels

### G35: Keep Configurable Data at High Levels
- Configuration should be at high levels
- Don't bury config in low-level code
- Makes changes easier and safer

### G36: Avoid Transitive Navigation
- Don't reach through objects
- Bad: `order.getCustomer().getAddress().getZipCode()`
- Good: `order.getCustomerZipCode()`
- Train wreck violation

---

## Java (J)

### J1: Avoid Long Import Lists by Using Wildcards
- Use `import package.*;` for many imports
- Reduces import clutter
- Modern IDEs handle this well

### J2: Don't Inherit Constants
- Don't use inheritance just for constants
- Use `import static` instead
- Inheritance implies "is-a" relationship

### J3: Constants versus Enums
- Prefer enums over integer constants
- Enums are type-safe
- Enums can have methods
- Bad: `public static final int COLOR_RED = 1;`
- Good: `enum Color { RED, GREEN, BLUE }`

---

## Names (N)

### N1: Choose Descriptive Names
- Names should reveal intent
- Names should answer why, what, and how
- Bad: `int d;`
- Good: `int elapsedTimeInDays;`

### N2: Choose Names at the Appropriate Level of Abstraction
- Don't mix abstraction levels in names
- High-level concepts get high-level names
- Implementation details get specific names

### N3: Use Standard Nomenclature Where Possible
- Use established patterns and conventions
- Use domain terminology
- Don't invent new names for existing concepts

### N4: Unambiguous Names
- Names should not be confusing
- Avoid names that sound similar
- Avoid names with multiple meanings

### N5: Use Long Names for Long Scopes
- Short names for short scopes (loop variables)
- Long names for long scopes (class members)
- Scope size should correspond to name length

### N6: Avoid Encodings
- No Hungarian Notation
- No member prefixes (m_, _)
- No interface prefixes (I)
- Modern editors make these unnecessary

### N7: Names Should Describe Side-Effects
- Names should reveal everything the function does
- Bad: `checkPassword()` that also initializes session
- Good: `checkPasswordAndInitializeSession()` or separate functions

---

## Tests (T)

### T1: Insufficient Tests
- Test everything that could possibly break
- If you didn't test it, assume it's broken
- Aim for confidence, not coverage percentage

### T2: Use a Coverage Tool
- Track test coverage
- Identify untested code
- Coverage is necessary but not sufficient

### T3: Don't Skip Trivial Tests
- Test trivial code too
- Trivial bugs are still bugs
- Trivial tests are easy to write

### T4: An Ignored Test Is a Question about an Ambiguity
- Clarify or remove ignored tests
- Don't commit ignored tests
- Fix the ambiguity

### T5: Test Boundary Conditions
- Boundaries are where bugs hide
- Test 0, 1, n
- Test first, last, middle
- Test null, empty, maximum

### T6: Exhaustively Test Near Bugs
- Bugs cluster
- If you find one bug, look for more nearby
- Bugs indicate areas of complexity

### T7: Patterns of Failure Are Revealing
- Look for patterns in test failures
- Common failure patterns indicate design problems
- Fix the pattern, not just the symptom

### T8: Test Coverage Patterns Can Be Revealing
- Look at what's not covered
- Uncovered code may be unreachable
- Uncovered code may be too complex

### T9: Tests Should Be Fast
- Slow tests won't be run
- Tests should complete in seconds
- Fast feedback is essential

---

## Quick Reference Card

### Most Common Smells (Start Here)

| Priority | Smell | Solution |
|----------|-------|----------|
| High | G5 Duplication | Extract function/class |
| High | N1 Poor Naming | Rename to reveal intent |
| High | F1 Too Many Arguments | Create parameter object |
| High | G28 Complex Conditionals | Extract to named function |
| Medium | F3 Flag Arguments | Split into separate functions |
| Medium | G25 Magic Numbers | Use named constants |
| Medium | C5 Commented-Out Code | Delete it |
| Medium | G14 Feature Envy | Move method to proper class |
| Low | G12 Clutter | Remove unused code |
| Low | C3 Redundant Comments | Delete or clarify |

---

## How to Use This Reference

### During Code Review

1. **Scan for high-priority smells**:
   - Duplication
   - Poor naming
   - Too many arguments
   - Complex conditionals

2. **Check for medium-priority**:
   - Flag arguments
   - Magic numbers
   - Commented-out code

3. **Note low-priority**:
   - Clutter
   - Redundant comments

### When Refactoring

1. Start with **naming** (easiest, high impact)
2. Fix **duplication** (reduces size)
3. Extract **functions** (improves structure)
4. Refactor **classes** (improves architecture)
5. Clean up **comments** (polish)

### Teaching

Use specific smell codes when explaining:
- "This has F1 (Too Many Arguments)"
- "Watch out for G14 (Feature Envy) here"
- "You're violating G5 (Duplication)"

This creates shared vocabulary and makes feedback precise.

---

## Summary

**Most Important Principles**:
1. **Names reveal intent** (N1)
2. **Don't repeat yourself** (G5)
3. **Functions do one thing** (G30, F1)
4. **Delete commented-out code** (C5)
5. **Use explanatory variables** (G19)

**Remember**: These heuristics are guidelines, not laws. Use judgment. Sometimes breaking a rule is cleaner than following it rigidly.

**The Boy Scout Rule**: Leave code cleaner than you found it. Fix one smell at a time.
