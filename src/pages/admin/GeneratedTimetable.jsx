import { useState } from "react";

const departments = [
  "Computer Science and Engineering",
  "Mining Engineering",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering"
];

const years = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year"
];

const getSemesters = (year) => {
  const semesterMap = {
    "1st Year": ["1st Semester", "2nd Semester"],
    "2nd Year": ["3rd Semester", "4th Semester"],
    "3rd Year": ["5th Semester", "6th Semester"],
    "4th Year": ["7th Semester", "8th Semester"]
  };

  return semesterMap[year] || [];
};


/* =========================================
   SAMPLE SUBJECT AND FACULTY DATA
========================================= */

const subjectDetails = [
  {
    code: "CSPE4002",
    name: "Software Project Management",
    facultyId: "FAC001",
    facultyName: "Sasmita Pani",
    email: "sasmita.pani@gcek.ac.in",
    type: "Subject",
    room: "303 Block-II"
  },
  {
    code: "EEPE3005",
    name: "Renewable Energy Sources",
    facultyId: "FAC002",
    facultyName: "Dr. Yogesh Kumar Nayak",
    email: "yogesh.nayak@gcek.ac.in",
    type: "Subject",
    room: "303 Block-II"
  },
  {
    code: "HSOE4001",
    name: "Marketing Management",
    facultyId: "FAC003",
    facultyName: "Soumitra Das",
    email: "soumitra.das@gcek.ac.in",
    type: "Subject",
    room: "303 Block-II"
  },
  {
    code: "PCAC4001",
    name: "Applied Data Science",
    facultyId: "FAC004",
    facultyName: "Dr. Rajesh Kumar Tripathy",
    email: "rajesh.tripathy@gcek.ac.in",
    type: "Subject",
    room: "303 Block-II"
  },
  {
    code: "CSPS4201",
    name: "Seminar on SIRE-II",
    facultyId: "FAC001",
    facultyName: "Sasmita Pani",
    email: "sasmita.pani@gcek.ac.in",
    type: "Seminar",
    room: "Seminar Hall"
  },
  {
    code: "CSPS4202",
    name: "Project for Product Development - II",
    facultyId: "FAC004",
    facultyName: "Dr. Rajesh Kumar Tripathy",
    email: "rajesh.tripathy@gcek.ac.in",
    type: "Project",
    room: "Project Lab-02"
  }
];


/* =========================================
   TIMETABLE DATA

   start:
   0 = 9:00-9:55
   1 = 10:00-10:55
   2 = 11:05-12:00
   3 = 12:05-1:00
   4 = Lunch
   5 = 2:30-3:20
   6 = 3:20-4:10
   7 = 4:10-5:00

   span = number of consecutive periods
========================================= */

const sampleSchedule = {
  department: "Computer Science and Engineering",
  year: "4th Year",
  semester: "7th Semester",
  academicYear: "2026-27",
  commonRoom: "303 Block-II",

  days: [
    {
      day: "MON",
      beforeLunch: [
        { start: 0, span: 1, label: "X", empty: true },
        { start: 1, span: 1, code: "EEPE3005" },
        { start: 2, span: 1, code: "PCAC4001" },
        { start: 3, span: 1, code: "HSOE4001" }
      ],
      afterLunch: [
        { start: 5, span: 3, code: "CSPS4201" }
      ]
    },
    {
      day: "TUE",
      beforeLunch: [
        { start: 0, span: 1, label: "X", empty: true },
        { start: 1, span: 1, code: "CSPE4002" },
        { start: 2, span: 1, code: "PCAC4001" },
        { start: 3, span: 1, code: "EEPE3005" }
      ],
      afterLunch: [
        { start: 5, span: 3, code: "CSPS4202" }
      ]
    },
    {
      day: "WED",
      beforeLunch: [
        { start: 0, span: 1, label: "X", empty: true },
        { start: 1, span: 1, code: "CSPE4002" },
        { start: 2, span: 1, code: "HSOE4001" },
        { start: 3, span: 1, code: "EEPE3005" }
      ],
      afterLunch: [
        { start: 5, span: 3, code: "CSPS4201" }
      ]
    },
    {
      day: "THU",
      beforeLunch: [
        { start: 0, span: 1, label: "X", empty: true },
        { start: 1, span: 1, code: "CSPE4002" },
        { start: 2, span: 1, code: "PCAC4001" },
        { start: 3, span: 1, code: "HSOE4001" }
      ],
      afterLunch: [
        { start: 5, span: 1, label: "X", empty: true },
        { start: 6, span: 1, label: "X", empty: true },
        { start: 7, span: 1, label: "X", empty: true }
      ]
    },
    {
      day: "FRI",
      beforeLunch: [
        {
          start: 0,
          span: 4,
          label: "TUTORIAL / EXTRA CLASSES",
          empty: false
        }
      ],
      afterLunch: [
        { start: 5, span: 3, code: "CSPS4202" }
      ]
    },
    {
      day: "SAT",
      beforeLunch: [
        { start: 0, span: 1, label: "X", empty: true },
        { start: 1, span: 1, label: "X", empty: true },
        { start: 2, span: 1, label: "X", empty: true },
        { start: 3, span: 1, label: "X", empty: true }
      ],
      afterLunch: [
        { start: 5, span: 1, label: "X", empty: true },
        { start: 6, span: 1, label: "X", empty: true },
        { start: 7, span: 1, label: "X", empty: true }
      ]
    }
  ],

  // Sessions used by the conflict checker
  sessions: [
    { day: "MON", start: 1, span: 1, code: "EEPE3005" },
    { day: "MON", start: 2, span: 1, code: "PCAC4001" },
    { day: "MON", start: 3, span: 1, code: "HSOE4001" },
    { day: "MON", start: 5, span: 3, code: "CSPS4201" },

    { day: "TUE", start: 1, span: 1, code: "CSPE4002" },
    { day: "TUE", start: 2, span: 1, code: "PCAC4001" },
    { day: "TUE", start: 3, span: 1, code: "EEPE3005" },
    { day: "TUE", start: 5, span: 3, code: "CSPS4202" },

    { day: "WED", start: 1, span: 1, code: "CSPE4002" },
    { day: "WED", start: 2, span: 1, code: "HSOE4001" },
    { day: "WED", start: 3, span: 1, code: "EEPE3005" },
    { day: "WED", start: 5, span: 3, code: "CSPS4201" },

    { day: "THU", start: 1, span: 1, code: "CSPE4002" },
    { day: "THU", start: 2, span: 1, code: "PCAC4001" },
    { day: "THU", start: 3, span: 1, code: "HSOE4001" },

    { day: "FRI", start: 5, span: 3, code: "CSPS4202" }
  ]
};


/* =========================================
   TIME SLOT LABELS
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
   HELPER FUNCTIONS
========================================= */

// Find subject information using subject code
const getSubject = (code) => {
  return subjectDetails.find(
    (subject) => subject.code === code
  );
};


// Display timetable cell content
const getCellLabel = (cell, schedule) => {
  if (cell.empty || !cell.code) {
    return cell.label || "X";
  }

  const subject = getSubject(cell.code);

  if (!subject) {
    return "Unknown Subject";
  }

  // Show room only for labs, seminars and projects
  if (
    ["Lab", "Seminar", "Project"].includes(subject.type)
  ) {
    return `${subject.name} (${subject.room})`;
  }

  return subject.name;
};


// Escape text before inserting it into exported HTML
const escapeHtml = (value) => {
  return String(value ?? "").replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return entities[character];
  });
};


/* =========================================
   CONFLICT DETECTION

   Checks:
   1. Same faculty in overlapping periods
   2. Same room in overlapping periods
   3. Multi-period sessions
========================================= */

