# Naming Patterns and Conventions

Language-specific naming conventions for Clean Code principles.

---

## Python

### General Rules
- **Modules**: `lowercase` (no underscores)
- **Packages**: `lowercase` (no underscores)
- **Classes**: `PascalCase`
- **Functions**: `snake_case`
- **Variables**: `snake_case`
- **Constants**: `UPPER_SNAKE_CASE`
- **Private**: `_leading_underscore`
- **Protected**: `_leading_underscore`
- **Dunder**: `__double_underscore__` (magic methods)

### Examples

```python
# Modules and packages
import mypackage
from mymodule import MyClass

# Classes
class CustomerAccount:
    pass

class HTTPRequestHandler:
    pass

# Functions
def calculate_total(items):
    pass

def fetch_user_data(user_id):
    pass

# Variables
order_count = 5
customer_name = "John Doe"
is_valid = True

# Constants
MAX_RETRY_COUNT = 3
DEFAULT_TIMEOUT_SECONDS = 30
PI = 3.14159

# Private (internal use)
def _internal_helper():
    pass

class MyClass:
    def __private_method(self):
        pass
    
    def _protected_method(self):
        pass

# Magic methods (dunder)
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __str__(self):
        return f"Vector({self.x}, {self.y})"
    
    def __eq__(self, other):
        return self.x == other.x and self.y == other.y
```

### Naming Anti-patterns in Python

```python
# BAD: Non-descriptive names
def calc(a, b):
    return a + b

# GOOD: Descriptive names
def calculate_total_price(item_price, tax_amount):
    return item_price + tax_amount

# BAD: Hungarian notation (not needed in Python)
def strName(): pass

# GOOD: Clear type in name
def user_name(): pass

# BAD: Single letter variables (except in math contexts)
for i in items:
    process(i)

# GOOD: Descriptive loop variables
for item in items:
    process(item)

# BAD: Generic names
data = fetch_data()

# GOOD: Specific names
user_preferences = fetch_user_preferences()
```

---

## JavaScript/TypeScript

### General Rules
- **Variables**: `camelCase`
- **Functions**: `camelCase`
- **Classes**: `PascalCase`
- **Constants**: `UPPER_SNAKE_CASE` (true constants) or `camelCase`
- **Private**: `#privateField` (ES2022+) or `_convention`
- **Interfaces**: `PascalCase` (sometimes with `I` prefix - debated)
- **Types**: `PascalCase`
- **Enums**: `PascalCase` (members `PascalCase` or `UPPER_SNAKE_CASE`)
- **Files**: `kebab-case` or `camelCase` (match default export)

### Examples

```javascript
// Variables
const userCount = 5;
const DEFAULT_TIMEOUT = 3000;
let isLoading = true;

// Functions
function calculateTotal(items) {
    return items.reduce((sum, item) => sum + item.price, 0);
}

const fetchUserData = async (userId) => {
    // implementation
};

// Classes
class UserAccount {
    constructor(name) {
        this.name = name;
    }
}

class HTTPRequestHandler {
    // implementation
}

// ES2022 Private Fields
class BankAccount {
    #balance = 0;  // Truly private
    
    deposit(amount) {
        this.#balance += amount;
    }
    
    getBalance() {
        return this.#balance;
    }
}

// TypeScript Interfaces
type User = {
    id: string;
    name: string;
    email: string;
};

interface PaymentService {
    processPayment(amount: number): Promise<boolean>;
}

// TypeScript Enums
enum Status {
    Pending = 'PENDING',
    Approved = 'APPROVED',
    Rejected = 'REJECTED'
}

// TypeScript Generics
class Container<T> {
    private value: T;
    
    constructor(value: T) {
        this.value = value;
    }
    
    getValue(): T {
        return this.value;
    }
}
```

### Naming Anti-patterns in JavaScript

```javascript
// BAD: var (use const or let)
var count = 0;

// GOOD: const (doesn't change) or let (does change)
const MAX_COUNT = 100;
let currentCount = 0;

// BAD: == (use ===)
if (value == null) { }

// GOOD: Strict equality
if (value === null) { }

// BAD: Non-descriptive callback parameters
items.map((x) => x.name);

// GOOD: Descriptive parameters
items.map((item) => item.name);

// BAD: Abbreviated names
const usr = getUser();

// GOOD: Full names
const user = getUser();
```

