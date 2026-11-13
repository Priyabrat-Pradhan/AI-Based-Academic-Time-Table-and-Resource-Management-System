import { useState } from "react";

function ResourceEquipment() {

    const [resources, setResources] = useState([
        {
            name: "Projector",
            category: "Classroom",
            quantity: 15,
            status: "Available"
        },
        {
            name: "Desktop Computer",
            category: "Laboratory",
            quantity: 120,
            status: "Available"
        },
        {
            name: "Smart Board",
            category: "Classroom",
            quantity: 18,
            status: "Available"
        },
        {
            name: "Network Router",
            category: "Networking",
            quantity: 25,
            status: "Available"
        },
        {
            name: "Printer",
            category: "Office",
            quantity: 5,
            status: "Maintenance"
        }
    ]);

    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);

    const [editingResource, setEditingResource] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        category: "",
        quantity: "",
        status: "Available"
    });

    const [formError, setFormError] = useState("");


    /* =========================================
       SEARCH
    ========================================= */

    const filteredResources = resources.filter((resource) =>
        resource.name.toLowerCase().includes(search.toLowerCase()) ||
        resource.category.toLowerCase().includes(search.toLowerCase()) ||
        resource.status.toLowerCase().includes(search.toLowerCase())
    );


    /* =========================================
       INPUT CHANGE
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
       OPEN ADD MODAL
    ========================================= */

    const handleAdd = () => {

        setEditingResource(null);

        setFormData({
            name: "",
            category: "",
            quantity: "",
            status: "Available"
        });

        setFormError("");

        setShowModal(true);
    };


    /* =========================================
       OPEN EDIT MODAL
    ========================================= */

    const handleEdit = (resource) => {

        setEditingResource(resource);

        setFormData({
            name: resource.name,
            category: resource.category,
            quantity: resource.quantity,
            status: resource.status
        });

        setFormError("");

        setShowModal(true);
    };


    /* =========================================
       SAVE RESOURCE
    ========================================= */

    const handleSubmit = (e) => {

        e.preventDefault();

        const name = formData.name.trim();

        const category = formData.category.trim();

        const quantity = Number(formData.quantity);


        /* VALIDATION */

        if (!name || !category || !formData.quantity) {

            setFormError(
                "Please fill in all the required fields."
            );

            return;
        }


        if (quantity <= 0) {

            setFormError(
                "Quantity must be greater than 0."
            );

            return;
        }


        /* CHECK DUPLICATE NAME */

        const duplicate = resources.some(
            (resource) =>
                resource.name.toLowerCase() === name.toLowerCase() &&
                (!editingResource ||
                    resource.name !== editingResource.name)
        );


        if (duplicate) {

            setFormError(
                "A resource with this name already exists."
            );

            return;
        }


        /* EDIT EXISTING */

        if (editingResource) {

            setResources(
                resources.map((resource) =>
                    resource.name === editingResource.name
                        ? {
                            name,
                            category,
                            quantity,
                            status: formData.status
                        }
                        : resource
                )
            );

        }

        /* ADD NEW */

        else {

            setResources([
                ...resources,
                {
                    name,
                    category,
                    quantity,
                    status: formData.status
                }
            ]);
        }


        setShowModal(false);

        setEditingResource(null);

        setFormData({
            name: "",
            category: "",
            quantity: "",
            status: "Available"
        });
    };


    /* =========================================
       DELETE RESOURCE
    ========================================= */

    const handleDelete = (name) => {

        const confirmed = window.confirm(
            `Are you sure you want to delete "${name}"?`
        );

        if (!confirmed) {
            return;
        }

        setResources(
            resources.filter(
                (resource) => resource.name !== name
            )
        );
    };


    /* =========================================
       CHANGE STATUS
    ========================================= */

    const handleStatusChange = (name) => {

        setResources(
            resources.map((resource) =>
                resource.name === name
                    ? {
                        ...resource,
                        status:
                            resource.status === "Available"
                                ? "Maintenance"
                                : "Available"
                    }
                    : resource
            )
        );
    };


    /* =========================================
       CLEAR SEARCH
    ========================================= */

    const clearSearch = () => {
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
                        Resource / Equipment
                    </h2>

                    <p>
                        Manage academic equipment and resources.
                    </p>

                </div>

            </div>


            {/* =========================================
                TOOLBAR
            ========================================= */}

            <div className="faculty-toolbar">

                <div className="faculty-search">

                    <input
                        type="text"
                        placeholder="Search equipment, category or status..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                    {search && (

                        <button
                            className="clear-search-button"
                            onClick={clearSearch}
                        >
                            Clear
                        </button>

                    )}

                </div>


                <button
                    className="primary-button"
                    onClick={handleAdd}
                >
                     Add Resource / Equipment
                </button>

            </div>


            {/* =========================================
                RESULT INFORMATION
            ========================================= */}

            <div className="faculty-result-info">

                Showing{" "}

                <strong>
                    {filteredResources.length}
                </strong>

                {" "}of{" "}

                <strong>
                    {resources.length}
                </strong>

                {" "}resources

            </div>


            {/* =========================================
                TABLE
            ========================================= */}

            <div className="table-container">

                <table>

                    <thead>

                        <tr>

                            <th>
                                Equipment
                            </th>

                            <th>
                                Category
                            </th>

                            <th>
                                Quantity
                            </th>

                            <th>
                                Status
                            </th>

                            <th>
                                Actions
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {filteredResources.length > 0 ? (

                            filteredResources.map((resource) => (

                                <tr key={resource.name}>

                                    <td>
                                        <strong>
                                            {resource.name}
                                        </strong>
                                    </td>

                                    <td>
                                        {resource.category}
                                    </td>

                                    <td>
                                        {resource.quantity}
                                    </td>

                                    <td>

                                        <button
                                            className={
                                                resource.status === "Available"
                                                    ? "status-button active-status"
                                                    : "status-button inactive-status"
                                            }
                                            onClick={() =>
                                                handleStatusChange(
                                                    resource.name
                                                )
                                            }
                                            title="Click to change status"
                                        >
                                            {resource.status}
                                        </button>

                                    </td>


                                    <td>

                                        <div className="faculty-actions">

                                            <button
                                                className="table-action edit-action"
                                                onClick={() =>
                                                    handleEdit(resource)
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="table-action delete-action"
                                                onClick={() =>
                                                    handleDelete(
                                                        resource.name
                                                    )
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

                                <td
                                    colSpan="5"
                                    className="no-results"
                                >
                                    No resources found.
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>


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


                        {/* MODAL HEADER */}

                        <div className="faculty-modal-header">

                            <div>

                                <h3>
                                    {editingResource
                                        ? "Edit Resource / Equipment"
                                        : "Add Resource / Equipment"
                                    }
                                </h3>

                                <p>
                                    {editingResource
                                        ? "Update resource information."
                                        : "Enter the resource or equipment details."
                                    }
                                </p>

                            </div>


                            <button
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


                            {/* NAME */}

                            <div className="faculty-form-group">

                                <label>
                                    Equipment Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter equipment name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />

                            </div>


                            {/* CATEGORY */}

                            <div className="faculty-form-group">

                                <label>
                                    Category
                                </label>

                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Select category
                                    </option>

                                    <option value="Classroom">
                                        Classroom
                                    </option>

                                    <option value="Laboratory">
                                        Laboratory
                                    </option>

                                    <option value="Networking">
                                        Networking
                                    </option>

                                    <option value="Office">
                                        Office
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>

                                </select>

                            </div>


                            {/* QUANTITY */}

                            <div className="faculty-form-group">

                                <label>
                                    Quantity
                                </label>

                                <input
                                    type="number"
                                    name="quantity"
                                    min="1"
                                    placeholder="Enter quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                />

                            </div>


                            {/* STATUS */}

                            <div className="faculty-form-group">

                                <label>
                                    Status
                                </label>

                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                >

                                    <option value="Available">
                                        Available
                                    </option>

                                    <option value="Maintenance">
                                        Maintenance
                                    </option>

                                </select>

                            </div>


                            {/* ERROR */}

                            {formError && (

                                <div className="faculty-form-error">

                                    {formError}

                                </div>

                            )}


                            {/* BUTTONS */}

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
                                    {editingResource
                                        ? "Update Resource"
                                        : "Add Resource"
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

export default ResourceEquipment;