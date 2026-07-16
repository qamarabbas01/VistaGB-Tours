"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import type { Marker as LeafletMarker } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export type MapLocation = {
  name: string;
  slug: string;
  lat: number;
  lng: number;
  alt: string;
};

type InteractiveMapProps = {
  locations: readonly MapLocation[];
  activeSlug?: string | null;
  onSelect?: (value: string | null | ((prev: string | null) => string | null)) => void;
};

const GB_CENTER: [number, number] = [35.55, 75.15];
const DEFAULT_ZOOM = 8;

function createPinIcon(active: boolean) {
  const size = active ? 18 : 14;
  const ring = active ? 10 : 6;
  return L.divIcon({
    className: "vista-map-pin",
    html: `<span class="vista-map-pin__dot${active ? " is-active" : ""}" style="--pin-size:${size}px;--pin-ring:${ring}px"></span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2 - 4],
  });
}

function FitBounds({ locations }: { locations: readonly MapLocation[] }) {
  const map = useMap();

  useEffect(() => {
    if (locations.length === 0) return;
    const bounds = L.latLngBounds(locations.map((loc) => [loc.lat, loc.lng]));
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 9 });
  }, [map, locations]);

  return null;
}

function FlyToActive({
  locations,
  activeSlug,
}: {
  locations: readonly MapLocation[];
  activeSlug?: string | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!activeSlug) return;
    const target = locations.find((loc) => loc.slug === activeSlug);
    if (!target) return;
    map.flyTo([target.lat, target.lng], Math.max(map.getZoom(), 9), {
      duration: 0.8,
    });
  }, [activeSlug, locations, map]);

  return null;
}

function DestinationMarker({
  location,
  icon,
  isActive,
  onSelect,
}: {
  location: MapLocation;
  icon: L.DivIcon;
  isActive: boolean;
  onSelect?: (value: string | null | ((prev: string | null) => string | null)) => void;
}) {
  const markerRef = useRef<LeafletMarker | null>(null);

  useEffect(() => {
    const marker = markerRef.current;
    if (!marker) return;

    if (isActive) {
      marker.openPopup();
    } else if (marker.isPopupOpen()) {
      marker.closePopup();
    }
  }, [isActive]);

  return (
    <Marker
      ref={markerRef}
      position={[location.lat, location.lng]}
      icon={icon}
      eventHandlers={{
        click: () => onSelect?.(location.slug),
        popupclose: () => {
          onSelect?.((prev) => (prev === location.slug ? null : prev));
        },
      }}
    >
      <Popup>
        <div className="vista-map-popup">
          <p className="vista-map-popup__name">{location.name}</p>
          <p className="vista-map-popup__meta">{location.alt}</p>
          <Link
            href={`/destinations/${location.slug}`}
            className="vista-map-popup__link"
          >
            Open destination →
          </Link>
        </div>
      </Popup>
    </Marker>
  );
}

export default function InteractiveMap({
  locations,
  activeSlug = null,
  onSelect,
}: InteractiveMapProps) {
  const icons = useMemo(
    () => ({
      idle: createPinIcon(false),
      active: createPinIcon(true),
    }),
    [],
  );

  return (
    <div className="vista-map relative h-full min-h-[360px] w-full overflow-hidden rounded-2xl border border-teal/20">
      <MapContainer
        center={GB_CENTER}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom={false}
        className="h-full w-full bg-night"
        style={{ background: "var(--night)" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <FitBounds locations={locations} />
        <FlyToActive locations={locations} activeSlug={activeSlug} />
        {locations.map((loc) => {
          const isActive = loc.slug === activeSlug;
          return (
            <DestinationMarker
              key={loc.slug}
              location={loc}
              icon={isActive ? icons.active : icons.idle}
              isActive={isActive}
              onSelect={onSelect}
            />
          );
        })}
      </MapContainer>
      <p className="pointer-events-none absolute left-4 top-4 z-[500] coord-label md:left-6 md:top-6">
        GILGIT-BALTISTAN · INTERACTIVE
      </p>
    </div>
  );
}
