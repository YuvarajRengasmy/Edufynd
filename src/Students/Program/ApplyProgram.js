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
        studentId: getStudentId(),
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
        courseFees:0
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
    const [student, setStudent] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getProgramDetails();
        getUserDetails();
    }, []);

    const getUserDetails = () => {
        const data = getStudentId();
        getSingleStudent(data)
            .then((res) => {
                const result = res?.data?.result;
                setStudent(result);
                setApplication((prev) => ({
                    ...prev,
                    name: result?.name,
                    dob: result?.dob,
                    passportNo: result?.passportNo,
                    email: result?.email,
                    primaryNumber: result?.primaryNumber,
                    whatsAppNumber: result?.whatsAppNumber
                }));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getProgramDetails = () => {
        getSingleProgram(id)
            .then((res) => {
                const result = res?.data?.result;
                setProgram(result);
                setApplication((prev) => ({
                    ...prev,
                    universityName: result?.universityName,
                    course: result?.programTitle,
                    courseFees: result?.campuses[0].courseFees
                }));
            })
            .catch((err) => {
                console.log(err);
            });
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
        // if (!data.courseFees) error.courseFees.required = true;

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
                navigate("/Program"); // Navigate to a success page or another route
                toast.success(res?.data?.message);
                setApplication(initialState); // Clear the form fields after submission
              
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
                                                            {Array.isArray(program?.campuses) &&
                                                                                    program.campuses.map((campus, index) => (
                                                                    <option key={index} value={campus.campus}>{campus.campus}</option>
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
                                                            {Array.isArray(program?.campuses) &&
                                                                                    program.campuses.map((campus, index) => (
                                                                    <option key={index} value={campus.inTake}>{campus.inTake}</option>
                                                                ))}
                                                        </select>
                                                        {errors.inTake.required && <span className="text-danger">InTake is required</span>}
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>Name<span className="text-danger">*</span></label>
                                                        <input
                                                            type="text"
                                                            className="form-control rounded-2 p-2"
                                                            placeholder="Enter Name"
                                                            name="name"
                                                            value={application.name}
                                                            onChange={handleInputs}
                                                            style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                        />
                                                        {errors.name.required && <span className="text-danger">Name is required</span>}
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>DOB<span className="text-danger">*</span></label>
                                                        <input
                                                            type="date"
                                                            className="form-control rounded-2 p-2"
                                                            placeholder="Enter DOB"
                                                            name="dob"
                                                            value={application.dob}
                                                            onChange={handleInputs}
                                                            style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                        />
                                                        {errors.dob.required && <span className="text-danger">DOB is required</span>}
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>Passport No<span className="text-danger">*</span></label>
                                                        <input
                                                            type="text"
                                                            className="form-control rounded-2 p-2"
                                                            placeholder="Enter Passport No"
                                                            name="passportNo"
                                                            value={application.passportNo}
                                                            onChange={handleInputs}
                                                            style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                        />
                                                        {errors.passportNo.required && <span className="text-danger">Passport Number is required</span>}
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>Email<span className="text-danger">*</span></label>
                                                        <input
                                                            type="email"
                                                            className="form-control rounded-2 p-2"
                                                            placeholder="Enter Email"
                                                            name="email"
                                                            value={application.email}
                                                            onChange={handleInputs}
                                                            style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                        />
                                                        {errors.email.required && <span className="text-danger">Email is required</span>}
                                                        {errors.email.valid && <span className="text-danger">Email is not valid</span>}
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>Primary Number<span className="text-danger">*</span></label>
                                                        <input
                                                            type="text"
                                                            className="form-control rounded-2 p-2"
                                                            placeholder="Enter Primary Number"
                                                            name="primaryNumber"
                                                            value={application.primaryNumber}
                                                            onChange={handleInputs}
                                                            style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                        />
                                                        {errors.primaryNumber.required && <span className="text-danger">Primary Number is required</span>}
                                                        {errors.primaryNumber.valid && <span className="text-danger">Primary Number is not valid</span>}
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>WhatsApp Number<span className="text-danger">*</span></label>
                                                        <input
                                                            type="text"
                                                            className="form-control rounded-2 p-2"
                                                            placeholder="Enter WhatsApp Number"
                                                            name="whatsAppNumber"
                                                            value={application.whatsAppNumber}
                                                            onChange={handleInputs}
                                                            style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                        />
                                                        {errors.whatsAppNumber.required && <span className="text-danger">WhatsApp Number is required</span>}
                                                        {errors.whatsAppNumber.valid && <span className="text-danger">WhatsApp Number is not valid</span>}
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>University Name<span className="text-danger">*</span></label>
                                                        <input
                                                            type="text"
                                                            className="form-control rounded-2 p-2"
                                                            placeholder="Enter University Name"
                                                            name="universityName"
                                                            value={application.universityName}
                                                            onChange={handleInputs}
                                                            style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                            disabled
                                                        />
                                                        {errors.universityName.required && <span className="text-danger">University Name is required</span>}
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>Course<span className="text-danger">*</span></label>
                                                        <input
                                                            type="text"
                                                            className="form-control rounded-2 p-2"
                                                            placeholder="Enter Course"
                                                            name="course"
                                                            value={application.course}
                                                            onChange={handleInputs}
                                                            style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                            disabled
                                                        />
                                                        {errors.course.required && <span className="text-danger">Course is required</span>}
                                                    </div>
                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                        <label style={{ color: "#231F20" }}>Course Fees<span className="text-danger">*</span></label>
                                                        <input
                                                            type="text"
                                                            className="form-control rounded-2 p-2"
                                                            placeholder="Enter Course Fees"
                                                            name="courseFees"
                                                            value={application.courseFees}
                                                            onChange={handleInputs}
                                                            style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                                                            disabled
                                                        />
                                                        {errors.courseFees.required && <span className="text-danger">Course Fees is required</span>}
                                                    </div>
                                                    <div className=" border-0 d-flex justify-content-center py-3">
                                                        <button type="submit" className="btn text-white"   style={{ backgroundColor: '#fe5722', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>Submit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer border-0 d-flex justify-content-center py-3">
                        <Link className='text-decoration-none' to={{
                                    pathname: "/ViewProgramUniversity",
                                    search: `?id=${program?._id}`,
                                  }}><button className="btn btn-outline-dark">Back</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Course;