
import { useState } from "react";

function SubstituteRequests() {
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const [requests, setRequests] = useState([
    {
      facultyId: "FAC001",
      facultyName: "Priyabrat Pradhan",
      department: "Computer Science and Engineering",
      date: "2026-10-06",
      subject: "Machine Learning",
      time: "10:00 AM - 11:00 AM",
      substituteId: "FAC005",
      substituteName: "Dr. Amit Singh",
      availability: null,
      status: "Pending",
    },
    {
      facultyId: "FAC002",
      facultyName: "Dr. Rajesh Kumar",
      department: "Electrical Engineering",
      date: "2026-10-07",
      subject: "Database Management",
      time: "11:00 AM - 12:00 PM",
      substituteId: "FAC006",
      substituteName: "Prof. Priya Sharma",
      availability: null,
      status: "Pending",
    },
    {
      facultyId: "FAC003",
      facultyName: "Dr. Sasmita Pani",
      department: "Computer Science and Engineering",
      date: "2026-10-08",
      subject: "Computer Networks",
      time: "09:00 AM - 10:00 AM",
      substituteId: "FAC007",
      substituteName: "Dr. Mukesh Bhatre",
      availability: null,
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

  // Mock faculty availability data
  const teacherAvailability = {
    FAC005: {
      "2026-10-06": [
        "09:00 AM - 10:00 AM",
        "10:00 AM - 11:00 AM",
      ],
    },

    FAC006: {
      "2026-10-07": [
        "09:00 AM - 10:00 AM",
      ],
    },

    FAC007: {
      "2026-10-08": [
        "09:00 AM - 10:00 AM",
        "02:00 PM - 03:00 PM",
      ],
    },
  };

  // Filter requests by department
  const filteredRequests = requests.filter(
    (request) => request.department === selectedDepartment
  );

  // Clear department filter
  const clearFilter = () => {
    setSelectedDepartment("");
  };

  // Check substitute teacher availability
  const checkAvailability = (requestId) => {
    const request = requests.find(
      (item) => item.facultyId === requestId
    );

    if (!request) return;

    const teacher = teacherAvailability[request.substituteId];

    const isAvailable =
      teacher &&
      teacher[request.date] &&
      teacher[request.date].includes(request.time);

    setRequests((previousRequests) =>
      previousRequests.map((item) =>
        item.facultyId === requestId
          ? {
              ...item,
              availability: isAvailable
                ? "Available"
                : "Not Available",
            }
          : item
      )
    );
  };

  // Approve request
  const approveRequest = (requestId) => {
    const request = requests.find(
      (item) => item.facultyId === requestId
    );

    if (!request || request.availability !== "Available") {
      alert(
        "Please check teacher availability before approving the request."
      );
      return;
    }

    setRequests((previousRequests) =>
      previousRequests.map((item) =>
        item.facultyId === requestId
          ? { ...item, status: "Approved" }
          : item
      )
    );

    alert("Substitute request approved successfully.");
  };

  // Reject request
  const rejectRequest = (requestId) => {
    setRequests((previousRequests) =>
      previousRequests.map((item) =>
        item.facultyId === requestId
          ? { ...item, status: "Rejected" }
          : item
      )
    );

    alert("Substitute request rejected.");
  };

  return (
    <div className="faculties-page">

      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h2>Substitute Requests</h2>
          <p>
            Check faculty substitute requests and manage availability.
          </p>
        </div>
      </div>

      {/* DEPARTMENT FILTER */}
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
          className="faculty-clear-button"
          type="button"
          onClick={clearFilter}
        >
          Clear Filter
        </button>

      </div>

      {/* TABLE - SHOW ONLY AFTER DEPARTMENT SELECTION */}
      {selectedDepartment !== "" && (
        <>
          <div className="faculty-result-info">
            Showing {filteredRequests.length} substitute request(s) in{" "}
            {selectedDepartment}
          </div>

          <div className="table-container">
            <table>

              <thead>
                <tr>
                  <th>Faculty ID</th>
                  <th>Faculty Name</th>
                  <th>Date</th>
                  <th>Subject</th>
                  <th>Time</th>
                  <th>Substitute Teacher</th>
                  <th>Availability</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <tr key={request.facultyId}>

                      <td>
                        <strong>{request.facultyId}</strong>
                      </td>

                      <td>{request.facultyName}</td>

                      <td>{request.date}</td>

                      <td>{request.subject}</td>

                      <td>{request.time}</td>

                      <td>
                        <strong>{request.substituteName}</strong>
                        <br />
                        <small>{request.substituteId}</small>
                      </td>

                      <td>
                        {request.availability === null && (
                          <span className="availability-pending">
                            Not Checked
                          </span>
                        )}

                        {request.availability === "Available" && (
                          <span className="availability-available">
                            Available
                          </span>
                        )}

                        {request.availability === "Not Available" && (
                          <span className="availability-unavailable">
                            Not Available
                          </span>
                        )}
                      </td>

                      <td>
                        <span
                          className={
                            request.status === "Approved"
                              ? "badge success"
                              : request.status === "Rejected"
                              ? "badge rejected"
                              : "badge pending"
                          }
                        >
                          {request.status}
                        </span>
                      </td>

                      <td>
                        <div className="action-buttons">

                          <button
                            className="check-button"
                            onClick={() =>
                              checkAvailability(request.facultyId)
                            }
                            disabled={request.status !== "Pending"}
                            type="button"
                          >
                            Check Availability
                          </button>

                          <button
                            className="approve-button"
                            onClick={() =>
                              approveRequest(request.facultyId)
                            }
                            disabled={
                              request.status !== "Pending" ||
                              request.availability !== "Available"
                            }
                            type="button"
                          >
                            Approve
                          </button>

                          <button
                            className="reject-button"
                            onClick={() =>
                              rejectRequest(request.facultyId)
                            }
                            disabled={request.status !== "Pending"}
                            type="button"
                          >
                            Reject
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="no-results">
                      No substitute requests found for this department.
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
}

export default SubstituteRequests;