---

## Java

### General Rules
- **Classes**: `PascalCase`
- **Interfaces**: `PascalCase` (no prefix)
- **Methods**: `camelCase`
- **Variables**: `camelCase`
- **Constants**: `UPPER_SNAKE_CASE`
- **Packages**: `lowercase` (reverse domain)
- **Files**: Match class name
- **Generic Types**: Single uppercase letter (E, T, K, V, N)

### Examples

```java
// Packages
package com.company.project.service;

// Classes
public class CustomerAccount {
    // implementation
}

public class OrderProcessor {
    // implementation
}

// Interfaces
public interface PaymentService {
    boolean processPayment(BigDecimal amount);
}

public interface Repository<T> {
    T findById(String id);
    void save(T entity);
}

// Methods
public class UserService {
    public User findUserById(String userId) {
        // implementation
    }
    
    public void saveUser(User user) {
        // implementation
    }
    
    public boolean isUserActive(User user) {
        // implementation
    }
}

// Variables
private String customerName;
private int orderCount;
private boolean isProcessing;

// Constants
public static final int MAX_RETRY_COUNT = 3;
public static final String DEFAULT_CURRENCY = "USD";
public static final BigDecimal MINIMUM_ORDER_AMOUNT = new BigDecimal("10.00");

// Generics
public class Container<T> {
    private T value;
    
    public T getValue() {
        return value;
    }
    
    public void setValue(T value) {
        this.value = value;
    }
}

// Generic method
public <T> T requireNonNull(T obj, String message) {
    if (obj == null) {
        throw new NullPointerException(message);
    }
    return obj;
}
```

### Naming Anti-patterns in Java

```java
// BAD: Hungarian notation
private String strName;

// GOOD: Clear name
private String name;

// BAD: Single letter variable names
for (int i = 0; i < items.size(); i++) {
    process(items.get(i));
}

// GOOD: Enhanced for loop with descriptive name
for (Item item : items) {
    process(item);
}

// BAD: Generic method names
public void process() { }

// GOOD: Specific method names
public void processPayment() { }

// BAD: Wildcard imports
import java.util.*;

// GOOD: Explicit imports
import java.util.List;
import java.util.ArrayList;
```

---

## C#

### General Rules
- **Classes**: `PascalCase`
- **Interfaces**: `PascalCase` (with `I` prefix - convention)
- **Methods**: `PascalCase`
- **Properties**: `PascalCase`
- **Variables**: `camelCase`
- **Constants**: `PascalCase` or `UPPER_SNAKE_CASE`
- **Private fields**: `_camelCase` or `camelCase`
- **Static**: `PascalCase`
- **Namespaces**: `PascalCase`
- **Files**: Match class name

### Examples

```csharp
// Namespaces
namespace Company.Project.Services

// Classes
public class CustomerAccount
{
    // implementation
}

// Interfaces
public interface IPaymentService
{
    bool ProcessPayment(decimal amount);
}

// Methods
public class OrderProcessor
{
    public void ProcessOrder(Order order)
    {
        // implementation
    }
    
    public decimal CalculateTotal(IEnumerable<OrderItem> items)
    {
        // implementation
    }
}

// Properties
public class User
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public bool IsActive { get; set; }
    
    // Computed property
    public string FullName => $"{FirstName} {LastName}";
}

// Fields
public class ShoppingCart
{
    private readonly List<Item> _items;
    private decimal _totalAmount;
    
    public const int MaxItemCount = 100;
}

// Enums
public enum OrderStatus
{
    Pending,
    Processing,
    Shipped,
    Delivered,
    Cancelled
}
```

---

## Ruby

### General Rules
- **Classes**: `PascalCase`
- **Modules**: `PascalCase`
- **Methods**: `snake_case`
- **Variables**: `snake_case`
- **Constants**: `UPPER_SNAKE_CASE`
- **Files**: `snake_case.rb`
- **Boolean methods**: End with `?`
- **Destructive methods**: End with `!`

### Examples

