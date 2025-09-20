document.addEventListener('DOMContentLoaded', () => {
  const map = L.map('map').setView([6.24858, 7.11545], 15); // Centered on UNIZIK
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(map);

  // Markers for locations
  L.marker([6.24858, 7.11545]).addTo(map).bindPopup('UNIZIK Main Campus').openPopup();
  L.marker([6.24466, 7.09027]).addTo(map).bindPopup('Ifite Area');
  L.marker([6.221513, 7.064263]).addTo(map).bindPopup('Temp Site');

  // Simulated traffic lines (red for heavy, green for light)
  L.polyline([[6.248, 7.115], [6.245, 7.11]], {color: 'red'}).addTo(map).bindPopup('Heavy Traffic');
  L.polyline([[6.244, 7.09], [6.222, 7.064]], {color: 'green'}).addTo(map).bindPopup('Light Traffic');

  // Load reports as markers
  fetch('/api/reports/recent')
    .then(response => response.json())
    .then(reports => {
      reports.forEach(report => {
        if (report.latitude && report.longitude) {
          L.marker([report.latitude, report.longitude]).addTo(map).bindPopup(report.text);
        }
      });
    });

  // Map click to set report location
  map.on('click', (e) => {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    document.getElementById('latitude').value = lat;
    document.getElementById('longitude').value = lng;
    alert(`Location set to ${lat}, ${lng}`);
  });
});
