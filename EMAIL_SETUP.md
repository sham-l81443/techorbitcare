# Environment Setup for Authentication & Email

This application requires environment configuration for authentication and OTP verification.

## Environment Variables Required

Add these variables to your `.env` file:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/techorbitcare"

# JWT Secret for authentication
JWT_SECRET="your-super-secret-jwt-key-here"

# Email Configuration (for OTP sending)
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
```

## Gmail Setup (Recommended)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password as `SMTP_PASS`

## Alternative SMTP Providers

### SendGrid
```env
SMTP_USER="apikey"
SMTP_PASS="your-sendgrid-api-key"
```

### Mailgun
```env
SMTP_USER="your-mailgun-smtp-username"
SMTP_PASS="your-mailgun-smtp-password"
```

### AWS SES
```env
SMTP_USER="your-aws-ses-smtp-username"
SMTP_PASS="your-aws-ses-smtp-password"
```

## Testing Email Functionality

1. Set up your environment variables
2. Start the development server: `npm run dev`
3. Navigate to `/signup` and create a test account
4. Check your email for the OTP verification code

## Troubleshooting

- **"Failed to send verification email"**: Check your SMTP credentials
- **"Authentication failed"**: Verify your email and password are correct
- **"Connection timeout"**: Check your internet connection and SMTP server settings

## Security Notes

- Never commit your `.env` file to version control
- Use app passwords instead of your main email password
- Consider using a dedicated email service for production
