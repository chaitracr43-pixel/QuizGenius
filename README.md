# QuizGenius – AI-Powered Quiz & Exam Management System

> **A comprehensive, enterprise-ready, responsive educational web application engineered for intelligent quiz creation, timed proctored examinations, cognitive performance diagnostics, and 24/7 AI-driven study assistance.**

![QuizGenius Banner](https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1200)

---

## 👨‍💻 Author Information

* **Author:** Chaitra C R
* **Project Name:** QuizGenius – AI-Powered Quiz & Exam Management System
* **Specialization:** Senior Full-Stack Development & AI Engineering

---

## 📖 1. Project Introduction

**QuizGenius** is an advanced AI-powered web platform designed to transform traditional educational testing into an adaptive, transparent, and personalized learning experience. 

Traditional examination management systems merely record percentage scores without explaining *why* students answered incorrectly or *which* specific cognitive gaps require intervention. **QuizGenius** bridges this divide by uniting:
1. A **proctored real-time examination interface** with countdown timers, question navigation matrix, and immutable answer keys.
2. A **Generative AI Quiz Authoring Engine** that generates multi-difficulty MCQs with four distinct options, verified keys, and pedagogical explanations.
3. A **Cognitive AI Performance Diagnostic Engine** that diagnoses student weaknesses and suggests individualized remedial pathways.
4. A **24/7 AI Study Assistant** chat tutor capable of breaking down complex syllabus topics, simplifying definitions, and generating tailored practice questions.

---

## 🎯 2. Project Objectives

- **Empower Students:** Provide an intuitive self-assessment portal with timed examinations, review flags, immediate scoring, and personalized AI recommendations.
- **Accelerate Test Authoring for Educators:** Drastically reduce test-preparation hours by leveraging AI prompt generation with faculty review controls.
- **Ensure Academic Rigor & Integrity:** Guarantee immutable final exam submissions, server-side score validation, and anti-tamper answer key verification.
- **Data-Driven Institutional Insights:** Equip administrators with cohort score distribution analytics, subject pass rates, and active student enrollment figures.
- **Privacy-Centric Architecture:** Enforce strict password hashing (PBKDF2/BCrypt), role-based access control, and zero client-side API key exposure.

---

## 🚀 3. Core Features & Capabilities

### A. 🎓 Student Experience
- **Interactive Authentication:** Register and sign in with dedicated Student profiles (or 1-Click Fast Demo Login).
- **Available Examinations Catalog:** Filter examinations by academic discipline (Computer Science, Artificial Intelligence, Web Technologies, Database Systems) and difficulty (Beginner, Intermediate, Advanced).
- **Proctored Online Exam Room:**
  - Dynamic countdown timer with low-time visual warnings.
  - Previous and Next sequential navigation.
  - Interactive Question Navigator grid displaying Answered, Flagged, and Unanswered statuses.
  - Mark-for-review flag toggle.
  - Continuous auto-save to prevent progress loss.
  - Final submission confirmation modal with unattempted alerts.
- **AI Performance Analysis Report:**
  - Total marks, marks obtained, percentage, and distinction badges.
  - Visual breakdown of correct vs. incorrect answers.
  - Cognitive diagnosis of mastered concepts vs. concepts needing remediation.
  - AI-crafted personalized study recommendations.
  - Read-only, immutable question review with correct answers and detailed learning rationales.
- **24/7 AI Study Assistant:**
  - Interactive chat interface for doubt clarification.
  - Quick-prompt chips for algorithmic analysis, database transactions, and web architecture.
  - Copy response shortcuts.
- **Global Leaderboard:**
  - Real-time ranking based on completed quizzes, average percentages, and honor badges (Grandmaster, Master, Expert, Scholar).
  - Anonymized and privacy-compliant display.
- **Personal Learning History:**
  - Historical chronological archive of all completed tests with quick access to previous AI diagnostic reports.

### B. 🛡️ Teacher & Admin Portal
- **Administrative Dashboard:**
  - Overview cards: Total Registered Students, Total Examinations, Active Question Bank, and Cohort Average Score.
  - Interactive Cohort Score Distribution Bar Chart (0-50%, 51-70%, 71-85%, 86-100%).
  - Curriculum pass rates and recent student submission stream.
