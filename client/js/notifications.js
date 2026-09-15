// ==========================================================================
// LET ME DRIVE - In-App Notifications System
// ==========================================================================

async function initNotifications() {
  const notifBtn = document.getElementById('notifBtn');
  const notifBadge = document.getElementById('notifBadge');
  const notifDropdown = document.getElementById('notifDropdown');
  const notifList = document.getElementById('notifList');
  const markAllReadBtn = document.getElementById('markAllReadBtn');

  if (!notifBtn) return;

  // Toggle notification panel
  notifBtn.addEventListener('click', async (e) => {
    e.stopPropagation();
    notifDropdown.classList.toggle('show');
    if (notifDropdown.classList.contains('show')) {
      await loadNotifications();
    }
  });

  document.addEventListener('click', (e) => {
    if (!notifDropdown.contains(e.target) && e.target !== notifBtn) {
      notifDropdown.classList.remove('show');
    }
  });

  // Mark all as read
  if (markAllReadBtn) {
    markAllReadBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      try {
        await apiRequest('/notifications/read-all', { method: 'PUT' });
        notifBadge.style.display = 'none';
        notifBadge.innerText = '0';
        await loadNotifications();
        showToast('All notifications marked as read', 'success');
      } catch (err) {
        showToast(err.message, 'error');
      }
    });
  }

  // Initial unread count fetch
  await updateUnreadCount();
}

async function updateUnreadCount() {
  const notifBadge = document.getElementById('notifBadge');
  if (!notifBadge) return;

  try {
    const data = await apiRequest('/notifications/unread-count');
    if (data.success && data.count > 0) {
      notifBadge.innerText = data.count > 9 ? '9+' : data.count;
      notifBadge.style.display = 'flex';
    } else {
      notifBadge.style.display = 'none';
    }
  } catch (err) {
    // Silently ignore if not logged in
  }
}

async function loadNotifications() {
  const notifList = document.getElementById('notifList');
  if (!notifList) return;

  try {
    const data = await apiRequest('/notifications');
    if (!data.success || !data.notifications || data.notifications.length === 0) {
      notifList.innerHTML = `
        <li style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
          No notifications yet.
        </li>
      `;
      return;
    }

    notifList.innerHTML = data.notifications.map(n => {
      const timeAgo = getTimeAgo(new Date(n.createdAt));
      return `
        <li class="notification-item ${!n.isRead ? 'unread' : ''}" onclick="markNotificationRead('${n._id}')">
          <div class="notification-title">${escapeHtml(n.title)}</div>
          <div>${escapeHtml(n.message)}</div>
          <div class="notification-time">${timeAgo}</div>
        </li>
      `;
    }).join('');

    // Update badge after loading
    if (data.unreadCount > 0) {
      const notifBadge = document.getElementById('notifBadge');
      if (notifBadge) {
        notifBadge.innerText = data.unreadCount;
        notifBadge.style.display = 'flex';
      }
    }
  } catch (err) {
    notifList.innerHTML = `
      <li style="padding: 20px; color: var(--danger); text-align: center; font-size: 0.85rem;">
        Failed to load notifications.
      </li>
    `;
  }
}

async function markNotificationRead(id) {
  try {
    await apiRequest(`/notifications/${id}/read`, { method: 'PUT' });
    await updateUnreadCount();
  } catch (e) {
    // Ignore
  }
}

function getTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
