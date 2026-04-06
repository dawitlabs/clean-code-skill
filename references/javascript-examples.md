# JavaScript Refactoring Examples

Additional JavaScript/TypeScript examples for the refactoring patterns.

Use alongside `refactoring-patterns.md` which contains Python examples of the same patterns.

---

## Pattern 1: Extract Function

**Before:**
```javascript
// Large function doing multiple things
function processOrder(orderData) {
    // Validate
    if (!orderData.items) {
        throw new Error("No items in order");
    }
    if (orderData.total <= 0) {
        throw new Error("Invalid total");
    }
    
    // Calculate
    const subtotal = orderData.items.reduce((sum, item) => 
        sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;
    
    // Save
    await db.query(
        "INSERT INTO orders (total, tax) VALUES ($1, $2)", 
        [total, tax]
    );
    
    // Notify
    sendEmail(orderData.customer.email, `Order for $${total} confirmed`);
    
    return orderData;
}
```

**After:**
```javascript
// Each function does one thing
async function processOrder(orderData) {
    validateOrder(orderData);
    const { total, tax } = calculateOrderTotals(orderData.items);
    await saveOrderToDatabase(orderData, total, tax);
    notifyCustomerOfOrder(orderData.customer, total);
    
    return orderData;
}

function validateOrder(orderData) {
    if (!orderData.items) {
        throw new Error("No items in order");
    }
    if (orderData.total <= 0) {
        throw new Error("Invalid total");
    }
}

function calculateOrderTotals(items) {
    const subtotal = items.reduce((sum, item) => 
        sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;
    return { total, tax };
}

async function saveOrderToDatabase(orderData, total, tax) {
    await db.query(
        "INSERT INTO orders (total, tax) VALUES ($1, $2)", 
        [total, tax]
    );
}

function notifyCustomerOfOrder(customer, total) {
    sendEmail(customer.email, `Order for $${total} confirmed`);
}
```

---

## Pattern 2: Replace Flag Argument with Multiple Functions

**Before:**
```javascript
// Flag argument creates confusion
function renderReport(data, isSummary) {
    if (isSummary) {
        return `Summary: ${data.length} items`;
    } else {
        return `Report with ${data.length} detailed items: ${JSON.stringify(data)}`;
    }
}

// Usage is unclear
renderReport(data, true);  // What does true mean?
renderReport(data, false);  // What does false mean?
```

**After:**
```javascript
// Separate functions with clear names
function renderSummaryReport(data) {
    return `Summary: ${data.length} items`;
}

function renderDetailedReport(data) {
    return `Report with ${data.length} detailed items: ${JSON.stringify(data)}`;
}

// Usage is clear
renderSummaryReport(data);  // Clear intent
renderDetailedReport(data);  // Clear intent
```

---

## Pattern 3: Introduce Parameter Object

**Before:**
```javascript
// Too many arguments
function createUser(firstName, lastName, email, phone, 
                   addressLine1, addressLine2, city, state, zipCode) {
    // implementation
}

// Usage is unwieldy
createUser(
    "John", "Doe", "john@example.com", "555-1234",
    "123 Main St", "Apt 4B", "New York", "NY", "10001"
);
```

**After:**
```javascript
// Parameter objects group related data
class Address {
    constructor(line1, line2, city, state, zipCode) {
        this.line1 = line1;
        this.line2 = line2;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
    }
}

class UserInfo {
    constructor(firstName, lastName, email, phone, address) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.address = address;
    }
}

function createUser(userInfo) {
    // implementation
}

// Usage is clear
const address = new Address(
    "123 Main St",
    "Apt 4B",
    "New York",
    "NY",
    "10001"
);

const user = new UserInfo(
    "John",
    "Doe",
    "john@example.com",
    "555-1234",
    address
);

createUser(user);
```

---

## Pattern 4: Replace Magic Numbers with Named Constants

**Before:**
```javascript
// Magic numbers
function calculateShipping(weight) {
    if (weight < 1) {
        return 5.00;
    } else if (weight < 5) {
        return 10.00;
    } else {
        return weight * 2.00;
    }
}

function validatePassword(password) {
    return password.length >= 8;
}

function isAdult(age) {
    return age >= 18;
}
```

