# React Todo App with Login

A modern, full-stack todo application built with React and Node.js featuring user authentication and a beautiful, responsive UI.

![Todo App Preview](https://img.shields.io/badge/React-18+-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## ✨ Features

- 🔐 **User Authentication** - Secure login system with session management
- 📝 **Todo Management** - Create, view, and manage your personal todos
- 🎨 **Modern UI** - Beautiful, responsive design with gradient backgrounds
- 💾 **Persistent Sessions** - Stay logged in across browser sessions
- 🚀 **Real-time Updates** - Instant todo creation and updates
- 📱 **Mobile Responsive** - Works seamlessly on all devices

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

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)
- **Git** (for version control)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Miguel-Barca/react-todo-app-with-login.git
cd react-todo-app-with-login
```

### 2. Install Dependencies

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

### 3. Start the Development Servers

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

### 4. Access the Application

Open your browser and navigate to `http://localhost:3000`

## 🔑 Demo Credentials

Use these credentials to test the login functionality:

- **Username:** `test`
- **Password:** `test`

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
│   ├── server.js          # Express server with API endpoints
│   └── package.json
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

### Todo Dashboard

- Clean, card-based design
- Header with logout functionality
- Add todo input with Enter key support
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

Edit `server/server.js` and modify the users array:

```javascript
let users = [
  { id: 1, username: 'test', password: 'test' },
  { id: 2, username: 'newuser', password: 'newpassword' },
];
```

#### Styling

Modify the `styles` objects in `Login.js` and `App.js` to customize the appearance.

## 🔒 Security Notes

- This is a demo application with basic authentication
- Passwords are stored in plain text (not recommended for production)
- No JWT validation on protected routes
- For production use, implement proper password hashing and JWT verification

## 🚀 Production Deployment

### Build the Client

```bash
cd client
npm run build
```

### Environment Variables

Set up proper environment variables for:

- Database connection strings
- JWT secrets
- API base URLs

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
