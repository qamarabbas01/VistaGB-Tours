export type AlertSeverity = 'info' | 'watch' | 'warning';

export type TravelAlert = {
  id: string;
  title: string;
  summary: string;
  severity: AlertSeverity;
  updated: string;
  region?: string;
};

export type RoadStatusCode = 'open' | 'caution' | 'seasonal' | 'closed';

export type RoadStatus = {
  id: string;
  route: string;
  status: RoadStatusCode;
  note: string;
  updated: string;
};

export const ROAD_STATUS_LABELS: Record<RoadStatusCode, string> = {
  open: 'Open',
  caution: 'Caution',
  seasonal: 'Seasonal',
  closed: 'Closed',
};

/** Editorial snapshot — always confirm closer to travel. */
export const travelAlerts: TravelAlert[] = [
  {
    id: 'kkh-slides',
    title: 'KKH: allow landslide buffer days',
    summary:
      'Spring and monsoon slides can delay the Karakoram Highway below Gilgit. Build a spare night into Hunza itineraries and avoid night driving.',
    severity: 'watch',
    updated: '2026-08-18',
    region: 'Hunza / Gilgit',
  },
  {
    id: 'deosai-window',
    title: 'Deosai: high-season access window',
    summary:
      'The plateau is typically jeep-accessible from late June through September, depending on snowmelt. Shoulder weeks can still be icy at Sheosar.',
    severity: 'info',
    updated: '2026-08-12',
    region: 'Skardu / Astore',
  },
  {
    id: 'khunjerab-hours',
    title: 'Khunjerab Pass day-trip hours',
    summary:
      'Border post hours and weather close the pass outside the summer window. Confirm the day’s opening with your driver before leaving Sost.',
    severity: 'info',
    updated: '2026-08-05',
    region: 'Upper Hunza',
  },
];

export const roadStatuses: RoadStatus[] = [
  {
    id: 'kkh-hunza',
    route: 'Islamabad → Gilgit → Hunza (KKH)',
    status: 'caution',
    note: 'Generally open in summer; slides and one-way holds are common. 16–22+ hours by road.',
    updated: '2026-08-18',
  },
  {
    id: 'skardu-road',
    route: 'Jaglot → Skardu',
    status: 'open',
    note: 'Main Baltistan approach. Winter ice on high sections; summer is the reliable window.',
    updated: '2026-08-18',
  },
  {
    id: 'deosai',
    route: 'Skardu / Astore → Deosai Plains',
    status: 'seasonal',
    note: 'Usually late June–September. Snow can linger at the edges of the plateau.',
    updated: '2026-08-12',
  },
  {
    id: 'fairy-meadows',
    route: 'Raikot Bridge → Tato → Fairy Meadows',
    status: 'open',
    note: 'Jeep to Tato, then 2–3 hour hike or pony. Not a through-drive to the meadows.',
    updated: '2026-08-10',
  },
  {
    id: 'khunjerab',
    route: 'Sost → Khunjerab Pass',
    status: 'seasonal',
    note: 'Summer border hours only. Weather and official closures can end a day trip early.',
    updated: '2026-08-05',
  },
  {
    id: 'babusar',
    route: 'Babusar Pass (Naran ↔ Chilas)',
    status: 'seasonal',
    note: 'High-pass shortcut in peak summer; closed or risky outside the snow-free window.',
    updated: '2026-07-28',
  },
];

export function featuredAlert(): TravelAlert | undefined {
  return (
    travelAlerts.find((alert) => alert.severity === 'warning') ??
    travelAlerts.find((alert) => alert.severity === 'watch') ??
    travelAlerts[0]
  );
}
