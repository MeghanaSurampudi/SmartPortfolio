# Backend API

## Requirements
Node.js 18+ and MySQL 8+.

## Setup
1. Run `mysql -u root -p < database/schema.sql`.
2. Copy `.env.example` to `.env`; set local database values and a long random JWT secret.
3. Run `npm install`, then `npm start`.
4. Check `GET http://localhost:5000/api/health`.

## API
- `POST /api/auth/register` – demo account registration (public role selection must be restricted before production).
- `POST /api/auth/login` – login and receive JWT.
- `GET /api/marks/me`, `POST /api/marks` – student's own marks.
- `GET /api/marks/student/:studentId` – faculty/career-cell marks view.
- `GET /api/feedback/me`, `POST /api/feedback` – student feedback view / faculty feedback submission.
- `POST /api/certificates`, `GET /api/certificates/me` – upload and list certificate metadata.

Protected routes require `Authorization: Bearer <token>`. Uploads use multipart field `certificates`; PDF/JPG/PNG up to 5 MB each.

## Production hardening
This is a learning implementation. Faculty and career-cell accounts must be provisioned manually by a trusted administrator in MySQL; public registration creates student accounts only. Add rate limiting, schema validation, content-based file validation, authenticated certificate download, HTTPS, private S3 storage, audit logs, backups, and automated tests before production deployment.