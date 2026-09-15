// ==========================================================================
// LET ME DRIVE - Leaflet.js + OpenStreetMap Location System
// (100% Free - Zero Paid Google APIs)
// ==========================================================================

const DEFAULT_COORDINATES = {
  Amravati: [20.9374, 77.7796],
  Akola: [20.7002, 77.0082],
  Nagpur: [21.1458, 79.0882],
  Pune: [18.5204, 73.8567],
  Mumbai: [19.0760, 72.8777],
  Nashik: [19.9975, 73.7898],
  Bengaluru: [12.9716, 77.5946],
  Hyderabad: [17.3850, 78.4867],
  Delhi: [28.6139, 77.2090],
  Jaipur: [26.9124, 75.7873],
  Ahmedabad: [23.0225, 72.5714],
  Chennai: [13.0827, 80.2707],
  Kolkata: [22.5726, 88.3639],
  Lucknow: [26.8467, 80.9462],
  Bhopal: [23.2599, 77.4126],
  Patna: [25.5941, 85.1376],
  Ranchi: [23.3441, 85.3096],
  Bhubaneswar: [20.2961, 85.8245],
  Guwahati: [26.1445, 91.7362],
  Kochi: [9.9312, 76.2673]
};

/**
 * Request user's current GPS location with graceful fallback and user-friendly error messages
 */
function getCurrentPosition() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({
        success: false,
        code: 'NOT_SUPPORTED',
        message: 'Geolocation is not supported by your browser. Please select your city manually.'
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          success: true,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        });
      },
      (err) => {
        let msg = 'Location error. Please select your city manually.';
        if (err.code === 1) { // PERMISSION_DENIED
          msg = 'Location permission denied. Please select your city manually.';
        } else if (err.code === 2) { // POSITION_UNAVAILABLE
          msg = 'Location information is unavailable. Please select your city manually.';
        } else if (err.code === 3) { // TIMEOUT
          msg = 'Location request timed out. Please select your city manually.';
        }
        resolve({
          success: false,
          code: err.code,
          message: msg
        });
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  });
}

/**
 * Initialize a Leaflet map in a given HTML element ID
 */
function createMap(containerId, center = [18.5204, 73.8567], zoom = 12) {
  if (typeof L === 'undefined') {
    console.warn('Leaflet.js library is not loaded');
    return null;
  }

  const container = document.getElementById(containerId);
  if (!container) return null;

  // Clear previous instance if any
  if (container._leaflet_id) {
    container._leaflet_id = null;
    container.innerHTML = '';
  }

  const map = L.map(containerId).setView(center, zoom);

  // Free OpenStreetMap tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  return map;
}

/**
 * Render pickup and destination route points
 */
function renderRouteMap(containerId, pickup, destination) {
  let defaultCenter = [18.5204, 73.8567];
  const cityName = pickup?.city || destination?.city;
  if (cityName && DEFAULT_COORDINATES[cityName]) {
    defaultCenter = DEFAULT_COORDINATES[cityName];
  } else if (typeof INDIAN_CITIES !== 'undefined' && cityName) {
    const found = INDIAN_CITIES.find(c => c.city.toLowerCase() === cityName.toLowerCase());
    if (found) defaultCenter = [found.lat, found.lng];
  }

  const map = createMap(containerId, defaultCenter, 11);
  if (!map) return;

  const markers = [];

  // Pickup marker (Blue)
  if (pickup && pickup.latitude && pickup.longitude) {
    const pMarker = L.marker([pickup.latitude, pickup.longitude])
      .addTo(map)
      .bindPopup(`<b>Pickup Location:</b><br>${pickup.area || ''}, ${pickup.city || ''}`);
    markers.push(pMarker);
  }

  // Destination marker (Red)
  if (destination && destination.latitude && destination.longitude) {
    const dMarker = L.marker([destination.latitude, destination.longitude])
      .addTo(map)
      .bindPopup(`<b>Destination:</b><br>${destination.area || ''}, ${destination.city || ''}`);
    markers.push(dMarker);
  }

  // If both have coordinates, draw connecting dashed route line and fit bounds
  if (markers.length === 2) {
    const pLat = pickup.latitude;
    const pLng = pickup.longitude;
    const dLat = destination.latitude;
    const dLng = destination.longitude;

    const latlngs = [[pLat, pLng], [dLat, dLng]];
    L.polyline(latlngs, { color: '#2563eb', weight: 4, dashArray: '8, 8', opacity: 0.8 }).addTo(map);

    const group = new L.featureGroup(markers);
    map.fitBounds(group.getBounds().pad(0.2));
  } else if (markers.length === 1) {
    map.setView(markers[0].getLatLng(), 13);
  } else {
    map.setView(defaultCenter, 12);
  }

  // Force recalculate dimensions if inside modal
  setTimeout(() => map.invalidateSize(), 300);
  return map;
}

