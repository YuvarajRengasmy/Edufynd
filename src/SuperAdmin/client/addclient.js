import React, { useEffect, useState } from 'react';
import { isValidEmail, isValidPhone, } from '../../Utils/Validation';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { saveClient } from '../../api/client';
import { getallClientModule } from '../../api/universityModule/clientModule';
import Sidebar from "../../compoents/sidebar";
import { Link } from 'react-router-dom';

function AddAgent() {
    const initialState = {
        typeOfClient: "",
        businessName: "",
        businessMailID: "",
        businessContactNo: "",
        website: "",
        addressLine1: "",  // Street Address, City, State, Postal Code, Country
        addressLine2: "",
        addressLine3: "",
        name: "",
        contactNo: "",
        emailID: "",
        whatsAppNumber: "",
    }

    const initialStateErrors = {
        typeOfClient: { required: false },
        businessName: { required: false },
        businessMailID: { required: false, valid: false },
        businessContactNo: { required: false, valid: false },
        website: { required: false },
        addressLine2: { required: false },
        addressLine3: { required: false },
        addressLine1: { required: false },
        name: { required: false },
        contactNo: { required: false, valid: false },
        emailID: { required: false, valid: false },
        whatsAppNumber: { required: false },
    }

    const [client, setClient] = useState(initialState)
    const [errors, setErrors] = useState(initialStateErrors)
    const [submitted, setSubmitted] = useState(false);
    const [type, setType] = useState([]);

    useEffect(() => {
        getAllClientDetails();
    }, []);

    const getAllClientDetails = () => {
        getallClientModule()
            .then((res) => {
                console.log(res);
                setType(res?.data?.result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const navigate = useNavigate();

    const handleValidation = (data) => {
        let error = initialStateErrors;

        if (data.typeOfClient === "") {
            error.typeOfClient.required = true;
        }
        if (data.businessName === "") {
            error.businessName.required = true;
        }
        if (data.businessMailID === "") {
            error.businessMailID.required = true;
        }
        if (data.businessContactNo === "") {
            error.businessContactNo.required = true;
        }
        if (data.website === "") {
            error.website.required = true;
        }
        if (data.addressLine1 === "") {
            error.addressLine1.required = true;
        }
        if (data.name === "") {
            error.name.required = true;
        }
        if (data.contactNo === "") {
            error.contactNo.required = true;
        }
        if (data.emailID === "") {
            error.emailID.required = true;
        }
        if (data.addressLine2 === "") {
            error.addressLine2.required = true;
        }
        if (data.addressLine3 === "") {
            error.addressLine3.required = true;
        }
        if (data.whatsAppNumber === "") {
            error.whatsAppNumber.required = true;
        }

        if (!isValidEmail(data.emailID)) {
            error.emailID.valid = true;
        }
        if (!isValidPhone(data.contactNo)) {
            error.contactNo.valid = true;
        }
        if (!isValidEmail(data.businessMailID)) {
            error.businessMailID.valid = true;
        }
        if (!isValidPhone(data.businessContactNo)) {
            error.businessContactNo.valid = true;
        }

        return error;
    };

    const handleInputs = (event) => {
        setClient({ ...client, [event.target.name]: event.target.value })
        if (submitted) {
            const newError = handleValidation({ ...client, [event.target.name]: event.target.value })
            setErrors(newError)
        }
    }

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
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newError = handleValidation(client);
        setErrors(newError);
        setSubmitted(true);
        const allInputsValid = Object.values(newError).every((x) => x.required === false && x.valid === false);
        if (allInputsValid) {
            saveClient(client)
                .then((res) => {
                    toast.success(res?.data?.message);
                    navigate("/client");
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                });
        }
    };

    return (
        <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
            <div className="container-fluid">
                <nav className="navbar navbar-vertical navbar-expand-lg">
                    <Sidebar />
                </nav>
                <div className="content-wrapper" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>
                    <div className="content-header">
                        <div className="content container-fluid">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-xl-12">
                                        <div className="card border-0 rounded-0 shadow-sm p-3 position-relative">
                                            <div className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0" style={{ background: '#fe5722', color: '#fff' }}>
                                                <h6 className='text-center text-capitalize p-1'>Add Client Details</h6>
                                            </div>
                                            <div className="card-body mt-5">
                                                <div className="row g-3">
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>
                                                            Type of Client <span className="text-danger">*</span>
                                                        </label>
                                                        <div className="">
                                                            <select onChange={handleInputs} style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '11px' }} className="form-select" name="typeOfClient">
                                                                <option value={""}>Select Client Type</option>
                                                                {type.map((data, index) =>
                                                                    <option key={index} value={data?.typeOfClient}> {data?.typeOfClient}</option>
                                                                )}
                                                            </select>
                                                            {errors.typeOfClient.required && (
                                                                <div className="text-danger form-text">
                                                                    This field is required.
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>
                                                            Business Name <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '11px' }}
                                                            name="businessName"
                                                            onChange={handleInputs}
                                                            className="form-control form-control-sm"
                                                            placeholder="Enter Business Name"
                                                        />
                                                        {errors.businessName.required && (
                                                            <div className="text-danger form-text">
                                                                This field is required.
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>
                                                            Website <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-sm"
                                                            style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '11px' }}
                                                            placeholder="Enter Website"
                                                            name="website"
                                                            onChange={handleInputs}
                                                        />
                                                        {errors.website.required && (
                                                            <span className="text-danger form-text profile_error">
                                                                This field is required.
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>
                                                            Business Mail ID <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-sm"
                                                            placeholder="Enter Business Mail ID"
                                                            style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '11px' }}
                                                            name="businessMailID"
                                                            onChange={handleInputs}
                                                        />
                                                        {errors.businessMailID.required && (
                                                            <div className="text-danger form-text">
                                                                This field is required.
                                                            </div>
                                                        )}
                                                        {errors.businessMailID.valid && (
                                                            <div className="text-danger form-text">
                                                                Enter valid Email Id.
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>
                                                            Business Contact No <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '11px' }}
                                                            name="businessContactNo"
                                                            onChange={handleInputs}
                                                            className="form-control form-control-sm"
                                                            placeholder="Enter Business Contact No"
                                                        />
                                                        {errors.businessContactNo.required && (
                                                            <div className="text-danger form-text">
                                                                This field is required.
                                                            </div>
                                                        )}
                                                        {errors.businessContactNo.valid && (
                                                            <div className="text-danger form-text">
                                                                Enter valid Contact No.
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>
                                                            Address Line1 <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-sm"
                                                            style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '11px' }}
                                                            placeholder="Enter Address Line1"
                                                            name="addressLine1"
                                                            onChange={handleInputs}
                                                        />
                                                        {errors.addressLine1.required && (
                                                            <div className="text-danger form-text">
                                                                This field is required.
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>
                                                            Address Line2 <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-sm"
                                                            placeholder="Enter Address Line2"
                                                            style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '11px' }}
                                                            name="addressLine2"
                                                            onChange={handleInputs}
                                                        />
                                                        {errors.addressLine2.required && (
                                                            <div className="text-danger form-text">
                                                                This field is required.
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>
                                                            Address Line3 <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-sm"
                                                            style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '11px' }}
                                                            placeholder="Enter Address Line3"
                                                            name="addressLine3"
                                                            onChange={handleInputs}
                                                        />
                                                        {errors.addressLine3.required && (
                                                            <div className="text-danger form-text">
                                                                This field is required.
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>
                                                            Contact Person Name <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '11px' }}
                                                            name="name"
                                                            onChange={handleInputs}
                                                            className="form-control form-control-sm"
                                                            placeholder="Enter Name"
                                                        />
                                                        {errors.name.required && (
                                                            <div className="text-danger form-text">
                                                                This field is required.
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>
                                                            Contact Person Number <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-sm"
                                                            style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '11px' }}
                                                            placeholder="Enter Contact No"
                                                            name="contactNo"
                                                            onChange={handleInputs}
                                                        />
                                                        {errors.contactNo.required && (
                                                            <div className="text-danger form-text">
                                                                This field is required.
                                                            </div>
                                                        )}
                                                        {errors.contactNo.valid && (
                                                            <div className="text-danger form-text">
                                                                Enter valid Contact No.
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>
                                                            Contact Person Mail ID <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '11px' }}
                                                            name="emailID"
                                                            onChange={handleInputs}
                                                            className="form-control form-control-sm"
                                                            placeholder="Enter Mail ID"
                                                        />
                                                        {errors.emailID.required && (
                                                            <div className="text-danger form-text">
                                                                This field is required.
                                                            </div>
                                                        )}
                                                        {errors.emailID.valid && (
                                                            <div className="text-danger form-text">
                                                                Enter valid Email Id.
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>
                                                            WhatsApp No <span className="text-danger">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-sm"
                                                            style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '11px' }}
                                                            placeholder="Enter WhatsApp No"
                                                            name="whatsAppNumber"
                                                            onChange={handleInputs}
                                                        />
                                                        {errors.whatsAppNumber.required && (
                                                            <div className="text-danger form-text">
                                                                This field is required.
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="add-customer-btns mb-40 d-flex justify-content-end ml-auto mt-5">
                                    <Link style={{ backgroundColor: "#0f2239", fontSize: '12px' }} to="/ClientList" className="btn btn-cancel border-0 fw-semibold text-uppercase px-3 py-1 text-white m-1">
                                        Cancel
                                    </Link>
                                    <button style={{ backgroundColor: "#fe5722", fontSize: '12px' }} type="submit" className="btn btn-save border-0 fw-semibold text-uppercase px-3 py-1 text-white  m-1">
                                        Submit
                                    </button>
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
        </div>
    )
}

export default AddAgent;
