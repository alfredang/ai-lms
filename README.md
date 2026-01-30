# AI-Powered Learning Management System (LMS)

A modern, production-ready Learning Management System built with Next.js 14, featuring AI-powered learning assistance, gamification, and role-based access control.

## Live Demo

**Demo Site**: [https://ai-lms-xi.vercel.app](https://ai-lms-xi.vercel.app)

### Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Superadmin | admin@learnhub.com | admin123 |
| Trainer | trainer@learnhub.com | admin123 |
| Learner | learner@learnhub.com | admin123 |

## Features

- **AI-Powered Learning**: Context-aware chatbot for personalized learning assistance
- **Gamification**: XP points, badges, levels, and learning streaks
- **Role-Based Access**: Learner, Trainer, Admin, and Superadmin roles
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Secure Authentication**: NextAuth with Google, GitHub, and credentials

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth v5
- **Database**: PostgreSQL with Prisma ORM
- **AI**: OpenAI API
- **File Storage**: Vercel Blob
- **Email**: Resend

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/alfredang/ai-lms.git
cd ai-lms
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Update `.env` with your credentials:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/lms_db"
AUTH_SECRET="your-secret-key"
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"
AUTH_GITHUB_ID="your-github-client-id"
AUTH_GITHUB_SECRET="your-github-client-secret"
OPENAI_API_KEY="your-openai-api-key"
```

5. Set up the database:
```bash
npm run db:push
npm run db:seed
```

6. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Demo Accounts

After seeding the database:

| Role | Email | Password |
|------|-------|----------|
| Superadmin | admin@learnhub.com | admin123 |
| Trainer | trainer@learnhub.com | admin123 |
| Learner | learner@learnhub.com | admin123 |

## Project Structure

```
/lms
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed data
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── (marketing)/   # Public pages
│   │   ├── (auth)/        # Authentication pages
│   │   ├── (dashboard)/   # Protected dashboards
│   │   └── api/           # API routes
│   ├── components/        # React components
│   │   ├── ui/            # Base UI components
│   │   ├── layout/        # Layout components
│   │   ├── courses/       # Course components
│   │   └── gamification/  # Gamification components
│   ├── lib/               # Utilities
│   ├── services/          # Business logic
│   ├── config/            # Configuration
│   └── types/             # TypeScript types
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:push` - Push schema to database
- `npm run db:seed` - Seed database with demo data
- `npm run db:studio` - Open Prisma Studio

## License

MIT
