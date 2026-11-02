
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

const blocks = [
  "Block 1",
  "Block 2",
  "Block 3",
  "Block 4"
];

const initialClassrooms = [
  {
    id: 1,
    block: "Block 1",
    department: "Computer Science and Engineering",
    year: "4th Year",
    classroom: "Room 101",
    capacity: 60
  },
  {
    id: 2,
    block: "Block 1",
    department: "Computer Science and Engineering",
    year: "3rd Year",
    classroom: "Room 102",
    capacity: 60
  },
  {
    id: 3,
    block: "Block 2",
    department: "Electrical Engineering",
    year: "2nd Year",
    classroom: "Room 201",
    capacity: 80
  },
  {
    id: 4,
    block: "Block 2",
    department: "Mechanical Engineering",
    year: "1st Year",
    classroom: "Room 202",
    capacity: 40
  },
  {
    id: 5,
    block: "Block 3",
    department: "Mining Engineering",
    year: "3rd Year",
    classroom: "Room 301",
    capacity: 50
  },
  {
    id: 6,
    block: "Block 4",
    department: "Civil Engineering",
    year: "2nd Year",
    classroom: "Room 401",
    capacity: 55
  }
];

const emptyForm = {
  block: "",
  department: "",
  year: "",
  classroom: "",
  capacity: ""
};

