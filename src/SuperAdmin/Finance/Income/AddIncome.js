import React, { useState, useEffect } from 'react';
import Sidebar from '../../../compoents/sidebar';
import { Link } from 'react-router-dom';
import { getallClient } from "../../../api/client";
import { getallAdmin } from "../../../api/admin";
import { saveIncome } from "../../../api/invoice/income";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AddIncome = () => {

  const initialStateInputs = {
    incomeDate: "",
    typeOfClient: "",
    clientName: "",
    value: "",
    branch: "",
    acceptType: "",
    attachment: "",
  };

  const initialStateErrors = {
    incomeDate: { required: false },
    typeOfClient: { required: false },
    clientName: { required: false },
    value: { required: false },
    branch: { required: false },
    acceptType: { required: false },
    attachment: { required: false },
  };

  const [client, setClient] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [inputs, setInputs] = useState(initialStateInputs);
  const [errors, setErrors] = useState(initialStateErrors);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleValidation = (data) => {
    let error = { ...initialStateErrors }; // Create a copy of initialStateErrors
    if (data.incomeDate === "") {
      error.incomeDate.required = true;
    }
    if (data.typeOfClient === "") {
      error.typeOfClient.required = true;
    }
    if (data.clientName === "") {
      error.clientName.required = true;
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
    getAllAdmins();
  }, []);

  const getAllClients = () => {
    getallClient()
      .then((res) => {
        setClient(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllAdmins = () => {
    getallAdmin()
      .then((res) => {
        setAdmin(res?.data?.result);
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
              clientName: selectedClient.businessName,
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
      saveIncome(inputs)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/list_income");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };

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
                          <label style={{ color: "#231F20" }}>Type Of Client<span className="text-danger">*</span></label>
                          <select
                            className="form-select"
                            name="typeOfClient"
                            value={inputs.typeOfClient}
                            onChange={handleInputs}
                            style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
                          >
                            <option value="">Open this select menu</option>
                            {client?.map((item) => (
                              <option key={item?.typeOfClient} value={item?.typeOfClient}>
                                {item?.typeOfClient}
                              </option>
                            ))}
                          </select>
                          {errors.typeOfClient.required && (
                            <span className="text-danger form-text profile_error">This field is required.</span>
                          )}
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>Client Name<span className="text-danger">*</span></label>
                          <select
                            className="form-select"
                            name="clientName"
                            value={inputs.clientName}
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
                          {errors.clientName.required && (
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

export default AddIncome;
