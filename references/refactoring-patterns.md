# Refactoring Patterns

Common refactoring techniques organized by code smell.

---

## Pattern 1: Extract Function

**Problem**: Code block doing multiple things, hard to understand.

**Before:**
```python
# Large function doing multiple things
def process_order(order_data):
    # Validate
    if not order_data.get('items'):
        raise ValueError("No items in order")
    if order_data.get('total') <= 0:
        raise ValueError("Invalid total")
    
    # Calculate
    subtotal = sum(item['price'] * item['quantity'] for item in order_data['items'])
    tax = subtotal * 0.08
    total = subtotal + tax
    
    # Save
    db.execute("INSERT INTO orders (total, tax) VALUES (?, ?)", (total, tax))
    
    # Notify
    customer_email = order_data['customer']['email']
    send_email(customer_email, f"Order for ${total} confirmed")
    
    return order_data
```

**After:**
```python
# Each function does one thing
def process_order(order_data):
    validate_order(order_data)
    total, tax = calculate_order_totals(order_data['items'])
    save_order_to_database(order_data, total, tax)
    notify_customer_of_order(order_data['customer'], total)
    
    return order_data

def validate_order(order_data):
    if not order_data.get('items'):
        raise ValueError("No items in order")
    if order_data.get('total') <= 0:
        raise ValueError("Invalid total")

def calculate_order_totals(items):
    subtotal = sum(item['price'] * item['quantity'] for item in items)
    tax = subtotal * 0.08
    total = subtotal + tax
    return total, tax

def save_order_to_database(order_data, total, tax):
    db.execute("INSERT INTO orders (total, tax) VALUES (?, ?)", (total, tax))

def notify_customer_of_order(customer, total):
    send_email(customer['email'], f"Order for ${total} confirmed")
```

**Benefits:**
- Each function does one thing
- Functions are named after what they do
- Easier to test (can test validation separately)
- Easier to understand (read like prose)

---

## Pattern 2: Replace Flag Argument with Multiple Functions

**Problem**: Boolean parameter indicates function does multiple things.

**Before:**
```python
# Flag argument creates confusion
def render_report(data, is_summary):
    if is_summary:
        # Summary logic
        return f"Summary: {len(data)} items"
    else:
        # Detailed logic
        return f"Report with {len(data)} detailed items: {data}"

# Usage is unclear
render_report(data, True)  # What does True mean?
render_report(data, False)  # What does False mean?
```

**After:**
```python
# Separate functions with clear names
def render_summary_report(data):
    return f"Summary: {len(data)} items"

def render_detailed_report(data):
    return f"Report with {len(data)} detailed items: {data}"

# Usage is clear
render_summary_report(data)  # Clear intent
render_detailed_report(data)  # Clear intent
```

**Benefits:**
- Each function does one thing
- Function names are self-documenting
- No guessing what boolean means
- Easier to find usages in codebase

---

## Pattern 3: Introduce Parameter Object

**Problem**: Function has too many arguments (3+).

**Before:**
```python
# Too many arguments
def create_user(
    first_name,
    last_name,
    email,
    phone,
    address_line_1,
    address_line_2,
    city,
    state,
    zip_code
):
    # implementation
    pass

# Usage is unwieldy
create_user(
    "John", "Doe", "john@example.com", "555-1234",
    "123 Main St", "Apt 4B", "New York", "NY", "10001"
)
```

**After:**
```python
# Parameter objects group related data
from dataclasses import dataclass

@dataclass
class Address:
    line_1: str
    line_2: str
    city: str
    state: str
    zip_code: str

@dataclass
class UserInfo:
    first_name: str
    last_name: str
    email: str
    phone: str
    address: Address

def create_user(user_info: UserInfo):
    # implementation
    pass

# Usage is clear
address = Address(
    line_1="123 Main St",
    line_2="Apt 4B",
    city="New York",
    state="NY",
    zip_code="10001"
)

user = UserInfo(
    first_name="John",
    last_name="Doe",
    email="john@example.com",
    phone="555-1234",
    address=address
)

create_user(user)
```

**Benefits:**
- Reduces argument count
- Groups related data
- Makes function signature clear
- Enables reuse of parameter objects

---

## Pattern 4: Replace Magic Numbers with Named Constants

**Problem**: Numbers in code without explanation.

**Before:**
```python
# Magic numbers
def calculate_shipping(weight):
    if weight < 1:
        return 5.00
    elif weight < 5:
        return 10.00
    else:
        return weight * 2.00

def validate_password(password):
    return len(password) >= 8

def is_adult(age):
    return age >= 18
```

**After:**
```python
# Named constants explain intent
SHIPPING_TIER_1_MAX_WEIGHT = 1  # lbs
SHIPPING_TIER_1_COST = 5.00
SHIPPING_TIER_2_MAX_WEIGHT = 5  # lbs
SHIPPING_TIER_2_COST = 10.00
SHIPPING_TIER_3_COST_PER_LB = 2.00

MINIMUM_PASSWORD_LENGTH = 8
ADULT_AGE_THRESHOLD = 18

def calculate_shipping(weight):
    if weight < SHIPPING_TIER_1_MAX_WEIGHT:
        return SHIPPING_TIER_1_COST
    elif weight < SHIPPING_TIER_2_MAX_WEIGHT:
        return SHIPPING_TIER_2_COST
    else:
        return weight * SHIPPING_TIER_3_COST_PER_LB

def validate_password(password):
    return len(password) >= MINIMUM_PASSWORD_LENGTH

def is_adult(age):
    return age >= ADULT_AGE_THRESHOLD
```

**Benefits:**
- Intent is clear
- Easy to change values
- Single source of truth
- Self-documenting code

---

## Pattern 5: Introduce Explanatory Variable

**Problem**: Complex expressions are hard to understand.

**Before:**
```python
# Complex condition
def is_eligible_for_discount(customer, order):
    if (customer['type'] == 'premium' and 
        order['total'] > 100 and 
        order['items'] and
        not order['has_discount']):
        return True
    return False

# Complex calculation
def calculate_payment(user):
    return (user['hours'] * user['rate'] * 
            (1 - user['tax_rate']) + 
            user['bonus'] - 
            user['deductions'])
```

**After:**
```python
# Explanatory variables
def is_eligible_for_discount(customer, order):
    is_premium_customer = customer['type'] == 'premium'
    meets_minimum_order = order['total'] > 100
    has_items = bool(order['items'])
    has_no_existing_discount = not order['has_discount']
    
    return (is_premium_customer and 
            meets_minimum_order and 
            has_items and 
            has_no_existing_discount)

def calculate_payment(user):
    gross_pay = user['hours'] * user['rate']
    tax_amount = gross_pay * user['tax_rate']
    net_pay = gross_pay - tax_amount
    
    return net_pay + user['bonus'] - user['deductions']
```

**Benefits:**
- Each step is named
- Easier to understand
- Easier to debug
- Self-documenting

---

## Pattern 6: Replace Conditional with Polymorphism

**Problem**: Switch/if-else statements based on type.

**Before:**
```python
# Type-based conditionals
class Employee:
    def __init__(self, type, salary):
        self.type = type
        self.salary = salary
    
    def calculate_bonus(self):
        if self.type == "manager":
            return self.salary * 0.20
        elif self.type == "engineer":
            return self.salary * 0.10
        elif self.type == "sales":
            return self.salary * 0.15
        else:
            return 0

# Adding new types requires modifying this class
```

**After:**
```python
# Polymorphism replaces conditionals
from abc import ABC, abstractmethod

class Employee(ABC):
    def __init__(self, salary):
        self.salary = salary
    
    @abstractmethod
    def calculate_bonus(self):
        pass

class Manager(Employee):
    def calculate_bonus(self):
        return self.salary * 0.20

class Engineer(Employee):
    def calculate_bonus(self):
        return self.salary * 0.10

class SalesPerson(Employee):
    def calculate_bonus(self):
        return self.salary * 0.15

# Usage
employees = [Manager(100000), Engineer(80000), SalesPerson(90000)]
for employee in employees:
    print(f"Bonus: {employee.calculate_bonus()}")

# Adding new types: just create new class
# No modification to existing code (Open/Closed Principle)
```

**Benefits:**
- Open/Closed Principle
- No modification needed for new types
- Each type handles its own logic
- Easier to extend

