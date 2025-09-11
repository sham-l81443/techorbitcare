# Google OAuth Setup Guide

This guide will help you set up Google OAuth authentication for the TechOrbitCare application.

## Prerequisites

1. A Google Cloud Console account
2. A Google account with access to Google Cloud Console

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" and then "New Project"
3. Enter project name: "TechOrbitCare" (or any name you prefer)
4. Click "Create"

## Step 2: Enable Google+ API

1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google+ API" and click on it
3. Click "Enable"

## Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. If prompted, configure the OAuth consent screen first:
   - Choose "External" user type
   - Fill in the required fields:
     - App name: "TechOrbitCare"
     - User support email: your email
     - Developer contact information: your email
   - Add scopes: `../auth/userinfo.email` and `../auth/userinfo.profile`
   - Add test users (your email) if in testing mode

4. For the OAuth client:
   - Application type: "Web application"
   - Name: "TechOrbitCare Web Client"
   - Authorized JavaScript origins: `http://localhost:3002`
   - Authorized redirect URIs: `http://localhost:3002/api/auth/callback/google`

## Step 4: Get Your Credentials

1. After creating the OAuth client, you'll see a popup with your credentials
2. Copy the "Client ID" and "Client Secret"
3. Save them securely

## Step 5: Configure Environment Variables

Add these environment variables to your `.env.local` file:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here

# NextAuth.js
NEXTAUTH_URL=http://localhost:3002
NEXTAUTH_SECRET=your-secret-key-here

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/techorbitcare"

# Email Configuration
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Node Environment
NODE_ENV=development
PORT=3002
```

## Step 6: Test the Integration

1. Start your development server: `npm run dev`
2. Go to `http://localhost:3002/login`
3. Click "Continue with Google"
4. You should be redirected to Google's OAuth consent screen
5. After authorization, you should be redirected back to your dashboard

## Production Setup

For production deployment:

1. Update the OAuth client settings in Google Cloud Console:
   - Add your production domain to "Authorized JavaScript origins"
   - Add `https://yourdomain.com/api/auth/callback/google` to "Authorized redirect URIs"

2. Update your environment variables:
   - Set `NEXTAUTH_URL` to your production domain
   - Use production database URL
   - Use production email credentials

## Troubleshooting

### Common Issues:

1. **"redirect_uri_mismatch" error**
   - Ensure the redirect URI in Google Console matches exactly: `http://localhost:3002/api/auth/callback/google`

2. **"invalid_client" error**
   - Check that your `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are correct
   - Ensure there are no extra spaces or characters

3. **"access_denied" error**
   - Check that your OAuth consent screen is properly configured
   - Ensure the user is added to test users (if in testing mode)

4. **Database errors**
   - Run `npx prisma migrate dev` to apply the new schema changes
   - Ensure your database is running and accessible

### Testing with Different Users:

1. Add test users in Google Cloud Console > OAuth consent screen
2. Or publish your app (for production use)

## Security Notes

- Never commit your `.env.local` file to version control
- Use strong, unique values for `NEXTAUTH_SECRET`
- Regularly rotate your OAuth credentials
- Monitor your Google Cloud Console for any suspicious activity

## Features Implemented

✅ Google OAuth provider integration
✅ Automatic user creation for Google users
✅ Account linking for existing email users
✅ Secure session management
✅ Database integration with Prisma
✅ UI components for Google login
✅ Error handling and validation

The Google OAuth integration is now ready to use! Users can sign in with their Google accounts, and the system will automatically create user records or link existing accounts.
