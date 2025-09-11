# Password Reset Functionality

This document describes the password reset implementation for TechOrbitCare.

## Features

### 🔐 Security Measures
- **Rate Limiting**: IP-based and email-based rate limiting to prevent abuse
- **Token Expiration**: Reset tokens expire after 15 minutes
- **Secure Tokens**: 64-character cryptographically secure random tokens
- **Password Validation**: Strong password requirements with strength indicator
- **Security Headers**: XSS protection, content type options, frame options
- **Attempt Limiting**: Maximum 5 reset attempts per user
- **Email Enumeration Protection**: Always returns success to prevent user discovery

### 📧 Email Integration
- **Development Mode**: Logs reset links to console
- **Production Ready**: Easy integration with SendGrid, AWS SES, or Nodemailer
- **Professional Templates**: HTML and text email templates
- **Security Warnings**: Clear instructions about link expiration and security

### 🎨 User Experience
- **Responsive Design**: Works on all devices
- **Loading States**: Clear feedback during operations
- **Error Handling**: User-friendly error messages
- **Password Strength**: Real-time password strength indicator
- **Toast Notifications**: Success and error feedback using Sonner

## API Endpoints

### POST `/api/forgot-password`
- **Purpose**: Request password reset
- **Body**: `{ email: string }`
- **Rate Limit**: 3 attempts per 15 minutes per IP, 5 emails per hour per email
- **Response**: Always returns success to prevent email enumeration

### GET `/api/validate-reset-token`
- **Purpose**: Validate reset token before showing reset form
- **Query**: `?token=string`
- **Response**: Token validity and expiration info

### POST `/api/reset-password`
- **Purpose**: Reset password with token
- **Body**: `{ token: string, password: string }`
- **Rate Limit**: 5 attempts per 15 minutes per IP
- **Response**: Success or error message

## Pages

### `/forgot-password`
- Email input form
- Rate limiting feedback
- Success state with email confirmation

### `/reset-password?token=...`
- Password reset form with confirmation
- Token validation
- Password strength indicator
- Success state with login redirect

## Database Schema

Added fields to User model:
```prisma
resetToken     String?
resetExpires   DateTime?
resetAttempts  Int      @default(0)
lastResetAttempt DateTime?
```

## Environment Variables

Required environment variables:
```env
NEXTAUTH_URL="http://localhost:3000"  # For reset links
DATABASE_URL="your-database-url"      # Database connection
```

Optional for production email:
```env
SENDGRID_API_KEY="your-sendgrid-key"
FROM_EMAIL="noreply@techorbitcare.com"
```

## Development Testing

1. Start the development server: `npm run dev`
2. Visit `/forgot-password`
3. Enter a valid email address
4. Check the console for the reset link
5. Visit the reset link to test the password reset flow

## Production Deployment

1. Set up email service (SendGrid, AWS SES, etc.)
2. Update email service configuration in `src/lib/email.ts`
3. Set production environment variables
4. Test the complete flow in production

## Security Considerations

- Reset tokens are single-use and expire after 15 minutes
- Rate limiting prevents brute force attacks
- Strong password requirements enforced
- All user inputs are validated and sanitized
- Security headers protect against common attacks
- Email enumeration is prevented by always returning success

## Monitoring

- Monitor rate limit violations
- Track password reset success rates
- Log suspicious activity (multiple failed attempts)
- Monitor email delivery rates in production