---

## Pattern 7: Move Method (Fix Feature Envy)

**Problem**: Method uses data from another class more than its own.

**Before:**
```python
# Feature Envy - AccountManager envies Account
class Account:
    def __init__(self, balance):
        self.balance = balance

class AccountManager:
    def is_overdrawn(self, account):
        # Uses account data, should be in Account
        return account.balance < 0
    
    def calculate_interest(self, account):
        # Uses account data, should be in Account
        if account.balance > 10000:
            return account.balance * 0.05
        else:
            return account.balance * 0.02

# Usage
manager = AccountManager()
account = Account(5000)
is_overdrawn = manager.is_overdrawn(account)  # Awkward
```

**After:**
```python
# Method moved to proper class
class Account:
    def __init__(self, balance):
        self.balance = balance
    
    def is_overdrawn(self):
        return self.balance < 0
    
    def calculate_interest(self):
        if self.balance > 10000:
            return self.balance * 0.05
        else:
            return self.balance * 0.02

class AccountManager:
    def process_account(self, account):
        # Now just orchestrates
        if account.is_overdrawn():
            print("Account is overdrawn!")
        interest = account.calculate_interest()
        print(f"Interest: {interest}")

# Usage
account = Account(5000)
overdrawn = account.is_overdrawn()  # Natural
interest = account.calculate_interest()  # Natural
```

**Benefits:**
- Methods are where they belong
- Better encapsulation
- More natural usage
- Easier to find and understand

---

## Pattern 8: Extract Class (Improve Cohesion)

**Problem**: Class has multiple responsibilities.

**Before:**
```python
# God class doing too much
class OrderProcessor:
    def __init__(self):
        self.orders = []
        self.customers = []
        self.inventory = {}
        self.payment_gateway = None
    
    def create_order(self, customer_id, items):
        # Creates order
        pass
    
    def validate_customer(self, customer_id):
        # Validates customer
        pass
    
    def check_inventory(self, items):
        # Checks inventory
        pass
    
    def process_payment(self, order_id, amount):
        # Processes payment
        pass
    
    def send_confirmation(self, order_id):
        # Sends email
        pass
```

**After:**
```python
# Separate classes with single responsibilities
class OrderService:
    def __init__(self, repository, inventory_service, payment_service, email_service):
        self.repository = repository
        self.inventory_service = inventory_service
        self.payment_service = payment_service
        self.email_service = email_service
    
    def create_order(self, customer_id, items):
        if not self.inventory_service.is_available(items):
            raise ValueError("Items not available")
        
        order = Order(customer_id, items)
        self.repository.save(order)
        
        self.payment_service.process_payment(order.id, order.total)
        self.email_service.send_confirmation(order)
        
        return order

class CustomerService:
    def __init__(self, repository):
        self.repository = repository
    
    def validate_customer(self, customer_id):
        return self.repository.exists(customer_id)

class InventoryService:
    def __init__(self, repository):
        self.repository = repository
    
    def is_available(self, items):
        return all(self.repository.has_stock(item) for item in items)

class PaymentService:
    def __init__(self, gateway):
        self.gateway = gateway
    
    def process_payment(self, order_id, amount):
        return self.gateway.charge(order_id, amount)

class EmailService:
    def __init__(self, client):
        self.client = client
    
    def send_confirmation(self, order):
        self.client.send(order.customer.email, f"Order {order.id} confirmed")
```

**Benefits:**
- Single Responsibility Principle
- Better cohesion
- Easier to test (each class independently)
- Easier to reuse
- Clearer dependencies

---

## Pattern 9: Encapsulate Conditional

**Problem**: Complex conditions are hard to read.

**Before:**
```python
# Complex conditions
def can_place_order(user, cart, inventory):
    if (user['is_active'] and 
        not user['is_banned'] and 
        cart['total'] > 0 and
        cart['total'] <= user['credit_limit'] and
        all(inventory.get(item['id'], 0) >= item['quantity'] 
            for item in cart['items'])):
        return True
    return False
```

