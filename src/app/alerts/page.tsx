import JsonLd from '@/components/JsonLd';
import PageHeader from '@/components/PageHeader';
import { ROAD_STATUS_LABELS, roadStatuses, travelAlerts } from '@/data/alerts';
import {
  breadcrumbJsonLd,
  buildPageMetadata,
  webPageJsonLd,
  withJsonLdContext,
} from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Travel alerts & roads',
  description:
    'Seasonal road status and travel notices for the Karakoram Highway, Skardu, Deosai, Fairy Meadows, and Khunjerab.',
  path: '/alerts',
});

const statusClass: Record<string, string> = {
  open: 'border-teal/40 text-ice',
  caution: 'border-apricot/50 text-apricot',
  seasonal: 'border-apricot bg-apricot/10 text-apricot',
  closed: 'border-glacier/40 text-glacier',
};

export default function AlertsPage() {
  return (
    <div>
      <JsonLd
        data={withJsonLdContext([
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Tools', path: '/tools' },
            { name: 'Alerts', path: '/alerts' },
          ]),
          webPageJsonLd({
            name: 'Travel alerts & roads',
            description: 'Road status and travel notices for Gilgit-Baltistan.',
            path: '/alerts',
          }),
        ])}
      />
      <PageHeader
        label="Before you travel"
        title="Alerts & road status"
        intro="Editorial snapshot for planning — weather, slides, and official hours change quickly. Confirm the week you travel, or ask VistaGB to check your route window."
      />
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="coord-label mb-3">Notices</p>
          <h2 className="font-display text-2xl font-semibold text-glacier">
            Travel alerts
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {travelAlerts.map((alert) => (
              <li
                key={alert.id}
                className="rounded-2xl border border-teal/20 bg-slate p-6"
              >
                <p className="coord-label mb-2">
                  {alert.severity} · {alert.updated}
                </p>
                <h3 className="font-display text-lg font-semibold text-glacier">
                  {alert.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ice">
                  {alert.summary}
                </p>
                {alert.region ? (
                  <p className="mt-3 text-xs text-apricot">{alert.region}</p>
                ) : null}
              </li>
            ))}
          </ul>

          <p className="coord-label mb-3 mt-16">The highway</p>
          <h2 className="font-display text-2xl font-semibold text-glacier">
            Road status
          </h2>
          <ul className="mt-8 space-y-3">
            {roadStatuses.map((road) => (
              <li
                key={road.id}
                className="flex flex-col gap-3 rounded-2xl border border-teal/20 bg-slate p-5 sm:flex-row sm:items-start sm:justify-between"
              >
                <div>
                  <h3 className="font-display text-lg text-glacier">
                    {road.route}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ice">
                    {road.note}
                  </p>
                  <p className="mt-2 text-xs text-ice">
                    Updated {road.updated}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full border px-3 py-1 text-xs uppercase tracking-wider ${statusClass[road.status]}`}
                >
                  {ROAD_STATUS_LABELS[road.status]}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
