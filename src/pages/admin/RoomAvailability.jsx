function RoomAvailability() {

  const availability = [
    ["Room 101", "Monday", "09:00 AM - 04:00 PM", "Available"],
    ["Room 102", "Monday", "10:00 AM - 03:00 PM", "Available"],
    ["Computer Lab 1", "Tuesday", "09:00 AM - 01:00 PM", "Available"],
    ["Computer Lab 2", "Wednesday", "10:00 AM - 04:00 PM", "Available"]
  ];

  return (
    <div>

      <div className="page-header">

        <div>

          <h2>Room Availability</h2>

          <p>
            Manage classroom and laboratory availability.
          </p>

        </div>

        <button className="primary-button">
          + Add Availability
        </button>

      </div>

      <div className="table-container">

        <table>

          <thead>

            <tr>
              <th>Room</th>
              <th>Day</th>
              <th>Available Time</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            {availability.map((item, index) => (

              <tr key={index}>

                <td>
                  <strong>{item[0]}</strong>
                </td>

                <td>{item[1]}</td>

                <td>{item[2]}</td>

                <td>
                  <span className="badge success">
                    {item[3]}
                  </span>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default RoomAvailability;