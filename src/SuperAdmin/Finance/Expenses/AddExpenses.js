import React, { useState, useEffect } from 'react';
import Sidebar from '../../../compoents/sidebar';
import { Link } from 'react-router-dom';
import { getallClient } from "../../../api/client";
import { getallStaff } from "../../../api/staff";
import { getallAgent } from "../../../api/agent";
import { getallStudent } from "../../../api/student";
import { getallAdmin } from "../../../api/admin";
import { saveExpense } from "../../../api/invoice/expenses";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

export const AddExpenses = () => {

  const initialStateInputs = {
    incomeDate: "",
    typeOfUser: "",
    paidName: "",
    value: "",
    branch: "",
    acceptType: "",
    attachment: "",
  };

  const initialStateErrors = {
    incomeDate: { required: false },
    typeOfUser: { required: false },
    paidName: { required: false },
    value: { required: false },
    branch: { required: false },
    acceptType: { required: false },
    attachment: { required: false },
  };

  const [client, setClient] = useState([]);
  const [staff, setStaff] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [agent, setAgent] = useState([]);
  const [student, setStudent] = useState([]);
  const [inputs, setInputs] = useState(initialStateInputs);
  const [errors, setErrors] = useState(initialStateErrors);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleValidation = (data) => {
    let error = { ...initialStateErrors }; // Create a copy of initialStateErrors
    if (data.incomeDate === "") {
      error.incomeDate.required = true;
    }
    if (data.typeOfUser === "") {
      error.typeOfUser.required = true;
    }
    if (data.paidName === "") {
      error.paidName.required = true;
    }
    if (data.value === "") {
      error.value.required = true;
    }
    if (data.branch === "") {
      error.branch.required = true;
    }
    if (data.acceptType === "") {
      error.acceptType.required = true;
    }
    setErrors(error);
    return error;
  };

  useEffect(() => {
    getAllClients();
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
  const getAllClients = () => {
    getallClient()
      .then((res) => {
        setClient(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };



  const convertToBase64 = (e, name) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: reader.result,
      }));
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  const handleInputs = (event) => {
    const { name, value, files } = event.target;
    if (files && files[0]) {
      convertToBase64(event, name);
    } else {
      setInputs((prevInputs) => {
        const updatedInputs = { ...prevInputs, [name]: value };
        if (name === "typeOfClient") {
          const selectedClient = client.find((u) => u.typeOfClient === value);
          if (selectedClient) {
            return {
              ...updatedInputs,
              paidName: selectedClient.businessName,
            };
          }
        }
        return updatedInputs;
      });
    }

    if (submitted) {
      const newError = handleValidation({ ...inputs, [name]: value });
      setErrors(newError);
    }
  };


  const handleSelectChange = (selectedOptions, action) => {
    const { name } = action;
    const values = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setInputs((prevNotification) => ({
      ...prevNotification,
      [name]: values,
    }));
  };
  const handleErrors = (obj) => {
    for (const key in obj) {
      if (obj[key].required === true) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(inputs);
    setErrors(newError);
    setSubmitted(true);

    if (handleErrors(newError)) {
      saveExpense(inputs)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/list_income");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "1px solid rgba(11, 70, 84, 0.25)",
      borderRadius: "4px",
      fontSize: "12px",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "#3B0051" : "#F2CCFF",
      ":hover": {
        color: "black",
      },
    }),
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


  return (
    <div>
      <Sidebar />
      <div className="content-wrapper" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>
        <div className="content-header">
          <div className="content container-fluid">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-xl-12">
                  <div className="card border-0 rounded-0 shadow-sm p-3 position-relative">
                    <div className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0" style={{ background: '#fe5722', color: '#fff' }}>
                      <h5 className='text-center text-capitalize p-1'>Add Income Details</h5>
                    </div>
                    <div className="card-body mt-5">
                      <div className="row g-3">
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>Date<span className="text-danger">*</span></label>
                          <input
                            type="date"
                            className="form-control text-uppercase"
                            name="incomeDate"
                            value={inputs.incomeDate}
                            onChange={handleInputs}
                            style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
                          />
                          {errors.incomeDate.required && (
                            <span className="text-danger form-text profile_error">This field is required.</span>
                          )}
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Type of Users
                              <span className="text-danger">*</span>
                            </label>

                            <select
                              className={`form-select form-select-lg rounded-1 text-capitalize ${errors.typeOfUser.required ? 'is-invalid' : ''}`}
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
                                Staff List<span className="text-danger">*</span>
                              </label>
                              <Select
                                isMulti
                                placeholder="Select Staff"
                                onChange={handleSelectChange}
                                options={staffOptions}
                                name="paidName"
                                styles={customStyles}
                                className="submain-one-form-body-subsection-select"
                              />
                              {errors.paidName.required ? (
                                <div className="text-danger form-text">
                                  This field is required.
                                </div>
                              ) : null}
                            </div>
                          ) : inputs.typeOfUser === "student" ? (
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Student List
                                <span className="text-danger">*</span>
                              </label>
                              <Select
                                isMulti
                                placeholder="Select Student"
                                onChange={handleSelectChange}
                                options={studentOptions}
                                name="paidName"
                                styles={customStyles}
                                className="submain-one-form-body-subsection-select"
                              />
                              {errors.paidName.required ? (
                                <div className="text-danger form-text">
                                  This field is required.
                                </div>
                              ) : null}
                            </div>
                          ) : inputs.typeOfUser === "agent" ? (
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Agent List<span className="text-danger">*</span>
                              </label>
                              <Select
                                isMulti
                                placeholder="Select Agent"
                                onChange={handleSelectChange}
                                options={agentOptions}
                                name="paidName"
                                styles={customStyles}
                                className="submain-one-form-body-subsection-select"
                              />
                              {errors.paidName.required ? (
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
                                isMulti
                                placeholder="Select Admin"
                                onChange={handleSelectChange}
                                options={adminOptions}
                                name="paidName"
                                styles={customStyles}
                                className="submain-one-form-body-subsection-select"
                              />
                              {errors.paidName.required ? (
                                <div className="text-danger form-text">
                                  This field is required.
                                </div>
                              ) : null}
                            </div>
                          ) : null}
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>Client Name<span className="text-danger">*</span></label>
                          <select
                            className="form-select"
                            name="paidName"
                            value={inputs.paidName}
                            onChange={handleInputs}
                            style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
                          >
                            <option value="">Open this select menu</option>
                            {client?.map((item) => (
                              <option key={item?.businessName} value={item?.businessName}>
                                {item?.businessName}
                              </option>
                            ))}
                          </select>
                          {errors.paidName.required && (
                            <span className="text-danger form-text profile_error">This field is required.</span>
                          )}
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>Branch<span className="text-danger">*</span></label>
                          <select
                            className="form-select"
                            name="branch"
                            value={inputs.branch}
                            onChange={handleInputs}
                            style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
                          >
                            <option value="">Open this select menu</option>
                            {admin?.map((item) => (
                              <option key={item?.name} value={item?.name}>
                                {item?.name}
                              </option>
                            ))}
                          </select>
                          {errors.branch.required && (
                            <span className="text-danger form-text profile_error">This field is required.</span>
                          )}
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>Amount<span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            name="value"
                            value={inputs.value}
                            onChange={handleInputs}
                            style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
                            placeholder="Example 5000"
                          />
                          {errors.value.required && (
                            <span className="text-danger form-text profile_error">This field is required.</span>
                          )}
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>Accept Type<span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            name="acceptType"
                            value={inputs.acceptType}
                            onChange={handleInputs}
                            style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
                            placeholder="Example Upi"
                          />
                          {errors.acceptType.required && (
                            <span className="text-danger form-text profile_error">This field is required.</span>
                          )}
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>Attachment<span className="text-danger">*</span></label>
                          <input
                            type="file"
                            className="form-control"
                            name="attachment"
                            onChange={handleInputs}
                            style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
                          />
                         
                        </div>

                        <div className="add-customer-btns mb-40 d-flex justify-content-end ml-auto">
                          <Link
                            to='/list_income'
                            style={{ backgroundColor: "#231F20", fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
                            className="btn btn-cancel border-0 fw-semibold text-uppercase text-white px-4 py-2 m-1"
                          >
                            Cancel
                          </Link>
                          <button
                            type="submit"
                            style={{ backgroundColor: "#FE5722", fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
                            className="btn btn-save border-0 fw-semibold text-uppercase text-white px-4 py-2 m-1"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddExpenses;
