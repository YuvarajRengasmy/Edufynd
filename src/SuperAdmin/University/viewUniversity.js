import { RiCoinsFill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { IoMdRocket } from "react-icons/io";
import { IoMailUnread } from "react-icons/io5";
import banner from "../../styles/Assets/Student/EventBanner.png";
import { getSingleUniversity, UniversityProgram } from "../../api/university";
import { getallProgram, getUniversityProgram } from "../../api/Program";
import Sidebar from "../../compoents/sidebar";
import { FaUniversity } from "react-icons/fa";
import { FaGlobeAmericas } from "react-icons/fa";
const UserProfile = () => {
  const location = useLocation();
  const universityId = new URLSearchParams(location.search).get("id");
  const [university, setUniversity] = useState();
  const [program, setProgram] = useState([]);
  const pageSize = 5;
  const [filter, setFilter] = useState(false);
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  useEffect(() => {
    getUniversityDetails();
    filter ? filterProgramList() : getAllProgram();
  }, [universityId, pagination.from, pagination.to]);

  const getUniversityDetails = () => {
    getSingleUniversity(universityId)
      .then((res) => {
        setUniversity(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllProgram = () => {
    const data = {
      limit: pageSize,
      page: pagination.from,
      universityId: universityId,
    };

    getallProgram(data)
      .then((res) => {
        console.log(res);
        setProgram(res?.data?.result?.programList);
        setPagination({
          ...pagination,
          count: res?.data?.result?.programCount,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filterProgramList = (event) => {
    event?.preventDefault();
    setFilter(true);
    const data = {
      universityName: university?.universityName,
      universityId: university?._id,
      limit: 10,
      page: pagination.from,
    };
    getUniversityProgram(data)
      .then((res) => {
        setProgram(res?.data?.result?.programList);
        setPagination({
          ...pagination,
          count: res?.data?.result?.programCount,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
                        src="https://www.southernliving.com/thmb/j4Qkk6s0y2DDN8wEsyq4OoAgzZc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/exterior-9299-min-526c3f4d70ed4403970991fcc99a0ff5.jpg"
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
                                Avg &nbsp; {university?.averageFees}{" "}
                                <i class="fa  nav-icon"></i>
                              </p>
                              {/* <div className="text-white mb-1 fw-semibold" style={{ fontSize: '14px' }}>
                <span style={{ color: '#fe5722', fontSize: '14px' }}>
                  <i className="fa fa-envelope nav-icon"></i>
                </span>{' '}
                {university?.email}
              </div> */}
                            </div>
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
                                  id="profile-tab"
                                  data-bs-toggle="tab"
                                  href="#Payment-course"
                                  role="tab"
                                  aria-controls="tab-profile"
                                  aria-selected="false"
                                  tabindex="-1"
                                >
                                  Payment Method
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
                                  {university?.about}{" "}
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
                                              style={{width:'4rem',height:'4rem'}}
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
                                class="tab-pane fade"
                                id="Payment-course"
                                role="tabpanel"
                                aria-labelledby="profile-tab"
                              >
                                <div className="row">
                                  <div className=" col-sm-12 pt-3 px-5">
                                    <div className="row">
                                      <div className="card    shadow-sm mt-3">
                                        <div className="card-body">
                                          <div className="row gy-3 py-2">
                                            <div className="col-sm-6">
                                              <div className=" fw-light text-lead text-capitalize">
                                                payment Method
                                              </div>
                                              <div className=" fw-semibold text-capitalize">
                                                {university?.paymentMethod}
                                              </div>
                                            </div>
                                            <div className="col-sm-6">
                                              <div className=" fw-light text-lead text-capitalize">
                                                amount/percentage
                                              </div>
                                              <div className=" fw-semibold text-capitalize">
                                                {university?.amount
                                                  ? university?.amount
                                                  : university?.percentage
                                                  ? university?.percentage
                                                  : "null"}{" "}
                                              </div>
                                            </div>
                                          </div>
                                          <div className="row gy-3 py-2">
                                            <div className="col-sm-6">
                                              <div className=" fw-light text-lead text-capitalize">
                                                Eligibility For Commission
                                              </div>
                                              <div className=" fw-semibold text-capitalize">
                                                {
                                                  university?.eligibilityForCommission
                                                }
                                              </div>
                                            </div>
                                            <div className="col-sm-6">
                                              <div className=" fw-light text-lead text-capitalize">
                                                Payment TAT
                                              </div>
                                              <div className="fw-nsemibold">
                                                {university?.paymentTAT}
                                              </div>
                                            </div>
                                          </div>
                                          <div className="row gy-3 py-2">
                                            <div className="col-sm-6">
                                              <div className=" fw-light text-lead text-capitalize">
                                                Tax
                                              </div>
                                              <div className=" fw-semibold text-capitalize">
                                                {university?.tax}
                                              </div>
                                            </div>
                                            <div className="col-sm-6">
                                              <div className=" fw-light text-lead text-capitalize">
                                                Commission PaidOn
                                              </div>
                                              <div className=" fw-semibold text-capitalize">
                                                {university?.commissionPaidOn}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
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
                                  {university?.admissionRequirement}{" "}
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

                              <div
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
                                      Open
                                    </button>
                                  </h2>
                                  <div
                                    id="flush-collapseOpen"
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#programIntakesAccordion"
                                  >
                                    <div className="accordion-body">
                                      <div className="row row-cols-2">
                                        <div className="col">
                                          <p className="fw-bold">Open Time</p>
                                        </div>
                                        <div className="col">
                                          <p className="fw-normal">
                                            27/07/2024
                                          </p>
                                        </div>
                                        <div className="col">
                                          <p className="fw-bold">Deadline</p>
                                        </div>
                                        <div className="col">
                                          <p className="fw-normal">
                                            27/07/2025
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="accordion-item">
                                  <h2 className="accordion-header">
                                    <button
                                      className="accordion-button collapsed btn-sm"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#flush-collapseClosed"
                                      aria-expanded="false"
                                      aria-controls="flush-collapseClosed"
                                    >
                                      Closed
                                    </button>
                                  </h2>
                                  <div
                                    id="flush-collapseClosed"
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#programIntakesAccordion"
                                  >
                                    <div className="accordion-body">
                                      <div className="row row-cols-2">
                                        <div className="col">
                                          <p className="fw-bold">Open Time</p>
                                        </div>
                                        <div className="col">
                                          <p className="fw-normal">
                                            27/07/2024
                                          </p>
                                        </div>
                                        <div className="col">
                                          <p className="fw-bold">Deadline</p>
                                        </div>
                                        <div className="col">
                                          <p className="fw-normal">
                                            27/07/2025
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="accordion-item">
                                  <h2 className="accordion-header">
                                    <button
                                      className="accordion-button collapsed btn-sm"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#flush-collapseLikelyOpen"
                                      aria-expanded="false"
                                      aria-controls="flush-collapseLikelyOpen"
                                    >
                                      Likely Open
                                    </button>
                                  </h2>
                                  <div
                                    id="flush-collapseLikelyOpen"
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#programIntakesAccordion"
                                  >
                                    <div className="accordion-body">
                                      <div className="row row-cols-2">
                                        <div className="col">
                                          <p className="fw-bold">Open Time</p>
                                        </div>
                                        <div className="col">
                                          <p className="fw-normal">
                                            27/07/2024
                                          </p>
                                        </div>
                                        <div className="col">
                                          <p className="fw-bold">Deadline</p>
                                        </div>
                                        <div className="col">
                                          <p className="fw-normal">
                                            27/07/2025
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* <div className="card  mt-3">
                            <div className="card-body">
                              <div className="row ">
                                <div className="col-6">
                                  <div className=" fw-light text-lead text-capitalize">
                                    OfferTAT
                                  </div>
                                  <div className="fw-semibold text-capitalize">
                                    {university?.offerTAT}
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div className=" fw-light text-lead text-capitalize">
                                    Average Fees
                                  </div>
                                  <div className=" fw-semibold text-capitalize">
                                
                                    {university?.averageFees}
                                  </div>
                                </div>
                                
                                <div className="col-6">
                                  <div className=" fw-light text-lead text-capitalize">
                                    Country
                                  </div>
                                  <div className=" fw-semibold text-capitalize">
                                    {university?.country}

                                  </div>
                                </div>
                              </div>
                             
                              
                                <div className="col-6  ">
                                  <div className=" fw-light text-lead text-capitalize">
                                    Founded
                                  </div>
                                  <div className=" fw-semibold text-capitalize">
                                    {university?.founded}
                                  </div>
                                </div>
                          
                                <div className="col-6">
                                  <div className=" fw-light text-lead text-capitalize">
                                    Institution Type
                                  </div>
                                  <div className=" fw-semibold text-capitalize">
                                    {university?.institutionType}
                                  </div>
                                </div>
                             
                            </div>
                          </div> */}
                          </div>

                          <div className="row g-3 mb-3">
                            <div className="d-flex flex-row align-items-start justify-content-between">
                              <div
                                className="text-semibold text-decoration-underline fw-semibold text-Capitalize "
                                style={{ color: "#fe5722", fontSize: "14px" }}
                              >
                                Programs
                              </div>
                            </div>
                            {program?.map((data, index) => (
                              <div key={index} className="col-md-4 ">
                                <div className="card mb-3  shadow border-0 border-start border-5 border-primary  h-100  shadow ">
                                  <div className="row g-0 align-items-center justify-content-center">
                                    <div className="col-md-4 align-self-center ">
                                      <img
                                        src={
                                          data?.universityLogo
                                            ? data?.universityLogo
                                            : "https://img.freepik.com/premium-vector/university-campus-logo_1447-1790.jpg"
                                        }
                                        className="img-fluid rounded-circle mx-auto d-block "
                                        alt="Course Image"
                                        style={{
                                          width: "7rem",
                                          height: "7rem",
                                        }}
                                      />
                                    </div>
                                    <div className="col-md-8">
                                      <div className="card-body">
                                        <h6
                                          className="university-name mb-2 lh-sm"
                                          style={{
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                          }}
                                        >
                                        <i class="fa fa-university nav-icon text-dark"></i>  {data?.universityName}
                                        </h6>
                                        <p
                                          className="course-name mb-2 lh-sm"
                                          style={{ fontSize: "12px" }}
                                        >
                                         <i class="fa fa-book nav-icon text-dark"></i> <b> CourseName </b>{" "}
                                          {data?.programTitle}
                                        </p>
                                        <p
                                          className="duration mb-2 lh-sm"
                                          style={{ fontSize: "12px" }}
                                        >
                                         <i class="fa fa-hourglass-half nav-icon text-dark"></i> <b>Duration </b> {data?.duration}
                                        </p>

                                        <button
                                          className="btn btn-sm  rounded-pill text-white text-Capitalize fw-semibold px-4 "
                                          style={{
                                            backgroundColor: "#fe5722",
                                            fontSize: "12px",
                                          }}
                                        >
                                        <i class="fa fa-paper-plane nav-icon text-white"></i>  Apply
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <nav aria-label="Page navigation example justify-content-end  text-end">
                            <ul className="pagination">
                              <li className="page-item">
                                <a
                                  className="page-link"
                                  href="#"
                                  aria-label="Previous"
                                >
                                  <span aria-hidden="true">&laquo;</span>
                                </a>
                              </li>
                              <li className="page-item">
                                <a className="page-link" href="#">
                                  1
                                </a>
                              </li>
                              <li className="page-item">
                                <a className="page-link" href="#">
                                  2
                                </a>
                              </li>

                              <li className="page-item">
                                <a
                                  className="page-link"
                                  href="#"
                                  aria-label="Next"
                                >
                                  <span aria-hidden="true">&raquo;</span>
                                </a>
                              </li>
                            </ul>
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
      </div>
    </>
  );
};
export default UserProfile;
