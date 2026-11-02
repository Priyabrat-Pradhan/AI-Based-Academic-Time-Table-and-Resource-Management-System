import { useState } from "react";

function StudentManagement() {

    const [students, setStudents] = useState([
        { regd: "CS001", name: "Rahul Kumar", email: "rahul@gmail.com", phone: "9876543210", department: "Computer Science", year: "3rd" },
        { regd: "CS002", name: "Priya Sharma", email: "priya@gmail.com", phone: "9876543211", department: "Computer Science", year: "3rd" },
        { regd: "MN001", name: "Aman Singh", email: "aman@gmail.com", phone: "9876543212", department: "Mining Engineering", year: "2nd" },
        { regd: "MN002", name: "Sneha Das", email: "sneha@gmail.com", phone: "9876543213", department: "Mining Engineering", year: "2nd" },
        { regd: "MEE001", name: "Arjun Patel", email: "arjun@gmail.com", phone: "9876543214", department: "Mechanical Engineering", year: "4th" },
        { regd: "ME001", name: "Rohan Das", email: "rohan@gmail.com", phone: "9876543215", department: "Mechanical Engineering", year: "1st" }
    ]);


    /* =========================================
       FILTER STATES
    ========================================= */

    const [department, setDepartment] = useState("");

    const [year, setYear] = useState("");

    const [search, setSearch] = useState("");


    /* =========================================
       MODAL
    ========================================= */

    const [showModal, setShowModal] = useState(false);

    const [editingStudent, setEditingStudent] = useState(null);


    /* =========================================
       FORM
    ========================================= */

    const [formData, setFormData] = useState({
        regd: "",
        name: "",
        email: "",
        phone: "",
        department: "",
        year: ""
    });

    const [formError, setFormError] = useState("");


    /* =========================================
       FILTER STUDENTS
    ========================================= */

    const filteredStudents = students.filter((student) => {

        const departmentMatch =
            department === "" ||
            student.department === department;

        const yearMatch =
            year === "" ||
            student.year === year;

        const searchText = search.toLowerCase();

        const searchMatch =
            search === "" ||
            student.regd.toLowerCase().includes(searchText) ||
            student.name.toLowerCase().includes(searchText) ||
            student.email.toLowerCase().includes(searchText) ||
            student.phone.includes(search);

        return (
            departmentMatch &&
            yearMatch &&
            searchMatch
        );
    });


    /* =========================================
       FORM INPUT
    ========================================= */

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        setFormError("");
    };


    /* =========================================
       ADD STUDENT
    ========================================= */

    const handleAdd = () => {

        setEditingStudent(null);

        setFormData({
            regd: "",
            name: "",
            email: "",
            phone: "",
            department: department || "",
            year: year || ""
        });

        setFormError("");

        setShowModal(true);
    };


    /* =========================================
       EDIT STUDENT
    ========================================= */

    const handleEdit = (student) => {

        setEditingStudent(student);

        setFormData({
            regd: student.regd,
            name: student.name,
            email: student.email,
            phone: student.phone,
            department: student.department,
            year: student.year
        });

        setFormError("");

        setShowModal(true);
    };


    /* =========================================
       SAVE STUDENT
    ========================================= */

    const handleSubmit = (e) => {

        e.preventDefault();

        const regd = formData.regd.trim();
        const name = formData.name.trim();
        const email = formData.email.trim();
        const phone = formData.phone.trim();


        /* REQUIRED FIELDS */

        if (
            !regd ||
            !name ||
            !email ||
            !phone ||
            !formData.department ||
            !formData.year
        ) {

            setFormError(
                "Please fill in all the required fields."
            );

            return;
        }


        /* PHONE VALIDATION */

        if (!/^[0-9]{10}$/.test(phone)) {

            setFormError(
                "Phone number must contain exactly 10 digits."
            );

            return;
        }


        /* EMAIL VALIDATION */

        if (!/^\S+@\S+\.\S+$/.test(email)) {

            setFormError(
                "Please enter a valid email address."
            );

            return;
        }


        /* DUPLICATE REGISTRATION */

        const duplicate = students.some(
            (student) =>
                student.regd.toLowerCase() ===
                regd.toLowerCase() &&
                (!editingStudent ||
                    student.regd !== editingStudent.regd)
        );


        if (duplicate) {

            setFormError(
                "A student with this registration number already exists."
            );

            return;
        }


        /* EDIT */

        if (editingStudent) {

            setStudents(
                students.map((student) =>
                    student.regd === editingStudent.regd
                        ? {
                            regd,
                            name,
                            email,
                            phone,
                            department: formData.department,
                            year: formData.year
                        }
                        : student
                )
            );

        }


        /* ADD */

        else {

            setStudents([
                ...students,
                {
                    regd,
                    name,
                    email,
                    phone,
                    department: formData.department,
                    year: formData.year
                }
            ]);

        }


        setShowModal(false);

        setEditingStudent(null);

        setFormError("");
    };


    /* =========================================
       DELETE
    ========================================= */

    const handleDelete = (regd) => {

        const confirmed = window.confirm(
            `Are you sure you want to delete student ${regd}?`
        );

        if (!confirmed) {
            return;
        }

        setStudents(
            students.filter(
                (student) => student.regd !== regd
            )
        );
    };


    /* =========================================
       CLEAR FILTERS
    ========================================= */

    const clearFilters = () => {

        setDepartment("");

        setYear("");

        setSearch("");
    };


    return (

        <div className="faculties-page">


            {/* =========================================
                PAGE HEADER
            ========================================= */}

            <div className="page-header">

                <div>

                    <h2>
                        Student Management
                    </h2>

                    <p>
                        Manage students according to department and year.
                    </p>

                </div>

            </div>


            {/* =========================================
                FILTER TOOLBAR
            ========================================= */}

            <div className="toolbar faculty-toolbar">


                {/* DEPARTMENT */}

                <select
                    className="faculty-filter-select"
                    value={department}
                    onChange={(e) =>
                        setDepartment(e.target.value)
                    }
                >

                    <option value="">
                        Select Department
                    </option>

                    <option value="Computer Science and Engineering">
                        Computer Science and Engineering
                    </option>

                    <option value="Mining Engineering">
                        Mining Engineering
                    </option>

                    <option value="Electrical Engineering">
                        Electrical Engineering
                    </option>

                    <option value="Mechanical Engineering">
                        Mechanical Engineering
                    </option>

                    <option value="Civil Engineering">
                        Civil Engineering
                    </option>

                </select>


                {/* YEAR */}

                <select
                    className="faculty-filter-select"
                    value={year}
                    onChange={(e) =>
                        setYear(e.target.value)
                    }
                >

                    <option value="">
                        Select Year
                    </option>

                    <option value="1st">
                        1st Year
                    </option>

                    <option value="2nd">
                        2nd Year
                    </option>

                    <option value="3rd">
                        3rd Year
                    </option>

                    <option value="4th">
                        4th Year
                    </option>

                </select>


                {/* SEARCH */}

                <div className="faculty-search student-search">

                    <input
                        type="text"
                        placeholder="Search student..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                    {search && (

                        <button
                            className="clear-search-button"
                            onClick={() =>
                                setSearch("")
                            }
                        >
                            Clear
                        </button>

                    )}

                </div>


                {/* CLEAR */}

                <button
                    className="faculty-clear-button"
                    onClick={clearFilters}
                >
                    Clear Filters
                </button>


                {/* ADD */}

                <button
                    className="primary-button"
                    onClick={handleAdd}
                >
                     Add Student
                </button>

            </div>


            {/* =========================================
                RESULT INFORMATION
            ========================================= */}

            <div className="faculty-result-info">

                {department && year ? (

                    <>
                        Showing students of{" "}

                        <strong>
                            {department}
                        </strong>

                        {" - "}

                        <strong>
                            {year} Year
                        </strong>

                        {" | "}

                        <strong>
                            {filteredStudents.length}
                        </strong>

                        {" students"}

                    </>

                ) : (

                    <>
                        Please select a department and year
                        to view students.
                    </>

                )}

            </div>


            {/* =========================================
                TABLE
            ========================================= */}

            {department && year && (

                <div className="table-container">

                    <table>

                        <thead>

                            <tr>

                                <th>
                                    Student Regd.
                                </th>

                                <th>
                                    Student Name
                                </th>

                                <th>
                                    Email Address
                                </th>

                                <th>
                                    Phone Number
                                </th>

                                <th>
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {filteredStudents.length > 0 ? (

                                filteredStudents.map(
                                    (student) => (

                                        <tr key={student.regd}>

                                            <td>
                                                <strong>
                                                    {student.regd}
                                                </strong>
                                            </td>

                                            <td>
                                                {student.name}
                                            </td>

                                            <td>
                                                {student.email}
                                            </td>

                                            <td>
                                                {student.phone}
                                            </td>

                                            <td>

                                                <div className="faculty-actions">

                                                    <button
                                                        className="table-action edit-action"
                                                        onClick={() =>
                                                            handleEdit(student)
                                                        }
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        className="table-action delete-action"
                                                        onClick={() =>
                                                            handleDelete(
                                                                student.regd
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
                                        No students found for
                                        the selected department
                                        and year.
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            )}


            {/* =========================================
                ADD / EDIT MODAL
            ========================================= */}

            {showModal && (

                <div
                    className="faculty-modal-overlay"
                    onClick={() =>
                        setShowModal(false)
                    }
                >

                    <div
                        className="faculty-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >


                        {/* HEADER */}

                        <div className="faculty-modal-header">

                            <div>

                                <h3>
                                    {editingStudent
                                        ? "Edit Student"
                                        : "Add Student"
                                    }
                                </h3>

                                <p>
                                    Enter student information.
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


                        {/* FORM */}

                        <form onSubmit={handleSubmit}>


                            {/* REGISTRATION */}

                            <div className="faculty-form-group">

                                <label>
                                    Student Regd.
                                </label>

                                <input
                                    type="text"
                                    name="regd"
                                    placeholder="Enter registration number"
                                    value={formData.regd}
                                    onChange={handleChange}
                                    disabled={Boolean(
                                        editingStudent
                                    )}
                                />

                            </div>


                            {/* NAME */}

                            <div className="faculty-form-group">

                                <label>
                                    Student Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter student name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />

                            </div>


                            {/* EMAIL */}

                            <div className="faculty-form-group">

                                <label>
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter email address"
                                    value={formData.email}
                                    onChange={handleChange}
                                />

                            </div>


                            {/* PHONE */}

                            <div className="faculty-form-group">

                                <label>
                                    Phone Number
                                </label>

                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Enter 10 digit phone number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />

                            </div>


                            {/* DEPARTMENT */}

                            <div className="faculty-form-group">

                                <label>
                                    Department
                                </label>

                                <select
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Select Department
                                    </option>

                                    <option value="Computer Science and Engineering">
                                        Computer Science and Engineering
                                    </option>

                                    <option value="Mining Engineering">
                                        Mining Engineering
                                    </option>

                                    <option value="Electrical Engineering">
                                        Electrical Engineering
                                    </option>

                                    <option value="Mechanical Engineering">
                                        Mechanical Engineering
                                    </option>

                                    <option value="Civil Engineering">
                                        Civil Engineering
                                    </option>

                                </select>

                            </div>


                            {/* YEAR */}

                            <div className="faculty-form-group">

                                <label>
                                    Year
                                </label>

                                <select
                                    name="year"
                                    value={formData.year}
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Select Year
                                    </option>

                                    <option value="1st">
                                        1st Year
                                    </option>

                                    <option value="2nd">
                                        2nd Year
                                    </option>

                                    <option value="3rd">
                                        3rd Year
                                    </option>

                                    <option value="4th">
                                        4th Year
                                    </option>

                                </select>

                            </div>


                            {/* ERROR */}

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

                                    {editingStudent
                                        ? "Update Student"
                                        : "Add Student"
                                    }

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
}

export default StudentManagement;