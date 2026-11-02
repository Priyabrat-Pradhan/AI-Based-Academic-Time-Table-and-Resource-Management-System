import { useState } from "react";

function Navbar({ activePage, onLogout }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "New faculty leave request received.",
      time: "5 minutes ago",
      read: false,
    },
    {
      id: 2,
      message: "Timetable is waiting for approval.",
      time: "20 minutes ago",
      read: false,
    },
    {
      id: 3,
      message: "New resource has been added.",
      time: "1 hour ago",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const markAsRead = (id) => {
    setNotifications((previousNotifications) =>
      previousNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((previousNotifications) =>
      previousNotifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowProfileMenu(false);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowNotifications(false);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (confirmLogout && onLogout) {
      onLogout();
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-heading">
        <h1>{activePage}</h1>

        <p>
          AI Based Academic Timetable & Resource Management
        </p>
      </div>

      <div className="navbar-actions">
        {/* Notification Section */}
        <div className="navbar-dropdown-wrapper">
          <button
            className="notification-button"
            onClick={toggleNotifications}
            title="Notifications"
          >
            <span className="notification-symbol">🔔</span>

            {unreadCount > 0 && (
              <span className="notification-count">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="notification-dropdown">
              <div className="dropdown-header">
                <strong>Notifications</strong>

                {unreadCount > 0 && (
                  <button onClick={markAllAsRead}>
                    Mark all as read
                  </button>
                )}
              </div>

              <div className="notification-list">
                {notifications.length === 0 ? (
                  <p className="empty-notification">
                    No notifications available.
                  </p>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={
                        notification.read
                          ? "notification-item read"
                          : "notification-item unread"
                      }
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="notification-content">
                        <p>{notification.message}</p>
                        <small>{notification.time}</small>
                      </div>

                      {!notification.read && (
                        <span className="unread-dot"></span>
                      )}
                    </div>
                  ))
                )}
              </div>

              <div className="dropdown-footer">
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    alert("All notifications are displayed here.");
                  }}
                >
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Admin Profile Section */}
        <div className="navbar-dropdown-wrapper">
          <button
            className="admin-profile-button"
            onClick={toggleProfileMenu}
          >
            <div className="avatar">
              A
            </div>

            <div className="admin-details">
              <strong>Admin</strong>
              <small>Administrator</small>
            </div>

            <span className="dropdown-arrow">
              {showProfileMenu ? "▲" : "▼"}
            </span>
          </button>

          {showProfileMenu && (
            <div className="profile-dropdown">
              <div className="profile-dropdown-header">
                <div className="large-avatar">A</div>

                <div>
                  <strong>Admin</strong>
                  <small>Administrator</small>
                </div>
              </div>

              <div className="profile-menu-divider"></div>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  alert("Change password feature will be available soon.");
                }}
              >
                Change Password
              </button>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  alert("Help and support section will be available soon.");
                }}
              >
                Help & Support
              </button>

              <div className="profile-menu-divider"></div>

              <button
                className="logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;