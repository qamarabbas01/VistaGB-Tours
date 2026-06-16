import { contact } from "@/config/contact";

export const metadata = {
  title: "Privacy Policy — VistaGB Tours",
};

export default function PrivacyPage() {
  return (
    <div>
      <section className="border-b border-teal/20 bg-slate py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="coord-label mb-3">Legal</p>
          <h1 className="font-display text-4xl font-semibold leading-tight md:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-4 max-w-2xl text-ice">
            How we collect, use, and protect your information when you contact
            VistaGB Tours.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl space-y-6 px-6 text-sm leading-relaxed text-ice md:px-10">

          <h2 className="font-display text-base font-semibold text-glacier mt-4 mb-1">
            Information We Collect
          </h2>
          <p>
            When you submit our contact form, we collect your name, email address, selected destination, and message solely to respond to your inquiry and plan your trip. If you proceed with a booking, we may also collect travel preferences and relevant details needed to arrange your itinerary or services. We do not collect financial or payment information via this website.
          </p>

          <h2 className="font-display text-base font-semibold text-glacier mt-8 mb-1">
            How We Use Your Data
          </h2>
          <p>
            Your information is used exclusively to communicate with you, provide travel quotes, complete bookings, and deliver customer support. We do not sell, rent, or share your data with third parties for marketing purposes. In certain situations, your information may be shared with local partners (such as drivers or homestays) only as required to deliver agreed services, and solely for that purpose.
          </p>

          <h2 className="font-display text-base font-semibold text-glacier mt-8 mb-1">
            Data Retention & Deletion
          </h2>
          <p>
            We may retain correspondence and booking details for business records, support, or legal compliance. You may request deletion of your data at any time by emailing{" "}
            <a
              href={`mailto:${contact.email}`}
              className="text-apricot hover:underline"
            >
              {contact.email}
            </a>
            . We will confirm deletion within a reasonable period, except information required to fulfill legal obligations or resolve disputes.
          </p>

          <h2 className="font-display text-base font-semibold text-glacier mt-8 mb-1">
            Cookies & Analytics
          </h2>
          <p>
            This site uses no third-party analytics or advertising trackers at this time. We do not use cookies for tracking or profiling visitors. If this policy changes in the future, we will update this page with relevant details and obtain your consent where applicable.
          </p>

          <h2 className="font-display text-base font-semibold text-glacier mt-8 mb-1">
            Data Security
          </h2>
          <p>
            We take appropriate security measures to protect personal information from unauthorized access, alteration, or disclosure. However, please be aware that no method of digital transmission or storage is 100% secure.
          </p>

          <h2 className="font-display text-base font-semibold text-glacier mt-8 mb-1">
            International Data Transfers
          </h2>
          <p>
            As a travel company based in Gilgit-Baltistan, information you provide may be transmitted internationally if you are contacting us from outside Pakistan. By submitting information, you consent to its transfer and processing as described in this policy.
          </p>

          <h2 className="font-display text-base font-semibold text-glacier mt-8 mb-1">
            Children&apos;s Privacy
          </h2>
          <p>
            Our services are not directed at children under 16. We do not knowingly collect personal information from anyone under this age. If you believe a child has provided us with personal data, please contact us for removal.
          </p>

          <h2 className="font-display text-base font-semibold text-glacier mt-8 mb-1">
            External Links
          </h2>
          <p>
            This website may contain links to third-party sites (such as tourism offices or news). We are not responsible for the privacy practices or content of those sites, which are governed by their own policies.
          </p>

          <h2 className="font-display text-base font-semibold text-glacier mt-8 mb-1">
            Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy to reflect changes in law or our business practices. The date of the latest update will be posted on this page. Your continued use of the site after changes are published signifies your acceptance of the updated policy.
          </p>

          <h2 className="font-display text-base font-semibold text-glacier mt-8 mb-1">
            Contact
          </h2>
          <p>
            If you have questions or concerns about this Privacy Policy, please contact us at{" "}
            <a
              href={`mailto:${contact.email}`}
              className="text-apricot hover:underline"
            >
              {contact.email}
            </a>
            .
          </p>

        </div>
      </section>
    </div>
  );
}
