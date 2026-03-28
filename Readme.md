# ✂️ URL Shortener

A full-stack URL shortening service with user authentication, built with **Node.js + Express + MongoDB** on the backend and **React** on the frontend.

---

## 🚀 Features

- 🔗 Shorten any long URL instantly
- 👤 User registration & login with JWT authentication
- 🔒 Passwords hashed with bcrypt
- 🍪 Auth tokens stored in HTTP-only cookies
- 🗄️ MongoDB persistence via Mongoose
- ⚡ Unique short codes generated with nanoid
- 📋 Copy short link to clipboard

---

## 🧱 Tech Stack

### Backend
| Package | Purpose |
|---|---|
| `express` v5 | REST API framework |
| `mongoose` | MongoDB ODM |
| `nanoid` | Short URL code generation |
| `bcryptjs` | Password hashing |
| `jsonwebtoken` | JWT auth tokens |
| `cookie-parser` | Cookie middleware |
| `dotenv` | Environment variables |
| `cors` | Cross-origin requests |
| `nodemon` | Dev auto-reload |

### Frontend
| Package | Purpose |
|---|---|
| `react` | UI framework |
| Fetch API | HTTP requests to backend |

---

## 📁 Project Structure

```
project/
├── backend/
│   ├── app.js              # Entry point
│   ├── init/
│   │   └── init.data.js    # DB seed / reset script
│   ├── .env                # Environment variables (not committed)
│   └── package.json
└── frontend/
    └── src/
        └── App.jsx         # Main React component
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js >= 18
- MongoDB (local or Atlas)

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd project
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/url-shortener
JWT_SECRET=your_super_secret_key
```

Start the backend:
```bash
npm run dev
```

### 3. Frontend setup
```bash
cd frontend
npm install
npm run dev
```

---

## 🔌 API Endpoints

### Auth

| Method | Route | Description | Auth Required |
|---|---|---|---|
| `POST` | `/auth/register` | Register a new user | ❌ |
| `POST` | `/auth/login` | Login and receive JWT cookie | ❌ |
| `POST` | `/auth/logout` | Clear auth cookie | ✅ |

### URL Shortener

| Method | Route | Description | Auth Required |
|---|---|---|---|
| `POST` | `/create/shorturl` | Create a short URL | ✅ |
| `GET` | `/:shortUrl` | Redirect to original URL | ❌ |

### Request & Response Examples

**POST `/create/shorturl`**
```json
// Request body
{ "url": "https://www.example.com/very/long/url" }

// Response
{ "short_url": "abc123" }
```

The full short link resolves to: `http://localhost:3000/abc123`

---

## 🛠️ Scripts

```bash
# Backend
npm run dev       # Start dev server with nodemon
npm run delete    # Run DB reset/seed script (init/init.data.js)
```

---

## 🔐 Authentication Flow

1. User registers → password is hashed with `bcryptjs` and stored in MongoDB
2. User logs in → server validates credentials and signs a `JWT`
3. JWT is sent back as an **HTTP-only cookie**
4. All protected routes verify the cookie using `jsonwebtoken`
5. On logout, the cookie is cleared

---

## 🌱 Environment Variables

| Variable | Description | Example |
|---|---|---|
| `PORT` | Server port | `3000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/url-shortener` |
| `JWT_SECRET` | Secret key for signing JWTs | `mysecretkey123` |

> ⚠️ Never commit your `.env` file. Add it to `.gitignore`.

---

## 📌 Notes

- Short codes are generated using `nanoid` — collision-resistant and URL-safe
- `uuid` may be used for internal user identifiers
- The `init/init.data.js` script can be used to wipe and reseed the database during development

---

## 📄 License

ISC