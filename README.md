# 📸 .Studios — Luxury Cinematic Photography Portfolio

A premium, full-stack photography portfolio and admin CMS platform built for cinematic wedding and event photographers. Features a stunning public-facing website with dark/light themes, smooth animations, and a secure internal admin dashboard for managing portfolios, films, inquiries, and more.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Django](https://img.shields.io/badge/Django-5.2-092E20?logo=django&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)

---

## ✨ Features

### 🌐 Public Website
- **Home** — Hero section with cinematic animations, featured stories, film previews, testimonials, Instagram feed, and contact CTA
- **Stories** — Filterable portfolio gallery with category tabs (Weddings, Pre-Weddings, Maternity)
- **Story Detail** — Individual gallery pages with image grids
- **Films** — Cinematic video portfolio with embedded YouTube/Vimeo players
- **Store** — Product showcase for prints, presets, and albums
- **About** — Studio philosophy and team introduction
- **Contact** — Inquiry form that saves leads directly to the admin CRM
- **Dark/Light Theme** — Seamless theme toggle with smooth transitions
- **Responsive Design** — Optimized for mobile, tablet, and desktop
- **WhatsApp CTA** — Floating button for instant client communication

### 🔒 Admin Dashboard (`/admin` → `/dashboard`)
- **JWT Authentication** — Secure login with access & refresh tokens
- **Dynamic Overview** — Real-time analytics (inquiry count, portfolio count, etc.)
- **Portfolio Manager** — Create stories with Cloudinary image uploads
- **Films Manager** — Add films with thumbnail uploads and video URLs
- **Store Manager** — Manage products with drag-and-drop image uploads
- **Inquiry CRM** — Full lead management with:
  - Inline status updates (New → Contacted → Converted → Closed)
  - One-click Call, Email, and WhatsApp contact buttons
  - Pre-filled email and WhatsApp message templates
- **Testimonials Manager** — Add and manage client reviews
- **Homepage CMS** — Edit hero text and tagline dynamically
- **Protected Routes** — Unauthorized users are redirected to login

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Vite 5, Tailwind CSS 3.4, Framer Motion, GSAP |
| **State Management** | Redux Toolkit |
| **Backend** | Django 5.2, Django REST Framework |
| **Authentication** | SimpleJWT (Access + Refresh tokens) |
| **Database** | PostgreSQL 16 |
| **Media Storage** | Cloudinary CDN |
| **Deployment** | Vercel (Frontend), Render/Railway (Backend) |

---

## 📁 Project Structure

```
photography-portfolio/
├── backend/                    # Django REST API
│   ├── backend/                # Project settings & URLs
│   │   ├── settings.py         # Environment-based configuration
│   │   ├── urls.py             # API routing
│   │   └── wsgi.py
│   ├── portfolio/              # Portfolio stories app
│   ├── films/                  # Cinematic films app
│   ├── inquiries/              # Client inquiry CRM app
│   ├── testimonials/           # Client reviews app
│   ├── products/               # Store products app
│   ├── homepage/               # Homepage CMS app
│   ├── build.sh                # Render deployment script
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/                   # React SPA
│   ├── src/
│   │   ├── components/         # Navbar, Footer, WhatsApp CTA
│   │   ├── components/ui/      # AdminTable, Modal, Dropzone
│   │   ├── pages/              # Public pages (Home, Stories, Films, etc.)
│   │   ├── pages/auth/         # Admin Login
│   │   ├── pages/dashboard/    # CMS views (Overview, Portfolio, Films, etc.)
│   │   ├── layouts/            # DashboardLayout with sidebar
│   │   ├── sections/           # Homepage sections (Hero, Featured, etc.)
│   │   ├── redux/              # Redux store & auth slice
│   │   ├── routes/             # ProtectedRoute wrapper
│   │   ├── services/           # Axios API client with JWT interceptors
│   │   ├── context/            # Theme context (dark/light)
│   │   └── index.css           # Design system & custom styles
│   ├── vercel.json             # Vercel SPA routing config
│   └── .env.example
│
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+
- **Python** 3.10+
- **PostgreSQL** 16+
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/Sridhar-yadav/photography-portfolio.git
cd photography-portfolio
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv ../venv
# Windows
..\venv\Scripts\activate
# macOS/Linux
source ../venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create your .env file
cp .env.example .env
# Edit .env with your local database credentials and Cloudinary keys

# Create PostgreSQL database
# psql -U postgres -c "CREATE DATABASE photography_db;"

# Run migrations
python manage.py migrate

# Create admin superuser
python manage.py createsuperuser

# Start the development server
python manage.py runserver
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

### 4. Access the Application

| URL | Description |
|-----|------------|
| `http://localhost:5173` | Public website |
| `http://localhost:5173/admin` | Admin login |
| `http://localhost:5173/dashboard` | Admin dashboard (after login) |
| `http://localhost:8000/admin/` | Django admin panel |
| `http://localhost:8000/api/` | REST API root |

---

## 🔑 Environment Variables

### Backend (`backend/.env`)

```env
DEBUG=True
SECRET_KEY=your-secret-key
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173
DATABASE_URL=postgres://postgres:your_password@localhost:5432/photography_db
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:8000/api/
```

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login/` | Obtain JWT tokens |
| POST | `/api/auth/refresh/` | Refresh access token |

### Public (Read-Only)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/portfolio/` | List all portfolio stories |
| GET | `/api/films/` | List all films |
| GET | `/api/testimonials/` | List all testimonials |
| GET | `/api/products/` | List all store products |
| POST | `/api/inquiries/` | Submit a contact inquiry |

### Admin (JWT Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/portfolio/` | Create a portfolio story |
| PUT | `/api/portfolio/:id/` | Update a story |
| DELETE | `/api/portfolio/:id/` | Delete a story |
| POST | `/api/films/` | Create a film |
| GET | `/api/inquiries/` | List all inquiries |
| PATCH | `/api/inquiries/:id/` | Update inquiry status |
| POST | `/api/products/` | Create a product |
| POST | `/api/testimonials/` | Create a testimonial |

---

## 🚢 Deployment

### Frontend → Vercel

1. Connect the `frontend/` folder to Vercel
2. Set Build Command: `npm run build`
3. Set Output Directory: `dist`
4. Add environment variable: `VITE_API_URL=https://your-backend-url.onrender.com/api/`

### Backend → Render

1. Connect the `backend/` folder to Render
2. Set Build Command: `./build.sh`
3. Set Start Command: `gunicorn backend.wsgi:application`
4. Add all environment variables from `.env.example`
5. Attach a PostgreSQL database from Render's dashboard

---

## 🔒 Security

- ✅ JWT-based authentication with token rotation
- ✅ Environment variables for all secrets (no hardcoded credentials)
- ✅ CORS restricted to specific frontend origins
- ✅ Django ORM prevents SQL injection
- ✅ `IsAuthenticatedOrReadOnly` on all CRUD endpoints
- ✅ Public users can only read data and submit inquiries
- ✅ WhiteNoise for secure static file serving
- ✅ `.gitignore` excludes `.env`, `venv/`, `__pycache__/`

---

## 📄 License

This project is proprietary software. All rights reserved.

---

## 👨‍💻 Author

**Sridhar Yadav**  
Full-Stack Developer  
[GitHub](https://github.com/Sridhar-yadav) 