const detectConflicts = (schedule) => {
  const conflicts = [];
  const occupiedSlots = [];

  schedule.sessions.forEach((session) => {
    const subject = getSubject(session.code);

    if (!subject) return;

    for (
      let slot = session.start;
      slot < session.start + session.span;
      slot++
    ) {
      occupiedSlots.push({
        day: session.day,
        slot,
        code: session.code,
        subjectName: subject.name,
        facultyId: subject.facultyId,
        facultyName: subject.facultyName,
        room: subject.room
      });
    }
  });

  // Compare every occupied slot with other occupied slots
  for (let i = 0; i < occupiedSlots.length; i++) {
    for (let j = i + 1; j < occupiedSlots.length; j++) {
      const first = occupiedSlots[i];
      const second = occupiedSlots[j];

      if (
        first.day !== second.day ||
        first.slot !== second.slot
      ) {
        continue;
      }

      if (first.code === second.code) continue;

      // Same faculty assigned to two different subjects
      if (first.facultyId === second.facultyId) {
        const key = [
          "FACULTY",
          first.day,
          first.slot,
          first.facultyId,
          [first.code, second.code].sort().join("-")
        ].join("|");

        if (!conflicts.some((item) => item.key === key)) {
          conflicts.push({
            key,
            type: "Faculty Conflict",
            day: first.day,
            time: timeSlots[first.slot],
            resource: first.facultyName,
            subjects: `${first.subjectName} / ${second.subjectName}`
          });
        }
      }

      // Same room assigned to two different subjects
      if (first.room === second.room) {
        const key = [
          "ROOM",
          first.day,
          first.slot,
          first.room,
          [first.code, second.code].sort().join("-")
        ].join("|");

        if (!conflicts.some((item) => item.key === key)) {
          conflicts.push({
            key,
            type: "Room Conflict",
            day: first.day,
            time: timeSlots[first.slot],
            resource: first.room,
            subjects: `${first.subjectName} / ${second.subjectName}`
          });
        }
      }
    }
  }

  return conflicts;
};


/* =========================================
   EXPORT HTML GENERATOR
========================================= */

