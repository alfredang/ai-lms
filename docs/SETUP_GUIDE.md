# Complete Setup Guide for LearnHub LMS

This guide walks you through setting up all third-party services required to run the LearnHub LMS platform.

## Table of Contents

1. [Database (Neon PostgreSQL)](#1-database-neon-postgresql)
2. [Authentication (Google & GitHub OAuth)](#2-authentication-google--github-oauth)
3. [AI Chatbot (OpenAI API)](#3-ai-chatbot-openai-api)
4. [Payment Processing (Stripe)](#4-payment-processing-stripe)
5. [Payment Processing (PayPal)](#5-payment-processing-paypal)
6. [Email Service (Resend)](#6-email-service-resend)
7. [File Storage (Vercel Blob)](#7-file-storage-vercel-blob)
8. [Deployment (Vercel)](#8-deployment-vercel)
9. [Environment Variables Summary](#9-environment-variables-summary)

---

## 1. Database (Neon PostgreSQL)

Neon provides serverless PostgreSQL, perfect for Next.js applications.

### Steps:

1. **Create Account**
   - Go to [https://neon.tech](https://neon.tech)
   - Sign up with GitHub or email

2. **Create Project**
   - Click "New Project"
   - Name: `learnhub-lms`
   - Region: Choose closest to your users
   - Click "Create Project"

3. **Get Connection String**
   - Go to "Dashboard" → "Connection Details"
   - Copy the connection string (it looks like):
   ```
   postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```

4. **Add to Environment**
   ```env
   DATABASE_URL="postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require"
   ```

5. **Initialize Database**
   ```bash
   npm run db:push
   npm run db:seed
   ```

---

## 2. Authentication (Google & GitHub OAuth)

### Google OAuth Setup

1. **Go to Google Cloud Console**
   - Visit [https://console.cloud.google.com](https://console.cloud.google.com)
   - Create a new project or select existing

2. **Enable OAuth Consent Screen**
   - Navigate to "APIs & Services" → "OAuth consent screen"
   - Select "External" user type
   - Fill in:
     - App name: `LearnHub`
     - User support email: Your email
     - Developer contact: Your email
   - Add scopes: `email`, `profile`, `openid`
   - Save and continue

3. **Create OAuth Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Application type: "Web application"
   - Name: `LearnHub Web Client`
   - Authorized JavaScript origins:
     ```
     http://localhost:3000
     https://your-domain.vercel.app
     ```
   - Authorized redirect URIs:
     ```
     http://localhost:3000/api/auth/callback/google
     https://your-domain.vercel.app/api/auth/callback/google
     ```
   - Click "Create"

4. **Copy Credentials**
   ```env
   AUTH_GOOGLE_ID="your-client-id.apps.googleusercontent.com"
   AUTH_GOOGLE_SECRET="your-client-secret"
   ```

### GitHub OAuth Setup

1. **Go to GitHub Developer Settings**
   - Visit [https://github.com/settings/developers](https://github.com/settings/developers)
   - Click "OAuth Apps" → "New OAuth App"

2. **Register Application**
   - Application name: `LearnHub`
   - Homepage URL: `https://your-domain.vercel.app`
   - Authorization callback URL:
     ```
     http://localhost:3000/api/auth/callback/github
     ```
     (For production, add another app or update URL)

3. **Get Credentials**
   - After creating, you'll see Client ID
   - Click "Generate a new client secret"
   - Copy both values

4. **Add to Environment**
   ```env
   AUTH_GITHUB_ID="your-github-client-id"
   AUTH_GITHUB_SECRET="your-github-client-secret"
   ```

### Generate Auth Secret

```bash
# Generate a secure random string
openssl rand -base64 32
```

```env
AUTH_SECRET="your-generated-secret"
```

---

## 3. AI Chatbot (OpenAI API)

### OpenAI Setup

1. **Create Account**
   - Go to [https://platform.openai.com](https://platform.openai.com)
   - Sign up or log in

2. **Get API Key**
   - Navigate to "API Keys" in the sidebar
   - Click "Create new secret key"
   - Name: `LearnHub Production`
   - Copy the key (you won't see it again!)

3. **Add Credits**
   - Go to "Billing" → "Add payment method"
   - Add credits ($5-20 to start)

4. **Add to Environment**
   ```env
   OPENAI_API_KEY="sk-your-api-key"
   OPENAI_BASE_URL="https://api.openai.com/v1"
   ```

### Alternative AI Providers

#### Anthropic (Claude)
1. Go to [https://console.anthropic.com](https://console.anthropic.com)
2. Create account and add payment method
3. Generate API key
```env
ANTHROPIC_API_KEY="sk-ant-your-key"
```

#### Google Gemini
1. Go to [https://aistudio.google.com](https://aistudio.google.com)
2. Get API key from "Get API key"
```env
GOOGLE_AI_API_KEY="your-gemini-key"
```

#### OpenRouter (Multiple Models)
1. Go to [https://openrouter.ai](https://openrouter.ai)
2. Sign up and add credits
3. Get API key
```env
OPENROUTER_API_KEY="sk-or-your-key"
```

---

## 4. Payment Processing (Stripe)

### Stripe Setup

1. **Create Account**
   - Go to [https://dashboard.stripe.com](https://dashboard.stripe.com)
   - Sign up with email

2. **Get API Keys**
   - Go to "Developers" → "API keys"
   - Copy both Publishable key and Secret key
   - For testing, use "Test mode" keys (toggle at top)

3. **Add to Environment**
   ```env
   STRIPE_PUBLISHABLE_KEY="pk_test_your-publishable-key"
   STRIPE_SECRET_KEY="sk_test_your-secret-key"
   ```

4. **Set Up Webhook (Production)**
   - Go to "Developers" → "Webhooks"
   - Click "Add endpoint"
   - URL: `https://your-domain.vercel.app/api/webhooks/stripe`
   - Events to listen:
     - `checkout.session.completed`
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
   - Copy Webhook signing secret

   ```env
   STRIPE_WEBHOOK_SECRET="whsec_your-webhook-secret"
   ```

5. **Test Card Numbers**
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
   - Requires Auth: `4000 0025 0000 3155`

### Going Live with Stripe

1. Complete account verification in Stripe Dashboard
2. Provide business details
3. Add bank account for payouts
4. Switch to "Live mode" and update API keys

---

## 5. Payment Processing (PayPal)

### PayPal Developer Setup

1. **Create Developer Account**
   - Go to [https://developer.paypal.com](https://developer.paypal.com)
   - Log in with PayPal account or create one

2. **Create App**
   - Go to "Apps & Credentials"
   - Click "Create App"
   - App Name: `LearnHub`
   - App Type: "Merchant"

3. **Get Credentials (Sandbox)**
   - Select your app
   - Copy Client ID and Secret from "Sandbox" tab

4. **Add to Environment**
   ```env
   PAYPAL_CLIENT_ID="your-sandbox-client-id"
   PAYPAL_CLIENT_SECRET="your-sandbox-secret"
   PAYPAL_MODE="sandbox"  # Change to "live" for production
   ```

5. **Sandbox Test Accounts**
   - Go to "Sandbox" → "Accounts"
   - Use provided test buyer/seller accounts
   - Or create custom test accounts

### Going Live with PayPal

1. Complete business verification
2. Switch to "Live" credentials in dashboard
3. Update environment variables with live keys
4. Set `PAYPAL_MODE="live"`

---

## 6. Email Service (Resend)

### Resend Setup

1. **Create Account**
   - Go to [https://resend.com](https://resend.com)
   - Sign up (free tier: 3,000 emails/month)

2. **Verify Domain (Recommended)**
   - Go to "Domains" → "Add Domain"
   - Add DNS records provided by Resend
   - Wait for verification (can take up to 48 hours)

3. **Get API Key**
   - Go to "API Keys"
   - Click "Create API Key"
   - Name: `LearnHub Production`
   - Permission: "Full access"

4. **Add to Environment**
   ```env
   RESEND_API_KEY="re_your-api-key"
   EMAIL_FROM="noreply@yourdomain.com"
   ```

### Alternative: Without Custom Domain

Use Resend's default domain for testing:
```env
EMAIL_FROM="onboarding@resend.dev"
```

---

## 7. File Storage (Vercel Blob)

### Vercel Blob Setup

1. **Enable in Vercel Dashboard**
   - Go to your project in Vercel
   - Navigate to "Storage" tab
   - Click "Create Database" → "Blob"

2. **Get Token**
   - Vercel automatically adds the token to your project
   - For local development, copy from Vercel Dashboard

3. **Add to Environment**
   ```env
   BLOB_READ_WRITE_TOKEN="vercel_blob_your-token"
   ```

### Alternative: Cloudflare R2 or AWS S3

```env
# AWS S3
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_REGION="us-east-1"
AWS_BUCKET_NAME="learnhub-uploads"
```

---

## 8. Deployment (Vercel)

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   Or connect your GitHub repo in Vercel Dashboard

4. **Add Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add all variables from your `.env` file
   - Select environments: Production, Preview, Development

5. **Set Up Custom Domain (Optional)**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

---

## 9. Environment Variables Summary

Create a `.env` file with all variables:

```env
# ===================
# DATABASE
# ===================
DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"

# ===================
# AUTHENTICATION
# ===================
AUTH_SECRET="your-32-char-secret"
AUTH_URL="http://localhost:3000"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"

# GitHub OAuth
AUTH_GITHUB_ID="your-github-client-id"
AUTH_GITHUB_SECRET="your-github-client-secret"

# ===================
# AI PROVIDERS
# ===================
OPENAI_API_KEY="sk-your-openai-key"
OPENAI_BASE_URL="https://api.openai.com/v1"

# Optional: Alternative AI providers
# ANTHROPIC_API_KEY="sk-ant-your-key"
# GOOGLE_AI_API_KEY="your-gemini-key"
# OPENROUTER_API_KEY="sk-or-your-key"

# ===================
# PAYMENTS
# ===================
# Stripe
STRIPE_PUBLISHABLE_KEY="pk_test_your-key"
STRIPE_SECRET_KEY="sk_test_your-key"
STRIPE_WEBHOOK_SECRET="whsec_your-secret"

# PayPal
PAYPAL_CLIENT_ID="your-paypal-client-id"
PAYPAL_CLIENT_SECRET="your-paypal-secret"
PAYPAL_MODE="sandbox"

# ===================
# EMAIL
# ===================
RESEND_API_KEY="re_your-key"
EMAIL_FROM="noreply@yourdomain.com"

# ===================
# FILE STORAGE
# ===================
BLOB_READ_WRITE_TOKEN="vercel_blob_your-token"

# ===================
# APP CONFIG
# ===================
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## Quick Start Checklist

- [ ] Set up Neon database and run migrations
- [ ] Configure Google OAuth credentials
- [ ] Configure GitHub OAuth credentials
- [ ] Get OpenAI API key
- [ ] Set up Stripe account and get API keys
- [ ] Set up PayPal developer account
- [ ] Configure Resend for emails
- [ ] Deploy to Vercel
- [ ] Add all environment variables to Vercel
- [ ] Test authentication flow
- [ ] Test payment flow (sandbox mode)
- [ ] Test email sending
- [ ] Test AI chatbot

---

## Troubleshooting

### Database Connection Issues
- Check if DATABASE_URL is correct
- Ensure SSL mode is enabled for Neon
- Verify IP is allowed in Neon dashboard

### OAuth Not Working
- Verify callback URLs match exactly
- Check if app is in "Testing" or "Production" mode
- Ensure all required scopes are added

### Payments Not Processing
- Use test card numbers in sandbox mode
- Check webhook is receiving events
- Verify API keys are for correct mode (test/live)

### AI Chat Not Responding
- Verify API key has credits
- Check rate limits haven't been exceeded
- Ensure correct model name is configured

### Emails Not Sending
- Verify domain is verified in Resend
- Check API key permissions
- Review Resend logs for errors

---

## Cost Estimates (Monthly)

| Service | Free Tier | Estimated Cost |
|---------|-----------|----------------|
| Neon DB | 0.5GB free | $0 - $19 |
| Vercel | 100GB bandwidth | $0 - $20 |
| OpenAI | None | $5 - $50 |
| Stripe | 2.9% + $0.30/txn | Per transaction |
| PayPal | 2.99% + $0.49/txn | Per transaction |
| Resend | 3K emails/mo | $0 - $20 |
| Blob Storage | 1GB free | $0 - $5 |

**Total estimated:** $5 - $100/month depending on usage

---

## Security Best Practices

1. **Never commit `.env` files** - Add to `.gitignore`
2. **Use different keys for dev/production**
3. **Rotate API keys periodically**
4. **Enable 2FA on all accounts**
5. **Set up billing alerts** on cloud services
6. **Use environment-specific variables** in Vercel

---

## Support Links

- Neon Docs: https://neon.tech/docs
- NextAuth Docs: https://authjs.dev
- OpenAI Docs: https://platform.openai.com/docs
- Stripe Docs: https://stripe.com/docs
- PayPal Docs: https://developer.paypal.com/docs
- Resend Docs: https://resend.com/docs
- Vercel Docs: https://vercel.com/docs
