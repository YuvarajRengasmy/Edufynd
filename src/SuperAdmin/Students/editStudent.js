import React, { useEffect, useState } from "react";
import {
    isValidEmail,
    isValidPassword,
    isValidPhone,
} from "../../Utils/Validation";
import { toast } from "react-toastify";
import { StudentSuperAdmin, getSingleStudent } from "../../api/student";
import Sidebar from "../../compoents/sidebar";
import { Link, useNavigate, useLocation } from "react-router-dom";

function AddAgent() {
    const location = useLocation();
    const id = new URLSearchParams(location.search).get("id");
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
        confirmPassword: "",
    };
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
        confirmPassword: { required: false, valid: false },
    };
    const [student, setStudent] = useState(initialState);
    const [errors, setErrors] = useState(initialStateErrors);
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();
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
            error.country.required = true;
        }
        if (data.desiredUniversity === "") {
            error.desiredUniversity.required = true;
        }
        if (data.desiredCourse === "") {
            error.desiredCourse.required = true;
        }
        if (data.workExperience === "") {
            error.workExperience.required = true;
        }
        if (data.anyVisaRejections === "") {
            error.anyVisaRejections.required = true;
        }
        if (data.doYouHaveTravelHistory === "") {
            error.doYouHaveTravelHistory.required = true;
        }
        if (data.finance === "") {
            error.finance.required = true;
        }
        if (data.password === "") {
            error.password.required = true;
        }
        if (data.confirmPassword === "") {
            error.confirmPassword.required = true;
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
        return error;
    };

    useEffect(() => {
        getStudentDetails();
    }, []);

    const getStudentDetails = () => {
        getSingleStudent(id)
            .then((res) => {
                setStudent(res?.data?.result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleInputs = (event) => {
        setStudent({ ...student, [event?.target?.name]: event?.target?.value });
        if (submitted) {
            const newError = handleValidation({
                ...student,
                [event.target.name]: event.target.value,
            });
            setErrors(newError);
        }
    };

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
            <div style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}>
                <div class="container-fluid">
                    <nav class="navbar navbar-vertical navbar-expand-lg">
                        <Sidebar />
                    </nav>
                    <div
                        className="content-wrapper "
                        style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
                    >
                        <div className="content-header ">
                            <div className="content container-fluid ">
                                <div className="row">
                                    <div className="col-xl-12 ">
                                        <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
                                            <div
                                                className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0"
                                                style={{ background: "#fe5722", color: "#fff" }}
                                            >
                                                <h5 className="text-center text-capitalize p-1">
                                                    {" "}
                                                    Edit Student Details
                                                </h5>
                                            </div>
                                            <form onSubmit={handleSubmit}>
                                                <div className="card-body mt-5">
                                                    <div className="row g-3">
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                {" "}
                                                                Source<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                style={{
                                                                    fontFamily: "Plus Jakarta Sans",
                                                                    fontSize: "12px",
                                                                }}
                                                                name="source"
                                                                value={student?.source}
                                                                onChange={handleInputs}
                                                                className="form-control "
                                                                placeholder="Enter  Source"
                                                            />
                                                            {errors.source.required ? (
                                                                <div className="text-danger form-text">
                                                                    This field is required.
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                Student Name{" "}
                                                                <span className="text-danger">*</span>
                                                            </label>
                                                            <div className="">
                                                                <input
                                                                    type="text"
                                                                    style={{
                                                                        fontFamily: "Plus Jakarta Sans",
                                                                        fontSize: "12px",
                                                                    }}
                                                                    name="name"
                                                                    onChange={handleInputs}
                                                                    value={student?.name}
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
                                                                {" "}
                                                                Passport No
                                                                <span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                value={student?.passportNo}
                                                                placeholder="Enter Passport No"
                                                                style={{
                                                                    fontFamily: "Plus Jakarta Sans",
                                                                    fontSize: "12px",
                                                                }}
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
                                                                Expiry Date{" "}
                                                                <span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="date"
                                                                className="form-control "
                                                                value={student?.expiryDate}
                                                                placeholder="Enter Expiry Date "
                                                                style={{
                                                                    fontFamily: "Plus Jakarta Sans",
                                                                    fontSize: "12px",
                                                                }}
                                                                name="expiryDate"
                                                                onChange={handleInputs}
                                                            />
                                                            {errors.expiryDate.required ? (
                                                                <span className="text-danger form-text profile_error">
                                                                    This field is required.
                                                                </span>
                                                            ) : null}
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                DOB<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="date"
                                                                className="form-control "
                                                                placeholder="Enter Name"
                                                                value={student?.dob}
                                                                style={{
                                                                    fontFamily: "Plus Jakarta Sans",
                                                                    fontSize: "12px",
                                                                }}
                                                                name="dob"
                                                                onChange={handleInputs}
                                                            />
                                                            {errors.dob.required ? (
                                                                <span className="text-danger form-text profile_error">
                                                                    This field is required.
                                                                </span>
                                                            ) : null}
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                Citizenship
                                                                <span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                value={student?.citizenship}
                                                                style={{
                                                                    fontFamily: "Plus Jakarta Sans",
                                                                    fontSize: "12px",
                                                                }}
                                                                placeholder="Enter Citizenship"
                                                                name="citizenship"
                                                                onChange={handleInputs}
                                                            />
                                                            {errors.citizenship.required ? (
                                                                <span className="text-danger form-text profile_error">
                                                                    This field is required.
                                                                </span>
                                                            ) : null}
                                                        </div>

                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                Gender<span className="text-danger">*</span>
                                                            </label>
                                                            <select
                                                                type="text"
                                                                className="form-select "
                                                                placeholder="Contact Number"
                                                                style={{
                                                                    fontFamily: "Plus Jakarta Sans",
                                                                    fontSize: "12px",
                                                                }}
                                                                name="gender"
                                                                value={student?.gender}
                                                                onChange={handleInputs}
                                                            >
                                                                <option value="">select Gender</option>
                                                                <option value="male">Male</option>
                                                                <option value="female">Female</option>
                                                                <option value="others">Others</option>
                                                            </select>
                                                            {errors.gender.required ? (
                                                                <span className="text-danger form-text profile_error">
                                                                    This field is required.
                                                                </span>
                                                            ) : null}
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                Email ID<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                value={student?.email}
                                                                style={{
                                                                    fontFamily: "Plus Jakarta Sans",
                                                                    fontSize: "12px",
                                                                }}
                                                                placeholder="Enter Email ID"
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
                                                                Primary Number
                                                                <span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                style={{
                                                                    fontFamily: "Plus Jakarta Sans",
                                                                    fontSize: "12px",
                                                                }}
                                                                placeholder="Enter  Primary Number"
                                                                name="contactNumber"
                                                                value={student?.contactNumber}
                                                                onChange={handleInputs}
                                                            />
                                                            {errors.contactNumber.required ? (
                                                                <span className="text-danger form-text profile_error">
                                                                    This field is required.
                                                                </span>
                                                            ) : errors.contactNumber.valid ? (
                                                                <span className="text-danger form-text profile_error">
                                                                    Enter valid mobile number.
                                                                </span>
                                                            ) : null}
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                WhatsApp Number
                                                                <span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                value={student?.whatsAppNumber}
                                                                style={{
                                                                    fontFamily: "Plus Jakarta Sans",
                                                                    fontSize: "12px",
                                                                }}
                                                                placeholder="Enter The whatsAppNumber"
                                                                name="whatsAppNumber"
                                                                onChange={handleInputs}
                                                            />
                                                            {errors.whatsAppNumber.required ? (
                                                                <span className="text-danger form-text profile_error">
                                                                    This field is required.
                                                                </span>
                                                            ) : errors.whatsAppNumber.valid ? (
                                                                <span className="text-danger form-text profile_error">
                                                                    Enter valid whatsAppNumber.
                                                                </span>
                                                            ) : null}
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                Highest Qualification
                                                                <span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                value={student?.highestQualification}
                                                                style={{
                                                                    fontFamily: "Plus Jakarta Sans",
                                                                    fontSize: "12px",
                                                                }}
                                                                placeholder="Enter Highest Qualification"
                                                                name="highestQualification"
                                                                onChange={handleInputs}
                                                            />
                                                            {errors.highestQualification.required ? (
                                                                <span className="text-danger form-text profile_error">
                                                                    This field is required.
                                                                </span>
                                                            ) : null}
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                Degree Name
                                                                <span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={student?.degreeName}
                                                                className="form-control "
                                                                style={{
                                                                    fontFamily: "Plus Jakarta Sans",
                                                                    fontSize: "12px",
                                                                }}
                                                                placeholder="Enter  Degree Name"
                                                                name="degreeName"
                                                                onChange={handleInputs}
                                                            />
                                                            {errors.degreeName.required ? (
                                                                <span className="text-danger form-text profile_error">
                                                                    This field is required.
                                                                </span>
                                                            ) : null}
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                Start Date<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="date"
                                                                className="form-control "
                                                                value={student?.academicYear}
                                                                style={{
                                                                    fontFamily: "Plus Jakarta Sans",
                                                                    fontSize: "12px",
                                                                }}
                                                                placeholder="Enter AcademicYear"
                                                                name="academicYear"
                                                                onChange={handleInputs}
                                                            />
                                                            {errors.academicYear.required ? (
                                                                <span className="text-danger form-text profile_error">
                                                                    This field is required.
                                                                </span>
                                                            ) : null}
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                End Date<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="date"
                                                                className="form-control "
                                                                value={student?.yearPassed}
                                                                style={{
                                                                    fontFamily: "Plus Jakarta Sans",
                                                                    fontSize: "12px",
                                                                }}
                                                                placeholder="Enter Academic Year"
                                                                name="yearPassed"
                                                                onChange={handleInputs}
                                                            />
                                                            {errors.yearPassed.required ? (
                                                                <span className="text-danger form-text profile_error">
                                                                    This field is required.
                                                                </span>
                                                            ) : null}
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                Institution
                                                                <span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                value={student?.institution}
                                                                style={{
                                                                    fontFamily: "Plus Jakarta Sans",
                                                                    fontSize: "12px",
                                                                }}
                                                                placeholder="Enter Institution"
                                                                name="institution"
                                                                onChange={handleInputs}
                                                            />
                                                            {errors.institution.required ? (
                                                                <span className="text-danger form-text profile_error">
                                                                    This field is required.
                                                                </span>
                                                            ) : null}
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                Percentage<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                value={student?.percentage}
                                                                style={{
                                                                    fontFamily: "Plus Jakarta Sans",
                                                                    fontSize: "12px",
                                                                }}
                                                                placeholder="Enter Percentage"
                                                                name="percentage"
                                                                onChange={handleInputs}
                                                            />
                                                            {errors.percentage.required ? (
                                                                <span className="text-danger form-text profile_error">
                                                                    This field is required.
                                                                </span>
                                                            ) : null}
                                                        </div>

                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                Do have any English Language Test
                                                                <span className="text-danger">*</span>
                                                            </label>
                                                            <select
                                                                type="text"
                                                                className="form-select"
                                                                style={{
                                                                    fontFamily: "Plus Jakarta Sans",
                                                                    fontSize: "12px",
                                                                }}
                                                                placeholder="Enter Do have any English Language Test"
                                                                name="doHaveAnyEnglishLanguageTest"
                                                                value={student?.doHaveAnyEnglishLanguageTest}
                                                                onChange={handleInputs}
                                                            >
                                                                <option value="">
                                                                    Select English Test Type
                                                                </option>
                                                                <option value="Yes">Yes</option>
                                                                <option value="no">No</option>
                                                            </select>
                                                            {errors.doHaveAnyEnglishLanguageTest.required ? (
                                                                <span className="text-danger form-text profile_error">
                                                                    This field is required.
                                                                </span>
                                                            ) : null}
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                English Test Type
                                                                
                                                            </label>
                                                            <select
                                                                type="text"
                                                                className="form-select"
                                                                style={{
                                                                    fontFamily: "Plus Jakarta Sans",
                                                                    fontSize: "12px",
                                                                }}
                                                                placeholder="Enter English Test Type"
                                                                name="englishTestType"
                                                                value={student?.englishTestType}
                                                                onChange={handleInputs}
                                                            >
                                                                <option value="">
                                                                    Select English Test Type
                                                                </option>
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
                                                                value={student?.testScore}
                                                                style={{
                                                                    fontFamily: "Plus Jakarta Sans",
                                                                    fontSize: "12px",
                                                                }}
                                                                placeholder="Enter Test Score"
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
                                                                className="form-control "
                                                                value={student?.dateOfTest}
                                                                style={{
                                                                    fontFamily: "Plus Jakarta Sans",
                                                                    fontSize: "12px",
                                                                }}
                                                                placeholder="Enter Date Of Test"
                                                                name="dateOfTest"
                                                                onChange={handleInputs}
                                                            />
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                Country<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                style={{
                                                                    fontFamily: "Plus Jakarta Sans",
                                                                    fontSize: "12px",
                                                                }}
                                                                placeholder="Enter country"
                                                                name="country"
                                                                value={student?.country}
                                                                onChange={handleInputs}
                                                            />
                                                            {errors.country.required ? (
                                                                <span className="text-danger form-text profile_error">
                                                                    This field is required.
                                                                </span>
                                                            ) : null}
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                Desired University
                                                                <span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                style={{
                                                                    fontFamily: "Plus Jakarta Sans",
                                                                    fontSize: "12px",
                                                                }}
                                                                placeholder="Enter Desired University"
                                                                name="desiredUniversity"
                                                                value={student?.desiredUniversity}
                                                                onChange={handleInputs}
                                                            />
                                                            {errors.desiredUniversity.required ? (
                                                                <span className="text-danger form-text profile_error">
                                                                    This field is required.
                                                                </span>
                                                            ) : null}
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                Desired Course
                                                                <span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                style={{
                                                                    fontFamily: "Plus Jakarta Sans",
                                                                    fontSize: "12px",
                                                                }}
                                                                placeholder="Enter Desired Course"
                                                                name="desiredCourse"
                                                                value={student?.desiredCourse}
                                                                onChange={handleInputs}
                                                            />
                                                            {errors.desiredCourse.required ? (
                                                                <span className="text-danger form-text profile_error">
                                                                    This field is required.
                                                                </span>
                                                            ) : null}
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                Work Experience
                                                                <span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                value={student?.workExperience}
                                                                style={{
                                                                    fontFamily: "Plus Jakarta Sans",
                                                                    fontSize: "12px",
                                                                }}
                                                                placeholder="Enter Work Experience"
                                                                name="workExperience"
                                                                onChange={handleInputs}
                                                            />
                                                            {errors.workExperience.required ? (
                                                                <span className="text-danger form-text profile_error">
                                                                    This field is required.
                                                                </span>
                                                            ) : null}
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                Any Visa Rejections
                                                                <span className="text-danger">*</span>
                                                            </label>
                                                            <select
                                                                type="text"
                                                                className="form-select"
                                                                style={{
                                                                    fontFamily: "Plus Jakarta Sans",
                                                                    fontSize: "12px",
                                                                }}
                                                                placeholder="Enter Any Visa Rejections"
                                                                name="anyVisaRejections"
                                                                value={student?.anyVisaRejections}
                                                                onChange={handleInputs}
                                                            >
                                                                <option value="">AnyVisaRejections</option>
                                                                <option value="yes">Yes</option>
                                                                <option value="No">No</option>
                                                            </select>

                                                            {errors.anyVisaRejections.required ? (
                                                                <span className="text-danger form-text profile_error">
                                                                    This field is required.
                                                                </span>
                                                            ) : null}
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                Visa Reason
                                                               
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                value={student?.visaReason}
                                                                style={{
                                                                    fontFamily: "Plus Jakarta Sans",
                                                                    fontSize: "12px",
                                                                }}
                                                                placeholder="Enter Vis aReason"
                                                                name="visaReason"
                                                                onChange={handleInputs}
                                                            />
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                Do You Have Travel History
                                                                <span className="text-danger">*</span>
                                                            </label>
                                                            <select
                                                                type="text"
                                                                className="form-select"
                                                                style={{
                                                                    fontFamily: "Plus Jakarta Sans",
                                                                    fontSize: "12px",
                                                                }}
                                                                placeholder="Enter Do You Have Travel History"
                                                                name="doYouHaveTravelHistory"
                                                                value={student?.doYouHaveTravelHistory}
                                                                onChange={handleInputs}
                                                            >
                                                                <option value="">DoYouHaveTravelHistory</option>
                                                                <option value="Yes">Yes</option>
                                                                <option value="No">No</option>
                                                            </select>
                                                            {errors.doYouHaveTravelHistory.required ? (
                                                                <span className="text-danger form-text profile_error">
                                                                    This field is required.
                                                                </span>
                                                            ) : null}
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                Finance<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                style={{
                                                                    fontFamily: "Plus Jakarta Sans",
                                                                    fontSize: "12px",
                                                                }}
                                                                placeholder="Enter Finance"
                                                                name="finance"
                                                                value={student?.finance}
                                                                onChange={handleInputs}
                                                            />
                                                            {errors.finance.required ? (
                                                                <span className="text-danger form-text profile_error">
                                                                    This field is required.
                                                                </span>
                                                            ) : null}
                                                        </div>

                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                Password<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                style={{
                                                                    fontFamily: "Plus Jakarta Sans",
                                                                    fontSize: "12px",
                                                                }}
                                                                placeholder="Enter Password"
                                                                name="password"
                                                                value={student?.password}
                                                                onChange={handleInputs}
                                                            />
                                                            {errors.password.required ? (
                                                                <div className="text-danger form-text">
                                                                    This field is required.
                                                                </div>
                                                            ) : errors.password.valid ? (
                                                                <div className="text-danger form-text">
                                                                    A minimum 8 characters password contains a{" "}
                                                                    <br />
                                                                    combination of {""}
                                                                    <strong>uppercase, lowercase, {""}</strong>
                                                                    <strong>
                                                                        special <br /> character{""}
                                                                    </strong>{" "}
                                                                    and <strong>number</strong>.
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                            <label style={{ color: "#231F20" }}>
                                                                Confirm Password
                                                                <span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                value={student?.confirmPassword}
                                                                style={{
                                                                    fontFamily: "Plus Jakarta Sans",
                                                                    fontSize: "12px",
                                                                }}
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
                                                                    A minimum 8 characters password contains a{" "}
                                                                    <br />
                                                                    combination of {""}
                                                                    <strong>uppercase, lowercase, {""}</strong>
                                                                    <strong>
                                                                        special <br /> character{""}
                                                                    </strong>{" "}
                                                                    and <strong>number</strong>.
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                        <div className="row g-2">
                                                            <div className="add-customer-btns mb-40 d-flex justify-content-end w-30 ml-auto">
                                                                <Link
                                                                    style={{
                                                                        backgroundColor: "#231F20",
                                                                        fontFamily: "Plus Jakarta Sans",
                                                                        fontSize: "14px",
                                                                    }}
                                                                    to="/ListStudent"
                                                                    className="btn btn-cancel border-0 fw-semibold text-uppercase  text-white w-25 m-2"
                                                                >
                                                                    Cancel
                                                                </Link>
                                                                <button
                                                                    style={{
                                                                        backgroundColor: "#FE5722",
                                                                        fontFamily: "Plus Jakarta Sans",
                                                                        fontSize: "14px",
                                                                    }}
                                                                    type="submit"
                                                                    className="btn btn-save border-0 fw-semibold text-uppercase text-white w-25 m-2"
                                                                >
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
