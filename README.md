# React Todo App with Login

A modern, full-stack todo application built with React and Node.js featuring user authentication and a beautiful, responsive UI.

![Todo App Preview](https://img.shields.io/badge/React-18+-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## ✨ Features

- 🔐 **User Authentication** - Secure login system with session management
- 📝 **Todo Management** - Create, edit, delete, and manage your personal todos
- 🎨 **Modern UI** - Beautiful, responsive design with gradient backgrounds
- 💾 **Persistent Sessions** - Stay logged in across browser sessions
- 🚀 **Real-time Updates** - Instant todo creation and updates
- 📱 **Mobile Responsive** - Works seamlessly on all devices
- 🔧 **Environment Configuration** - Secure credential management with dotenv
- ✨ **Input Validation** - Smart trimming and validation for better UX
- 🧪 **Comprehensive Testing** - Full E2E testing with Playwright + API testing with Postman/Newman

## 🏗️ Tech Stack

### Frontend

- **React 19** - Modern React with hooks
- **Vanilla CSS** - Custom styling with gradients and animations
- **Fetch API** - HTTP client for API communication

### Backend

- **Node.js** - Server runtime
- **Express.js** - Web application framework
- **CORS** - Cross-origin resource sharing
- **Body Parser** - Request body parsing middleware
- **dotenv** - Environment variable management

### Testing

- **Playwright** - End-to-end testing framework
- **TypeScript** - Type-safe test development
- **Postman** - API testing and documentation
- **Newman** - Command-line API testing runner

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)
- **Git** (for version control)
- **Playwright browsers** (for testing - will be installed automatically)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Miguel-Barca/basic-react-todo-list.git
cd basic-react-todo-list
```

### 2. Install Dependencies

Install root dependencies:

```bash
npm install
```

Install server dependencies:

```bash
cd server
npm install
```

Install client dependencies:

```bash
cd ../client
npm install
```

### 3. Install Playwright Browsers (for testing)

```bash
npx playwright install
```

### 4. Start the Development Servers

**Terminal 1 - Start the Backend Server:**

```bash
cd server
npm start
```

The server will run on `http://localhost:4000`

**Terminal 2 - Start the React Client:**

```bash
cd client
npm start
```

The client will run on `http://localhost:3000`

### 5. Access the Application

Open your browser and navigate to `http://localhost:3000`

## 🔑 Demo Credentials

Use these credentials to test the login functionality:

- **Username:** `test` (or whatever you set in DEFAULT_USERNAME)
- **Password:** `test` (or whatever you set in DEFAULT_PASSWORD)

## 🧪 Testing

This project includes comprehensive end-to-end tests using Playwright.

### Running Tests

**Interactive UI Mode (Recommended for development):**

```bash
npm run test:ui
```

**Headed Mode (See browser actions):**

```bash
npm run test:ui:headed
```

**Standard Playwright Commands:**

```bash
# Run all tests
npx playwright test

# Run tests in headed mode
npx playwright test --headed

# Run specific test file
npx playwright test tests/ui/todoListCreate.spec.ts

# Run tests with debugging
npx playwright test --debug
```

### Test Coverage

The test suite covers:

- ✅ **Authentication Flow** - Login with valid/invalid credentials
- ✅ **Todo Creation** - Single and multiple todo items
- ✅ **Todo Deletion** - Remove specific todo items
- ✅ **Todo Updates** - Edit existing todo items
- ✅ **Empty State** - Verify empty todo list display
- ✅ **UI Snapshots** - Visual regression testing

### Test Data Setup

Tests use a setup file (`tests/ui/setup/setupItems.ts`) that automatically creates test data:

- DELETE ITEM (for deletion tests)
- UPDATE ITEM (for update tests)
- CREATE ITEM (for various operations)

## 🔌 API Testing with Postman & Newman

This project includes a comprehensive Postman collection for testing all API endpoints with automated test scripts.

### 📋 Postman Collection Features

