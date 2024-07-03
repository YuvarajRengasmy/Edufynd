import React, { useEffect, useState } from 'react';
import { isValidEmail, isValidPhone } from '../../../Utils/Validation';
import { toast } from 'react-toastify';
import { Link, useNavigate, useLocation } from "react-router-dom";

import { updateStudnetEnquiry,getSingleStudnetEnquiry } from '../../../api/Enquiry/student';

import Mastersidebar from '../../../compoents/sidebar';
import { Student } from '../../../api/endpoints';

export const AddStudentForm = () => {


  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const initialState = {
    source: "",
    name: "",
    dob: "",
    passportNo: "",
    qualification: "",
    whatsAppNumber: "",
    primaryNumber: "",
    email: "",
    cgpa: "",
    yearPassed: "",
    desiredCountry: "",
    desiredCourse: "",
    doYouNeedSupportForLoan: "",
    assignedTo: "",

  }
  const initialStateErrors = {
    source: { required: false },
    name: { required: false },
    dob: { required: false },
    passportNo: { required: false },
    qualification: { required: false },
    whatsAppNumber: { required: false },
    primaryNumber: { required: false },
    email: { required: false },
    cgpa: { required: false },
    yearPassed: { required: false },
    desiredCountry: { required: false },
    desiredCourse: { required: false },
    doYouNeedSupportForLoan: { required: false },
    assignedTo: { required: false },

  }
  const [student, setStudent] = useState(initialState)
  const [errors, setErrors] = useState(initialStateErrors)
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    getStudentDetails();
  
}, []);


