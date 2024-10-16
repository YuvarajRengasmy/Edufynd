import React, { useState, useEffect } from "react";
import { getSingleProgram, getallProgram, getSingleProgramLog } from "../../api/Program";
import { saveApplication } from "../../api/applicatin";
import { getallStudent } from "../../api/student";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getFilterApplicationStatus } from "../../api/universityModule/ApplicationStatus";

import "./Course.css";
import { RiSchoolLine, RiFileTextLine, RiCoinsFill } from "react-icons/ri";
import Sidebar from "../../compoents/sidebar";
import Flags from "react-world-flags";
import { Pagination } from "@mui/material";
import { toast } from 'react-toastify';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import BackButton from "../../compoents/backButton";
export const Course = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const renderedIntakes = new Set();

  const initialState = {
    name: "",
    primaryNumber: "",
    country: "",
    studentCode: "",
    studentId: "",
    // applicationFee: "",
    campus: "",
    inTake: "",
    courseFees: "",
    email: "",
  };

  const initialStateErrors = {
    name: { required: false },
    primaryNumber: { required: false },
    country: { required: false },
    studentCode: { required: false },
    // applicationFee: { required: false },
    studentId: { required: false },
    email: { required: false },
    campus: { required: false },
    inTake: { required: false },
    courseFees: { required: false },
  };

  const [status, setStatus] = useState([]);

  const [program, setProgram] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState(initialStateErrors);
  const pageSize = 5;
  const navigate = useNavigate();
  const [student, setStudent] = useState([]);
  const [input, setInput] = useState([]);
  const [inputs, setInputs] = useState(initialState);
  const [logs, setLogs] = useState([]);
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });
  useEffect(() => {
    getProgramDetails();
    getUniversityLogs();
    getAllStudentDetails();
    getAllApplicationsModuleDetails();
  }, []);
  useEffect(() => {
    getAllProgaramDetails();
  }, [pagination.from, pagination.to]);

  const getAllProgaramDetails = () => {
    const data = {
      limit: pageSize,

      page: pagination.from / pageSize + 1,
    };

    getallProgram(data)
      .then((res) => {
        setInput(res?.data?.result?.programList);
        setPagination({
          ...pagination,
          count: res?.data?.result?.programCount,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const getAllApplicationsModuleDetails = () => {
    const data = {
      limit: 10,
      page: pagination.from,
    };
    getFilterApplicationStatus(data)
      .then((res) => {
        console.log("ggg", res)
        setStatus(res?.data?.result?.statusList || []);
        setPagination({
          ...pagination,
          count: res?.data?.result?.statusCount || 0,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getUniversityLogs = () => {
    getSingleProgramLog(id)
      .then((res) => {
        setLogs(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllStudentDetails = () => {

    getallStudent()
      .then((res) => {
        setStudent(res?.data?.result);

      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handlePageChange = (event, page) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({ ...pagination, from: from, to: to });
  };

  const getProgramDetails = () => {
    getSingleProgram(id)
      .then((res) => {
        setProgram(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleValidation = (data) => {
    let error = { ...initialStateErrors };

    if (!data.name) error.name.required = true;
    if (!data.studentId) error.studentId.required = true;
    if (!data.primaryNumber) error.primaryNumber.required = true;
    if (!data.country) error.country.required = true;
    // if (!data.applicationFee) error.applicationFee.required = true;
    if (!data.studentCode) error.studentCode.required = true;
    if (!data.campus) error.campus.required = true;
    if (!data.inTake) error.inTake.required = true;
    if (!data.courseFees) error.courseFees.required = true;


    return error;
  };
  const handleInputs = (event) => {
    const { name, value } = event.target;

    setInputs((prevProgram) => {
      const updatedProgram = { ...prevProgram, [name]: value };

      if (name === "name") {
        const selectedStudent = student.find((u) => u.name === value);
        if (selectedStudent) {
          return {
            ...updatedProgram,
            studentId: selectedStudent._id,
            primaryNumber: selectedStudent.primaryNumber,
            country: selectedStudent.citizenship,
            studentCode: selectedStudent.studentCode,
            email: selectedStudent.email,
          };
        }
      }

      if (name === "campus") {
        const selectedCampus = program.campuses.find((u) => u.campus === value);
        if (selectedCampus) {
          return {
            ...updatedProgram,
            courseFees: selectedCampus.courseFees,
            inTake: selectedCampus.inTake,

          };
        }
      }

      return updatedProgram;
    });

    if (submitted) {
      const newError = handleValidation({ ...inputs, [name]: value });
      setErrors(newError);
    }
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
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(inputs);
    setErrors(newError);
    setSubmitted(true);
    if (handleErrors(newError)) {
      const data = {
        ...inputs,
        course: program.programTitle,
        universityName: program.universityName,
        clientName: program.clientName,
        applicationFee: program.applicationFee,
        uniCountry: program.country,
        status: status,
        // programId:program._id

      };
      saveApplication(data)
        .then((res) => {
          console.log(res);
          toast.success(res?.data?.message);
          navigate("/list_program");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };

  return (
    <>
      <div style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}>
        <Sidebar />
        <div className="content-wrapper">





          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12">
                <BackButton />
                <div className="border-0 rounded-0 bg-transparent ">
                  <div className="card border-0 rounded-0 mt-2">
                    <div
                      className="card rounded-0 border-0"
                      style={{
                        position: "relative",
                        overflow: "hidden",
                        height: "70vh",
                        maxWidth: "100%", // Ensure card doesn't overflow its container
                      }}
                    >
                      <img
                        src="https://iproedu.in/wp-content/uploads/2020/12/Study-abroad-consultancy.jpg"
                        className="card-img img-fluid rounded-0 border-0"
                        alt="university_bg_image"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          mixBlendMode: "multiply",
                        }}
                      />
                      <div
                        className="gradient-overlay"
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          width: "100%",
                          height: "200px",
                          background:
                            "linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))",
                          zIndex: 1,
                        }}
                      ></div>
                      <div
                        className="card-img-overlay align-self-end d-flex flex-column justify-content-end p-3"
                        style={{ position: "absolute", zIndex: 2 }}
                      >
                        <div className="border-0 rounded-0 bg-transparent text-center text-md-start">
                          <Link

                            to={{
                              pathname: "/ViewUniversity",
                              search: `?id=${program?.universityId}`,
                            }}
                          >
                            <img
                              src={
                                program?.universityLogo ||
                                "https://t3.ftcdn.net/jpg/04/91/76/62/360_F_491766294_h4j7LbW2YgfbNHhq7F8GboIc1XyBSEY5.jpg"
                              }
                              className="img-fluid rounded-circle img-thumbnail"
                              style={{ width: "9rem", height: "9rem" }}
                              alt="University Logo"
                            />
                          </Link>
                          <div className="card-body">
                            <div className="py-3 my-2">
                              <h5 className="h4 fw-bolder text-white d-flex align-items-end gap-2 text-capitalize">
                                {program?.programTitle || "Not Available"}
                              </h5>
                            </div>
                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start">
                              <p
                                className="text-white fw-semibold mb-1"
                                style={{ fontSize: "14px" }}
                              >
                                <span
                                  style={{
                                    color: "#fe5722",
                                    fontSize: "14px",
                                  }}
                                >
                                  <i className="fa fa-university nav-icon"></i>
                                </span>{" "}
                                {program?.universityName || "Not Available"}
                              </p>

                              <p
                                className="text-white fw-semibold mb-1"
                                style={{ fontSize: "14px" }}
                              >
                                <span
                                  style={{
                                    color: "#fe5722",
                                    fontSize: "14px",
                                  }}
                                >
                                  <i className="fa fa-globe nav-icon"></i>
                                </span>{" "}
                                {program?.country || "Not Available"}
                              </p>

                              <p
                                className="text-white fw-semibold mb-1"
                                style={{ fontSize: "14px" }}
                              >
                                <span
                                  style={{
                                    color: "#fe5722",
                                    fontSize: "14px",
                                  }}
                                >
                                  <i className="fa fa-book nav-icon"></i>
                                </span>{" "}
                                {program?.courseType || "Not Available"}
                              </p>

                              <p
                                className="text-white mb-1 fw-semibold"
                                style={{ fontSize: "14px" }}
                              >
                                <span
                                  style={{
                                    color: "#fe5722",
                                    fontSize: "14px",
                                  }}
                                >
                                  <i className="fa fa-percentage nav-icon"></i>
                                </span>{" "}
                                {program?.campuses[0]?.courseFees || "Not Available"}
                              </p>

                              <p
                                className="text-white mb-1 fw-semibold"
                                style={{ fontSize: "14px" }}
                              >
                                <span
                                  style={{
                                    color: "#fe5722",
                                    fontSize: "14px",
                                  }}
                                >
                                  <i className="fa fa-money-bill-wave nav-icon"></i>
                                </span>{" "}
                                {program?.finalValue ||
                                  program?.applicationFee ||
                                  "Not Available"}
                              </p>

                              <p
                                className="text-white mb-1 fw-semibold"
                                style={{ fontSize: "14px" }}
                              >
                                <span
                                  style={{
                                    color: "#fe5722",
                                    fontSize: "14px",
                                  }}
                                >
                                  <i className="fa fa-clock nav-icon"></i>
                                </span>{" "}
                                {program?.campuses?.[0]?.duration ||
                                  "Not Available"}
                              </p>

                              <p
                                className="text-white mb-1 fw-semibold"
                                style={{ fontSize: "14px" }}
                              >
                                <span
                                  style={{
                                    color: "#fe5722",
                                    fontSize: "14px",
                                  }}
                                >
                                  <i className="fa fa-tags nav-icon"></i>
                                </span>{" "}
                                {program?.discountedValue || "Not Available"}
                              </p>
                            </div>
                            <p className="text-center  float-end text-md-start ">
                              <button
                                className="btn btn-sm rounded-pill text-white text-Capitalize fw-semibold px-4 py-2"
                                data-bs-toggle="modal"
                                data-bs-target="#SAProgramApply"
                                style={{
                                  backgroundColor: "#fe5722",
                                  color: "#fff",
                                  fontSize: "12px",
                                }}
                              >
                                <i className="fa fa-paper-plane nav-icon"></i>{" "}
                                Apply Now
                              </button>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card-body bg-white rounded-bottom ">
                      <div className="container">
                        <div className="row ">
                          <div className="col-md-8">
                            <ul
                              className="nav nav-pills fs-9"
                              id="myTab"
                              role="tablist"
                            >
                              <li className="nav-item" role="presentation">
                                <a
                                  className="nav-link active text-Capitalize"
                                  id="home-tab"
                                  data-bs-toggle="tab"
                                  href="#tab-home"
                                  role="tab"
                                  aria-controls="tab-home"
                                  aria-selected="true"
                                >
                                  Admission Requirement
                                </a>
                              </li>
                              <li className="nav-item" role="presentation">
                                <a
                                  className="nav-link text-Capitalize"
                                  id="profile-tab"
                                  data-bs-toggle="tab"
                                  href="#tab-profile"
                                  role="tab"
                                  aria-controls="tab-profile"
                                  aria-selected="false"
                                  tabIndex="-1"
                                >
                                  Campus
                                </a>
                              </li>
                              <li className="nav-item" role="presentation">
                                <a
                                  className="nav-link text-Capitalize"
                                  id="contact-tab"
                                  data-bs-toggle="tab"
                                  href="#tab-contact"
                                  role="tab"
                                  aria-controls="tab-contact"
                                  aria-selected="false"
                                  tabIndex="-1"
                                >
                                  Intake
                                </a>
                              </li>
                              <li className="nav-item" role="presentation">
                                <a
                                  className="nav-link text-Capitalize"
                                  id="elt-tab"
                                  data-bs-toggle="tab"
                                  href="#elt"
                                  role="tab"
                                  aria-controls="elt"
                                  aria-selected="false"
                                  tabIndex="-1"
                                >
                                  ELT
                                </a>
                              </li>

                            </ul>

                            <div
                              className="tab-content mt-3"
                              id="myTabContent"
                              style={{
                                height: "350px",
                                overflowY: "auto",
                                scrollbarWidth: "none",
                              }}
                            >
                              <div
                                className="tab-pane fade show active"
                                id="tab-home"
                                role="tabpanel"
                                aria-labelledby="home-tab"
                              >
                                <p style={{ textAlign: "justify" }}>

                                  <CKEditor
                                    editor={ClassicEditor}
                                    data={program?.academicRequirement || "Not Available"}
                                    disabled={true}
                                    config={{
                                      toolbar: [],
                                    }}
                                  />
                                </p>
                              </div>
                              <div
                                className="tab-pane fade"
                                id="elt"
                                role="tabpanel"
                                aria-labelledby="elt-tab"
                              >
                                <div className="container">
                                  <div className="row">
                                    <div className="col my-3">
                                      <table className="table table-hover tabble-borderd table-primary table-responsive-sm">
                                        <tbody>
                                          <tr>
                                            <td>University Interview</td>
                                            <td>
                                              {program?.universityInterview || "Not Available"}
                                            </td>
                                            <td>
                                              <a
                                                href="#"
                                                className="btn btn-link btn-sm"
                                                style={{
                                                  color: "#fe5722",
                                                  fontSize: "11px",
                                                }}
                                              >
                                                Learn more
                                              </a>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>GRE/GMAT Requirement</td>
                                            <td>
                                              {program?.greGmatRequirement || "Not Available"}
                                              {program?.score || "Not Available"}
                                            </td>
                                            <td>
                                              <a
                                                href="#"
                                                className="btn btn-link btn-sm"
                                                style={{
                                                  color: "#fe5722",
                                                  fontSize: "11px",
                                                }}
                                              >
                                                Learn more
                                              </a>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>English Language Test</td>
                                            <td>
                                              {program?.englishLanguageTest || "Not Available"}
                                            </td>
                                            <td>
                                              <a
                                                href="#"
                                                className="btn btn-link btn-sm"
                                                style={{
                                                  color: "#fe5722",
                                                  fontSize: "11px",
                                                }}
                                              >
                                                Learn more
                                              </a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div
                                className="tab-pane fade"
                                id="tab-profile"
                                role="tabpanel"
                                aria-labelledby="profile-tab"
                              >
                                <div className="row">
                                  <div className="border-0 pt-3 px-4">
                                    <div className="row">
                                      {Array.isArray(program?.campuses) &&
                                        program.campuses.map(
                                          (campus, index) => (
                                            <div
                                              key={index}
                                              className="col-sm-6 col-md-3 mb-3"
                                            >
                                              <div
                                                className="card  border-0 border-start border-warning bg-danger border-5"
                                                style={{
                                                  width: "100%",
                                                  height: "auto",
                                                }}
                                              >
                                                <img
                                                  src={
                                                    program.universityLogo
                                                      ? program.universityLogo
                                                      : "https://www.logodesignworks.com/wp-content/uploads/2022/04/international-university-logo-design-.jpg"
                                                  }
                                                  className="card-img-top img-fluid rounded-pill mx-auto d-block mt-2 img-thumbnail"
                                                  style={{
                                                    width: "5rem",
                                                    height: "5rem",
                                                  }}
                                                  alt="Campus"
                                                />
                                                <div className="card-body">
                                                  <p className="card-text text-center">
                                                    {campus.campus || "Not Available"}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          )
                                        )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                className="tab-pane fade"
                                id="tab-contact"
                                role="tabpanel"
                                aria-labelledby="contact-tab"
                              >
                                <div className="row">
                                  <div className="border-0 pt-3 px-4">
                                    <div className="row">
                                      {Array.isArray(program?.campuses) &&
                                        program.campuses.map((campus, index) => {
                                          if (!renderedIntakes.has(campus?.inTake)) {
                                            renderedIntakes.add(campus?.inTake); // Add the unique inTake to the set
                                            return (
                                              <div key={index} className="col-sm-6 col-md-4 mb-3">
                                                <div className="container">
                                                  <div className="card rounded-1">
                                                    <div className="card-body bg-primary border-0">
                                                      <p className="text-center text-uppercase fw-semibold">
                                                        {campus?.inTake || "Not Available"}
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            );
                                          }
                                          return null; // Skip rendering duplicate inTake
                                        })}

                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>



                          <div className="col-lg-12">
                            <div className="row g-3">
                              <div className="d-flex flex-row align-items-start justify-content-between mb-3">
                                <div
                                  className=" text-decoration-underline text-Capitalize"
                                  style={{ color: "#fe5722" }}
                                >
                                  Programs
                                </div>
                              </div>

                              <div className="row g-3">
                                <div className="col-md-10">
                                  <div class="input-group mb-3">
                                    <input
                                      type="text"
                                      class="form-control"
                                      placeholder="Search Program..."
                                      aria-label="programsearch"
                                      aria-describedby="programsearch"
                                    />
                                    <span
                                      class="input-group-text bg-white border-start-0"
                                      id="programsearch"
                                    >
                                      <i class="fa fa-search nav-icon text-dark"></i>
                                    </span>
                                  </div>
                                </div>
                                <div className="col-md-2">
                                  <button
                                    type="button"
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasExample"
                                    aria-controls="offcanvasExample"
                                    class="btn btn-sm text-uppercase fw-semibold px-4 py-2"
                                    style={{
                                      backgroundColor: "#231f20",
                                      color: "#fff",
                                    }}
                                  >
                                    <i class="fa fa-filter nav-icon text-white"></i>
                                    &nbsp;&nbsp;Filter
                                  </button>

                                  <div
                                    class="offcanvas offcanvas-end"
                                    tabindex="-1"
                                    id="offcanvasExample"
                                    aria-labelledby="offcanvasExampleLabel"
                                  >
                                    <div class="offcanvas-header">
                                      <h5
                                        class="offcanvas-title"
                                        id="offcanvasExampleLabel"
                                      >
                                        Filter Program
                                      </h5>
                                      <button
                                        type="button"
                                        class="btn-close"
                                        data-bs-dismiss="offcanvas"
                                        aria-label="Close"
                                      ></button>
                                    </div>
                                    <div
                                      class="offcanvas-body"
                                      style={{ scrollbarWidth: "none" }}
                                    >
                                      <form>
                                        <div class="mb-3">
                                          <label
                                            for="country"
                                            class="form-label"
                                          >
                                            Country
                                          </label>
                                          <input
                                            type="text"
                                            class="form-control"
                                            id="country"
                                            placeholder="Example New York"
                                            style={{ fontSize: "12px" }}
                                          />
                                        </div>
                                        <div class="mb-3">
                                          <label for="state" class="form-label">
                                            Province/State
                                          </label>
                                          <input
                                            type="text"
                                            class="form-control"
                                            id="state"
                                            placeholder="Example Coventry"
                                            style={{ fontSize: "12px" }}
                                          />
                                        </div>
                                        <div class="mb-3">
                                          <label
                                            for="university"
                                            class="form-label"
                                          >
                                            University Name
                                          </label>
                                          <input
                                            type="text"
                                            class="form-control"
                                            id="university"
                                            placeholder="Example Standford University "
                                            style={{ fontSize: "12px" }}
                                          />
                                        </div>
                                        <div class="mb-3">
                                          <label for="fees" class="form-label">
                                            Fees
                                          </label>
                                          <input
                                            type="text"
                                            class="form-control"
                                            id="fees"
                                            placeholder="Example 12500"
                                            style={{ fontSize: "12px" }}
                                          />
                                        </div>
                                        <div class="mb-3">
                                          <label
                                            for="fieldofstudy"
                                            class="form-label"
                                          >
                                            Field Of Study
                                          </label>
                                          <input
                                            type="text"
                                            class="form-control"
                                            id="fieldofstudy"
                                            placeholder="Example Medicine"
                                            style={{ fontSize: "12px" }}
                                          />
                                        </div>
                                        <div class="mb-3">
                                          <label for="elt" class="form-label">
                                            ELT
                                          </label>
                                          <input
                                            type="text"
                                            class="form-control"
                                            id="elt"
                                            placeholder="Example Duo Lingo"
                                            style={{ fontSize: "12px" }}
                                          />
                                        </div>
                                        <div class="mb-3">
                                          <label
                                            for="coursetype"
                                            class="form-label"
                                          >
                                            Course Type
                                          </label>
                                          <input
                                            type="text"
                                            class="form-control"
                                            id="corsetype"
                                            placeholder="Example Game Designer"
                                            style={{ fontSize: "12px" }}
                                          />
                                        </div>
                                        <div class="mb-3">
                                          <label
                                            for="universityinterview"
                                            class="form-label"
                                          >
                                            University Interview
                                          </label>
                                          <input
                                            type="text"
                                            class="form-control"
                                            id="universityinterview"
                                            placeholder="Example..."
                                            style={{ fontSize: "12px" }}
                                          />
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {input?.map((data, index) => (
                                <div key={index} className="col-12 col-sm-6 col-md-4 mb-3">
                                  <div className="card mb-3 rounded-1 " style={{ fontSize: '12px' }}>
                                    <div className="row g-0 align-items-center">
                                      <div className="col-sm-4 d-flex justify-content-center align-items-center">
                                        <img
                                          src={
                                            data?.universityLogo
                                              ? data?.universityLogo
                                              : "https://img.freepik.com/premium-vector/university-campus-logo_1447-1790.jpg"
                                          }
                                          className="img-fluid rounded-circle img-thumbnail"
                                          alt="Course Image"
                                          style={{
                                            width: "4rem",
                                            height: "4rem",
                                          }}
                                        />
                                      </div>
                                      <div className="col-sm-8">
                                        <div className="card-body p-2">
                                          <h6 className="fw-bold mb-1 text-truncate">
                                            <i className="fas fa-university"></i>
                                            &nbsp;&nbsp;
                                            {data?.universityName || "Not Available"}
                                          </h6>
                                          <p className="card-text mb-1 text-truncate">
                                            <i className="fas fa-book"></i>
                                            &nbsp;&nbsp;
                                            {data?.programTitle || "Not Available"}
                                          </p>
                                          <p className="card-text text-truncate">
                                            <i className="fas fa-calendar-alt"></i>
                                            &nbsp;&nbsp;
                                            {data?.duration || "Not Available"}
                                          </p>
                                          <button
                                            className="btn rounded-pill text-white fw-semibold btn-sm text-capitalize px-3 py-1 float-end"
                                            style={{
                                              backgroundColor: "#fe5722",
                                              fontSize: "12px",
                                            }}
                                          >
                                            Apply Now
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}



                              <div className="float-end my-2 p-2 end">
                                <Pagination
                                  count={Math.ceil(pagination.count / pageSize)}
                                  onChange={handlePageChange}
                                  variant="outlined"
                                  shape="rounded"
                                  color="primary"
                                />
                              </div>
                            </div>
                            <nav aria-label="breadcrumb">
                              <ol className="breadcrumb float-end">
                                <li className="breadcrumb-item">
                                  <Link to="/dashBoard" target="_self" className="text-decoration-none text-capitalize">
                                    Dashboard
                                  </Link>
                                </li>
                                <li className="breadcrumb-item">
                                  <Link to="/list_program" className="text-decoration-none text-capitalize">ListProgram</Link>
                                </li>

                                <li className="breadcrumb-item">
                                  <Link
                                    className="text-decoration-none text-capitalize"
                                    to={{
                                      pathname: "/edit_program",
                                      search: `?id=${id}`,
                                    }}
                                  >
                                    EditProgram
                                  </Link>
                                </li>
                              </ol>
                            </nav>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid my-2">
            <div className="row ">
              <div className="col-12 col-lg-7 col-auto">
                <ul className="list-unstyled">
                  {logs.map((log, index) => (
                    <li className="mb-4 position-relative" key={index}>
                      <div className="row align-items-start g-0">

                        <div className="col-1 d-flex justify-content-center align-items-center">
                          <div className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center" style={{ width: '2rem', height: '2rem' }}>
                            <i className="fas fa-check" />
                          </div>
                        </div>
                        <div className="col-4 text-center">
                          <p className="mb-1 fw-semibold text-muted">{new Date(log.createdOn).toLocaleString()}</p>
                          <p className="mb-0 text-muted">Changed by:<strong>{log.userType || "Unknown User"}</strong></p>
                        </div>

                        <div className="col-12">
                          {log.changes.map((change, changeIndex) => (
                            <div key={changeIndex} className="mb-3">
                              <div className="bg-success text-white rounded-3 p-2">
                                <h6 className="mb-1"><i className="fas fa-tag "> Label Name --</i> {change.field}</h6>
                                <p className="mb-0"> <i className="fa fa-database "> New Data --</i>  {change.newValue}</p>
                              </div>
                              <div className="bg-danger text-white rounded-3 p-2 mt-2">
                                <h6 className="mb-1"><i className="fas fa-tag "> Label Name --</i>{change.field}</h6>
                                <p className="mb-0"><i className="fa fa-database "> Old Data --</i>{change.oldValue}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="position-absolute top-0 start-0 translate-middle-x" style={{ width: 2, height: '100%', backgroundColor: '#007bff' }} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div
          class="modal fade"
          id="SAProgramApply"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg modal-fullscreen-sm-down">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  Apply Program
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="row gy-3 gx-4 mb-3">
                    <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label class="form-label">Student Name</label>
                      <select
                        class="form-select rounded-1"
                        aria-label="Default select example"
                        style={{ fontSize: "12px" }}
                        onChange={handleInputs}
                        name="name"
                      >
                        <option selected>Open this select menu</option>
                        {student?.map((data, index) => (
                          <option id={index} value={data.name}>{data.name}</option>
                        ))}
                      </select>
                      {errors.name.required ? (
                        <span className="text-danger form-text profile_error">
                          This field is required.
                        </span>
                      ) : null}
                    </div>

                    <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label class="form-label">Country</label>
                      <input
                        type="text"
                        name="country"
                        value={inputs.country || ''}
                        onChange={handleInputs}
                        class="form-control text-uppercase rounded-1"
                        placeholder="Example John Doe"
                        style={{ fontSize: "12px" }}
                      />
                      {errors.country.required ? (
                        <span className="text-danger form-text profile_error">
                          This field is required.
                        </span>
                      ) : null}
                    </div>
                    <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12 d-none">
                      <label class="form-label">Email</label>
                      <input
                        type="type"
                        name="email"
                        value={inputs.email || ''}
                        onChange={handleInputs}
                        class="form-control text-uppercase rounded-1"
                        placeholder="Example John Doe"
                        style={{ fontSize: "12px" }}
                      />
                      {errors.email.required ? (
                        <span className="text-danger form-text profile_error">
                          This field is required.
                        </span>
                      ) : null}
                    </div>

                    <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12 d-none ">
                      <label class="form-label">studnet Id</label>
                      <input
                        type="text"
                        name="studentId"
                        value={inputs?.studentId}
                        onChange={handleInputs}
                        class="form-control rounded-1"
                        placeholder="Example ABC123EFG"
                        style={{ fontSize: "12px" }}
                      />
                      {errors.studentId.required ? (
                        <span className="text-danger form-text profile_error">
                          This field is required.
                        </span>
                      ) : null}
                    </div>
                    <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12 d-none">
                      <label class="form-label">studnet Code</label>
                      <input
                        type="text"
                        name="studentCode"
                        value={inputs?.studentCode}
                        onChange={handleInputs}
                        class="form-control rounded-1"
                        placeholder="Example ABC123EFG"
                        style={{ fontSize: "12px" }}
                      />
                      {errors.studentCode.required ? (
                        <span className="text-danger form-text profile_error">
                          This field is required.
                        </span>
                      ) : null}
                    </div>

                    <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label class="form-label">Mobile Number</label>
                      <input
                        type="text"
                        name="primaryNumber"
                        value={inputs?.primaryNumber}
                        onChange={handleInputs}
                        class="form-control rounded-1"
                        placeholder="Example United Kingdom"
                        style={{ fontSize: "12px" }}
                      />
                      {errors.primaryNumber.required ? (
                        <span className="text-danger form-text profile_error">
                          This field is required.
                        </span>
                      ) : null}
                    </div>


                    <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label class="form-label">campus</label>
                      <select
                        class="form-select rounded-1"
                        aria-label="Default select example"
                        style={{ fontSize: "12px" }}
                        onChange={handleInputs}
                        name="campus"
                      >
                        <option selected>Open this select menu</option>
                        {Array.isArray(program?.campuses) &&
                          program.campuses.map(
                            (campus, index) => (
                              <option id={index} value={campus.campus}>{campus.campus}</option>
                            ))}
                      </select>
                      {errors.campus.required ? (
                        <span className="text-danger form-text profile_error">
                          This field is required.
                        </span>
                      ) : null}
                    </div>

                    <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label class="form-label">InTake</label>
                      <select
                        class="form-select rounded-1"
                        aria-label="Default select example"
                        style={{ fontSize: "12px" }}
                        onChange={handleInputs}
                        value={inputs?.inTake}
                        name="inTake"
                      >
                        <option selected>Open this select menu</option>
                        {Array.isArray(program?.campuses) &&
                          program.campuses.map(
                            (intake, index) => (
                              <option id={index} value={intake.inTake}>{intake.inTake}</option>
                            ))}
                      </select>
                      {errors.inTake.required ? (
                        <span className="text-danger form-text profile_error">
                          This field is required.
                        </span>
                      ) : null}
                    </div>

                    <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                      <label class="form-label">Course Fees</label>
                      <select
                        class="form-select rounded-1"
                        aria-label="Default select example"
                        style={{ fontSize: "12px" }}
                        onChange={handleInputs}
                        value={inputs?.courseFees}
                        name="courseFees"
                      >
                        <option selected>Open this select menu</option>
                        {Array.isArray(program?.campuses) &&
                          program.campuses.map(
                            (intake, index) => (
                              <option id={index} value={intake.courseFees}>{intake.courseFees}</option>
                            ))}
                      </select>
                      {errors.courseFees.required ? (
                        <span className="text-danger form-text profile_error">
                          This field is required.
                        </span>
                      ) : null}
                    </div>

                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn  px-4 py-2 text-uppercase border-0 rounded-1 fw-semibold "
                        data-bs-dismiss="modal"
                        style={{
                          fontSize: "12px",
                          backgroundColor: "#231f20",
                          color: "#fff",
                        }}
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        class="btn px-4 py-2 text-uppercase border-0 rounded-1 fw-semibold "
                        style={{
                          fontSize: "12px",
                          backgroundColor: "#fe5722",
                          color: "#fff",
                        }}
                      >
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
    </>
  );
};

export default Course;
