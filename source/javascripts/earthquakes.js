console.log('=== EARTHQUAKES JS STARTING ===');

  function loadEarthquakeData() {
    console.log('=== loadEarthquakeData called ===');

    const totalEl = document.getElementById('total-count');
    const statusEl = document.getElementById('api-status');
    const recentEl = document.getElementById('recent-count');
    const avgEl = document.getElementById('avg-magnitude');
    const maxEl = document.getElementById('max-magnitude');
    const tableEl = document.getElementById('earthquakes-table');

    if (!totalEl) {
      console.log('Elements not found, trying again...');
      setTimeout(loadEarthquakeData, 500);
      return;
    }

    console.log('Elements found! Making all API calls...');
    const API_BASE = 'https://aftbll7aci.execute-api.ap-northeast-1.amazonaws.com/prod';

    // Health check
    fetch(`${API_BASE}/health`)
      .then(response => response.json())
      .then(data => {
        console.log('Health data:', data);
        if (statusEl) {
          statusEl.textContent = data.status === 'healthy' ? 'Online' : 'Offline';
          statusEl.style.color = data.status === 'healthy' ? 'green' : 'red';
        }
      })
      .catch(error => console.error('Health error:', error));

    // Statistics
    fetch(`${API_BASE}/earthquakes/stats`)
      .then(response => response.json())
      .then(data => {
        console.log('Stats data:', data);
        if (totalEl) totalEl.textContent = data.total_earthquakes || '-';
        if (recentEl) recentEl.textContent = data.last_24_hours || '-';
        if (avgEl) avgEl.textContent = data.average_magnitude || '-';
        if (maxEl) maxEl.textContent = data.strongest_magnitude || '-';
      })
      .catch(error => console.error('Stats error:', error));

    // Recent earthquakes
    fetch(`${API_BASE}/earthquakes?limit=10`)
      .then(response => response.json())
      .then(data => {
        console.log('Earthquakes data:', data);
        if (tableEl && data.length) {
          tableEl.innerHTML = '';
          data.forEach(eq => {
            const row = tableEl.insertRow();
            const time = new Date(eq.OriginTime).toLocaleString('ja-JP');
            row.innerHTML = `
              <td style="color: #629584;">${time}</td>
              <td style="color: #629584;">${eq.EnLocation}</td>
              <td style="color: #629584;">${eq.Magnitude}</td>
              <td style="color: #629584;">${eq.DepthKm}km</td>
              <td style="color: #629584;">${eq.MaxIntensity}</td>
            `;
          });
        }
      })
      .catch(error => console.error('Earthquakes error:', error));
  }

  // Load data immediately
  document.addEventListener('DOMContentLoaded', loadEarthquakeData);
  loadEarthquakeData(); // Try immediately too
