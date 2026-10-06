/**
 * @jest-environment node
 */

jest.mock('server-only', () => ({}));

import {
  getAssistantEnv,
  getContactFormSecret,
  getContactMailEnv,
} from '@/lib/server-env';

const KEYS = [
  'RESEND_API_KEY',
  'RESEND_FROM_EMAIL',
  'CONTACT_EMAIL_TO',
  'CONTACT_FORM_SECRET',
  'OPENAI_API_KEY',
  'OPENAI_MODEL',
] as const;

describe('server-env', () => {
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

  it('reads trimmed Resend credentials from the server environment', () => {
    process.env.RESEND_API_KEY = '  re_test_key  ';
    process.env.RESEND_FROM_EMAIL = ' VistaGB Tours <from@example.com> ';
    process.env.CONTACT_EMAIL_TO = ' inbox@example.com ';

    expect(getContactMailEnv()).toEqual({
      apiKey: 're_test_key',
      from: 'VistaGB Tours <from@example.com>',
      to: 'inbox@example.com',
    });
  });

  it('returns empty strings when contact mail env is unset', () => {
    delete process.env.RESEND_API_KEY;
    delete process.env.RESEND_FROM_EMAIL;
    delete process.env.CONTACT_EMAIL_TO;

    expect(getContactMailEnv()).toEqual({
      apiKey: '',
      from: '',
      to: '',
    });
  });

  it('reads the OpenAI key and defaults the model', () => {
    process.env.OPENAI_API_KEY = ' sk-test ';
    delete process.env.OPENAI_MODEL;

    expect(getAssistantEnv()).toEqual({
      apiKey: 'sk-test',
      model: 'gpt-4o-mini',
    });

    process.env.OPENAI_MODEL = ' gpt-4o ';
    expect(getAssistantEnv().model).toBe('gpt-4o');
  });

  it('prefers a dedicated contact form secret, then the Resend key', () => {
    process.env.CONTACT_FORM_SECRET = '  form-secret  ';
    process.env.RESEND_API_KEY = 're_test_key';
    expect(getContactFormSecret()).toBe('form-secret');

    delete process.env.CONTACT_FORM_SECRET;
    expect(getContactFormSecret()).toBe('re_test_key');
  });

  it('uses a development secret only outside production', () => {
    delete process.env.CONTACT_FORM_SECRET;
    delete process.env.RESEND_API_KEY;
    expect(getContactFormSecret()).toBe('dev-contact-form-secret');

    const env = process.env as Record<string, string | undefined>;
    const previous = env.NODE_ENV;
    env.NODE_ENV = 'production';
    expect(getContactFormSecret()).toBe('');
    env.NODE_ENV = previous;
  });
});
