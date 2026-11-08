
import { useState } from "react";

const departments = [
  "Computer Science and Engineering",
  "Mining Engineering",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering"
];

const blocks = ["Block 1", "Block 2", "Block 3", "Block 4"];

const purposes = [
  "Programming",
  "AI / ML",
  "Networking",
  "Database",
  "Hardware",
  "Software Development",
  "Project Work",
  "Electronics",
  "Electrical",
  "Communication",
  "Physics",
  "Chemistry",
  "Mechanical Workshop",
  "Civil Engineering",
  "Data Science"
];

const initialLabs = [
  {
    id: 1,
    department: "Computer Science and Engineering",
    block: "Block 1",
    name: "Computer Lab 1",
    purpose: ["Programming", "Software Development"],
    capacity: "40"
  },
  {
    id: 2,
    department: "Computer Science and Engineering",
    block: "Block 1",
    name: "Computer Lab 2",
    purpose: ["AI / ML", "Data Science"],
    capacity: "40"
  },
  {
    id: 3,
    department: "Computer Science and Engineering",
    block: "Block 2",
    name: "Networking Lab",
    purpose: ["Networking", "Communication"],
    capacity: "35"
  },
  {
    id: 4,
    department: "Computer Science and Engineering",
    block: "Block 2",
    name: "Database Lab",
    purpose: ["Database", "Programming"],
    capacity: "35"
  },
  {
    id: 5,
    department: "Electrical Engineering",
    block: "Block 3",
    name: "Electrical Lab",
    purpose: ["Electronics", "Electrical"],
    capacity: "40"
  },
  {
    id: 6,
    department: "Mechanical Engineering",
    block: "Block 4",
    name: "Mechanical Workshop",
    purpose: ["Mechanical Workshop", "Project Work"],
    capacity: "45"
  },
  {
    id: 7,
    department: "Civil Engineering",
    block: "Block 3",
    name: "Civil Engineering Lab",
    purpose: ["Civil Engineering"],
    capacity: "30"
  },
  {
    id: 8,
    department: "Mining Engineering",
    block: "Block 4",
    name: "Mining Research Lab",
    purpose: ["Project Work"],
    capacity: "35"
  }
];

