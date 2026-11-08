import { useState } from "react";

const departments = ["Computer Science and Engineering", "Mining Engineering", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering"];

function Faculties() {
  const [faculties, setFaculties] = useState([
    { id: "T001", name: "Dr. Rajesh Kumar", department: "Computer Science and Engineering", email: "rajesh@college.edu", phone: "9876543210", status: "Active" },
    { id: "T002", name: "Prof. Priya Sharma", department: "Electrical Engineering", email: "priya@college.edu", phone: "9876543211", status: "Active" },
    { id: "T003", name: "Dr. Amit Singh", department: "Computer Science and Engineering", email: "amit@college.edu", phone: "9876543212", status: "Active" },
    { id: "T004", name: "Prof. Sneha Das", department: "Mechanical Engineering", email: "sneha@college.edu", phone: "9876543213", status: "Inactive" },
    { id: "T005", name: "Dr. Rohan Patel", department: "Mining Engineering", email: "rohan@college.edu", phone: "9876543214", status: "Active" }
  ]);

  const [department, setDepartment] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState(null);
  const [formError, setFormError] = useState("");

  const emptyForm = {
    id: "",
    name: "",
    department: "",
    email: "",
    phone: ""
  };

  const [formData, setFormData] = useState(emptyForm);

  // Filter by selected department and search text
  const filteredFaculties = faculties.filter((faculty) => {
    const departmentMatch = faculty.department === department;
    const search = searchTerm.toLowerCase().trim();

    const searchMatch =
      faculty.id.toLowerCase().includes(search) ||
      faculty.name.toLowerCase().includes(search) ||
      faculty.email.toLowerCase().includes(search) ||
      faculty.phone.includes(search);

    return departmentMatch && searchMatch;
  });

  // Open Add Faculty modal
  const handleAddFaculty = () => {
    setEditingFaculty(null);
    setFormData({
      ...emptyForm,
      department: department
    });
    setFormError("");
    setShowModal(true);
  };

  // Open Edit Faculty modal
  const handleEditFaculty = (faculty) => {
    setEditingFaculty(faculty);
    setFormData({
      id: faculty.id,
      name: faculty.name,
      department: faculty.department,
      email: faculty.email,
      phone: faculty.phone
    });
    setFormError("");
    setShowModal(true);
  };

  // Handle form inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));

    setFormError("");
  };

  // Add or update faculty
  const handleSubmit = (event) => {
    event.preventDefault();

    const id = formData.id.trim();
    const name = formData.name.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();
    const selectedDepartment = formData.department;

    if (!id || !name || !email || !phone || !selectedDepartment) {
      setFormError("Please fill in all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      setFormError("Phone number must contain exactly 10 digits.");
      return;
    }

    const duplicateId = faculties.some(
      (faculty) =>
        faculty.id.toLowerCase() === id.toLowerCase() &&
        (!editingFaculty || faculty.id !== editingFaculty.id)
    );

    if (duplicateId) {
      setFormError("Faculty ID already exists.");
      return;
    }

    const duplicateEmail = faculties.some(
      (faculty) =>
        faculty.email.toLowerCase() === email.toLowerCase() &&
        (!editingFaculty || faculty.id !== editingFaculty.id)
    );

    if (duplicateEmail) {
      setFormError("This email address is already registered.");
      return;
    }

    if (editingFaculty) {
      setFaculties((previous) =>
        previous.map((faculty) =>
          faculty.id === editingFaculty.id
            ? {
                ...faculty,
                name,
                department: selectedDepartment,
                email,
                phone
              }
            : faculty
        )
      );

      setDepartment(selectedDepartment);
    } else {
      setFaculties((previous) => [
        ...previous,
        {
          id,
          name,
          department: selectedDepartment,
          email,
          phone,
          status: "Active"
        }
      ]);

      setDepartment(selectedDepartment);
    }

    setShowModal(false);
    setEditingFaculty(null);
    setFormData(emptyForm);
    setFormError("");
  };

  // Delete faculty
  const handleDeleteFaculty = (id) => {
    const faculty = faculties.find((item) => item.id === id);

    if (!faculty) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${faculty.name}?`
    );

    if (!confirmed) return;

    setFaculties((previous) =>
      previous.filter((faculty) => faculty.id !== id)
    );
  };

  // Toggle Active / Inactive status
  const handleStatusChange = (id) => {
    setFaculties((previous) =>
      previous.map((faculty) =>
        faculty.id === id
          ? {
              ...faculty,
              status:
                faculty.status === "Active" ? "Inactive" : "Active"
            }
          : faculty
      )
    );
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setEditingFaculty(null);
    setFormError("");
  };

  // Clear search and department
  const handleClearFilters = () => {
    setDepartment("");
    setSearchTerm("");
  };

  return (
    <div className="faculties-page">

      {/* PAGE HEADER */}
      <PageHeader
        title="Faculties"
        description="Manage faculty information department-wise."
      />

      {/* TOOLBAR */}
      <div className="toolbar faculty-toolbar">

        {/* DEPARTMENT DROPDOWN */}
        <select
          className="faculty-filter-select"
          value={department}
          onChange={(event) => {
            setDepartment(event.target.value);
            setSearchTerm("");
          }}
        >
          <option value="">Select Department</option>

          {departments.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* SEARCH */}
        <div className="faculty-search student-search">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by ID, name, email or phone..."
            disabled={!department}
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

        {/* CLEAR FILTERS */}
        <button
          type="button"
          className="faculty-clear-button"
          onClick={handleClearFilters}
        >
          Clear Filters
        </button>

        {/* ADD FACULTY */}
        <button
          type="button"
          className="primary-button"
          onClick={handleAddFaculty}
        >
          Add Faculty
        </button>

      </div>

      {/* RESULT INFORMATION */}
      <div className="faculty-result-info">
        {!department ? (
          <span>Please select a department to view faculty records.</span>
        ) : (
          <span>
            Department: <strong>{department}</strong>
            {" | "}
            Showing <strong>{filteredFaculties.length}</strong> of{" "}
            <strong>
              {faculties.filter((f) => f.department === department).length}
            </strong>{" "}
            faculties
          </span>
        )}
      </div>

      {/* FACULTY TABLE - SHOW AFTER DEPARTMENT SELECTION */}
      {department && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Faculty ID</th>
                <th>Faculty Name</th>
                <th>Email Address</th>
                <th>Phone Number</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredFaculties.length > 0 ? (
                filteredFaculties.map((faculty) => (
                  <tr key={faculty.id}>
                    <td>
                      <strong>{faculty.id}</strong>
                    </td>

                    <td>
                      <strong>{faculty.name}</strong>
                    </td>

                    <td>{faculty.email}</td>

                    <td>{faculty.phone}</td>

                    <td>
                      <button
                        type="button"
                        className={
                          faculty.status === "Active"
                            ? "status-button active-status"
                            : "status-button inactive-status"
                        }
                        onClick={() => handleStatusChange(faculty.id)}
                      >
                        {faculty.status}
                      </button>
                    </td>

                    <td>
                      <div className="faculty-actions">
                        <button
                          type="button"
                          className="table-action edit-action"
                          onClick={() => handleEditFaculty(faculty)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="table-action delete-action"
                          onClick={() => handleDeleteFaculty(faculty.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-results">
                    No faculties found in this department.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div
          className="faculty-modal-overlay"
          onClick={closeModal}
        >
          <div
            className="faculty-modal"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="faculty-modal-header">
              <div>
                <h3>
                  {editingFaculty ? "Edit Faculty" : "Add Faculty"}
                </h3>

                <p>
                  {editingFaculty
                    ? "Update faculty information."
                    : "Enter the faculty information below."}
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

            <form onSubmit={handleSubmit}>

              <div className="faculty-form-group">
                <label>Faculty ID</label>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleInputChange}
                  placeholder="Example: T006"
                  disabled={Boolean(editingFaculty)}
                />
              </div>

              <div className="faculty-form-group">
                <label>Faculty Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter faculty name"
                />
              </div>

              <div className="faculty-form-group">
                <label>Department</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                >
                  <option value="">Select Department</option>

                  {departments.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="faculty-form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter faculty email"
                />
              </div>

              <div className="faculty-form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter 10 digit phone number"
                  maxLength="10"
                />
              </div>

              {formError && (
                <div className="faculty-form-error">
                  {formError}
                </div>
              )}

              <div className="faculty-form-buttons">
                <button
                  type="button"
                  className="modal-close-button"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button type="submit" className="primary-button">
                  {editingFaculty ? "Update Faculty" : "Add Faculty"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

function PageHeader({ title, description }) {
  return (
    <div className="page-header">
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default Faculties;
