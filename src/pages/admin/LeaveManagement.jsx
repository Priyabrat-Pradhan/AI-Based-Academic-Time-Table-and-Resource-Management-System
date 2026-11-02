import { useState } from "react";

function LeaveManagement() {

  const [leaves, setLeaves] = useState([

    {
      id: "T001",
      applicant: "Dr. Rajesh Kumar",
      role: "Faculty",
      from: "2026-09-22",
      to: "2026-09-23",
      reason: "Personal Work",
      status: "Pending"
    },

    {
      id: "T002",
      applicant: "Prof. Priya Sharma",
      role: "Faculty",
      from: "2026-09-24",
      to: "2026-09-25",
      reason: "Medical Appointment",
      status: "Approved"
    },

    {
      id: "T003",
      applicant: "Dr. Amit Singh",
      role: "Faculty",
      from: "2026-09-28",
      to: "2026-09-29",
      reason: "Family Function",
      status: "Pending"
    }

  ]);

  const updateStatus = (id, newStatus) => {

    setLeaves((previous) =>

      previous.map((leave) =>

        leave.id === id
          ? { ...leave, status: newStatus }
          : leave

      )

    );

  };

  return (

    <div>

      <div className="page-header">

        <div>

          <h2>Leave Management</h2>

          <p>
            Review and manage faculty leave requests.
          </p>

        </div>

      </div>

      <div className="table-container">

        <table>

          <thead>

            <tr>

              <th>Faculty ID</th>

              <th>Applicant</th>

              <th>From</th>

              <th>To</th>

              <th>Reason</th>

              <th>Status</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {leaves.map((leave) => (

              <tr key={leave.id}>

                <td>{leave.id}</td>

                <td><strong>{leave.applicant}</strong></td>

                <td>{leave.from}</td>

                <td>{leave.to}</td>

                <td>{leave.reason}</td>

                <td>

                  <span
                    className={
                      leave.status === "Approved"
                        ? "badge success"
                        : leave.status === "Rejected"
                        ? "badge rejected"
                        : "badge pending"
                    }
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

                    <span>Reviewed</span>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default LeaveManagement;