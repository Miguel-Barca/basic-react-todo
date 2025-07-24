# 🧪 Test Strategy: React Todo List Application

A comprehensive testing approach for our full-stack todo app.

## What We're Testing and Why

### User Authentication 🔐

- **Valid Login**: Users can successfully authenticate with correct credentials
- **Invalid Login**: Proper error handling for incorrect credentials
- **User Isolation**: Different users maintain separate, isolated todo lists
- **Session Management**: Authentication tokens work correctly across requests
- **Logout Functionality**: Users can properly log out and invalidate sessions

### Todo CRUD Operations ✅

- **Create**: Users can add new todo items
- **Read**: Users can view their todo lists
- **Update**: Users can edit existing todo items
- **Delete**: Users can remove todo items from their lists

### Data Persistence 💾

- **Session Persistence**: Todo data persists across logout/login cycles
- **User Data Isolation**: Each user's data remains separate and private

### The User Experience 🎨

- **Empty State**: Proper display when no todos exist
- **Interactive Elements**: Buttons, forms, and inputs work correctly
- **Error messages** - Helpful error messages

### API Endpoints 🔌

- **Authentication Endpoints**: `POST /login`
- **Todo Endpoints**: `GET /todos`, `POST /todos`, `PUT /todos/:id`, `DELETE /todos/:id`
- **Authorization**: All protected endpoints require valid authentication tokens
- **Error Handling**: Proper HTTP status codes and error responses

## Test Coverage Breakdown

### Frontend Testing with Playwright 🎭

| What We Test     | Status     |
| ---------------- | ---------- |
| Login & Auth     | ✅ Covered |
| Todo Management  | ✅ Covered |
| UI Components    | ✅ Covered |
| Data Persistence | ✅ Covered |
| Empty States     | ✅ Covered |
| Multi-user Setup | ✅ Covered |

### Backend Testing with Postman 📮

| API Endpoint   | Status     |
| -------------- | ---------- |
| Login System   | ✅ Covered |
| Todo APIs      | ✅ Covered |
| Error Handling | ✅ Covered |
| Token Security | ✅ Covered |

## Why These Tools?

### Playwright for UI Testing 🎪

- **Actually works across browsers** - Chrome, Firefox, Safari all supported
- **Great debugging tools** - See exactly what went wrong and when
- **Parallel Execution** - Fast test execution with parallel running
- **Auto-waiting** - Reduced flaky tests from timing issues
- **Documentation** - Strong official documentation and community make it easier to work with and more maintainable

### Postman for API Testing 📡

- **API-First Testing**: Purpose-built for REST API testing
- **Environment Variables**: Dynamic token management and reusable configurations
- **Automated Testing**: Built-in test scripts with assertions

## Getting Started

### The Quick Setup 🚀

**1. Grab the code:**

```bash
git clone https://github.com/Miguel-Barca/basic-react-todo-list.git
cd basic-react-todo-list
```

**2. Install Dependencies:**

```bash
npm install
cd server && npm install
cd ../client && npm install
```

**3. Install Playwright Browsers (for testing):**

```bash
npx playwright install
```

**4. Start the Development Servers:**

Backend Server first (Terminal 1):

```bash
cd server
npm start
```

_Runs on http://localhost:4000_

Frontend React Client next (Terminal 2):

```bash
cd client
npm start
```

_Runs on http://localhost:3000_

### Running the Tests

#### UI Tests (Playwright) 🎮

**Run everything:**

```bash
npm run test:ui
```

**Watch tests run (recommended for debugging):**

```bash
npm run test:ui:headed
```

**Test specific features:**

```bash
# Just the login stuff
npx playwright test --project=login-ui

# Just the todo functionality
npx playwright test --project=todo-ui
```

**See html built in report:**

```bash
npx playwright show-report
```

#### API Tests (Postman / Newman) 🔧

**Using Postman app:**

1. Import `api-testing/postman_collection.json`
2. Set these environment variables:
   - `baseUrl`: `http://localhost:4000`
   - `testUsername`: `test`
   - `testPassword`: `test`
3. Run the "Login" request first
4. Run the rest (tokens handled automatically)

**Command line style:**

```bash
npm install -g newman
newman run api-testing/postman_collection.json
```

## The Fine Print

**Assumptions and limitations:**

- Tests are tied to localhost setup
- Test data is hardcoded

---

_This testing strategy evolves with the app. Found a bug? Great! Let's write a test for it._
