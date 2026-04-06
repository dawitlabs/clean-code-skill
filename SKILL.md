---
name: clean-code
description: Apply Robert C. Martin's Clean Code principles to review, refactor, and write professional-quality code. Use when user asks for code review, refactoring, "clean code" principles, code quality improvements, naming advice, or function refactoring. Triggers on phrases like "review my code", "is this clean code", "refactor this", "improve code quality", "check naming", "too many arguments", or "code smells".
license: MIT
metadata:
  author: Robert C. Martin
  version: 2.0.0
  category: code-quality
  tags: [refactoring, code-review, naming, functions, best-practices]
---

# Clean Code Principles

Apply Robert C. Martin's Clean Code principles to review, refactor, and write professional-quality code.

## When to Use

Use this skill when:
- **Code Review**: Reviewing code for quality issues and violations
- **Refactoring**: Improving messy or legacy code
- **Writing Code**: Ensuring new code follows professional standards
- **Learning**: Understanding specific Clean Code concepts
- **Code Smells**: Identifying and fixing anti-patterns

## Core Principles Overview

### 1. Meaningful Names
- Names reveal intent (why, what, how)
- Pronounceable and searchable
- Classes = nouns, Methods = verbs
- One word per concept
- No encodings (Hungarian notation, m_ prefixes)

### 2. Functions
- Small! (<20 lines ideally)
- Do one thing only
- Minimal arguments (0-2 preferred)
- No side effects
- Command-query separation

### 3. Comments
- Comments don't make up for bad code
- Good comments explain "why", not "what"
- Delete commented-out code
- Remove redundant comments

### 4. Formatting
- Read like a newspaper (high-level at top)
- Vertical openness between concepts
- Consistent team style

### 5. Classes
- Small by responsibility
- Single Responsibility Principle
- High cohesion, low coupling
- Depend on abstractions

### 6. Error Handling
- Use exceptions, not return codes
- Provide context in exceptions
- Don't return null
- Don't pass null

See `references/code-smells.md` for complete list of 70+ code smells and heuristics.

---

## Quick Reference: Code Review Checklist

Before diving deep, run through this checklist:

### Naming
- [ ] Names reveal intent (not `d` or `tmp`)
- [ ] Pronounceable (`generationTimestamp` not `genymdhms`)
- [ ] Classes are nouns, methods are verbs
- [ ] No magic numbers (use named constants)

### Functions
- [ ] Under 20 lines
- [ ] Does one thing (no "and" or "or" in name)
- [ ] 0-2 arguments (avoid flag arguments)
- [ ] No side effects
- [ ] Command or query, not both

### Comments
- [ ] Explain intent, not mechanics
- [ ] No commented-out code
- [ ] No redundant comments (`i++; // increment i`)

### Classes
- [ ] Single responsibility
- [ ] Small (<200 lines ideally)
- [ ] High cohesion

For detailed review workflows, see "Review Workflows" below.

---

## Review Workflows

### Workflow 1: Quick Code Review (5 minutes)

Use this for fast feedback on small code blocks.

**Step 1: Naming Check**
- Are variable names meaningful?
- Are they pronounceable?
- Do classes describe what they represent?

**Step 2: Function Check**
- Can you extract another function?
- How many arguments?
- Any side effects?

**Step 3: Comments Check**
- Are comments explaining "why" not "what"?
- Delete commented-out code

**Step 4: Size Check**
- Functions under 20 lines?
- Classes under 200 lines?

**Result**: Quick wins identified, specific violations noted.

---

### Workflow 2: Deep Refactoring Session

Use this for significant refactoring tasks.

**Phase 1: Analysis (Read-Only)**
1. Read code like a newspaper (top to bottom)
2. Identify all code smells (see `references/code-smells.md`)
3. Categorize: naming, functions, classes, comments, etc.
4. Note dependencies and coupling

**Phase 2: Naming Fixes**
1. Rename unclear variables
2. Fix class names (nouns)
3. Fix method names (verbs)
4. Replace magic numbers with named constants

**Phase 3: Function Extraction**
1. Extract functions that do one thing
2. Reduce argument counts (create parameter objects)
3. Remove flag arguments (split into separate functions)
4. Eliminate side effects

**Phase 4: Class Restructuring**
1. Apply Single Responsibility Principle
2. Extract classes with low cohesion
3. Reduce coupling (depend on abstractions)
4. Move methods to appropriate classes

**Phase 5: Comment Cleanup**
1. Remove redundant comments
2. Delete commented-out code
3. Convert comments to code when possible
4. Keep only intent-explaining comments

**Phase 6: Verification**
1. Run tests
2. Verify no behavior changes
3. Check formatting consistency

**Result**: Clean, maintainable code following professional standards.

---

### Workflow 3: Naming Review

Use this specifically when names are the primary issue.

**Step 1: Identify Intent**
- What is this variable/class/function supposed to represent?
- Why does it exist?
- How is it used?

