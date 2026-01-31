# AI-Powered Learning Management System (LMS)

A modern, production-ready Learning Management System built with Next.js 14, featuring AI-powered learning assistance, gamification, and role-based access control.

## Live Demo

**Demo Site**: [https://ai-lms-xi.vercel.app](https://ai-lms-xi.vercel.app)

**User Guide**: [https://alfredang.github.io/ai-lms](https://alfredang.github.io/ai-lms) (GitHub Pages)

### Demo Credentials

All demo accounts use the password: `admin123`

| Role | Email | Password | Dashboard |
|------|-------|----------|-----------|
| Learner | learner@learnhub.com | admin123 | `/learner` |
| Trainer | trainer@learnhub.com | admin123 | `/trainer` |
| Admin | administrator@learnhub.com | admin123 | `/admin` |
| Superadmin | admin@learnhub.com | admin123 | `/superadmin` |

### How to Login

1. Go to [https://ai-lms-xi.vercel.app/login](https://ai-lms-xi.vercel.app/login)
2. Select the appropriate tab:
   - **Learn Tab**: For Learner and Trainer accounts
   - **Admin Tab**: For Admin and Superadmin accounts
   - **Email Tab**: Manual email/password login
3. Click on the role card to quick-login with demo credentials

## Features

### Core Features
- **AI-Powered Learning**: Context-aware chatbot for personalized learning assistance
- **Gamification**: XP points, badges, levels, and learning streaks
- **Role-Based Access**: 4 distinct roles with separate dashboards
- **Course Enrollment**: Full enrollment system with progress tracking
- **Dark/Light Mode**: Theme toggle in header with system preference detection
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Secure Authentication**: NextAuth with Google, GitHub OAuth, and credentials
- **User Guide**: Comprehensive documentation hosted on GitHub Pages

### Course Categories (7 Categories, 21 Courses)
- **Real Estate** - Property investment and home buying
- **Investment** - Stock market, crypto, and dividends
- **Soft Skills** - Leadership, communication, negotiation
- **Gen AI & Agentic AI** - LangChain, prompt engineering, API development
- **Full Stack & Vibe Coding** - React, Cursor AI, Claude Code
- **Cloud Computing** - AWS, Kubernetes, serverless
- **Digital Marketing** - SEO, social media, Google Ads

### Course Delivery Formats
Each course is tagged with:
- **Delivery Type**: Instructor-Led or E-Learning
- **Session Type**: Classroom or Virtual

### Role Permissions

| Feature | Learner | Trainer | Admin | Superadmin |
|---------|---------|---------|-------|------------|
| Enroll in courses | ✅ | ✅ | ✅ | ✅ |
| View course materials | ✅ | ✅ | ✅ | ✅ |
| Submit assignments | ✅ | ❌ | ❌ | ❌ |
| Grade assignments | ❌ | ✅ | ✅ | ✅ |
| Manage classes | ❌ | ✅ | ✅ | ✅ |
| Create/edit courses | ❌ | ❌ | ✅ | ✅ |
| Manage users | ❌ | ❌ | ✅ | ✅ |
| View as other roles | ❌ | ❌ | ✅ | ✅ |
| Configure AI settings | ❌ | ❌ | ❌ | ✅ |
| Payment settings | ❌ | ❌ | ❌ | ✅ |
| API key management | ❌ | ❌ | ❌ | ✅ |

### Payment Integration
- Stripe payment processing
- PayPal checkout support

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
- PostgreSQL database (or Neon serverless account)
- npm or yarn

### Step-by-Step Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/alfredang/ai-lms.git
cd ai-lms
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Create Environment File

```bash
cp .env.example .env
```

#### 4. Configure Environment Variables

Edit the `.env` file with your credentials:

```env
# Database (Required)
# For Neon: Get from https://neon.tech dashboard
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"

# Authentication (Required)
# Generate with: openssl rand -base64 32
AUTH_SECRET="your-random-secret-key-here"

# Google OAuth (Optional - for Google login)
# Get from: https://console.cloud.google.com/apis/credentials
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"

# GitHub OAuth (Optional - for GitHub login)
# Get from: https://github.com/settings/developers
AUTH_GITHUB_ID="your-github-client-id"
AUTH_GITHUB_SECRET="your-github-client-secret"

# OpenAI API (Optional - for AI chat features)
# Get from: https://platform.openai.com/api-keys
OPENAI_API_KEY="your-openai-api-key"

# Stripe (Optional - for payments)
# Get from: https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# PayPal (Optional - for payments)
# Get from: https://developer.paypal.com/dashboard/applications
PAYPAL_CLIENT_ID="your-paypal-client-id"
PAYPAL_CLIENT_SECRET="your-paypal-client-secret"
```

#### 5. Set Up the Database

Push the schema to your database:

```bash
npm run db:push
```

Or if you want to use migrations:

```bash
npx prisma migrate dev
```

#### 6. Seed the Database

This creates demo users, categories, courses, and badges:

```bash
npm run db:seed
```

After seeding, you'll have:
- 4 demo users (Learner, Trainer, Admin, Superadmin)
- 7 trainers
- 7 course categories
- 21 courses with Unsplash thumbnails
- 7 badges

#### 7. Generate Prisma Client

```bash
npx prisma generate
```

#### 8. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Setting Up OAuth Providers

#### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Navigate to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth client ID**
5. Select **Web application**
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://your-domain.com/api/auth/callback/google` (production)
7. Copy Client ID and Client Secret to `.env`

#### GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **New OAuth App**
3. Fill in:
   - Application name: Your app name
   - Homepage URL: `http://localhost:3000` or your domain
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Client Secret to `.env`

### Setting Up Neon Database

1. Create account at [Neon](https://neon.tech)
2. Create a new project
3. Copy the connection string from the dashboard
4. Add `?sslmode=require` to the end if not present
5. Paste into `DATABASE_URL` in `.env`

## Project Structure

```
/ai-lms
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed data
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── (marketing)/   # Public pages
│   │   │   ├── page.tsx           # Homepage
│   │   │   ├── courses/           # Course catalog
│   │   │   │   ├── page.tsx       # Course listing
│   │   │   │   └── [slug]/        # Course detail
│   │   │   ├── categories/        # Category listing
│   │   │   ├── about/             # About page
│   │   │   ├── contact/           # Contact page
│   │   │   ├── help/              # Help center
│   │   │   ├── faqs/              # FAQs
│   │   │   ├── community/         # Community page
│   │   │   ├── privacy/           # Privacy policy
│   │   │   ├── terms/             # Terms of service
│   │   │   ├── cookies/           # Cookie policy
│   │   │   ├── refund/            # Refund policy
│   │   │   ├── accessibility/     # Accessibility statement
│   │   │   └── sitemap/           # Site map
│   │   ├── (auth)/        # Authentication pages
│   │   │   ├── login/     # Login page (3 tabs)
│   │   │   └── register/  # Registration page
│   │   ├── (dashboard)/   # Protected dashboards
│   │   │   ├── learner/   # Learner dashboard
│   │   │   ├── trainer/   # Trainer dashboard
│   │   │   ├── admin/     # Admin dashboard
│   │   │   └── superadmin/# Superadmin dashboard
│   │   └── api/           # API routes
│   │       ├── ai/        # AI chat endpoints
│   │       ├── enrollments/ # Enrollment API
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

| Route | Description | Access |
|-------|-------------|--------|
| `/` | Homepage with featured courses | Public |
| `/courses` | Course catalog with filtering | Public |
| `/courses/[slug]` | Course detail with enrollment | Public |
| `/categories` | Browse by category | Public |
| `/login` | Login page (3 tabs) | Public |
| `/register` | Registration page | Public |
| `/learner` | Learner dashboard | Learner+ |
| `/learner/courses` | Enrolled courses | Learner+ |
| `/trainer` | Trainer dashboard | Trainer+ |
| `/trainer/classes` | Manage classes | Trainer+ |
| `/admin` | Admin dashboard | Admin+ |
| `/admin/users` | User management | Admin+ |
| `/admin/courses` | Course management | Admin+ |
| `/superadmin` | Superadmin dashboard | Superadmin |
| `/superadmin/settings` | System & AI settings | Superadmin |
| `/superadmin/api-keys` | API key management | Superadmin |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run db:push` | Push schema to database |
| `npm run db:seed` | Seed database with demo data |
| `npm run db:studio` | Open Prisma Studio |
| `npm run lint` | Run ESLint |

## Database Schema

### Core Models

- **User** - Users with role-based access
- **Role** - LEARNER, TRAINER, ADMIN, SUPERADMIN
- **Course** - Courses with categories and delivery formats
- **Class** - Course instances with schedules
- **Enrollment** - User enrollments in classes
- **Lesson** - Course content organized by class
- **Material** - Lesson content (video, PDF, text, quiz)

### Gamification Models

- **GamificationProfile** - XP, level, streaks
- **Badge** - Achievement definitions
- **UserBadge** - Earned badges
- **XPTransaction** - XP history

### AI Models

- **AIConversation** - Chat sessions
- **AIMessage** - Chat messages
- **AISettings** - AI provider configuration

## Recent Updates

### January 2026

- **Theme Toggle**: Added dark/light mode toggle to header with Light, Dark, and System options
- **GitHub Pages User Guide**: Comprehensive documentation with matching portal style at /docs
- **Course Delivery Formats**: Added Instructor-Led/E-Learning and Classroom/Virtual tags
- **Course Enrollment System**: Full enrollment flow from course detail page
- **New Pages**: Added /accessibility and /sitemap pages
- **Updated Categories**: 7 categories (Real Estate, Investment, Soft Skills, Gen AI, Full Stack, Cloud, Digital Marketing)
- **Course Thumbnails**: All 21 courses now have Unsplash stock images
- **Fixed User Roles**: Seed now properly updates roles for existing users
- **Simplified Hero Buttons**: Get Started and Browse Courses buttons now work correctly
- **Admin Role**: Added administrator@learnhub.com as dedicated Admin account

### Previous Updates

- AI chatbot floating widget on all dashboard pages
- Multi-provider AI configuration (OpenAI, Gemini, Claude, etc.)
- Stripe and PayPal payment integration
- Login page with 3 tabs (Learn, Admin, Email)
- Enhanced footer with social media and payment badges

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

Make sure to set all required environment variables in your hosting platform:

- `DATABASE_URL` - Production database connection string
- `AUTH_SECRET` - Random secret for JWT signing
- `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` - Google OAuth
- `AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET` - GitHub OAuth
- `OPENAI_API_KEY` - For AI features

## Documentation

A comprehensive user guide is available as a GitHub Pages site:

**URL**: [https://alfredang.github.io/ai-lms](https://alfredang.github.io/ai-lms)

The documentation includes:
- **Getting Started**: Quick start guide and demo accounts
- **Learner Guide**: How to enroll, track progress, earn XP and badges
- **Trainer Guide**: Managing classes, grading assignments
- **Admin Guide**: User and course management
- **Superadmin Guide**: AI configuration, API keys, payments
- **Features**: AI chat, gamification, themes, course formats
- **FAQ**: Common questions and answers

### Running Docs Locally

The docs are static HTML/CSS/JS files in the `/docs` folder. To view locally:
1. Open `/docs/index.html` in a browser, or
2. Use a local server: `npx serve docs`

### GitHub Pages Deployment

To enable GitHub Pages:
1. Go to your repository Settings > Pages
2. Under "Source", select "Deploy from a branch"
3. Select "main" branch and "/docs" folder
4. Click Save

The docs will be available at `https://[username].github.io/[repo-name]/`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT
