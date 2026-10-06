import 'server-only';

/**
 * Server-only environment accessors.
 * Importing this module from a Client Component will fail the Next.js build.
 */
export function getContactMailEnv() {
  return {
    apiKey: process.env.RESEND_API_KEY?.trim() ?? '',
    from: process.env.RESEND_FROM_EMAIL?.trim() ?? '',
    to: process.env.CONTACT_EMAIL_TO?.trim() ?? '',
  };
}

/**
 * Signs the contact form token. A dedicated secret wins. Otherwise the Resend
 * key is reused so production still rejects forged tokens. Local and test
 * runs without either value use a fixed development secret.
 */
export function getContactFormSecret() {
  const dedicated = process.env.CONTACT_FORM_SECRET?.trim();
  if (dedicated) return dedicated;

  const resend = process.env.RESEND_API_KEY?.trim();
  if (resend) return resend;

  if (process.env.NODE_ENV === 'production') return '';
  return 'dev-contact-form-secret';
}

export function getAssistantEnv() {
  return {
    apiKey: process.env.OPENAI_API_KEY?.trim() ?? '',
    model: process.env.OPENAI_MODEL?.trim() || 'gpt-4o-mini',
  };
}
