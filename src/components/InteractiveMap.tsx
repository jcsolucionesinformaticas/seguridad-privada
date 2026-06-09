"use client";

import dynamic from "next/dynamic";
import React from "react";

const MapWithNoSSR = dynamic(() => import("./InteractiveMapInner"), {
  ssr: false,
  loading: () => (
    <div className="map-skeleton">
      <div className="spinner-form" style={{ display: "block" }}></div>
      <p style={{ marginTop: "15px", color: "var(--text-muted)", fontSize: "0.95rem" }}>
        Cargando mapa interactivo de cobertura...
      </p>
    </div>
  ),
});

export default function InteractiveMap() {
  return (
    <div className="interactive-map-wrapper">
      <MapWithNoSSR />
    </div>
  );
}