- **Complete API Coverage** - All authentication and CRUD endpoints
- **Automated Tests** - Built-in test scripts for each request
- **Environment Variables** - Dynamic values for flexible testing
- **Error Scenarios** - Tests for both success and failure cases
- **Performance Testing** - Response time validation
- **Data Flow** - Variables automatically pass data between requests

### 🚀 Quick Start with Postman

1. **Import the Collection:**

   - Open Postman
   - Click "Import" → "File" → Select `api-testing/postman_collection.json`
   - The collection will be imported with all tests and variables

2. **Set Up Environment (Optional):**

   ```json
   {
     "baseUrl": "http://localhost:4000",
     "testUsername": "test",
     "testPassword": "test"
   }
   ```

3. **Run the Collection:**
   - Select "Todo List API" collection
   - Click "Run collection"
   - All tests will execute with automated validation

### 🖥️ Newman (Command Line Testing)

Newman allows you to run Postman collections from the command line, perfect for CI/CD pipelines.

#### Install Newman

```bash
# Global installation
npm install -g newman

```

#### Running Tests

```bash
# Run the complete collection

newman run api-testing/postman_collection.json

```

### 📊 Test Coverage

The Postman collection includes tests for:

#### Authentication Tests

- ✅ **Valid Login** - Successful authentication with correct credentials
- ✅ **Invalid Login** - Error handling with wrong credentials
- ✅ **Token Handling** - Automatic token extraction and storage

#### Todo CRUD Tests

- ✅ **Get All Todos** - Retrieve todo list with structure validation
- ✅ **Create Todo** - Add new todos with data validation
- ✅ **Update Todo** - Modify existing todos with ID consistency checks
- ✅ **Delete Todo** - Remove todos with confirmation validation

#### Error Scenario Tests

- ✅ **Empty Text Validation** - Test todo creation with empty content
- ✅ **Non-existent ID Updates** - 404 error handling for invalid todo IDs
- ✅ **Non-existent ID Deletion** - Server behavior with missing todos

#### Performance & Quality Tests

- ✅ **Response Time** - All endpoints tested for performance (<1000ms)
- ✅ **Content-Type** - Proper JSON response headers
- ✅ **Status Codes** - Correct HTTP status codes for all scenarios
- ✅ **Data Structure** - Response format validation

The collection uses variables for flexibility:

| Variable            | Description                | Default Value           |
| ------------------- | -------------------------- | ----------------------- |
| `baseUrl`           | API server URL             | `http://localhost:4000` |
| `testUsername`      | Login username             | `test`                  |
| `testPassword`      | Login password             | `test`                  |
| `authToken`         | Authentication token       | Auto-generated          |
| `lastCreatedTodoId` | ID of last created todo    | Auto-generated          |
| `testTodoId`        | ID for update/delete tests | Auto-generated          |
| `sampleTodoText`    | Default todo text          | `Sample todo item`      |
| `updatedTodoText`   | Updated todo text          | `Updated todo item`     |

### 📈 CI/CD Integration

Add Newman to your continuous integration pipeline:

#### GitHub Actions Example

```yaml
name: API Tests
on: [push, pull_request]

jobs:
  api-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Start server
        run: |
          cd server && npm ci && npm start &
          sleep 5

      - name: Run API tests
        run: |
          npm install -g newman
          newman run api-testing/postman_collection.json \
            --reporters cli,html \
            --reporter-html-export api-test-results.html

      - name: Upload test results
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: api-test-results
          path: api-test-results.html
```

### 🛠️ Development Workflow

1. **Develop API endpoint** in `server/server.js`
2. **Test manually** with Postman UI
3. **Add/update tests** in the collection
4. **Validate with Newman** command line
5. **Run in CI/CD** pipeline for automated validation

## 🔧 Configuration

### Environment Variables

The server uses environment variables for configuration. Key variables include:

