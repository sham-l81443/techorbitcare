// Email service using Nodemailer
import nodemailer from 'nodemailer';

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
    text?: string;
}

// Create transporter for Gmail SMTP
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER || process.env.GMAIL_USER || process.env.SMTP_USER, // Your Gmail address
            pass: process.env.EMAIL_APP_PASSWORD || process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS, // Gmail App Password
        },
    });
};

export async function sendPasswordResetEmail(email: string, resetLink: string) {
    const emailOptions: EmailOptions = {
        to: email,
        subject: 'Reset Your Password - TechOrbitCare',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Reset Your Password</title>
                <style>
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                    }
                    .header {
                        background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                        color: white;
                        padding: 30px;
                        text-align: center;
                        border-radius: 10px 10px 0 0;
                    }
                    .content {
                        background: #f8fafc;
                        padding: 30px;
                        border-radius: 0 0 10px 10px;
                    }
                    .button {
                        display: inline-block;
                        background: #3b82f6;
                        color: white;
                        padding: 12px 30px;
                        text-decoration: none;
                        border-radius: 6px;
                        font-weight: 600;
                        margin: 20px 0;
                    }
                    .button:hover {
                        background: #2563eb;
                    }
                    .footer {
                        margin-top: 30px;
                        padding-top: 20px;
                        border-top: 1px solid #e2e8f0;
                        font-size: 14px;
                        color: #64748b;
                    }
                    .warning {
                        background: #fef3c7;
                        border: 1px solid #f59e0b;
                        padding: 15px;
                        border-radius: 6px;
                        margin: 20px 0;
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>🔧 TechOrbitCare</h1>
                    <p>Password Reset Request</p>
                </div>
                
                <div class="content">
                    <h2>Reset Your Password</h2>
                    <p>Hello,</p>
                    <p>We received a request to reset your password for your TechOrbitCare account. If you made this request, click the button below to reset your password:</p>
                    
                    <div style="text-align: center;">
                        <a href="${resetLink}" class="button">Reset My Password</a>
                    </div>
                    
                    <div class="warning">
                        <strong>⚠️ Important Security Information:</strong>
                        <ul>
                            <li>This link will expire in 15 minutes</li>
                            <li>If you didn't request this reset, please ignore this email</li>
                            <li>Never share this link with anyone</li>
                        </ul>
                    </div>
                    
                    <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
                    <p style="word-break: break-all; background: #f1f5f9; padding: 10px; border-radius: 4px; font-family: monospace;">
                        ${resetLink}
                    </p>
                    
                    <p>If you have any questions, please contact our support team.</p>
                    
                    <p>Best regards,<br>The TechOrbitCare Team</p>
                </div>
                
                <div class="footer">
                    <p>This email was sent to ${email}. If you didn't request this password reset, please ignore this email.</p>
                    <p>© 2024 TechOrbitCare. All rights reserved.</p>
                </div>
            </body>
            </html>
        `,
        text: `
Reset Your Password - TechOrbitCare

Hello,

We received a request to reset your password for your TechOrbitCare account.

To reset your password, click the following link:
${resetLink}

This link will expire in 15 minutes.

If you didn't request this password reset, please ignore this email.

Best regards,
The TechOrbitCare Team
        `
    };

    try {
        // Check if email credentials are configured
        const emailUser =  process.env.SMTP_USER;
        const emailPass =  process.env.SMTP_PASS;
        
        console.log('🔍 Debug - Email credentials check:');
        console.log('EMAIL_USER:', process.env.EMAIL_USER);
        console.log('GMAIL_USER:', process.env.GMAIL_USER);
        console.log('SMTP_USER:', process.env.SMTP_USER);
        console.log('EMAIL_APP_PASSWORD:', process.env.EMAIL_APP_PASSWORD ? '***SET***' : 'NOT SET');
        console.log('GMAIL_APP_PASSWORD:', process.env.GMAIL_APP_PASSWORD ? '***SET***' : 'NOT SET');
        console.log('SMTP_PASS:', process.env.SMTP_PASS ? '***SET***' : 'NOT SET');
        console.log('Final emailUser:', emailUser);
        console.log('Final emailPass:', emailPass ? '***SET***' : 'NOT SET');
        
        if (!emailUser || !emailPass) {
            console.log('📧 Email credentials not configured. Logging email instead:');
            console.log('=====================================');
            console.log(`To: ${emailOptions.to}`);
            console.log(`Subject: ${emailOptions.subject}`);
            console.log(`Reset Link: ${resetLink}`);
            console.log('=====================================');
            console.log('To enable email sending, set EMAIL_USER and EMAIL_APP_PASSWORD in your .env file');
            return { success: true, messageId: 'dev-' + Date.now() };
        }

        // Send actual email
        const transporter = createTransporter();
        
        const mailOptions = {
            from: `"TechOrbitCare" <${emailUser}>`,
            to: emailOptions.to,
            subject: emailOptions.subject,
            text: emailOptions.text,
            html: emailOptions.html,
        };

        console.log('📧 Attempting to send email...');
        console.log('From:', mailOptions.from);
        console.log('To:', mailOptions.to);
        console.log('Subject:', mailOptions.subject);
        
        const result = await transporter.sendMail(mailOptions);
        console.log('📧 Password reset email sent successfully!');
        console.log('Message ID:', result.messageId);
        console.log('Response:', result.response);
        
        return { success: true, messageId: result.messageId };
        
    } catch (error) {
        console.error('❌ Email sending error:');
        console.error('Error type:', error instanceof Error ? error.constructor.name : typeof error);
        console.error('Error message:', error instanceof Error ? error.message : String(error));
        console.error('Full error:', error);
        
        // Fallback to console logging if email fails
        console.log('📧 Email sending failed. Logging email instead:');
        console.log('=====================================');
        console.log(`To: ${emailOptions.to}`);
        console.log(`Subject: ${emailOptions.subject}`);
        console.log(`Reset Link: ${resetLink}`);
        console.log('=====================================');
        
        return { success: false, messageId: 'failed-' + Date.now(), error: error };
    }
}

export async function sendWelcomeEmail(email: string, name: string) {
    const emailOptions: EmailOptions = {
        to: email,
        subject: 'Welcome to TechOrbitCare!',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Welcome to TechOrbitCare</title>
                <style>
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                    }
                    .header {
                        background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                        color: white;
                        padding: 30px;
                        text-align: center;
                        border-radius: 10px 10px 0 0;
                    }
                    .content {
                        background: #f8fafc;
                        padding: 30px;
                        border-radius: 0 0 10px 10px;
                    }
                    .button {
                        display: inline-block;
                        background: #3b82f6;
                        color: white;
                        padding: 12px 30px;
                        text-decoration: none;
                        border-radius: 6px;
                        font-weight: 600;
                        margin: 20px 0;
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>🔧 TechOrbitCare</h1>
                    <p>Welcome to our mobile repair family!</p>
                </div>
                
                <div class="content">
                    <h2>Welcome, ${name}!</h2>
                    <p>Thank you for joining TechOrbitCare. We're excited to help you with all your mobile repair needs.</p>
                    
                    <p>With 15+ years of experience, we provide:</p>
                    <ul>
                        <li>Professional mobile phone repair</li>
                        <li>Screen replacement and repair</li>
                        <li>Battery replacement</li>
                        <li>Water damage recovery</li>
                        <li>Software issues resolution</li>
                    </ul>
                    
                    <p>Visit our store at Court Road, Taliparamba, Kerala, or contact us for any mobile repair needs.</p>
                    
                    <p>Best regards,<br>The TechOrbitCare Team</p>
                </div>
            </body>
            </html>
        `
    };

    try {
        // Check if email credentials are configured
        const emailUser = process.env.SMTP_USER;
        const emailPass = process.env.SMTP_PASS;
        
        if (!emailUser || !emailPass) {
            console.log('📧 Email credentials not configured. Logging welcome email instead:');
            console.log('=====================================');
            console.log(`To: ${emailOptions.to}`);
            console.log(`Subject: ${emailOptions.subject}`);
            console.log('=====================================');
            return { success: true, messageId: 'dev-' + Date.now() };
        }

        // Send actual email
        const transporter = createTransporter();
        
        const mailOptions = {
            from: `"TechOrbitCare" <${emailUser}>`,
            to: emailOptions.to,
            subject: emailOptions.subject,
            html: emailOptions.html,
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('📧 Welcome email sent successfully:', result.messageId);
        
        return { success: true, messageId: result.messageId };
        
    } catch (error) {
        console.error('Welcome email sending error:', error instanceof Error ? error.message : String(error));
        return { success: false, messageId: 'failed-' + Date.now(), error: error };
    }
}
