function Sidebar({ activePage, setActivePage }) {

  const menu = [
    "Dashboard",
    "Faculties",
    "Students",
    "Departments",
    "Subjects",
    "Classrooms",
    "Laboratories",
    "Resource / Equipment",
    "Faculty Availability",
    "Room Availability",
    "Generated Timetable",
    "Leaves",
    "Substitute Requests",
    "Reports and Analytics",
    "Settings / Profile"
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-text">
          <h2>
            <span className="ai-text">AI</span>{" "}
            <span className="smart-text">SmartTime</span>
          </h2>
          <p>ACADEMIC TIMETABLE</p>
        </div>
      </div>

      <div className="menu-title">
        MAIN MENU
      </div>

      <nav>
        {menu.map((item) => (
          <button
            key={item}
            onClick={() => setActivePage(item)}
            className={
              activePage === item
                ? "nav-item active"
                : "nav-item"
            }>

            <span>{item}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p>AI Timetable System</p>
        <small>Version 1.0</small>
      </div>
    </aside>
  );
}

export default Sidebar;