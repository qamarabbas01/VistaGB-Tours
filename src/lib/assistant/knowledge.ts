/** Curated Gilgit-Baltistan travel knowledge for budget, roads, and packing */

export const GB_BUDGET = `Typical private-trip budgets for Gilgit-Baltistan (PKR, mid-2020s ranges — ask VistaGB for a firm quote):

• Comfortable private jeep tour (couple/small group): roughly PKR 25,000–45,000 per day all-in (driver, fuel, mid-range lodge, breakfast).
• Homestay / backpacker style: PKR 8,000–18,000 per person per day excluding long jeep hires.
• Flights Islamabad ↔ Gilgit/Skardu: vary widely by season; book early for summer weekends.
• Permits: most valley tourism needs only CNIC/passport checks; some border/restricted zones (e.g. toward Khunjerab side trips, certain treks) need extra paperwork arranged in advance.
• Peak season (June–September) lodges and jeeps cost more; shoulder spring/autumn is better value.

VistaGB specialises in private tailored itineraries — use Contact for an exact quote around your dates and group size.`;

export const GB_ROADS = `Road & access notes (always verify closer to travel — weather and slides change fast):

• Karakoram Highway (KKH) is the spine into Hunza/Gojal. Summer is generally open; monsoon and spring slides can delay the Babusar / lower KKH approaches.
• Islamabad → Gilgit/Hunza by road: typically 16–22+ hours depending on stops, landslides, and night driving rules.
• Skardu road via Jaglot–Skardu is faster for Baltistan; winter snow and ice are common on high sections.
• Deosai usually opens roughly late June–September (snowmelt timing varies).
• Fairy Meadows: jeep to Raikot Bridge, then trek/pony — not a through-drive to the meadows.
• High passes (Khunjerab, etc.) follow seasonal opening calendars; winter access is limited.
• Night driving on mountain roads is discouraged; build buffer days into itineraries.

Live conditions: check local reports the week you travel, or ask VistaGB to confirm your route window.`;

export const GB_PACKING = `Packing list for Gilgit-Baltistan (altitude + big day/night swings):

Essentials
• Layered clothing: moisture-wicking base, fleece/mid, windproof shell
• Warm jacket even in summer evenings (valleys cool fast after sunset)
• Sturdy walking shoes + sandals for lodges
• Sun protection: hat, sunglasses, high-SPF sunscreen (UV is strong)
• Refillable bottle; oral rehydration / basic first aid
• Power bank; offline maps; photocopies of ID/passport

Season add-ons
• Spring/autumn: extra warm layer, light gloves
• Summer treks: rain shell, blister care, trekking poles if doing long days
• Deosai / high camps: heavier insulation, beanie, gloves
• Winter valleys: serious cold-weather gear; confirm which roads are open

Documents
• CNIC (Pakistan) or passport + visas as required
• Hotel/tour confirmations offline
• Any restricted-area permits arranged by your operator

Skip overpacking formal wear — practical layers beat bulky suitcases on jeep roads.`;

export function generalKnowledgeFor(
  topics: Array<"budget" | "roads" | "packing">,
): string {
  const chunks: string[] = [];
  if (topics.includes("budget")) chunks.push(GB_BUDGET);
  if (topics.includes("roads")) chunks.push(GB_ROADS);
  if (topics.includes("packing")) chunks.push(GB_PACKING);
  return chunks.join("\n\n");
}
