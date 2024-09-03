import Mastersidebar from '../../compoents/sidebar';
import { FaFilter } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, IconButton, Pagination, duration } from "@mui/material";
import { saveStatus, getFilterStatus, getallStatus, deleteStatus, getSingleStatus, updateStatus } from '../../api/status';
import { toast } from 'react-toastify';
import React, { useEffect, useState, useRef } from "react";
import { ExportCsvService } from "../../Utils/Excel";
import { templatePdf } from "../../Utils/PdfMake";
import Select from "react-select";
import { getallStaff } from "../../api/staff";
import { getallAdmin } from "../../api/admin";
import { getallAgent } from "../../api/agent";
import { getallStudent } from "../../api/student";
import axios from 'axios';

export default function GlobalSettings() {
  const initialStateInputs = {
    typeOfUser: "",
    userName: "",
  };

  const initialStateErrors = {
    typeOfUser: {
      required: false,
    },
    userName: {
      required: false,
    },
  };

  const [open, setOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [privileges, setPrivileges] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const [inputs, setInputs] = useState(initialStateInputs);
  const [university, setUniversity] = useState([]);
  const [staff, setStaff] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [agent, setAgent] = useState([]);
  const [student, setStudent] = useState([]);
  const [errors, setErrors] = useState(initialStateErrors);
  const [filter, setFilter] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const pageSize = 5;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });
  const [moduleList, setModuleList] = useState([]);
  const modalRef = useRef(null);

  const handleValidation = (data) => {
    let error = { ...initialStateErrors };

    if (!data.typeOfUser) {
      error.typeOfUser.required = true;
    }

    if (!data.userName) {
      error.userName.required = true;
    }

    return error;
  };

  const handlePrivilegeChange = (module, permissionType) => {
    setPrivileges((prev) =>
      prev.map((p) =>
        p.module === module
          ? {
              ...p,
              permissions: {
                ...p.permissions,
                [permissionType]: !p.permissions[permissionType],
              },
            }
          : p
      )
    );
  };

  const savePrivileges = () => {
    axios
      .post('/api/users/assign-privileges', { userId: selectedUser, privileges })
      .then((response) => toast.success('Privileges assigned successfully'))
      .catch((error) => toast.error('Error assigning privileges', error));
  };

  useEffect(() => {
    getStaffList();
    getAdminList();
    getAgentList();
    getStudentList();
  }, []);

  const getStaffList = () => {
    getallStaff()
      .then((res) => {
        setStaff(res?.data?.result || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAdminList = () => {
    getallAdmin()
      .then((res) => {
        setAdmin(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAgentList = () => {
    getallAgent()
      .then((res) => {
        setAgent(res?.data?.result || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStudentList = () => {
    getallStudent()
      .then((res) => {
        setStudent(res?.data?.result || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllModuleDetails();
    getModuleDetails();
  }, [pagination.from, pagination.to]);

  const getModuleDetails = () => {
    const data = {
      courseType: inputs.courseType,
    };
    getSingleStatus(data)
      .then((res) => {
        const result = res?.data?.result;
        setInputs(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllModuleDetails = () => {
    const data = {
      limit: pageSize,
      page: pagination.from,
    };
    getFilterStatus(data)
      .then((res) => {
        setModuleList(res?.data?.result?.statusList || []);
        setPagination({
          ...pagination,
          count: res?.data?.result?.statusCount || 0,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePageChange = (event, page) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({ ...pagination, from, to });
  };

  const deleteModuleData = () => {
    deleteStatus(deleteId)
      .then((res) => {
        toast.success(res?.data?.message);
        closePopup();
        getAllModuleDetails();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closePopup = () => {
    setOpen(false);
  };

  const handleSelectChange = (selectedOptions, action) => {
    const { name } = action;
    const values = selectedOptions ? selectedOptions.map((option) => option.value) : [];
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: values,
    }));
  };

  const handleErrors = (obj) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const prop = obj[key];
        if (prop.required === true || prop.valid === true) {
          return false;
        }
      }
    }
    return true;
  };

  const handleInputs = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const resetFilter = () => {
    setFilter(false);
    setInputs(initialStateInputs);
    getAllModuleDetails();
  };

  const openFilterPopup = () => {
    setOpenFilter(true);
  };

  const closeFilterPopup = () => {
    setOpenFilter(false);
  };

  const openPopup = (data) => {
    setOpen(true);
    setDeleteId(data);
  };

  const handleAddModule = () => {
    setInputs(initialStateInputs);
    setIsEditing(false);
    setSubmitted(false);
    setErrors(initialStateErrors);
  };

  const handleEditModule = (data) => {
    setInputs(data);
    setIsEditing(true);
    setEditId(data._id);
    setSubmitted(false);
    setErrors(initialStateErrors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(inputs);
    setErrors(newError);
    setSubmitted(true);

    const allInputsValid = Object.values(newError).every((x) => !x.required);
    if (allInputsValid) {
      const data = {
        ...inputs,
        _id: editId,
      };

      if (isEditing) {
        updateStatus(data)
          .then((res) => {
            toast.success(res?.data?.message);
            event.target.reset();
            setInputs(initialStateInputs);
            setErrors(initialStateErrors);
            setSubmitted(false);
            getAllModuleDetails();
            closePopup();
          })
          .catch((err) => {
            toast.error(err?.response?.data?.message);
          });
      } else {
        saveStatus(inputs)
          .then((res) => {
            toast.success(res?.data?.message);
            event.target.reset();
            setInputs(initialStateInputs);
            setErrors(initialStateErrors);
            setSubmitted(false);
            getAllModuleDetails();
            closePopup();
          })
          .catch((err) => {
            toast.error(err?.response?.data?.message);
          });
      }
    }
  };

  const adminOptions = admin.map((data) => ({
    value: data.name,
    label: data.name,
  }));

  const staffOptions = staff.map((data) => ({
    value: data.empName,
    label: data.empName,
  }));

  const studentOptions = student.map((data) => ({
    value: data.name,
    label: data.name,
  }));

  const agentOptions = agent.map((data) => ({
    value: data.agentName,
    label: data.agentName,
  }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "1px solid #d1d3e2",
      borderRadius: ".35rem",
      height: "calc(1.5em + 0.75rem + 2px)",
    }),
  };

  return (
    <div className="custom-container">
      <Mastersidebar />
      <div className="content-wrapper">
        <div className="row">
          <div className="col-md-12 d-flex justify-content-between">
            <h2>Global Settings</h2>
            <div>
              <Link to="#" onClick={resetFilter} className="btn btn-secondary mr-2">
                Reset Filter
              </Link>
              <Link to="#" onClick={openFilterPopup} className="btn btn-secondary">
                <FaFilter />
              </Link>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-12">
            <div className="card shadow mb-4">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Type of User</th>
                        <th>Name of User</th>
                        <th>View</th>
                        <th>Add</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {moduleList.map((data, i) => (
                        <tr key={i}>
                          <td>{data.typeOfUser}</td>
                          <td>{data.userName}</td>
                          <td>
                            <input
                              type="checkbox"
                              checked={data.view}
                              onChange={() => handlePrivilegeChange(data.module, "view")}
                            />
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              checked={data.add}
                              onChange={() => handlePrivilegeChange(data.module, "add")}
                            />
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              checked={data.edit}
                              onChange={() => handlePrivilegeChange(data.module, "edit")}
                            />
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              checked={data.delete}
                              onChange={() => handlePrivilegeChange(data.module, "delete")}
                            />
                          </td>
                          <td>
                            <Link to="#" onClick={() => handleEditModule(data)}>
                              Edit
                            </Link>
                            <Link to="#" onClick={() => openPopup(data._id)}>
                              Delete
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <Pagination
                  count={Math.ceil(pagination.count / pageSize)}
                  page={Math.ceil(pagination.from / pageSize) + 1}
                  onChange={handlePageChange}
                  color="primary"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Add/Edit Module Popup */}
        <Dialog open={open} onClose={closePopup}>
          <DialogTitle>{isEditing ? "Edit Privileges" : "Add Privileges"}</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Type of User</label>
                <select
                  className="form-control"
                  name="typeOfUser"
                  value={inputs.typeOfUser}
                  onChange={handleInputs}
                >
                  <option value="">Select User Type</option>
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                  <option value="agent">Agent</option>
                  <option value="student">Student</option>
                </select>
                {submitted && errors.typeOfUser.required && (
                  <small className="text-danger">This field is required</small>
                )}
              </div>

              <div className="form-group">
                <label>Name of User</label>
                <Select
                  name="userName"
                  options={
                    inputs.typeOfUser === "admin"
                      ? adminOptions
                      : inputs.typeOfUser === "staff"
                      ? staffOptions
                      : inputs.typeOfUser === "student"
                      ? studentOptions
                      : inputs.typeOfUser === "agent"
                      ? agentOptions
                      : []
                  }
                  onChange={(selectedOption) =>
                    setInputs({ ...inputs, userName: selectedOption.value })
                  }
                  styles={customStyles}
                />
                {submitted && errors.userName.required && (
                  <small className="text-danger">This field is required</small>
                )}
              </div>

              <div className="form-group">
                <label>Privileges</label>
                <div>
                  {privileges.map((privilege, i) => (
                    <div key={i}>
                      <h5>{privilege.module}</h5>
                      <label>
                        <input
                          type="checkbox"
                          checked={privilege.permissions.view}
                          onChange={() => handlePrivilegeChange(privilege.module, "view")}
                        />
                        View
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={privilege.permissions.add}
                          onChange={() => handlePrivilegeChange(privilege.module, "add")}
                        />
                        Add
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={privilege.permissions.edit}
                          onChange={() => handlePrivilegeChange(privilege.module, "edit")}
                        />
                        Edit
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={privilege.permissions.delete}
                          onChange={() => handlePrivilegeChange(privilege.module, "delete")}
                        />
                        Delete
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  {isEditing ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Filter Popup */}
        <Dialog open={openFilter} onClose={closeFilterPopup}>
          <DialogTitle>Filter</DialogTitle>
          <DialogContent>
            <div className="form-group">
              <label>Type of User</label>
              <select
                className="form-control"
                name="typeOfUser"
                value={inputs.typeOfUser}
                onChange={handleInputs}
              >
                <option value="">Select User Type</option>
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
                <option value="agent">Agent</option>
                <option value="student">Student</option>
              </select>
            </div>

            <div className="form-group">
              <label>Name of User</label>
              <Select
                name="userName"
                options={
                  inputs.typeOfUser === "admin"
                    ? adminOptions
                    : inputs.typeOfUser === "staff"
                    ? staffOptions
                    : inputs.typeOfUser === "student"
                    ? studentOptions
                    : inputs.typeOfUser === "agent"
                    ? agentOptions
                    : []
                }
                onChange={(selectedOption) =>
                  setInputs({ ...inputs, userName: selectedOption.value })
                }
                styles={customStyles}
              />
            </div>

            <div className="form-group">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  closeFilterPopup();
                  getAllModuleDetails();
                }}
              >
                Apply Filter
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