- **AI Quiz Generator:**
  - Specify subject name, topic, difficulty (Beginner, Intermediate, Advanced), and question count.
  - Generates 4-option MCQs, correct answers, difficulty labels, and educational explanations.
  - **Faculty Review & Edit Panel:** Full capability to edit questions, change options, alter correct keys, or delete questions prior to publishing.
  - **Transparent Demo Mode:** Clearly signals when running in sample fallback mode vs. live AI tokens.
- **Manual Quiz Editor:**
  - Create and edit exams from scratch.
  - Configure timer limits (minutes), maximum marks, and instant publishing switches.
  - Add, reorder, or delete questions with option matrix editors.
- **Quiz Management Directory:**
  - Centralized table with title, subject, difficulty, duration, question count, and attempt volume.
  - One-click Publish/Draft state toggles.
  - Edit, preview, and safe-deletion actions.
- **User Management:**
  - Directory of student and educator accounts.
  - Monitor individual exam participation and aggregate scores.
  - One-click account activation / suspension controls.

---

## 🤖 4. AI Integration Details

QuizGenius implements a secure, server-side AI architecture that interfaces with the **Google Gemini Pro / Gemini Flash REST API**:

1. **AI Question Generation (`/api/ai/generate-quiz`):**
   - Prompts the model to return strict JSON arrays conforming to educational MCQ standards.
   - Generates four viable options (avoiding trivial answers), tags difficulty, and appends a learning explanation.
2. **Cognitive Performance Analysis (`/api/ai/analyze-performance`):**
   - Evaluates a student's answer pattern and percentage score.
   - Synthesizes personalized diagnostic feedback, highlighting specific strengths and recommending actionable study routines.
3. **AI Study Assistant (`/api/ai/chat`):**
   - Implements conversational context for student inquiries.
   - Formulates responses using clear Markdown formatting, bullet points, and KaTeX mathematical notations.
4. **Transparent Demonstration Fallback:**
   - If no API key is specified in `.env`, the system activates a curated **Demonstration Mode**.
   - High-quality sample questions and responses are provided with clear `[Demo Data]` badges, guaranteeing 100% testability without unexpected API billings or failures.

---

## 🛠️ 5. Technology Stack

### Frontend
- **React.js 18** – Declarative component-based UI framework
- **Tailwind CSS 3** – Utility-first responsive styling with custom purple & blue theme
- **React Router 6** – Client-side routing with role-based `ProtectedRoute` guards
- **Lucide React** – Modern vector iconography
- **Vite 5** – Next-generation high-speed frontend bundler
- **Custom Vector SVG Charts** – Responsive progress lines, cohort score distributions, and mastery meters

### Backend
- **Python 3.10+ / Flask** – Lightweight, robust RESTful API framework
- **Flask-SQLAlchemy** – Object-Relational Mapping (ORM)
- **Werkzeug Security** – Industry-standard PBKDF2/BCrypt password hashing
- **Flask-CORS** – Cross-Origin Resource Sharing handling

### Database
- **SQLite 3** – Default zero-configuration database for rapid local development
- **PostgreSQL Ready** – Architecture adheres to standard SQLAlchemy models for instant cloud deployment (Supabase, Neon, AWS RDS, Railway) via `DATABASE_URL`.

---

## 📂 6. Project Structure

