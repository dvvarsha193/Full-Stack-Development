# 🚀 Full Stack Development Lab Practicals

> **Vasireddy Venkatadri Institute of Technology (Autonomous)**  
> **Student:** Alamalu Dhana Varsha  
> **Regd. No.:** `25BQ5A0504`  
> **GitHub Profile:** [@dvvarsha193](https://github.com/dvvarsha193)  
> **Repository:** [dvvarsha193/Full-Stack-Development](https://github.com/dvvarsha193/Full-Stack-Development)

All 17 applications are maintained under this **single repository** with individual deployments:
- **Frontend Applications (9 items) + MERN Frontend (1 item)** ➔ Deployed on **Vercel**
- **Backend Applications (6 items) + MERN Backend (1 item)** ➔ Deployed on **Render**

---

## 📑 The 17 Side Headings & Deployed Links

### 🌐 Frontend Applications (Deployed on Vercel)

| # | Practical Heading | Subdirectory (Root Dir) | Platform | Target Deployed Link |
|---|-------------------|-------------------------|----------|----------------------|
| **1** | **React HTML app** | `frontend-applications/01-react-html-app` | **Vercel** | `https://fs-01-react-html-app.vercel.app` |
| **2** | **React JSX app** | `frontend-applications/02-react-jsx-app` | **Vercel** | `https://fs-02-react-jsx-app.vercel.app` |
| **3** | **React Multi components** | `frontend-applications/03-react-multi-components` | **Vercel** | `https://fs-03-react-multi-components.vercel.app` |
| **4** | **React state & events** | `frontend-applications/04-react-state-events` | **Vercel** | `https://fs-04-react-state-events.vercel.app` |
| **5** | **React Forms & events** | `frontend-applications/05-react-forms-events` | **Vercel** | `https://fs-05-react-forms-events.vercel.app` |
| **6** | **React conditional rendering** | `frontend-applications/06-react-conditional-rendering` | **Vercel** | `https://fs-06-react-conditional-rendering.vercel.app` |
| **7** | **React rendering list** | `frontend-applications/07-react-rendering-list` | **Vercel** | `https://fs-07-react-rendering-list.vercel.app` |
| **8** | **React frontend crud** | `frontend-applications/08-react-frontend-crud` | **Vercel** | `https://fs-08-react-frontend-crud.vercel.app` |
| **9** | **React router app** | `frontend-applications/09-react-router-app` | **Vercel** | `https://fs-09-react-router-app.vercel.app` |

---

### ⚙️ Backend Applications (Deployed on Render)

| # | Practical Heading | Subdirectory (Root Dir) | Platform | Target Deployed Link & Key Endpoint |
|---|-------------------|-------------------------|----------|-------------------------------------|
| **10** | **Express Middleware** | `backend-applications/01-express-middleware` | **Render** | `https://full-stack-01-express-middleware.onrender.com/api/v1/patients` |
| **11** | **Mongodb express** | `backend-applications/02-mongodb-express` | **Render** | `https://full-stack-02-mongodb-express.onrender.com/api/v1/books` |
| **12** | **Mongoose express** | `backend-applications/03-mongoose-express` | **Render** | `https://full-stack-03-mongoose-express.onrender.com/api/v1/movies` |
| **13** | **MVC express** | `backend-applications/04-mvc-express` | **Render** | `https://full-stack-04-mvc-express.onrender.com/api/v1/movies` |
| **14** | **MVC authentication** | `backend-applications/05-mvc-authentication` | **Render** | `https://full-stack-05-mvc-auth.onrender.com/api/v1/todos` |
| **15** | **Template Engine EJS** | `backend-applications/06-template-engine-ejs` | **Render** | `https://full-stack-06-template-engine-ejs.onrender.com` |

---

### 🔄 MERN Full Stack Application

| # | Side Heading | Subdirectory (Root Dir) | Platform | Target Deployed Link |
|---|--------------|-------------------------|----------|----------------------|
| **16** | **MERN (backend)** | `mern-full-stack-application/backend` | **Render** | `https://full-stack-07-mern-backend.onrender.com/api/v1/posts` |
| **17** | **MERN (frontend)** | `mern-full-stack-application/frontend` | **Vercel** | `https://full-stack-mern-frontend.vercel.app` |

---

## 🛠️ Step-by-Step Deployment Instructions

### 1. Pushing the Monorepo to GitHub
```bash
cd C:\Users\ravur\.gemini\antigravity\scratch\Full-Stack-Development
git push -u origin main
```

---

### 2. Deploying Frontends to Vercel (10 Total)
For each frontend application:
1. Log in to [Vercel](https://vercel.com) and click **"Add New..."** > **"Project"**.
2. Select your repository: `dvvarsha193/Full-Stack-Development`.
3. Under **Root Directory**, click **Edit** and choose the corresponding frontend directory (e.g., `frontend-applications/01-react-html-app`).
4. Keep the Framework Preset as **Vite** (automatically detected).
5. (Optional) Customize the Project Name (e.g. `fs-01-react-html-app`).
6. Click **Deploy**!
7. Repeat for the other 8 frontends and `mern-full-stack-application/frontend`.

*(Each directory already contains a pre-configured `vercel.json` for seamless routing).*

---

### 3. Deploying Backends to Render (7 Total)

#### Option A: One-Click Blueprint (Recommended)
This repository contains a pre-configured [`render.yaml`](./render.yaml) blueprint file.
1. Log in to [Render Dashboard](https://dashboard.render.com).
2. Click **"New +"** > **"Blueprint"**.
3. Connect your repository `dvvarsha193/Full-Stack-Development`.
4. Render will parse `render.yaml` and configure all 7 backend web services automatically.
5. Provide your `MONGO_URI` (MongoDB Atlas connection string) for database services and click **Apply**.

#### Option B: Individual Web Services on Render
1. In Render Dashboard, click **"New +"** > **"Web Service"**.
2. Select repository `dvvarsha193/Full-Stack-Development`.
3. Set **Root Directory** to the backend directory (e.g. `backend-applications/01-express-middleware`).
4. Set **Build Command:** `npm install`
5. Set **Start Command:** `npm start`
6. Add environment variable: `MONGO_URI` with your MongoDB connection string.
7. Click **Create Web Service**.
