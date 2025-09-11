# Email Setup Guide for Password Reset

This guide will help you set up email sending for the password reset functionality.

## Option 1: Gmail SMTP (Recommended for Development)

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account settings
2. Navigate to Security
3. Enable 2-Factor Authentication if not already enabled

### Step 2: Generate App Password
1. In Google Account settings, go to Security
2. Under "2-Step Verification", click "App passwords"
3. Select "Mail" and "Other (Custom name)"
4. Enter "TechOrbitCare" as the name
5. Copy the generated 16-character password

### Step 3: Add Environment Variables
Add these to your `.env.local` file (create it if it doesn't exist):

```env
# Email Configuration
EMAIL_USER="your-gmail@gmail.com"
EMAIL_APP_PASSWORD="your-16-character-app-password"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

### Step 4: Test Email Sending
1. Restart your development server: `npm run dev`
2. Go to `/forgot-password`
3. Enter your email address
4. Check your inbox for the reset link!

## Option 2: Other Email Services

### SendGrid
```env
SENDGRID_API_KEY="your-sendgrid-api-key"
FROM_EMAIL="noreply@yourdomain.com"
```

### AWS SES
```env
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_REGION="us-east-1"
FROM_EMAIL="noreply@yourdomain.com"
```

### Nodemailer with Custom SMTP
```env
SMTP_HOST="smtp.your-provider.com"
SMTP_PORT="587"
SMTP_USER="your-email@domain.com"
SMTP_PASS="your-password"
FROM_EMAIL="noreply@yourdomain.com"
```

## Troubleshooting

### Gmail Issues
- **"Less secure app access"**: Use App Passwords instead
- **"Invalid credentials"**: Double-check your App Password
- **"Connection timeout"**: Check your internet connection

### General Issues
- **Emails not sending**: Check console logs for error messages
- **Spam folder**: Check your spam/junk folder
- **Rate limiting**: Gmail has daily sending limits

## Security Notes

- Never commit your `.env.local` file to version control
- Use App Passwords, not your main Gmail password
- Consider using a dedicated email service for production
- Monitor email sending rates and costs

## Testing

1. **Development Mode**: If email credentials aren't set, reset links will be logged to console
2. **Production Mode**: Emails will be sent to the actual email addresses
3. **Error Handling**: Failed emails will fallback to console logging

## Production Deployment

For production, consider:
- Using a dedicated email service (SendGrid, AWS SES, etc.)
- Setting up proper DNS records (SPF, DKIM, DMARC)
- Monitoring email delivery rates
- Implementing email templates and branding
