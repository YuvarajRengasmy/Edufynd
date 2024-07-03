import React, { useEffect, useState } from 'react';
import Flags from 'react-world-flags';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { saveProgram } from '../../api/Program';
import { getallUniversity } from '../../api/university';
import { getallModule } from "../../api/allmodule";
import { getallIntake } from "../../api/intake";
import { Form, Row, Col } from 'react-bootstrap';
import Header from "../../compoents/header";
import Sidebar from "../../compoents/sidebar";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Select from 'react-select';
export const addStaff = () => {


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
    gstn: "",
    status: "",

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
    <div>
      <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
        <div class="container-fluid">
          <nav class="navbar navbar-vertical navbar-expand-lg">
            <Sidebar />

          </nav>

          <div className="content-wrapper" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
            <div className="content-header ">
              <div className="content container-fluid">
                <form  >
                  <div className='row'>
                    <div className="col-xl-12 ">
                      <div className="card rounded-1 border-0 ">
                        <div className="card-header  justify-content-between d-sm-flex d-block " style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
                          <div className="card-title fw-semibold" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '16px' }}>
                            Add Staff Details:
                          </div>

                        </div>
                        <div className="card-body">

                          <div className="row gy-4">

                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                              <label style={{ color: "#231F20" }}>
                                {" "}
                                Employee ID<span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control  "
                                placeholder="Enter Employee ID "
                                style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                name=" Employee ID"

                              />

                              <div className="text-danger form-text">
                                This field is required.
                              </div>


                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                              <label style={{ color: "#231F20" }}>
                                {" "}
                               Photo<span className="text-danger">*</span>
                              </label>
                              <input
                                type="file"
                                className="form-control  "
                                placeholder="Upload  Photo "
                                style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '15px' }}
                                name=" Photo"

                              />



                              <div className="text-danger form-text">
                                This field is required.
                              </div>


                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                              <label style={{ color: "#231F20" }} >
                                {" "}
                               Name<span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control  "
                                placeholder="Enter Name "
                                style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                name="Name"

                              />



                              <div className="text-danger form-text">
                                This field is required.
                              </div>


                            </div>

                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                              <label style={{ color: "#231F20" }}>
                               Role/Designation<span className="text-danger">*</span>
                              </label>

                              <input
                                type="text"
                                className="form-control  "
                                placeholder="Enter  Role/Designation "
                                style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                name=" Role/Designation"

                              />



                              <div className="text-danger form-text">
                                This field is required.
                              </div>


                            </div>

                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                              <label style={{ color: "#231F20" }}>
                                {" "}
                               Job Description<span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control "
                                placeholder="Enter Job Description "
                                style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                name="Job Description"

                              />

                              <div className="text-danger form-text">
                                This field is required.
                              </div>


                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">

                              <label style={{ color: "#231F20" }}>
                                {" "}
                               Reporting Manager<span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control "
                                style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                placeholder="Enter  Reporting Manager"
                                name=" Reporting Manager"

                              />

                              <div className="text-danger form-text">
                                This field is required.
                              </div>


                            </div>

                           









                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                              <label style={{ color: "#231F20" }}>
                               Shift Timing   <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                className="form-control"
                                placeholder="Enter  Shift Timing"
                                name="discountedValue"

                              />


                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                              <label style={{ color: "#231F20" }}>
                               Are they eligible for casual leave<span className="text-danger">*</span>
                              </label>


                              <Select
                                isMulti


                                placeholder="Select   eligible for casual leave"
                                name=" Are they eligible for casual leave"


                              />


                              <div className="text-danger form-text">
                                This field is required.
                              </div>


                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                              <label style={{ color: "#231F20" }}>
                               DOJ <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                className="form-control"
                                placeholder="Enter  DOJ "
                                name=" DOJ "

                              />


                            </div>

                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                              <label style={{ color: "#231F20" }}>
                               DOB<span className="text-danger">*</span>
                              </label>

                              <input
                                type="text"
                                className="form-control  "
                                placeholder="Enter  DOB "
                                style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                name=" DOB"

                              />

                              <div className="text-danger form-text">
                                This field is required.
                              </div>


                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                              <label style={{ color: "#231F20" }}>
                               Address 1 <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                className="form-control"
                                placeholder="Enter Street/Door No"
                                name="Street/Door "

                              />



                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

<label style={{ color: "#231F20" }}>
 Address 2 <span className="text-danger">*</span>
</label>
<input
  type="text"
  style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
  className="form-control"
  placeholder="Enter City Name"
  name="City"

/>



</div>
<div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

<label style={{ color: "#231F20" }}>
 Address 3 <span className="text-danger">*</span>
</label>
<input
  type="text"
  style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
  className="form-control"
  placeholder="Enter State"
  name="State"

/>



</div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                              <label style={{ color: '#231F20' }} className="">
                               Personal Mail ID
                              </label>
                              <input
  type="email"
  style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
  className="form-control"
  placeholder="Enter Personal Mail ID"
  name=" mail-ID"

/>
                            



                            </div>

                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                              <label style={{ color: "#231F20" }}>
                               Personal Contact No<span className="text-danger">*</span>
                              </label>
                              <input
  type="tel"
  style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
  className="form-control"
  placeholder="Enter Personal Contact No"
  name="Personal Contact No"

/>



                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                              <label style={{ color: '#231F20' }} className="">
                               Emergency Contact
                              </label>
                              <input
  type="tel"
  style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
  className="form-control"
  placeholder="Enter  Emergency Contact"
  name=" Emergency Contact"

/>
                            

                              


                            </div>



                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                              <label style={{ color: "#231F20" }}>
                               Probation Duration<span className="text-danger">*</span>
                              </label>
                              <input
  type="text"
  style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
  className="form-control"
  placeholder="Enter Probation Duration"
  name="Probation Duration"

/>

                            </div>

                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                              <label style={{ color: "#231F20" }}>
                               Salary <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter  Salary"
                                style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                name=" Salary"

                              />


                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                              <label style={{ color: "#231F20" }}>
                               Privileges/Rights <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Privileges/Rights "
                                style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                name="Privileges/Rights "

                              />


                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                              <label style={{ color: "#231F20" }}>
                               ID Card <span className="text-danger">*</span>
                              </label>
                              <Select
                                isMulti


                                placeholder="Select   eligible for casual leave"
                                name=" Are they eligible for casual leave"


                              />


                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                              <label style={{ color: "#231F20" }}>
                               Manage Applications  <span className="text-danger">*</span>
                              </label>
                              <Select
                                isMulti


                                placeholder="Select   eligible for casual leave"
                                name=" Are they eligible for casual leave"


                              />


                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                              <label style={{ color: "#231F20" }}>
                               Active/Inactive  <span className="text-danger">*</span>
                              </label>
                              <Select
                                isMulti


                                placeholder="Select   eligible for casual leave"
                                name=" Are they eligible for casual leave"


                              />

                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                              <label style={{ color: "#231F20" }}>
                               Team Lead   <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter  Team Lead   "
                                style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                name=" Team Lead   "

                              />


                            </div>










                            <div className='row my-3'>
                              <div className="add-customer-btns mb-40 d-flex justify-content-end w-50 ml-auto">
                                <Link

                                  to=""
                                  style={{ backgroundColor: '#231F20', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                  className="btn btn-cancel border text-white w-50 m-2"
                                >
                                  Cancel
                                </Link>
                                <button

                                  style={{ backgroundColor: '#FE5722', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}

                                  type="submit"
                                  className="btn btn-save border text-white w-50 m-2"
                                >
                                  Submit
                                </button>
                              </div>
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
    </div>
  )
}
export default addStaff