 // Earthquakes Dashboard JavaScript
  console.log('Earthquakes script loaded');

  function loadEarthquakeData() {
    console.log('Loading earthquake data...');

    // Check if elements exist
    if (!document.getElementById('total-count')) {
      console.log('Dashboard elements not found yet');
      return;
    }

    const API_BASE = 'https://aftbll7aci.execute-api.ap-northeast-1.amazonaws.com/prod';

    // Update API status
    fetch(`${API_BASE}/health`)
      .then(response => response.json())
      .then(data => {
        console.log('Health data:', data);
        const statusEl = document.getElementById('api-status');
        if (statusEl) {
          statusEl.textContent = data.status === 'healthy' ? 'Online' : 'Offline';
          statusEl.style.color = data.status === 'healthy' ? '#28a745' : '#dc3545';
        }
      })
      .catch(error => {
        console.error('Health check error:', error);
        const statusEl = document.getElementById('api-status');
        if (statusEl) statusEl.textContent = 'Error';
      });

    // Update statistics
    fetch(`${API_BASE}/earthquakes/stats`)
      .then(response => response.json())
      .then(data => {
        console.log('Stats data:', data);
        document.getElementById('total-count').textContent = data.total_earthquakes || '-';
        document.getElementById('recent-count').textContent = data.last_24_hours || '-';
        document.getElementById('avg-magnitude').textContent = data.average_magnitude || '-';
        document.getElementById('max-magnitude').textContent = data.strongest_magnitude || '-';
      })
      .catch(error => console.error('Stats error:', error));

    // Update recent earthquakes
    fetch(`${API_BASE}/earthquakes?limit=10`)
      .then(response => response.json())
      .then(data => {
        console.log('Earthquakes data:', data);
        const tbody = document.getElementById('earthquakes-table');
        if (tbody && data.length) {
          tbody.innerHTML = '';
          data.forEach(eq => {
            const row = tbody.insertRow();
            const time = new Date(eq.OriginTime).toLocaleString('ja-JP');
            row.innerHTML = `
              <td style="color: #629584;">${time}</td>
              <td style="color: #629584;">${eq.EnLocation}</td>
              <td style="color: #629584;">${eq.DepthKm}km</td>
              <td style="color: #629584;">${eq.MaxIntensity}</td>
            `;
          });
        }
      })
      .catch(error => console.error('Earthquakes error:', error));
  }

  // Try multiple ways to ensure it loads
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(loadEarthquakeData, 1000);
  });

  document.addEventListener('turbo:frame-load', function(event) {
    if (event.target.id === 'main_content') {
      setTimeout(loadEarthquakeData, 500);
    }
  });

  // Make it available globally for manual testing
  window.loadEarthquakeData = loadEarthquakeData;