**After:**
```python
# Conditions encapsulated in well-named methods
class OrderValidator:
    def __init__(self, user, cart, inventory):
        self.user = user
        self.cart = cart
        self.inventory = inventory
    
    def can_place_order(self):
        return (self.user_can_order() and 
                self.cart_is_valid() and 
                self.inventory_is_available())
    
    def user_can_order(self):
        return self.user['is_active'] and not self.user['is_banned']
    
    def cart_is_valid(self):
        return (0 < self.cart['total'] <= self.user['credit_limit'])
    
    def inventory_is_available(self):
        return all(
            self.inventory.get(item['id'], 0) >= item['quantity']
            for item in self.cart['items']
        )

# Usage
validator = OrderValidator(user, cart, inventory)
can_order = validator.can_place_order()  # Clear intent
```

**Benefits:**
- Each condition is named
- Can test conditions independently
- Reusable
- Self-documenting

---

## Pattern 10: Replace Error Code with Exception

**Problem**: Error codes obscure normal flow.

**Before:**
```python
# Error codes
def withdraw(account, amount):
    if amount <= 0:
        return -1  # Invalid amount
    if account.balance < amount:
        return -2  # Insufficient funds
    if account.is_frozen:
        return -3  # Account frozen
    
    account.balance -= amount
    return 0  # Success

# Usage is messy
result = withdraw(account, 100)
if result == -1:
    print("Invalid amount")
elif result == -2:
    print("Insufficient funds")
elif result == -3:
    print("Account frozen")
elif result == 0:
    print("Success")
```

**After:**
```python
# Exceptions
class WithdrawalError(Exception):
    pass

class InvalidAmountError(WithdrawalError):
    pass

class InsufficientFundsError(WithdrawalError):
    pass

class AccountFrozenError(WithdrawalError):
    pass

def withdraw(account, amount):
    if amount <= 0:
        raise InvalidAmountError(f"Amount must be positive, got {amount}")
    if account.is_frozen:
        raise AccountFrozenError("Account is frozen")
    if account.balance < amount:
        raise InsufficientFundsError(
            f"Balance {account.balance} < Amount {amount}"
        )
    
    account.balance -= amount

# Usage is clear
try:
    withdraw(account, 100)
    print("Success")
except InvalidAmountError as e:
    print(f"Invalid: {e}")
except InsufficientFundsError as e:
    print(f"Insufficient funds: {e}")
except AccountFrozenError as e:
    print(f"Account frozen: {e}")
```

**Benefits:**
- Normal flow is clear
- Errors are explicit
- Can't ignore errors (unlike return codes)
- Rich error information

---

## Summary: When to Apply Each Pattern

| Pattern | Code Smell | Use When |
|---------|-----------|----------|
| Extract Function | Large function | Function does multiple things |
| Replace Flag Argument | F3 Flag Arguments | Boolean indicates multiple behaviors |
| Introduce Parameter Object | F1 Too Many Arguments | 3+ related arguments |
| Replace Magic Numbers | G25 Magic Numbers | Literal numbers in code |
| Introduce Explanatory Variable | G19 | Complex expressions |
| Replace Conditional with Polymorphism | G23 | Type-based switch/if-else |
| Move Method | G14 Feature Envy | Method uses other class's data |
| Extract Class | Large class | Class has multiple responsibilities |
| Encapsulate Conditional | G28 | Complex boolean conditions |
| Replace Error Code with Exception | G28 | Error codes obscure flow |

---

## General Refactoring Tips

1. **Test First**: Have tests before refactoring
2. **Small Steps**: One pattern at a time
3. **Commit Often**: After each successful change
4. **Verify Behavior**: Ensure nothing broke
5. **Boy Scout Rule**: Leave it cleaner than you found it

### Refactoring Order

1. **Naming** (easiest, highest impact)
2. **Functions** (extract, reduce arguments)
3. **Comments** (remove redundant, convert to code)
4. **Classes** (extract, improve cohesion)
5. **Tests** (add missing coverage)

### When NOT to Refactor

- No tests in place (add tests first)
- Deadline pressure (do it after deadline)
- Code works and rarely changes
- Complexity doesn't justify benefit

### When TO Refactor

- Adding a feature (refactor first to make room)
- Fixing a bug (clean the code while debugging)
- Code review feedback
- Boy Scout rule (while touching the file)
