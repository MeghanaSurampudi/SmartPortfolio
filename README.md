# Smart Portfolio – Student Performance & Feedback

A student portfolio project developed during the APSSDC Summer Internship Program (May–July 2025). This repository contains the supplied frontend prototype plus an expanded learning backend for login, marks, faculty feedback, and certificate metadata.

## Included
- Student, faculty, and career-cell account roles.
- JWT login and password hashing in the backend.
- Student semester marks stored in MySQL.
- Faculty feedback stored against student accounts.
- Certificate upload endpoint with file size and extension limits.
- Student dashboard UI and Chart.js performance graph prototype.
- Architecture notes based on the internship report.

## Technology
HTML5, CSS3, JavaScript, Node.js, Express, MySQL, mysql2, JWT, bcryptjs, Multer and Chart.js. The internship report also describes AWS EC2, RDS, S3, IAM, VPC, CloudWatch and Nginx; AWS deployment is not configured or verified in this repository.

## Structure
```text
SmartPortfolio/
├── frontend/                 # HTML, CSS and browser-side JavaScript
├── backend/
│   ├── config/               # MySQL connection pool
│   ├── database/schema.sql   # Database tables
│   ├── middleware/           # JWT authentication and role checks
│   ├── routes/               # Auth, marks, feedback, certificates APIs
│   ├── uploads/              # Local demo uploads (ignored by Git)
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── docs/ARCHITECTURE.md
```

## Run backend
Requirements: Node.js 18+ and MySQL 8+.
1. From backend/, run: mysql -u root -p < database/schema.sql
2. Copy .env.example to .env and set DB credentials plus a long random JWT_SECRET.
3. Run npm install and npm start in backend/.
4. Test GET http://localhost:5000/api/health.
See backend/README.md for API routes.

## Integration status
The login, student dashboard, and faculty/career-cell screens now call the backend APIs. Marks and feedback are stored in MySQL; certificate uploads are stored on the backend server's local disk for this demo. The application has been organized for local execution, but it has not yet been run against your own MySQL installation or deployed to AWS. Complete the setup and test every flow locally before presenting it as fully verified.

## Limitations and security
- Public registration accepts a role value for demonstration. In production, only a trusted administrator should provision faculty and career-cell accounts.
- Certificate files are stored locally for this demo, not in Amazon S3, and are not exposed through a protected download endpoint.
- Before production use, add rate limiting, stronger validation, file content checks, authenticated downloads, HTTPS, private S3 storage, audit logs, backups, and automated tests.
- Never commit .env, AWS credentials, database passwords, private student data, or uploaded certificates.

## Internship context
Program: APSSDC Summer Internship Program on AWS
Period: May 2025 – July 2025
Project: Smart Portfolio on Student Performance and Feedback
Report contributors: S. Meghana, R. Lavanya, V. Mounika, G. Madhulatha Reddy, and J. Yashwanth Krishna

See docs/ARCHITECTURE.md for the architecture described in the internship report.