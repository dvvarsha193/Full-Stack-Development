# 🚀 Full Stack Development Lab Practicals

> **Vasireddy Venkatadri Institute of Technology (Autonomous)**  
> **Student:** Alamalu Dhana Varsha  
> **Regd. No.:** `25BQ5A0504`  
> **GitHub Profile:** [@dvvarsha193](https://github.com/dvvarsha193)  
> **Repository:** [dvvarsha193/Full-Stack-Development](https://github.com/dvvarsha193/Full-Stack-Development)

---

## 📑 Index of 17 Lab Practicals

### 🌐 Frontend Applications (ReactJS)

| # | Practical Heading | Tech Stack | Source Path | Description |
|---|-------------------|------------|-------------|-------------|
| **1** | **React HTML app** | React 18, Vite | `frontend-applications/01-react-html-app` | Dynamic HTML rendering with `createRoot()` and `render()`. |
| **2** | **React JSX app** | React 18, JSX | `frontend-applications/02-react-jsx-app` | JSX expressions, variables, and evaluated markup. |
| **3** | **React Multi components** | React Components | `frontend-applications/03-react-multi-components` | Nested component tree (`Header`, `Student`, `Footer`) with props. |
| **4** | **React state & events** | React Hooks (`useState`) | `frontend-applications/04-react-state-events` | Background color switcher handling state and button `onClick`. |
| **5** | **React Forms & events** | Controlled Form Components | `frontend-applications/05-react-forms-events` | Complete student registration form with text, radio, select inputs. |
| **6** | **React conditional rendering** | React State | `frontend-applications/06-react-conditional-rendering` | Conditional UI rendering (Logged In / Logged Out status). |
| **7** | **React rendering list** | Array Mapping | `frontend-applications/07-react-rendering-list` | Rendering tabular patient dataset with `patients.map()` and keys. |
| **8** | **React frontend crud** | React State CRUD | `frontend-applications/08-react-frontend-crud` | Full CRUD Expense Tracker with Add, Edit, Delete and Total sum. |
| **9** | **React router app** | `react-router-dom` | `frontend-applications/09-react-router-app` | Multi-route SPA navigation with dynamic parameter routing (`/details/:id`). |

---

### ⚙️ Backend Applications (Node.js & Express)

| # | Practical Heading | Tech Stack | Source Path | Key Endpoints | Description |
|---|-------------------|------------|-------------|---------------|-------------|
| **10** | **Express Middleware** | Express.js | `backend-applications/01-express-middleware` | `GET /api/v1/patients`, `POST /api/v1/patients`, etc. | Logger, body parser, auth middleware, 404, and centralized error handling. |
| **11** | **Mongodb express** | MongoDB Driver, Express | `backend-applications/02-mongodb-express` | `GET /api/v1/books`, `POST /api/v1/books`, etc. | Direct MongoDB driver integration with query filtering and CRUD operations. |
| **12** | **Mongoose express** | Mongoose ODM, Express | `backend-applications/03-mongoose-express` | `GET /api/v1/movies`, `POST /api/v1/movies`, etc. | Schema-based data modeling and async CRUD endpoints for movie database. |
| **13** | **MVC express** | Express MVC Architecture | `backend-applications/04-mvc-express` | `GET /api/v1/movies` | Clean separation of concerns (Models, Controllers, Routes, DB Config). |
| **14** | **MVC authentication** | JWT, bcrypt, Express | `backend-applications/05-mvc-authentication` | `/api/v1/users/register`, `/api/v1/todos` | Secure user registration, login with JWT tokens, and protected routes. |
| **15** | **Template Engine EJS** | EJS, Express SSR | `backend-applications/06-template-engine-ejs` | `GET /`, `POST /add-product`, `/product/:id` | Server-Side Rendering (SSR) dynamic product catalog with EJS templates. |

---

### 🔄 MERN Full Stack Application

| # | Practical Heading | Tech Stack | Source Path | Description |
|---|-------------------|------------|-------------|-------------|
| **16** | **MERN Full Stack (Backend)** | Express, Mongoose, CORS, Morgan | `mern-full-stack-application/backend` | REST API on `/api/v1/posts` for creating, reading, updating, deleting posts. |
| **17** | **MERN Full Stack (Frontend)** | React, Vite, Axios | `mern-full-stack-application/frontend` | Single Page Application consuming the backend API in real time. |

---

## 📦 How to Run Locally

### Frontend Apps
```bash
cd frontend-applications/01-react-html-app
npm install
npm run dev
```

### Backend Apps
```bash
cd backend-applications/01-express-middleware
npm install
npm start
```

### MERN Application
```bash
# Terminal 1: Backend
cd mern-full-stack-application/backend
npm install
npm start

# Terminal 2: Frontend
cd mern-full-stack-application/frontend
npm install
npm run dev
```

---

## 🌐 Deployment Guide

### 1. GitHub Pages (Showcase Portal & Frontends)
This repository includes a pre-configured GitHub Actions workflow in `.github/workflows/deploy.yml`.
1. Go to your repository **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, choose **GitHub Actions**.
3. Push to `main` branch: GitHub Pages will automatically build and publish your portal to:
   ```
   https://dvvarsha193.github.io/Full-Stack-Development/
   ```

### 2. Render.com (Backend Web Services)
1. Sign in to [Render](https://render.com) and click **New +** > **Web Service**.
2. Connect your GitHub repository `dvvarsha193/Full-Stack-Development`.
3. Set the **Root Directory** to any backend app (e.g. `backend-applications/01-express-middleware` or `mern-full-stack-application/backend`).
4. Set:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add your Environment Variables:
   - `MONGO_URI`: `mongodb+srv://<user>:<password>@cluster0.mongodb.net/`
   - `PORT`: `10000`
