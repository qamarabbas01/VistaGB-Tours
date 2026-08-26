import {
  placesSummary,
  validateInquiry,
} from "@/components/contact-form/inquiry";
import { isTrustedMapEmbed } from "@/components/destination-guide/map-embed";
import {
  formatClock,
  formatDayLabel,
  formatTemp,
} from "@/components/destination-weather/format";

describe("validateInquiry", () => {
  it("requires a trip duration", () => {
    expect(
      validateInquiry({
        duration: "",
        datesFlexible: false,
        travelFrom: "2026-09-01",
        travelMonth: "",
      }),
    ).toMatch(/how long/i);
  });

  it("requires a start date when dates are not flexible", () => {
    expect(
      validateInquiry({
        duration: "6–7 days",
        datesFlexible: false,
        travelFrom: "",
        travelMonth: "",
      }),
    ).toMatch(/when you want to travel/i);
  });

  it("requires a month when dates are flexible", () => {
    expect(
      validateInquiry({
        duration: "6–7 days",
        datesFlexible: true,
        travelFrom: "",
        travelMonth: "",
      }),
    ).toMatch(/month/i);
  });

  it("accepts a complete fixed-date inquiry", () => {
    expect(
      validateInquiry({
        duration: "6–7 days",
        datesFlexible: false,
        travelFrom: "2026-09-01",
        travelMonth: "",
      }),
    ).toBeNull();
  });
});

describe("placesSummary", () => {
  it("asks for suggestions when the traveler is flexible", () => {
    expect(
      placesSummary({
        placesFlexible: true,
        selectedPlaces: ["Karimabad"],
        hasPlaces: true,
      }),
    ).toBe("Please suggest places for me");
  });

  it("joins selected places", () => {
    expect(
      placesSummary({
        placesFlexible: false,
        selectedPlaces: ["Karimabad", "Passu"],
        hasPlaces: true,
      }),
    ).toBe("Karimabad, Passu");
  });
});

describe("isTrustedMapEmbed", () => {
  it("accepts Google Maps embed URLs", () => {
    expect(
      isTrustedMapEmbed(
        "https://www.google.com/maps/embed?pb=!1m18!1m12",
      ),
    ).toBe(true);
  });

  it("rejects non-Google hosts", () => {
    expect(isTrustedMapEmbed("https://evil.example/maps/embed")).toBe(false);
  });
});

describe("weather format helpers", () => {
  it("rounds temperatures", () => {
    expect(formatTemp(12.4)).toBe("12°");
    expect(formatTemp(12.6)).toBe("13°");
  });

  it("formats 24-hour clock strings", () => {
    expect(formatClock("2026-08-26T05:41:00")).toBe("5:41 AM");
    expect(formatClock("18:05")).toBe("6:05 PM");
  });

  it("labels the first forecast day as Today", () => {
    expect(formatDayLabel("2026-08-26", 0)).toBe("Today");
    expect(formatDayLabel("2026-08-27", 1)).toMatch(/^[A-Z][a-z]{2}$/);
  });
});