```
QuizGenius/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Badge.jsx            # Difficulty & status tags
│   │   │   ├── Charts.jsx           # SVG line, bar & progress charts
│   │   │   ├── DemoBadge.jsx        # Demo Mode banner & alerts
│   │   │   ├── Footer.jsx           # Global branding footer
│   │   │   ├── Navbar.jsx           # Top navigation with role menus
│   │   │   ├── ProtectedRoute.jsx   # Role-based route guard
│   │   │   ├── Sidebar.jsx          # Dashboard collapsible sidebar
│   │   │   └── StatCard.jsx         # Metric summary cards
│   │   ├── context/
│   │   │   ├── AuthContext.jsx      # Authentication & demo switches
│   │   │   └── ThemeContext.jsx     # Dark & Light mode provider
│   │   ├── pages/
│   │   │   ├── Home.jsx             # SaaS landing page
│   │   │   ├── Login.jsx            # Dual-role login with 1-click demo
│   │   │   ├── Register.jsx         # Registration portal
│   │   │   ├── student/
│   │   │   │   ├── StudentDashboard.jsx    # Student workspace
│   │   │   │   ├── ExamList.jsx            # Examination catalog
│   │   │   │   ├── ExamRoom.jsx            # Timed online exam room
│   │   │   │   ├── ExamResult.jsx          # AI Performance Analysis
│   │   │   │   ├── StudyAssistant.jsx      # AI Study Assistant chat
│   │   │   │   ├── PerformanceHistory.jsx  # Student score archive
│   │   │   │   └── LeaderboardView.jsx     # Global rankings
│   │   │   └── admin/
│   │   │       ├── AdminDashboard.jsx      # Institutional overview
│   │   │       ├── QuizManagement.jsx      # Table of active quizzes
│   │   │       ├── QuizEditor.jsx          # Manual quiz authoring
│   │   │       ├── AIQuizGenerator.jsx     # AI quiz creation & review
│   │   │       ├── AnalyticsView.jsx       # Cohort performance metrics
│   │   │       └── UserManagement.jsx      # Student & educator directory
│   │   ├── services/
│   │   │   └── mockData.js          # Curated dataset for demonstration
│   │   ├── App.jsx                  # Main routing configuration
│   │   ├── index.css                # Tailwind directives & typography
│   │   └── main.jsx                 # Application entry point
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── backend/
│   ├── app.py                       # Flask application factory
│   ├── config.py                    # App configuration & environment settings
│   ├── database.py                  # SQLAlchemy instance & initialization
│   ├── models.py                    # Database schemas (Users, Quizzes, Questions, Attempts)
│   ├── seed.py                      # Database seeding script with initial data
│   ├── requirements.txt             # Python dependencies
│   ├── test_quizgenius.py           # Comprehensive unit & integration test suite
│   ├── routes/
│   │   ├── auth.py                  # Registration, login, profile endpoints
│   │   ├── quizzes.py               # Quiz listing, CRUD, publish toggles
│   │   ├── exams.py                 # Exam submission & score calculation
│   │   ├── ai.py                    # AI generation, analysis & chat endpoints
│   │   ├── analytics.py             # Dashboard statistics endpoints
│   │   ├── leaderboard.py           # Student ranking endpoint
│   │   └── users.py                 # User account management endpoints
│   └── services/
│       └── ai_service.py            # Gemini API client & intelligent fallback engine
│
├── screenshots/
│   └── README.md                    # Screenshot showcase guide
├── .env.example                     # Environment template
├── .gitignore                       # Git ignore definitions
└── README.md                        # Complete project documentation
```

---

## ⚙️ 7. Installation & Setup Instructions

### Prerequisites
- **Node.js** (v18.0 or higher) & **npm**
- **Python** (v3.10 or higher) & **pip**
- **Git**

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/QuizGenius.git
cd QuizGenius
```

---

### Step 2: Backend Setup (Python Flask)

1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```

2. Create and activate a Python virtual environment:
   - **Windows:**
     ```powershell
     python -m venv venv
     .\venv\Scripts\activate
     ```
   - **Linux / macOS:**
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   Copy `.env.example` in the root folder to `.env` (or configure in `backend/`):
   ```bash
   cp ../.env.example .env
   ```
   *Optional:* Add your Google Gemini API key to `GEMINI_API_KEY` in `.env`. If left blank, QuizGenius will automatically run in high-quality **Demo Simulation Mode**.

5. Seed the initial database with default quizzes, questions, and demo accounts:
   ```bash
   python seed.py
   ```

6. Start the Flask Backend Server:
   ```bash
   python app.py
   ```
   *The backend REST API will run at:* `http://localhost:5000`

---

### Step 3: Frontend Setup (React.js & Tailwind CSS)