function Classrooms() {
  const [classrooms, setClassrooms] = useState(initialClassrooms);

  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingClassroom, setEditingClassroom] = useState(null);

  const [formData, setFormData] = useState(emptyForm);
  const [formError, setFormError] = useState("");

  // Filter classrooms by selected department and search
  const filteredClassrooms = classrooms.filter((classroom) => {
    const matchesDepartment =
      classroom.department === selectedDepartment;

    const search = searchTerm.toLowerCase().trim();

    const matchesSearch =
      classroom.classroom.toLowerCase().includes(search) ||
      classroom.block.toLowerCase().includes(search) ||
      classroom.year.toLowerCase().includes(search) ||
      String(classroom.capacity).includes(search);

    return matchesDepartment && matchesSearch;
  });

  // Department selection
  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
    setSearchTerm("");
  };

  // Open Add Classroom modal
  const handleAddClassroom = () => {
    setEditingClassroom(null);

    setFormData({
      ...emptyForm,
      department: selectedDepartment
    });

    setFormError("");
    setShowModal(true);
  };

  // Open Edit Classroom modal
  const handleEditClassroom = (classroom) => {
    setEditingClassroom(classroom);

    setFormData({
      block: classroom.block,
      department: classroom.department,
      year: classroom.year,
      classroom: classroom.classroom,
      capacity: String(classroom.capacity)
    });

    setFormError("");
    setShowModal(true);
  };

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));

    setFormError("");
  };

  // Add or update classroom
  const handleSubmit = (event) => {
    event.preventDefault();

    const block = formData.block;
    const department = formData.department;
    const year = formData.year;
    const classroomName = formData.classroom.trim();
    const capacity = Number(formData.capacity);

    // Required field validation
    if (
      !block ||
      !department ||
      !year ||
      !classroomName ||
      !formData.capacity
    ) {
      setFormError("Please fill in all fields.");
      return;
    }

    // Capacity validation
    if (
      !Number.isInteger(capacity) ||
      capacity <= 0
    ) {
      setFormError("Capacity must be a valid positive whole number.");
      return;
    }

    // Duplicate classroom validation
    const duplicateClassroom = classrooms.some(
      (item) =>
        item.block.toLowerCase() === block.toLowerCase() &&
        item.classroom.toLowerCase() === classroomName.toLowerCase() &&
        item.id !== editingClassroom?.id
    );

    if (duplicateClassroom) {
      setFormError(
        "This classroom already exists in the selected block."
      );
      return;
    }

    const classroomData = {
      block,
      department,
      year,
      classroom: classroomName,
      capacity
    };

    // Update existing classroom
    if (editingClassroom) {
      setClassrooms((previous) =>
        previous.map((item) =>
          item.id === editingClassroom.id
            ? {
                ...item,
                ...classroomData
              }
            : item
        )
      );
    }

    // Add new classroom
    else {
      setClassrooms((previous) => [
        ...previous,
        {
          id: Date.now(),
          ...classroomData
        }
      ]);
    }

    // Show the department of the saved classroom
    setSelectedDepartment(department);
    setSearchTerm("");

    // Close and reset modal
    closeModal();
  };

  // Delete classroom
  const handleDeleteClassroom = (id) => {
    const classroom = classrooms.find(
      (item) => item.id === id
    );

    if (!classroom) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${classroom.classroom}?`
    );

    if (!confirmDelete) return;

    setClassrooms((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setEditingClassroom(null);
    setFormData(emptyForm);
    setFormError("");
  };

  // Clear filters
  const handleClearFilters = () => {
    setSelectedDepartment("");
    setSearchTerm("");
  };

  return (
    <div className="faculties-page">

      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h2>Classrooms</h2>
          <p>
            Manage classroom blocks, departments, years and capacity.
          </p>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="toolbar faculty-toolbar">

        {/* DEPARTMENT FILTER */}
        <select
          className="faculty-filter-select"
          value={selectedDepartment}
          onChange={handleDepartmentChange}
        >
          <option value="">Select Department</option>

          {departments.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>

        {/* SEARCH */}
        <div className="faculty-search student-search">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search classroom, block, year or capacity..."
            disabled={!selectedDepartment}
          />

          {searchTerm && (
            <button
              type="button"
              className="clear-search-button"
              onClick={() => setSearchTerm("")}
            >
              Clear
            </button>
          )}
        </div>

        {/* ADD CLASSROOM */}
        <button
          type="button"
          className="primary-button"
          onClick={handleAddClassroom}
          disabled={!selectedDepartment}
        >
          Add Classroom
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

      {/* RESULT INFORMATION */}
      <div className="faculty-result-info">

        {!selectedDepartment ? (
          <span>
            Select a department to view its classrooms.
          </span>
        ) : (
          <span>
            Showing <strong>{filteredClassrooms.length}</strong> of{" "}
            <strong>
              {classrooms.filter(
                (item) => item.department === selectedDepartment
              ).length}
            </strong>{" "}
            classrooms for <strong>{selectedDepartment}</strong>
          </span>
        )}

      </div>

      {/* CLASSROOM TABLE */}
      {selectedDepartment && (
        <div className="table-container">

          <table>
            <thead>
              <tr>
                <th>Block</th>
                <th>Classroom</th>
                <th>Year</th>
                <th>Capacity</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredClassrooms.length > 0 ? (

                filteredClassrooms.map((classroom) => (

                  <tr key={classroom.id}>

                    <td>
                      <strong>{classroom.block}</strong>
                    </td>

                    <td>
                      <strong>{classroom.classroom}</strong>
                    </td>

                    <td>{classroom.year}</td>

                    <td>{classroom.capacity} Students</td>

                    <td>
                      <div className="faculty-actions">

                        <button
                          type="button"
                          className="table-action edit-action"
                          onClick={() =>
                            handleEditClassroom(classroom)
                          }
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="table-action delete-action"
                          onClick={() =>
                            handleDeleteClassroom(classroom.id)
                          }
                        >
                          Delete
                        </button>

                      </div>
                    </td>

                  </tr>

                ))

              ) : (

                <tr>
                  <td colSpan="5" className="no-results">
                    No classrooms found for this department.
                  </td>
                </tr>

              )}

            </tbody>
          </table>

        </div>
      )}

      {/* ADD / EDIT CLASSROOM MODAL */}
      {showModal && (

        <div
          className="faculty-modal-overlay"
          onClick={closeModal}
        >

          <div
            className="faculty-modal"
            onClick={(event) => event.stopPropagation()}
          >

            {/* MODAL HEADER */}
            <div className="faculty-modal-header">

              <div>
                <h3>
                  {editingClassroom
                    ? "Edit Classroom"
                    : "Add Classroom"}
                </h3>

                <p>
                  Enter the classroom information below.
                </p>
              </div>

              <button
                type="button"
                className="modal-close-button"
                onClick={closeModal}
              >
                Close
              </button>

            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit}>

              {formError && (
                <div className="faculty-form-error">
                  {formError}
                </div>
              )}

                {/* 1. DEPARTMENT */}
                <div className="faculty-form-group">
                  <label>Department</label>

                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Department</option>

                    {departments.map((department) => (
                      <option key={department} value={department}>
                        {department}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. BLOCK */}
                <div className="faculty-form-group">
                  <label>Block</label>

                  <select
                    name="block"
                    value={formData.block}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Block</option>

                    {blocks.map((block) => (
                      <option key={block} value={block}>
                        {block}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. YEAR */}               
                <div className="faculty-form-group">
                  <label>Year</label>

                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Year</option>

                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 4. CLASSROOM */}
                <div className="faculty-form-group">
                  <label>Classroom</label>

                  <input
                    type="text"
                    name="classroom"
                    value={formData.classroom}
                    onChange={handleInputChange}
                    placeholder="Example: Room 103"
                  />
                </div>

                {/* 5. CAPACITY */}
                <div className="faculty-form-group">
                  <label>Capacity</label>

                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    placeholder="Enter capacity"
                    min="1"
                    step="1"
                  />
                </div>

              {/* FORM BUTTONS */}             
              <div className="faculty-form-buttons">

                <button
                  type="button"
                  className="secondary-button"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                >
                  {editingClassroom
                    ? "Update Classroom"
                    : "Add Classroom"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Classrooms;