const createExportHtml = (schedule, conflicts) => {
  const rows = schedule.days.map((day, index) => {
    const beforeLunch = day.beforeLunch.map((cell) => {
      return `
        <td colspan="${cell.span}">
          ${escapeHtml(getCellLabel(cell, schedule))}
        </td>
      `;
    }).join("");

    const afterLunch = day.afterLunch.map((cell) => {
      return `
        <td colspan="${cell.span}">
          ${escapeHtml(getCellLabel(cell, schedule))}
        </td>
      `;
    }).join("");

    const lunch = index === 0
      ? `<td rowspan="6" class="lunch">LUNCH<br/>BREAK</td>`
      : "";

    return `
      <tr>
        <td class="day">${escapeHtml(day.day)}</td>
        ${beforeLunch}
        ${lunch}
        ${afterLunch}
      </tr>
    `;
  }).join("");

  const details = subjectDetails.map((subject) => `
    <tr>
      <td>${escapeHtml(subject.code)}</td>
      <td>${escapeHtml(subject.name)}</td>
      <td>${escapeHtml(subject.facultyId)}</td>
      <td>${escapeHtml(subject.facultyName)}</td>
      <td>${escapeHtml(subject.email)}</td>
    </tr>
  `).join("");

  const conflictHtml = conflicts.length
    ? conflicts.map((item) => `
        <tr>
          <td>${escapeHtml(item.type)}</td>
          <td>${escapeHtml(item.day)}</td>
          <td>${escapeHtml(item.time)}</td>
          <td>${escapeHtml(item.resource)}</td>
          <td>${escapeHtml(item.subjects)}</td>
        </tr>
      `).join("")
    : `<tr><td colspan="5">No conflicts detected.</td></tr>`;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8"/>
      <title>Generated Academic Timetable</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          color: #111;
          padding: 20px;
        }

        h1, h2 {
          text-align: center;
        }

        .info {
          margin: 20px 0;
          line-height: 1.8;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin: 15px 0 25px;
        }

        th, td {
          border: 1px solid #555;
          padding: 9px 5px;
          text-align: center;
          font-size: 10px;
        }

        th {
          background: #dbeafe;
        }

        .day {
          font-weight: bold;
          background: #e5e7eb;
        }

        .lunch {
          background: #f3f4f6;
          font-weight: bold;
        }

        @media print {
          body {
            padding: 5px;
          }

          table {
            page-break-inside: auto;
          }

          tr {
            page-break-inside: avoid;
          }
        }
      </style>
    </head>

    <body>
      <h1>AI SmartTime</h1>
      <h2>Generated Academic Timetable</h2>

      <div class="info">
        <strong>Department:</strong> ${escapeHtml(schedule.department)}<br/>
        <strong>Year:</strong> ${escapeHtml(schedule.year)}<br/>
        <strong>Semester:</strong> ${escapeHtml(schedule.semester)}<br/>
        <strong>Academic Year:</strong> ${escapeHtml(schedule.academicYear)}<br/>
        <strong>Common Room:</strong> ${escapeHtml(schedule.commonRoom)}<br/>
        <strong>Conflicts:</strong> ${conflicts.length}
      </div>

      <h2>Weekly Timetable</h2>

      <table>
        <thead>
          <tr>
            <th>DAY</th>
            ${timeSlots.map((slot) => `<th>${escapeHtml(slot)}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>

      <h2>Subject & Faculty Details</h2>

      <table>
        <thead>
          <tr>
            <th>Subject Code</th>
            <th>Subject Name</th>
            <th>Faculty ID</th>
            <th>Faculty Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          ${details}
        </tbody>
      </table>

      <h2>Conflict Report</h2>

      <table>
        <thead>
          <tr>
            <th>Conflict Type</th>
            <th>Day</th>
            <th>Time</th>
            <th>Faculty / Room</th>
            <th>Subjects</th>
          </tr>
        </thead>
        <tbody>
          ${conflictHtml}
        </tbody>
      </table>

    </body>
    </html>
  `;
};


/* =========================================
   MAIN COMPONENT
========================================= */

function GeneratedTimetable() {
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");

  const [showDetails, setShowDetails] = useState(false);
  const [exportFormat, setExportFormat] = useState("word");

  const [generatedSchedule, setGeneratedSchedule] = useState(
    sampleSchedule
  );

  const [generationMessage, setGenerationMessage] = useState("");

  // Check whether the selected combination has timetable data
  const hasSelection = Boolean(
    department && year && semester
  );

  const isSampleSchedule =
    department === sampleSchedule.department &&
    year === sampleSchedule.year &&
    semester === sampleSchedule.semester;

  const activeSchedule = isSampleSchedule
    ? generatedSchedule
    : null;

  // Detect conflicts for the selected timetable
  const conflicts = activeSchedule
    ? detectConflicts(activeSchedule)
    : [];

  // Department selection
  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
    setYear("");
    setSemester("");
    setShowDetails(false);
    setGenerationMessage("");
  };

  // Year selection
  const handleYearChange = (event) => {
    setYear(event.target.value);
    setSemester("");
    setShowDetails(false);
    setGenerationMessage("");
  };

  // Semester selection
  const handleSemesterChange = (event) => {
    setSemester(event.target.value);
    setShowDetails(false);
    setGenerationMessage("");
  };

  // Clear filters
  const handleClearFilters = () => {
    setDepartment("");
    setYear("");
    setSemester("");
    setShowDetails(false);
    setGenerationMessage("");
  };

  // Generate / refresh timetable
  const handleGenerateAgain = () => {
    if (!hasSelection) {
      alert("Please select department, year and semester first.");
      return;
    }

    if (!isSampleSchedule) {
      alert(
        "No timetable data is available for this selection yet. Add the corresponding subjects and faculty timetable data."
      );
      return;
    }

    // Refresh the current sample schedule.
    // Replace this function with your Django AI-generation API later.
    setGeneratedSchedule({
      ...sampleSchedule,
      days: sampleSchedule.days.map((day) => ({
        ...day,
        beforeLunch: day.beforeLunch.map((cell) => ({ ...cell })),
        afterLunch: day.afterLunch.map((cell) => ({ ...cell }))
      })),
      sessions: sampleSchedule.sessions.map((session) => ({
        ...session
      }))
    });

    setShowDetails(false);
    setGenerationMessage(
      "Timetable refreshed and conflict checking completed."
    );
  };

  // Export timetable
  const handleExport = () => {
    if (!activeSchedule) {
      alert("Please select a department, year and semester with an available timetable.");
      return;
    }

    const exportHtml = createExportHtml(
      activeSchedule,
      conflicts
    );

    if (exportFormat === "word") {
      const blob = new Blob(
        ["\ufeff", exportHtml],
        {
          type: "application/msword;charset=utf-8"
        }
      );

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `Timetable_${year}_${semester}.doc`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } else {
      // Opens the browser print window.
      // Select "Save as PDF" in the print destination.
      const printWindow = window.open("", "_blank");

      if (!printWindow) {
        alert(
          "Please allow pop-ups in your browser to export the PDF."
        );
        return;
      }

      const printableHtml = exportHtml.replace(
        "<body>",
        '<body onload="window.print()">'
      );

      printWindow.document.open();
      printWindow.document.write(printableHtml);
      printWindow.document.close();
    }
  };

  // Render a timetable cell
  const renderCell = (cell, index) => {
    const isEmpty = cell.empty || !cell.code;

    return (
      <td
        key={`${cell.start}-${index}`}
        colSpan={cell.span}
        className={isEmpty ? "empty-slot" : "subject-cell"}
      >
        {getCellLabel(cell, activeSchedule)}
      </td>
    );
  };

  return (
    <div className="faculties-page generated-timetable-page">

      {/* =====================================
          PAGE HEADER
      ===================================== */}

      <div className="page-header">
        <div>
          <h2>Generated Timetable</h2>
          <p>
            View and manage the academic timetable by department,
            year and semester.
          </p>
        </div>
      </div>


      {/* =====================================
          FILTER AND ACTION TOOLBAR
      ===================================== */}

      <div className="toolbar faculty-toolbar">

        {/* DEPARTMENT */}
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

        {/* YEAR */}
        <select
          className="faculty-filter-select"
          value={year}
          onChange={handleYearChange}
          disabled={!department}
        >
          <option value="">Select Year</option>

          {years.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* SEMESTER */}
        <select
          className="faculty-filter-select"
          value={semester}
          onChange={handleSemesterChange}
          disabled={!year}
        >
          <option value="">Select Semester</option>

          {getSemesters(year).map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* EXPORT FORMAT */}
        <select
          className="faculty-filter-select export-format-select"
          value={exportFormat}
          onChange={(event) => setExportFormat(event.target.value)}
        >
          <option value="word">Word (.doc)</option>
          <option value="pdf">PDF</option>
        </select>

        {/* EXPORT BUTTON */}
        <button
          type="button"
          className="secondary-button"
          onClick={handleExport}
          disabled={!activeSchedule}
        >
          Export
        </button>

        {/* GENERATE AGAIN */}
        <button
          type="button"
          className="primary-button"
          onClick={handleGenerateAgain}
          disabled={!activeSchedule}
        >
          Generate Again
        </button>

        {/* CLEAR FILTERS */}
        <button
          type="button"
          className="faculty-clear-button"
          onClick={handleClearFilters}
        >
          Clear Filters
        </button>

      </div>


      {/* =====================================
          RESULT MESSAGE
      ===================================== */}

      <div className="faculty-result-info timetable-result-info">
        {!hasSelection ? (
          <span>
            Select department, year and semester to view the generated timetable.
          </span>
        ) : activeSchedule ? (
          <span>
            Timetable available for{" "}
            <strong>{department}</strong>
            {" | "}
            <strong>{year}</strong>
            {" | "}
            <strong>{semester}</strong>
          </span>
        ) : (
          <span>
            No generated timetable is available for this selection yet.
            Add the corresponding timetable data to display it here.
          </span>
        )}
      </div>

      {generationMessage && (
        <div className="timetable-success-message">
          {generationMessage}
        </div>
      )}


      {/* =====================================
          TIMETABLE INFORMATION
          ROOM AND CONFLICTS ON ONE LINE
      ===================================== */}

      {activeSchedule && (
        <>
          <div className="timetable-info">

            <div>
              <span>Department</span>
              <strong>{activeSchedule.department}</strong>
            </div>

            <div>
              <span>Year / Semester</span>
              <strong>
                {activeSchedule.year} / {activeSchedule.semester}
              </strong>
            </div>

            <div>
              <span>Academic Year</span>
              <strong>{activeSchedule.academicYear}</strong>
            </div>

            <div>
              <span>Common Room</span>
              <strong>{activeSchedule.commonRoom}</strong>
            </div>

            <div>
              <span>Conflicts</span>

              <strong
                className={
                  conflicts.length > 0
                    ? "has-conflict"
                    : "no-conflict"
                }
              >
                {conflicts.length}
                {conflicts.length > 0 ? " Found" : " - No Conflict"}
              </strong>
            </div>

          </div>


          {/* =====================================
              CONFLICT REPORT
          ===================================== */}

          {conflicts.length > 0 && (
            <div className="conflict-report">

              <div className="conflict-report-heading">
                <h3>Timetable Conflict Report</h3>
                <span>
                  {conflicts.length} conflict(s) detected
                </span>
              </div>

              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Conflict Type</th>
                      <th>Day</th>
                      <th>Time</th>
                      <th>Faculty / Room</th>
                      <th>Subjects Involved</th>
                    </tr>
                  </thead>

                  <tbody>
                    {conflicts.map((conflict) => (
                      <tr key={conflict.key}>
                        <td>
                          <strong className="conflict-text">
                            {conflict.type}
                          </strong>
                        </td>

                        <td>{conflict.day}</td>
                        <td>{conflict.time}</td>
                        <td>{conflict.resource}</td>
                        <td>{conflict.subjects}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {conflicts.length === 0 && (
            <div className="conflict-success-message">
              No faculty or room conflicts detected in this timetable.
            </div>
          )}


          {/* =====================================
              WEEKLY TIMETABLE
          ===================================== */}

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
                {activeSchedule.days.map((day, index) => (
                  <tr key={day.day}>

                    <td className="day-cell">
                      {day.day}
                    </td>

                    {/* Before lunch */}
                    {day.beforeLunch.map((cell, cellIndex) =>
                      renderCell(cell, cellIndex)
                    )}

                    {/* Lunch column spans all six days */}
                    {index === 0 && (
                      <td
                        className="lunch-cell"
                        rowSpan={6}
                      >
                        LUNCH
                        <br />
                        BREAK
                      </td>
                    )}

                    {/* After lunch */}
                    {day.afterLunch.map((cell, cellIndex) =>
                      renderCell(cell, cellIndex + 10)
                    )}

                  </tr>
                ))}
              </tbody>

            </table>

          </div>


          {/* =====================================
              SUBJECT AND FACULTY DETAILS BUTTON
          ===================================== */}

          <div className="details-button-container">

            <button
              type="button"
              className="details-toggle-button"
              onClick={() => setShowDetails((previous) => !previous)}
            >
              {showDetails
                ? "Hide Subject & Faculty Details"
                : "View Subject & Faculty Details"}
            </button>

          </div>


          {/* =====================================
              SUBJECT AND FACULTY DETAILS TABLE
          ===================================== */}

          {showDetails && (
            <div className="subject-details-section">

              <div className="details-heading">
                <h3>Subject & Faculty Details</h3>

                <p>
                  Faculty details assigned to subjects, seminars and projects.
                </p>
              </div>

              <div className="table-container">
                <table>

                  <thead>
                    <tr>
                      <th>Subject Code</th>
                      <th>Subject Name</th>
                      <th>Faculty ID</th>
                      <th>Faculty Name</th>
                      <th>Email</th>
                    </tr>
                  </thead>

                  <tbody>
                    {subjectDetails.map((subject) => (
                      <tr key={subject.code}>

                        <td>
                          <strong>{subject.code}</strong>
                        </td>

                        <td>{subject.name}</td>

                        <td>{subject.facultyId}</td>

                        <td>{subject.facultyName}</td>

                        <td>{subject.email}</td>

                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>

            </div>
          )}

        </>
      )}

    </div>
  );
}

export default GeneratedTimetable;