import React, { useState } from "react";

const LeaveManagement = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const [leaves, setLeaves] = useState([
    {
      id: 1,
      facultyId: "T001",
      facultyName: "Dr. Rajesh Kumar",
      department: "Computer Science and Engineering",
      from: "22-09-2026",
      to: "23-09-2026",
      reason: "Personal Work",
      status: "Pending",
    },
    {
      id: 2,
      facultyId: "T002",
      facultyName: "Prof. Priya Sharma",
      department: "Electrical Engineering",
      from: "24-09-2026",
      to: "25-09-2026",
      reason: "Medical Appointment",
      status: "Approved",
    },
    {
      id: 3,
      facultyId: "T003",
      facultyName: "Dr. Amit Singh",
      department: "Computer Science and Engineering",
      from: "28-09-2026",
      to: "29-09-2026",
      reason: "Family Function",
      status: "Pending",
    },
    {
      id: 4,
      facultyId: "T004",
      facultyName: "Prof. Sunita Das",
      department: "Mechanical Engineering",
      from: "02-10-2026",
      to: "03-10-2026",
      reason: "Personal Work",
      status: "Pending",
    },
    {
      id: 5,
      facultyId: "T005",
      facultyName: "Dr. Anil Kumar",
      department: "Civil Engineering",
      from: "05-10-2026",
      to: "06-10-2026",
      reason: "Medical Leave",
      status: "Rejected",
    },
    {
      id: 6,
      facultyId: "T006",
      facultyName: "Prof. Sasmita Pani",
      department: "Computer Science and Engineering",
      from: "08-10-2026",
      to: "09-10-2026",
      reason: "Family Function",
      status: "Pending",
    },
  ]);

  const departments = [
    "Computer Science and Engineering",
    "Mining Engineering",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
  ];

  // Approve or reject leave request
  const updateStatus = (id, newStatus) => {
    setLeaves((previousLeaves) =>
      previousLeaves.map((leave) =>
        leave.id === id
          ? { ...leave, status: newStatus }
          : leave
      )
    );
  };

  // Clear department selection
  const clearFilter = () => {
    setSelectedDepartment("");
  };

  // Filter leaves by selected department
  const filteredLeaves = leaves.filter(
    (leave) => leave.department === selectedDepartment
  );

  return (
    <div className="faculties-page">

      {/* Page Heading */}

      <div className="page-header">
        <div>
          <h2>Leave Management</h2>
          <p>Review and manage faculty leave requests.</p>
        </div>
      </div>

      {/* Department Dropdown and Clear Button */}
      <div className="toolbar faculty-toolbar">

        <select
          className="faculty-filter-select"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          <option value="">Select Department</option>

          {departments.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="faculty-clear-button"
          onClick={clearFilter}
        >
          Clear Filter
        </button>

      </div>

      {/* Show table only after selecting a department */}
      {selectedDepartment !== "" && (
        <>
          <div className="faculty-result-info">
            <span>
              Department: <strong>{selectedDepartment}</strong>
            </span>

            <span>
              Total Leave Requests: <strong>{filteredLeaves.length}</strong>
            </span>
          </div>

          <div className="table-container leave-table-container">
            <table className="leave-table">

              <thead>
                <tr>
                  <th>Faculty ID</th>
                  <th>Faculty Name</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredLeaves.length > 0 ? (
                  filteredLeaves.map((leave) => (
                    <tr key={leave.id}>
                      <td>{leave.facultyId}</td>
                      <td>{leave.facultyName}</td>
                      <td>{leave.from}</td>
                      <td>{leave.to}</td>
                      <td>{leave.reason}</td>

                      <td>
                        <span
                          className={`badge ${
                            leave.status === "Approved"
                              ? "success"
                              : leave.status === "Rejected"
                              ? "rejected"
                              : "pending"
                          }`}
                        >
                          {leave.status}
                        </span>
                      </td>

                      <td>
                        {leave.status === "Pending" ? (
                          <div className="action-buttons">
                            <button
                              className="approve-button"
                              onClick={() =>
                                updateStatus(leave.id, "Approved")
                              }
                            >
                              Approve
                            </button>

                            <button
                              className="reject-button"
                              onClick={() =>
                                updateStatus(leave.id, "Rejected")
                              }
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span>
                            Reviewed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="empty-table-message">
                      No leave requests found for this department.
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </>
      )}

    </div>
  );
};

export default LeaveManagement;
