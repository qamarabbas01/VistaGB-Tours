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
        <div className="mx-auto max-w-3xl space-y-6 px-6 text-sm leading-relaxed text-ice md:px-10">
          <p>
            When you submit our contact form, we collect your name, email, and
            message solely to respond to your inquiry and plan your trip. We do
            not sell or share your personal data with third parties for
            marketing purposes.
          </p>
          <p>
            We may retain correspondence for booking records and customer
            support. You may request deletion of your data by emailing{" "}
            <a
              href="mailto:hello@vistagbtours.pk"
              className="text-apricot hover:underline"
            >
              hello@vistagbtours.pk
            </a>
            .
          </p>
          <p>
            This site uses no third-party analytics or advertising trackers at
            this time. External links (such as official tourism news) are
            governed by those sites&apos; own privacy policies.
          </p>
        </div>
      </section>
    </div>
  );
}
