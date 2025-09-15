import React, { useEffect } from 'react';
import L from 'leaflet';

function Map() {
  useEffect(() => {
    const map = L.map('map').setView([6.2657, 7.1086], 13); // UNIZIK coordinates
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    // Add Google Maps layer (requires Google Maps API)
    const googleLayer = new L.GridLayer.GoogleMutant({
      type: 'roadmap',
    }).addTo(map);

    // Traffic layer
    const trafficLayer = new L.GridLayer.GoogleMutant({
      type: 'roadmap',
      traffic: true,
    }).addTo(map);

    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" style={{ height: '600px', width: '100%' }} />;
}

export default Map;
