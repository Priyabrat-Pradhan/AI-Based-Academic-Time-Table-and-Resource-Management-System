import { useState } from "react";

function SubstituteRequests() {

  const [requests, setRequests] = useState([
    {
      facultyId: "FAC001",
      facultyName: "Priyabrat Pradhan",
      date: "2026-10-06",
      subject: "Machine Learning",
      time: "10:00 AM - 11:00 AM",
      substituteId: "FAC005",
      substituteName: "Dr. Amit Singh",
      availability: null,
      status: "Pending"
    },
    {
      facultyId: "FAC002",
      facultyName: "Dr. Rajesh Kumar",
      date: "2026-10-07",
      subject: "Database Management",
      time: "11:00 AM - 12:00 PM",
      substituteId: "FAC006",
      substituteName: "Prof. Priya Sharma",
      availability: null,
      status: "Pending"
    },
    {
      facultyId: "FAC003",
      facultyName: "Dr. Sasmita Pani",
      date: "2026-10-08",
      subject: "Computer Networks",
      time: "09:00 AM - 10:00 AM",
      substituteId: "FAC007",
      substituteName: "Dr. Mukesh Bhatre",
      availability: null,
      status: "Pending"
    }
  ]);

  /*
    Mock availability data.

    Later this information will come from Django/MySQL.
  */
  const teacherAvailability = {
    FAC005: {
      "2026-10-06": ["09:00 AM - 10:00 AM", "11:00 AM - 12:00 PM"]
    },

    FAC006: {
      "2026-10-07": ["09:00 AM - 10:00 AM"]
    },

    FAC007: {
      "2026-10-08": ["09:00 AM - 10:00 AM", "02:00 PM - 03:00 PM"]
    }
  };


  // Check whether substitute teacher is available
  const checkAvailability = (index) => {

    const request = requests[index];

    const teacher = teacherAvailability[request.substituteId];

    let isAvailable = false;

    if (teacher && teacher[request.date]) {

      isAvailable =
        teacher[request.date].includes(request.time);

    }

    setRequests((previousRequests) => {

      const updatedRequests = [...previousRequests];

      updatedRequests[index] = {
        ...updatedRequests[index],
        availability: isAvailable
          ? "Available"
          : "Not Available"
      };

      return updatedRequests;

    });
  };


  // Approve request
  const approveRequest = (index) => {

    const request = requests[index];

    if (request.availability !== "Available") {
      alert(
        "Please check teacher availability before approving the request."
      );

      return;
    }

    setRequests((previousRequests) => {

      const updatedRequests = [...previousRequests];

      updatedRequests[index] = {
        ...updatedRequests[index],
        status: "Approved"
      };

      return updatedRequests;

    });

    alert("Substitute request approved successfully.");
  };


  // Reject request
  const rejectRequest = (index) => {

    setRequests((previousRequests) => {

      const updatedRequests = [...previousRequests];

      updatedRequests[index] = {
        ...updatedRequests[index],
        status: "Rejected"
      };

      return updatedRequests;

    });

    alert("Substitute request rejected.");
  };


  return (

    <div>

      {/* PAGE HEADER */}

      <div className="page-header">

        <div>

          <h2>Substitute Requests</h2>

          <p>
            Check faculty substitute requests and manage availability.
          </p>

        </div>

      </div>


      {/* REQUEST TABLE */}

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

            {requests.map((request, index) => (

              <tr key={index}>

                {/* FACULTY ID */}

                <td>
                  <strong>{request.facultyId}</strong>
                </td>


                {/* FACULTY */}

                <td>
                  {request.facultyName}
                </td>


                {/* DATE */}

                <td>
                  {request.date}
                </td>


                {/* SUBJECT */}

                <td>
                  {request.subject}
                </td>


                {/* TIME */}

                <td>
                  {request.time}
                </td>


                {/* SUBSTITUTE */}

                <td>

                  <strong>
                    {request.substituteName}
                  </strong>

                  <br />

                  <small>
                    {request.substituteId}
                  </small>

                </td>


                {/* AVAILABILITY */}

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


                {/* STATUS */}

                <td>

                  <span
                    className={
                      request.status === "Approved"
                        ? "badge approved"
                        : request.status === "Rejected"
                        ? "badge rejected"
                        : "badge pending"
                    }
                  >
                    {request.status}
                  </span>

                </td>


                {/* ACTIONS */}

                <td>

                    <div className="action-buttons">
                        <button
                            className="check-button"
                            onClick={() => checkAvailability(index)}
                            disabled={request.status !== "Pending"}>
                                Check Availability
                        </button>

                        <button
                            className="approve-button"
                            onClick={() => approveRequest(index)}
                            disabled={request.status !== "Pending" ||
                                request.availability !== "Available"}>
                                Approve
                        </button>

                        <button
                            className="reject-button"
                            onClick={() => rejectRequest(index)}
                            disabled={request.status !== "Pending"}>
                                Reject
                        </button>

                    </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
}

export default SubstituteRequests;