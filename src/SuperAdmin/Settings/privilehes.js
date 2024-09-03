import Mastersidebar from '../../compoents/sidebar';
import { FaFilter } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, IconButton, Pagination, duration } from "@mui/material";
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
    typeOfUser:{
      required: false},
    userName:{
      required: false},
    
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
  const [isEditing, setIsEditing] = useState(false); // Track if editing
  const [editId, setEditId] = useState(null); // Track the id of the item being edited
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

    
    return error;
  };


  const handlePrivilegeChange = (module, permissionType) => {
    setPrivileges(prev => prev.map(p => 
        p.module === module ? { ...p, permissions: { ...p.permissions, [permissionType]: !p.permissions[permissionType] } } : p
    ));
};

const savePrivileges = () => {
    axios.post('/api/users/assign-privileges', { userId: selectedUser, privileges })
        .then(response => alert('Privileges assigned successfully'))
        .catch(error => console.error('Error assigning privileges', error));
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





  const handlePageChange = (event, page) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({ ...pagination, from: from, to: to });
  };

 
  const closePopup = () => {
    setOpen(false);
  };

  const handleSelectChange = (selectedOptions, action) => {
    const { name } = action;
    const values = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setInputs((previnputs) => ({
      ...previnputs,
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

 

  const openPopup = (data) => {
    setOpen(true);
    setDeleteId(data);
  };
  const handleAddModule = () => {
    setInputs( initialStateInputs)
    setIsEditing(false);
    setSubmitted(false)
    setErrors(initialStateErrors)

}
  const handleEditModule = (data) => {
    setInputs(data); // Set the form inputs to the data of the item being edited
    setIsEditing(true); // Set editing mode to true
    setEditId(data._id); // Set the ID of the item being edited
    setSubmitted(false); // Reset submitted state
    setErrors(initialStateErrors); // Reset errors
  };

 

  const adminOptions = admin.map((data, index) => ({
    value: data.name,
    label: data.name,
  }));

  const staffOptions = staff.map((data, index) => ({
    value: data.empName,
    label: data.empName,
  }));

  const studentOptions = student.map((data, index) => ({
    value: data.name,
    label: data.name,
  }));

  const agentOptions = agent.map((data, index) => ({
    value: data.agentName,
    label: data.agentName,
  }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "1.4783px solid rgba(11, 70, 84, 0.25)",
      borderRadius: "4.91319px",
      fontSize: "11px",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "#3B0051" : "#F2CCFF",
      ":hover": {
        color: "black",
      },
    }),
  };



  return (
    <div>
    
          
            <Mastersidebar />
        
          <div className="content-wrapper " style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px"  }}>
          <div className="content-header bg-light shadow-sm sticky-top ">
                    <ol className="breadcrumb d-flex justify-content-end align-items-center w-100">
                      <li className="flex-grow-1">
                        <div className="input-group" style={{ maxWidth: "600px", fontSize: "14px" }}>
                          <input
                            type="search"
                            placeholder="Search"
                            aria-describedby="button-addon3"
                            className="form-control-lg bg-white border-2 ps-1 rounded-4 w-100"
                            style={{
                              borderColor: "#FE5722",
                              paddingRight: "1.5rem",
                              marginLeft: "0px",
                              fontSize: "12px",
                              height: "11px",
                              padding: "0px"
                            }}
                          />
                          <span
                            className="input-group-text bg-transparent border-0"
                            id="button-addon3"
                            style={{
                              position: "absolute",
                              right: "10px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              cursor: "pointer"
                            }}
                          >
                            <i className="fas fa-search" style={{ color: "black" }}></i>
                          </span>
                        </div>
                      </li>
                      
                     
                      <li className="breadcrumb-item">
                        <button
                          className="btn  text-white px-4 py-2 text-uppercase fw-semibold  text-center"
                          style={{
                            backgroundColor: "#fe5722",
                            border: "none",
                         
                            fontSize: "12px",
                            margin: "1px"
                          }}
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModalPrivilege"
                          onClick={() => { handleAddModule () }}
                        >
                    <i class="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;   Add Privileges
                        </button>
                      </li>
                    </ol>
                  </div>
              <div className="container-fluid mt-4">
           
              <div className="row ">
              <div className="col-md-4">

              
              </div>
            <div className="col-md-12">
            <div className="card  border-0 rounded-1 shadow-sm p-3 position-relative">
            <div className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0" style={{background:'#fe5722',color:'#fff'}}>
            <h6 className='text-center text-capitalize p-1'>List Pepole</h6>
            </div>
            <div className="card-body mt-5">
                  <table className="table table-hover text-nowrap">
                    <thead>
                      <tr style={{ backgroundColor: '#fff', fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}>
                        <th className="text-capitalize text-start" >S.No</th>
                        <th className="text-capitalize text-start" >Role</th>
                        <th className="text-capitalize text-start" >Name</th>
                        <th className="text-capitalize text-start" style={{ width: "40px" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {moduleList.length > 0 ? (
                        moduleList.map((data, index) => (
                          <tr key={index} style={{ backgroundColor: '#fff', fontFamily: "Plus Jakarta Sans", fontSize: "11px" }}>
                            <td className="text-capitalize text-start">{pagination.from + index + 1}</td>
                            <td className="text-capitalize text-start">{data.statusName}</td>
                            <td className="text-capitalize text-start">{data.duration}</td>
                            <td className="text-capitalize text-start">
                            <button
                                className="btn btn-primary btn-sm "
                                data-bs-toggle="modal"
                                data-bs-target="#addCountryModal11"
                                onClick={() => handleEditModule(data)}
                                style={{ fontFamily: "Plus Jakarta Sans", fontSize: "10px" }}
                              >
                                <i class="fa fa-edit" aria-hidden="true"></i>
                              </button>
                              
                              <button
                                className="btn btn-danger ml-3 btn-sm"
                                onClick={() => openPopup(data._id)}
                                style={{ fontFamily: "Plus Jakarta Sans", fontSize: "10px" }}
                              >
                                 <i class="fa fa-trash" aria-hidden="true"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center">
                            No Data To Status Found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  <div className="float-right my-2">
                    <Pagination
                      count={Math.ceil(pagination.count / pageSize)}
                      onChange={handlePageChange}
                      variant="outlined"
                      shape="rounded"
                      color="primary"
                    />
                  </div>
                </div>
              </div>
            </div>
            </div>
            </div>
            
            <Dialog open={open} onClose={closePopup}>
              <DialogTitle>Confirm Delete</DialogTitle>
              <DialogContent>
                <div>Are you sure you want to delete this course type?</div>
                <div className="text-end mt-3">
                  <button
                    className="btn btn-secondary me-2"
                    onClick={closePopup}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-danger"
                  // onClick={deleteModuleData}
                  >
                    Delete
                  </button>
                </div>
              </DialogContent>
            </Dialog>
            <div>
  <div className="modal fade" id="exampleModalPrivilege" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-xl">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">Privileges</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
          <p>Privileges.</p>
          <div className="row g-2">
           
          
                     
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Type of Users <span className="text-danger">*</span>
                          </label>

                          <select
                            class="form-select form-select-lg"
                            name="typeOfUser"
                            onChange={handleInputs}
                            aria-label="Default select example"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                          >
                            <option selected>Select User</option>
                            <option value="staff">Staff</option>
                            <option value="student">Student</option>
                            <option value="agent">Agent</option>
                            <option value="admin">Admin</option>
                          </select>
                          {errors.typeOfUser.required ? (
                            <div className="text-danger form-text">
                              This field is required.
                            </div>
                          ) : null}
                        </div>
                        {inputs.typeOfUser === "staff" ? (
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Admin List<span className="text-danger">*</span>
                            </label>
                            <Select
                             
                              placeholder="Select staff"
                              onChange={(selectedOption) =>
                                setInputs({
                                  ...inputs,
                                  userName: selectedOption.value,
                                })
                              }
                              
                              options={staffOptions}
                              name="userName"
                              styles={customStyles}
                              className="submain-one-form-body-subsection-select"
                            />
                            {errors.userName.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                          </div>
                        ) : inputs.typeOfUser === "student" ? (
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Student List<span className="text-danger">*</span>
                            </label>
                            <Select
                             
                              placeholder="Select Country"
                              onChange={(selectedOption) =>
                                setInputs({
                                  ...inputs,
                                  userName: selectedOption.value,
                                })
                              }
                              options={studentOptions}
                              name="userName"
                              styles={customStyles}
                              className="submain-one-form-body-subsection-select"
                            />
                            {errors.userName.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                          </div>
                        ) : inputs.typeOfUser === "agent" ? (
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Admin List<span className="text-danger">*</span>
                            </label>
                            <Select
                            
                              placeholder="Select Country"
                              onChange={(selectedOption) =>
                                setInputs({
                                  ...inputs,
                                  userName: selectedOption.value,
                                })
                              }
                              options={agentOptions}
                              name="userName"
                              styles={customStyles}
                              className="submain-one-form-body-subsection-select"
                            />
                            {errors.userName.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                          </div>
                        ) : inputs.typeOfUser === "admin" ? (
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Admin List<span className="text-danger">*</span>
                            </label>
                            <Select
                            
                              placeholder="Select Country"
                              onChange={(selectedOption) =>
                                setInputs({
                                  ...inputs,
                                  userName: selectedOption.value,
                                })
                              }
                              options={adminOptions}
                              name="userName"
                              styles={customStyles}
                              className="submain-one-form-body-subsection-select"
                            />
                            {errors.userName.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                          </div>
                        ) : null}
              <div>
                <h3>Manage Privileges</h3>
                {['university', 'program', 'client'].map(module => (
                    <div key={module}>
                        <h4>{module}</h4>
                        <label>
                            <input
                                type="checkbox"
                                checked={privileges.find(p => p.module === module)?.permissions.add || false}
                                onChange={() => handlePrivilegeChange(module, 'add')}
                            />
                            Add
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={privileges.find(p => p.module === module)?.permissions.edit || false}
                                onChange={() => handlePrivilegeChange(module, 'edit')}
                            />
                            Edit
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={privileges.find(p => p.module === module)?.permissions.view || false}
                                onChange={() => handlePrivilegeChange(module, 'view')}
                            />
                            View
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={privileges.find(p => p.module === module)?.permissions.delete || false}
                                onChange={() => handlePrivilegeChange(module, 'delete')}
                            />
                            Delete
                        </label>
                    </div>
                ))}
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" className="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</div>
          </div>
       
    </div>
  );
}