import { useState } from "react";

/* =========================================
   DEPARTMENTS
========================================= */

const departments = [
  "Computer Science and Engineering",
  "Mining Engineering",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering"
];


/* =========================================
   FACULTY DATA
   Sample data - replace with Django API data
========================================= */

const facultyList = [
  {
    id: "FAC001",
    name: "Sasmita Pani",
    department: "Computer Science and Engineering"
  },
  {
    id: "FAC002",
    name: "Dr. Yogesh Kumar Nayak",
    department: "Electrical Engineering"
  },
  {
    id: "FAC003",
    name: "Soumitra Das",
    department: "Computer Science and Engineering"
  },
  {
    id: "FAC004",
    name: "Dr. Rajesh Kumar Tripathy",
    department: "Computer Science and Engineering"
  }
];


/* =========================================
   TIME SLOTS
========================================= */

const timeSlots = [
  "9:00-9:55",
  "10:00-10:55",
  "11:05-12:00",
  "12:05-1:00",
  "1:00-2:30",
  "2:30-3:20",
  "3:20-4:10",
  "4:10-5:00"
];


/* =========================================
   SAMPLE FACULTY AVAILABILITY

   A = Available
   N = Not Available
   L = Lunch Break
========================================= */

const availabilityData = {
  FAC001: [
    ["A", "A", "N", "A", "L", "A", "A", "N"],
    ["A", "N", "A", "A", "L", "A", "N", "A"],
    ["A", "A", "A", "N", "L", "A", "A", "A"],
    ["N", "A", "A", "A", "L", "A", "N", "A"],
    ["A", "A", "N", "A", "L", "A", "A", "A"],
    ["A", "A", "A", "A", "L", "N", "N", "N"]
  ],

  FAC002: [
    ["A", "N", "A", "A", "L", "A", "A", "A"],
    ["A", "A", "A", "N", "L", "A", "N", "A"],
    ["N", "A", "A", "A", "L", "A", "A", "N"],
    ["A", "A", "N", "A", "L", "A", "A", "A"],
    ["A", "N", "A", "A", "L", "A", "A", "N"],
    ["A", "A", "A", "A", "L", "N", "N", "N"]
  ],

  FAC003: [
    ["A", "A", "A", "N", "L", "A", "A", "A"],
    ["N", "A", "A", "A", "L", "A", "A", "N"],
    ["A", "N", "A", "A", "L", "A", "N", "A"],
    ["A", "A", "A", "N", "L", "A", "A", "A"],
    ["N", "A", "A", "A", "L", "A", "A", "A"],
    ["A", "A", "A", "A", "L", "N", "N", "N"]
  ],

  FAC004: [
    ["N", "A", "A", "A", "L", "A", "N", "A"],
    ["A", "A", "N", "A", "L", "A", "A", "A"],
    ["A", "A", "A", "A", "L", "N", "A", "A"],
    ["A", "N", "A", "A", "L", "A", "A", "N"],
    ["A", "A", "A", "N", "L", "A", "A", "A"],
    ["A", "A", "A", "A", "L", "N", "N", "N"]
  ]
};


/* =========================================
   DAYS
========================================= */

const days = [
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT"
];


/* =========================================
   MAIN COMPONENT
========================================= */

