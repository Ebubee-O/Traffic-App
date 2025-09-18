import React, { useEffect } from 'react';
import L from 'leaflet';

function Map() {
  useEffect(() => {
    const map = L.map('map').setView([6.2657, 7.1086], 13); // UNIZIK/Ifite center
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);
    return () => map.remove();
  }, []);

  return <div id="map" className="h-96 w-full rounded-lg shadow-lg mb-4"></div>;
}

export default Map;
