import { generalKnowledgeFor } from "@/lib/assistant/knowledge";
import type {
  RetrievedDestination,
  TravelContext,
} from "@/lib/assistant/retrieve";

function primary(ctx: TravelContext): RetrievedDestination | undefined {
  return ctx.destinations[0];
}

function listLines(items: string[], bullet = "•"): string {
  return items.map((item) => `${bullet} ${item}`).join("\n");
}

function formatWeather(ctx: TravelContext): string {
  const w = ctx.weather;
  if (!w) {
    return "I couldn't pull live weather just now. Check the destination page weather card, or ask again in a moment.";
  }

  const forecast = w.forecast
    .map((d, i) => {
      const label = i === 0 ? "Today" : d.date;
      return `• ${label}: ${Math.round(d.tempMinC)}–${Math.round(d.tempMaxC)}°C, ${d.condition}${
        d.snowfallCm > 0
          ? `, snow ${d.snowfallCm} cm`
          : d.rainMm > 0
            ? `, rain ${d.rainMm} mm`
            : ""
      }`;
    })
    .join("\n");

  return [
    `Live weather for ${w.locationLabel}:`,
    `• Now: ${Math.round(w.current.temperatureC)}°C, ${w.current.condition}`,
    `• Wind ${w.current.windKmh} km/h · Rain ${w.current.rainMm} mm · Snow ${w.current.snowfallCm} cm`,
    `• Sunrise ${w.today.sunrise.split("T")[1] ?? w.today.sunrise} · Sunset ${w.today.sunset.split("T")[1] ?? w.today.sunset}`,
    "",
    "5-day outlook:",
    forecast,
  ].join("\n");
}

function answerOverview(dest: RetrievedDestination): string {
  const lines = [
    `${dest.name} — ${dest.tagline}`,
    "",
    dest.overview,
    "",
    `Altitude: ${dest.altitude}`,
    `Best time: ${dest.bestTime}`,
    "",
    "Highlights:",
    listLines(dest.highlights.slice(0, 6)),
  ];

  if (dest.guide?.culture) {
    lines.push("", "Culture:", dest.guide.culture);
  }
  if (dest.childPlaceNames?.length) {
    lines.push(
      "",
      "Places to explore:",
      listLines(dest.childPlaceNames.slice(0, 8)),
    );
  }
  if (dest.parentName) {
    lines.push("", `Part of ${dest.parentName}.`);
  }

  lines.push(
    "",
    `Explore more: /destinations/${dest.slug} — or ask for an itinerary, hotels, food, or weather.`,
  );
  return lines.join("\n");
}

function answerItinerary(dest: RetrievedDestination): string {
  const itinerary = dest.guide?.suggestedItinerary;
  if (itinerary?.length) {
    const days = itinerary
      .map((d) => {
        const stops = d.stops?.length ? `\n  Stops: ${d.stops.join(", ")}` : "";
        return `${d.day} — ${d.title}\n${d.summary}${stops}`;
      })
      .join("\n\n");

    return [
      `A proven outline for ${dest.name}${
        dest.guide?.travelDuration ? ` (${dest.guide.travelDuration})` : ""
      }:`,
      "",
      days,
      "",
      "Want this tailored to your dates and pace? Tell me your group size and month, or head to /contact and VistaGB will build a private route.",
    ].join("\n");
  }

  return [
    `I don't have a fixed day-by-day card for ${dest.name} yet, but here's a solid planning base:`,
    "",
    `• Best season: ${dest.bestTime}`,
    `• Getting there: ${dest.gettingThere}`,
    dest.highlights.length
      ? `• Anchor stops: ${dest.highlights.slice(0, 5).join("; ")}`
      : "",
    "",
    "Ask for hotels, packing, or nearby destinations — or contact VistaGB for a custom 5–7 day plan.",
  ]
    .filter(Boolean)
    .join("\n");
}

function answerHotels(dest: RetrievedDestination): string {
  const hotels = dest.guide?.hotels;
  if (hotels?.length) {
    return [
      `Recommended stays around ${dest.name}:`,
      "",
      ...hotels.map((h) => `• ${h.name} — ${h.detail}`),
      "",
      "Peak summer fills up fast — book ahead, or ask VistaGB to lock lodges into your itinerary.",
    ].join("\n");
  }

  return [
    `I don't have a curated hotel list for ${dest.name} in the guide yet.`,
    `Best season context: ${dest.bestTime}.`,
    "For Hunza, Skardu, Gilgit, and Nagar I can pull lodge recommendations — try naming one of those valleys, or contact VistaGB for hand-picked stays.",
  ].join("\n");
}

