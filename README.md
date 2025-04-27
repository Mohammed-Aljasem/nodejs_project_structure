# 🚀 Node.js + Express + MongoDB Starter Project

This project is a basic setup for a Node.js API using **Express** and **MongoDB** with **Mongoose**.

---

## 📦 Requirements

- Node.js (v16 or later recommended)
- MongoDB (local installation or MongoDB Atlas)
- npm (comes with Node.js)

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Mohammed-Aljasem/nodejs_project_structure.git
cd nodejs_project_structure
```

### 2. Install Dependencies

```bash
npm install
```

Otherwise, the app uses default hardcoded values.

### 4. Start MongoDB (if using local MongoDB)

If installed via Homebrew:

```bash
brew services start mongodb/brew/mongodb-community
```

Or manually:

```bash
mongod
```

### 5. Run the Server

```bash
npm run dev
```

Server will start at:

```
http://localhost:3000
```

---

## 🧹 Project Structure

```
/schemas
  UserSchema.js         # Mongoose schemas for users

/models
  UserModel.js         # Mongoose model for users

/routes
  userRoutes.js        # API routes for users

index.js          # Main server file (entry point)
package.json      # Node.js configuration
```

---

## 🔪 API Endpoints

| Method  | URL                 | Description               |
|---------|---------------------|----------------------------|
| GET     | `/users`            | Get all users              |
| GET     | `/users/:id`        | Get a single user by ID     |
| POST    | `/users/create`     | Create a new user          |
| PUT     | `/users/update/:id` | Update user by ID          |
| DELETE  | `/users/delete/:id` | Delete user by ID          |

### Example Request (Create User)

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Joy","email":"joy@example.com"}'
```

---

## 🛉 Scripts

| Command        | Purpose                  |
|----------------|---------------------------|
| `npm run dev`  | Run server with nodemon    |
| `npm start`    | Run server normally        |

---

## 📚 Useful Links

- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Manual](https://www.mongodb.com/docs/manual/)

---

## ❤️ Author

Built with love by **Mohammed Aljasem**  
_Always learning, always building._

---

# ✨ Future Enhancements

- Add environment variables using `.env`
- Add authentication (JWT)
- Add soft deletes
- Add pagination and filtering
- Deploy to cloud platforms
