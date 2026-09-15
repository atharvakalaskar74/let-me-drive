// ==========================================================================
// LET ME DRIVE - Searchable City Autocomplete & GPS Location Access Module
// 100% Free - Works with local Pan-India Cities dataset & OpenStreetMap Nominatim
// Zero Paid Google Maps APIs
// ==========================================================================

/**
 * Initialize searchable city autocomplete on any text input
 * Supports desktop keyboard navigation, mobile touch interaction, and manual fallback
 */
function initCityAutocomplete(config) {
  const {
    inputId,
    stateInputId = null,
    latInputId = null,
    lngInputId = null,
    onSelect = null,
    allowAllOption = false,
    placeholder = 'Type to search Indian cities (e.g. Amravati, Pune, Nagpur)...'
  } = config;

  const input = document.getElementById(inputId);
  if (!input) return null;

  input.setAttribute('autocomplete', 'off');
  if (placeholder && !input.getAttribute('placeholder')) {
    input.setAttribute('placeholder', placeholder);
  }

  // Wrap input in relative container if not already wrapped
  let wrapper = input.closest('.city-autocomplete-wrapper');
  if (!wrapper) {
    wrapper = document.createElement('div');
    wrapper.className = 'city-autocomplete-wrapper';
    input.parentNode.insertBefore(wrapper, input);
    wrapper.appendChild(input);
  }

  // Create dropdown element
  let dropdown = wrapper.querySelector('.city-autocomplete-list');
  if (!dropdown) {
    dropdown = document.createElement('div');
    dropdown.className = 'city-autocomplete-list';
    wrapper.appendChild(dropdown);
  }

  let activeIndex = -1;
  let currentMatches = [];

  /**
   * Filter and prioritize cities with smart ranking:
   * 1. City starts with query
   * 2. Alias starts with query
   * 3. City contains query
   * 4. Alias contains query
   * 5. State starts with or contains query
   */
  function filterCities(query) {
    const q = (query || '').trim().toLowerCase();
    const results = [];
    const seen = new Set();

    if (allowAllOption && (!q || q === 'all' || q === 'all cities')) {
      results.push({
        city: '',
        displayName: 'All Cities (Pan-India)',
        state: 'All Regions',
        isAllOption: true
      });
    }

    if (!q) {
      // Default top hubs across India on empty focus
      const topHubs = [
        'Amravati', 'Pune', 'Mumbai', 'Nagpur', 'Nashik', 'Akola', 'Mehkar',
        'Delhi', 'Bengaluru', 'Hyderabad', 'Chennai', 'Kolkata', 'Ahmedabad',
        'Jaipur', 'Lucknow', 'Bhopal', 'Patna', 'Ranchi', 'Bhubaneswar', 'Kochi'
      ];
      topHubs.forEach(hubName => {
        const found = (typeof INDIAN_CITIES !== 'undefined' ? INDIAN_CITIES : []).find(
          c => c.city.toLowerCase() === hubName.toLowerCase()
        );
        if (found && !seen.has(found.city)) {
          seen.add(found.city);
          results.push(found);
        }
      });
      return results.slice(0, 15);
    }

    const tier1StartsCity = [];
    const tier2StartsAlias = [];
    const tier3ContainsCity = [];
    const tier4ContainsAlias = [];
    const tier5StateMatch = [];

    const cityList = typeof INDIAN_CITIES !== 'undefined' ? INDIAN_CITIES : [];

    for (const c of cityList) {
      const cityName = c.city.toLowerCase();
      const stateName = c.state.toLowerCase();
      const aliases = (c.aliases || []).map(a => a.toLowerCase());

      if (cityName.startsWith(q)) {
        tier1StartsCity.push(c);
      } else if (aliases.some(a => a.startsWith(q))) {
        tier2StartsAlias.push(c);
      } else if (cityName.includes(q)) {
        tier3ContainsCity.push(c);
      } else if (aliases.some(a => a.includes(q))) {
        tier4ContainsAlias.push(c);
      } else if (stateName.includes(q)) {
        tier5StateMatch.push(c);
      }
    }

    const combined = [
      ...tier1StartsCity,
      ...tier2StartsAlias,
      ...tier3ContainsCity,
      ...tier4ContainsAlias,
      ...tier5StateMatch
    ];

    for (const item of combined) {
      const key = `${item.city}_${item.state}`;
      if (!seen.has(key)) {
        seen.add(key);
        results.push(item);
        if (results.length >= 20) break; // Crisp, performant list
      }
    }

    return results;
  }

  function renderDropdown(items, query = '') {
    currentMatches = items;
    activeIndex = -1;

    if (items.length === 0) {
      dropdown.innerHTML = `
        <div class="city-autocomplete-empty">
          No matching cities found in directory.<br>
          <small style="color: var(--text-muted);">You can keep your manual entry: "<strong>${escapeHtml(query)}</strong>"</small>
        </div>
      `;
      dropdown.classList.add('show');
      return;
    }

    dropdown.innerHTML = items.map((item, idx) => {
      if (item.isAllOption) {
        return `
          <div class="city-autocomplete-item" data-idx="${idx}">
            <span class="city-icon">🌐</span>
            <div class="city-info">
              <strong style="color: var(--primary);">${escapeHtml(item.displayName)}</strong>
              <span class="city-state">Pan-India</span>
            </div>
          </div>
        `;
      }

      const q = (query || '').trim().toLowerCase();
      let highlightedName = escapeHtml(item.city);
      if (q && item.city.toLowerCase().includes(q)) {
        const regex = new RegExp(`(${escapeRegex(q)})`, 'gi');
        highlightedName = item.city.replace(regex, '<mark>$1</mark>');
      }

      return `
        <div class="city-autocomplete-item" data-idx="${idx}">
          <span class="city-icon">📍</span>
          <div class="city-info">
            <strong>${highlightedName} — <span style="font-weight: 500; color: var(--text-muted);">${escapeHtml(item.state)}</span></strong>
            <span class="city-state">${escapeHtml(item.state)}</span>
          </div>
        </div>
      `;
    }).join('');

    dropdown.classList.add('show');

    // Attach click and touch listeners (pointerdown + mousedown preventDefault to avoid blur before click)
    dropdown.querySelectorAll('.city-autocomplete-item').forEach(el => {
      const handleSelect = (e) => {
        e.preventDefault();
        const idx = Number(el.getAttribute('data-idx'));
        if (!isNaN(idx) && currentMatches[idx]) {
          selectCity(currentMatches[idx]);
        }
      };

      el.addEventListener('pointerdown', handleSelect);
      el.addEventListener('mousedown', handleSelect);
    });
  }

  function selectCity(cityObj) {
    if (!cityObj) return;

    if (cityObj.isAllOption) {
      input.value = '';
    } else {
      input.value = cityObj.city;
    }

    // Auto-fill state if configured
    if (stateInputId) {
      const stateEl = document.getElementById(stateInputId);
      if (stateEl) {
        stateEl.value = cityObj.isAllOption ? '' : (cityObj.state || '');
        stateEl.dispatchEvent(new Event('input', { bubbles: true }));
        stateEl.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }

    // Auto-fill coordinates if configured
    if (latInputId) {
      const latEl = document.getElementById(latInputId);
      if (latEl) {
        latEl.value = (!cityObj.isAllOption && cityObj.lat) ? cityObj.lat : '';
        latEl.dispatchEvent(new Event('input', { bubbles: true }));
        latEl.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
    if (lngInputId) {
      const lngEl = document.getElementById(lngInputId);
      if (lngEl) {
        lngEl.value = (!cityObj.isAllOption && cityObj.lng) ? cityObj.lng : '';
        lngEl.dispatchEvent(new Event('input', { bubbles: true }));
        lngEl.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }

    dropdown.classList.remove('show');
    currentMatches = [];

    // Trigger change event on input so forms and listeners detect update
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));

    if (typeof onSelect === 'function') {
      onSelect(cityObj);
    }
  }

  // Event Listeners
  input.addEventListener('input', () => {
    const q = input.value.trim();
    const cityList = typeof INDIAN_CITIES !== 'undefined' ? INDIAN_CITIES : [];
    const exact = cityList.find(c => c.city.toLowerCase() === q.toLowerCase());

    if (exact) {
      if (stateInputId) {
        const stateEl = document.getElementById(stateInputId);
        if (stateEl) stateEl.value = exact.state;
      }
      if (latInputId) {
        const latEl = document.getElementById(latInputId);
        if (latEl) latEl.value = exact.lat;
      }
      if (lngInputId) {
        const lngEl = document.getElementById(lngInputId);
        if (lngEl) lngEl.value = exact.lng;
      }
    } else if (!q) {
      if (latInputId) {
        const latEl = document.getElementById(latInputId);
        if (latEl) latEl.value = '';
      }
      if (lngInputId) {
        const lngEl = document.getElementById(lngInputId);
        if (lngEl) lngEl.value = '';
      }
    }

    const matches = filterCities(input.value);
    renderDropdown(matches, input.value);
  });

  input.addEventListener('focus', () => {
    const matches = filterCities(input.value);
    renderDropdown(matches, input.value);
  });

  input.addEventListener('keydown', (e) => {
    if (!dropdown.classList.contains('show') || currentMatches.length === 0) {
      if (e.key === 'ArrowDown') {
        renderDropdown(filterCities(input.value), input.value);
      }
      return;
    }

    const items = dropdown.querySelectorAll('.city-autocomplete-item');

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIndex = (activeIndex + 1) % items.length;
      updateActiveItem(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = (activeIndex - 1 + items.length) % items.length;
      updateActiveItem(items);
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && activeIndex < currentMatches.length) {
        e.preventDefault();
        selectCity(currentMatches[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      dropdown.classList.remove('show');
    }
  });

  function updateActiveItem(items) {
    items.forEach((item, idx) => {
      if (idx === activeIndex) {
        item.classList.add('active');
        item.scrollIntoView({ block: 'nearest' });
      } else {
        item.classList.remove('active');
      }
    });
  }

  // Close when clicking or tapping outside
  document.addEventListener('pointerdown', (e) => {
    if (!wrapper.contains(e.target)) {
      dropdown.classList.remove('show');
    }
  });

  return {
    setValue: (cityName) => {
      input.value = cityName || '';
    },
    selectCity
  };
}

/**
 * Reusable "📍 Use My Current Location" helper
 * Uses browser navigator.geolocation + Free OpenStreetMap Nominatim reverse geocoding
 * with automatic fallback to local Indian Cities dataset.
 */
function initLocationDetector(config) {
  const {
    buttonId,
    cityInputId = null,
    areaInputId = null,
    stateInputId = null,
    latInputId = null,
    lngInputId = null,
    statusTextId = null,
    onDetected = null
  } = config;

  const btn = document.getElementById(buttonId);
  if (!btn) return;

  btn.addEventListener('click', async (e) => {
    e.preventDefault();

    const originalHtml = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner-sm"></span> Detecting location...`;

    const statusEl = statusTextId ? document.getElementById(statusTextId) : null;
    if (statusEl) {
      statusEl.innerText = 'Requesting browser location permission...';
      statusEl.style.color = 'var(--primary)';
    }

    try {
      // 1. Request location via browser navigator.geolocation
      const pos = await new Promise((resolve) => {
        if (!navigator.geolocation) {
          resolve({
            success: false,
            message: 'Geolocation is not supported by your browser. Please select your city manually.'
          });
          return;
        }

        navigator.geolocation.getCurrentPosition(
          (p) => {
            resolve({
              success: true,
              latitude: p.coords.latitude,
              longitude: p.coords.longitude
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
              message: msg
            });
          },
          { timeout: 10000, enableHighAccuracy: true }
        );
      });

      if (!pos.success) {
        throw new Error(pos.message);
      }

      const { latitude: lat, longitude: lng } = pos;

      if (statusEl) {
        statusEl.innerText = 'Resolving city and state...';
      }

      // 2. Reverse geocode coordinates using free OpenStreetMap Nominatim
      let detectedCity = '';
      let detectedArea = '';
      let detectedState = '';

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);

        const revUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=14&addressdetails=1`;
        const res = await fetch(revUrl, {
          signal: controller.signal,
          headers: { 'Accept': 'application/json' }
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          const addr = data.address || {};
          detectedCity = addr.city || addr.town || addr.municipality || addr.state_district || addr.county || addr.district || '';
          detectedArea = addr.suburb || addr.neighbourhood || addr.residential || addr.road || addr.subdistrict || '';
          detectedState = addr.state || '';
        }
      } catch (osmErr) {
        // Reverse geocoding network/timeout failure - will gracefully fallback to local dataset
        console.info('Nominatim lookup bypassed or timed out, falling back to local dataset');
      }

      // 3. Fallback to nearest city in local INDIAN_CITIES dataset
      if (typeof findNearestCity === 'function') {
        const nearest = findNearestCity(lat, lng);
        if (nearest) {
          if (!detectedCity) {
            detectedCity = nearest.city;
          }
          if (!detectedState) {
            detectedState = nearest.state;
          }
          // Align spelling with normalized Indian cities dataset if close
          if (nearest.distanceKm < 30 && (!detectedCity || nearest.city.toLowerCase() === detectedCity.toLowerCase())) {
            detectedCity = nearest.city;
            detectedState = nearest.state;
          }
        }
      }

      if (!detectedCity) {
        detectedCity = 'Local Area';
      }

      // 4. Automatically fill the location fields
      if (cityInputId && detectedCity) {
        const cityEl = document.getElementById(cityInputId);
        if (cityEl) {
          cityEl.value = detectedCity;
          cityEl.dispatchEvent(new Event('input', { bubbles: true }));
          cityEl.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }

      if (areaInputId && detectedArea) {
        const areaEl = document.getElementById(areaInputId);
        if (areaEl) {
          areaEl.value = detectedArea;
          areaEl.dispatchEvent(new Event('input', { bubbles: true }));
          areaEl.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }

      if (stateInputId && detectedState) {
        const stateEl = document.getElementById(stateInputId);
        if (stateEl) {
          stateEl.value = detectedState;
          stateEl.dispatchEvent(new Event('input', { bubbles: true }));
          stateEl.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }

      // 5. Store latitude and longitude
      if (latInputId) {
        const latEl = document.getElementById(latInputId);
        if (latEl) {
          latEl.value = lat;
          latEl.dispatchEvent(new Event('input', { bubbles: true }));
          latEl.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }

      if (lngInputId) {
        const lngEl = document.getElementById(lngInputId);
        if (lngEl) {
          lngEl.value = lng;
          lngEl.dispatchEvent(new Event('input', { bubbles: true }));
          lngEl.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }

      // 6. Show success message
      const successMsg = `Location detected: ${detectedCity}${detectedState ? `, ${detectedState}` : ''}`;

      if (statusEl) {
        statusEl.innerText = `✓ ${successMsg}`;
        statusEl.style.color = '#15803d'; // Rich green
      }

      if (typeof showToast === 'function') {
        showToast(successMsg, 'success');
      }

      if (typeof onDetected === 'function') {
        onDetected({
          city: detectedCity,
          area: detectedArea,
          state: detectedState,
          latitude: lat,
          longitude: lng
        });
      }

    } catch (err) {
      console.warn('Location detection notice:', err.message);
      const friendlyMsg = err.message || 'Location permission denied. Please select your city manually.';
      if (statusEl) {
        statusEl.innerText = friendlyMsg;
        statusEl.style.color = 'var(--text-muted)';
      }
      if (typeof showToast === 'function') {
        showToast(friendlyMsg, 'info');
      }
    } finally {
      btn.disabled = false;
      btn.innerHTML = originalHtml;
    }
  });
}

function escapeRegex(string) {
  return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Export for Node.js test environment if required
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initCityAutocomplete, initLocationDetector };
}

/* LMD autocomplete accessibility enhancement */
(function () {
  "use strict";

  function enhanceInput(input) {
    if (!input || input.dataset.lmdEnhanced === "1") return;
    input.dataset.lmdEnhanced = "1";
    input.setAttribute("autocomplete", "off");
    input.setAttribute("role", "combobox");
    input.setAttribute("aria-autocomplete", "list");

    input.addEventListener("keydown", function (e) {
      var list = document.querySelector(
        ".city-suggestions, .city-autocomplete-results, .autocomplete-results, [data-city-suggestions]"
      );
      if (!list) return;
      var items = Array.from(list.querySelectorAll(
        "[role='option'], .city-option, .city-suggestion, .autocomplete-item"
      ));
      if (!items.length) return;
      var active = list.querySelector("[aria-selected='true'], .active, .selected");
      var i = active ? items.indexOf(active) : -1;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        i = (i + 1) % items.length;
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        i = (i - 1 + items.length) % items.length;
      } else if (e.key === "Enter" && i >= 0) {
        e.preventDefault();
        items[i].click();
        return;
      } else if (e.key === "Escape") {
        return;
      } else {
        return;
      }

      items.forEach(function (el) {
        el.classList.remove("active");
        el.setAttribute("aria-selected", "false");
      });
      items[i].classList.add("active");
      items[i].setAttribute("aria-selected", "true");
    });
  }

  function scan() {
    document.querySelectorAll(
      'input[placeholder*="city" i], input[placeholder*="location" i], input[data-city], .city-input'
    ).forEach(enhanceInput);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scan);
  } else {
    scan();
  }
  new MutationObserver(scan).observe(document.documentElement, { childList: true, subtree: true });
})();
