import React, { useState, useEffect } from "react";
import { getSingleProgram } from "../../api/Program";
import { getSingleStudent } from "../../api/student";
import { toast } from 'react-toastify';
import { isValidEmail, isValidPhone } from '../../Utils/Validation';
import { useNavigate, useLocation } from 'react-router-dom';
import { saveApplication } from "../../api/applicatin";
import { getStudentId } from "../../Utils/storage";
import { Link } from "react-router-dom";
import './Course.css';

export const Course = () => {
    const location = useLocation();
    const id = new URLSearchParams(location.search).get("id");

    const initialState = {
        name: "",
        dob: "",
        passportNo: "",
        email: "",
        primaryNumber: "",
        whatsAppNumber: "",
        campus: "",
        inTake: "",
        universityName: "",
        course: "",
        courseFees: ""
    };

    const initialStateErrors = {
        name: { required: false },
        dob: { required: false },
        passportNo: { required: false },
        email: { required: false, valid: false },
        primaryNumber: { required: false, valid: false },
        whatsAppNumber: { required: false, valid: false },
        campus: { required: false },
        inTake: { required: false },
        universityName: { required: false },
        course: { required: false },
        courseFees: { required: false }
    };

    const [application, setApplication] = useState(initialState);
    const [errors, setErrors] = useState(initialStateErrors);
    const [program, setProgram] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getProgramDetails();
        getUserDetails();
    }, []);

    const getUserDetails = async () => {
        const data = getStudentId();
        try {
            const res = await getSingleStudent(data);
            const result = res?.data?.result;
            setApplication({ ...application, ...result });
        } catch (err) {
            console.error(err);
        }
    };

    const getProgramDetails = async () => {
        try {
            const res = await getSingleProgram(id);
            setProgram(res?.data?.result);
            setApplication((prev) => ({
                ...prev,
                universityName: res?.data?.result?.universityName,
                course: res?.data?.result?.programTitle,
                courseFees: res?.data?.result?.courseFee
            }));
        } catch (err) {
            console.error(err);
        }
    };

    const handleInputs = (event) => {
        const { name, value } = event.target;
        setApplication((prev) => ({ ...prev, [name]: value }));
        if (submitted) {
            const newError = handleValidation({ ...application, [name]: value });
            setErrors(newError);
        }
    };

    const handleValidation = (data) => {
        let error = { ...initialStateErrors };

        if (!data.name) error.name.required = true;
        if (!data.dob) error.dob.required = true;
        if (!data.passportNo) error.passportNo.required = true;
        if (!data.email) {
            error.email.required = true;
        } else if (!isValidEmail(data.email)) {
            error.email.valid = true;
        }
        if (!data.primaryNumber) {
            error.primaryNumber.required = true;
        } else if (!isValidPhone(data.primaryNumber)) {
            error.primaryNumber.valid = true;
        }
        if (!data.whatsAppNumber) {
            error.whatsAppNumber.required = true;
        } else if (!isValidPhone(data.whatsAppNumber)) {
            error.whatsAppNumber.valid = true;
        }
        if (!data.campus) error.campus.required = true;
        if (!data.inTake) error.inTake.required = true;
        if (!data.universityName) error.universityName.required = true;
        if (!data.course) error.course.required = true;
        if (!data.courseFees) error.courseFees.required = true;

        return error;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newError = handleValidation(application);
        setErrors(newError);
        setSubmitted(true);

        const allInputsValid = Object.values(newError).every((x) => !x.required && !x.valid);
        if (allInputsValid) {
            try {
                const res = await saveApplication(application);
                toast.success(res?.data?.message);
                navigate("/Program");
            } catch (err) {
                toast.error(err?.response?.data?.message);
            }
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card border-0 rounded-2 mt-3">
                        <div className="card-header rounded-top border-0 img-1">
                            <div className="row g-3 mt-2">
                                <div className="col-md-4 d-flex justify-content-center align-items-start">
                                    <img
                                        src={program?.universityLogo || "https://t3.ftcdn.net/jpg/04/91/76/62/360_F_491766294_h4j7LbW2YgfbNHhq7F8GboIc1XyBSEY5.jpg"}
                                        className="img-fluid rounded-circle"
                                        style={{ width: "150px", height: "150px" }}
                                        alt="Berry College Campus"
                                    />
                                </div>
                                <div className="col-md-8 d-flex justify-content-start align-items-center">
                                    <div className="px-1 py-2">
                                        <h5 className="text-white">{program?.programTitle}</h5>
                                        <p className="text-white">{program?.universityName}</p>
                                        <p className="text-white">{program?.country}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="" style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>
                    <div className="content-header">
                        <div className="content container">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-xl-12">
                                        <div className="card rounded-2 border-0">
                                            <div className="card-header justify-content-between d-sm-flex d-block" style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
                                                <div className="card-title" style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '16px' }}>
                                                    Course Apply :
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <div className="row gy-4">
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>Campus<span className="text-danger">*</span></label>
                                                        <select
                                                            onChange={handleInputs}
                                                            style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}
                                                            className="form-select rounded-2 p-2"
                                                            name='campus'
                                                            value={application.campus}
                                                        >
                                                            <option value={""} disabled hidden>Select Campus</option>
                                                            {Array.isArray(program?.campus) &&
                                                                program.campus.map((campus, index) => (
                                                                    <option key={index} value={campus}>{campus}</option>
                                                                ))}
                                                        </select>
                                                        {errors.campus.required && <span className="text-danger">Campus is required</span>}
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>InTake<span className="text-danger">*</span></label>
                                                        <select
                                                            onChange={handleInputs}
                                                            style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}
                                                            className="form-select rounded-2 p-2"
                                                            name='inTake'
                                                            value={application.inTake}
                                                        >
                                                            <option value={""} disabled hidden>Select InTake</option>
                                                            {Array.isArray(program?.inTake) &&
                                                                program.inTake.map((inTake, index) => (
                                                                    <option key={index} value={inTake}>{inTake}</option>
                                                                ))}
                                                        </select>
                                                        {errors.inTake.required && <span className="text-danger">InTake is required</span>}
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>Student Name<span className="text-danger">*</span></label>
                                                        <input
                                                            type="text"
                                                            style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                            name="name"
                                                            value={application.name}
                                                            onChange={handleInputs}
                                                            className="form-control"
                                                            placeholder="Enter Student Name"
                                                        />
                                                        {errors.name.required && <span className="text-danger">Name is required</span>}
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>DOB<span className="text-danger">*</span></label>
                                                        <input
                                                            type="date"
                                                            className="form-control"
                                                            placeholder="Enter DOB"
                                                            style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                            name="dob"
                                                            value={application.dob}
                                                            onChange={handleInputs}
                                                        />
                                                        {errors.dob.required && <span className="text-danger">DOB is required</span>}
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>Passport No<span className="text-danger">*</span></label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Enter Passport No"
                                                            style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                            name="passportNo"
                                                            value={application.passportNo}
                                                            onChange={handleInputs}
                                                        />
                                                        {errors.passportNo.required && <span className="text-danger">Passport No is required</span>}
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>Email<span className="text-danger">*</span></label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Enter Email"
                                                            style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                            name="email"
                                                            value={application.email}
                                                            onChange={handleInputs}
                                                        />
                                                        {errors.email.required && <span className="text-danger">Email is required</span>}
                                                        {errors.email.valid && <span className="text-danger">Email is invalid</span>}
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>Primary Number<span className="text-danger">*</span></label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                            placeholder="Enter Primary Number"
                                                            name="primaryNumber"
                                                            value={application.primaryNumber}
                                                            onChange={handleInputs}
                                                        />
                                                        {errors.primaryNumber.required && <span className="text-danger">Primary Number is required</span>}
                                                        {errors.primaryNumber.valid && <span className="text-danger">Primary Number is invalid</span>}
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>WhatsApp Number<span className="text-danger">*</span></label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                            placeholder="Enter WhatsApp Number"
                                                            name="whatsAppNumber"
                                                            value={application.whatsAppNumber}
                                                            onChange={handleInputs}
                                                        />
                                                        {errors.whatsAppNumber.required && <span className="text-danger">WhatsApp Number is required</span>}
                                                        {errors.whatsAppNumber.valid && <span className="text-danger">WhatsApp Number is invalid</span>}
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>Course Name<span className="text-danger">*</span></label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                            placeholder="Enter Course"
                                                            value={application.course}
                                                            name="course"
                                                            onChange={handleInputs}
                                                        />
                                                        {errors.course.required && <span className="text-danger">Course is required</span>}
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>Course Fees<span className="text-danger">*</span></label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                            placeholder="Enter Course Fees"
                                                            name="courseFees"
                                                            value={application.courseFees}
                                                            onChange={handleInputs}
                                                        />
                                                        {errors.courseFees.required && <span className="text-danger">Course Fees are required</span>}
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>University Name<span className="text-danger">*</span></label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                            placeholder="Enter University Name"
                                                            name="universityName"
                                                            value={application.universityName}
                                                            onChange={handleInputs}
                                                        />
                                                        {errors.universityName.required && <span className="text-danger">University Name is required</span>}
                                                    </div>
                                                    <div className="add-customer-btns mb-40 d-flex justify-content-end w-30 ml-auto">
                                                        <Link
                                                            style={{ backgroundColor: "#231F20", fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}
                                                            to="/ClientList"
                                                            className="btn btn-cancel border text-white w-10 m-2"
                                                        >
                                                            Cancel
                                                        </Link>
                                                        <button
                                                            style={{ backgroundColor: "#FE5722", fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}
                                                            type="submit"
                                                            className="btn btn-save border text-white w-10 m-2"
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
        </div>
    );
};

export default Course;
