import React, { useEffect, useState } from 'react';
import { isValidEmail, isValidPassword, isValidPhone } from '../../Utils/Validation';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { saveClient } from '../../api/client';
import {getallClientModule} from "../../api/universityModule/clientModule";
import Header from "../../compoents/header";
import Sidebar from "../../compoents/sidebar";
import { Link } from "react-router-dom";



function AddAgent() {


    const initialState = {
        source: "",
        name: "",
        passportNo: "",
        expiryDate: "",
        citizenship: "",
        dob:"",
        website: "",
        addressLine1: "",  // Street Address, City, State, Postal Code, Country
        addressLine2: "",
        addressLine3: "",
        name: "",
        contactNo: "",
        emailID: "",
        gstn: "",
        status: "",

    }
    const initialStateErrors = {

        source: { required: false },
        name: { required: false },
        passportNo: { required: false },
        expiryDate: { required: false },
        citizenship: { required: false },
        dob: { required: false },
        businessContactNo: { required: false, valid: false },
        website: { required: false },
        addressLine2: { required: false },
        addressLine3: { required: false },
        addressLine1: { required: false },
        name: { required: false },
        contactNo: { required: false, valid: false },
        emailID: { required: false, valid: false },
        gstn: { required: false },
        status: { required: false },
    }
    const [client, setClient] = useState(initialState)
    const [errors, setErrors] = useState(initialStateErrors)
    const [submitted, setSubmitted] = useState(false);
    const [type, setType] = useState([]);
   

    useEffect(() => {
        
        getAllClientDetails();
      }, []);
    
      const  getAllClientDetails = () => { 
        getallClientModule()
          .then((res) => {
            console.log(res);
            setType(res?.data?.result);
          
          })
          .catch((err) => {
            console.log(err);
          });
      };
    const navigate = useNavigate()
    const handleValidation = (data) => {
        let error = initialStateErrors;


        if (data.source === "") {
            error.source.required = true;
        }

        if (data.name === "") {
            error.name.required = true;
        }

        if (data.passportNo === "") {
            error.passportNo.required = true;
        }
        if (data.expiryDate === "") {
            error.expiryDate.required = true;
        }
        if (data.citizenship === "") {
            error.citizenship.required = true;
        }
        if (data.dob === "") {
            error.dob.required = true;
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
        if (data.gstn === "") {
            error.gstn.required = true;
        }
        if (data.status === "") {
            error.status.required = true; 
            
        }
        if (!isValidEmail(data.emailID)) {
            error.emailID.valid = true;
        }
        if (!isValidPhone(data.contactNo)) {
            error.contactNo.valid = true;
        }
       
        
        return error
    }

    const handleInputs = (event) => {
        setClient({ ...client, [event?.target?.name]: event?.target?.value })
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
        const allInputsValid = Object.values(newError);
        const valid = allInputsValid.every((x) => x.required === false);
        if (valid) {
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
        <>
        <div  style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
            <div class="container-fluid">
                <nav class="navbar navbar-vertical navbar-expand-lg">
                    <Sidebar />
                  
                </nav>
            
            <div className="content-wrapper " style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>
                <div className="content-header ">
                    <div className="content container ">
                        <form onSubmit={handleSubmit}>
                            <div className="row">            
                  <div className="col-xl-12 ">
                    <div className="card rounded-2 border-0 ">
                      <div className="card-header justify-content-between d-sm-flex d-block " style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
                        <div className="card-title" style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '16px' }}>
                    student Details :
                        </div>
                        
                      </div>
                      <div className="card-body">
                        <div className="row gy-4">
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                    
                                        <label style={{ color: "#231F20" }}>
                                            {" "}
                                            source<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                            name="source"
                                            onChange={handleInputs}
                                            className="form-control "
                                            placeholder="Enter Business Name"

                                        />
                                        {errors.source.required ? (
                                            <div className="text-danger form-text">
                                                This field is required.
                                            </div>
                                        ) : null}
                                    
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                   
                                        <label style={{ color: "#231F20" }}>
                                            Student Name <span className="text-danger">*</span>
                                        </label>
                                        <div className="d-flex gap-4">
                                        <input
                                            type="text"
                                            style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                            name="name"
                                            onChange={handleInputs}
                                            className="form-control "
                                            placeholder="Enter Business Name"

                                        />
                                           
                                            {errors.name.required ? (
                                                <div className="text-danger form-text">
                                                    This field is required.
                                                </div>
                                            ) : null}
                                       
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                   
                                        <label style={{ color: "#231F20" }}>
                                            {" "}
                                            PassportNo<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            placeholder="Enter passportNo"
                                            style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                            name="passportNo"
                                            onChange={handleInputs}
                                        />
                                        {errors.passportNo.required ? (
                                            <div className="text-danger form-text">
                                                This field is required.
                                            </div>
                                        )  : null}
                                    
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                    
                                        <label style={{ color: "#231F20" }}>
                                        ExpiryDate <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control "
                                            placeholder="Enter Contact Number "
                                            style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                            name="expiryDate"
                                            onChange={handleInputs}
                                        />
                                        {errors.expiryDate.required ?

                                            <span className="text-danger form-text profile_error">

                                                This field is required.

                                            </span> : null

                                        }
                                   
                                </div>

                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                   
                                        <label style={{ color: "#231F20" }}>
                                        Citizenship<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                            placeholder="Enter Citizenship"
                                            name="citizenship"
                                            onChange={handleInputs}
                                        />
                                        {errors.citizenship.required ? <span className="text-danger form-text profile_error">
                                            This field is required.
                                        </span> : null}
                                   
                                </div>

                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                    
                                        <label style={{ color: "#231F20" }}>
                                          DOB<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control "
                                            placeholder="Enter Name"
                                            style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                            name="dob"
                                            onChange={handleInputs}
                                        />
                                        {errors.dob.required ? <span className="text-danger form-text profile_error">
                                            This field is required.
                                        </span> : null}
                                    
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                  
                                        <label style={{ color: "#231F20" }}>
                                            Staff Contact number<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            placeholder="Contact Number"
                                            style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                            name="contactNo"
                                            onChange={handleInputs}
                                        />
                                        {errors.contactNo.required ?

                                            <span className="text-danger form-text profile_error">

                                                This field is required.

                                            </span> : errors.contactNo.valid ?
                                                <span className="text-danger form-text profile_error">
                                                    Enter valid mobile number.
                                                </span> : null

                                        }
                                    
                                </div>


                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                   
                                        <label style={{ color: "#231F20" }}>
                                            Staff EmailID<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                            placeholder="Enter Email ID"
                                            name="emailID"
                                            onChange={handleInputs}
                                        />
                                        {errors.emailID.required ? (
                                            <div className="text-danger form-text">
                                                This field is required.
                                            </div>
                                        ) : errors.emailID.valid ? (
                                            <div className="text-danger form-text">
                                                Enter valid Email Id.
                                            </div>
                                        ) : null}
                                    
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                   
                                        <label style={{ color: "#231F20" }}>
                                            Gstn<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                            placeholder="Enter Gstn"
                                            name="gstn"
                                            onChange={handleInputs}
                                        />
                                        {errors.gstn.required ? <span className="text-danger form-text profile_error">
                                            This field is required.
                                        </span> : null}
                                    
                                </div>
                               
                           <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                   
                                   <label style={{ color: "#231F20" }}>
                                       AddressLine1?<span className="text-danger">*</span>
                                   </label>
                                   <input
                                       type="text"
                                       className="form-control "
                                       style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                       placeholder="Enter No Area Street Name"
                                       name="addressLine1"
                                       onChange={handleInputs}
                                   />
                                   {errors.addressLine1.required ? <span className="text-danger form-text profile_error">
                                       This field is required.
                                   </span> : null}
                             
                           </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                    
                                        <label style={{ color: "#231F20" }}>
                                            AddressLine2<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                            placeholder="Enter City State"
                                            name="addressLine2"
                                            onChange={handleInputs}
                                        />
                                        {errors.addressLine2.required ? <span className="text-danger form-text profile_error">
                                            This field is required.
                                        </span> : null}
                                   
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                    
                                        <label style={{ color: "#231F20" }}>
                                            AddressLine3<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                            placeholder="Enter Country Pincode"
                                            name="addressLine3"
                                            onChange={handleInputs}
                                        />
                                        {errors.addressLine3.required ? <span className="text-danger form-text profile_error">
                                            This field is required.
                                        </span> : null}
                                   
                                </div>
                               
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                   
                                   <label style={{ color: "#231F20" }}>
                                       Status<span className="text-danger">*</span>
                                   </label>
                                   <select
                                       className="form-control"
                                       name="status"
                                       style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                       onChange={handleInputs}
                                   >
                                       <option value=" ">Select Status</option>
                                       <option value="Active">Active</option>
                                       <option value="Inactive">Inactive</option>
                                   </select>
                                   {errors.status.required ? <span className="text-danger form-text profile_error">
                                       This field is required.
                                   </span> : null}
                              
                           </div>
                               
                                <div className="add-customer-btns mb-40 d-flex justify-content-end w-30 ml-auto">
                                    <Link style={{ backgroundColor: "#231F20", fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} to="/ClientList" className="btn btn-cancel border text-white w-10 m-2">
                                        Cancel
                                    </Link>
                                    <button style={{ backgroundColor: "#FE5722", fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} type="submit" className="btn btn-save border text-white w-10 m-2">
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
        </div>
        </>
    );
}
export default AddAgent;
