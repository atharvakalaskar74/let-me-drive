// ==========================================================================
// LET ME DRIVE - Authentication & User State Management
// ==========================================================================

function getStoredUser() {
  const userJson = localStorage.getItem('user');
  if (!userJson) return null;
  try {
    return JSON.parse(userJson);
  } catch (e) {
    return null;
  }
}

function getStoredToken() {
  return localStorage.getItem('token');
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  showToast('You have been logged out.', 'info');
  setTimeout(() => {
    window.location.href = '/login.html';
  }, 500);
}

/**
 * Ensures user is authenticated and authorized for specific pages
 */
function requireAuth(allowedRoles = []) {
  const token = getStoredToken();
  const user = getStoredUser();

  if (!token || !user) {
    window.location.href = '/login.html?redirect=' + encodeURIComponent(window.location.pathname);
    return false;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect to correct dashboard according to their role
    if (user.role === 'owner') {
      window.location.href = '/owner-dashboard.html';
    } else {
      window.location.href = '/driver-dashboard.html';
    }
    return false;
  }

  return true;
}

/**
 * Initializes and renders the responsive navigation bar
 */
function initNavbar() {
  const navAuthContainer = document.getElementById('navAuth');
  if (!navAuthContainer) return;

  const user = getStoredUser();
  const token = getStoredToken();

  if (token && user) {
    const dashboardUrl = user.role === 'owner' ? '/owner-dashboard.html' : '/driver-dashboard.html';
    const roleTitle = user.role === 'owner' ? 'Car Owner' : 'Professional Driver';
    const initials = (user.name || 'User').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

    navAuthContainer.innerHTML = `
      <div style="position: relative;">
        <button class="notification-btn" id="notifBtn" title="Notifications">
          🔔
          <span class="notification-badge" id="notifBadge">0</span>
        </button>
        <div class="notification-dropdown" id="notifDropdown">
          <div class="notification-header">
            <h4>Notifications</h4>
            <button class="mark-all-btn" id="markAllReadBtn">Mark all read</button>
          </div>
          <ul class="notification-list" id="notifList">
            <li style="padding: 20px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
              Loading notifications...
            </li>
          </ul>
        </div>
      </div>

      <div style="position: relative;">
        <div class="nav-user" id="userMenuBtn">
          ${user.profileImage ? `
            <img src="${user.profileImage}" alt="${user.name}" class="user-avatar" />
          ` : `
            <div class="user-avatar">${initials}</div>
          `}
          <div class="user-info">
            <span class="user-name">${user.name}</span>
            <span class="user-role-badge">${roleTitle}</span>
          </div>
          <span style="font-size: 0.75rem; color: var(--text-muted);">▼</span>
        </div>

        <div class="dropdown-menu" id="userDropdown">
          <a href="${dashboardUrl}" class="dropdown-item">📊 My Dashboard</a>
          <a href="/profile.html" class="dropdown-item">👤 My Profile</a>
          ${user.role === 'owner' ? `
            <a href="/drivers.html" class="dropdown-item">🔍 Browse Drivers</a>
          ` : `
            <a href="/jobs.html" class="dropdown-item">💼 Browse Jobs</a>
          `}
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item" id="logoutLink" style="color: var(--danger);">🚪 Logout</a>
        </div>
      </div>
    `;

    // Dropdown toggle
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userDropdown = document.getElementById('userDropdown');
    userMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      userDropdown.classList.toggle('show');
    });

    document.addEventListener('click', () => {
      userDropdown.classList.remove('show');
    });

    document.getElementById('logoutLink').addEventListener('click', (e) => {
      e.preventDefault();
      logout();
    });

    // Initialize in-app notification dropdown
    initNotifications();

  } else {
    // Visitor / Guest navigation
    navAuthContainer.innerHTML = `
      <a href="/login.html" class="btn btn-outline" style="padding: 8px 18px; font-size: 0.88rem;">Log In</a>
      <a href="/register.html" class="btn btn-primary" style="padding: 8px 20px; font-size: 0.88rem;">Register</a>
    `;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
});
