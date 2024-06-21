import React, { useEffect, useState } from 'react';
import { isValidEmail, isValidPassword, isValidPhone } from '../../Utils/Validation';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { saveClient } from '../../api/client';
import { getallClientModule } from "../../api/universityModule/clientModule";
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
        dob: "",
        gender: "",
        email: "",
        contactNumber: "",
        whatsAppNumber: "",
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
        passWord: "",
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
        email: { required: false, valid: false },
        contactNumber: { required: false, valid: false },
        whatsAppNumber: { required: false },
        highestQualification: { required: false },
        addressLine1: { required: false },
        degreeName: { required: false },
        academicYear: { required: false, valid: false },
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
        passWord: { required: false, valid: false },
        confirmPassword: { required: false, valid: false }

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
        if (data.englishTestType === "") {
            error.englishTestType.required = true;
        }
        if (data.testScore === "") {
            error.testScore.required = true;
        }
        if (data.englishTestType === "") {
            error.englishTestType.required = true;
        }
        if (data.englishTestType === "") {
            error.englishTestType.required = true;
        }
        if (data.dateOfTest === "") {
            error.dateOfTest.required = true
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
        if (data.travelReason === "") {
            error.travelReason.required = true
        }
        if (data.finance === "") {
            error.finance.required = true
        }
        if (data.passWord === "") {
            error.passWord.required = true
        }
        if (data.confirmPassword === "") {
            error.confirmPassword.required = true
        }
        if (!isValidEmail(data.email)) {
            error.email.valid = true;
        }
        if (!isValidPhone(data.contactNumber)) {
            error.contactNumber.valid = true;
        }
        if (!isValidPhone(data.whatsAppNumber)) {
            error.whatsAppNumber.valid = true;
        }
        if (isValidPassword(data.passWord)) {
            error.passWord.valid = true;
        }
        if (isValidPassword(data.confirmPassword)) {
            error.confirmPassword.valid = true;
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
            <div style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
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
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
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
                                                                    style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
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
                                                                ExpiryDate <span className="text-danger">*</span>
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
                                                                Gender<span className="text-danger">*</span>
                                                            </label>
                                                            <select
                                                                type="text"
                                                                className="form-select "
                                                                placeholder="Contact Number"
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                name="gender"
                                                                onChange={handleInputs}>
                                                                <option value="">select Gender</option>
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
                                                                contactNumber<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                placeholder="Enter Gstn"
                                                                name="contactNumber"
                                                                onChange={handleInputs}
                                                            />
                                                            {errors.contactNumber.required ? <span className="text-danger form-text profile_error">
                                                                This field is required.
                                                            </span> : errors.contactNumber.valid ? (
                                                                <div className="text-danger form-text">
                                                                    Enter valid contactNumber.
                                                                </div>
                                                            ) : null}

                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                                                            <label style={{ color: "#231F20" }}>
                                                                whatsAppNumber<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                placeholder="Enter whatsAppNumber"
                                                                name="whatsAppNumber"
                                                                onChange={handleInputs}
                                                            />
                                                            {errors.whatsAppNumber.required ? <span className="text-danger form-text profile_error">
                                                                This field is required.
                                                            </span> : errors.whatsAppNumber.valid ? (
                                                                <div className="text-danger form-text">
                                                                    Enter valid whatsAppNumber.
                                                                </div>
                                                            ) : null}

                                                        </div>


                                                        <div className="card-header justify-content-between d-sm-flex d-block" style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
                                                            <div className="card-title" style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '16px' }}>
                                                                Student Course Details :
                                                            </div>

                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                                                            <label style={{ color: "#231F20" }}>
                                                                DoHaveAnyEnglishLanguageTest<span className="text-danger">*</span>
                                                            </label>
                                                            <select type="text"
                                                                className="form-select"
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                placeholder="Enter doHaveAnyEnglishLanguageTest"
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
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                                                            <label style={{ color: "#231F20" }}>
                                                                englishTestType<span className="text-danger">*</span>
                                                            </label>
                                                            <select type="text"
                                                                className="form-select"
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                placeholder="Enter englishTestType"
                                                                name="englishTestType"
                                                                onChange={handleInputs}>
                                                                <option value="">Select English Test Type</option>
                                                                <option value="IELTS">IELTS</option>
                                                                <option value="TOEFL">TOEFL</option>
                                                                <option value="PTE">PTE</option>
                                                                <option value="SAT">SAT</option>
                                                                <option value="Other">Other</option>

                                                            </select>


                                                            {errors.englishTestType.required ? <span className="text-danger form-text profile_error">
                                                                This field is required.
                                                            </span> : null}

                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                                                            <label style={{ color: "#231F20" }}>
                                                                TestScore<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                placeholder="Enter testScore"
                                                                name="testScore"
                                                                onChange={handleInputs}
                                                            />

                                                            {errors.testScore.required ? <span className="text-danger form-text profile_error">
                                                                This field is required.
                                                            </span> : null}

                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                                                            <label style={{ color: "#231F20" }}>
                                                                DateOfTest<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="date"
                                                                className="form-control "
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                placeholder="Enter dateOfTest"
                                                                name="dateOfTest"
                                                                onChange={handleInputs}
                                                            />

                                                            {errors.dateOfTest.required ? <span className="text-danger form-text profile_error">
                                                                This field is required.
                                                            </span> : null}

                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                                                            <label style={{ color: "#231F20" }}>
                                                                country<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                placeholder="Enter country"
                                                                name="country"
                                                                onChange={handleInputs}
                                                            />

                                                            {errors.country.required ? <span className="text-danger form-text profile_error">
                                                                This field is required.
                                                            </span> : null}

                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                                                            <label style={{ color: "#231F20" }}>
                                                                desiredUniversity<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                placeholder="Enter desiredUniversity"
                                                                name="desiredUniversity"
                                                                onChange={handleInputs}
                                                            />

                                                            {errors.desiredUniversity.required ? <span className="text-danger form-text profile_error">
                                                                This field is required.
                                                            </span> : null}

                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                                                            <label style={{ color: "#231F20" }}>
                                                                desiredCourse<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                placeholder="Enter desiredCourse"
                                                                name="desiredCourse"
                                                                onChange={handleInputs}
                                                            />

                                                            {errors.desiredCourse.required ? <span className="text-danger form-text profile_error">
                                                                This field is required.
                                                            </span> : null}

                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                                                            <label style={{ color: "#231F20" }}>
                                                                WorkExperience<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                placeholder="Enter workExperience"
                                                                name="workExperience"
                                                                onChange={handleInputs}
                                                            />

                                                            {errors.workExperience.required ? <span className="text-danger form-text profile_error">
                                                                This field is required.
                                                            </span> : null}

                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                                                            <label style={{ color: "#231F20" }}>
                                                                AnyVisaRejections<span className="text-danger">*</span>
                                                            </label>
                                                            <select type="text"
                                                                className="form-select"
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                placeholder="Enter AnyVisaRejections"
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
                                                                visaReason<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                placeholder="Enter visaReason"
                                                                name="visaReason"
                                                                onChange={handleInputs}
                                                            />

                                                            {errors.visaReason.required ? <span className="text-danger form-text profile_error">
                                                                This field is required.
                                                            </span> : null}

                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                                                            <label style={{ color: "#231F20" }}>
                                                                DoYouHaveTravelHistory<span className="text-danger">*</span>
                                                            </label>
                                                            <select type="text"
                                                                className="form-select"
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                placeholder="Enter DoYouHaveTravelHistory"
                                                                name="doYouHaveTravelHistory"
                                                                onChange={handleInputs} >
                                                                <option value="">DoYouHaveTravelHistory</option>
                                                                <option value="Yes">Yes</option>
                                                                <option value="No">No</option>
                                                            </select>
                                                            {errors.doYouHaveTravelHistory.required ? <span className="text-danger form-text profile_error">
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
                                                        <div className="card-header justify-content-between d-sm-flex d-block" style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
                                                            <div className="card-title" style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '16px' }}>
                                                                Student Academic Details :
                                                            </div>

                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                                                            <label style={{ color: "#231F20" }}>
                                                                HighestQualification<span className="text-danger">*</span>
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
                                                                DegreeName<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                placeholder="Enter City State"
                                                                name="degreeName"
                                                                onChange={handleInputs}
                                                            />
                                                            {errors.degreeName.required ? <span className="text-danger form-text profile_error">
                                                                This field is required.
                                                            </span> : null}

                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                                                            <label style={{ color: "#231F20" }}>
                                                                AcademicYear<span className="text-danger">*</span>
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
                                                                yearPassed<span className="text-danger">*</span>
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

                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                                                            <label style={{ color: "#231F20" }}>
                                                                institution<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                placeholder="Enter Institution"
                                                                name="institution"
                                                                onChange={handleInputs}
                                                            />

                                                            {errors.institution.required ? <span className="text-danger form-text profile_error">
                                                                This field is required.
                                                            </span> : null}

                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                                                            <label style={{ color: "#231F20" }}>
                                                                percentage<span className="text-danger">*</span>
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
                                                                EmailID<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
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
                                                                PassWords<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                placeholder="Enter Password"
                                                                name="password"
                                                                onChange={handleInputs}
                                                            />

                                                            {errors.passWord.required ? <span className="text-danger form-text profile_error">
                                                                This field is required.
                                                            </span> : errors.passWord.valid ? (
                                                                <div className="text-danger form-text">
                                                                    Enter valid Password .
                                                                </div>
                                                            ) : null}

                                                        </div>
                                                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">

                                                            <label style={{ color: "#231F20" }}>
                                                                ConfirmPassword<span className="text-danger">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control "
                                                                style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                                placeholder="Enter confirmPassword"
                                                                name="confirmPassword"
                                                                onChange={handleInputs}
                                                            />

                                                            {errors.confirmPassword.required ? <span className="text-danger form-text profile_error">
                                                                This field is required.
                                                            </span> : errors.confirmPassword.valid ? (
                                                                <div className="text-danger form-text">
                                                                    Enter valid Password.
                                                                </div>
                                                            ) : null}

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
