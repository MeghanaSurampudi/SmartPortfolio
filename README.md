# Smart Portfolio – Student Performance & Feedback

A student portfolio project developed during the **APSSDC Summer Internship Program (May–July 2025)**. The supplied source archive contains HTML/CSS/JavaScript screens and a small Express/MySQL backend starter.

## What is in this repository

- Student dashboard UI for entering semester marks, viewing a Chart.js performance chart, and displaying feedback.
- Faculty dashboard UI with a feedback form layout.
- Career-cell dashboard UI layout.
- Login screen with student, faculty/mentor, and career-cell role choices.
- Express server with a MySQL connection module and a root health-check endpoint.

## Technology visible in the supplied source

- Frontend: HTML5, CSS3, JavaScript
- Backend: Node.js, Express.js
- Database driver: mysql2 (MySQL)
- Browser demo storage: localStorage
- Charting: Chart.js (loaded by the student dashboard)

The internship report also describes an intended AWS deployment using EC2, RDS, S3, IAM, VPC, CloudWatch and Nginx. Those cloud resources/configurations are not included in this source archive, so this repository does not claim a verified or currently deployed AWS environment.

## Project structure

```text
SmartPortfolio/
├── frontend/
│   ├── index.html
│   ├── about.html
│   ├── career.html
│   ├── faculty.html
│   ├── login.html
│   ├── student-dashboard.html
│   ├── styles.css
│   └── script.js
├── backend/
│   ├── config/db.js
│   ├── controllers/feedbackcontroller.js
│   ├── routes/feedbackRoutes.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── docs/
    └── ARCHITECTURE.md
```

## Run locally

### Backend

1. Install Node.js and MySQL.
2. Open a terminal in `backend/` and run `npm install`.
3. Copy `.env.example` to `.env` and enter local MySQL connection values. Never commit `.env`.
4. Create the database named in `DB_NAME`.
5. Run `npm start`.
6. Visit `http://localhost:5000/` to check the backend health endpoint.

### Frontend

Open `frontend/student-dashboard.html` in a browser. Chart.js is loaded from a CDN, so an internet connection is needed for the chart.

## Current limitations

This is an early project snapshot, not a complete production application:

- The supplied backend only exposes `GET /`; login, marks, certificate, and feedback API endpoints are not implemented.
- The feedback controller and route files in the archive were empty.
- Marks and feedback shown in the browser demo use localStorage, not MySQL.
- Certificate submission is a demo alert; files are not uploaded to S3 or another server.
- The login form has no authentication handler.
- Some original navigation links refer to pages not present in the supplied archive.
- No SQL schema/migrations, AWS deployment files, screenshots, or automated tests were supplied.

The UI and starter backend are preserved as project evidence. Do not present incomplete demo interactions as secure or production-ready functionality.

## Security

Keep real database credentials and secrets in a local `.env` file only. Never commit AWS keys, database passwords, JWT secrets, or private student data. Configure least-privilege IAM and network access before any cloud deployment.

## Internship context

**Program:** APSSDC Summer Internship Program on AWS  
**Period:** May 2025 – July 2025  
**Project:** Smart Portfolio on Student Performance and Feedback  
**Report contributors:** S. Meghana, R. Lavanya, V. Mounika, G. Madhulatha Reddy, and J. Yashwanth Krishna

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the report-described architecture and intended cloud components.
