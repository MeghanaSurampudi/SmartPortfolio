# Smart Portfolio – Student Performance & Feedback Management

A cloud-hosted student portfolio application developed during the **APSSDC Summer Internship Program (May–July 2025)**. The platform centralizes academic records, achievements, certificates, and mentor feedback so students can track their progress and present their work in one place.

> **Project provenance:** This repository is being organized from the project report prepared by the internship team. The report lists S. Meghana and four teammates as contributors. The original application source code has not yet been added to this repository; implementation details below reflect the report and should be verified against the source before describing the repository as a runnable application.

## Problem

Student marks, certificates, skills, and feedback are often spread across spreadsheets, paper records, and separate files. Smart Portfolio brings these records together in a structured digital portfolio.

## Main capabilities described in the project report

- **Student portfolio:** maintain profile details, skills, projects, and achievements.
- **Academic performance:** enter and view semester-wise marks and subject records.
- **Certificate management:** upload PDF and image certificates to cloud storage.
- **Mentor feedback:** allow faculty/mentors to review student records and provide feedback.
- **Role-based access:** student and admin/mentor access, with JWT-based authentication described in the report.
- **Responsive interface:** access portfolio sections from desktop, tablet, and mobile browsers.

## Technology stack

| Layer | Technologies / services |
|---|---|
| Frontend | HTML5, CSS3, JavaScript |
| Backend | Node.js, Express.js, REST APIs |
| Authentication | JWT; student and admin roles |
| File uploads | Multer, AWS SDK |
| Database | MySQL on Amazon RDS, Sequelize ORM |
| File storage | Amazon S3 |
| Compute / hosting | Ubuntu on Amazon EC2 |
| Web server / reverse proxy | Nginx |
| Access management | AWS IAM roles |
| Networking | Amazon VPC, security groups |
| Monitoring | Amazon CloudWatch |
| Process management | PM2 (as described in deployment section) |

## Architecture

The report describes a three-tier architecture:

1. **Presentation layer** – HTML, CSS, and JavaScript screens for students and mentors.
2. **Application layer** – Node.js/Express APIs for authentication, portfolio CRUD operations, marks, feedback, and certificate uploads.
3. **Data and storage layer** – Amazon RDS (MySQL) for structured records and Amazon S3 for certificate files.

The application is described as running on an Ubuntu EC2 instance, with Nginx forwarding web traffic to the Express application.

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the component flow and data model described in the report.

## Data model described in the report

The report identifies these logical tables:

- `users` – user identity and role
- `portfolios` – portfolio information linked to a user
- `marks` – semester, subject, and marks
- `certificates` – certificate metadata and S3 location
- `feedback` – mentor comments and timestamps

These are a summary of the report, not a database migration or verified schema.

## Repository structure

```text
SmartPortfolio/
├── README.md
├── .gitignore
└── docs/
    └── ARCHITECTURE.md
```

The repository currently contains project documentation. The original application source, dependency manifest, database migrations, deployment configuration, and screenshots still need to be added and reviewed before setup instructions or a live demo can be provided.

## Local setup

A verified local setup guide cannot yet be provided because the application source code and its dependency files are not included in the report. Once the original source is added, this section can document the exact install, configuration, database, and run commands.

Do not commit AWS access keys, database passwords, JWT secrets, private certificates, or production environment files. Use environment variables and least-privilege IAM permissions.

## Security considerations

The project report describes the following security measures:

- IAM roles for application access to AWS resources.
- Restricted S3 access and signed URLs for certificate viewing.
- Database access limited to the application environment within the VPC.
- Input validation and sanitization in the API layer.
- JWT-based authentication and role-based authorization.

These describe the intended implementation in the report; verify the actual source and AWS configuration before treating them as audited controls.

## Future enhancements

The report suggests possible extensions such as:

- Resume generation from portfolio data
- Academic performance analytics and dashboards
- Email notifications
- LinkedIn integration

These are proposed enhancements, not features claimed as implemented.

## Internship project

**Program:** APSSDC Summer Internship Program on AWS  
**Course period:** May 2025 – July 2025  
**Project:** Smart Portfolio on Student Performance and Feedback  
**Report contributors:** S. Meghana, R. Lavanya, V. Mounika, G. Madhulatha Reddy, and J. Yashwanth Krishna  
**Guidance acknowledged in the report:** Mrs. Sumana Bethala and Mr. Anil Kumar, APSSDC

---

If you are reviewing or extending this project, start with [the architecture notes](docs/ARCHITECTURE.md).