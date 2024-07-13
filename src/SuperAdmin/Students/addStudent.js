import React, { useEffect, useState } from 'react';
import { isValidEmail, isValidPassword, isValidPhone } from '../../Utils/Validation';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { StudentSuperAdmin } from '../../api/student';
import Sidebar from "../../compoents/sidebar";
import { Link } from "react-router-dom";
import { MdCameraAlt } from "react-icons/md";
function AddAgent() {
    const initialState = {
        source: "",
        name: "",
        passportNo: "",
        expiryDate: "",
        citizenship: "",
        dob: "",
        gender: "",
        highestQualification: "",
        degreeName: "",
        academicYear: "",
        yearPassed: "",
        institution: "",
        percentage: "",
        doHaveAnyEnglishLanguageTest: "",
        englishTestType: "",
        testScore: "",
        dateOfTest: "",
        country: "",
        desiredUniversity: "",
        desiredCourse: "",
        workExperience: "",
        anyVisaRejections: "",
        visaReason: "",
        doYouHaveTravelHistory: "",
        travelReason: "",
        finance: "",
        email: "",
        contactNumber: "",
        whatsAppNumber: "",
        password: "",
        confirmPassword: ""

    }
    const initialStateErrors = {

        source: { required: false },
        name: { required: false },
        passportNo: { required: false },
        expiryDate: { required: false },
        citizenship: { required: false },
        dob: { required: false },
        gender: { required: false },
        highestQualification: { required: false },
        addressLine1: { required: false },
        degreeName: { required: false },
        academicYear: { required: false },
        yearPassed: { required: false },
        institution: { required: false },
        percentage: { required: false },
        doHaveAnyEnglishLanguageTest: { required: false },
        englishTestType: { required: false },
        testScore: { required: false },
        dateOfTest: { required: false },
        country: { required: false },
        desiredUniversity: { required: false },
        desiredCourse: { required: false },
        workExperience: { required: false },
        anyVisaRejections: { required: false },
        visaReason: { required: false },
        doYouHaveTravelHistory: { required: false },
        travelReason: { required: false },
        finance: { required: false },
        email: { required: false, valid: false },
        contactNumber: { required: false, valid: false },
        whatsAppNumber: { required: false, valid: false },
        password: { required: false, valid: false },
        confirmPassword: { required: false, valid: false }

    }
    const [student, setStudent] = useState(initialState)
    const [errors, setErrors] = useState(initialStateErrors)
    const [submitted, setSubmitted] = useState(false);
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
        if (data.gender === "") {
            error.gender.required = true;
        }
        if (data.email === "") {
            error.email.required = true;
        }
        if (data.contactNumber === "") {
            error.contactNumber.required = true;
        }
        if (data.whatsAppNumber === "") {
            error.whatsAppNumber.required = true;
        }
        if (data.highestQualification === "") {
            error.highestQualification.required = true;
        }
        if (data.degreeName === "") {
            error.degreeName.required = true;
        }
        if (data.academicYear === "") {
            error.academicYear.required = true;
        }
        if (data.yearPassed === "") {
            error.yearPassed.required = true;
        }
        if (data.institution === "") {
            error.institution.required = true;
        }
        if (data.percentage === "") {
            error.percentage.required = true;
        }
        if (data.doHaveAnyEnglishLanguageTest === "") {
            error.doHaveAnyEnglishLanguageTest.required = true;
        }
        if (data.country === "") {
            error.country.required = true
        }
        if (data.desiredUniversity === "") {
            error.desiredUniversity.required = true
        }
        if (data.desiredCourse === "") {
            error.desiredCourse.required = true
        }
        if (data.workExperience === "") {
            error.workExperience.required = true
        }
        if (data.anyVisaRejections === "") {
            error.anyVisaRejections.required = true
        }
        if (data.doYouHaveTravelHistory === "") {
            error.doYouHaveTravelHistory.required = true
        }
        if (data.finance === "") {
            error.finance.required = true
        }
        if (data.password === "") {
            error.password.required = true
        }
        if (data.confirmPassword === "") {
            error.confirmPassword.required = true
        }
        if (!isValidPhone(data.contactNumber)) {
            error.contactNumber.valid = true;
        }
        if (!isValidPhone(data.whatsAppNumber)) {
            error.whatsAppNumber.valid = true;
        }
        if (!isValidPassword(data.password)) {
            error.password.valid = true;
        }
        if (!isValidPassword(data.confirmPassword)) {
            error.confirmPassword.valid = true;
        }
        if (!isValidEmail(data.email)) {
            error.email.valid = true;
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





    const handleSubmit = (event) => {
        event.preventDefault();
        const newError = handleValidation(student);
        setErrors(newError);
        setSubmitted(true);
        const allInputsValid = Object.values(newError);
        const valid = allInputsValid.every((x) => x.required === false);
        if (valid) {
            StudentSuperAdmin(student)
                .then((res) => {
                    toast.success(res?.data?.message);
                    navigate("/ListStudent");
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                });
        }
    };
    return (
        <>
            <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
                <div class="container-fluid">
                    <nav class="navbar navbar-vertical navbar-expand-lg">
                        <Sidebar />
                    </nav>
                    <div className="content-wrapper " style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
                        <div className="content-header ">
                            <div className="content container-fluid ">
                                <div className="row ">
                                    <div className="col-xl-12 ">
                                        <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
                                            <div className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0" style={{ background: '#fe5722', color: '#fff' }}>
                                                <h5 className='text-center text-capitalize p-1'> Add Student Details</h5>
                                            </div>
                                            <form onSubmit={handleSubmit}>

                                                <div className="card-body mt-2 ">
                                                    <div className="row g-3 ">
                                                        <div className="position-relative d-inline-block">
                                                            <img
                                                                className="img-fluid rounded-circle img-thumbnail mx-auto d-block"
                                                                src="https://placehold.co/128x128"
                                                                alt="student-image"
                                                                style={{ width: '8rem', height: '8rem' }}
                                                            />
                                                            <label
                                                                htmlFor="fileInputImage"
                                                                className="position-absolute fs-6 rounded-circle "
                                                                style={{ cursor: 'pointer', bottom: '5%', left: '53.5%', transform: 'translate(25%, 25%)', color: '#0f2239' }}
                                                            >
                                                                <i className="fas fa-camera"></i>
                                                            </label>
                                                            <input
                                                                name="universityLogo"
                                                                id="fileInputImage"
                                                                type="file"
                                                                accept="image/*"
                                                                className="form-control border-0 text-dark bg-transparent"
                                                                style={{ display: "none", fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                            />
                                                        </div>
                                                       <div className='row'>
                                                       <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                {" "}
                                                                Source<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                name="source"
                                                                onChange={handleInputs}
                                                                className="form-control "
                                                                placeholder="Enter Source"
                                                            />
                                                            {errors.source.required ? (
                                                                <div className="text-danger form-text">
                                                                    This field is required.
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>
                                                                Source <span className="text-danger">*</span>
                                                            </label>
                                                        <select class="form-select form-select-lg rounded-2" aria-label="Default select example"    style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>
  <option selected>Select Source</option>
  <option value="Walk In">Walk In</option>
  <option value="Social Media">Social Media</option>
 
</select>
</div>
                                                       </div>
                                                       
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                Student Name <span className="text-danger">*</span>
                                                            </label>
                                                            <div className="">
                                                                <input
                                                                    type="text"
                                                                    style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                    name="name"
                                                                    onChange={handleInputs}
                                                                    className="form-control "
                                                                    placeholder="Enter Student Name"
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
    Citizenship<span className="text-danger">*</span>
</label>
<input
    type="text"
    className="form-control "
    style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
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
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                name="dob"
                                                                onChange={handleInputs}
                                                            />
                                                            {errors.dob.required ? <span className="text-danger form-text profile_error">
                                                                This field is required.
                                                            </span> : null}

                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                {" "}
                                                                PassportNo<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                placeholder="Enter Passport No"
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                name="passportNo"
                                                                onChange={handleInputs}
                                                            />
                                                            {errors.passportNo.required ? (
                                                                <div className="text-danger form-text">
                                                                    This field is required.
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                Expiry Date <span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="date"
                                                                className="form-control "
                                                                placeholder="Enter Contact Number "
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
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
                                                                Gender<span className="text-danger">*</span>
                                                            </label>
                                                            <select
                                                                type="text"
                                                                className="form-select "
                                                                placeholder="Contact Number"
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                name="gender"
                                                                onChange={handleInputs}>
                                                                <option value="">Select Gender</option>
                                                                <option value="male">Male</option>
                                                                <option value="female">Female</option>
                                                                <option value="others">Others</option>
                                                            </select>
                                                            {errors.gender.required ?
                                                                <span className="text-danger form-text profile_error">
                                                                    This field is required.
                                                                </span> : null
                                                            }
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                Email ID<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                placeholder="Enter  Email  ID"
                                                                name="email"
                                                                onChange={handleInputs}
                                                            />
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
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                                                            <label style={{ color: "#231F20" }}>
                                                                Primary Number<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                placeholder="Enter Primary Number"
                                                                name="contactNumber"
                                                                onChange={handleInputs}
                                                            />
                                                            {errors.contactNumber.required ?

                                                                <span className="text-danger form-text profile_error">

                                                                    This field is required.

                                                                </span> : errors.contactNumber.valid ?
                                                                    <span className="text-danger form-text profile_error">
                                                                        Enter valid mobile number.
                                                                    </span> : null

                                                            }

                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                                                            <label style={{ color: "#231F20" }}>
                                                                WhatsApp Number <span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                placeholder="Enter The WhatsApp Number "
                                                                name="whatsAppNumber"
                                                                onChange={handleInputs}
                                                            />
                                                            {errors.whatsAppNumber.required ?

                                                                <span className="text-danger form-text profile_error">

                                                                    This field is required.

                                                                </span> : errors.whatsAppNumber.valid ?
                                                                    <span className="text-danger form-text profile_error">
                                                                        Enter valid whatsAppNumber.
                                                                    </span> : null

                                                            }

                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                Highest Qualification<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                placeholder="Enter HighestQualification"
                                                                name="highestQualification"
                                                                onChange={handleInputs}
                                                            />
                                                            {errors.highestQualification.required ? <span className="text-danger form-text profile_error">
                                                                This field is required.
                                                            </span> : null}
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                Degree Name<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                placeholder="Enter Degree Name"
                                                                name="degreeName"
                                                                onChange={handleInputs}
                                                            />
                                                            {errors.degreeName.required ? <span className="text-danger form-text profile_error">
                                                                This field is required.
                                                            </span> : null}

                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                Percentage<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                placeholder="Enter percentage"
                                                                name="percentage"
                                                                onChange={handleInputs}
                                                            />
                                                            {errors.percentage.required ? <span className="text-danger form-text profile_error">
                                                                This field is required.
                                                            </span> : null}
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                Institution Name<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                placeholder="Enter Institution Name"
                                                                name="institution"
                                                                onChange={handleInputs}
                                                            />
                                                            {errors.institution.required ? <span className="text-danger form-text profile_error">
                                                                This field is required.
                                                            </span> : null}
                                                        </div>
                                                        
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                Start Date<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="date"
                                                                className="form-control "
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                placeholder="Enter AcademicYear"
                                                                name="academicYear"
                                                                onChange={handleInputs}
                                                            />
                                                            {errors.academicYear.required ? <span className="text-danger form-text profile_error">
                                                                This field is required.
                                                            </span> : null}
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                End Date<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="date"
                                                                className="form-control "
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                placeholder="Enter AcademicYear"
                                                                name="yearPassed"
                                                                onChange={handleInputs}
                                                            />
                                                            {errors.yearPassed.required ? <span className="text-danger form-text profile_error">
                                                                This field is required.
                                                            </span> : null}

                                                        </div>
                                                        
                                                     
<div className='row mt-2'>
<div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

<label style={{ color: "#231F20" }}>
    Do have any English Language Test <span className="text-danger">*</span>
</label>
<select type="text"
    className="form-select form-select-lg rounded-2 "
    style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
    placeholder="Enter Do have any English Language Test "
    name="doHaveAnyEnglishLanguageTest"
    onChange={handleInputs} >
    <option value="">Select English Test Type</option>
    <option value="Yes">Yes</option>
    <option value="no">No</option>
</select>
{errors.doHaveAnyEnglishLanguageTest.required ? <span className="text-danger form-text profile_error">
    This field is required.
</span> : null}

</div>
</div>
                                                       
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                                                            <label style={{ color: "#231F20" }}>
                                                                English Test Type
                                                            </label>
                                                            <select type="text"
                                                                className="form-select form-select-lg rounded-2"
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                placeholder="Enter English Test Type"
                                                                name="englishTestType"
                                                                onChange={handleInputs}>
                                                                <option value="">Select English Test Type</option>
                                                                <option value="IELTS">IELTS</option>
                                                                <option value="TOEFL">TOEFL</option>
                                                                <option value="PTE">PTE</option>
                                                                <option value="SAT">SAT</option>
                                                                <option value="Other">Other</option>

                                                            </select>
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                Test Score
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                placeholder="Enter TestScore"
                                                                name="testScore"
                                                                onChange={handleInputs}
                                                            />
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                Date Of Test
                                                            </label>
                                                            <input
                                                                type="date"
                                                                className="form-control  "
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                placeholder="Enter Date Of Test"
                                                                name="dateOfTest"
                                                                onChange={handleInputs}
                                                            />
                                                        </div>
                                                        <div className='row mt-2'>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                Do Tou Have  Travel History<span className="text-danger">*</span>
                                                            </label>
                                                            <select type="text"
                                                                className="form-select form-select-lg rounded-2"
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                placeholder="Enter Do You Have  Travel History"
                                                                name="doYouHaveTravelHistory"
                                                                onChange={handleInputs} >
                                                                <option value="">Do You Have Trave lHistory</option>
                                                                <option value="Yes">Yes</option>
                                                                <option value="No">No</option>
                                                            </select>
                                                            {errors.doYouHaveTravelHistory.required ? <span className="text-danger form-text profile_error">
                                                                This field is required.
                                                            </span> : null}

                                                        </div>
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                Any Visa Rejections<span className="text-danger">*</span>
                                                            </label>
                                                            <select type="text"
                                                                className="form-select form-select-lg rounded-2"
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                placeholder="Enter Any Visa Rejections"
                                                                name="anyVisaRejections"
                                                                onChange={handleInputs}>
                                                                <option value="">AnyVisaRejections</option>
                                                                <option value="yes">Yes</option>
                                                                <option value="No">No</option>
                                                            </select>

                                                            {errors.anyVisaRejections.required ? <span className="text-danger form-text profile_error">
                                                                This field is required.
                                                            </span> : null}
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                                                            <label style={{ color: "#231F20" }}>
                                                                Visa Reason
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                placeholder="Enter Visa Reason"
                                                                name="visaReason"
                                                                onChange={handleInputs}
                                                            />
                                                        </div>
                                                       
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                Desired University <span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                placeholder="Enter Desired University "
                                                                name="desiredUniversity"
                                                                onChange={handleInputs}
                                                            />
                                                            {errors.desiredUniversity.required ? <span className="text-danger form-text profile_error">
                                                                This field is required.
                                                            </span> : null}

                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                Desired Country <span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                placeholder="Enter Desired Country "
                                                                name="country"
                                                                onChange={handleInputs}
                                                            />
                                                            {errors.country.required ? <span className="text-danger form-text profile_error">
                                                                This field is required.
                                                            </span> : null}
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                Desired Course <span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                placeholder="Enter Desired Course "
                                                                name="desiredCourse"
                                                                onChange={handleInputs}
                                                            />
                                                            {errors.desiredCourse.required ? <span className="text-danger form-text profile_error">
                                                                This field is required.
                                                            </span> : null}
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                Finance<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                placeholder="Enter Finance"
                                                                name="finance"
                                                                onChange={handleInputs}
                                                            />
                                                            {errors.finance.required ? <span className="text-danger form-text profile_error">
                                                                This field is required.
                                                            </span> : null}
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                Work Experience<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                placeholder="Enter Work Experience"
                                                                name="workExperience"
                                                                onChange={handleInputs}
                                                            />
                                                            {errors.workExperience.required ? <span className="text-danger form-text profile_error">
                                                                This field is required.
                                                            </span> : null}

                                                        </div>
                                                       
                                                      
                                                        
                                                       



                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                                                            <label style={{ color: "#231F20" }}>
                                                                Password<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                placeholder="Enter Password"
                                                                name="password"
                                                                onChange={handleInputs}
                                                            />
                                                            {errors.password.required ? (
                                                                <div className="text-danger form-text">
                                                                    This field is required.
                                                                </div>
                                                            ) : errors.password.valid ? (
                                                                <div className="text-danger form-text">
                                                                    A minimum 8 characters password contains a <br />
                                                                    combination of {''}
                                                                    <strong>uppercase, lowercase, {''}</strong>
                                                                    <strong>special <br /> character{''}</strong> and <strong>number</strong>.
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                Confirm Password<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                placeholder="Enter Confirm Password"
                                                                name="confirmPassword"
                                                                onChange={handleInputs}
                                                            />
                                                            {errors.confirmPassword.required ? (
                                                                <div className="text-danger form-text">
                                                                    This field is required.
                                                                </div>
                                                            ) : errors.confirmPassword.valid ? (
                                                                <div className="text-danger form-text">
                                                                    A minimum 8 characters password contains a <br />
                                                                    combination of {''}
                                                                    <strong>uppercase, lowercase, {''}</strong>
                                                                    <strong>special <br /> character{''}</strong> and <strong>number</strong>.
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                        <div className='row g-3'>
                                                            <div className="add-customer-btns mb-40 d-flex justify-content-end  ml-auto">
                                                                <Link style={{ backgroundColor: "#231F20", fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} to="/ListStudent" className="btn btn-cancel border-0 fw-semibold text-uppercase px-4 py-2  text-white m-2">
                                                                    Cancel
                                                                </Link>
                                                                <button style={{ backgroundColor: "#FE5722", fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} type="submit" className="btn btn-save border-0 fw-semibold text-uppercase text-white px-4 py-2  m-2">
                                                                    Submit
                                                                </button>
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
                </div>
            </div>
        </>
    );
}
export default AddAgent;
