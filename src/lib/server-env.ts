import "server-only";

/**
 * Server-only environment accessors.
 * Importing this module from a Client Component will fail the Next.js build.
 */
export function getContactMailEnv() {
  return {
    apiKey: process.env.RESEND_API_KEY?.trim() ?? "",
    from: process.env.RESEND_FROM_EMAIL?.trim() ?? "",
    to: process.env.CONTACT_EMAIL_TO?.trim() ?? "",
  };
}

export function getAssistantEnv() {
  return {
    apiKey: process.env.OPENAI_API_KEY?.trim() ?? "",
    model: process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini",
  };
}
