function ReportsAnalytics() {

  const statistics = [
    {
      title: "Total Students",
      value: "1,240"
    },
    {
      title: "Total Faculty",
      value: "48"
    },
    {
      title: "Timetables Generated",
      value: "32"
    },
    {
      title: "Pending Approvals",
      value: "5",
    }
  ];

  const reports = [
    ["Computer Science","Semester 5","12","8","2","Completed"],
    ["Electrical Engineering","Semester 3","10","6","1","Completed"],
    ["Mining Engineering","Semester 7","8","5","2","Pending"],
    ["Mechanical Engineering","Semester 3","7","4","0","Completed"]
  ];

  return (

    <div>
        <div className="page-header">
            <div>
                <h2>Reports and Analytics</h2>
                <p>View academic resources and timetable statistics.</p>
            </div>

        <button className="primary-button">
          ⬇ Export Report
        </button>
        </div>

        <div className="stats-container">
            {statistics.map((stat) => (
                <div className="stat-card" key={stat.title}>
                    <div className="stat-content">
                        <h3>{stat.value}</h3>
                        <p>{stat.title}</p>
                    </div>
                </div>
            ))}
        </div>

        <div className="dashboard-panel">
            <h3>Department-wise Timetable Report</h3>
            
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Department</th>
                            <th>Semester</th>
                            <th>Faculty</th>
                            <th>Subjects</th>
                            <th>Pending Leaves</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {reports.map((report, index) => (
                            <tr key={index}>
                                <td><strong>{report[0]}</strong></td>
                                <td>{report[1]}</td>
                                <td>{report[2]}</td>
                                <td>{report[3]}</td>
                                <td>{report[4]}</td>
                                <td><span className="badge success">{report[5]}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    </div>
    );

}

export default ReportsAnalytics;