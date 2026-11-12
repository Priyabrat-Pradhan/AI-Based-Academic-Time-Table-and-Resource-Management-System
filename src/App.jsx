import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/admin/Dashboard";
import Faculties from "./pages/admin/Faculties";
import Students from "./pages/admin/Students";
import Departments from "./pages/admin/Departments";
import Subjects from "./pages/admin/Subjects";
import Classrooms from "./pages/admin/Classrooms";
import Laboratories from "./pages/admin/Laboratories";
import LeaveManagement from "./pages/admin/LeaveManagement";
import ResourceEquipment from "./pages/admin/ResourceEquipment";
import FacultyAvailability from "./pages/admin/FacultyAvailability";
import RoomAvailability from "./pages/admin/RoomAvailability";
import GeneratedTimetable from "./pages/admin/GeneratedTimetable";
import SubstituteRequests from "./pages/admin/SubstituteRequests";
import ReportsAnalytics from "./pages/admin/ReportsAnalytics";
import SettingsProfile from "./pages/admin/SettingsProfile";

import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "Dashboard":
        return <Dashboard setActivePage={setActivePage} />;

      case "Faculty Members":
        return <Faculties />;

      case "Students":
        return <Students />;

      case "Departments":
        return <Departments />;

      case "Subjects":
        return <Subjects />;

      case "Classrooms":
        return <Classrooms />;

      case "Laboratories":
        return <Laboratories />;

      case "Leaves":
        return <LeaveManagement />;

      case "Resource / Equipment":
        return <ResourceEquipment />;

      case "Faculty Availability":
        return <FacultyAvailability />;

      case "Room Availability":
        return <RoomAvailability />;

      case "Generated Timetable":
        return <GeneratedTimetable />;

      case "Substitute Requests":
        return <SubstituteRequests />;

      case "Reports and Analytics":
        return <ReportsAnalytics />;

      case "Settings / Profile":
        return <SettingsProfile />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <div className="main-content">

        <Navbar
         activePage={activePage}
         
         onLogout={() => {
          setActivePage("Login");
         }}
        />

        <main className="page-content">
          {renderPage()}
        </main>

      </div>

    </div>
  );
}

export default App;