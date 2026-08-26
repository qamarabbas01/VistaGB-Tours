import fs from "node:fs";
import path from "node:path";
import { contact, contactEmailHref, contactEmailLabel, getContact } from "@/config/contact";
import { organizationJsonLd } from "@/lib/seo";

const CONTACT_KEYS = [
  "NEXT_PUBLIC_CONTACT_EMAIL",
  "NEXT_PUBLIC_CONTACT_PHONE",
  "NEXT_PUBLIC_CONTACT_PHONE_TEL",
  "NEXT_PUBLIC_CONTACT_WHATSAPP_URL",
  "NEXT_PUBLIC_CONTACT_ADDRESS",
  "NEXT_PUBLIC_CONTACT_STREET",
  "NEXT_PUBLIC_CONTACT_CITY",
  "NEXT_PUBLIC_CONTACT_REGION",
  "NEXT_PUBLIC_CONTACT_COUNTRY",
  "NEXT_PUBLIC_CONTACT_LOCATION_LABEL",
  "NEXT_PUBLIC_CONTACT_LOCATION_COORDS",
] as const;

const SOURCE_EXT = /\.(ts|tsx|js|jsx|mjs|cjs)$/;
const SKIP_DIRS = new Set(["node_modules", ".next", "coverage"]);

function walk(dir: string, files: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, files);
    } else if (SOURCE_EXT.test(entry.name) && !entry.name.includes(".test.")) {
      files.push(full);
    }
  }
  return files;
}

describe("contact config", () => {
  const previous: Record<string, string | undefined> = {};

  beforeAll(() => {
    for (const key of CONTACT_KEYS) {
      previous[key] = process.env[key];
    }
  });

  afterEach(() => {
    for (const key of CONTACT_KEYS) {
      if (previous[key] === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = previous[key];
      }
    }
  });

  function clearContactEnv() {
    for (const key of CONTACT_KEYS) {
      delete process.env[key];
    }
  }

  it("reads trimmed public contact values from the environment", () => {
    process.env.NEXT_PUBLIC_CONTACT_EMAIL = "  hello@example.com  ";
    process.env.NEXT_PUBLIC_CONTACT_PHONE = " +92 3001234567 ";
    process.env.NEXT_PUBLIC_CONTACT_PHONE_TEL = " +923001234567 ";
    process.env.NEXT_PUBLIC_CONTACT_WHATSAPP_URL = " https://wa.me/923001234567 ";
    process.env.NEXT_PUBLIC_CONTACT_ADDRESS = " Office Road, Skardu ";
    process.env.NEXT_PUBLIC_CONTACT_STREET = " Office Road ";
    process.env.NEXT_PUBLIC_CONTACT_CITY = " Skardu ";
    process.env.NEXT_PUBLIC_CONTACT_REGION = " Gilgit-Baltistan ";
    process.env.NEXT_PUBLIC_CONTACT_COUNTRY = " PK ";
    process.env.NEXT_PUBLIC_CONTACT_LOCATION_LABEL = " Skardu, Pakistan ";
    process.env.NEXT_PUBLIC_CONTACT_LOCATION_COORDS = " 35.8°N · 75.5°E ";

    expect(getContact()).toEqual({
      email: "hello@example.com",
      phone: {
        display: "+92 3001234567",
        tel: "+923001234567",
      },
      address: "Office Road, Skardu",
      streetAddress: "Office Road",
      city: "Skardu",
      region: "Gilgit-Baltistan",
      country: "PK",
      location: {
        label: "Skardu, Pakistan",
        coords: "35.8°N · 75.5°E",
      },
      whatsappUrl: "https://wa.me/923001234567",
    });
  });

  it("derives tel and WhatsApp URLs from the display phone when omitted", () => {
    clearContactEnv();
    process.env.NEXT_PUBLIC_CONTACT_PHONE = "+92 3001234567";

    expect(contact.phone.tel).toBe("+923001234567");
    expect(contact.whatsappUrl).toBe("https://wa.me/923001234567");
  });

  it("returns empty contact fields when unset, with PK as the country default", () => {
    clearContactEnv();

    expect(getContact()).toEqual({
      email: "",
      phone: { display: "", tel: "" },
      address: "",
      streetAddress: "",
      city: "",
      region: "",
      country: "PK",
      location: { label: "", coords: "" },
      whatsappUrl: "",
    });
  });

  it("falls back to the contact page when no public email is set", () => {
    clearContactEnv();
    expect(contactEmailHref()).toBe("/contact");
    expect(contactEmailLabel()).toBe("the contact page");

    process.env.NEXT_PUBLIC_CONTACT_EMAIL = "hello@example.com";
    expect(contactEmailHref()).toBe("mailto:hello@example.com");
    expect(contactEmailLabel()).toBe("hello@example.com");
  });

  it("omits empty personal fields from organization JSON-LD", () => {
    clearContactEnv();
    const json = organizationJsonLd();
    expect(json.email).toBeUndefined();
    expect(json.telephone).toBeUndefined();
    expect(json.sameAs).toBeUndefined();
    expect(json.address).toEqual({
      "@type": "PostalAddress",
      addressCountry: "PK",
    });
  });

  it("does not hard-code personal email or phone numbers in source", () => {
    const srcRoot = path.join(process.cwd(), "src");
    const leaked = [
      /qamrabbas629@gmail\.com/i,
      /3554646853/,
      /923554646853/,
    ];

    const hits: string[] = [];
    for (const file of walk(srcRoot)) {
      const source = fs.readFileSync(file, "utf8");
      for (const pattern of leaked) {
        if (pattern.test(source)) {
          hits.push(`${path.relative(process.cwd(), file)} matches ${pattern}`);
        }
      }
    }

    expect(hits).toEqual([]);
  });
});