**After:**
```javascript
// Named constants explain intent
const SHIPPING_TIER_1_MAX_WEIGHT = 1;  // lbs
const SHIPPING_TIER_1_COST = 5.00;
const SHIPPING_TIER_2_MAX_WEIGHT = 5;  // lbs
const SHIPPING_TIER_2_COST = 10.00;
const SHIPPING_TIER_3_COST_PER_LB = 2.00;

const MINIMUM_PASSWORD_LENGTH = 8;
const ADULT_AGE_THRESHOLD = 18;

function calculateShipping(weight) {
    if (weight < SHIPPING_TIER_1_MAX_WEIGHT) {
        return SHIPPING_TIER_1_COST;
    } else if (weight < SHIPPING_TIER_2_MAX_WEIGHT) {
        return SHIPPING_TIER_2_COST;
    } else {
        return weight * SHIPPING_TIER_3_COST_PER_LB;
    }
}

function validatePassword(password) {
    return password.length >= MINIMUM_PASSWORD_LENGTH;
}

function isAdult(age) {
    return age >= ADULT_AGE_THRESHOLD;
}
```

---

## Pattern 5: Introduce Explanatory Variable

**Before:**
```javascript
// Complex condition
function isEligibleForDiscount(customer, order) {
    if (customer.type === "premium" && 
        order.total > 100 && 
        order.items &&
        !order.hasDiscount) {
        return true;
    }
    return false;
}

// Complex calculation
function calculatePayment(user) {
    return (user.hours * user.rate * 
            (1 - user.taxRate) + 
            user.bonus - 
            user.deductions);
}
```

**After:**
```javascript
// Explanatory variables
function isEligibleForDiscount(customer, order) {
    const isPremiumCustomer = customer.type === "premium";
    const meetsMinimumOrder = order.total > 100;
    const hasItems = Boolean(order.items.length);
    const hasNoExistingDiscount = !order.hasDiscount;
    
    return isPremiumCustomer && 
           meetsMinimumOrder && 
           hasItems && 
           hasNoExistingDiscount;
}

function calculatePayment(user) {
    const grossPay = user.hours * user.rate;
    const taxAmount = grossPay * user.taxRate;
    const netPay = grossPay - taxAmount;
    
    return netPay + user.bonus - user.deductions;
}
```

---

## Pattern 6: Replace Conditional with Polymorphism

**Before:**
```javascript
// Type-based conditionals
class Employee {
    constructor(type, salary) {
        this.type = type;
        this.salary = salary;
    }
    
    calculateBonus() {
        if (this.type === "manager") {
            return this.salary * 0.20;
        } else if (this.type === "engineer") {
            return this.salary * 0.10;
        } else if (this.type === "sales") {
            return this.salary * 0.15;
        } else {
            return 0;
        }
    }
}

// Adding new types requires modifying this class
```

**After:**
```javascript
// Polymorphism replaces conditionals
class Employee {
    constructor(salary) {
        this.salary = salary;
    }
    
    calculateBonus() {
        throw new Error("Subclass must implement calculateBonus");
    }
}

class Manager extends Employee {
    calculateBonus() {
        return this.salary * 0.20;
    }
}

class Engineer extends Employee {
    calculateBonus() {
        return this.salary * 0.10;
    }
}

class SalesPerson extends Employee {
    calculateBonus() {
        return this.salary * 0.15;
    }
}

// Usage
const employees = [
    new Manager(100000), 
    new Engineer(80000), 
    new SalesPerson(90000)
];

employees.forEach(employee => {
    console.log(`Bonus: ${employee.calculateBonus()}`);
});

// Adding new types: just create new class
// No modification to existing code (Open/Closed Principle)
```

---

## Pattern 7: Move Method (Fix Feature Envy)

**Before:**
```javascript
// Feature Envy - AccountManager envies Account
class Account {
    constructor(balance) {
        this.balance = balance;
    }
}

class AccountManager {
    isOverdrawn(account) {
        // Uses account data, should be in Account
        return account.balance < 0;
    }
    
    calculateInterest(account) {
        // Uses account data, should be in Account
        if (account.balance > 10000) {
            return account.balance * 0.05;
        } else {
            return account.balance * 0.02;
        }
    }
}

// Usage
const manager = new AccountManager();
const account = new Account(5000);
const isOverdrawn = manager.isOverdrawn(account);  // Awkward
```

