/**
 * @jest-environment node
 */

jest.mock("server-only", () => ({}));

import { getAssistantEnv, getContactMailEnv } from "@/lib/server-env";

const KEYS = [
  "RESEND_API_KEY",
  "RESEND_FROM_EMAIL",
  "CONTACT_EMAIL_TO",
  "OPENAI_API_KEY",
  "OPENAI_MODEL",
] as const;

describe("server-env", () => {
  const previous: Record<string, string | undefined> = {};

  beforeAll(() => {
    for (const key of KEYS) {
      previous[key] = process.env[key];
    }
  });

  afterEach(() => {
    for (const key of KEYS) {
      if (previous[key] === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = previous[key];
      }
    }
  });

  it("reads trimmed Resend credentials from the server environment", () => {
    process.env.RESEND_API_KEY = "  re_test_key  ";
    process.env.RESEND_FROM_EMAIL = " VistaGB Tours <from@example.com> ";
    process.env.CONTACT_EMAIL_TO = " inbox@example.com ";

    expect(getContactMailEnv()).toEqual({
      apiKey: "re_test_key",
      from: "VistaGB Tours <from@example.com>",
      to: "inbox@example.com",
    });
  });

  it("returns empty strings when contact mail env is unset", () => {
    delete process.env.RESEND_API_KEY;
    delete process.env.RESEND_FROM_EMAIL;
    delete process.env.CONTACT_EMAIL_TO;

    expect(getContactMailEnv()).toEqual({
      apiKey: "",
      from: "",
      to: "",
    });
  });

  it("reads the OpenAI key and defaults the model", () => {
    process.env.OPENAI_API_KEY = " sk-test ";
    delete process.env.OPENAI_MODEL;

    expect(getAssistantEnv()).toEqual({
      apiKey: "sk-test",
      model: "gpt-4o-mini",
    });

    process.env.OPENAI_MODEL = " gpt-4o ";
    expect(getAssistantEnv().model).toBe("gpt-4o");
  });
});