**Step 2: Choose Appropriate Level**
- High-level abstraction for public APIs
- Implementation details for private methods
- Don't mix levels in names

**Step 3: Apply Naming Rules**
- Classes: Customer, WikiPage, AccountParser
- Methods: postPayment, deletePage, isValid
- Booleans: isActive, hasPermission, shouldRetry
- Constants: MAX_RETRIES, DEFAULT_TIMEOUT

**Step 4: Check Against Anti-Patterns**
- Not `tmp`, `buf`, `x`, `y` (except math)
- Not `data`, `info` suffixes
- Not numbered: `item1`, `item2`
- Not abbreviated: `gen`, `mod`, `cnt`

**Step 5: Verify Pronounceability**
- Can you say it in conversation?
- Would you feel confident using it in a code review?

**Result**: Names that communicate intent clearly.

---

## Examples

### Example 1: Poor Naming → Clean Naming

**Java - Before:**
```java
// BAD: Non-revealing names
int d; // elapsed time in days
String yyyymmdstr;
boolean flg;
```

**Java - After:**
```java
// GOOD: Intention-revealing names
int elapsedTimeInDays;
String formattedDate;
boolean isActive;
```

**JavaScript - Before:**
```javascript
// BAD: Non-revealing names
let d; // elapsed time in days
let yyyymmdstr;
let flg;
```

**JavaScript - After:**
```javascript
// GOOD: Intention-revealing names
const elapsedTimeInDays;
const formattedDate;
let isActive;
```

---

### Example 2: Large Function → Small Functions

**Java - Before:**
```java
// BAD: Function doing multiple things, 50+ lines
public void processUser(String userId, boolean sendEmail) {
    // validate user
    // fetch from database
    // update statistics
    // send notification
    // log activity
}
```

**Java - After:**
```java
// GOOD: Each function does one thing
public void processUser(String userId) {
    User user = validateAndFetchUser(userId);
    updateUserStatistics(user);
    notifyUserOfUpdate(user);
    logUserActivity(user, "updated");
}

private User validateAndFetchUser(String userId) { }
private void updateUserStatistics(User user) { }
private void notifyUserOfUpdate(User user) { }
private void logUserActivity(User user, String action) { }
```

**JavaScript - Before:**
```javascript
// BAD: Function doing multiple things, 50+ lines
function processUser(userId, sendEmail) {
    // validate user
    // fetch from database
    // update statistics
    // send notification
    // log activity
}
```

**JavaScript - After:**
```javascript
// GOOD: Each function does one thing
async function processUser(userId) {
    const user = await validateAndFetchUser(userId);
    await updateUserStatistics(user);
    await notifyUserOfUpdate(user);
    await logUserActivity(user, "updated");
}

async function validateAndFetchUser(userId) { }
async function updateUserStatistics(user) { }
async function notifyUserOfUpdate(user) { }
async function logUserActivity(user, action) { }
```

---

### Example 3: Flag Arguments → Separate Functions

**Java - Before:**
```java
// BAD: Flag argument indicates multiple things
public void processPayment(boolean isRefund) {
    if (isRefund) {
        // refund logic
    } else {
        // charge logic
    }
}

// Usage: processPayment(true); // What does true mean?
```

**Java - After:**
```java
// GOOD: Separate functions with clear names
public void refundPayment() { }
public void chargePayment() { }

// Usage is clear:
refundPayment();
chargePayment();
```

**JavaScript - Before:**
```javascript
// BAD: Flag argument indicates multiple things
function processPayment(isRefund) {
    if (isRefund) {
        // refund logic
    } else {
        // charge logic
    }
}

// Usage: processPayment(true); // What does true mean?
```

**JavaScript - After:**
```javascript
// GOOD: Separate functions with clear names
function refundPayment() { }
function chargePayment() { }

// Usage is clear:
refundPayment();
chargePayment();
```

---

### Example 4: Redundant Comments → Clear Code

**Java - Before:**
```java
// BAD: Comments restating the obvious
// Check if employee is eligible for full benefits
if (employee.flags & HOURLY_FLAG && employee.age > 65) {
    // ...
}
```

**Java - After:**
```java
// GOOD: Extract explanatory variable
boolean isEligibleForFullBenefits = 
    employee.isHourly() && employee.isSenior();

if (isEligibleForFullBenefits) {
    // ...
}
```

**JavaScript - Before:**
```javascript
// BAD: Comments restating the obvious
// Check if employee is eligible for full benefits
if (employee.flags & HOURLY_FLAG && employee.age > 65) {
    // ...
}
```

**JavaScript - After:**
```javascript
// GOOD: Extract explanatory variable
const isEligibleForFullBenefits = 
    employee.isHourly() && employee.isSenior();

if (isEligibleForFullBenefits) {
    // ...
}
```

---

### Example 5: Commented-Out Code → Delete

