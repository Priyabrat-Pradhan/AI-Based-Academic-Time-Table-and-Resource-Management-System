import { useState } from "react";

const departments = ["Computer Science and Engineering", "Mining Engineering", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering"];

const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

const getSemesters = (year) => {
  const semesterMap = {
    "1st Year": ["1st Semester", "2nd Semester"],
    "2nd Year": ["3rd Semester", "4th Semester"],
    "3rd Year": ["5th Semester", "6th Semester"],
    "4th Year": ["7th Semester", "8th Semester"]
  };

  return semesterMap[year] || [];
};

function Subjects() {
  const [subjects, setSubjects] = useState([
    { code: "CS701", name: "Machine Learning", department: "Computer Science and Engineering", year: "4th Year", semester: "7th Semester", credits: "4" },
    { code: "CS702", name: "Artificial Intelligence", department: "Computer Science and Engineering", year: "4th Year", semester: "7th Semester", credits: "4" },
    { code: "CS703", name: "Computer Networks", department: "Computer Science and Engineering", year: "4th Year", semester: "7th Semester", credits: "3" },
    { code: "CS704", name: "Database Management", department: "Computer Science and Engineering", year: "4th Year", semester: "7th Semester", credits: "4" },
    { code: "ME301", name: "Engineering Mathematics", department: "Mechanical Engineering", year: "2nd Year", semester: "3rd Semester", credits: "4" },
    { code: "CE101", name: "Engineering Physics", department: "Civil Engineering", year: "1st Year", semester: "1st Semester", credits: "3" }
  ]);

  // Filter states
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [formError, setFormError] = useState("");

  const emptyForm = {
    code: "",
    name: "",
    department: "",
    year: "",
    semester: "",
    credits: ""
  };

  const [formData, setFormData] = useState(emptyForm);

  // Check whether all filters are selected
  const tableVisible = Boolean(department && year && semester);

  // Filter subjects
  const filteredSubjects = subjects.filter((subject) => {
    const search = searchTerm.toLowerCase().trim();

    return (
      subject.department === department &&
      subject.year === year &&
      subject.semester === semester &&
      (
        subject.code.toLowerCase().includes(search) ||
        subject.name.toLowerCase().includes(search) ||
        subject.credits.toLowerCase().includes(search)
      )
    );
  });

  // Total subjects for selected filters
  const totalSubjects = subjects.filter(
    (subject) =>
      subject.department === department &&
      subject.year === year &&
      subject.semester === semester
  ).length;

  // Department filter
  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
    setYear("");
    setSemester("");
    setSearchTerm("");
  };

  // Year filter
  const handleYearChange = (event) => {
    setYear(event.target.value);
    setSemester("");
    setSearchTerm("");
  };

  // Semester filter
  const handleSemesterChange = (event) => {
    setSemester(event.target.value);
    setSearchTerm("");
  };

  // Open Add Subject modal
  // This button now works even if filters are not selected.
  const handleAddSubject = () => {
    setEditingSubject(null);

    setFormData({
      ...emptyForm,
      department: department || "",
      year: year || "",
      semester: semester || ""
    });

    setFormError("");
    setShowModal(true);
  };

  // Open Edit Subject modal
  const handleEditSubject = (subject) => {
    setEditingSubject(subject);

    setFormData({
      code: subject.code,
      name: subject.name,
      department: subject.department,
      year: subject.year,
      semester: subject.semester,
      credits: subject.credits
    });

    setFormError("");
    setShowModal(true);
  };

  // Handle modal form changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => {
      const updated = {
        ...previous,
        [name]: value
      };

      // Reset year and semester when department changes
      if (name === "department") {
        updated.year = "";
        updated.semester = "";
      }

      // Reset semester when year changes
      if (name === "year") {
        updated.semester = "";
      }

      return updated;
    });

    setFormError("");
  };

  // Add or update subject
  const handleSubmit = (event) => {
    event.preventDefault();

    const code = formData.code.trim().toUpperCase();
    const name = formData.name.trim();
    const credits = formData.credits.trim();

    // Required field validation
    if (
      !code ||
      !name ||
      !formData.department ||
      !formData.year ||
      !formData.semester ||
      !credits
    ) {
      setFormError("Please fill in all fields.");
      return;
    }

    // Subject code validation
    if (!/^[A-Z0-9]+$/.test(code)) {
      setFormError(
        "Subject code can contain only letters and numbers."
      );
      return;
    }

    // Credits validation
    const creditValue = Number(credits);

    if (
      !Number.isInteger(creditValue) ||
      creditValue < 1 ||
      creditValue > 10
    ) {
      setFormError(
        "Credits must be a whole number between 1 and 10."
      );
      return;
    }

    // Semester validation
    if (!getSemesters(formData.year).includes(formData.semester)) {
      setFormError(
        "Please select a valid semester for the selected year."
      );
      return;
    }

    // Duplicate subject code validation
    const duplicateCode = subjects.some(
      (subject) =>
        subject.code.toLowerCase() === code.toLowerCase() &&
        (!editingSubject || subject.code !== editingSubject.code)
    );

    if (duplicateCode) {
      setFormError("Subject code already exists.");
      return;
    }

    const updatedSubject = {
      code,
      name,
      department: formData.department,
      year: formData.year,
      semester: formData.semester,
      credits
    };

    if (editingSubject) {
      // Update existing subject
      setSubjects((previous) =>
        previous.map((subject) =>
          subject.code === editingSubject.code
            ? updatedSubject
            : subject
        )
      );
    } else {
      // Add new subject
      setSubjects((previous) => [
        ...previous,
        updatedSubject
      ]);
    }

    // Automatically display the saved subject's department,
    // year and semester in the table.
    setDepartment(updatedSubject.department);
    setYear(updatedSubject.year);
    setSemester(updatedSubject.semester);
    setSearchTerm("");

    // Close and reset modal
    setShowModal(false);
    setEditingSubject(null);
    setFormData(emptyForm);
    setFormError("");
  };

  // Delete subject
  const handleDeleteSubject = (code) => {
    const subject = subjects.find(
      (item) => item.code === code
    );

    if (!subject) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${subject.name}?`
    );

    if (!confirmed) return;

    setSubjects((previous) =>
      previous.filter((item) => item.code !== code)
    );
  };

  // Clear all filters
  const handleClearFilters = () => {
    setDepartment("");
    setYear("");
    setSemester("");
    setSearchTerm("");
  };

  // Clear only search
  const handleClearSearch = () => {
    setSearchTerm("");
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setEditingSubject(null);
    setFormData(emptyForm);
    setFormError("");
  };

  return (
    <div className="faculties-page">

      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h2>Subjects</h2>
          <p>
            Manage subjects according to department, year and semester.
          </p>
        </div>
      </div>

      {/* FILTER TOOLBAR */}
      <div className="toolbar faculty-toolbar">

        {/* DEPARTMENT */}
        <select
          className="faculty-filter-select"
          value={department}
          onChange={handleDepartmentChange}
        >
          <option value="">Select Department</option>

          {departments.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* YEAR */}
        <select
          className="faculty-filter-select"
          value={year}
          onChange={handleYearChange}
          disabled={!department}
        >
          <option value="">Select Year</option>

          {years.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* SEMESTER */}
        <select
          className="faculty-filter-select"
          value={semester}
          onChange={handleSemesterChange}
          disabled={!year}
        >
          <option value="">Select Semester</option>

          {getSemesters(year).map((item) => (
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
            placeholder="Search subject..."
            disabled={!tableVisible}
          />

          {searchTerm && (
            <button
              type="button"
              className="clear-search-button"
              onClick={handleClearSearch}
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

        {/* ADD SUBJECT */}
        {/* Always enabled, just like Student and Faculty Management */}
        <button
          type="button"
          className="primary-button"
          onClick={handleAddSubject}
        >
          Add Subject
        </button>

      </div>

      {/* RESULT INFORMATION */}
      <div className="faculty-result-info">
        {!tableVisible ? (
          <span>
            Select department, year and semester to view subjects.
            You can add a subject using the Add Subject button.
          </span>
        ) : (
          <span>
            <strong>{department}</strong>
            {" | "}
            <strong>{year}</strong>
            {" | "}
            <strong>{semester}</strong>
            {" | "}
            Showing <strong>{filteredSubjects.length}</strong> of{" "}
            <strong>{totalSubjects}</strong> subjects
          </span>
        )}
      </div>

      {/* SUBJECT TABLE */}
      {tableVisible && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Subject Code</th>
                <th>Subject Name</th>
                <th>Credits</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredSubjects.length > 0 ? (
                filteredSubjects.map((subject) => (
                  <tr key={subject.code}>
                    <td>
                      <strong>{subject.code}</strong>
                    </td>

                    <td>
                      <strong>{subject.name}</strong>
                    </td>

                    <td>{subject.credits}</td>

                    <td>
                      <div className="faculty-actions">
                        <button
                          type="button"
                          className="table-action edit-action"
                          onClick={() => handleEditSubject(subject)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="table-action delete-action"
                          onClick={() =>
                            handleDeleteSubject(subject.code)
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
                  <td colSpan="4" className="no-results">
                    No subjects found for the selected department,
                    year and semester.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ADD / EDIT SUBJECT MODAL */}
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
                  {editingSubject ? "Edit Subject" : "Add Subject"}
                </h3>

                <p>
                  Enter the subject information below.
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

            {/* SUBJECT FORM */}
            <form onSubmit={handleSubmit}>

              {/* SUBJECT CODE */}
              <div className="faculty-form-group">
                <label>Subject Code</label>

                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  placeholder="Example: CS705"
                  disabled={Boolean(editingSubject)}
                  maxLength="15"
                  required
                />
              </div>

              {/* SUBJECT NAME */}
              <div className="faculty-form-group">
                <label>Subject Name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter subject name"
                  required
                />
              </div>

              {/* DEPARTMENT */}
              <div className="faculty-form-group">
                <label>Department</label>

                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Department</option>

                  {departments.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* YEAR */}
              <div className="faculty-form-group">
                <label>Year</label>

                <select
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  disabled={!formData.department}
                  required
                >
                  <option value="">Select Year</option>

                  {years.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* SEMESTER */}
              <div className="faculty-form-group">
                <label>Semester</label>

                <select
                  name="semester"
                  value={formData.semester}
                  onChange={handleInputChange}
                  disabled={!formData.year}
                  required
                >
                  <option value="">Select Semester</option>

                  {getSemesters(formData.year).map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* CREDITS */}
              <div className="faculty-form-group">
                <label>Credits</label>

                <input
                  type="number"
                  name="credits"
                  value={formData.credits}
                  onChange={handleInputChange}
                  placeholder="Example: 4"
                  min="1"
                  max="10"
                  step="1"
                  required
                />
              </div>

              {/* ERROR MESSAGE */}
              {formError && (
                <div className="faculty-form-error">
                  {formError}
                </div>
              )}

              {/* FORM BUTTONS */}
              <div className="faculty-form-buttons">

                <button
                  type="button"
                  className="modal-close-button"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                >
                  {editingSubject ? "Update Subject" : "Add Subject"}
                </button>

              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Subjects;