1. Open a new terminal window and navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The web application will open at:* `http://localhost:3000`

---

## 🔐 8. Demo Credentials for Instant Evaluation

QuizGenius includes pre-configured demo credentials and **1-Click Quick Login** buttons on the Login page:

| Role | Email Address | Password | Portal Access |
| :--- | :--- | :--- | :--- |
| **Student** | `chaitra.student@quizgenius.edu` | `student123` | Student Dashboard, Exam Room, AI Assistant, Leaderboard |
| **Educator / Admin** | `admin@quizgenius.edu` | `admin123` | Admin Dashboard, AI Quiz Generator, Quiz Editor, Analytics |

*Tip:* You can also click the **"🎓 Log in as Demo Student"** or **"🛡️ Log in as Demo Teacher/Admin"** buttons on `/login` to access either portal instantly.

---

## 🗄️ 9. Database Migration to PostgreSQL

QuizGenius is pre-configured to run with SQLite locally and can be switched to PostgreSQL without changing application code:

1. Create a PostgreSQL database on your server or cloud provider (e.g. AWS RDS, Supabase, Neon, Render):
   ```sql
   CREATE DATABASE quizgenius_db;
   ```
2. Update the `DATABASE_URL` variable in your `.env` file:
   ```env
   DATABASE_URL=postgresql://postgres_user:secret_password@localhost:5432/quizgenius_db
   ```
3. Run the database seed script:
   ```bash
   python seed.py
   ```
SQLAlchemy will automatically create all tables (`users`, `quizzes`, `questions`, `answer_options`, `exam_attempts`, `student_answers`, `ai_recommendations`) and populate seed data.

---

## 🧪 10. Automated Testing & Verification

QuizGenius includes an automated test suite verifying password hashing, authentication, quiz creation, and exam scoring:

```bash
cd backend
python -m unittest test_quizgenius.py -v
```

**Test Coverage Highlights:**
- `test_user_registration_and_password_hashing`: Validates password encryption and prevents plaintext storage.
- `test_user_login`: Confirms credential authentication.
- `test_quiz_creation_and_retrieval`: Validates 4-option MCQ authoring and database persistence.
- `test_exam_submission_and_automatic_scoring`: Asserts tamper-free scoring calculation and result generation.
- `test_ai_demo_mode_fallback`: Verifies transparent demo mode fallback when no AI API key is present.

---

## 📸 11. Screenshots Showcase

*(Screenshots can be placed in the `/screenshots` directory)*

- **Hero Landing Page:** Modern educational SaaS interface with purple & blue gradients and dark/light mode toggle.
- **Student Dashboard:** Quizzes attempted counter, learning progress curve, subject mastery bars, and AI study recommendations.
- **Online Examination Room:** Countdown timer, MCQ selection interface, and interactive Question Navigation panel.
- **AI Performance Report:** Diagnostic feedback, concept mastery breakdown, and full immutable answer reviews.
- **AI Quiz Generator:** Prompt input panel and faculty question-review interface.
- **AI Study Assistant:** Interactive chat assistant explaining complex algorithmic paradigms.
- **Global Leaderboard:** Ranked student podium and privacy-respecting achievement metrics.
- **Admin Dashboard & Analytics:** Cohort score distribution and curriculum pass rates.

---

## 🔮 12. Future Enhancements

- [ ] **Webcam & Tab-Switching Proctored AI:** Integrate client-side face detection and tab-switch monitoring during exams.
- [ ] **Audio & Speech Study Assistant:** Voice-based conversational practice with the AI Study Assistant.
- [ ] **LaTeX / KaTeX Formula Editor:** Rich equation input for advanced Mathematics and Physics quizzes.
- [ ] **Automated PDF Export:** Downloadable student certificate and examination analysis transcripts.
- [ ] **Canvas & Moodle LMS Integration:** LTI 1.3 compliance for institutional gradebook synchronization.

---

## 📄 License & Attribution

This project is developed by **Chaitra C R** as a senior engineering project showcasing full-stack application development, AI API integration, and user experience design.

```
© 2026 QuizGenius. All rights reserved.
Developed with 💜 by Chaitra C R.
```
