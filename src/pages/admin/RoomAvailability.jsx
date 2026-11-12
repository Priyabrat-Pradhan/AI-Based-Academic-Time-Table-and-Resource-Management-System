import React, { useState } from "react";

function RoomAvailability() {

  /* =====================================
     BLOCK AND ROOM DATA
  ===================================== */

  const roomData = [
    {block: "Block 1",
      rooms: ["Room 101", "Room 102", "Computer Lab 1"]},
    {block: "Block 2",
      rooms: ["Room 201", "Room 202", "Computer Lab 2"]},
    {block: "Block 3",
      rooms: ["Room 301", "Room 302", "Laboratory 1"]},
    {block: "Block 4",
      rooms: ["Room 401", "Room 402", "Project Lab"]}
  ];


  /* =====================================
     TIME SLOTS
  ===================================== */

  const timeSlots = [
    "09:00 - 09:55",
    "10:00 - 10:55",
    "11:05 - 12:00",
    "12:05 - 01:00",
    "LUNCH",
    "02:30 - 03:20",
    "03:20 - 04:10",
    "04:10 - 05:00"
  ];

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];


  /* =====================================
     SAMPLE ROOM AVAILABILITY DATA

     A = Available
     N = Not Available
     L = Lunch Break
  ===================================== */

  const availabilityData = {

    "Room 101": [
      ["A", "N", "A", "N", "L", "A", "A", "N"],
      ["A", "A", "N", "N", "L", "A", "N", "A"],
      ["N", "A", "A", "N", "L", "A", "A", "N"],
      ["A", "N", "A", "A", "L", "N", "A", "A"],
      ["A", "A", "N", "A", "L", "N", "A", "N"],
      ["N", "A", "A", "N", "L", "A", "A", "A"]
    ],

    "Room 102": [
      ["N", "A", "A", "A", "L", "N", "A", "A"],
      ["A", "N", "A", "A", "L", "N", "A", "N"],
      ["A", "A", "N", "A", "L", "A", "N", "A"],
      ["N", "A", "A", "N", "L", "A", "A", "N"],
      ["A", "N", "A", "A", "L", "A", "N", "A"],
      ["A", "A", "N", "A", "L", "N", "A", "A"]
    ],

    "Computer Lab 1": [
      ["N", "N", "A", "A", "L", "A", "A", "N"],
      ["A", "A", "N", "A", "L", "N", "A", "A"],
      ["A", "N", "A", "N", "L", "A", "N", "A"],
      ["A", "A", "A", "N", "L", "N", "A", "A"],
      ["N", "A", "A", "A", "L", "A", "N", "A"],
      ["A", "N", "A", "A", "L", "A", "A", "N"]
    ],

    "Room 201": [
      ["A", "A", "N", "A", "L", "N", "A", "A"],
      ["N", "A", "A", "N", "L", "A", "A", "N"],
      ["A", "N", "A", "A", "L", "A", "N", "A"],
      ["A", "A", "N", "A", "L", "N", "A", "A"],
      ["N", "A", "A", "A", "L", "A", "N", "A"],
      ["A", "N", "A", "N", "L", "A", "A", "A"]
    ],

    "Room 202": [
      ["A", "N", "A", "A", "L", "A", "N", "A"],
      ["A", "A", "N", "A", "L", "N", "A", "A"],
      ["N", "A", "A", "N", "L", "A", "A", "N"],
      ["A", "N", "A", "A", "L", "A", "N", "A"],
      ["A", "A", "N", "N", "L", "A", "A", "A"],
      ["N", "A", "A", "A", "L", "N", "A", "A"]
    ],

    "Computer Lab 2": [
      ["N", "A", "N", "A", "L", "A", "A", "N"],
      ["A", "N", "A", "A", "L", "A", "N", "A"],
      ["A", "A", "N", "A", "L", "N", "A", "A"],
      ["N", "A", "A", "N", "L", "A", "A", "A"],
      ["A", "N", "A", "A", "L", "N", "A", "A"],
      ["A", "A", "N", "A", "L", "A", "N", "A"]
    ],

    "Room 301": [
      ["A", "A", "N", "A", "L", "A", "N", "A"],
      ["N", "A", "A", "A", "L", "N", "A", "A"],
      ["A", "N", "A", "N", "L", "A", "A", "N"],
      ["A", "A", "A", "N", "L", "A", "N", "A"],
      ["N", "A", "A", "A", "L", "A", "A", "N"],
      ["A", "N", "A", "A", "L", "N", "A", "A"]
    ],

    "Room 302": [
      ["N", "A", "A", "N", "L", "A", "A", "A"],
      ["A", "N", "A", "A", "L", "A", "N", "A"],
      ["A", "A", "N", "A", "L", "N", "A", "A"],
      ["N", "A", "A", "A", "L", "A", "N", "A"],
      ["A", "N", "A", "N", "L", "A", "A", "A"],
      ["A", "A", "N", "A", "L", "N", "A", "A"]
    ],

    "Laboratory 1": [
      ["A", "N", "A", "A", "L", "N", "A", "A"],
      ["N", "A", "A", "N", "L", "A", "A", "N"],
      ["A", "A", "N", "A", "L", "A", "N", "A"],
      ["A", "N", "A", "A", "L", "N", "A", "A"],
      ["N", "A", "A", "A", "L", "A", "N", "A"],
      ["A", "A", "N", "A", "L", "A", "A", "N"]
    ]

  };


  /* =====================================
     STATES
  ===================================== */

  const [block, setBlock] = useState("");
  const [room, setRoom] = useState("");
  const [showAvailability, setShowAvailability] = useState(false);


  /* =====================================
     BLOCK CHANGE
  ===================================== */

  const handleBlockChange = (event) => {
    setBlock(event.target.value);
    setRoom("");
    setShowAvailability(false);
  };


  /* =====================================
     ROOM CHANGE
  ===================================== */

  const handleRoomChange = (event) => {
    setRoom(event.target.value);
    setShowAvailability(false);
  };


  /* =====================================
     SHOW AVAILABILITY
  ===================================== */

  const handleShowAvailability = () => {

    if (!block || !room) {
      alert("Please select both block and room.");
      return;
    }

    setShowAvailability(true);
  };


  /* =====================================
     CLEAR FILTER
  ===================================== */

  const handleClearFilter = () => {
    setBlock("");
    setRoom("");
    setShowAvailability(false);
  };


  /* =====================================
     STATUS DETAILS
  ===================================== */

  const getStatus = (status) => {

    if (status === "A") {
      return {
        text: "Available",
        className: "availability-available"
      };
    }

    if (status === "N") {
      return {
        text: "Not Available",
        className: "availability-unavailable"
      };
    }

    return {
      text: "Lunch Break",
      className: "lunch-cell"
    };
  };


  /* =====================================
     SELECTED ROOM DATA
  ===================================== */

  const selectedAvailability = availabilityData[room];


  /* =====================================
     RETURN
  ===================================== */

  return (

    <div className="faculties-page">

      {/* PAGE HEADER */}

      <div className="page-header">

        <div>
          <h2>Room Availability</h2>

          <p>
            View classroom and laboratory availability
            for each day and time slot.
          </p>
        </div>

      </div>


      {/* FILTER TOOLBAR */}

      <div className="toolbar faculty-toolbar">

        {/* BLOCK DROPDOWN */}

        <select
          className="faculty-filter-select"
          value={block}
          onChange={handleBlockChange}
        >

          <option value="">Select Block</option>

          {roomData.map((item) => (
            <option key={item.block} value={item.block}>
              {item.block}
            </option>
          ))}

        </select>


        {/* ROOM DROPDOWN */}

        <select
          className="faculty-filter-select"
          value={room}
          onChange={handleRoomChange}
          disabled={!block}
        >

          <option value="">Select Room</option>

          {roomData
            .find((item) => item.block === block)
            ?.rooms.map((roomName) => (

              <option key={roomName} value={roomName}>
                {roomName}
              </option>

            ))}

        </select>


        {/* SHOW AVAILABILITY BUTTON */}

        <button
          type="button"
          className="primary-button"
          onClick={handleShowAvailability}
          disabled={!block || !room}
        >
          Show Availability
        </button>


        {/* CLEAR FILTER BUTTON */}

        <button
          type="button"
          className="faculty-clear-button"
          onClick={handleClearFilter}
        >
          Clear Filter
        </button>

      </div>


      {/* RESULT INFORMATION */}

      <div className="faculty-result-info">

        {!showAvailability ? (

          <span>
            Select a block and room to view its weekly availability.
          </span>

        ) : (

          <span>
            Availability for{" "}
            <strong>{block}</strong>
            {" | "}
            <strong>{room}</strong>
          </span>

        )}

      </div>

      {showAvailability && (

        <>
          {/* WEEKLY AVAILABILITY TIMETABLE */}

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

                    {selectedAvailability[dayIndex].map(
                      (status, slotIndex) => {

                        const statusInfo = getStatus(status);

                        return (

                          <td
                            key={`${day}-${slotIndex}`}
                            className={`availability-cell ${statusInfo.className}`}
                          >
                            {statusInfo.text}
                          </td>

                        );

                      }
                    )}

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

export default RoomAvailability;