const getStudentDetails = () => {


  getSingleStudnetEnquiry(id)
      .then((res) => {
          setStudent(res?.data?.result);
      })
      .catch((err) => {
          console.log(err);
      });
};
  const handleValidation = (data) => {
    let error = initialStateErrors;

    if (data.source === "") {
      error.source.required = true;
    }
    if (data.name === "") {
      error.name.required = true;
    }
    if (data.dob === "") {
      error.dob.required = true;
    }
    if (data.passportNo === "") {
      error.passportNo.required = true;
    }
    if (data.qualification === "") {
      error.qualification.required = true;
    }
    if (data.whatsAppNumber === "") {
      error.whatsAppNumber.required = true;
    }
    if (data.primaryNumber === "") {
      error.primaryNumber.required = true;
    }
    if (data.email === "") {
      error.email.required = true;
    }
    if (data.cgpa === "") {
      error.cgpa.required = true;
    }
    if (data.yearPassed === "") {
      error.yearPassed.required = true;
    }
    if (data.desiredCountry === "") {
      error.desiredCountry.required = true;
    }
    if (data.desiredCourse === "") {
      error.desiredCourse.required = true;
    }
    if (data.doYouNeedSupportForLoan === "") {
      error.doYouNeedSupportForLoan.required = true;
    }
    if (data.assignedTo === "") {
      error.assignedTo.required = true;
    }
    if (!isValidEmail(data.email)) {
      error.email.valid = true;
    }
    if (!isValidPhone(data.primaryNumber)) {
      error.primaryNumber.valid = true;
    }
    if (!isValidPhone(data.whatsAppNumber)) {
      error.whatsAppNumber.valid = true;
    }
    return error
  }

  const handleInputs = (event) => {
    setStudent({ ...student, [event?.target?.name]: event?.target?.value })
    if (submitted) {
      const newError = handleValidation({ ...student, [event.target.name]: event.target.value })
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
    const newError = handleValidation(student);
    setErrors(newError);
    setSubmitted(true);
    const allInputsValid = Object.values(newError);
    const valid = allInputsValid.every((x) => x.required === false);
    if (valid) {
      updateStudnetEnquiry(student)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/ListStudentForm");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };



  return (
    <div>
      <div style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans' }}>
        <div className="container-fluid">
          <nav className="navbar navbar-vertical navbar-expand-lg">
            <Mastersidebar />
          </nav>
          <div className='content-wrapper' style={{ backgroundColor: '#fff', fontSize: '14px' }}>
            <div className='content-header'>
              <div className='container card card-body p-4 border-0'>
                <h4 className='card-title text-center fw-bold'>Student Form</h4>
                <hr />
                <form className="p-1" onSubmit={handleSubmit}>

                  <div className='row mb-3'>

                    <div className="col">
                      <label className="form-label" for="inputEmail4">Source</label>
                      <select onChange={handleInputs} value={student?.source} style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} className="form-select rounded-2 p-2 " name="source">
                        <option value="">Select Source</option>
                        <option value="walkin">Walk In</option>
                        <option value="direct">Direct</option>
                        <option value="others">Others</option>
                      </select>
                      {errors.source.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>
                    <div className="col">
                      <label className="form-label" for="inputEmail4">Student Name</label>
                      <input className="form-control" value={student?.name} type="text" id="inputEmail4" name='name' onChange={handleInputs} placeholder='Enter Name' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} />
                      {errors.name.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}

                    </div>

                    <div className="col">
                      <label className="form-label" for="inputPassword4">DOB</label>
                      <input className="form-control" value={student?.dob} onChange={handleInputs} id="inputPassword4" type="date" placeholder='DOB' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} name="dob" />
                      {errors.dob.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}

                    </div>


                  </div>
                  <div className='row mb-3'>
                    <div className="col">
                      <label className="form-label" for="inputPassword4">Email ID</label>
                      <input className="form-control" value={Student?.email} onChange={handleInputs} id="inputPassword4" text="text" placeholder='Email ID' name="email" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} />
                      {errors.email.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : errors.email.valid ? (
                        <div className="text-danger form-text">
                          Enter valid Email Id.
                        </div>
                      ) : null}

                    </div>

                    <div className="col">
                      <label className="form-label" for="inputAddress">Passport No</label>
                      <input className="form-control" value={student?.passportNo} onChange={handleInputs} name="passportNo" id="inputAddress" type="text" placeholder="Passport No" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} />
                      {errors.passportNo.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}

                    </div>
                    <div className="col">
                      <label className="form-label" for="inputEmail4">Contact Number</label>
                      <input className="form-control" value={student?.primaryNumber} onChange={handleInputs} id="inputEmail4" type="text" name="primaryNumber" placeholder='Contact Number' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} />
                      {errors.primaryNumber.required ?

                        <span className="text-danger form-text profile_error">

                          This field is required.

                        </span> : errors.primaryNumber.valid ?
                          <span className="text-danger form-text profile_error">
                            Enter valid mobile number.
                          </span> : null

                      }

                    </div>


                  </div>
                  <div className='row mb-3'>

                    <div className="col">
                      <label className="form-label" for="inputAddress">CGPA </label>
                      <input className="form-control" onChange={handleInputs} value={student?.cgpa} name='cgpa' id="inputAddress" type="text" placeholder="CGPA" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} />
                      {errors.cgpa.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}
                    </div>
                    <div className="col">
                      <label className="form-label" for="inputAddress"> Year passed</label>
                      <input className="form-control" id="inputAddress" value={student?.yearPassed} onChange={handleInputs} name="yearPassed" type="text" placeholder="Year passed" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} />
                      {errors.yearPassed.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}

                    </div>
                    <div className="col">
                      <label className="form-label" for="inputEmail4">Desired Country</label>
                      <input className="form-control" id="inputEmail4" value={student?.desiredCountry} onChange={handleInputs} name="desiredCountry" type="text" placeholder='Desired Country' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} />
                      {errors.desiredCountry.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}

                    </div>

                  </div>
                  <div className='row mb-3'>
                    <div className="col">
                      <label className="form-label" for="inputPassword4">Desired Course</label>
                      <input className="form-control" id="inputPassword4" value={student?.desiredCourse} onChange={handleInputs} type="text" name="desiredCourse" placeholder='Desired Course' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} />
                      {errors.desiredCourse.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}

                    </div>
                    <div className="col">
                      <label className="form-label" for="inputAddress">Do you need support for loan? </label>
                      <select className="form-control"
                        name="doYouNeedSupportForLoan"
                        value={student?.doYouNeedSupportForLoan}
                        style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                        onChange={handleInputs}>
                        <option value=""> Select Loan support </option>
                        <option value="yes"> Yes </option>
                        <option value="no">No </option>

                      </select>
                      {errors.doYouNeedSupportForLoan.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}

                    </div>
                    <div className="col">
                      <label className="form-label" for="inputEmail4">WhatsApp Number</label>
                      <input className="form-control" id="inputEmail4" value={student?.whatsAppNumber} onChange={handleInputs} type="text" name="whatsAppNumber" placeholder='Contact Number' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} />
                      {errors.whatsAppNumber.required ?

                        <span className="text-danger form-text profile_error">

                          This field is required.

                        </span> : errors.whatsAppNumber.valid ?
                          <span className="text-danger form-text profile_error">
                            Enter valid WhatsApp number.
                          </span> : null

                      }

                    </div>
                  </div>
                  <div className='row mb-3'>
                    <div className="col">
                      <label className="form-label" for="inputPassword4">Qualification</label>
                      <input className="form-control" value={student?.qualification} id="inputPassword4" onChange={handleInputs} type="text" name="qualification" placeholder='Desired Course' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} />
                      {errors.qualification.required ? (
                        <div className="text-danger form-text">
                          This field is required.
                        </div>
                      ) : null}

                    </div>

                    <div className="col">
                      <label className="form-label" for="inputEmail4"> Assigned To</label>
                      <input className="form-control" value={student?.assignedTo} id="inputEmail4" onChange={handleInputs} type="text" name="assignedTo" placeholder=' assignedTo Staff' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} />
                      {errors.assignedTo.required ?

                        <span className="text-danger form-text profile_error">

                          This field is required.

                        </span> : null

                      }

                    </div>
                  </div>
                  <div className='row mb-3'>
                    <div className='d-flex flex-row align-item-center justify-content-end gap-4'>


                      <Link style={{ backgroundColor: "#231F20", fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} to="/ClientList" className="btn btn-cancel border text-white w-10 m-2">
                        Cancel
                      </Link>

                      <button style={{ backgroundColor: "#FE5722", fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} type="submit" className="btn btn-save border text-white w-10 m-2">
                        Submit
                      </button>

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
export default AddStudentForm