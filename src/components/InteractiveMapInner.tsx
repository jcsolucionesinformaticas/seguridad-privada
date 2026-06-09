"use client";

import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function InteractiveMapInner() {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || leafletMap.current) return;

    // Initialize map centered on central-northern Mexico to display both CDMX and MTY
    const map = L.map(mapRef.current, {
      center: [22.6345, -100.5528],
      zoom: 6,
      zoomControl: false,
    });

    leafletMap.current = map;

    // Add zoom control at bottom-right
    L.control.zoom({ position: "bottomright" }).addTo(map);

    // CartoDB Dark Matter tiles (premium dark mode map)
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 20,
    }).addTo(map);

    // Custom DivIcon for gold pins
    const createGoldMarker = () => {
      return L.divIcon({
        className: "custom-gold-marker",
        html: `
          <div class="marker-container">
            <div class="marker-pulse"></div>
            <div class="marker-icon"><i class="fa-solid fa-shield-halved"></i></div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -20],
      });
    };

    // Sede CDMX Marker
    const markerCDMX = L.marker([19.4978, -99.2016], {
      icon: createGoldMarker(),
    }).addTo(map);

    markerCDMX.bindPopup(`
      <div class="map-popup-content">
        <h3>Sede Ciudad de México</h3>
        <p class="tag-gold">Oficina Central Corporativa</p>
        <p class="popup-desc"><i class="fa-solid fa-location-dot"></i> Av. 23 de Abril No. 347, Col. Ampliación San Pedro Xalpa, Azcapotzalco, CDMX</p>
        <p class="popup-desc"><i class="fa-solid fa-phone"></i> +52 55 4863 8428</p>
        <a href="https://www.google.com/maps/dir/?api=1&destination=Av.+23+de+Abril+347,+San+Pedro+Xalpa,+Azcapotzalco,+02719+Ciudad+de+M%C3%A9xico,+CDMX" target="_blank" rel="noopener noreferrer" class="popup-btn">
          <i class="fa-solid fa-route"></i> Cómo Llegar
        </a>
      </div>
    `);

    // Sede Monterrey Marker
    const markerMTY = L.marker([25.7951, -100.2974], {
      icon: createGoldMarker(),
    }).addTo(map);

    markerMTY.bindPopup(`
      <div class="map-popup-content">
        <h3>Sede Monterrey</h3>
        <p class="tag-gold">Dirección Regional Norte</p>
        <p class="popup-desc"><i class="fa-solid fa-location-dot"></i> C. Ordenanzas Reales 205, Col. La Encomienda, Gral. Escobedo, NL</p>
        <p class="popup-desc"><i class="fa-solid fa-phone"></i> +52 55 4863 8428</p>
        <a href="https://www.google.com/maps/dir/?api=1&destination=Calle+Ordenanzas+Reales+205,+La+Encomienda,+Escobedo,+Nuevo+Le%C3%B3n" target="_blank" rel="noopener noreferrer" class="popup-btn">
          <i class="fa-solid fa-route"></i> Cómo Llegar
        </a>
      </div>
    `);

    // Adjust map viewport to fit both markers nicely
    const group = L.featureGroup([markerCDMX, markerMTY]);
    map.fitBounds(group.getBounds().pad(0.15));

    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
}
