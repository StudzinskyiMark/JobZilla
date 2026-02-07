# Jobzilla - Job Posting Website

A modern web application for posting and applying to job listings. Built with Next.js, Prisma, and PostgreSQL.

## Features

- **User Authentication**: Secure OAuth authentication with GitHub and Google
- **Job Posting**: Employers can post new job listings with detailed descriptions
- **Job Applications**: Job seekers can apply to job postings
- **User Dashboard**: View posted jobs and application history
- **Job Listings**: Browse all available job postings
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS

## Tech Stack

### Frontend

- **Next.js** 16.1.6 - React framework with App Router
- **React** 19.0.0 - UI library
- **Tailwind CSS** 4 - Utility-first CSS framework
- **React Hook Form** - Efficient form state management
- **Heroicons** - Beautiful SVG icons

### Backend

- **Next.js API Routes** - Serverless backend functions
- **Prisma** 6.8.2 - ORM for database management
- **Prisma Accelerate** - Query optimization for edge functions
- **NextAuth** 5.0.0 - Authentication library
- **Zod** - TypeScript-first schema validation

### Database

- **PostgreSQL** - Relational database

## Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database
- GitHub OAuth credentials (optional, for GitHub authentication)
- Google OAuth credentials (optional, for Google authentication)

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd job-posting-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory with:

   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/jobzilla"

   # NextAuth Secret
   AUTH_SECRET="your-secret-key-here"

   # GitHub OAuth (optional)
   AUTH_GITHUB_ID="your-github-id"
   AUTH_GITHUB_SECRET="your-github-secret"

   # Google OAuth (optional)
   AUTH_GOOGLE_ID="your-google-id"
   AUTH_GOOGLE_SECRET="your-google-secret"
   ```

4. **Set up the database**

   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

## Running the Project

### Development

```bash
npm run dev
```

Starts the Next.js development server with Turbopack for faster builds.

### Production Build

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

## Project Structure

```
app/
├── api/                    # API routes
│   ├── auth/              # Authentication endpoints
│   │   ├── [...nextauth]/ # NextAuth configuration
│   │   └── signUp/        # Sign-up endpoint
│   └── jobs/              # Job-related endpoints
│       ├── route.ts       # Job listing & creation
│       └── [jobId]/apply/ # Job application endpoint
├── auth/                  # Authentication pages
│   ├── sign-in/
│   └── sign-up/
├── dashboard/             # User dashboard
├── jobs/                  # Job pages
│   ├── page.tsx           # Job listing page
│   ├── [id]/              # Job detail page
│   └── post/              # Post new job page
├── layout.tsx             # Root layout
└── page.tsx               # Home page

components/               # React components
├── Navbar.tsx
├── SessionProvider.tsx
└── jobs/
    └── job/
        └── ApplyButton.tsx

lib/                      # Utility functions
├── prisma.ts             # Prisma client
└── zodTypes.ts           # Zod validation schemas

prisma/                   # Database setup
├── schema.prisma         # Database schema
└── migrations/           # Database migrations
```

## Database Schema

### Models

- **User**: User account information with authentication
- **Account**: OAuth account linking
- **Session**: User session management
- **Job**: Job postings with details (title, company, location, type, description, salary)
- **Application**: Job applications with status tracking
- **VerificationToken**: Email verification tokens

## API Routes

### Authentication

- `POST /api/auth/signin` - Sign in
- `POST /api/auth/signUp` - Create new account
- `GET /api/auth/callback/[provider]` - OAuth callback

### Jobs

- `GET /api/jobs` - List all jobs
- `POST /api/jobs` - Create new job posting
- `POST /api/jobs/[jobId]/apply` - Apply to a job

## Environment Variables

| Variable             | Description                            |
| -------------------- | -------------------------------------- |
| `DATABASE_URL`       | PostgreSQL connection string           |
| `AUTH_SECRET`        | NextAuth secret for session encryption |
| `AUTH_GITHUB_ID`     | GitHub OAuth application ID            |
| `AUTH_GITHUB_SECRET` | GitHub OAuth application secret        |
| `AUTH_GOOGLE_ID`     | Google OAuth application ID            |
| `AUTH_GOOGLE_SECRET` | Google OAuth application secret        |

## Getting OAuth Credentials

### GitHub

1. Go to https://github.com/settings/developers
2. Create a new OAuth App
3. Copy Client ID and Client Secret

### Google

1. Go to https://console.cloud.google.com/
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Copy Client ID and Client Secret

## Development Notes

- The project uses TypeScript for type safety
- ESLint is configured for code quality
- Tailwind CSS is used for styling
- Prisma Client is generated to `app/generated/prisma`
- Authentication is handled by NextAuth with PostgreSQL adapter

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, questions, or contributions, please refer to the project repository.
