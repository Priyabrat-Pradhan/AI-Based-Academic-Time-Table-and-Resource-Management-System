function FacultyAvailability() {

  const availability = [
    ["Dr. Rajesh Kumar", "Monday", "09:00 AM - 12:00 PM"],
    ["Dr. Rajesh Kumar", "Wednesday", "10:00 AM - 04:00 PM"],
    ["Prof. Priya Sharma", "Tuesday", "09:00 AM - 02:00 PM"],
    ["Dr. Amit Singh", "Thursday", "10:00 AM - 04:00 PM"]
  ];

  return (
    <div>

      <div className="page-header">

        <div>
          <h2>Faculty Availability</h2>

          <p>
            Define when Faculties are available for classes.
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
              <th>Faculty</th>
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
                    Available
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

export default FacultyAvailability;