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

### Core Features
- **AI-Powered Learning**: Context-aware chatbot for personalized learning assistance (floating chat bubble on all pages)
- **Gamification**: XP points, badges, levels, and learning streaks
- **Role-Based Access**: Learner, Trainer, Admin, and Superadmin roles with separate login flows
- **Modern UI**: Clean, responsive design with dark mode support
- **Secure Authentication**: NextAuth with Google, GitHub OAuth, and credentials

### Course Categories
- Gen AI & Agentic AI
- Vibe Coding
- Investment
- Soft Skills
- Marketing

### Payment Integration
- Stripe payment processing
- PayPal checkout support

### Authentication
- **Learners/Trainers**: Login modal popup with Google/GitHub OAuth
- **Admin/Superadmin**: Separate secure login portal at `/admin/login`

### AI Provider Support (Superadmin Settings)
- OpenAI (GPT-4o, GPT-4 Turbo, GPT-3.5)
- Google Gemini (Pro, Flash)
- Anthropic Claude (Opus, Sonnet, Haiku)
- OpenRouter (Multiple models)
- DeepSeek (Chat, Coder)

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI components
- **Authentication**: NextAuth v5 with JWT
- **Database**: PostgreSQL with Prisma ORM (Neon serverless)
- **AI**: OpenAI-compatible API
- **File Storage**: Vercel Blob
- **Email**: Resend
- **Payments**: Stripe, PayPal

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (or Neon serverless)
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

## Project Structure

```
/lms
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed data
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── (marketing)/   # Public pages (homepage, courses, about)
│   │   ├── (auth)/        # Authentication pages
│   │   │   ├── login/     # Learner/Trainer login
│   │   │   ├── register/  # Registration page
│   │   │   └── admin/     # Admin/Superadmin login portal
│   │   ├── (dashboard)/   # Protected dashboards
│   │   │   ├── learner/   # Learner dashboard
│   │   │   ├── trainer/   # Trainer dashboard
│   │   │   ├── admin/     # Admin dashboard
│   │   │   └── superadmin/# Superadmin dashboard
│   │   └── api/           # API routes
│   │       ├── ai/        # AI chat endpoints
│   │       ├── payments/  # Stripe & PayPal
│   │       └── auth/      # Authentication
│   ├── components/        # React components
│   │   ├── ui/            # Base UI components (Shadcn)
│   │   ├── layout/        # Header, Footer, Sidebar
│   │   ├── auth/          # Login/Register modals
│   │   ├── ai/            # AI chat widget
│   │   ├── courses/       # Course components
│   │   ├── payment/       # Checkout forms
│   │   └── gamification/  # XP, badges, streaks
│   ├── lib/               # Utilities & configurations
│   ├── services/          # Business logic services
│   ├── config/            # App configuration
│   └── types/             # TypeScript types
```

## Key Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with featured courses |
| `/courses` | Course catalog with category filtering |
| `/admin/login` | Admin/Superadmin login portal |
| `/learner` | Learner dashboard |
| `/trainer` | Trainer dashboard |
| `/admin` | Admin dashboard |
| `/superadmin` | Superadmin dashboard |
| `/superadmin/settings` | AI provider configuration |

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:push` - Push schema to database
- `npm run db:seed` - Seed database with demo data
- `npm run db:studio` - Open Prisma Studio

## Recent Updates

- Added AI chatbot floating widget on all pages
- Implemented login/register modal popups for learners/trainers
- Added separate admin/superadmin login portal with tabs
- Added multi-provider AI configuration (OpenAI, Gemini, Claude, etc.)
- Added Stripe and PayPal payment integration
- Updated course categories (Gen AI, Vibe Coding, Investment, Soft Skills, Marketing)
- Added featured courses section on homepage
- Enhanced footer with social media icons and payment badges

## License

MIT