**Java - Before:**
```java
// BAD: Commented-out code
public void processOrder(Order order) {
    // Old validation logic - commented out
    // if (order.getTotal() > 1000) {
    //     applyDiscount(order);
    // }
    
    validateOrder(order);
    processPayment(order);
}
```

**Java - After:**
```java
// GOOD: Deleted old code (it's in version control)
public void processOrder(Order order) {
    validateOrder(order);
    processPayment(order);
}
```

**JavaScript - Before:**
```javascript
// BAD: Commented-out code
function processOrder(order) {
    // Old validation logic - commented out
    // if (order.total > 1000) {
    //     applyDiscount(order);
    // }
    
    validateOrder(order);
    processPayment(order);
}
```

**JavaScript - After:**
```javascript
// GOOD: Deleted old code (it's in version control)
function processOrder(order) {
    validateOrder(order);
    processPayment(order);
}
```

---

## Troubleshooting

### Skill doesn't trigger on code review requests

**Symptom**: "Review my code" doesn't load the skill

**Causes & Solutions**:
1. **Description too generic**
   - Add specific trigger phrases: "code smells", "function too long", "naming issues"
   
2. **User phrasing too vague**
   - Guide user to be specific: "Is this following clean code principles?"
   - Ask for code review with specific focus: "Check my function naming"

3. **No code provided**
   - Ask user to share code they want reviewed
   - Or paste code into conversation

---

### Review is too shallow

**Symptom**: "Looks good" or only surface-level feedback

**Causes & Solutions**:
1. **Code not analyzed deeply**
   - Ask: "Check for code smells from references/code-smells.md"
   - Use specific workflow (Quick Review, Deep Refactoring, Naming Review)

2. **Specific concerns not addressed**
   - Ask targeted questions: "Are the functions doing one thing?"
   - "Check for side effects in this code"
   - "Review the class structure for SRP violations"

3. **Missing context**
   - Ask: "What is the purpose of this code?"
   - "What are the requirements?"

---

### Too many issues found

**Symptom**: Overwhelming list of violations

**Solutions**:
1. **Prioritize**: Focus on highest-impact issues first
   - Naming (easiest, highest impact)
   - Function size and arguments
   - Then class structure

2. **Iterate**: Address in rounds
   - First pass: fix naming
   - Second pass: extract functions
   - Third pass: refactor classes

3. **Focus**: Choose one principle at a time
   - "Let's focus just on function names this round"
   - "Now let's look at argument counts"

---

### User resistance to changes

**Symptom**: "That's too much refactoring" or "Why rename it?"

**Responses**:
1. **Explain the benefit**
   - "This name will help the next developer understand immediately"
   - "Small functions are easier to test and debug"

2. **Show before/after**
   - Demonstrate readability improvement
   - Show how errors are caught earlier

3. **Incremental approach**
   - "Let's start with just the most confusing names"
   - "We'll do one function at a time"

4. **Boy Scout Rule**
   - "Leave it cleaner than you found it - doesn't need to be perfect"

---

## Best Practices

### For Code Reviews

1. **Be Kind**: Code review is about the code, not the person
2. **Explain Why**: Don't just say "fix this" - explain the principle
3. **Provide Alternatives**: "Instead of X, consider Y because..."
4. **Acknowledge Trade-offs**: Sometimes perfect is the enemy of good
5. **Celebrate Wins**: Point out what they did well

### For Refactoring

1. **Test First**: Have tests before refactoring
2. **Small Steps**: One change at a time
3. **Commit Often**: After each successful change
4. **Verify Behavior**: Ensure nothing broke
5. **Document Intent**: Explain why in commit messages

### For Learning

1. **Start Small**: Apply one principle at a time
2. **Practice**: Review open-source code
3. **Read**: Study well-written codebases
4. **Teach**: Explain principles to others
5. **Iterate**: It's a journey, not a destination

---

## The Boy Scout Rule

> Leave the campground cleaner than you found it.

Applied to code:

> Leave the codebase cleaner than you found it.

**Practical application**:
- Fix one name when you touch a file
- Extract one function while adding a feature
- Delete commented-out code when you see it
- Add one test when fixing a bug

Small improvements compound over time into clean codebases.

---

## References

- `references/code-smells.md` - Complete list of 70+ code smells and heuristics
- `references/naming-patterns.md` - Language-specific naming conventions
- `references/refactoring-patterns.md` - Common refactoring techniques
- `references/examples/` - Before/after code examples

---

## Summary

Clean code is code that:
- **Is easy to understand** - Names reveal intent, structure is clear
- **Is easy to change** - Small functions, single-responsibility classes
- **Has minimal dependencies** - Low coupling, high cohesion
- **Has clear and minimal API** - Functions do one thing
- **Reads like prose** - Code should be self-documenting
- **Is cared for** - Continuous small improvements

**Remember**: Clean code is not just about making code work - it's about making it right. It requires discipline, focus, and presence of mind. But the payoff is maintainable, professional code that others (and future you) will thank you for.
