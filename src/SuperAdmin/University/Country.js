import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { updateStaff, getSingleStaff } from "../../api/staff";
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
        module: { required: false },
        view: { required: false}, 
        edit:  { required: false}, 
        delete:  { required: false}

    };

    const [privileges, setPrivileges] = useState([initialStatePrivilege]);
    const [errors, setErrors] = useState([initialStatePrivilegesErrors]);
    const [isTasksCollapsed, setIsTasksCollapsed] = useState({
        university: true,
        client: true,
        program: true
    });
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
        setPrivileges((prevPrivileges) => {
            return prevPrivileges.map((priv) =>
                priv.module === selectedModule ? { ...priv, permissions: { ...priv.permissions, [name]: checked } } : priv
            );
        });
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    const getUserDetails = () => {
        getSingleStaff(id)
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

            updateStaff(data)
                .then((res) => {
                    toast.success("Successfully updated privileges");
                    getUserDetails();
                    modal.current.click(); // Close modal after successful update
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                });
        }
    };

    const handleAddPrivilege = () => {
        setPrivileges([...privileges, initialStatePrivilege]);
        setErrors([...errors, initialStatePrivilegesErrors]);
    };

    return (
        <>
            <div>
                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                    <label style={{ color: "#231F20" }}>
                        Privileges/Rights <span className="text-danger">*</span>
                    </label>
                    <button
                        type="button"
                        style={{ backgroundColor: "#fff", fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
                        className="form-select form-select-lg rounded-1"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal">
                        Privileges
                    </button>
                </div>

                <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Privileges</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <div>
                                    <div className="row">
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                            <label style={{ color: "#231F20" }}>
                                                Select Module 
                                            </label>
                                            <div className="form-check mb-3">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    id="universityCheckbox"
                                                    name="module"
                                                    onChange={handleCheckboxChange}
                                                    checked={selectedModule === 'university'}
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
                                                                    id="viewPermission"
                                                                    name="view"
                                                                    checked={privileges.find(priv => priv.module === 'university')?.permissions?.view || false}
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
                                                                    checked={privileges.find(priv => priv.module === 'university')?.permissions?.edit || false}
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
                                                                    checked={privileges.find(priv => priv.module === 'university')?.permissions?.delete || false}
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
                                                    type="radio"
                                                    id="clientCheckbox"
                                                    name="module"
                                                    onChange={handleCheckboxChange}
                                                    checked={selectedModule === 'client'}
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
                                                                    id="viewPermission"
                                                                    name="view"
                                                                    checked={privileges.find(priv => priv.module === 'client')?.permissions?.view || false}
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
                                                                    checked={privileges.find(priv => priv.module === 'client')?.permissions?.edit || false}
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
                                                                    checked={privileges.find(priv => priv.module === 'client')?.permissions?.delete || false}
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
                                                    type="radio"
                                                    id="programCheckbox"
                                                    name="module"
                                                    onChange={handleCheckboxChange}
                                                    checked={selectedModule === 'program'}
                                                    
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
                                                                    id="viewPermission"
                                                                    name="view"
                                                                    checked={privileges.find(priv => priv.module === 'program')?.permissions?.view || false}
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
                                                                    checked={privileges.find(priv => priv.module === 'program')?.permissions?.edit || false}
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
                                                                    checked={privileges.find(priv => priv.module === 'program')?.permissions?.delete || false}
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
                                                    type="radio"
                                                    id="clientCheckbox"
                                                    name="module"
                                                    onChange={handleCheckboxChange}
                                                    checked={selectedModule === 'client'}
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
                                                                    id="viewPermission"
                                                                    name="view"
                                                                    checked={privileges.find(priv => priv.module === 'client')?.permissions?.view || false}
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
                                                                    checked={privileges.find(priv => priv.module === 'client')?.permissions?.edit || false}
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
                                                                    checked={privileges.find(priv => priv.module === 'client')?.permissions?.delete || false}
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
                                                    type="radio"
                                                    id="programCheckbox"
                                                    name="module"
                                                    onChange={handleCheckboxChange}
                                                    checked={selectedModule === 'program'}
                                                    
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
                                                                    id="viewPermission"
                                                                    name="view"
                                                                    checked={privileges.find(priv => priv.module === 'program')?.permissions?.view || false}
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
                                                                    checked={privileges.find(priv => priv.module === 'program')?.permissions?.edit || false}
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
                                                                    checked={privileges.find(priv => priv.module === 'program')?.permissions?.delete || false}
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
                                                    type="radio"
                                                    id="commissionCheckbox"
                                                    name="module"
                                                    onChange={handleCheckboxChange}
                                                    checked={selectedModule === 'commission'}
                                                    
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
                                                                    id="viewPermission"
                                                                    name="view"
                                                                    checked={privileges.find(priv => priv.module === 'commission')?.permissions?.view || false}
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
                                                                    checked={privileges.find(priv => priv.module === 'commission')?.permissions?.edit || false}
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
                                                                    checked={privileges.find(priv => priv.module === 'commission')?.permissions?.delete || false}
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
                                                    type="radio"
                                                    id="studentCheckbox"
                                                    name="module"
                                                    onChange={handleCheckboxChange}
                                                    checked={selectedModule === 'student'}
                                                    
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
                                                                    id="viewPermission"
                                                                    name="view"
                                                                    checked={privileges.find(priv => priv.module === 'student')?.permissions?.view || false}
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
                                                                    checked={privileges.find(priv => priv.module === 'student')?.permissions?.edit || false}
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
                                                                    checked={privileges.find(priv => priv.module === 'student')?.permissions?.delete || false}
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
                                                    type="radio"
                                                    id="staffCheckbox"
                                                    name="module"
                                                    onChange={handleCheckboxChange}
                                                    checked={selectedModule === 'staff'}
                                                    
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
                                                                    id="viewPermission"
                                                                    name="view"
                                                                    checked={privileges.find(priv => priv.module === 'staff')?.permissions?.view || false}
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
                                                                    checked={privileges.find(priv => priv.module === 'staff')?.permissions?.edit || false}
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
                                                                    checked={privileges.find(priv => priv.module === 'staff')?.permissions?.delete || false}
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
                                                    type="radio"
                                                    id="agentCheckbox"
                                                    name="module"
                                                    onChange={handleCheckboxChange}
                                                    checked={selectedModule === 'agent'}
                                                    
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
                                                                    id="viewPermission"
                                                                    name="view"
                                                                    checked={privileges.find(priv => priv.module === 'agent')?.permissions?.view || false}
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
                                                                    checked={privileges.find(priv => priv.module === 'agent')?.permissions?.edit || false}
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
                                                                    checked={privileges.find(priv => priv.module === 'agent')?.permissions?.delete || false}
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
                                                    type="radio"
                                                    id="applicationCheckbox"
                                                    name="module"
                                                    onChange={handleCheckboxChange}
                                                    checked={selectedModule === 'application'}
                                                    
                                                />
                                                <label className="form-check-label" htmlFor="applicationCheckbox">
                                                application
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
                                                                    id="viewPermission"
                                                                    name="view"
                                                                    checked={privileges.find(priv => priv.module === 'application')?.permissions?.view || false}
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
                                                                    checked={privileges.find(priv => priv.module === 'application')?.permissions?.edit || false}
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
                                                                    checked={privileges.find(priv => priv.module === 'application')?.permissions?.delete || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="deletePermission">Delete</label>
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
                                                    type="radio"
                                                    id="studentEnquiryCheckbox"
                                                    name="module"
                                                    onChange={handleCheckboxChange}
                                                    checked={selectedModule === 'studentEnquiry'}
                                                    
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
                                                                    id="viewPermission"
                                                                    name="view"
                                                                    checked={privileges.find(priv => priv.module === 'studentEnquiry')?.permissions?.view || false}
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
                                                                    checked={privileges.find(priv => priv.module === 'studentEnquiry')?.permissions?.edit || false}
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
                                                                    checked={privileges.find(priv => priv.module === 'studentEnquiry')?.permissions?.delete || false}
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
                                                    type="radio"
                                                    id="forexEnquiryCheckbox"
                                                    name="module"
                                                    onChange={handleCheckboxChange}
                                                    checked={selectedModule === 'forexEnquiry'}
                                                    
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
                                                                    id="viewPermission"
                                                                    name="view"
                                                                    checked={privileges.find(priv => priv.module === 'forexEnquiry')?.permissions?.view || false}
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
                                                                    checked={privileges.find(priv => priv.module === 'forexEnquiry')?.permissions?.edit || false}
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
                                                                    checked={privileges.find(priv => priv.module === 'forexEnquiry')?.permissions?.delete || false}
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
                                                    type="radio"
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
                                                                    checked={privileges.find(priv => priv.module === 'accommodationEnquiry')?.permissions?.view || false}
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
                                                                    checked={privileges.find(priv => priv.module === 'accommodationEnquiry')?.permissions?.edit || false}
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
                                                                    checked={privileges.find(priv => priv.module === 'accommodationEnquiry')?.permissions?.delete || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="deletePermission">Delete</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Collapse>
                                            </div>
                                           
                                            
                                           
                                        </div>
                                       <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">  
                                            <label style={{ color: "#231F20" }}>
                                                Enquiry Process
                                            </label>
                                            <div className="form-check mb-3">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
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
                                                                    checked={privileges.find(priv => priv.module === 'flightEnquiry')?.permissions?.view || false}
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
                                                                    checked={privileges.find(priv => priv.module === 'flightEnquiry')?.permissions?.edit || false}
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
                                                                    checked={privileges.find(priv => priv.module === 'studentEnquiry')?.permissions?.delete || false}
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
                                                    type="radio"
                                                    id="forexEnquiryCheckbox"
                                                    name="module"
                                                    onChange={handleCheckboxChange}
                                                    checked={selectedModule === 'forexEnquiry'}
                                                    
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
                                                                    id="viewPermission"
                                                                    name="view"
                                                                    checked={privileges.find(priv => priv.module === 'forexEnquiry')?.permissions?.view || false}
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
                                                                    checked={privileges.find(priv => priv.module === 'forexEnquiry')?.permissions?.edit || false}
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
                                                                    checked={privileges.find(priv => priv.module === 'forexEnquiry')?.permissions?.delete || false}
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
                                                    type="radio"
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
                                                                    checked={privileges.find(priv => priv.module === 'accommodationEnquiry')?.permissions?.view || false}
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
                                                                    checked={privileges.find(priv => priv.module === 'accommodationEnquiry')?.permissions?.edit || false}
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
                                                                    checked={privileges.find(priv => priv.module === 'accommodationEnquiry')?.permissions?.delete || false}
                                                                    onChange={handlePermissionChange}
                                                                />
                                                                <label className="form-check-label" htmlFor="deletePermission">Delete</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Collapse>
                                            </div>
                                           
                                            
                                           
                                        </div>

                            </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
                            </div>
                           </div>
                    </div>
                </div>
            </div>
            </div>
          
        </>
    )
}

export default Header;