```ruby
# Classes
class CustomerAccount
end

class OrderProcessor
end

# Modules
module PaymentGateway
end

# Methods
def calculate_total(items)
  items.sum(&:price)
end

def fetch_user_data(user_id)
  # implementation
end

# Boolean methods (end with ?)
def valid?
  errors.empty?
end

def active?
  status == 'active'
end

# Destructive methods (end with !)
def normalize!
  self.name = name.strip.downcase
end

# Variables
order_count = 5
customer_name = "John Doe"
is_valid = true

# Constants
MAX_RETRY_COUNT = 3
DEFAULT_TIMEOUT = 30

# Instance variables
class User
  def initialize(name)
    @name = name
    @created_at = Time.now
  end
end
```

---

## Go

### General Rules
- **Packages**: `lowercase` (single word, no underscore)
- **Exported**: `PascalCase` (visible outside package)
- **Unexported**: `camelCase` (internal only)
- **Constants**: `PascalCase` or `camelCase`
- **Interfaces**: `PascalCase` (often end in -er)
- **Files**: `snake_case.go`
- **Acronyms**: All caps (URL, HTTP, ID)

### Examples

```go
// Package
package user

// Types (exported)
type Customer struct {
    ID        string
    Name      string
    Email     string
}

type PaymentProcessor interface {
    Process(amount float64) error
}

// Functions (exported)
func CalculateTotal(items []Item) float64 {
    // implementation
}

func FetchUserData(userID string) (*User, error) {
    // implementation
}

// Functions (unexported)
func validateInput(input string) error {
    // implementation
}

// Constants
const MaxRetryCount = 3
const defaultTimeout = 30

// Variables
var userCount = 0
var ErrNotFound = errors.New("user not found")

// Short variable declarations (inside functions)
name := "John"
count := 5
```

---

## Type Prefixes to Avoid

### Hungarian Notation (Most Languages)

```
❌ BAD:
- strName, sName (string)
- nCount, iCount (integer)
- bIsValid (boolean)
- arrItems (array)
- dictConfig (dictionary)
- objUser (object)

✅ GOOD:
- name, fullName (string - clear from context)
- count, totalCount (number - clear from context)
- isValid, hasPermission (boolean - use is/has/should/can)
- items, userList (array/list - plural or list suffix)
- config, settings (map/dict - clear from context)
- user, customer (object - clear from context)
```

---

## Boolean Naming

### Prefixes

```
✅ GOOD:
- isActive, isValid
- hasPermission, hasAccess
- shouldRetry, shouldUpdate
- canEdit, canDelete
- needsUpdate, needsValidation

❌ BAD:
- active (could be method or property)
- valid (ambiguous)
- permission (sounds like object, not boolean)
```

---

## Naming by Concept

### CRUD Operations

```
✅ GOOD:
- createUser, addUser
- getUser, findUser, fetchUser
- updateUser, editUser
- deleteUser, removeUser

❌ BAD:
- userCreate (verb should be first)
- makeUser (unclear)
- doUser (too vague)
- handleUser (too vague)
```

### Transformations

```
✅ GOOD:
- parseDate, parseJSON
- formatCurrency, formatDate
- convertToString, convertToJSON
- buildQuery, buildURL
- generateID, generateReport

❌ BAD:
- doParse (redundant)
- makeFormat (awkward)
- process (too vague)
- handle (too vague)
```

---

## Quick Reference: Language Comparison

| Language | Classes | Functions/Methods | Variables | Constants |
|----------|---------|-------------------|-----------|-----------|
| Python | PascalCase | snake_case | snake_case | UPPER_SNAKE |
| JavaScript | PascalCase | camelCase | camelCase | UPPER_SNAKE |
| TypeScript | PascalCase | camelCase | camelCase | UPPER_SNAKE |
| Java | PascalCase | camelCase | camelCase | UPPER_SNAKE |
| C# | PascalCase | PascalCase | camelCase | PascalCase |
| Ruby | PascalCase | snake_case | snake_case | UPPER_SNAKE |
| Go | PascalCase | PascalCase | camelCase | PascalCase |

---

## Summary: Universal Principles

1. **Reveal intent**: Names should explain what something does/is
2. **Be specific**: Avoid vague words like data, info, process, handle
3. **Be pronounceable**: Can you say it in conversation?
4. **Be searchable**: Avoid single letters (except in small scopes)
5. **Follow conventions**: Use language/community standards
6. **Be consistent**: Use same naming across codebase
7. **Classes = nouns**: Customer, Account, OrderProcessor
8. **Methods = verbs**: fetchUser, calculateTotal, isValid
9. **Booleans = questions**: isActive, hasPermission, shouldRetry
