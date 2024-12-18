import { RiCoinsFill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import { IoMdRocket } from "react-icons/io";
import { IoMailUnread } from "react-icons/io5";
import banner from "../../styles/Assets/Student/EventBanner.png";
import { getSingleUniversity } from "../../api/university";
import { getSuperAdminForSearch } from "../../api/superAdmin";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Pagination,
  backdropClasses,
  radioClasses,
} from "@mui/material";
import { getSingleUniversityCommission } from "../../api/commission";
import { getFilterProgram, getProgramUniversity } from "../../api/Program";
import Sidebar from "../../compoents/StudentSidebar";
import { FaUniversity } from "react-icons/fa";
import { FaGlobeAmericas } from "react-icons/fa";
import { RichTextEditor } from "@mantine/rte";

const ViewUniversity = () => {
  const initialStateInputs = {
    inTake: "",
    programTitle: "",
    applicationFee: "",
    courseType: "",
  };

  const location = useLocation();
  const universityId = new URLSearchParams(location.search).get("id");
  var searchValue = location.state;
  const [link, setLink] = useState("");
  const [inputs, setInputs] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(false);
  const [university, setUniversity] = useState();
  const [commission, setCommission] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);

  const [program, setProgram] = useState([]);
  const pageSize = 5;
  const search = useRef(null);
  const [filter, setFilter] = useState(false);
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  useEffect(() => {
    getUniversityDetails();

    getUniversityCommissionDetails();
    // filter ? filterProgramList() : getAllProgram();
  }, [universityId, pagination.from, pagination.to]);

  useEffect(() => {
    if (search.current) {
      search.current.focus();
    }
  }, []);

  useEffect(() => {
    if (searchValue) {
      search.current.value = searchValue.substring(1);
      handleSearch();
    }
  }, [searchValue]);

  const getUniversityCommissionDetails = () => {
    getSingleUniversityCommission(universityId)
      .then((res) => {
        setCommission(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getUniversityDetails = () => {
    getSingleUniversity(universityId)
      .then((res) => {
        setUniversity(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllProgram();
  }, [universityId]);

  const getAllProgram = () => {
    const data = {
      limit: pageSize,
      page: pagination.from,
      universityId: universityId,
    };
    getProgramUniversity(universityId, data)
      .then((res) => {
        console.log("API Response:", res); // Debugging API response
        if (res?.data?.result && Array.isArray(res.data.result)) {
          setProgram(res.data.result);
          setPagination({
            ...pagination,
            count: res?.data?.result?.length,
          });
        } else {
          console.warn("Unexpected response structure:", res);
        }
      })
      .catch((err) => {
        console.error("Error fetching programs:", err);
      });
  };
  const handleInputs = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };
  const filterProgramList = (event) => {
    event?.preventDefault();
    setFilter(true);
    const data = {
      inTake: inputs.inTake,
      programTitle: inputs.programTitle,
      applicationFee: inputs.applicationFee,
      courseFee: inputs.courseFee,
      limit: 10,
      page: pagination.from,
    };
    getFilterProgram(data)
      .then((res) => {
        setProgram(res?.data?.result?.programList);
        setPagination({
          ...pagination,
          count: res?.data?.result?.programCount,
        });
        closeFilterPopup();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeFilterPopup = () => {
    setOpenFilter(false);
  };
  const resetFilter = () => {
     setFilter(false);
    // setInputs(initialStateInputs);
    getAllProgram();
  };

  const handleInputsearch = (event) => {
    if (event.key === "Enter") {
      search.current.blur();
      handleSearch();
    }
  };

  const handleSearch = (event) => {
    const data = search.current.value;
    event?.preventDefault();
    getSuperAdminForSearch(data)
      .then((res) => {
        const programList = res?.data?.result?.programList;
        setProgram(programList);
        const result = programList.length ? "programs" : "";
        setLink(result);
        setData(result === "" ? true : false);
      })
      .catch((err) => console.log(err));
  };
  const handlePageChange = (event, page) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({ ...pagination, from: from, to: to });
  };

  //   event?.preventDefault();
  //   setFilter(true);
  //   const data = {
  //     universityName: university?.universityName,
  //     universityId: university?._id,
  //     limit: 10,
  //     page: pagination.from,
  //   };
  //   getUniversityProgram(data)
  //     .then((res) => {
  //       setProgram(res?.data?.result?.programList);
  //       setPagination({
  //         ...pagination,
  //         count: res?.data?.result?.programCount,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  return (
    <>
      <div>
        <Sidebar />

        <div
          className="content-wrapper"
          style={{ fontFamily: "Plus Jakarta Sans", fontSize: "13px" }}
        >
          <div className="content-header">
            <div className="container ">
              <div className="row">
                <div className="col-xl-12">
                  <div className="card border-0 rounded-0 ">
                    <div
                      className="card rounded-0 border-0  "
                      style={{
                        position: "relative",
                        overflow: "hidden",
                        height: "70vh",
                      }}
                    >
                      <img
                        src={university?.banner?university?.banner:"https://www.southernliving.com/thmb/j4Qkk6s0y2DDN8wEsyq4OoAgzZc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/exterior-9299-min-526c3f4d70ed4403970991fcc99a0ff5.jpg"}
                        className="card-img img-fluid rounded-0 border-0"
                        alt="university_bg_image"
                        style={{
                          width: "100%",
                          height: "100%", // Ensure the image covers the entire card height
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
                          height: "200px", // Height of the gradient
                          background:
                            "linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))",
                          zIndex: 1,
                        }}
                      ></div>
                      <div
                        className="card-img-overlay align-self-end"
                        style={{ position: "absolute", zIndex: 2 }}
                      >
                        <div className="border-0 rounded-0 bg-transparent">
                          <img
                            src={
                              university?.universityLogo
                                ? university?.universityLogo
                                : "https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png"
                            }
                            className="img-fluid rounded-circle img-thumbnail"
                            style={{ width: "9rem", height: "9rem" }}
                            alt="University Logo"
                          />
                          <div className="card-body">
                            <div className="py-3 my-2">
                              <h5 className="h1 fw-bolder text-white d-flex align-items-center gap-2 text-capitalize">
                                {university?.universityName}
                              </h5>
                            </div>
                            <div className="d-flex flex-row justify-content-between align-items-start">
                              <p
                                className="text-white fw-semibold mb-1"
                                style={{ fontSize: "14px" }}
                              >
                                <span
                                  style={{ color: "#fe5722", fontSize: "14px" }}
                                >
                                  <i className="fa fa-globe nav-icon"></i>
                                </span>{" "}
                                {university?.country}
                              </p>

                              <p
                                className="text-white fw-semibold mb-1"
                                style={{ fontSize: "14px" }}
                              >
                                <span
                                  style={{ color: "#fe5722", fontSize: "14px" }}
                                >
                                  <i className="fa fa-calendar nav-icon"></i>
                                </span>{" "}
                                {university?.founded}
                              </p>
                              <p
                                className="text-white fw-semibold mb-1"
                                style={{ fontSize: "14px" }}
                              >
                                <span
                                  style={{ color: "#fe5722", fontSize: "14px" }}
                                >
                                  <i className="fa fa-building nav-icon"></i>
                                </span>{" "}
                                {university?.institutionType}
                              </p>

                              <p
                                className="text-white mb-1 fw-semibold"
                                style={{ fontSize: "14px" }}
                              >
                                <span
                                  style={{ color: "#fe5722", fontSize: "14px" }}
                                >
                                  <i className="fa fa-trophy nav-icon"></i>
                                </span>
                                {university?.ranking}
                              </p>

                              <Link
                                to={university?.website}
                                className="text-decoration-none text-white fw-semibold mb-1"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ fontSize: "14px" }}
                              >
                                <span
                                  style={{ color: "#fe5722", fontSize: "14px" }}
                                >
                                  <i className="fa fa-link nav-icon"></i>
                                </span>{" "}
                                {university?.website}
                              </Link>

                              <p
                                className="text-white mb-1 fw-semibold"
                                style={{ fontSize: "14px" }}
                              >
                                <span
                                  style={{ color: "#fe5722", fontSize: "14px" }}
                                >
                                  <i class="fa fa-clock nav-icon"></i>
                                </span>
                                {university?.offerTAT}
                              </p>

                              <p
                                className="text-white mb-1 fw-semibold"
                                style={{ fontSize: "14px" }}
                              >
                               &nbsp; {university?.averageFees}{" "}
                                <i class="fa  nav-icon"></i>
                              </p>
                             
                             
                            </div>
                            <p className="text-center  float-end text-md-start ">
                                <button
                                  className="btn btn-sm rounded-pill text-white text-Capitalize fw-semibold px-4 py-2"
                                  data-bs-toggle="modal" data-bs-target="#StudentProgramApply"
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
                    <div className="card-body  ">
                      <div className="container">
                        <div className="row ">
                          <div className="col-md-8">
                            <ul
                              class="nav nav-pills fs-9"
                              id="myTab"
                              role="tablist"
                            >
                              <li class="nav-item" role="presentation">
                                <a
                                  class="nav-link active text-Capitalize "
                                  id="home-tab"
                                  data-bs-toggle="tab"
                                  href="#tab-home"
                                  role="tab"
                                  aria-controls="tab-home"
                                  aria-selected="true"
                                >
                                  About
                                </a>
                              </li>
                              <li class="nav-item" role="presentation">
                                <a
                                  class="nav-link text-Capitalize "
                                  id="profile-tab"
                                  data-bs-toggle="tab"
                                  href="#tab-profile"
                                  role="tab"
                                  aria-controls="tab-profile"
                                  aria-selected="false"
                                  tabindex="-1"
                                >
                                  Campus
                                </a>
                              </li>
                              <li class="nav-item" role="presentation">
                                <a
                                  class="nav-link   text-Capitalize "
                                  id="profile-tab"
                                  data-bs-toggle="tab"
                                  href="#tab-populatCourse"
                                  role="tab"
                                  aria-controls="tab-profile"
                                  aria-selected="false"
                                  tabindex="-1"
                                >
                                  Categories
                                </a>
                              </li>
                              <li class="nav-item" role="presentation">
                                <a
                                  class="nav-link text-Capitalize "
                                  id="profile-tab"
                                  data-bs-toggle="tab"
                                  href="#tab-Course"
                                  role="tab"
                                  aria-controls="tab-profile"
                                  aria-selected="false"
                                  tabindex="-1"
                                >
                                  Course
                                </a>
                              </li>
                             
                              <li class="nav-item" role="presentation">
                                <a
                                  class="nav-link text-Capitalize "
                                  id="home-review-tab"
                                  data-bs-toggle="tab"
                                  href="#tab-Review"
                                  role="tab"
                                  aria-controls="tab-home"
                                  aria-selected="true"
                                >
                                  Requirement
                                </a>
                              </li>
                            </ul>
                            <div
                              class="tab-content mt-3"
                              id="myTabContent"
                              style={{
                                height: "350px",
                                overflowY: "auto",
                                scrollbarWidth: "none",
                              }}
                            >
                              <div
                                class="tab-pane fade active show"
                                id="tab-home"
                                role="tabpanel"
                                aria-labelledby="home-tab"
                              >
                                <p
                                  className="clearfix"
                                  style={{ textAlign: "justify" }}
                                >
                                  <RichTextEditor
                                    value={university?.about}
                                    readOnly
                                  />{" "}
                                </p>
                              </div>
                              <div
                                class="tab-pane fade"
                                id="tab-profile"
                                role="tabpanel"
                                aria-labelledby="profile-tab"
                              >
                                <div className="row">
                                  {Array.isArray(university?.campuses) &&
                                    university.campuses.map((data, index) => (
                                      <div key={index} className="col-md-3">
                                        <div className="card text-bg-light  border-0   border-start   border-5 border-danger  align-items-center">
                                          <div className="align-self-center mt-2 mb-0">
                                            <img
                                              src={
                                                university?.universityLogo
                                                  ? university?.universityLogo
                                                  : "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg"
                                              }
                                              className="card-img-top img-fluid rounded-circle object-fit-cover mx-auto d-block mb-0"
                                              alt="img"
                                              style={{
                                                width: "4rem",
                                                height: "4rem",
                                              }}
                                            />
                                          </div>

                                          <div className="card-body">
                                            <p className="card-text text-center mb-1">
                                              {data?.lga}
                                            </p>
                                            <p className="card-text text-center">
                                              {data?.state}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                </div>
                              </div>
                              <div
                                className="tab-pane fade"
                                id="tab-populatCourse"
                                role="tabpanel"
                                aria-labelledby="profile-tab"
                              >
                                <div className="container">
                                  <div className="row">
                                    {Array.isArray(
                                      university?.popularCategories
                                    ) &&
                                      university.popularCategories.map(
                                        (category, index) => (
                                          <div
                                            key={index}
                                            className="col-4 mb-3" // This ensures each card takes up 4 out of 12 columns, allowing 3 cards per row
                                          >
                                            <div
                                              className="card border-0 text-white"
                                              style={{
                                                backgroundColor:
                                                  "rgba(0,0,0,0.4)",
                                              }}
                                            >
                                              <img
                                                src="https://imageio.forbes.com/specials-images/imageserve/61d52d4e3a76ed81ac034ea8/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds"
                                                className="card-img img-fluid object-fit-cover"
                                                alt="Popular category"
                                                style={{
                                                  mixBlendMode: "multiply",
                                                }}
                                              />
                                              <div className="card-img-overlay d-flex align-items-center justify-content-center">
                                                <p className="text-center">
                                                  {category}
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        )
                                      )}
                                  </div>
                                </div>
                              </div>

                              <div
                                class="tab-pane fade"
                                id="tab-Course"
                                role="tabpanel"
                                aria-labelledby="profile-tab"
                              >
                                <div className="row">
                                  <div className=" col-md-12 pt-3 px-5">
                                    <div className="row">
                                      {Array.isArray(university?.courseType) &&
                                        university.courseType.map(
                                          (courseType, index) => (
                                            <div
                                              key={index}
                                              className="card card-body  border-0   border-top   border-5 border-warning  mb-2"
                                            >
                                              <span className="text-dark fw-bolder d-flex align-items-center justify-content-center gap-2 text-Capitalize">
                                                {courseType}
                                              </span>
                                            </div>
                                          )
                                        )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            

                              <div
                                class="tab-pane fade "
                                id="tab-Review"
                                role="tabpanel"
                                aria-labelledby="home-tab"
                              >
                                <p
                                  className="clearfix"
                                  style={{ textAlign: "justify" }}
                                >
                                  <RichTextEditor
                                    value={university?.admissionRequirement}
                                    readOnly
                                  />
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div
                              className="alert alert-primary text-center fw-semibold border-0   text-Capitalize "
                              role="alert"
                            >
                              Intakes
                            </div>

                            <div className="card card-body">
                              <h5 className="text-capitalize text-center">
                                Program Intakes
                              </h5>
                              {Array.isArray(university?.inTake) &&
                                        university.inTake.map(
                                          (inTake, index) => (
                              <div key={index}
                                className="accordion accordion-flush"
                                id="programIntakesAccordion"
                                style={{ fontSize: "12px" }}
                              >
                                <div className="accordion-item">
                                  <h2 className="accordion-header">
                                    <button
                                      className="accordion-button collapsed btn-sm"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#flush-collapseOpen"
                                      aria-expanded="false"
                                      aria-controls="flush-collapseOpen"
                                    >
                                     {inTake}
                                    </button>
                                  </h2>
                                 
                                </div>
                              
                              </div>
                                          ))}
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
                                  <form onSubmit={handleSearch}>
                                    <div class="input-group mb-3">
                                      <input
                                        type="text"
                                        ref={search}
                                        onChange={handleInputsearch}
                                        class="form-control"
                                        placeholder="Search Program..."
                                        aria-label="programsearch"
                                        aria-describedby="programsearch"
                                      />
                                      <button
                                        class="input-group-text bg-white border-start-0"
                                        type="submit"
                                        id="programsearch"
                                      >
                                        <i class="fa fa-search nav-icon text-dark"></i>
                                      </button>
                                    </div>
                                  </form>
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
                                            for="duration"
                                            class="form-label"
                                          >
                                            Program Title
                                          </label>
                                          <input
                                            type="text"
                                            class="form-control"
                                            id="duration"
                                            name="programTitle"
                                            onChange={handleInputs}
                                            placeholder="Example Coventry"
                                            style={{ fontSize: "12px" }}
                                          />
                                        </div>

                                        <div class="mb-3">
                                          <label
                                            for="university"
                                            class="form-label"
                                          >
                                            inTake
                                          </label>
                                          <input
                                            type="text"
                                            name="inTake"
                                            onChange={handleInputs}
                                            class="form-control"
                                            id="university"
                                            placeholder="Example Standford University "
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
                                            name="courseType"
                                            onChange={handleInputs}
                                            id="corsetype"
                                            placeholder="Example Game Designer"
                                            style={{ fontSize: "12px" }}
                                          />
                                        </div>
                                        <div class="mb-3">
                                          <label
                                            for="coursetype"
                                            class="form-label"
                                          >
                                            Application Fee
                                          </label>
                                          <input
                                            type="text"
                                            class="form-control"
                                            name="applicationFee"
                                            onChange={handleInputs}
                                            id="corsetype"
                                            placeholder="Example Game Designer"
                                            style={{ fontSize: "12px" }}
                                          />
                                        </div>
                                        <button
                                          data-bs-dismiss="offcanvas"
                                          type="submit"
                                          onClick={filterProgramList}
                                          className="btn btn-save border-0 text-white fw-semibold text-uppercase rounded-pill px-3 py-2 float-right mx-2"
                                          style={{
                                            backgroundColor: "#fe5722",
                                            fontSize: "14px",
                                          }}
                                        >
                                          Apply
                                        </button>
                                        <button
                                          data-bs-dismiss="offcanvas"
                                          className="btn btn-cancel border-0 fw-semibold text-uppercase rounded-pill px-3 py-2 text-white float-right bg"
                                          style={{
                                            backgroundColor: "#0f2239",
                                            fontSize: "14px",
                                          }}
                                          onClick={resetFilter}
                                        >
                                          Reset
                                        </button>
                                       
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            {Array.isArray(program) && program.length > 0 ? (
                              program.map((data, index) => (
                                <div key={index} className="col-md-4">
                                  <div
                                    class="card border-0 "
                                    style={{
                                      backgroundColor: "rgba(0,0,0,0.5)",
                                      height: "10rem",
                                    }}
                                  >
                                    <img
                                      src={
                                        data?.universityLogo
                                          ? data?.universityLogo
                                          : "https://www.southernliving.com/thmb/j4Qkk6s0y2DDN8wEsyq4OoAgzZc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/exterior-9299-min-526c3f4d70ed4403970991fcc99a0ff5.jpg"
                                      }
                                      class="card-img img-fluid"
                                      alt="..."
                                      style={{
                                        mixBlendMode: "multiply",
                                        height: "10rem",
                                      }}
                                    />
                                    <div class="card-img-overlay  text-white">
                                      <h6
                                        className="university-name mb-2 lh-sm"
                                        style={{
                                          fontWeight: "bold",
                                        }}
                                      >
                                        <i className="fa fa-book nav-icon text-white "></i>{" "}
                                        {data?.programTitle || "Program Title"}
                                      </h6>
                                      <p
                                        className="course-name mb-2 lh-sm"
                                        style={{ fontSize: "12px" }}
                                      >
                                        <i className="fa fa-university nav-icon text-white "></i>{" "}
                                        {data?.universityName ||
                                          "University Name"}
                                      </p>
                                      <p
                                        className="duration mb-2 lh-sm"
                                        style={{ fontSize: "12px" }}
                                      >
                                        <i className="fa fa-credit-card nav-icon text-white"></i>{" "}
                                        {data?.applicationFee || "Null"}
                                      </p>

                                      <p
                                        className="duration mb-2 lh-sm"
                                        style={{ fontSize: "12px" }}
                                      >
                                        <i className="fa fa-clock nav-icon text-white"></i>{" "}
                                        {data?.courseType || "Null"}
                                      </p>

                                      <button
                                        className="btn btn-sm rounded-pill text-white fw-semibold px-4 "
                                        style={{
                                          backgroundColor: "#fe5722",
                                          fontSize: "12px",
                                        }}
                                      >
                                        <i className="fa fa-paper-plane nav-icon text-white "></i>{" "}
                                        Apply
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p>No programs available.</p>
                            )}
                          </div>
                          <div className="float-right my-2">
                            <Pagination
                              count={Math.ceil(pagination.count / pageSize)}
                              onChange={handlePageChange}
                              variant="outlined"
                              shape="rounded"
                              color="primary"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal fade" id="StudentProgramApply" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-fullscreen-sm-down">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Apply Program</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
       <form>
        <div className="row gy-3 gx-4 mb-3">

        <div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
  <label  class="form-label">Student Name</label>
  <input type="text" name='text' class="form-control rounded-1"  placeholder="Example John Doe" style={{fontSize:'12px'}}/>
</div>

<div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
  <label  class="form-label">DOB</label>
  <input type="date" name='text' class="form-control text-uppercase rounded-1"  placeholder="Example John Doe" style={{fontSize:'12px'}}/>
</div>

<div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
  <label  class="form-label">Passport No</label>
  <input type="text" name='passportno' class="form-control rounded-1"  placeholder="Example ABC123EFG" style={{fontSize:'12px'}}/>
</div>

<div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
  <label  class="form-label">Country</label>
  <input type="text" name='country' class="form-control rounded-1"  placeholder="Example United Kingdom" style={{fontSize:'12px'}}/>
</div>

<div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
  <label  class="form-label">Email</label>
  <input type="text" name='email' class="form-control rounded-1"  placeholder="Example johndoe123@gmail.com" style={{fontSize:'12px'}}/>
</div>

<div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
  <label  class="form-label">Primary No</label>
  <input type="number" name='primaryno' class="form-control rounded-1"  placeholder="Example 123-4567-890" style={{fontSize:'12px'}}/>
</div>

<div class="col-xl-4 col-lg-6 col-md-6 col-sm-12">
  <label  class="form-label">WhatsApp No</label>
  <input type="number" name='whatsappno' class="form-control rounded-1"  placeholder="Example 123-4567-890" style={{fontSize:'12px'}}/>
</div>
        </div>
  

       </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn  px-4 py-2 text-uppercase border-0 rounded-1 fw-semibold " data-bs-dismiss="modal" style={{fontSize:'12px',backgroundColor:'#231f20',color:'#fff'}}>Close</button>
        <button type="button" class="btn px-4 py-2 text-uppercase border-0 rounded-1 fw-semibold " style={{fontSize:'12px',backgroundColor:'#fe5722',color:'#fff'}}>Submit</button>
      </div>
    </div>
  </div>
</div>
      </div>
    </>
  );
};
export default ViewUniversity;