function FacultyAvailability() {

  const [department, setDepartment] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [showAvailability, setShowAvailability] = useState(false);

  // Faculty list based on selected department
  const filteredFaculty = facultyList.filter(
    (faculty) => faculty.department === department
  );

  // Selected faculty details
  const selectedFaculty = facultyList.find(
    (faculty) => faculty.id === facultyId
  );

  // Availability of selected faculty
  const facultySchedule = availabilityData[facultyId] || [];

  
  /* =========================================
     DEPARTMENT CHANGE
  ========================================= */

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
    setFacultyId("");
    setShowAvailability(false);
  };


  /* =========================================
     FACULTY CHANGE
  ========================================= */

  const handleFacultyChange = (event) => {
    setFacultyId(event.target.value);
    setShowAvailability(false);
  };


  /* =========================================
     SHOW AVAILABILITY
  ========================================= */

  const handleShowAvailability = () => {

    if (!department || !facultyId) {
      alert("Please select department and faculty first.");
      return;
    }

    setShowAvailability(true);
  };


  /* =========================================
     CLEAR FILTERS
  ========================================= */

  const handleClearFilters = () => {
    setDepartment("");
    setFacultyId("");
    setShowAvailability(false);
  };


  /* =========================================
     GET AVAILABILITY STATUS
  ========================================= */

  const getStatus = (status) => {

    if (status === "A") {
      return {
        label: "Available",
        className: "availability-available"
      };
    }

    if (status === "N") {
      return {
        label: "Not Available",
        className: "availability-unavailable"
      };
    }

    return {
      label: "Lunch Break",
      className: "lunch-cell"
    };
  };


  /* =========================================
     JSX
  ========================================= */

  return (

    <div className="faculties-page">

      {/* PAGE HEADER */}

      <div className="page-header">
        <div>
          <h2>Faculty Availability</h2>
          <p>
            View faculty availability by department, faculty and time slot.
          </p>
        </div>
      </div>


      {/* FILTER TOOLBAR */}

      <div className="toolbar faculty-toolbar">

        {/* DEPARTMENT DROPDOWN */}

        <select
          className="faculty-filter-select"
          value={department}
          onChange={handleDepartmentChange}
        >
          <option value="">Select Department</option>

          {departments.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}

        </select>


        {/* FACULTY DROPDOWN */}

        <select
          className="faculty-filter-select"
          value={facultyId}
          onChange={handleFacultyChange}
          disabled={!department}
        >
          <option value="">Select Faculty</option>

          {filteredFaculty.map((faculty) => (
            <option key={faculty.id} value={faculty.id}>
              {faculty.id} - {faculty.name}
            </option>
          ))}

        </select>


        {/* SHOW AVAILABILITY BUTTON */}

        <button
          type="button"
          className="primary-button"
          onClick={handleShowAvailability}
          disabled={!department || !facultyId}
        >
          Show Availability
        </button>


        {/* CLEAR FILTER BUTTON */}

        <button
          type="button"
          className="faculty-clear-button"
          onClick={handleClearFilters}
        >
          Clear Filters
        </button>

      </div>


      {/* RESULT INFORMATION */}

      <div className="faculty-result-info">

        {!department ? (

          <span>
            Select a department and faculty to view availability.
          </span>

        ) : !facultyId ? (

          <span>
            Department selected: <strong>{department}</strong>.
            Now select a faculty member.
          </span>

        ) : showAvailability ? (

          <span>
            Availability displayed for{" "}
            <strong>{selectedFaculty?.name}</strong>
            {" | "}
            <strong>{selectedFaculty?.id}</strong>
          </span>

        ) : (

          <span>
            Click Show Availability to view the selected faculty's weekly schedule.
          </span>

        )}

      </div>


      {/* AVAILABILITY TABLE */}

      {showAvailability && selectedFaculty && (

        <>

          {/* FACULTY INFORMATION */}

          <div className="timetable-info">

            <div>
              <span>Faculty ID</span>
              <strong>{selectedFaculty.id}</strong>
            </div>

            <div>
              <span>Faculty Name</span>
              <strong>{selectedFaculty.name}</strong>
            </div>

            <div>
              <span>Department</span>
              <strong>{selectedFaculty.department}</strong>
            </div>

          </div>

          {/* WEEKLY AVAILABILITY TABLE */}

          <div className="generated-table-wrapper">

            <table className="generated-weekly-table">

              <thead>
                <tr>
                  <th>DAY</th>

                  {timeSlots.map((slot) => (
                    <th key={slot}>{slot}</th>
                  ))}

                </tr>
              </thead>

              <tbody>

                {days.map((day, dayIndex) => (

                  <tr key={day}>

                    <td className="day-cell">
                      {day}
                    </td>

                    {timeSlots.map((slot, slotIndex) => {

                      const status = getStatus(
                        facultySchedule[dayIndex]?.[slotIndex]
                      );

                      return (

                        <td
                          key={`${day}-${slot}`}
                          className={`availability-cell ${status.className}`}
                        >
                          {status.label}
                        </td>

                      );

                    })}

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </>

      )}

    </div>

  );

}

export default FacultyAvailability;