**After:**
```javascript
// Method moved to proper class
class Account {
    constructor(balance) {
        this.balance = balance;
    }
    
    isOverdrawn() {
        return this.balance < 0;
    }
    
    calculateInterest() {
        if (this.balance > 10000) {
            return this.balance * 0.05;
        } else {
            return this.balance * 0.02;
        }
    }
}

class AccountManager {
    processAccount(account) {
        // Now just orchestrates
        if (account.isOverdrawn()) {
            console.log("Account is overdrawn!");
        }
        const interest = account.calculateInterest();
        console.log(`Interest: ${interest}`);
    }
}

// Usage
const account = new Account(5000);
const overdrawn = account.isOverdrawn();  // Natural
const interest = account.calculateInterest();  // Natural
```

---

## Pattern 8: Extract Class (Improve Cohesion)

**Before:**
```javascript
// God class doing too much
class OrderProcessor {
    constructor() {
        this.orders = [];
        this.customers = [];
        this.inventory = {};
        this.paymentGateway = null;
    }
    
    createOrder(customerId, items) {
        // Creates order
    }
    
    validateCustomer(customerId) {
        // Validates customer
    }
    
    checkInventory(items) {
        // Checks inventory
    }
    
    processPayment(orderId, amount) {
        // Processes payment
    }
    
    sendConfirmation(orderId) {
        // Sends email
    }
}
```

**After:**
```javascript
// Separate classes with single responsibilities
class OrderService {
    constructor(repository, inventoryService, paymentService, emailService) {
        this.repository = repository;
        this.inventoryService = inventoryService;
        this.paymentService = paymentService;
        this.emailService = emailService;
    }
    
    async createOrder(customerId, items) {
        if (!await this.inventoryService.isAvailable(items)) {
            throw new Error("Items not available");
        }
        
        const order = new Order(customerId, items);
        await this.repository.save(order);
        
        await this.paymentService.processPayment(order.id, order.total);
        await this.emailService.sendConfirmation(order);
        
        return order;
    }
}

class CustomerService {
    constructor(repository) {
        this.repository = repository;
    }
    
    async validateCustomer(customerId) {
        return await this.repository.exists(customerId);
    }
}

class InventoryService {
    constructor(repository) {
        this.repository = repository;
    }
    
    async isAvailable(items) {
        for (const item of items) {
            const hasStock = await this.repository.hasStock(item);
            if (!hasStock) return false;
        }
        return true;
    }
}

class PaymentService {
    constructor(gateway) {
        this.gateway = gateway;
    }
    
    async processPayment(orderId, amount) {
        return await this.gateway.charge(orderId, amount);
    }
}

class EmailService {
    constructor(client) {
        this.client = client;
    }
    
    async sendConfirmation(order) {
        await this.client.send(
            order.customer.email, 
            `Order ${order.id} confirmed`
        );
    }
}
```

---

## Pattern 9: Encapsulate Conditional

**Before:**
```javascript
// Complex conditions
function canPlaceOrder(user, cart, inventory) {
    if (user.isActive && 
        !user.isBanned && 
        cart.total > 0 &&
        cart.total <= user.creditLimit &&
        cart.items.every(item => 
            (inventory[item.id] || 0) >= item.quantity)) {
        return true;
    }
    return false;
}
```

**After:**
```javascript
// Conditions encapsulated in well-named methods
class OrderValidator {
    constructor(user, cart, inventory) {
        this.user = user;
        this.cart = cart;
        this.inventory = inventory;
    }
    
    canPlaceOrder() {
        return this.userCanOrder() && 
               this.cartIsValid() && 
               this.inventoryIsAvailable();
    }
    
    userCanOrder() {
        return this.user.isActive && !this.user.isBanned;
    }
    
    cartIsValid() {
        return this.cart.total > 0 && 
               this.cart.total <= this.user.creditLimit;
    }
    
    inventoryIsAvailable() {
        return this.cart.items.every(item => 
            (this.inventory[item.id] || 0) >= item.quantity
        );
    }
}

// Usage
const validator = new OrderValidator(user, cart, inventory);
const canOrder = validator.canPlaceOrder();  // Clear intent
```

---

## Pattern 10: Replace Error Code with Exception

