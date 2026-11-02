import { useState } from "react";

function SettingsProfile() {

  const [profile, setProfile] = useState({
    name: "Admin",
    email: "admin@college.edu",
    phone: "9876543210",
    role: "Administrator"
  });

  const [settings, setSettings] = useState({
    emailNotifications: true,
    timetableAlerts: true,
    leaveAlerts: true
  });

  const [saved, setSaved] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((previous) => ({
      ...previous,
      [name]: value
    }));
    setSaved(false);
  };

  const handleSave = (event) => {
    event.preventDefault();
    setSaved(true);
  };

  const toggleSetting = (name) => {
    setSettings((previous) => ({
      ...previous,
      [name]: !previous[name]
    }));
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Settings / Profile</h2>
          <p>Manage administrator profile and system preferences.</p>
        </div>

      </div>
      
      <div className="settings-grid">
        {/* PROFILE */}
        <div className="dashboard-panel">
          <h3>Administrator Profile</h3>
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Role</label>
              <input
                type="text"
                value={profile.role}
                disabled
              />
            </div>

            <button
              type="submit"
              className="primary-button">Save Changes
            </button>

            {saved && (
              <p className="save-message">
                Profile changes saved successfully.
              </p>
            )}

          </form>
        </div>

        {/* SYSTEM SETTINGS */}

        <div className="dashboard-panel">
          <h3>System Preferences</h3>
          <div className="setting-item">
            <div>
              <strong>Email Notifications</strong>

              <p>Receive important system updates.</p>
            </div>

            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={() =>
                toggleSetting("emailNotifications")
              }/>
          </div>

          <div className="setting-item">
            <div>
              <strong>Timetable Alerts</strong>
              <p>Receive timetable-related notifications.</p>
            </div>

            <input
              type="checkbox"
              checked={settings.timetableAlerts}
              onChange={() =>
                toggleSetting("timetableAlerts")
              }/>
            </div>

          <div className="setting-item">
            <div>
              <strong>Leave Alerts</strong>
              <p>Receive notifications about leave requests.</p>
            </div>

            <input
              type="checkbox"
              checked={settings.leaveAlerts}
              onChange={() =>
                toggleSetting("leaveAlerts")
              }/>

          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsProfile;