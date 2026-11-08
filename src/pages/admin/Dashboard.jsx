import React from "react";

function Dashboard({ setActivePage }) {

  // Dashboard statistics (sample data)
  const statistics = [
    {
      count: "48",
      title: "Faculties",
      page: "Faculties"
    },
    {
      count: "1,240",
      title: "Students",
      page: "Students"
    },
    {
      count: "8",
      title: "Departments",
      page: "Departments"
    },
    {
      count: "86",
      title: "Subjects",
      page: "Subjects"
    },
    {
      count: "24",
      title: "Classrooms",
      page: "Classrooms"
    },
    {
      count: "10",
      title: "Laboratories",
      page: "Laboratories"
    },
    {
      count: "200",
      title: "Resource and Equipments",
      page: "Resource / Equipment"
    }
  ];

  // Management shortcuts
  const managementItems = [
    {
      title: "Manage Faculties",
      description: "Add, edit and manage faculty information.",
      page: "Faculties"
    },
    {
      title: "Manage Students",
      description: "View and manage student records.",
      page: "Students"
    },
    {
      title: "Manage Departments",
      description: "Manage academic departments.",
      page: "Departments"
    },
    {
      title: "Manage Subjects",
      description: "Add and manage academic subjects.",
      page: "Subjects"
    },
    {
      title: "Manage Classrooms",
      description: "Manage classroom details and capacity.",
      page: "Classrooms"
    },
    {
      title: "Manage Laboratories",
      description: "Manage laboratories and their purposes.",
      page: "Laboratories"
    },
    {
      title: "Manage Resources / Equipment",
      description: "Manage available academic resources and equipment.",
      page: "Resource / Equipment"
    }
  ];

  const handleNavigation = (page) => {
    if (typeof setActivePage === "function") {
      setActivePage(page);
    }
  };

  return (
    <div className="dashboard-page">

      {/* WELCOME SECTION */}
      <div className="welcome dashboard-welcome">

        <div>
          <h2>Academic Timetable Dashboard</h2>

          <p>
            Welcome to AI SmartTime. Manage your academic
            information and institutional resources.
          </p>
        </div>

      </div>


      {/* STATISTICS */}
      <div className="stats-container dashboard-stats">

        {statistics.map((item) => (

          <div
            className="stat-card"
            key={item.title}
            onClick={() => handleNavigation(item.page)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleNavigation(item.page);
              }
            }}
          >

            <div className="stat-content">

              <h3>{item.count}</h3>

              <p>{item.title}</p>

            </div>

          </div>

        ))}

      </div>


      {/* MANAGEMENT SECTION */}
      <div className="dashboard-management">

        <div className="dashboard-section-heading">

          <div>
            <h3>Academic Management</h3>

            <p>
              Select a module to manage academic information
              and resources.
            </p>
          </div>

        </div>


        <div className="management-grid">

          {managementItems.map((item) => (

            <div
              className="management-card"
              key={item.page}
            >

              <div className="management-card-content">

                <h3>{item.title}</h3>

                <p>{item.description}</p>

              </div>

              <button
                type="button"
                className="management-button"
                onClick={() => handleNavigation(item.page)}
              >
                Manage
                <span>→</span>
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;