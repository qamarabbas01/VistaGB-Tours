export type PackingItem = {
  id: string;
  label: string;
};

export type PackingSection = {
  id: string;
  title: string;
  items: PackingItem[];
};

export const packingSections: PackingSection[] = [
  {
    id: "essentials",
    title: "Essentials",
    items: [
      { id: "layers", label: "Layered clothing (base, fleece, windproof shell)" },
      { id: "jacket", label: "Warm jacket for valley evenings" },
      { id: "shoes", label: "Sturdy walking shoes + lodge sandals" },
      { id: "sun", label: "Hat, sunglasses, high-SPF sunscreen" },
      { id: "bottle", label: "Refillable bottle and oral rehydration" },
      { id: "firstaid", label: "Basic first aid and blister care" },
      { id: "power", label: "Power bank and offline maps" },
      { id: "id-copy", label: "Photocopies of CNIC or passport" },
    ],
  },
  {
    id: "season",
    title: "Season add-ons",
    items: [
      { id: "shoulder", label: "Spring/autumn: extra warm layer and light gloves" },
      { id: "rain", label: "Summer treks: rain shell and trekking poles" },
      { id: "highcamp", label: "Deosai / high camps: beanie, gloves, heavier insulation" },
      { id: "winter", label: "Winter valleys: serious cold-weather gear" },
    ],
  },
  {
    id: "documents",
    title: "Documents",
    items: [
      { id: "cnic", label: "CNIC (Pakistan) or passport + visas" },
      { id: "confirm", label: "Hotel/tour confirmations saved offline" },
      { id: "permits", label: "Restricted-area permits (if your operator arranged them)" },
    ],
  },
];
