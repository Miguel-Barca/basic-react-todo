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

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)
- **Git** (for version control)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Miguel-Barca/basic-react-todo.git
cd basic-react-todo
```

### 2. Set Up Environment Variables

**For the Server:**

```bash
cd server
cp .env.example .env
```

Edit the `.env` file to configure your credentials:

```bash
# Server Configuration
PORT=4000
NODE_ENV=development

# CORS Configuration
CLIENT_URL=http://localhost:3000

# Authentication Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Default User Credentials (for demo purposes)
DEFAULT_USERNAME=test
DEFAULT_PASSWORD=test

# Additional Users (comma-separated format: username:password)
# Example: ADDITIONAL_USERS=admin:admin123,user:user456
ADDITIONAL_USERS=
```

### 3. Install Dependencies

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
react-todo-app-with-login/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── App.js         # Main app component with auth logic
│   │   ├── Login.js       # Login component
│   │   ├── index.js       # React entry point
│   │   └── ...
│   └── package.json
├── server/                # Node.js backend
│   ├── .env               # Environment variables (not in repo)
│   ├── .env.example       # Environment variables template
│   ├── server.js          # Express server with API endpoints
│   └── package.json
├── .gitignore             # Git ignore rules
└── README.md
```

## 🔌 API Endpoints

### Authentication

- `POST /login` - User login
  ```json
  {
    "username": "test",
    "password": "test"
  }
  ```

### Todos

- `GET /todos` - Get all todos
- `POST /todos` - Create a new todo
- `PUT /todos/:id` - Update a todo
- `DELETE /todos/:id` - Delete a todo

## 🎨 UI Components

### Login Screen

- Modern gradient background
- Centered login form with validation
- Loading states and error handling
- Demo credentials display
- Real-time input trimming

### Todo Dashboard

- Clean, card-based design
- Header with logout functionality and todo counter
- Add todo input with Enter key support
- Inline editing with save/cancel options
- Delete functionality with confirmation
- Todo list with empty state handling

## 🛠️ Development

### Available Scripts

**Client (React):**

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests

**Server (Node.js):**

- `npm start` - Start the Express server

### Customization

#### Adding New Users

You can add users in two ways:

1. **Environment Variables** (recommended):

   ```bash
   ADDITIONAL_USERS=newuser:newpassword,admin:admin123
   ```

2. **Direct server modification** (for development):
   Edit `server/server.js` and modify the `initializeUsers` function.

#### Styling

Modify the `styles` objects in `Login.js` and `App.js` to customize the appearance.

## 🔒 Security Features

- **Input validation** with whitespace trimming
- **Environment variable** management for sensitive data
- **CORS configuration** for secure cross-origin requests
- **Input sanitization** to prevent common attacks
- **Visual feedback** for user actions

## 🔒 Security Notes

- This is a demo application with basic authentication
- Passwords are stored in plain text (not recommended for production)
- No JWT validation on protected routes
- For production use, implement:
  - Proper password hashing (bcrypt)
  - Real JWT token validation
  - Database storage for users
  - Rate limiting
  - HTTPS enforcement

## 🚀 Production Deployment

### Environment Setup

1. **Set secure environment variables:**

   ```bash
   NODE_ENV=production
   JWT_SECRET=your-very-secure-secret-key
   CLIENT_URL=https://your-frontend-domain.com
   ```

2. **Build the client:**

   ```bash
   cd client
   npm run build
   ```

3. **Set up proper database** for user management

4. **Implement password hashing** and JWT validation

### Environment Variables for Production

Set up proper environment variables for:

- Database connection strings
- JWT secrets (use strong, random keys)
- API base URLs
- CORS origins

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Miguel Barca**

- GitHub: [@Miguel-Barca](https://github.com/Miguel-Barca)

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js for the simple and flexible server framework
- The open-source community for inspiration and tools

---

**⭐ Star this repository if you found it helpful!**