/**
 * Render driver approximate area radius (without exposing sensitive exact house address)
 * Privacy preserving: draws a 1.5 km circular operating radius
 */
function renderDriverAreaMap(containerId, lat, lng, area, city) {
  let center = [18.5204, 73.8567];
  if (lat && lng) {
    center = [lat, lng];
  } else if (city && DEFAULT_COORDINATES[city]) {
    center = DEFAULT_COORDINATES[city];
  } else if (typeof INDIAN_CITIES !== 'undefined' && city) {
    const found = INDIAN_CITIES.find(c => c.city.toLowerCase() === city.toLowerCase());
    if (found) center = [found.lat, found.lng];
  }

  const map = createMap(containerId, center, 13);
  if (!map) return;

  // Draw an approximate circular service area (1.5 km radius) instead of exposing exact address
  L.circle(center, {
    color: '#2563eb',
    fillColor: '#3b82f6',
    fillOpacity: 0.2,
    radius: 1500
  }).addTo(map).bindPopup(`<b>Driver Base Area:</b><br>${area || ''}, ${city || ''}`);

  setTimeout(() => map.invalidateSize(), 300);
  return map;
}

// Export for Node.js test environment if required
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { getCurrentPosition, DEFAULT_COORDINATES };
}

/* Let Me Drive: robust location helpers */
(function () {
  "use strict";

  window.LMDLocation = window.LMDLocation || {};

  window.LMDLocation.getCurrentPosition = function (options) {
    options = Object.assign({
      enableHighAccuracy: true,
      timeout: 12000,
      maximumAge: 300000
    }, options || {});

    return new Promise(function (resolve, reject) {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by this browser."));
        return;
      }
      navigator.geolocation.getCurrentPosition(resolve, function (err) {
        var messages = {
          1: "Location permission was denied.",
          2: "Your location could not be determined.",
          3: "Location request timed out."
        };
        var e = new Error(messages[err.code] || "Unable to get your current location.");
        e.code = err.code;
        reject(e);
      }, options);
    });
  };

  window.LMDLocation.reverseGeocode = async function (lat, lon) {
    var url = "https://nominatim.openstreetmap.org/reverse?format=jsonv2"
      + "&lat=" + encodeURIComponent(lat)
      + "&lon=" + encodeURIComponent(lon)
      + "&zoom=10"
      + "&addressdetails=1";

    var response = await fetch(url, {
      headers: { "Accept": "application/json" }
    });
    if (!response.ok) throw new Error("Reverse geocoding failed.");
    var data = await response.json();
    var a = data.address || {};

    var city = a.city || a.town || a.municipality || a.village
      || a.city_district || a.county || "";
    var state = a.state || "";
    var area = a.suburb || a.neighbourhood || a.residential || a.locality || "";

    return {
      city: city,
      state: state,
      area: area,
      latitude: Number(lat),
      longitude: Number(lon),
      displayName: [city, state].filter(Boolean).join(", ")
    };
  };

  window.LMDLocation.haversineKm = function (lat1, lon1, lat2, lon2) {
    var R = 6371;
    var toRad = function (v) { return v * Math.PI / 180; };
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
      + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2))
      * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };
})();