function Laboratories() {
  const [labs, setLabs] = useState(initialLabs);

  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingLab, setEditingLab] = useState(null);

  const [showPurposeDropdown, setShowPurposeDropdown] = useState(false);

  const [formData, setFormData] = useState({
    department: "",
    block: "",
    purpose: [],
    name: "",
    capacity: ""
  });

  const [error, setError] = useState("");

  // FILTER LABORATORIES
  const filteredLabs = labs.filter((lab) => {
    const matchesDepartment =
      lab.department === selectedDepartment;

    const searchText = search.toLowerCase();

    const matchesSearch =
      lab.name.toLowerCase().includes(searchText) ||
      lab.block.toLowerCase().includes(searchText) ||
      lab.purpose.join(" ").toLowerCase().includes(searchText) ||
      lab.capacity.toLowerCase().includes(searchText);

    return matchesDepartment && matchesSearch;
  });

  // OPEN ADD MODAL
  const handleAdd = () => {
    if (!selectedDepartment) {
      return;
    }

    setEditingLab(null);

    setFormData({
      department: selectedDepartment,
      block: "",
      purpose: [],
      name: "",
      capacity: ""
    });

    setError("");
    setShowPurposeDropdown(false);
    setShowModal(true);
  };

  // OPEN EDIT MODAL
  const handleEdit = (lab) => {
    setEditingLab(lab);

    setFormData({
      department: lab.department,
      block: lab.block,
      purpose: [...lab.purpose],
      name: lab.name,
      capacity: lab.capacity
    });

    setError("");
    setShowPurposeDropdown(false);
    setShowModal(true);
  };

  // HANDLE NORMAL INPUTS
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  // HANDLE MULTIPLE PURPOSE SELECTION
  const handlePurposeChange = (purpose) => {
    setFormData((previous) => {
      const alreadySelected = previous.purpose.includes(purpose);

      return {
        ...previous,
        purpose: alreadySelected
          ? previous.purpose.filter((item) => item !== purpose)
          : [...previous.purpose, purpose]
      };
    });
  };

  // SAVE LABORATORY
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const department = formData.department;
    const block = formData.block;
    const name = formData.name.trim();
    const capacity = formData.capacity.trim();
    const purpose = formData.purpose;

    if (
      !department ||
      !block ||
      !name ||
      !capacity ||
      purpose.length === 0
    ) {
      setError("Please fill in all fields and select at least one purpose.");
      return;
    }

    if (!Number.isInteger(Number(capacity)) || Number(capacity) <= 0) {
      setError("Capacity must be a positive whole number.");
      return;
    }

    // A laboratory name must be unique only within the same department and block.
    const duplicate = labs.some((lab) => {
      return (
        lab.department === department &&
        lab.block === block &&
        lab.name.toLowerCase() === name.toLowerCase() &&
        lab.id !== editingLab?.id
      );
    });

    if (duplicate) {
      setError("This laboratory already exists in the selected department and block.");
      return;
    }

    if (editingLab) {
      // UPDATE
      setLabs((previous) =>
        previous.map((lab) =>
          lab.id === editingLab.id
            ? {
                ...lab,
                department,
                block,
                name,
                purpose: [...purpose],
                capacity
              }
            : lab
        )
      );
    } else {
      // ADD
      const newLab = {
        id: Date.now(),
        department,
        block,
        name,
        purpose: [...purpose],
        capacity
      };

      setLabs((previous) => [...previous, newLab]);
    }

    setShowModal(false);
    setEditingLab(null);
    setShowPurposeDropdown(false);

    setFormData({
      department: "",
      block: "",
      purpose: [],
      name: "",
      capacity: ""
    });
  };

  // DELETE LABORATORY
  const handleDelete = (lab) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${lab.name}" from ${lab.block}?`
    );

    if (!confirmDelete) return;

    setLabs((previous) =>
      previous.filter((item) => item.id !== lab.id)
    );
  };

  // CLEAR FILTERS
  const handleClear = () => {
    setSelectedDepartment("");
    setSearch("");
  };

  // CLOSE MODAL
  const handleClose = () => {
    setShowModal(false);
    setEditingLab(null);
    setShowPurposeDropdown(false);
    setError("");

    setFormData({
      department: "",
      block: "",
      purpose: [],
      name: "",
      capacity: ""
    });
  };

  return (
    <div className="faculties-page">

      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h2>Laboratories</h2>
          <p>Manage department laboratories, blocks and their purposes.</p>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="toolbar faculty-toolbar">

        <select
          className="faculty-filter-select"
          value={selectedDepartment}
          onChange={(e) => {
            setSelectedDepartment(e.target.value);
            setSearch("");
          }}
        >
          <option value="">Select Department</option>
          {departments.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>

        <div className="faculty-search student-search">
          <input
            type="text"
            placeholder="Search laboratory, block or purpose..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={!selectedDepartment}
          />

          {search && (
            <button
              type="button"
              className="clear-search-button"
              onClick={() => setSearch("")}
            >
              Clear
            </button>
          )}
        </div>

        <button
          type="button"
          className="faculty-clear-button"
          onClick={handleClear}
        >
          Clear Filters
        </button>

        <button
          type="button"
          className="primary-button"
          onClick={handleAdd}
          disabled={!selectedDepartment}
        >
          Add Laboratory
        </button>

      </div>

      {/* TABLE INFORMATION */}
      {selectedDepartment ? (
        <>
          <div className="faculty-result-info">
            Showing <strong>{filteredLabs.length}</strong> of{" "}
            <strong>
              {labs.filter(
                (lab) => lab.department === selectedDepartment
              ).length}
            </strong>{" "}
            laboratories
          </div>

          {/* LABORATORY TABLE */}
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Block</th>
                  <th>Laboratory</th>
                  <th>Purpose</th>
                  <th>Capacity</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredLabs.length > 0 ? (
                  filteredLabs.map((lab) => (
                    <tr key={lab.id}>
                      <td>
                        <strong>{lab.block}</strong>
                      </td>

                      <td>
                        <strong>{lab.name}</strong>
                      </td>

                      <td>
                        <div className="laboratory-purpose-list">
                          {lab.purpose.map((item) => (
                            <span key={item} className="laboratory-purpose-tag">
                              {item}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td>{lab.capacity} Students</td>

                      <td>
                        <div className="faculty-actions">
                          <button
                            type="button"
                            className="table-action edit-action"
                            onClick={() => handleEdit(lab)}
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="table-action delete-action"
                            onClick={() => handleDelete(lab)}
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
                      No laboratories found for this department.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="faculty-result-info">
          Select a department to view its laboratories.
        </div>
      )}

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div
          className="faculty-modal-overlay"
          onClick={handleClose}
        >
          <div
            className="faculty-modal"
            onClick={(e) => e.stopPropagation()}
          >

            {/* MODAL HEADER */}
            <div className="faculty-modal-header">
              <div>
                <h3>
                  {editingLab ? "Edit Laboratory" : "Add Laboratory"}
                </h3>
                <p>
                  {editingLab
                    ? "Update the laboratory details."
                    : "Enter the new laboratory details."}
                </p>
              </div>

              <button
                type="button"
                className="modal-close-button"
                onClick={handleClose}
              >
                Close
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit}>

              {/* DEPARTMENT */}
              <div className="faculty-form-group">
                <label>Department</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                >
                  <option value="">Select Department</option>
                  {departments.map((department) => (
                    <option key={department} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
              </div>

              {/* BLOCK */}
              <div className="faculty-form-group">
                <label>Block</label>
                <select
                  name="block"
                  value={formData.block}
                  onChange={handleChange}
                >
                  <option value="">Select Block</option>
                  {blocks.map((block) => (
                    <option key={block} value={block}>
                      {block}
                    </option>
                  ))}
                </select>
              </div>

              {/* PURPOSE MULTI-SELECT */}
              <div className="faculty-form-group">
                <label>Purpose (Select one or more)</label>

                <div className="laboratory-purpose-dropdown">
                  <button
                    type="button"
                    className="laboratory-purpose-trigger"
                    onClick={() =>
                      setShowPurposeDropdown((previous) => !previous)
                    }
                  >
                    <span>
                      {formData.purpose.length > 0
                        ? `${formData.purpose.length} purpose(s) selected`
                        : "Select Purpose"}
                    </span>
                    <span>{showPurposeDropdown ? "▲" : "▼"}</span>
                  </button>

                  {showPurposeDropdown && (
                    <div className="laboratory-purpose-options">
                      {purposes.map((purpose) => (
                        <label key={purpose}>
                          <input
                            type="checkbox"
                            checked={formData.purpose.includes(purpose)}
                            onChange={() => handlePurposeChange(purpose)}
                          />
                          <span>{purpose}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {formData.purpose.length > 0 && (
                  <div className="laboratory-selected-purposes">
                    {formData.purpose.map((purpose) => (
                      <span key={purpose}>{purpose}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* LABORATORY NAME */}
              <div className="faculty-form-group">
                <label>Laboratory Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter laboratory name"
                />
              </div>

              {/* CAPACITY */}
              <div className="faculty-form-group">
                <label>Capacity</label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  placeholder="Enter capacity"
                  min="1"
                  step="1"
                />
              </div>

              {/* ERROR */}
              {error && (
                <div className="faculty-form-error">
                  {error}
                </div>
              )}

              {/* FORM BUTTONS */}
              <div className="faculty-form-buttons">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={handleClose}
                >
                  Cancel
                </button>

                <button type="submit" className="primary-button">
                  {editingLab ? "Update Laboratory" : "Add Laboratory"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Laboratories;
