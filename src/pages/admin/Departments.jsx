import { useState } from "react";

function Departments() {
  const [departments, setDepartments] = useState([
    {
      id: "D001",
      name: "Computer Science and Engineering",
      code: "CSE",
      faculties: "12",
    },
    {
      id: "D002",
      name: "Mining Engineering",
      code: "MNE",
      faculties: "10",
    },
    {
      id: "D003",
      name: "Electrical Engineering",
      code: "EE",
      faculties: "8",
    },
    {
      id: "D004",
      name: "Mechanical Engineering",
      code: "ME",
      faculties: "7",
    },
    {
      id: "D005",
      name: "Civil Engineering",
      code: "CE",
      faculties: "6",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingDepartment, setEditingDepartment] =
    useState(null);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    code: "",
    faculties: "",
  });

  const [formError, setFormError] = useState("");

  /* =========================================
     SEARCH
  ========================================= */

  const filteredDepartments = departments.filter(
    (department) => {
      const search = searchTerm
        .toLowerCase()
        .trim();

      return (
        department.id
          .toLowerCase()
          .includes(search) ||

        department.name
          .toLowerCase()
          .includes(search) ||

        department.code
          .toLowerCase()
          .includes(search)
      );
    }
  );

  /* =========================================
     ADD DEPARTMENT
  ========================================= */

  const handleAddDepartment = () => {
    setEditingDepartment(null);

    setFormData({
      id: "",
      name: "",
      code: "",
      faculties: "",
    });

    setFormError("");

    setShowModal(true);
  };

  /* =========================================
     EDIT DEPARTMENT
  ========================================= */

  const handleEditDepartment = (department) => {
    setEditingDepartment(department);

    setFormData({
      id: department.id,
      name: department.name,
      code: department.code,
      faculties: department.faculties,
    });

    setFormError("");

    setShowModal(true);
  };

  /* =========================================
     INPUT CHANGE
  ========================================= */

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setFormError("");
  };

  /* =========================================
     SUBMIT FORM
  ========================================= */

  const handleSubmit = (event) => {
    event.preventDefault();

    const id = formData.id.trim();
    const name = formData.name.trim();
    const code = formData.code.trim().toUpperCase();
    const faculties = formData.faculties.trim();

    /* Validation */

    if (!id || !name || !code || !faculties) {
      setFormError(
        "Please fill in all fields."
      );

      return;
    }

    /* Faculty count validation */

    if (!/^\d+$/.test(faculties)) {
      setFormError(
        "Faculty count must be a valid number."
      );

      return;
    }

    /* Duplicate ID */

    const duplicateId = departments.some(
      (department) =>
        department.id.toLowerCase() ===
          id.toLowerCase() &&
        (!editingDepartment ||
          department.id !== editingDepartment.id)
    );

    if (duplicateId) {
      setFormError(
        "Department ID already exists."
      );

      return;
    }

    /* Duplicate code */

    const duplicateCode = departments.some(
      (department) =>
        department.code.toLowerCase() ===
          code.toLowerCase() &&
        (!editingDepartment ||
          department.id !== editingDepartment.id)
    );

    if (duplicateCode) {
      setFormError(
        "Department code already exists."
      );

      return;
    }

    /* =====================================
       EDIT
    ===================================== */

    if (editingDepartment) {
      setDepartments(
        (previousDepartments) =>
          previousDepartments.map(
            (department) =>
              department.id ===
              editingDepartment.id
                ? {
                    ...department,
                    id,
                    name,
                    code,
                    faculties,
                  }
                : department
          )
      );
    }

    /* =====================================
       ADD
    ===================================== */

    else {
      const newDepartment = {
        id,
        name,
        code,
        faculties,
      };

      setDepartments(
        (previousDepartments) => [
          ...previousDepartments,
          newDepartment,
        ]
      );
    }

    /* Reset */

    setShowModal(false);

    setEditingDepartment(null);

    setFormData({
      id: "",
      name: "",
      code: "",
      faculties: "",
    });

    setFormError("");
  };

  /* =========================================
     DELETE
  ========================================= */

  const handleDeleteDepartment = (id) => {
    const department = departments.find(
      (item) => item.id === id
    );

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${department.name}?`
    );

    if (!confirmDelete) {
      return;
    }

    setDepartments(
      (previousDepartments) =>
        previousDepartments.filter(
          (department) =>
            department.id !== id
        )
    );
  };

  /* =========================================
     CLEAR SEARCH
  ========================================= */

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="faculties-page">

      {/* =====================================
          PAGE HEADER
      ===================================== */}

      <PageHeader
        title="Departments"
        description="Manage academic departments."
      />


      {/* =====================================
          TOOLBAR
      ===================================== */}

      <div className="toolbar faculty-toolbar">

        <div className="faculty-search">

          <input
            type="text"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(
                event.target.value
              )
            }
            placeholder="Search by ID, department or code..."
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


        <button
          type="button"
          className="primary-button"
          onClick={handleAddDepartment}
        >
          Add Department
        </button>

      </div>


      {/* =====================================
          RESULT COUNT
      ===================================== */}

      <div className="faculty-result-info">

        Showing{" "}

        <strong>
          {filteredDepartments.length}
        </strong>

        {" "}of{" "}

        <strong>
          {departments.length}
        </strong>

        {" "}departments

      </div>


      {/* =====================================
          DEPARTMENT TABLE
      ===================================== */}

      <div className="table-container">

        <table>

          <thead>

            <tr>

              <th>ID</th>

              <th>Department</th>

              <th>Code</th>

              <th>Faculties</th>

              <th>Actions</th>

            </tr>

          </thead>


          <tbody>

            {filteredDepartments.length > 0 ? (

              filteredDepartments.map(
                (department) => (

                  <tr
                    key={department.id}
                  >

                    <td>
                      <strong>
                        {department.id}
                      </strong>
                    </td>


                    <td>
                      <strong>
                        {department.name}
                      </strong>
                    </td>


                    <td>
                      {department.code}
                    </td>


                    <td>
                      {department.faculties}
                    </td>


                    <td>

                      <div className="faculty-actions">

                        <button
                          type="button"
                          className="table-action edit-action"
                          onClick={() =>
                            handleEditDepartment(
                              department
                            )
                          }
                        >
                          Edit
                        </button>


                        <button
                          type="button"
                          className="table-action delete-action"
                          onClick={() =>
                            handleDeleteDepartment(
                              department.id
                            )
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )

            ) : (

              <tr>

                <td
                  colSpan="5"
                  className="no-results"
                >
                  No departments found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>


      {/* =====================================
          ADD / EDIT MODAL
      ===================================== */}

      {showModal && (

        <div
          className="faculty-modal-overlay"
          onClick={() =>
            setShowModal(false)
          }
        >

          <div
            className="faculty-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="faculty-modal-header">

              <div>

                <h3>

                  {editingDepartment
                    ? "Edit Department"
                    : "Add Department"}

                </h3>

                <p>

                  {editingDepartment
                    ? "Update department information."
                    : "Enter the department information below."}

                </p>

              </div>


              <button
                type="button"
                className="modal-close-button"
                onClick={() =>
                  setShowModal(false)
                }
              >
                Close
              </button>

            </div>


            {/* =================================
                FORM
            ================================= */}

            <form
              onSubmit={handleSubmit}
            >

              {formError && (

                <div className="faculty-form-error">
                  {formError}
                </div>

              )}


              {/* DEPARTMENT ID */}

              <div className="faculty-form-group">

                <label>
                  Department ID
                </label>

                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={
                    handleInputChange
                  }
                  placeholder="Example: D006"
                  disabled={
                    !!editingDepartment
                  }
                />

              </div>


              {/* DEPARTMENT NAME */}

              <div className="faculty-form-group">

                <label>
                  Department Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={
                    handleInputChange
                  }
                  placeholder="Enter department name"
                />

              </div>


              {/* DEPARTMENT CODE */}

              <div className="faculty-form-group">

                <label>
                  Department Code
                </label>

                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={
                    handleInputChange
                  }
                  placeholder="Example: CSE"
                  maxLength="10"
                />

              </div>


              {/* FACULTY COUNT */}

              <div className="faculty-form-group">

                <label>
                  Number of Faculties
                </label>

                <input
                  type="number"
                  name="faculties"
                  value={
                    formData.faculties
                  }
                  onChange={
                    handleInputChange
                  }
                  placeholder="Enter number of faculties"
                  min="0"
                />

              </div>


              {/* FORM BUTTONS */}

              <div className="faculty-form-buttons">

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="primary-button"
                >

                  {editingDepartment
                    ? "Update Department"
                    : "Add Department"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}


/* =========================================
   PAGE HEADER
========================================= */

function PageHeader({
  title,
  description,
}) {
  return (
    <div className="page-header">

      <div>

        <h2>
          {title}
        </h2>

        <p>
          {description}
        </p>

      </div>

    </div>
  );
}


export default Departments;