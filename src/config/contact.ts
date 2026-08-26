/**
 * Public business contact details shown on the site (footer, contact page, JSON-LD).
 *
 * Values come from NEXT_PUBLIC_* environment variables so personal email/phone
 * are not committed. They are public by design once rendered — do not put
 * mailbox credentials or API keys here.
 */

function readPublic(value: string | undefined): string {
  return value?.trim() ?? "";
}

function telFromDisplay(display: string): string {
  const digits = display.replace(/\D/g, "");
  return digits ? `+${digits}` : "";
}

function whatsappFromTel(tel: string): string {
  const digits = tel.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : "";
}

export type ContactConfig = {
  email: string;
  phone: {
    display: string;
    tel: string;
  };
  address: string;
  streetAddress: string;
  city: string;
  region: string;
  country: string;
  location: {
    label: string;
    coords: string;
  };
  whatsappUrl: string;
};

export function getContact(): ContactConfig {
  const email = readPublic(process.env.NEXT_PUBLIC_CONTACT_EMAIL);
  const phoneDisplay = readPublic(process.env.NEXT_PUBLIC_CONTACT_PHONE);
  const phoneTel =
    readPublic(process.env.NEXT_PUBLIC_CONTACT_PHONE_TEL) ||
    telFromDisplay(phoneDisplay);
  const whatsappUrl =
    readPublic(process.env.NEXT_PUBLIC_CONTACT_WHATSAPP_URL) ||
    whatsappFromTel(phoneTel);

  return {
    email,
    phone: {
      display: phoneDisplay,
      tel: phoneTel,
    },
    address: readPublic(process.env.NEXT_PUBLIC_CONTACT_ADDRESS),
    streetAddress: readPublic(process.env.NEXT_PUBLIC_CONTACT_STREET),
    city: readPublic(process.env.NEXT_PUBLIC_CONTACT_CITY),
    region: readPublic(process.env.NEXT_PUBLIC_CONTACT_REGION),
    country: readPublic(process.env.NEXT_PUBLIC_CONTACT_COUNTRY) || "PK",
    location: {
      label: readPublic(process.env.NEXT_PUBLIC_CONTACT_LOCATION_LABEL),
      coords: readPublic(process.env.NEXT_PUBLIC_CONTACT_LOCATION_COORDS),
    },
    whatsappUrl,
  };
}

export function contactEmailHref(): string {
  const email = getContact().email;
  return email ? `mailto:${email}` : "/contact";
}

export function contactEmailLabel(): string {
  return getContact().email || "the contact page";
}

/** Live getters so tests can change env between cases. */
export const contact: ContactConfig = {
  get email() {
    return getContact().email;
  },
  get phone() {
    return getContact().phone;
  },
  get address() {
    return getContact().address;
  },
  get streetAddress() {
    return getContact().streetAddress;
  },
  get city() {
    return getContact().city;
  },
  get region() {
    return getContact().region;
  },
  get country() {
    return getContact().country;
  },
  get location() {
    return getContact().location;
  },
  get whatsappUrl() {
    return getContact().whatsappUrl;
  },
};
