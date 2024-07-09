import React, { useEffect, useState } from 'react';
import { isValidEmail, isValidPassword, isValidPhone } from '../../Utils/Validation';
import { toast } from 'react-toastify';
import { updateClient,getSingleClient } from '../../api/client';
import {getallClientModule} from "../../api/universityModule/clientModule";
import Header from "../../compoents/header";
import Sidebar from "../../compoents/sidebar";
import { Link, useNavigate, useLocation } from "react-router-dom";



function AddAgent() {

    const location = useLocation();
    const id = new URLSearchParams(location.search).get("id");
  
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
        whatsappNumber: "",
       

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
       whatsappNumber: { required: false, valid: false },
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
        if (data.whatsappNumber === "") {
            error.whatsappNumber.required = true;
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
        return error
    }

    const handleInputs = (event) => {
        setClient({ ...client, [event?.target?.name]: event?.target?.value })
        if (submitted) {
            const newError = handleValidation({ ...client, [event.target.name]: event.target.value })
            setErrors(newError)
        }
    }
    useEffect(() => {
        getClientDetails();
  
      }, []);
    const getClientDetails = () => {
        getSingleClient(id)
          .then((res) => {
            setClient(res?.data?.result);
          })
          .catch((err) => {
            console.log(err);
          });
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
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newError = handleValidation(client);
        setErrors(newError);
        setSubmitted(true);
        const allInputsValid = Object.values(newError);
        const valid = allInputsValid.every((x) => x.required === false);
        if (valid) {
            updateClient(client)
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
        <div  style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
            <div class="container-fluid">
                <nav class="navbar navbar-vertical navbar-expand-lg">
                    <Sidebar />
                    <nav className='navbar navbar-top navbar-expand'>
                    <Header />
                    </nav>
                  
                </nav>
           
            <div className="content-wrapper "  style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
                <div className="content-header ">
                    <div className="content container-fluid ">
                        <form onSubmit={handleSubmit}>
                            <div className="row">

                            <div className="col-xl-12 ">
                            <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
                <div className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0" style={{background:'#fe5722',color:'#fff'}}>
                <h5 className='text-center text-capitalize p-1'> Edit Client Details</h5>
                </div>
                      <div className="card-body mt-5">
                        <div className="row gy-4">
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                   
                                   <label style={{ color: "#231F20" }}>
                                       Type of client <span className="text-danger">*</span>
                                   </label>
                                   <div className="">
                                       
                                       <select onChange={handleInputs} style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} className="form-select rounded-2 p-2 "  name="typeOfClient">
                         <option value={""}  >{client?.typeOfClient}</option>
                         {type.map((data, index) =>
                           <option key={index} value={data?.typeOfClient}> {data?.typeOfClient}</option>)}
                       </select>
                                       {errors.typeOfClient.required ? (
                                           <div className="text-danger form-text">
                                               This field is required.
                                           </div>
                                       ) : null}
                                  
                               </div>
                           </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                                  
                                        <label style={{ color: "#231F20" }}>
                                            {" "}
                                            Business Name<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="businessName"
                                            style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                            onChange={handleInputs}
                                            value={client?.businessName}
                                            className="form-control "
                                            placeholder="Enter Business Name"

                                        />
                                        {errors.businessName.required ? (
                                            <div className="text-danger form-text">
                                                This field is required.
                                            </div>
                                        ) : null}
                                    
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                                  
                                        <label style={{ color: "#231F20" }}>
                                            Website<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            value={client?.website}
                                            style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                            placeholder="Enter Website"
                                            name="website"
                                            onChange={handleInputs}
                                        />
                                        {errors.website.required ? <span className="text-danger form-text profile_error">
                                            This field is required.
                                        </span> : null}
                                    
                                </div>
                               
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                  
                                        <label style={{ color: "#231F20" }}>
                                            {" "}
                                            Business Mail ID<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            value={client?.businessMailID}
                                            style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                            placeholder="Enter Business Mail ID"
                                            name="businessMailID"
                                            onChange={handleInputs}
                                        />
                                        {errors.businessMailID.required ? (
                                            <div className="text-danger form-text">
                                                This field is required.
                                            </div>
                                        ) : errors.businessMailID.valid ? (
                                            <div className="text-danger form-text">
                                                Enter valid Email Id.
                                            </div>
                                        ) : null}
                                   
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                                   
                                        <label style={{ color: "#231F20" }}>
                                            Business Contact No <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            value={client?.businessContactNo}
                                            style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                            placeholder="Enter Business Contact Number "
                                            name="businessContactNo"
                                            onChange={handleInputs}
                                        />
                                        {errors.businessContactNo.required ?

                                            <span className="text-danger form-text profile_error">

                                                This field is required.

                                            </span> : errors.businessContactNo.valid ?
                                                <span className="text-danger form-text profile_error">
                                                    Enter valid mobile number.
                                                </span> : null

                                        }
                                   
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                                  
                                  <label style={{ color: "#231F20" }}>
                                  WhatsApp Number<span className="text-danger">*</span>
                                  </label>
                                  <input
                                      type="text"
                                      className="form-control"
                                      style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                      value={client?.whatsappNumber}
                                      placeholder="Enter WhatsApp Number"
                                      name="whatsappNumber"
                                      onChange={handleInputs}
                                     
                                  />
                                  {errors.whatsappNumber.required ? <span className="text-danger form-text profile_error">
                                      This field is required.
                                  </span> : null}
                            
                          </div>

                                

                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                                    
                                        <label style={{ color: "#231F20" }}>
                                            Staff Name<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                            placeholder="Enter Staff Name"
                                            value={client?.name}
                                            name="name"
                                            onChange={handleInputs}
                                        />
                                        {errors.name.required ? <span className="text-danger form-text profile_error">
                                            This field is required.
                                        </span> : null}
                                    
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                   
                                        <label style={{ color: "#231F20" }}>
                                            Staff Contact No<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                            placeholder="Enter Staff Contact No"
                                            value={client?.contactNo}
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
                             


                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                                   
                                        <label style={{ color: "#231F20" }}>
                                            Staff Email ID<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                            value={client?.emailID}
                                            placeholder="Enter Staff Email ID"
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
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                                   
                                        <label style={{ color: "#231F20" }}>
                                        Address/Street Address<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            value={client?.addressLine1}
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
                                        Address/City & State<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                            placeholder="Enter City State"
                                            value={client?.addressLine2}
                                            name="addressLine2"
                                            onChange={handleInputs}
                                        />
                                        {errors.addressLine2.required ? <span className="text-danger form-text profile_error">
                                            This field is required.
                                        </span> : null}
                                   
                                </div>
                                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                   
                                        <label style={{ color: "#231F20" }}>
                                       Pin<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            value={client?.addressLine3}
                                            style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                            placeholder="Enter Country Pincode"
                                            name="addressLine3"
                                            onChange={handleInputs}
                                        />
                                        {errors.addressLine3.required ? <span className="text-danger form-text profile_error">
                                            This field is required.
                                        </span> : null}
                                   
                                </div>
                               
                             
                                <div className="add-customer-btns mb-40 d-flex justify-content-end ml-auto">
                                    <Link style={{ backgroundColor: "#0f2239", fontSize: '14px' }} to="/ClientList" className="btn btn-cancel border-0 fw-semibold text-uppercase px-4 py-2 text-white m-2">
                                        Cancel
                                    </Link>
                                    <button style={{ backgroundColor: "#fe5722", fontSize: '14px' }} type="submit" className="btn btn-save border-0 fw-semibold text-uppercase px-4 py-2 text-white  m-2">
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
    );
}
export default AddAgent;
