import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY || '');

// Email types
export type EmailType = 
  | 'verification'
  | 'welcome'
  | 'password_reset'
  | 'checkin_reminder'
  | 'beneficiary_notification';

// Email templates
interface EmailTemplate {
  subject: string;
  html: string;
}

const getEmailTemplate = (type: EmailType, data: Record<string, string>): EmailTemplate => {
  const baseUrl = import.meta.env.VITE_APP_URL || 'http://localhost:5173';
  const companyName = 'Vaulta';

  const templates: Record<EmailType, EmailTemplate> = {
    verification: {
      subject: 'Verify your Vaulta account',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #0B0F1A; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0B0F1A; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 500px; background-color: #141929; border-radius: 16px; border: 1px solid rgba(255,255,255,0.08);">
                  <!-- Logo -->
                  <tr>
                    <td style="padding: 40px 40px 20px; text-align: center;">
                      <h1 style="color: #D4A853; margin: 0; font-size: 28px; font-family: 'Playfair Display', serif;">${companyName}</h1>
                    </td>
                  </tr>
                  <!-- Content -->
                  <tr>
                    <td style="padding: 20px 40px;">
                      <h2 style="color: #ffffff; margin: 0 0 16px; font-size: 20px;">Verify your email address</h2>
                      <p style="color: rgba(255,255,255,0.5); margin: 0 0 24px; line-height: 1.6;">
                        Welcome to ${companyName}! Please verify your email address to get started.
                      </p>
                      <a href="${data.verificationLink}" style="display: inline-block; background-color: #D4A853; color: #0B0F1A; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-weight: 600; margin-bottom: 24px;">
                        Verify Email
                      </a>
                      <p style="color: rgba(255,255,255,0.4); margin: 0; font-size: 13px;">
                        Or copy this link: ${data.verificationLink}
                      </p>
                    </td>
                  </tr>
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 20px 40px 40px; border-top: 1px solid rgba(255,255,255,0.08);">
                      <p style="color: rgba(255,255,255,0.3); margin: 0; font-size: 12px; text-align: center;">
                        If you didn't create an account with ${companyName}, you can safely ignore this email.
                      </p>
                      <p style="color: rgba(255,255,255,0.3); margin: 12px 0 0; font-size: 12px; text-align: center;">
                        © ${new Date().getFullYear()} ${companyName}. All rights reserved.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    },

    welcome: {
      subject: 'Welcome to Vaulta - Your Digital Vault is Ready',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #0B0F1A; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0B0F1A; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 500px; background-color: #141929; border-radius: 16px; border: 1px solid rgba(255,255,255,0.08);">
                  <tr>
                    <td style="padding: 40px 40px 20px; text-align: center;">
                      <h1 style="color: #D4A853; margin: 0; font-size: 28px; font-family: 'Playfair Display', serif;">${companyName}</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 20px 40px;">
                      <h2 style="color: #ffffff; margin: 0 0 16px; font-size: 20px;">Welcome, ${data.name}!</h2>
                      <p style="color: rgba(255,255,255,0.5); margin: 0 0 16px; line-height: 1.6;">
                        Your digital vault is now ready. Start securing your important digital assets, crypto wallets, documents, and messages for your loved ones.
                      </p>
                      <a href="${baseUrl}/app" style="display: inline-block; background-color: #D4A853; color: #0B0F1A; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-weight: 600;">
                        Get Started
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 20px 40px 40px; border-top: 1px solid rgba(255,255,255,0.08);">
                      <p style="color: rgba(255,255,255,0.3); margin: 0; font-size: 12px; text-align: center;">
                        © ${new Date().getFullYear()} ${companyName}. All rights reserved.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    },

    password_reset: {
      subject: 'Reset your Vaulta password',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #0B0F1A; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0B0F1A; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 500px; background-color: #141929; border-radius: 16px; border: 1px solid rgba(255,255,255,0.08);">
                  <tr>
                    <td style="padding: 40px 40px 20px; text-align: center;">
                      <h1 style="color: #D4A853; margin: 0; font-size: 28px; font-family: 'Playfair Display', serif;">${companyName}</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 20px 40px;">
                      <h2 style="color: #ffffff; margin: 0 0 16px; font-size: 20px;">Reset your password</h2>
                      <p style="color: rgba(255,255,255,0.5); margin: 0 0 24px; line-height: 1.6;">
                        Click the button below to reset your password. This link will expire in 1 hour.
                      </p>
                      <a href="${data.resetLink}" style="display: inline-block; background-color: #D4A853; color: #0B0F1A; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-weight: 600;">
                        Reset Password
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 20px 40px 40px; border-top: 1px solid rgba(255,255,255,0.08);">
                      <p style="color: rgba(255,255,255,0.3); margin: 0; font-size: 12px; text-align: center;">
                        If you didn't request this, please ignore this email.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    },

    checkin_reminder: {
      subject: 'Vaulta Check-in Reminder - Keep Your Vault Active',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #0B0F1A; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0B0F1A; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 500px; background-color: #141929; border-radius: 16px; border: 1px solid rgba(255,255,255,0.08);">
                  <tr>
                    <td style="padding: 40px 40px 20px; text-align: center;">
                      <h1 style="color: #D4A853; margin: 0; font-size: 28px; font-family: 'Playfair Display', serif;">${companyName}</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 20px 40px;">
                      <h2 style="color: #ffffff; margin: 0 0 16px; font-size: 20px;">Check-in Reminder</h2>
                      <p style="color: rgba(255,255,255,0.5); margin: 0 0 16px; line-height: 1.6;">
                        Hi ${data.name}, this is a friendly reminder to check in to keep your vault active.
                      </p>
                      <a href="${baseUrl}/app" style="display: inline-block; background-color: #D4A853; color: #0B0F1A; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-weight: 600;">
                        Check In Now
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 20px 40px 40px; border-top: 1px solid rgba(255,255,255,0.08);">
                      <p style="color: rgba(255,255,255,0.3); margin: 0; font-size: 12px; text-align: center;">
                        © ${new Date().getFullYear()} ${companyName}. All rights reserved.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    },

    beneficiary_notification: {
      subject: 'You have been added as a beneficiary on Vaulta',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #0B0F1A; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0B0F1A; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 500px; background-color: #141929; border-radius: 16px; border: 1px solid rgba(255,255,255,0.08);">
                  <tr>
                    <td style="padding: 40px 40px 20px; text-align: center;">
                      <h1 style="color: #D4A853; margin: 0; font-size: 28px; font-family: 'Playfair Display', serif;">${companyName}</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 20px 40px;">
                      <h2 style="color: #ffffff; margin: 0 0 16px; font-size: 20px;">You've been named as a beneficiary</h2>
                      <p style="color: rgba(255,255,255,0.5); margin: 0 0 16px; line-height: 1.6;">
                        ${data.ownerName} has added you as a beneficiary on Vaulta. This means they've designated you to receive access to their digital assets in the future.
                      </p>
                      <a href="${baseUrl}/login" style="display: inline-block; background-color: #D4A853; color: #0B0F1A; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-weight: 600;">
                        Learn More
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 20px 40px 40px; border-top: 1px solid rgba(255,255,255,0.08);">
                      <p style="color: rgba(255,255,255,0.3); margin: 0; font-size: 12px; text-align: center;">
                        © ${new Date().getFullYear()} ${companyName}. All rights reserved.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    },
  };

  return templates[type];
};

// Send email function
export const sendEmail = async (
  to: string,
  type: EmailType,
  data: Record<string, string> = {}
): Promise<{ success: boolean; error?: string }> => {
  const template = getEmailTemplate(type, data);

  // Check if Resend API key is configured
  if (!import.meta.env.VITE_RESEND_API_KEY) {
    console.warn('⚠️  Resend API key not configured. Email not sent.');
    console.log(`[Email Mock] To: ${to}`);
    console.log(`[Email Mock] Subject: ${template.subject}`);
    return { success: true };
  }

  try {
    const { data: response, error } = await resend.emails.send({
      from: 'Vaulta <onboarding@resend.dev>', // Use Resend's test domain or your verified domain
      to,
      subject: template.subject,
      html: template.html,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error: error.message };
    }

    console.log('Email sent successfully:', response);
    return { success: true };
  } catch (err) {
    console.error('Failed to send email:', err);
    return { success: false, error: 'Failed to send email' };
  }
};

// Convenience functions for common email types
export const sendVerificationEmail = (to: string, verificationLink: string) => 
  sendEmail(to, 'verification', { verificationLink });

export const sendWelcomeEmail = (to: string, name: string) => 
  sendEmail(to, 'welcome', { name });

export const sendPasswordResetEmail = (to: string, resetLink: string) => 
  sendEmail(to, 'password_reset', { resetLink });

export const sendCheckinReminder = (to: string, name: string) => 
  sendEmail(to, 'checkin_reminder', { name });

export const sendBeneficiaryNotification = (
  to: string, 
  ownerName: string
) => sendEmail(to, 'beneficiary_notification', { ownerName });