function answerFood(dest: RetrievedDestination): string {
  const foods = dest.guide?.famousFoods;
  const restaurants = dest.guide?.restaurants;
  if (!foods?.length && !restaurants?.length) {
    return `I don't have a food guide for ${dest.name} yet. Try Hunza, Skardu, Gilgit, or Nagar for famous dishes and café notes.`;
  }

  const lines = [`Flavours of ${dest.name}:`, ""];
  if (foods?.length) {
    lines.push(...foods.map((f) => `• ${f.name} — ${f.detail}`));
  }
  if (restaurants?.length) {
    lines.push("", "Where to eat:", ...restaurants.map((r) => `• ${r.name} — ${r.detail}`));
  }
  return lines.join("\n");
}

function answerBestTime(dest: RetrievedDestination): string {
  const seasonal = dest.guide?.weather;
  return [
    `Best time for ${dest.name}: ${dest.bestTime}`,
    seasonal ? `\nSeasonal notes:\n${seasonal}` : "",
    "",
    "If you share your month and interests (lakes, forts, treks, Deosai), I can narrow the window.",
  ].join("\n");
}

function answerNearby(dest: RetrievedDestination): string {
  const nearby = dest.guide?.nearbyDestinations;
  if (nearby?.length) {
    return [
      `From ${dest.name}, strong add-ons include:`,
      "",
      ...nearby.map((n) => `• ${n.name} — ${n.detail}`),
      "",
      dest.childPlaceNames?.length
        ? `Inside ${dest.name}: ${dest.childPlaceNames.slice(0, 8).join(", ")}`
        : "",
    ]
      .filter(Boolean)
      .join("\n");
  }

  if (dest.childPlaceNames?.length) {
    return [
      `Places to combine with ${dest.name}:`,
      listLines(dest.childPlaceNames.slice(0, 10)),
    ].join("\n");
  }

  if (dest.parentName) {
    return `${dest.name} sits in ${dest.parentName}. Ask about ${dest.parentName} for nearby valleys, lakes, and day trips.`;
  }

  return `Ask about a specific valley (Hunza, Skardu, Gilgit, Nagar…) and I’ll suggest nearby destinations from the guide.`;
}

function answerGeneralNoDestination(ctx: TravelContext): string {
  const knowledge = generalKnowledgeFor(ctx.generalTopics);

  if (knowledge) return knowledge;

  return [
    "I'm VistaGB's travel assistant for Gilgit-Baltistan.",
    "",
    "Ask me things like:",
    "• Tell me about Hunza",
    "• 5-day itinerary for Skardu",
    "• Best hotels in Hunza",
    "• Famous food in Gilgit",
    "• Best time to visit Nagar",
    "• Weather in Hunza",
    "• Budget for a week in GB",
    "• Road conditions to Hunza",
    "• Packing list for Deosai",
    "• Nearby destinations from Skardu",
    "",
    "When you're ready for a private trip, continue at /contact.",
  ].join("\n");
}

export function answerLocally(ctx: TravelContext): string {
  if (ctx.intent === "weather") {
    const weatherText = formatWeather(ctx);
    const dest = primary(ctx);
    const seasonal = dest?.guide?.weather
      ? `\n\nSeasonal context for ${dest.name}:\n${dest.guide.weather}`
      : "";
    return weatherText + seasonal;
  }

  const dest = primary(ctx);
  if (!dest) {
    if (ctx.generalTopics.length) {
      return generalKnowledgeFor(ctx.generalTopics);
    }
    return answerGeneralNoDestination(ctx);
  }

  // Attach general knowledge when asked alongside a destination
  const appendix =
    ctx.generalTopics.length > 0 &&
    ctx.intent !== "budget" &&
    ctx.intent !== "roads" &&
    ctx.intent !== "packing"
      ? `\n\n${generalKnowledgeFor(ctx.generalTopics)}`
      : "";

  switch (ctx.intent) {
    case "overview":
      return answerOverview(dest) + appendix;
    case "itinerary":
      return answerItinerary(dest) + appendix;
    case "hotels":
      return answerHotels(dest) + appendix;
    case "food":
      return answerFood(dest) + appendix;
    case "best_time":
      return answerBestTime(dest) + appendix;
    case "nearby":
      return answerNearby(dest) + appendix;
    case "budget":
      return (
        `Budget context for a trip including ${dest.name}:\n\n` +
        generalKnowledgeFor(["budget"]) +
        `\n\nBest season there: ${dest.bestTime}`
      );
    case "roads":
      return (
        generalKnowledgeFor(["roads"]) +
        `\n\nGetting to ${dest.name}:\n${dest.gettingThere}`
      );
    case "packing":
      return (
        generalKnowledgeFor(["packing"]) +
        `\n\nFor ${dest.name}, plan around: ${dest.bestTime} · altitude ${dest.altitude}.`
      );
    default:
      return answerOverview(dest) + appendix;
  }
}
