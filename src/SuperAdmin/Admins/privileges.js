import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { updateAdmin, getSingleAdmin } from "../../api/admin";
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Collapse } from 'react-bootstrap';

const Header = () => {
    const initialStatePrivilege = {
        module: '',
        view: false,
        edit: false,
        delete: false
    };

    const initialStatePrivilegesErrors = {
        module: { required: false }
    };

    const [privileges, setPrivileges] = useState([initialStatePrivilege]);
    const [errors, setErrors] = useState([initialStatePrivilegesErrors]);
    const [isTasksCollapsed, setIsTasksCollapsed] = useState({ });
    const [selectedModule, setSelectedModule] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const modal = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const id = new URLSearchParams(location.search).get("id");

    const handleCheckboxChange = (event) => {
        const { id, checked } = event.target;
        const module = id.replace('Checkbox', '');

        if (checked) {
            setPrivileges((prevPrivileges) => {
                const existingPrivilege = prevPrivileges.find((priv) => priv.module === module);
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
            setPrivileges((prevPrivileges) => prevPrivileges.filter((priv) => priv.module !== module));
            setSelectedModule('');
            setIsTasksCollapsed((prev) => ({ ...prev, [module]: true }));
        }
    };

    const handlePermissionChange = (event) => {
        const { name, checked } = event.target;
        setPrivileges((prevPrivileges) => 
            prevPrivileges.map((priv) => 
                priv.module === selectedModule 
                    ? { ...priv, [name]: checked } 
                    : priv
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
        return errorArray.every(error => !Object.values(error.module).some(val => val === true));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newErrors = privileges.map(priv => handleValidation(priv));
        setErrors(newErrors);
        setSubmitted(true);

        if (handleErrors(newErrors)) {
            const data = {
                _id: id,
                privileges
            };

            updateAdmin(data)
                .then((res) => {
                    toast.success("Successfully updated privileges");
                    getUserDetails();
                    modal.current.click(); // Close modal after successful update
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message || "Error updating privileges");
                });
        }
    };

    return (
        <>
            <div>
                <div className="col-12">
                    {/* <label style={{ color: "#231F20" }}>
                        Privileges/Rights <span className="text-danger">*</span>
                    </label> */}
                    <button
                        type="button"
                        style={{  fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
                        className="btn rounded-1  btn-dark fw-semibold"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal">
                       Set Privileges
                    </button>
                </div>

                <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Privileges</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <label style={{ color: "#231F20" }}>
                                                Select Module 
                                            </label>
                                            <div className="form-check mb-3">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="universityCheckbox"
                                                    name="module"
                                                    onChange={handleCheckboxChange}
                                                    checked={
                                                        privileges.find(priv => priv.module === 'university')?.view || 
                                                        privileges.find(priv => priv.module === 'university')?.edit || 
                                                        privileges.find(priv => priv.module === 'university')?.delete || 
                                                        privileges.find(priv => priv.module === 'university')?.add || 
                                                        selectedModule === 'university'
                                                    }
                                                    
                                                />
                                                <label className="form-check-label" htmlFor="universityCheckbox">
                                                    University
                                                </label>

                                                <Collapse in={!isTasksCollapsed.university}>
                                                    <div className='col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3'>
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
                                                                    checked={privileges.find(priv => priv.module === 'university')?.add || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="addPermission">Add</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="viewPermission"
                                                                    name="view"
                                                                    checked={privileges.find(priv => priv.module === 'university')?.view || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="viewPermission">View</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="editPermission"
                                                                    name="edit"
                                                                    checked={privileges.find(priv => priv.module === 'university')?.edit || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="editPermission">Edit</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="deletePermission"
                                                                    name="delete"
                                                                    checked={privileges.find(priv => priv.module === 'university')?.delete || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="deletePermission">Delete</label>
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
                                                        privileges.find(priv => priv.module === 'client')?.view || 
                                                        privileges.find(priv => priv.module === 'client')?.edit || 
                                                        privileges.find(priv => priv.module === 'client')?.delete || 
                                                        privileges.find(priv => priv.module === 'client')?.add || 
                                                        selectedModule === 'client'
                                                    }
                                                    
                                                />
                                                <label className="form-check-label" htmlFor="clientCheckbox">
                                                    Client
                                                </label>
                                                <Collapse in={!isTasksCollapsed.client}>
                                                    <div className='col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3'>
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
                                                                    checked={privileges.find(priv => priv.module === 'client')?.add || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="addPermission">Add</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="viewPermission"
                                                                    name="view"
                                                                    checked={privileges.find(priv => priv.module === 'client')?.view || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="viewPermission">View</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="editPermission"
                                                                    name="edit"
                                                                    checked={privileges.find(priv => priv.module === 'client')?.edit || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="editPermission">Edit</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="deletePermission"
                                                                    name="delete"
                                                                    checked={privileges.find(priv => priv.module === 'client')?.delete || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="deletePermission">Delete</label>
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
                                                        privileges.find(priv => priv.module === 'program')?.view || 
                                                        privileges.find(priv => priv.module === 'program')?.edit || 
                                                        privileges.find(priv => priv.module === 'program')?.delete || 
                                                        privileges.find(priv => priv.module === 'program')?.add || 
                                                        selectedModule === 'program'
                                                    }
                                                    
                                                />
                                                <label className="form-check-label" htmlFor="programCheckbox">
                                                    Program
                                                </label>
                                                <Collapse in={!isTasksCollapsed.program}>
                                                    <div className='col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3'>
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
                                                                    checked={privileges.find(priv => priv.module === 'program')?.add || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="addPermission">Add</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="viewPermission"
                                                                    name="view"
                                                                    checked={privileges.find(priv => priv.module === 'program')?.view || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="viewPermission">View</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="editPermission"
                                                                    name="edit"
                                                                    checked={privileges.find(priv => priv.module === 'program')?.edit || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="editPermission">Edit</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="deletePermission"
                                                                    name="delete"
                                                                    checked={privileges.find(priv => priv.module === 'program')?.delete || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="deletePermission">Delete</label>
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
                                                        privileges.find(priv => priv.module === 'commission')?.view || 
                                                        privileges.find(priv => priv.module === 'commission')?.edit || 
                                                        privileges.find(priv => priv.module === 'commission')?.delete || 
                                                        privileges.find(priv => priv.module === 'commission')?.add || 
                                                        selectedModule === 'commission'
                                                    }
                                                    
                                                />
                                                <label className="form-check-label" htmlFor="commissionCheckbox">
                                                Commission
                                                </label>
                                                <Collapse in={!isTasksCollapsed.commission}>
                                                    <div className='col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3'>
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
                                                                    checked={privileges.find(priv => priv.module === 'commission')?.add || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="addPermission">Add</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="viewPermission"
                                                                    name="view"
                                                                    checked={privileges.find(priv => priv.module === 'commission')?.view || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="viewPermission">View</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="editPermission"
                                                                    name="edit"
                                                                    checked={privileges.find(priv => priv.module === 'commission')?.edit || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="editPermission">Edit</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="deletePermission"
                                                                    name="delete"
                                                                    checked={privileges.find(priv => priv.module === 'commission')?.delete || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="deletePermission">Delete</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Collapse>
                                            </div>



                                            <label style={{ color: "#231F20" }}>
                                                Select User
                                            </label>
                                            <div className="form-check mb-3">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="studentCheckbox"
                                                    name="module"
                                                    onChange={handleCheckboxChange}
                                                   
                                                    checked={
                                                        privileges.find(priv => priv.module === 'student')?.view || 
                                                        privileges.find(priv => priv.module === 'student')?.edit || 
                                                        privileges.find(priv => priv.module === 'student')?.delete || 
                                                        privileges.find(priv => priv.module === 'student')?.add || 
                                                        selectedModule === 'student'
                                                    }
                                                    
                                                />
                                                <label className="form-check-label" htmlFor="studentCheckbox">
                                                Student
                                                </label>
                                                <Collapse in={!isTasksCollapsed.student}>
                                                    <div className='col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3'>
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
                                                                    checked={privileges.find(priv => priv.module === 'student')?.add || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="addPermission">Add</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">

                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="viewPermission"
                                                                    name="view"
                                                                    checked={privileges.find(priv => priv.module === 'student')?.view || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="viewPermission">View</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="editPermission"
                                                                    name="edit"
                                                                    checked={privileges.find(priv => priv.module === 'student')?.edit || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="editPermission">Edit</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="deletePermission"
                                                                    name="delete"
                                                                    checked={privileges.find(priv => priv.module === 'student')?.delete || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="deletePermission">Delete</label>
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
                                                        privileges.find(priv => priv.module === 'staff')?.view || 
                                                        privileges.find(priv => priv.module === 'staff')?.edit || 
                                                        privileges.find(priv => priv.module === 'staff')?.delete || 
                                                        privileges.find(priv => priv.module === 'staff')?.add || 
                                                        selectedModule === 'staff'
                                                    }
                                                    
                                                />
                                                <label className="form-check-label" htmlFor="staffCheckbox">
                                                Staff
                                                </label>
                                                <Collapse in={!isTasksCollapsed.staff}>
                                                    <div className='col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3'>
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
                                                                    checked={privileges.find(priv => priv.module === 'staff')?.add || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="addPermission">Add</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="viewPermission"
                                                                    name="view"
                                                                    checked={privileges.find(priv => priv.module === 'staff')?.view || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="viewPermission">View</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="editPermission"
                                                                    name="edit"
                                                                    checked={privileges.find(priv => priv.module === 'staff')?.edit || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="editPermission">Edit</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="deletePermission"
                                                                    name="delete"
                                                                    checked={privileges.find(priv => priv.module === 'staff')?.delete || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="deletePermission">Delete</label>
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
                                                        privileges.find(priv => priv.module === 'agent')?.view || 
                                                        privileges.find(priv => priv.module === 'agent')?.edit || 
                                                        privileges.find(priv => priv.module === 'agent')?.delete || 
                                                        privileges.find(priv => priv.module === 'agent')?.add || 
                                                        selectedModule === 'agent'
                                                    }
                                                    
                                                />
                                                <label className="form-check-label" htmlFor="agentCheckbox">
                                                Agent
                                                </label>
                                                <Collapse in={!isTasksCollapsed.agent}>
                                                    <div className='col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3'>
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
                                                                    checked={privileges.find(priv => priv.module === 'agent')?.add || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="addPermission">Add</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="viewPermission"
                                                                    name="view"
                                                                    checked={privileges.find(priv => priv.module === 'agent')?.view || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="viewPermission">View</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="editPermission"
                                                                    name="edit"
                                                                    checked={privileges.find(priv => priv.module === 'agent')?.edit || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="editPermission">Edit</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="deletePermission"
                                                                    name="delete"
                                                                    checked={privileges.find(priv => priv.module === 'agent')?.delete || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="deletePermission">Delete</label>
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
                                                        privileges.find(priv => priv.module === 'application')?.view || 
                                                        privileges.find(priv => priv.module === 'application')?.edit || 
                                                        privileges.find(priv => priv.module === 'application')?.delete || 
                                                        privileges.find(priv => priv.module === 'application')?.add || 
                                                        selectedModule === 'application'
                                                    }
                                                    
                                                />
                                                <label className="form-check-label" htmlFor="applicationCheckbox">
                                                Application
                                                </label>
                                                <Collapse in={!isTasksCollapsed.application}>
                                                    <div className='col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3'>
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
                                                                    checked={privileges.find(priv => priv.module === 'application')?.add || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="addPermission">Add</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="viewPermission"
                                                                    name="view"
                                                                    checked={privileges.find(priv => priv.module === 'application')?.view || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="viewPermission">View</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="editPermission"
                                                                    name="edit"
                                                                    checked={privileges.find(priv => priv.module === 'application')?.edit || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="editPermission">Edit</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="deletePermission"
                                                                    name="delete"
                                                                    checked={privileges.find(priv => priv.module === 'application')?.delete || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="deletePermission">Delete</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Collapse>
                                            </div>
                                           
                                          

                                        </div>
                                        <div className="col-lg-6">
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
                                                        privileges.find(priv => priv.module === 'studentEnquiry')?.view || 
                                                        privileges.find(priv => priv.module === 'studentEnquiry')?.edit || 
                                                        privileges.find(priv => priv.module === 'studentEnquiry')?.delete || 
                                                        privileges.find(priv => priv.module === 'studentEnquiry')?.add || 
                                                        selectedModule === 'studentEnquiry'
                                                    }
                                                    
                                                />
                                                <label className="form-check-label" htmlFor="studentEnquiryCheckbox">
                                                StudentEnquiry
                                                </label>
                                                <Collapse in={!isTasksCollapsed.studentEnquiry}>
                                                    <div className='col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3'>
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
                                                                    checked={privileges.find(priv => priv.module === 'studentEnquiry')?.add || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="addPermission">Add</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="viewPermission"
                                                                    name="view"
                                                                    checked={privileges.find(priv => priv.module === 'studentEnquiry')?.view || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="viewPermission">View</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="editPermission"
                                                                    name="edit"
                                                                    checked={privileges.find(priv => priv.module === 'studentEnquiry')?.edit || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="editPermission">Edit</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="deletePermission"
                                                                    name="delete"
                                                                    checked={privileges.find(priv => priv.module === 'studentEnquiry')?.delete || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="deletePermission">Delete</label>
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
                                                        privileges.find(priv => priv.module === 'forexEnquiry')?.view || 
                                                        privileges.find(priv => priv.module === 'forexEnquiry')?.edit || 
                                                        privileges.find(priv => priv.module === 'forexEnquiry')?.delete || 
                                                        privileges.find(priv => priv.module === 'forexEnquiry')?.add || 
                                                        selectedModule === 'forexEnquiry'
                                                    }
                                                    
                                                />
                                                <label className="form-check-label" htmlFor="forexEnquiryCheckbox">
                                                ForexEnquiry
                                                </label>
                                                <Collapse in={!isTasksCollapsed.forexEnquiry}>
                                                    <div className='col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3'>
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
                                                                    checked={privileges.find(priv => priv.module === 'forexEnquiry')?.add || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="addPermission">Add</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="viewPermission"
                                                                    name="view"
                                                                    checked={privileges.find(priv => priv.module === 'forexEnquiry')?.view || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="viewPermission">View</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="editPermission"
                                                                    name="edit"
                                                                    checked={privileges.find(priv => priv.module === 'forexEnquiry')?.edit || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="editPermission">Edit</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="deletePermission"
                                                                    name="delete"
                                                                    checked={privileges.find(priv => priv.module === 'forexEnquiry')?.delete || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="deletePermission">Delete</label>
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
                                                        privileges.find(priv => priv.module === 'accommodationEnquiry')?.view || 
                                                        privileges.find(priv => priv.module === 'accommodationEnquiry')?.edit || 
                                                        privileges.find(priv => priv.module === 'accommodationEnquiry')?.delete || 
                                                        privileges.find(priv => priv.module === 'accommodationEnquiry')?.add || 
                                                        selectedModule === 'accommodationEnquiry'
                                                    }
                                                    
                                                />
                                                <label className="form-check-label" htmlFor="accommodationEnquiryCheckbox">
                                                AccommodationEnquiry
                                                </label>
                                                <Collapse in={!isTasksCollapsed.accommodationEnquiry}>
                                                    <div className='col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3'>
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
                                                                    checked={privileges.find(priv => priv.module === 'accommodationEnquiry')?.add || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="addPermission">Add</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="viewPermission"
                                                                    name="view"
                                                                    checked={privileges.find(priv => priv.module === 'accommodationEnquiry')?.view || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="viewPermission">View</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="editPermission"
                                                                    name="edit"
                                                                    checked={privileges.find(priv => priv.module === 'accommodationEnquiry')?.edit || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="editPermission">Edit</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="deletePermission"
                                                                    name="delete"
                                                                    checked={privileges.find(priv => priv.module === 'accommodationEnquiry')?.delete || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="deletePermission">Delete</label>
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
                                                        privileges.find(priv => priv.module === 'flightEnquiry')?.view || 
                                                        privileges.find(priv => priv.module === 'flightEnquiry')?.edit || 
                                                        privileges.find(priv => priv.module === 'flightEnquiry')?.delete || 
                                                        privileges.find(priv => priv.module === 'flightEnquiry')?.add || 
                                                        selectedModule === 'flightEnquiry'
                                                    }
                                                    
                                                />
                                                <label className="form-check-label" htmlFor="flightEnquiryCheckbox">
                                                FlightEnquiry
                                                </label>
                                                <Collapse in={!isTasksCollapsed.flightEnquiry}>
                                                    <div className='col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3'>
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
                                                                    checked={privileges.find(priv => priv.module === 'flightEnquiry')?.add || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="addPermission">Add</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="viewPermission"
                                                                    name="view"
                                                                    checked={privileges.find(priv => priv.module === 'flightEnquiry')?.view || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="viewPermission">View</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="editPermission"
                                                                    name="edit"
                                                                    checked={privileges.find(priv => priv.module === 'flightEnquiry')?.edit || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="editPermission">Edit</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="deletePermission"
                                                                    name="delete"
                                                                    checked={privileges.find(priv => priv.module === 'flightEnquiry')?.delete || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="deletePermission">Delete</label>
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
                                                        privileges.find(priv => priv.module === 'loanEnquiry')?.view || 
                                                        privileges.find(priv => priv.module === 'loanEnquiry')?.edit || 
                                                        privileges.find(priv => priv.module === 'loanEnquiry')?.delete || 
                                                        privileges.find(priv => priv.module === 'loanEnquiry')?.add || 
                                                        selectedModule === 'loanEnquiry'
                                                    }
                                                    
                                                />
                                                <label className="form-check-label" htmlFor="loanEnquiryCheckbox">
                                                LoanEnquiry
                                                </label>
                                                <Collapse in={!isTasksCollapsed.loanEnquiry}>
                                                    <div className='col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3'>
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
                                                                    checked={privileges.find(priv => priv.module === 'loanEnquiry')?.add || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="addPermission">Add</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="viewPermission"
                                                                    name="view"
                                                                    checked={privileges.find(priv => priv.module === 'loanEnquiry')?.view || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="viewPermission">View</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="editPermission"
                                                                    name="edit"
                                                                    checked={privileges.find(priv => priv.module === 'loanEnquiry')?.edit || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="editPermission">Edit</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="deletePermission"
                                                                    name="delete"
                                                                    checked={privileges.find(priv => priv.module === 'loanEnquiry')?.delete || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="deletePermission">Delete</label>
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
                                                        privileges.find(priv => priv.module === 'businessEnquiry')?.view || 
                                                        privileges.find(priv => priv.module === 'businessEnquiry')?.edit || 
                                                        privileges.find(priv => priv.module === 'businessEnquiry')?.delete || 
                                                        privileges.find(priv => priv.module === 'businessEnquiry')?.add || 
                                                        selectedModule === 'businessEnquiry'
                                                    }
                                                    
                                                />
                                                <label className="form-check-label" htmlFor="businessEnquiryCheckbox">
                                                BusinessEnquiry
                                                </label>
                                                <Collapse in={!isTasksCollapsed.businessEnquiry}>
                                                    <div className='col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3'>
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
                                                                    checked={privileges.find(priv => priv.module === 'businessEnquiry')?.add || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="addPermission">Add</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="viewPermission"
                                                                    name="view"
                                                                    checked={privileges.find(priv => priv.module === 'businessEnquiry')?.view || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="viewPermission">View</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="editPermission"
                                                                    name="edit"
                                                                    checked={privileges.find(priv => priv.module === 'businessEnquiry')?.edit || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="editPermission">Edit</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="deletePermission"
                                                                    name="delete"
                                                                    checked={privileges.find(priv => priv.module === 'businessEnquiry')?.delete || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="deletePermission">Delete</label>
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
                                                        privileges.find(priv => priv.module === 'generalEnquiry')?.view || 
                                                        privileges.find(priv => priv.module === 'generalEnquiry')?.edit || 
                                                        privileges.find(priv => priv.module === 'generalEnquiry')?.delete || 
                                                        privileges.find(priv => priv.module === 'generalEnquiry')?.add || 
                                                        selectedModule === 'generalEnquiry'
                                                    }
                                                    
                                                />
                                                <label className="form-check-label" htmlFor="generalEnquiryCheckbox">
                                                GeneralEnquiry
                                                </label>
                                                <Collapse in={!isTasksCollapsed.generalEnquiry}>
                                                    <div className='col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3'>
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
                                                                    checked={privileges.find(priv => priv.module === 'generalEnquiry')?.add || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="addPermission">Add</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="viewPermission"
                                                                    name="view"
                                                                    checked={privileges.find(priv => priv.module === 'generalEnquiry')?.view || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="viewPermission">View</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="editPermission"
                                                                    name="edit"
                                                                    checked={privileges.find(priv => priv.module === 'generalEnquiry')?.edit || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="editPermission">Edit</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="deletePermission"
                                                                    name="delete"
                                                                    checked={privileges.find(priv => priv.module === 'generalEnquiry')?.delete || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="deletePermission">Delete</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Collapse>
                                            </div>



                                            {/* <label style={{ color: "#231F20" }}>
                                                Social Media
                                            </label>
                                            <div className="form-check mb-3">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="accommodationEnquiryCheckbox"
                                                    name="module"
                                                    onChange={handleCheckboxChange}
                                                    checked={selectedModule === 'accommodationEnquiry'}
                                                    
                                                />
                                                <label className="form-check-label" htmlFor="accommodationEnquiryCheckbox">
                                                AccommodationEnquiry
                                                </label>
                                                <Collapse in={!isTasksCollapsed.accommodationEnquiry}>
                                                    <div className='col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3'>
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
                                                                    checked={privileges.find(priv => priv.module === 'accommodationEnquiry')?.view || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="viewPermission">View</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="editPermission"
                                                                    name="edit"
                                                                    checked={privileges.find(priv => priv.module === 'accommodationEnquiry')?.edit || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="editPermission">Edit</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="deletePermission"
                                                                    name="delete"
                                                                    checked={privileges.find(priv => priv.module === 'accommodationEnquiry')?.delete || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="deletePermission">Delete</label>
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
                                                    checked={selectedModule === 'flightEnquiry'}
                                                    
                                                />
                                                <label className="form-check-label" htmlFor="flightEnquiryCheckbox">
                                                FlightEnquiry
                                                </label>
                                                <Collapse in={!isTasksCollapsed.flightEnquiry}>
                                                    <div className='col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3'>
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
                                                                    checked={privileges.find(priv => priv.module === 'flightEnquiry')?.view || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="viewPermission">View</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="editPermission"
                                                                    name="edit"
                                                                    checked={privileges.find(priv => priv.module === 'flightEnquiry')?.edit || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="editPermission">Edit</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="deletePermission"
                                                                    name="delete"
                                                                    checked={privileges.find(priv => priv.module === 'flightEnquiry')?.delete || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="deletePermission">Delete</label>
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
                                                    checked={selectedModule === 'loanEnquiry'}
                                                    
                                                />
                                                <label className="form-check-label" htmlFor="loanEnquiryCheckbox">
                                                LoanEnquiry
                                                </label>
                                                <Collapse in={!isTasksCollapsed.loanEnquiry}>
                                                    <div className='col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3'>
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
                                                                    checked={privileges.find(priv => priv.module === 'loanEnquiry')?.view || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="viewPermission">View</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="editPermission"
                                                                    name="edit"
                                                                    checked={privileges.find(priv => priv.module === 'loanEnquiry')?.edit || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="editPermission">Edit</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="deletePermission"
                                                                    name="delete"
                                                                    checked={privileges.find(priv => priv.module === 'loanEnquiry')?.delete || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="deletePermission">Delete</label>
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
                                                    checked={selectedModule === 'businessEnquiry'}
                                                    
                                                />
                                                <label className="form-check-label" htmlFor="businessEnquiryCheckbox">
                                                BusinessEnquiry
                                                </label>
                                                <Collapse in={!isTasksCollapsed.businessEnquiry}>
                                                    <div className='col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3'>
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
                                                                    checked={privileges.find(priv => priv.module === 'businessEnquiry')?.view || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="viewPermission">View</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="editPermission"
                                                                    name="edit"
                                                                    checked={privileges.find(priv => priv.module === 'businessEnquiry')?.edit || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="editPermission">Edit</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="deletePermission"
                                                                    name="delete"
                                                                    checked={privileges.find(priv => priv.module === 'businessEnquiry')?.delete || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="deletePermission">Delete</label>
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
                                                    checked={selectedModule === 'generalEnquiry'}
                                                    
                                                />
                                                <label className="form-check-label" htmlFor="generalEnquiryCheckbox">
                                                GeneralEnquiry
                                                </label>
                                                <Collapse in={!isTasksCollapsed.generalEnquiry}>
                                                    <div className='col-xl-8 col-lg-6 col-md-6 col-sm-12 mt-3'>
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
                                                                    checked={privileges.find(priv => priv.module === 'generalEnquiry')?.view || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="viewPermission">View</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="editPermission"
                                                                    name="edit"
                                                                    checked={privileges.find(priv => priv.module === 'generalEnquiry')?.edit || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="editPermission">Edit</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="deletePermission"
                                                                    name="delete"
                                                                    checked={privileges.find(priv => priv.module === 'generalEnquiry')?.delete || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="deletePermission">Delete</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Collapse>
                                            </div> */}

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={modal}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
