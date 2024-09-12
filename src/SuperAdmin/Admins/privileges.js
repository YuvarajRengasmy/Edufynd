import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { updateAdmin, getSingleAdmin } from "../../api/admin";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import { Collapse } from "react-bootstrap";

const Header = () => {
  const initialStatePrivilege = {
    module: "",
    view: false,
    edit: false,
    delete: false,
    add: false,
  };

  const initialStatePrivilegesErrors = {
    module: { required: false },
  };

  const [privileges, setPrivileges] = useState([initialStatePrivilege]);
  const [errors, setErrors] = useState([initialStatePrivilegesErrors]);
  const [isTasksCollapsed, setIsTasksCollapsed] = useState({});
  const [selectedModule, setSelectedModule] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const modal = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    const module = id.replace("Checkbox", "");

    if (checked) {
      setPrivileges((prevPrivileges) => {
        const existingPrivilege = prevPrivileges.find(
          (priv) => priv.module === module
        );
        if (existingPrivilege) {
          return prevPrivileges.map((priv) =>
            priv.module === module ? { ...priv } : priv
          );
        } else {
          return [...prevPrivileges, { ...initialStatePrivilege, module }];
        }
      });
      setSelectedModule(module);
      setIsTasksCollapsed((prev) => ({ ...prev, [module]: !prev[module] }));
    } else {
      setPrivileges((prevPrivileges) =>
        prevPrivileges.filter((priv) => priv.module !== module)
      );
      setSelectedModule("");
      setIsTasksCollapsed((prev) => ({ ...prev, [module]: true }));
    }
  };

  const handlePermissionChange = (event) => {
    const { name, checked } = event.target;
    setPrivileges((prevPrivileges) =>
      prevPrivileges.map((priv) =>
        priv.module === selectedModule ? { ...priv, [name]: checked } : priv
      )
    );
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = () => {
    getSingleAdmin(id)
      .then((res) => {
        const result = res?.data?.result?.privileges;
        setPrivileges(result || [initialStatePrivilege]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleValidation = (data) => {
    let error = { ...initialStatePrivilegesErrors };

    if (!data.module) {
      error.module.required = true;
    }

    return error;
  };

  const handleErrors = (errorArray) => {
    return errorArray.every(
      (error) => !Object.values(error.module).some((val) => val === true)
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = privileges.map((priv) => handleValidation(priv));
    setErrors(newErrors);
    setSubmitted(true);

    if (handleErrors(newErrors)) {
      const data = {
        _id: id,
        privileges,
      };

      updateAdmin(data)
        .then((res) => {
          toast.success("Successfully updated privileges");
          getUserDetails();
          modal.current.click(); // Close modal after successful update
          navigate("/list_Admin");
        })
        .catch((err) => {
          toast.error(
            err?.response?.data?.message || "Error updating privileges"
          );
        });
    }
  };

  return (
    <>
      <div>
        <div className="col-12">
          <button
            type="button"
            style={{ fontFamily: "Plus Jakarta Sans", fontSize: "10px" }}
            className="btn rounded-1  btn-dark fw-semibold"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Set Privileges
          </button>
        </div>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Privileges
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div>
                  <div className="row">
                    <div className="col-lg-6">
                      <label style={{ color: "#231F20" }}>Select Module</label>
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="universityCheckbox"
                          name="module"
                          onChange={handleCheckboxChange}
                          checked={
                            privileges.find(
                              (priv) => priv.module === "university"
                            )?.view ||
                            privileges.find(
                              (priv) => priv.module === "university"
                            )?.edit ||
                            privileges.find(
                              (priv) => priv.module === "university"
                            )?.delete ||
                            privileges.find(
                              (priv) => priv.module === "university"
                            )?.add ||
                            selectedModule === "university"
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="universityCheckbox"
                        >
                          University
                        </label>

                        <Collapse in={!isTasksCollapsed.university}>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3">
                            <label style={{ color: "#231F20" }}>
                              Permissions <span className="text-danger">*</span>
                            </label>
                            <div className="form-group mt-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="addPermission"
                                  name="add"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "university"
                                    )?.add || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="addPermission"
                                >
                                  Add
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="viewPermission"
                                  name="view"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "university"
                                    )?.view || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="viewPermission"
                                >
                                  View
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="editPermission"
                                  name="edit"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "university"
                                    )?.edit || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="editPermission"
                                >
                                  Edit
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="deletePermission"
                                  name="delete"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "university"
                                    )?.delete || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="deletePermission"
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>

                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="clientCheckbox"
                          name="module"
                          onChange={handleCheckboxChange}
                          checked={
                            privileges.find((priv) => priv.module === "client")
                              ?.view ||
                            privileges.find((priv) => priv.module === "client")
                              ?.edit ||
                            privileges.find((priv) => priv.module === "client")
                              ?.delete ||
                            privileges.find((priv) => priv.module === "client")
                              ?.add ||
                            selectedModule === "client"
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="clientCheckbox"
                        >
                          Client
                        </label>
                        <Collapse in={!isTasksCollapsed.client}>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3">
                            <label style={{ color: "#231F20" }}>
                              Permissions <span className="text-danger">*</span>
                            </label>
                            <div className="form-group mt-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="addPermission"
                                  name="add"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "client"
                                    )?.add || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="addPermission"
                                >
                                  Add
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="viewPermission"
                                  name="view"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "client"
                                    )?.view || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="viewPermission"
                                >
                                  View
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="editPermission"
                                  name="edit"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "client"
                                    )?.edit || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="editPermission"
                                >
                                  Edit
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="deletePermission"
                                  name="delete"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "client"
                                    )?.delete || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="deletePermission"
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>

                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="programCheckbox"
                          name="module"
                          onChange={handleCheckboxChange}
                          checked={
                            privileges.find((priv) => priv.module === "program")
                              ?.view ||
                            privileges.find((priv) => priv.module === "program")
                              ?.edit ||
                            privileges.find((priv) => priv.module === "program")
                              ?.delete ||
                            privileges.find((priv) => priv.module === "program")
                              ?.add ||
                            selectedModule === "program"
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="programCheckbox"
                        >
                          Program
                        </label>
                        <Collapse in={!isTasksCollapsed.program}>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3">
                            <label style={{ color: "#231F20" }}>
                              Permissions <span className="text-danger">*</span>
                            </label>
                            <div className="form-group mt-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="addPermission"
                                  name="add"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "program"
                                    )?.add || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="addPermission"
                                >
                                  Add
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="viewPermission"
                                  name="view"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "program"
                                    )?.view || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="viewPermission"
                                >
                                  View
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="editPermission"
                                  name="edit"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "program"
                                    )?.edit || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="editPermission"
                                >
                                  Edit
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="deletePermission"
                                  name="delete"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "program"
                                    )?.delete || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="deletePermission"
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>

                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="commissionCheckbox"
                          name="module"
                          onChange={handleCheckboxChange}
                          checked={
                            privileges.find(
                              (priv) => priv.module === "commission"
                            )?.view ||
                            privileges.find(
                              (priv) => priv.module === "commission"
                            )?.edit ||
                            privileges.find(
                              (priv) => priv.module === "commission"
                            )?.delete ||
                            privileges.find(
                              (priv) => priv.module === "commission"
                            )?.add ||
                            selectedModule === "commission"
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="commissionCheckbox"
                        >
                          Commission
                        </label>
                        <Collapse in={!isTasksCollapsed.commission}>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3">
                            <label style={{ color: "#231F20" }}>
                              Permissions <span className="text-danger">*</span>
                            </label>
                            <div className="form-group mt-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="addPermission"
                                  name="add"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "commission"
                                    )?.add || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="addPermission"
                                >
                                  Add
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="viewPermission"
                                  name="view"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "commission"
                                    )?.view || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="viewPermission"
                                >
                                  View
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="editPermission"
                                  name="edit"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "commission"
                                    )?.edit || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="editPermission"
                                >
                                  Edit
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="deletePermission"
                                  name="delete"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "commission"
                                    )?.delete || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="deletePermission"
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>

                      <label style={{ color: "#231F20" }}>Select User</label>
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="studentCheckbox"
                          name="module"
                          onChange={handleCheckboxChange}
                          checked={
                            privileges.find((priv) => priv.module === "student")
                              ?.view ||
                            privileges.find((priv) => priv.module === "student")
                              ?.edit ||
                            privileges.find((priv) => priv.module === "student")
                              ?.delete ||
                            privileges.find((priv) => priv.module === "student")
                              ?.add ||
                            selectedModule === "student"
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="studentCheckbox"
                        >
                          Student
                        </label>
                        <Collapse in={!isTasksCollapsed.student}>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3">
                            <label style={{ color: "#231F20" }}>
                              Permissions <span className="text-danger">*</span>
                            </label>
                            <div className="form-group mt-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="addPermission"
                                  name="add"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "student"
                                    )?.add || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="addPermission"
                                >
                                  Add
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="viewPermission"
                                  name="view"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "student"
                                    )?.view || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="viewPermission"
                                >
                                  View
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="editPermission"
                                  name="edit"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "student"
                                    )?.edit || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="editPermission"
                                >
                                  Edit
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="deletePermission"
                                  name="delete"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "student"
                                    )?.delete || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="deletePermission"
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>

                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="staffCheckbox"
                          name="module"
                          onChange={handleCheckboxChange}
                          checked={
                            privileges.find((priv) => priv.module === "staff")
                              ?.view ||
                            privileges.find((priv) => priv.module === "staff")
                              ?.edit ||
                            privileges.find((priv) => priv.module === "staff")
                              ?.delete ||
                            privileges.find((priv) => priv.module === "staff")
                              ?.add ||
                            selectedModule === "staff"
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="staffCheckbox"
                        >
                          Staff
                        </label>
                        <Collapse in={!isTasksCollapsed.staff}>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3">
                            <label style={{ color: "#231F20" }}>
                              Permissions <span className="text-danger">*</span>
                            </label>
                            <div className="form-group mt-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="addPermission"
                                  name="add"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "staff"
                                    )?.add || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="addPermission"
                                >
                                  Add
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="viewPermission"
                                  name="view"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "staff"
                                    )?.view || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="viewPermission"
                                >
                                  View
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="editPermission"
                                  name="edit"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "staff"
                                    )?.edit || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="editPermission"
                                >
                                  Edit
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="deletePermission"
                                  name="delete"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "staff"
                                    )?.delete || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="deletePermission"
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>

                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="agentCheckbox"
                          name="module"
                          onChange={handleCheckboxChange}
                          checked={
                            privileges.find((priv) => priv.module === "agent")
                              ?.view ||
                            privileges.find((priv) => priv.module === "agent")
                              ?.edit ||
                            privileges.find((priv) => priv.module === "agent")
                              ?.delete ||
                            privileges.find((priv) => priv.module === "agent")
                              ?.add ||
                            selectedModule === "agent"
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="agentCheckbox"
                        >
                          Agent
                        </label>
                        <Collapse in={!isTasksCollapsed.agent}>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3">
                            <label style={{ color: "#231F20" }}>
                              Permissions <span className="text-danger">*</span>
                            </label>
                            <div className="form-group mt-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="addPermission"
                                  name="add"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "agent"
                                    )?.add || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="addPermission"
                                >
                                  Add
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="viewPermission"
                                  name="view"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "agent"
                                    )?.view || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="viewPermission"
                                >
                                  View
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="editPermission"
                                  name="edit"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "agent"
                                    )?.edit || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="editPermission"
                                >
                                  Edit
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="deletePermission"
                                  name="delete"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "agent"
                                    )?.delete || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="deletePermission"
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>

                      <label style={{ color: "#231F20" }}>
                        Application Process
                      </label>

                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="applicationCheckbox"
                          name="module"
                          onChange={handleCheckboxChange}
                          checked={
                            privileges.find(
                              (priv) => priv.module === "application"
                            )?.view ||
                            privileges.find(
                              (priv) => priv.module === "application"
                            )?.edit ||
                            privileges.find(
                              (priv) => priv.module === "application"
                            )?.delete ||
                            privileges.find(
                              (priv) => priv.module === "application"
                            )?.add ||
                            selectedModule === "application"
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="applicationCheckbox"
                        >
                          Application
                        </label>
                        <Collapse in={!isTasksCollapsed.application}>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3">
                            <label style={{ color: "#231F20" }}>
                              Permissions <span className="text-danger">*</span>
                            </label>
                            <div className="form-group mt-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="addPermission"
                                  name="add"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "application"
                                    )?.add || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="addPermission"
                                >
                                  Add
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="viewPermission"
                                  name="view"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "application"
                                    )?.view || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="viewPermission"
                                >
                                  View
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="editPermission"
                                  name="edit"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "application"
                                    )?.edit || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="editPermission"
                                >
                                  Edit
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="deletePermission"
                                  name="delete"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "application"
                                    )?.delete || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="deletePermission"
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>

                      <label style={{ color: "#231F20" }}>
                        Enquiry Process
                      </label>

                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="studentEnquiryCheckbox"
                          name="module"
                          onChange={handleCheckboxChange}
                          checked={
                            privileges.find(
                              (priv) => priv.module === "studentEnquiry"
                            )?.view ||
                            privileges.find(
                              (priv) => priv.module === "studentEnquiry"
                            )?.edit ||
                            privileges.find(
                              (priv) => priv.module === "studentEnquiry"
                            )?.delete ||
                            privileges.find(
                              (priv) => priv.module === "studentEnquiry"
                            )?.add ||
                            selectedModule === "studentEnquiry"
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="studentEnquiryCheckbox"
                        >
                          StudentEnquiry
                        </label>
                        <Collapse in={!isTasksCollapsed.studentEnquiry}>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3">
                            <label style={{ color: "#231F20" }}>
                              Permissions <span className="text-danger">*</span>
                            </label>
                            <div className="form-group mt-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="addPermission"
                                  name="add"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "studentEnquiry"
                                    )?.add || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="addPermission"
                                >
                                  Add
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="viewPermission"
                                  name="view"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "studentEnquiry"
                                    )?.view || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="viewPermission"
                                >
                                  View
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="editPermission"
                                  name="edit"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "studentEnquiry"
                                    )?.edit || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="editPermission"
                                >
                                  Edit
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="deletePermission"
                                  name="delete"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "studentEnquiry"
                                    )?.delete || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="deletePermission"
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>

                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="forexEnquiryCheckbox"
                          name="module"
                          onChange={handleCheckboxChange}
                          checked={
                            privileges.find(
                              (priv) => priv.module === "forexEnquiry"
                            )?.view ||
                            privileges.find(
                              (priv) => priv.module === "forexEnquiry"
                            )?.edit ||
                            privileges.find(
                              (priv) => priv.module === "forexEnquiry"
                            )?.delete ||
                            privileges.find(
                              (priv) => priv.module === "forexEnquiry"
                            )?.add ||
                            selectedModule === "forexEnquiry"
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="forexEnquiryCheckbox"
                        >
                          ForexEnquiry
                        </label>
                        <Collapse in={!isTasksCollapsed.forexEnquiry}>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3">
                            <label style={{ color: "#231F20" }}>
                              Permissions <span className="text-danger">*</span>
                            </label>
                            <div className="form-group mt-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="addPermission"
                                  name="add"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "forexEnquiry"
                                    )?.add || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="addPermission"
                                >
                                  Add
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="viewPermission"
                                  name="view"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "forexEnquiry"
                                    )?.view || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="viewPermission"
                                >
                                  View
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="editPermission"
                                  name="edit"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "forexEnquiry"
                                    )?.edit || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="editPermission"
                                >
                                  Edit
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="deletePermission"
                                  name="delete"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "forexEnquiry"
                                    )?.delete || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="deletePermission"
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>

                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="accommodationEnquiryCheckbox"
                          name="module"
                          onChange={handleCheckboxChange}
                          checked={
                            privileges.find(
                              (priv) => priv.module === "accommodationEnquiry"
                            )?.view ||
                            privileges.find(
                              (priv) => priv.module === "accommodationEnquiry"
                            )?.edit ||
                            privileges.find(
                              (priv) => priv.module === "accommodationEnquiry"
                            )?.delete ||
                            privileges.find(
                              (priv) => priv.module === "accommodationEnquiry"
                            )?.add ||
                            selectedModule === "accommodationEnquiry"
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="accommodationEnquiryCheckbox"
                        >
                          AccommodationEnquiry
                        </label>
                        <Collapse in={!isTasksCollapsed.accommodationEnquiry}>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3">
                            <label style={{ color: "#231F20" }}>
                              Permissions <span className="text-danger">*</span>
                            </label>
                            <div className="form-group mt-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="addPermission"
                                  name="add"
                                  checked={
                                    privileges.find(
                                      (priv) =>
                                        priv.module === "accommodationEnquiry"
                                    )?.add || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="addPermission"
                                >
                                  Add
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="viewPermission"
                                  name="view"
                                  checked={
                                    privileges.find(
                                      (priv) =>
                                        priv.module === "accommodationEnquiry"
                                    )?.view || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="viewPermission"
                                >
                                  View
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="editPermission"
                                  name="edit"
                                  checked={
                                    privileges.find(
                                      (priv) =>
                                        priv.module === "accommodationEnquiry"
                                    )?.edit || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="editPermission"
                                >
                                  Edit
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="deletePermission"
                                  name="delete"
                                  checked={
                                    privileges.find(
                                      (priv) =>
                                        priv.module === "accommodationEnquiry"
                                    )?.delete || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="deletePermission"
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>

                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flightEnquiryCheckbox"
                          name="module"
                          onChange={handleCheckboxChange}
                          checked={
                            privileges.find(
                              (priv) => priv.module === "flightEnquiry"
                            )?.view ||
                            privileges.find(
                              (priv) => priv.module === "flightEnquiry"
                            )?.edit ||
                            privileges.find(
                              (priv) => priv.module === "flightEnquiry"
                            )?.delete ||
                            privileges.find(
                              (priv) => priv.module === "flightEnquiry"
                            )?.add ||
                            selectedModule === "flightEnquiry"
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flightEnquiryCheckbox"
                        >
                          FlightEnquiry
                        </label>
                        <Collapse in={!isTasksCollapsed.flightEnquiry}>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3">
                            <label style={{ color: "#231F20" }}>
                              Permissions <span className="text-danger">*</span>
                            </label>
                            <div className="form-group mt-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="addPermission"
                                  name="add"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "flightEnquiry"
                                    )?.add || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="addPermission"
                                >
                                  Add
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="viewPermission"
                                  name="view"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "flightEnquiry"
                                    )?.view || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="viewPermission"
                                >
                                  View
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="editPermission"
                                  name="edit"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "flightEnquiry"
                                    )?.edit || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="editPermission"
                                >
                                  Edit
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="deletePermission"
                                  name="delete"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "flightEnquiry"
                                    )?.delete || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="deletePermission"
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>

                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="loanEnquiryCheckbox"
                          name="module"
                          onChange={handleCheckboxChange}
                          checked={
                            privileges.find(
                              (priv) => priv.module === "loanEnquiry"
                            )?.view ||
                            privileges.find(
                              (priv) => priv.module === "loanEnquiry"
                            )?.edit ||
                            privileges.find(
                              (priv) => priv.module === "loanEnquiry"
                            )?.delete ||
                            privileges.find(
                              (priv) => priv.module === "loanEnquiry"
                            )?.add ||
                            selectedModule === "loanEnquiry"
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="loanEnquiryCheckbox"
                        >
                          LoanEnquiry
                        </label>
                        <Collapse in={!isTasksCollapsed.loanEnquiry}>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3">
                            <label style={{ color: "#231F20" }}>
                              Permissions <span className="text-danger">*</span>
                            </label>
                            <div className="form-group mt-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="addPermission"
                                  name="add"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "loanEnquiry"
                                    )?.add || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="addPermission"
                                >
                                  Add
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="viewPermission"
                                  name="view"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "loanEnquiry"
                                    )?.view || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="viewPermission"
                                >
                                  View
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="editPermission"
                                  name="edit"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "loanEnquiry"
                                    )?.edit || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="editPermission"
                                >
                                  Edit
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="deletePermission"
                                  name="delete"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "loanEnquiry"
                                    )?.delete || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="deletePermission"
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>

                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="businessEnquiryCheckbox"
                          name="module"
                          onChange={handleCheckboxChange}
                          checked={
                            privileges.find(
                              (priv) => priv.module === "businessEnquiry"
                            )?.view ||
                            privileges.find(
                              (priv) => priv.module === "businessEnquiry"
                            )?.edit ||
                            privileges.find(
                              (priv) => priv.module === "businessEnquiry"
                            )?.delete ||
                            privileges.find(
                              (priv) => priv.module === "businessEnquiry"
                            )?.add ||
                            selectedModule === "businessEnquiry"
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="businessEnquiryCheckbox"
                        >
                          BusinessEnquiry
                        </label>
                        <Collapse in={!isTasksCollapsed.businessEnquiry}>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3">
                            <label style={{ color: "#231F20" }}>
                              Permissions <span className="text-danger">*</span>
                            </label>
                            <div className="form-group mt-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="addPermission"
                                  name="add"
                                  checked={
                                    privileges.find(
                                      (priv) =>
                                        priv.module === "businessEnquiry"
                                    )?.add || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="addPermission"
                                >
                                  Add
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="viewPermission"
                                  name="view"
                                  checked={
                                    privileges.find(
                                      (priv) =>
                                        priv.module === "businessEnquiry"
                                    )?.view || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="viewPermission"
                                >
                                  View
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="editPermission"
                                  name="edit"
                                  checked={
                                    privileges.find(
                                      (priv) =>
                                        priv.module === "businessEnquiry"
                                    )?.edit || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="editPermission"
                                >
                                  Edit
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="deletePermission"
                                  name="delete"
                                  checked={
                                    privileges.find(
                                      (priv) =>
                                        priv.module === "businessEnquiry"
                                    )?.delete || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="deletePermission"
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>

                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="generalEnquiryCheckbox"
                          name="module"
                          onChange={handleCheckboxChange}
                          checked={
                            privileges.find(
                              (priv) => priv.module === "generalEnquiry"
                            )?.view ||
                            privileges.find(
                              (priv) => priv.module === "generalEnquiry"
                            )?.edit ||
                            privileges.find(
                              (priv) => priv.module === "generalEnquiry"
                            )?.delete ||
                            privileges.find(
                              (priv) => priv.module === "generalEnquiry"
                            )?.add ||
                            selectedModule === "generalEnquiry"
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="generalEnquiryCheckbox"
                        >
                          GeneralEnquiry
                        </label>
                        <Collapse in={!isTasksCollapsed.generalEnquiry}>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3">
                            <label style={{ color: "#231F20" }}>
                              Permissions <span className="text-danger">*</span>
                            </label>
                            <div className="form-group mt-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="addPermission"
                                  name="add"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "generalEnquiry"
                                    )?.add || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="addPermission"
                                >
                                  Add
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="viewPermission"
                                  name="view"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "generalEnquiry"
                                    )?.view || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="viewPermission"
                                >
                                  View
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="editPermission"
                                  name="edit"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "generalEnquiry"
                                    )?.edit || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="editPermission"
                                >
                                  Edit
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="deletePermission"
                                  name="delete"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "generalEnquiry"
                                    )?.delete || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="deletePermission"
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>

                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="notification"
                          name="module"
                          onChange={handleCheckboxChange}
                          checked={
                            privileges.find(
                              (priv) => priv.module === "notification"
                            )?.view ||
                            privileges.find(
                              (priv) => priv.module === "notification"
                            )?.edit ||
                            privileges.find(
                              (priv) => priv.module === "notification"
                            )?.delete ||
                            privileges.find(
                              (priv) => priv.module === "notification"
                            )?.add ||
                            selectedModule === "notification"
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="notification"
                        >
                          Notifications
                        </label>
                        <Collapse in={!isTasksCollapsed.notification}>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3">
                            <label style={{ color: "#231F20" }}>
                              Permissions <span className="text-danger">*</span>
                            </label>
                            <div className="form-group mt-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="addPermission"
                                  name="add"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "notification"
                                    )?.add || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="addPermission"
                                >
                                  Add
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="viewPermission"
                                  name="view"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "notification"
                                    )?.view || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="viewPermission"
                                >
                                  View
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="editPermission"
                                  name="edit"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "notification"
                                    )?.edit || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="editPermission"
                                >
                                  Edit
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="deletePermission"
                                  name="delete"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "notification"
                                    )?.delete || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="deletePermission"
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>

                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="meetings"
                          name="module"
                          onChange={handleCheckboxChange}
                          checked={
                            privileges.find(
                              (priv) => priv.module === "meetings"
                            )?.view ||
                            privileges.find(
                              (priv) => priv.module === "meetings"
                            )?.edit ||
                            privileges.find(
                              (priv) => priv.module === "meetings"
                            )?.delete ||
                            privileges.find(
                              (priv) => priv.module === "meetings"
                            )?.add ||
                            selectedModule === "meetings"
                          }
                        />
                        <label className="form-check-label" htmlFor="meetings">
                          Meetings
                        </label>
                        <Collapse in={!isTasksCollapsed.meetings}>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3">
                            <label style={{ color: "#231F20" }}>
                              Permissions <span className="text-danger">*</span>
                            </label>
                            <div className="form-group mt-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="addPermission"
                                  name="add"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "meetings"
                                    )?.add || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="addPermission"
                                >
                                  Add
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="viewPermission"
                                  name="view"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "meetings"
                                    )?.view || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="viewPermission"
                                >
                                  View
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="editPermission"
                                  name="edit"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "meetings"
                                    )?.edit || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="editPermission"
                                >
                                  Edit
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="deletePermission"
                                  name="delete"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "meetings"
                                    )?.delete || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="deletePermission"
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>

                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="training"
                          name="module"
                          onChange={handleCheckboxChange}
                          checked={
                            privileges.find(
                              (priv) => priv.module === "training"
                            )?.view ||
                            privileges.find(
                              (priv) => priv.module === "training"
                            )?.edit ||
                            privileges.find(
                              (priv) => priv.module === "training"
                            )?.delete ||
                            privileges.find(
                              (priv) => priv.module === "training"
                            )?.add ||
                            selectedModule === "training"
                          }
                        />
                        <label className="form-check-label" htmlFor="training">
                          Training
                        </label>
                        <Collapse in={!isTasksCollapsed.training}>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3">
                            <label style={{ color: "#231F20" }}>
                              Permissions <span className="text-danger">*</span>
                            </label>
                            <div className="form-group mt-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="addPermission"
                                  name="add"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "training"
                                    )?.add || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="addPermission"
                                >
                                  Add
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="viewPermission"
                                  name="view"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "training"
                                    )?.view || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="viewPermission"
                                >
                                  View
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="editPermission"
                                  name="edit"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "training"
                                    )?.edit || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="editPermission"
                                >
                                  Edit
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="deletePermission"
                                  name="delete"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "training"
                                    )?.delete || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="deletePermission"
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>

                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="promotions"
                          name="module"
                          onChange={handleCheckboxChange}
                          checked={
                            privileges.find(
                              (priv) => priv.module === "promotions"
                            )?.view ||
                            privileges.find(
                              (priv) => priv.module === "promotions"
                            )?.edit ||
                            privileges.find(
                              (priv) => priv.module === "promotions"
                            )?.delete ||
                            privileges.find(
                              (priv) => priv.module === "promotions"
                            )?.add ||
                            selectedModule === "promotions"
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="promotions"
                        >
                          Promotions
                        </label>
                        <Collapse in={!isTasksCollapsed.promotions}>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3">
                            <label style={{ color: "#231F20" }}>
                              Permissions <span className="text-danger">*</span>
                            </label>
                            <div className="form-group mt-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="addPermission"
                                  name="add"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "promotions"
                                    )?.add || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="addPermission"
                                >
                                  Add
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="viewPermission"
                                  name="view"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "promotions"
                                    )?.view || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="viewPermission"
                                >
                                  View
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="editPermission"
                                  name="edit"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "promotions"
                                    )?.edit || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="editPermission"
                                >
                                  Edit
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="deletePermission"
                                  name="delete"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "promotions"
                                    )?.delete || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="deletePermission"
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>

                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="events"
                          name="module"
                          onChange={handleCheckboxChange}
                          checked={
                            privileges.find((priv) => priv.module === "events")
                              ?.view ||
                            privileges.find((priv) => priv.module === "events")
                              ?.edit ||
                            privileges.find((priv) => priv.module === "events")
                              ?.delete ||
                            privileges.find((priv) => priv.module === "events")
                              ?.add ||
                            selectedModule === "events"
                          }
                        />
                        <label className="form-check-label" htmlFor="events">
                          Events
                        </label>
                        <Collapse in={!isTasksCollapsed.events}>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3">
                            <label style={{ color: "#231F20" }}>
                              Permissions <span className="text-danger">*</span>
                            </label>
                            <div className="form-group mt-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="addPermission"
                                  name="add"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "events"
                                    )?.add || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="addPermission"
                                >
                                  Add
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="viewPermission"
                                  name="view"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "events"
                                    )?.view || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="viewPermission"
                                >
                                  View
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="editPermission"
                                  name="edit"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "events"
                                    )?.edit || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="editPermission"
                                >
                                  Edit
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="deletePermission"
                                  name="delete"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "events"
                                    )?.delete || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="deletePermission"
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>

                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="blogs"
                          name="module"
                          onChange={handleCheckboxChange}
                          checked={
                            privileges.find((priv) => priv.module === "blogs")
                              ?.view ||
                            privileges.find((priv) => priv.module === "blogs")
                              ?.edit ||
                            privileges.find((priv) => priv.module === "blogs")
                              ?.delete ||
                            privileges.find((priv) => priv.module === "blogs")
                              ?.add ||
                            selectedModule === "blogs"
                          }
                        />
                        <label className="form-check-label" htmlFor="blogs">
                          Blogs
                        </label>
                        <Collapse in={!isTasksCollapsed.blogs}>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3">
                            <label style={{ color: "#231F20" }}>
                              Permissions <span className="text-danger">*</span>
                            </label>
                            <div className="form-group mt-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="addPermission"
                                  name="add"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "blogs"
                                    )?.add || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="addPermission"
                                >
                                  Add
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="viewPermission"
                                  name="view"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "blogs"
                                    )?.view || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="viewPermission"
                                >
                                  View
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="editPermission"
                                  name="edit"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "blogs"
                                    )?.edit || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="editPermission"
                                >
                                  Edit
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="deletePermission"
                                  name="delete"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "blogs"
                                    )?.delete || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="deletePermission"
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>

                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="testimonials"
                          name="module"
                          onChange={handleCheckboxChange}
                          checked={
                            privileges.find(
                              (priv) => priv.module === "testimonials"
                            )?.view ||
                            privileges.find(
                              (priv) => priv.module === "testimonials"
                            )?.edit ||
                            privileges.find(
                              (priv) => priv.module === "testimonials"
                            )?.delete ||
                            privileges.find(
                              (priv) => priv.module === "testimonials"
                            )?.add ||
                            selectedModule === "testimonials"
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="testimonials"
                        >
                          Testimonials
                        </label>
                        <Collapse in={!isTasksCollapsed.testimonials}>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3">
                            <label style={{ color: "#231F20" }}>
                              Permissions <span className="text-danger">*</span>
                            </label>
                            <div className="form-group mt-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="addPermission"
                                  name="add"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "testimonials"
                                    )?.add || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="addPermission"
                                >
                                  Add
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="viewPermission"
                                  name="view"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "testimonials"
                                    )?.view || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="viewPermission"
                                >
                                  View
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="editPermission"
                                  name="edit"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "testimonials"
                                    )?.edit || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="editPermission"
                                >
                                  Edit
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="deletePermission"
                                  name="delete"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "testimonials"
                                    )?.delete || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="deletePermission"
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <label className="fw-bold">ELT</label>
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="bookings"
                          name="module"
                          onChange={handleCheckboxChange}
                          checked={
                            privileges.find(
                              (priv) => priv.module === "bookings"
                            )?.view ||
                            privileges.find(
                              (priv) => priv.module === "bookings"
                            )?.edit ||
                            privileges.find(
                              (priv) => priv.module === "bookings"
                            )?.delete ||
                            privileges.find(
                              (priv) => priv.module === "bookings"
                            )?.add ||
                            selectedModule === "bookings"
                          }
                        />
                        <label className="form-check-label" htmlFor="bookings">
                          Bookings
                        </label>
                        <Collapse in={!isTasksCollapsed.bookings}>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3">
                            <label style={{ color: "#231F20" }}>
                              Permissions <span className="text-danger">*</span>
                            </label>
                            <div className="form-group mt-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="addPermission"
                                  name="add"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "bookings"
                                    )?.add || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="addPermission"
                                >
                                  Add
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="viewPermission"
                                  name="view"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "bookings"
                                    )?.view || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="viewPermission"
                                >
                                  View
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="editPermission"
                                  name="edit"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "bookings"
                                    )?.edit || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="editPermission"
                                >
                                  Edit
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="deletePermission"
                                  name="delete"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "bookings"
                                    )?.delete || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="deletePermission"
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="classSchedule"
                          name="module"
                          onChange={handleCheckboxChange}
                          checked={
                            privileges.find(
                              (priv) => priv.module === "classSchedule"
                            )?.view ||
                            privileges.find(
                              (priv) => priv.module === "classSchedule"
                            )?.edit ||
                            privileges.find(
                              (priv) => priv.module === "classSchedule"
                            )?.delete ||
                            privileges.find(
                              (priv) => priv.module === "classSchedule"
                            )?.add ||
                            selectedModule === "classSchedule"
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="classSchedule"
                        >
                          Class Schedule
                        </label>
                        <Collapse in={!isTasksCollapsed.classSchedule}>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3">
                            <label style={{ color: "#231F20" }}>
                              Permissions <span className="text-danger">*</span>
                            </label>
                            <div className="form-group mt-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="addPermission"
                                  name="add"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "classSchedule"
                                    )?.add || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="addPermission"
                                >
                                  Add
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="viewPermission"
                                  name="view"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "classSchedule"
                                    )?.view || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="viewPermission"
                                >
                                  View
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="editPermission"
                                  name="edit"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "classSchedule"
                                    )?.edit || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="editPermission"
                                >
                                  Edit
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="deletePermission"
                                  name="delete"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "classSchedule"
                                    )?.delete || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="deletePermission"
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>

                      <label className="fw-bold">Projects and Tasks</label>
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="projects"
                          name="module"
                          onChange={handleCheckboxChange}
                          checked={
                            privileges.find(
                              (priv) => priv.module === "projects"
                            )?.view ||
                            privileges.find(
                              (priv) => priv.module === "projects"
                            )?.edit ||
                            privileges.find(
                              (priv) => priv.module === "projects"
                            )?.delete ||
                            privileges.find(
                              (priv) => priv.module === "projects"
                            )?.add ||
                            selectedModule === "projects"
                          }
                        />
                        <label className="form-check-label" htmlFor="projects">
                          Projects
                        </label>
                        <Collapse in={!isTasksCollapsed.projects}>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3">
                            <label style={{ color: "#231F20" }}>
                              Permissions <span className="text-danger">*</span>
                            </label>
                            <div className="form-group mt-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="addPermission"
                                  name="add"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "projects"
                                    )?.add || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="addPermission"
                                >
                                  Add
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="viewPermission"
                                  name="view"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "projects"
                                    )?.view || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="viewPermission"
                                >
                                  View
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="editPermission"
                                  name="edit"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "projects"
                                    )?.edit || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="editPermission"
                                >
                                  Edit
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="deletePermission"
                                  name="delete"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "projects"
                                    )?.delete || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="deletePermission"
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="tasks"
                          name="module"
                          onChange={handleCheckboxChange}
                          checked={
                            privileges.find((priv) => priv.module === "tasks")
                              ?.view ||
                            privileges.find((priv) => priv.module === "tasks")
                              ?.edit ||
                            privileges.find((priv) => priv.module === "tasks")
                              ?.delete ||
                            privileges.find((priv) => priv.module === "tasks")
                              ?.add ||
                            selectedModule === "tasks"
                          }
                        />
                        <label className="form-check-label" htmlFor="tasks">
                          Tasks
                        </label>
                        <Collapse in={!isTasksCollapsed.tasks}>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3">
                            <label style={{ color: "#231F20" }}>
                              Permissions <span className="text-danger">*</span>
                            </label>
                            <div className="form-group mt-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="addPermission"
                                  name="add"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "tasks"
                                    )?.add || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="addPermission"
                                >
                                  Add
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="viewPermission"
                                  name="view"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "tasks"
                                    )?.view || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="viewPermission"
                                >
                                  View
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="editPermission"
                                  name="edit"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "tasks"
                                    )?.edit || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="editPermission"
                                >
                                  Edit
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="deletePermission"
                                  name="delete"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "tasks"
                                    )?.delete || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="deletePermission"
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>

                      <label className="fw-bold">Finance</label>
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="income"
                          name="module"
                          onChange={handleCheckboxChange}
                          checked={
                            privileges.find((priv) => priv.module === "income")
                              ?.view ||
                            privileges.find((priv) => priv.module === "income")
                              ?.edit ||
                            privileges.find((priv) => priv.module === "income")
                              ?.delete ||
                            privileges.find((priv) => priv.module === "income")
                              ?.add ||
                            selectedModule === "income"
                          }
                        />
                        <label className="form-check-label" htmlFor="income">
                          Income
                        </label>
                        <Collapse in={!isTasksCollapsed.income}>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3">
                            <label style={{ color: "#231F20" }}>
                              Permissions <span className="text-danger">*</span>
                            </label>
                            <div className="form-group mt-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="addPermission"
                                  name="add"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "income"
                                    )?.add || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="addPermission"
                                >
                                  Add
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="viewPermission"
                                  name="view"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "income"
                                    )?.view || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="viewPermission"
                                >
                                  View
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="editPermission"
                                  name="edit"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "income"
                                    )?.edit || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="editPermission"
                                >
                                  Edit
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="deletePermission"
                                  name="delete"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "income"
                                    )?.delete || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="deletePermission"
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="expenses"
                          name="module"
                          onChange={handleCheckboxChange}
                          checked={
                            privileges.find(
                              (priv) => priv.module === "expenses"
                            )?.view ||
                            privileges.find(
                              (priv) => priv.module === "expenses"
                            )?.edit ||
                            privileges.find(
                              (priv) => priv.module === "expenses"
                            )?.delete ||
                            privileges.find(
                              (priv) => priv.module === "expenses"
                            )?.add ||
                            selectedModule === "expenses"
                          }
                        />
                        <label className="form-check-label" htmlFor="expenses">
                          Expenses
                        </label>
                        <Collapse in={!isTasksCollapsed.expenses}>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3">
                            <label style={{ color: "#231F20" }}>
                              Permissions <span className="text-danger">*</span>
                            </label>
                            <div className="form-group mt-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="addPermission"
                                  name="add"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "expenses"
                                    )?.add || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="addPermission"
                                >
                                  Add
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="viewPermission"
                                  name="view"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "expenses"
                                    )?.view || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="viewPermission"
                                >
                                  View
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="editPermission"
                                  name="edit"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "expenses"
                                    )?.edit || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="editPermission"
                                >
                                  Edit
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="deletePermission"
                                  name="delete"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "expenses"
                                    )?.delete || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="deletePermission"
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>

                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="raiseQuotations"
                          name="module"
                          onChange={handleCheckboxChange}
                          checked={
                            privileges.find(
                              (priv) => priv.module === "raiseQuotations"
                            )?.view ||
                            privileges.find(
                              (priv) => priv.module === "raiseQuotations"
                            )?.edit ||
                            privileges.find(
                              (priv) => priv.module === "raiseQuotations"
                            )?.delete ||
                            privileges.find(
                              (priv) => priv.module === "raiseQuotations"
                            )?.add ||
                            selectedModule === "raiseQuotations"
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="raiseQuotations"
                        >
                          Raise Quotations
                        </label>
                        <Collapse in={!isTasksCollapsed.raiseQuotations}>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3">
                            <label style={{ color: "#231F20" }}>
                              Permissions <span className="text-danger">*</span>
                            </label>
                            <div className="form-group mt-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="addPermission"
                                  name="add"
                                  checked={
                                    privileges.find(
                                      (priv) =>
                                        priv.module === "raiseQuotations"
                                    )?.add || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="addPermission"
                                >
                                  Add
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="viewPermission"
                                  name="view"
                                  checked={
                                    privileges.find(
                                      (priv) =>
                                        priv.module === "raiseQuotations"
                                    )?.view || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="viewPermission"
                                >
                                  View
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="editPermission"
                                  name="edit"
                                  checked={
                                    privileges.find(
                                      (priv) =>
                                        priv.module === "raiseQuotations"
                                    )?.edit || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="editPermission"
                                >
                                  Edit
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="deletePermission"
                                  name="delete"
                                  checked={
                                    privileges.find(
                                      (priv) =>
                                        priv.module === "raiseQuotations"
                                    )?.delete || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="deletePermission"
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>

                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="raiseInvoices"
                          name="module"
                          onChange={handleCheckboxChange}
                          checked={
                            privileges.find(
                              (priv) => priv.module === "raiseInvoices"
                            )?.view ||
                            privileges.find(
                              (priv) => priv.module === "raiseInvoices"
                            )?.edit ||
                            privileges.find(
                              (priv) => priv.module === "raiseInvoices"
                            )?.delete ||
                            privileges.find(
                              (priv) => priv.module === "raiseInvoices"
                            )?.add ||
                            selectedModule === "raiseInvoices"
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="raiseInvoices"
                        >
                          Raise Invoices
                        </label>
                        <Collapse in={!isTasksCollapsed.raiseInvoices}>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3">
                            <label style={{ color: "#231F20" }}>
                              Permissions <span className="text-danger">*</span>
                            </label>
                            <div className="form-group mt-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="addPermission"
                                  name="add"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "raiseInvoices"
                                    )?.add || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="addPermission"
                                >
                                  Add
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="viewPermission"
                                  name="view"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "raiseInvoices"
                                    )?.view || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="viewPermission"
                                >
                                  View
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="editPermission"
                                  name="edit"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "raiseInvoices"
                                    )?.edit || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="editPermission"
                                >
                                  Edit
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="deletePermission"
                                  name="delete"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "raiseInvoices"
                                    )?.delete || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="deletePermission"
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="incomeReport"
                          name="module"
                          onChange={handleCheckboxChange}
                          checked={
                            privileges.find(
                              (priv) => priv.module === "incomeReport"
                            )?.view ||
                            privileges.find(
                              (priv) => priv.module === "incomeReport"
                            )?.edit ||
                            privileges.find(
                              (priv) => priv.module === "incomeReport"
                            )?.delete ||
                            privileges.find(
                              (priv) => priv.module === "incomeReport"
                            )?.add ||
                            selectedModule === "incomeReport"
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="incomeReport"
                        >
                          Income Report
                        </label>
                        <Collapse in={!isTasksCollapsed.incomeReport}>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3">
                            <label style={{ color: "#231F20" }}>
                              Permissions <span className="text-danger">*</span>
                            </label>
                            <div className="form-group mt-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="addPermission"
                                  name="add"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "incomeReport"
                                    )?.add || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="addPermission"
                                >
                                  Add
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="viewPermission"
                                  name="view"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "incomeReport"
                                    )?.view || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="viewPermission"
                                >
                                  View
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="editPermission"
                                  name="edit"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "incomeReport"
                                    )?.edit || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="editPermission"
                                >
                                  Edit
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="deletePermission"
                                  name="delete"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "incomeReport"
                                    )?.delete || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="deletePermission"
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>

                      <label className="fw-bold">Marketing</label>
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="campaings"
                          name="module"
                          onChange={handleCheckboxChange}
                          checked={
                            privileges.find(
                              (priv) => priv.module === "campaings"
                            )?.view ||
                            privileges.find(
                              (priv) => priv.module === "campaings"
                            )?.edit ||
                            privileges.find(
                              (priv) => priv.module === "campaings"
                            )?.delete ||
                            privileges.find(
                              (priv) => priv.module === "campaings"
                            )?.add ||
                            selectedModule === "campaings"
                          }
                        />
                        <label className="form-check-label" htmlFor="campaings">
                          Campaings
                        </label>
                        <Collapse in={!isTasksCollapsed.campaings}>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3">
                            <label style={{ color: "#231F20" }}>
                              Permissions <span className="text-danger">*</span>
                            </label>
                            <div className="form-group mt-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="addPermission"
                                  name="add"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "campaings"
                                    )?.add || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="addPermission"
                                >
                                  Add
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="viewPermission"
                                  name="view"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "campaings"
                                    )?.view || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="viewPermission"
                                >
                                  View
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="editPermission"
                                  name="edit"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "campaings"
                                    )?.edit || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="editPermission"
                                >
                                  Edit
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="deletePermission"
                                  name="delete"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "campaings"
                                    )?.delete || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="deletePermission"
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>

                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="dailyTasks"
                          name="module"
                          onChange={handleCheckboxChange}
                          checked={
                            privileges.find(
                              (priv) => priv.module === "dailyTasks"
                            )?.view ||
                            privileges.find(
                              (priv) => priv.module === "dailyTasks"
                            )?.edit ||
                            privileges.find(
                              (priv) => priv.module === "dailyTasks"
                            )?.delete ||
                            privileges.find(
                              (priv) => priv.module === "dailyTasks"
                            )?.add ||
                            selectedModule === "dailyTasks"
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="dailyTasks"
                        >
                          Daily Tasks
                        </label>
                        <Collapse in={!isTasksCollapsed.dailyTasks}>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3">
                            <label style={{ color: "#231F20" }}>
                              Permissions <span className="text-danger">*</span>
                            </label>
                            <div className="form-group mt-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="addPermission"
                                  name="add"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "dailyTasks"
                                    )?.add || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="addPermission"
                                >
                                  Add
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="viewPermission"
                                  name="view"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "dailyTasks"
                                    )?.view || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="viewPermission"
                                >
                                  View
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="editPermission"
                                  name="edit"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "dailyTasks"
                                    )?.edit || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="editPermission"
                                >
                                  Edit
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="deletePermission"
                                  name="delete"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "dailyTasks"
                                    )?.delete || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="deletePermission"
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>

                      <label className="fw-bold">Social Media</label>
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="facebook"
                          name="module"
                          onChange={handleCheckboxChange}
                          checked={
                            privileges.find(
                              (priv) => priv.module === "facebook"
                            )?.view ||
                            privileges.find(
                              (priv) => priv.module === "facebook"
                            )?.edit ||
                            privileges.find(
                              (priv) => priv.module === "facebook"
                            )?.delete ||
                            privileges.find(
                              (priv) => priv.module === "facebook"
                            )?.add ||
                            selectedModule === "facebook"
                          }
                        />
                        <label className="form-check-label" htmlFor="facebook">
                          Facebook
                        </label>
                        <Collapse in={!isTasksCollapsed.facebook}>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3">
                            <label style={{ color: "#231F20" }}>
                              Permissions <span className="text-danger">*</span>
                            </label>
                            <div className="form-group mt-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="addPermission"
                                  name="add"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "facebook"
                                    )?.add || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="addPermission"
                                >
                                  Add
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="viewPermission"
                                  name="view"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "facebook"
                                    )?.view || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="viewPermission"
                                >
                                  View
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="editPermission"
                                  name="edit"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "facebook"
                                    )?.edit || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="editPermission"
                                >
                                  Edit
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="deletePermission"
                                  name="delete"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "facebook"
                                    )?.delete || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="deletePermission"
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>

                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="instagram"
                          name="module"
                          onChange={handleCheckboxChange}
                          checked={
                            privileges.find(
                              (priv) => priv.module === "instagram"
                            )?.view ||
                            privileges.find(
                              (priv) => priv.module === "instagram"
                            )?.edit ||
                            privileges.find(
                              (priv) => priv.module === "instagram"
                            )?.delete ||
                            privileges.find(
                              (priv) => priv.module === "instagram"
                            )?.add ||
                            selectedModule === "instagram"
                          }
                        />
                        <label className="form-check-label" htmlFor="instagram">
                          Instagram
                        </label>
                        <Collapse in={!isTasksCollapsed.instagram}>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3">
                            <label style={{ color: "#231F20" }}>
                              Permissions <span className="text-danger">*</span>
                            </label>
                            <div className="form-group mt-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="addPermission"
                                  name="add"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "instagram"
                                    )?.add || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="addPermission"
                                >
                                  Add
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="viewPermission"
                                  name="view"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "instagram"
                                    )?.view || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="viewPermission"
                                >
                                  View
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="editPermission"
                                  name="edit"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "instagram"
                                    )?.edit || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="editPermission"
                                >
                                  Edit
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="deletePermission"
                                  name="delete"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "instagram"
                                    )?.delete || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="deletePermission"
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>

                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="linkedIn"
                          name="module"
                          onChange={handleCheckboxChange}
                          checked={
                            privileges.find(
                              (priv) => priv.module === "linkedIn"
                            )?.view ||
                            privileges.find(
                              (priv) => priv.module === "linkedIn"
                            )?.edit ||
                            privileges.find(
                              (priv) => priv.module === "linkedIn"
                            )?.delete ||
                            privileges.find(
                              (priv) => priv.module === "linkedIn"
                            )?.add ||
                            selectedModule === "linkedIn"
                          }
                        />
                        <label className="form-check-label" htmlFor="linkedIn">
                          LinkedIn
                        </label>
                        <Collapse in={!isTasksCollapsed.linkedIn}>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3">
                            <label style={{ color: "#231F20" }}>
                              Permissions <span className="text-danger">*</span>
                            </label>
                            <div className="form-group mt-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="addPermission"
                                  name="add"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "linkedIn"
                                    )?.add || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="addPermission"
                                >
                                  Add
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="viewPermission"
                                  name="view"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "linkedIn"
                                    )?.view || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="viewPermission"
                                >
                                  View
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="editPermission"
                                  name="edit"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "linkedIn"
                                    )?.edit || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="editPermission"
                                >
                                  Edit
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="deletePermission"
                                  name="delete"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "linkedIn"
                                    )?.delete || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="deletePermission"
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>

                      <label className="fw-bold">Reports</label>
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="employee"
                          name="module"
                          onChange={handleCheckboxChange}
                          checked={
                            privileges.find(
                              (priv) => priv.module === "employee"
                            )?.view ||
                            privileges.find(
                              (priv) => priv.module === "employee"
                            )?.edit ||
                            privileges.find(
                              (priv) => priv.module === "employee"
                            )?.delete ||
                            privileges.find(
                              (priv) => priv.module === "employee"
                            )?.add ||
                            selectedModule === "employee"
                          }
                        />
                        <label className="form-check-label" htmlFor="employee">
                          Employee
                        </label>
                        <Collapse in={!isTasksCollapsed.employee}>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3">
                            <label style={{ color: "#231F20" }}>
                              Permissions <span className="text-danger">*</span>
                            </label>
                            <div className="form-group mt-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="addPermission"
                                  name="add"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "employee"
                                    )?.add || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="addPermission"
                                >
                                  Add
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="viewPermission"
                                  name="view"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "employee"
                                    )?.view || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="viewPermission"
                                >
                                  View
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="editPermission"
                                  name="edit"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "employee"
                                    )?.edit || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="editPermission"
                                >
                                  Edit
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="deletePermission"
                                  name="delete"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "employee"
                                    )?.delete || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="deletePermission"
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>

                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="agentReport"
                          name="module"
                          onChange={handleCheckboxChange}
                          checked={
                            privileges.find(
                              (priv) => priv.module === "agentReport"
                            )?.view ||
                            privileges.find(
                              (priv) => priv.module === "agentReport"
                            )?.edit ||
                            privileges.find(
                              (priv) => priv.module === "agentReport"
                            )?.delete ||
                            privileges.find(
                              (priv) => priv.module === "agentReport"
                            )?.add ||
                            selectedModule === "agentReport"
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="agentReport"
                        >
                          Agents
                        </label>
                        <Collapse in={!isTasksCollapsed.agentReport}>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3">
                            <label style={{ color: "#231F20" }}>
                              Permissions <span className="text-danger">*</span>
                            </label>
                            <div className="form-group mt-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="addPermission"
                                  name="add"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "agentReport"
                                    )?.add || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="addPermission"
                                >
                                  Add
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="viewPermission"
                                  name="view"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "agentReport"
                                    )?.view || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="viewPermission"
                                >
                                  View
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="editPermission"
                                  name="edit"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "agentReport"
                                    )?.edit || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="editPermission"
                                >
                                  Edit
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="deletePermission"
                                  name="delete"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "agentReport"
                                    )?.delete || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="deletePermission"
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>

                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="studentReport"
                          name="module"
                          onChange={handleCheckboxChange}
                          checked={
                            privileges.find(
                              (priv) => priv.module === "studentReport"
                            )?.view ||
                            privileges.find(
                              (priv) => priv.module === "studentReport"
                            )?.edit ||
                            privileges.find(
                              (priv) => priv.module === "studentReport"
                            )?.delete ||
                            privileges.find(
                              (priv) => priv.module === "studentReport"
                            )?.add ||
                            selectedModule === "studentReport"
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="studentReport"
                        >
                          Student
                        </label>
                        <Collapse in={!isTasksCollapsed.studentReport}>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3">
                            <label style={{ color: "#231F20" }}>
                              Permissions <span className="text-danger">*</span>
                            </label>
                            <div className="form-group mt-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="addPermission"
                                  name="add"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "studentReport"
                                    )?.add || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="addPermission"
                                >
                                  Add
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="viewPermission"
                                  name="view"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "studentReport"
                                    )?.view || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="viewPermission"
                                >
                                  View
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="editPermission"
                                  name="edit"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "studentReport"
                                    )?.edit || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="editPermission"
                                >
                                  Edit
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="deletePermission"
                                  name="delete"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "studentReport"
                                    )?.delete || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="deletePermission"
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>

                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="branchReport"
                          name="module"
                          onChange={handleCheckboxChange}
                          checked={
                            privileges.find(
                              (priv) => priv.module === "branchReport"
                            )?.view ||
                            privileges.find(
                              (priv) => priv.module === "branchReport"
                            )?.edit ||
                            privileges.find(
                              (priv) => priv.module === "branchReport"
                            )?.delete ||
                            privileges.find(
                              (priv) => priv.module === "branchReport"
                            )?.add ||
                            selectedModule === "branchReport"
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="branchReport"
                        >
                          Branch
                        </label>
                        <Collapse in={!isTasksCollapsed.branchReport}>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3">
                            <label style={{ color: "#231F20" }}>
                              Permissions <span className="text-danger">*</span>
                            </label>
                            <div className="form-group mt-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="addPermission"
                                  name="add"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "branchReport"
                                    )?.add || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="addPermission"
                                >
                                  Add
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="viewPermission"
                                  name="view"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "branchReport"
                                    )?.view || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="viewPermission"
                                >
                                  View
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="editPermission"
                                  name="edit"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "branchReport"
                                    )?.edit || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="editPermission"
                                >
                                  Edit
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="deletePermission"
                                  name="delete"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "branchReport"
                                    )?.delete || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="deletePermission"
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>

                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="adminReport"
                          name="module"
                          onChange={handleCheckboxChange}
                          checked={
                            privileges.find(
                              (priv) => priv.module === "adminReport"
                            )?.view ||
                            privileges.find(
                              (priv) => priv.module === "adminReport"
                            )?.edit ||
                            privileges.find(
                              (priv) => priv.module === "adminReport"
                            )?.delete ||
                            privileges.find(
                              (priv) => priv.module === "adminReport"
                            )?.add ||
                            selectedModule === "adminReport"
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="adminReport"
                        >
                          Admin
                        </label>
                        <Collapse in={!isTasksCollapsed.adminReport}>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3">
                            <label style={{ color: "#231F20" }}>
                              Permissions <span className="text-danger">*</span>
                            </label>
                            <div className="form-group mt-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="addPermission"
                                  name="add"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "adminReport"
                                    )?.add || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="addPermission"
                                >
                                  Add
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="viewPermission"
                                  name="view"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "adminReport"
                                    )?.view || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="viewPermission"
                                >
                                  View
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="editPermission"
                                  name="edit"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "adminReport"
                                    )?.edit || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="editPermission"
                                >
                                  Edit
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="deletePermission"
                                  name="delete"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "adminReport"
                                    )?.delete || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="deletePermission"
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>

                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="chats"
                          name="module"
                          onChange={handleCheckboxChange}
                          checked={
                            privileges.find((priv) => priv.module === "chats")
                              ?.view || selectedModule === "chats"
                          }
                        />
                        <label className="form-check-label" htmlFor="chats">
                          Chats
                        </label>
                        <Collapse in={!isTasksCollapsed.adminReport}>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3">
                            <label style={{ color: "#231F20" }}>
                              Permissions <span className="text-danger">*</span>
                            </label>
                            <div className="form-group mt-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="viewPermission"
                                  name="view"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "chats"
                                    )?.view || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="viewPermission"
                                >
                                  View
                                </label>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="email"
                          name="module"
                          onChange={handleCheckboxChange}
                          checked={
                            privileges.find((priv) => priv.module === "email")
                              ?.view || selectedModule === "email"
                          }
                        />
                        <label className="form-check-label" htmlFor="email">
                          E-Mail
                        </label>
                        <Collapse in={!isTasksCollapsed.email}>
                          <div className="col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3">
                            <label style={{ color: "#231F20" }}>
                              Permissions <span className="text-danger">*</span>
                            </label>
                            <div className="form-group mt-2">
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="viewPermission"
                                  name="view"
                                  checked={
                                    privileges.find(
                                      (priv) => priv.module === "email"
                                    )?.view || false
                                  }
                                  onChange={handlePermissionChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="viewPermission"
                                >
                                  View
                                </label>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={modal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