**Before:**
```javascript
// Error codes
function withdraw(account, amount) {
    if (amount <= 0) {
        return -1;  // Invalid amount
    }
    if (account.balance < amount) {
        return -2;  // Insufficient funds
    }
    if (account.isFrozen) {
        return -3;  // Account frozen
    }
    
    account.balance -= amount;
    return 0;  // Success
}

// Usage is messy
const result = withdraw(account, 100);
if (result === -1) {
    console.log("Invalid amount");
} else if (result === -2) {
    console.log("Insufficient funds");
} else if (result === -3) {
    console.log("Account frozen");
} else if (result === 0) {
    console.log("Success");
}
```

**After:**
```javascript
// Exceptions
class WithdrawalError extends Error {}

class InvalidAmountError extends WithdrawalError {
    constructor(amount) {
        super(`Amount must be positive, got ${amount}`);
    }
}

class InsufficientFundsError extends WithdrawalError {
    constructor(balance, amount) {
        super(`Balance ${balance} < Amount ${amount}`);
    }
}

class AccountFrozenError extends WithdrawalError {
    constructor() {
        super("Account is frozen");
    }
}

function withdraw(account, amount) {
    if (amount <= 0) {
        throw new InvalidAmountError(amount);
    }
    if (account.isFrozen) {
        throw new AccountFrozenError();
    }
    if (account.balance < amount) {
        throw new InsufficientFundsError(account.balance, amount);
    }
    
    account.balance -= amount;
}

// Usage is clear
try {
    withdraw(account, 100);
    console.log("Success");
} catch (error) {
    if (error instanceof InvalidAmountError) {
        console.log(`Invalid: ${error.message}`);
    } else if (error instanceof InsufficientFundsError) {
        console.log(`Insufficient funds: ${error.message}`);
    } else if (error instanceof AccountFrozenError) {
        console.log(`Account frozen: ${error.message}`);
    }
}
```

---

## Additional JavaScript-Specific Patterns

### Pattern: Replace Callbacks with Promises/Async-Await

**Before:**
```javascript
// Callback hell
getData(function(data) {
    processData(data, function(processed) {
        saveData(processed, function(result) {
            console.log(result);
        });
    });
});
```

**After:**
```javascript
// Async/await
const data = await getData();
const processed = await processData(data);
const result = await saveData(processed);
console.log(result);
```

### Pattern: Use Destructuring for Clarity

**Before:**
```javascript
function processUser(user) {
    const name = user.name;
    const email = user.email;
    const age = user.age;
}
```

**After:**
```javascript
function processUser(user) {
    const { name, email, age } = user;
}

// Or in function parameter
function processUser({ name, email, age }) {
    // use name, email, age directly
}
```

### Pattern: Use Array Methods Instead of Loops

**Before:**
```javascript
const activeUsers = [];
for (let i = 0; i < users.length; i++) {
    if (users[i].isActive) {
        activeUsers.push(users[i].name);
    }
}
```

**After:**
```javascript
const activeUsers = users
    .filter(user => user.isActive)
    .map(user => user.name);
```

---

## Language Comparison: Quick Reference

| Pattern | Python | JavaScript |
|---------|--------|------------|
| Extract Function | `def process_order():` | `function processOrder() {}` |
| Replace Flag | Split into functions | Split into functions |
| Parameter Object | Class with `@dataclass` | Class with `constructor` |
| Magic Numbers | `CONSTANT_NAME = value` | `const CONSTANT_NAME = value` |
| Explanatory Var | `is_valid = condition` | `const isValid = condition` |
| Polymorphism | Inheritance + `@abstractmethod` | Class + `extends` |
| Move Method | Move to proper class | Move to proper class |
| Extract Class | Split into classes | Split into classes |
| Encapsulate | Class with methods | Class with methods |
| Error Codes | Raise exceptions | Throw exceptions |

---

## Summary

JavaScript examples follow the same Clean Code principles but with language-specific syntax:

1. **Use `const`/`let`**, avoid `var`
2. **Use arrow functions** for callbacks
3. **Use destructuring** for cleaner code
4. **Use async/await** over callbacks
5. **Use array methods** (map, filter, reduce) over loops
6. **Use classes** for encapsulation
7. **Use exceptions** for error handling

See `refactoring-patterns.md` for Python examples of the same patterns.