| Variable           | Description                                          | Default                 |
| ------------------ | ---------------------------------------------------- | ----------------------- |
| `PORT`             | Server port                                          | `4000`                  |
| `CLIENT_URL`       | Client URL for CORS                                  | `http://localhost:3000` |
| `JWT_SECRET`       | JWT signing secret                                   | Required for production |
| `DEFAULT_USERNAME` | Default user username                                | `test`                  |
| `DEFAULT_PASSWORD` | Default user password                                | `test`                  |
| `ADDITIONAL_USERS` | Additional users (format: `user1:pass1,user2:pass2`) | Empty                   |

### Adding Multiple Users

You can add multiple users by setting the `ADDITIONAL_USERS` environment variable:

```bash
ADDITIONAL_USERS=admin:admin123,user:user456,demo:demo789
```

## 📁 Project Structure

```
basic-react-todo-list/
├── client/                    # React frontend
│   ├── public/               # Static files
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── ...
│   ├── src/
│   │   ├── App.js            # Main app component with auth logic
│   │   ├── App.css           # App styling
│   │   ├── Login.js          # Login component
│   │   ├── index.js          # React entry point
│   │   ├── index.css         # Global styles
│   │   └── ...
│   ├── package.json
│   └── package-lock.json
├── server/                   # Node.js backend
│   ├── .env                  # Environment variables (not in repo)
│   ├── .env.example          # Environment variables template
│   ├── server.js             # Express server with API endpoints
│   ├── package.json
│   ├── package-lock.json
│   └── node_modules/
├── api-testing/              # API testing with Postman/Newman
│   └── postman_collection.json      # Comprehensive API test collection
├── tests/                    # Playwright E2E testing
│   └── ui/                   # UI tests
│       ├── login.spec.ts     # Login functionality tests
│       ├── todoListCreate.spec.ts    # Todo creation tests
│       ├── todoListDelete.spec.ts    # Todo deletion tests
│       ├── todoListUpdate.spec.ts    # Todo update tests
│       ├── todoEmptyList.spec.ts     # Empty state tests
│       ├── setup/
│       │   └── setupItems.ts         # Test data setup
│       └── helpers/
│           ├── loginScreenHelper.ts  # Login test helpers
│           ├── createItemHelper.ts   # Todo creation helpers
│           ├── deleteItemHelper.ts   # Todo deletion helpers
│           ├── updateItemHelper.ts   # Todo update helpers
│           ├── countItemHelper.ts    # Todo counting helpers
│           └── types.ts              # TypeScript type definitions
├── playwright-report/        # Test reports (generated)
├── test-results/            # Test artifacts (generated)
├── playwright.config.ts     # Playwright configuration
├── .github/                 # GitHub workflows
│   └── workflows/
│       └── playwright.yml   # Automated E2E testing
├── .gitignore              # Git ignore rules
├── package.json            # Root package configuration
├── package-lock.json       # Root dependencies lock
└── README.md
```

## 🔌 API Endpoints

### Authentication

- `POST /login` - User login
- `GET /todos` - Get all todos
- `POST /todos` - Create a new todo
- `PUT /todos/:id` - Update a todo
- `DELETE /todos/:id` - Delete a todo

## 🛠️ Development

### Available Scripts

**Root:**

- `npm run test:ui` - Run Playwright tests in interactive UI mode
- `npm run test:ui:headed` - Run Playwright tests in headed mode

**API Testing:**

- `newman run api-testing/postman_collection.json` - Run all API tests
- `newman run api-testing/postman_collection.json --reporters cli,html` - Run with HTML report
- `newman run api-testing/postman_collection.json --folder "Authentication"` - Run specific test group

### Customization

#### Adding New Users

You can add users in two ways:

1. **Environment Variables** (recommended):

   ```bash
   ADDITIONAL_USERS=newuser:newpassword,admin:admin123
   ```

2. **Direct server modification** (for development):
   Edit `server/server.js` and modify the `initializeUsers` function.

## 🔒 Security Notes

- This is a demo application with basic authentication
- Passwords are stored in plain text (not recommended for production)
- No JWT validation on protected routes

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Miguel Barca**

- GitHub: [@Miguel-Barca](https://github.com/Miguel-Barca)
