import { CiLinkedin } from "react-icons/ci";
import { RiCoinsFill } from "react-icons/ri";
import { SiGnuprivacyguard } from "react-icons/si";
import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { IoMdRocket } from "react-icons/io";
import { IoMailUnread } from "react-icons/io5";
import {
  RiProjectorFill,
  RiMapPin2Line,
  RiSchoolLine,
  RiFileTextLine,
} from "react-icons/ri";
import banner from "../../styles/Assets/Student/EventBanner.png";
import { getSingleUniversity, UniversityProgram } from "../../api/university";
import { getallProgram, getUniversityProgram } from "../../api/Program";
import { CiSearch } from "react-icons/ci";
import { Chip } from "@mui/material";
import Flags from "react-world-flags";
import { Input } from "reactstrap";
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
      <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
        <div className="container-fluid">
          <div className="navbar navbar-vertical navbar-expand-lg">
            <Sidebar />
          </div>
          <div className="content-wrapper" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '13px' }}>
          <div className="container-fluid ">
            <div className="row">
              <div className="col-xl-12">
              <div className="  border-0 rounded-0 bg-transparent p-3 ">
              <div className="card border-0 rounded-0  ">
              <div className="card-header rounded-0 border-0   img-1 ">
              <div className="row g-3 mt-2">
  <div className="col-lg-4 ">
    <img
      src={
        university?.universityLogo
          ? university?.universityLogo
          : "https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png"
      }
      className="img-fluid rounded-circle img-thumbnail mx-auto d-block"
      style={{ width: "9rem", height: "9rem" }}
      alt="Berry College Campus"
    />
  </div>
  <div className="col-lg-8">
    <div className="d-flex flex-row justify-content-between align-items-start">
      <div className="d-flex flex-column">
        <p className="text-white mb-1 fw-bold"><span  className="me-2" style={{color:'#fe5722'}}><FaUniversity /></span> {university?.universityName}</p>
        <p className="text-white mb-1"><span className="me-2" style={{color:'#fe5722'}}><FaGlobeAmericas /></span> {university?.country}</p>
      </div>
      <div className="d-flex flex-column align-items-end">
       <Link
          to={university?.website}
          className="text-decoration-none text-white mb-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="me-2" style={{color:'#fe5722'}}><IoMdRocket /></span>  {university?.website}
        </Link>
        <div className="text-white mb-1"> <span className="me-2" style={{color:'#fe5722'}}> <IoMailUnread /></span> {university?.email}</div>
      </div>
    </div>
    <div className="bg-white text-dark shadow border-0  align-self-end rounded-1 mt-4 p-3">
      <span className="text-secondary fw-bolder d-flex align-items-center gap-2 text-capitalize " style={{fontSize:'13px'}}>
        University Rank: 
        <span>
          <RiCoinsFill className="text-warning " /> 
          {university?.ranking}
        </span>
      </span>
    </div>
  </div>
</div>

              </div>
              <div className="card-body bg-white rounded-bottom px-4">
                <div className="row mt-2 g-4">
                  <div className="col-md-7">
                    <ul
                      class="nav nav-underline fs-9"
                      id="myTab"
                      role="tablist"
                    >
                      <li class="nav-item" role="presentation">
                        <a
                          class="nav-link active text-uppercase "
                          id="home-tab"
                          data-bs-toggle="tab"
                          href="#tab-home"
                          role="tab"
                          aria-controls="tab-home"
                          aria-selected="true"
                        >
                          Overview
                        </a>
                      </li>
                      <li class="nav-item" role="presentation">
                        <a
                          class="nav-link text-uppercase "
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
                          class="nav-link text-uppercase "
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
                          class="nav-link text-uppercase "
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
                        <p className="clearfix" style={{textAlign:'justify'}}>{university?.admissionRequirement} </p>
                      </div>
                      <div
                        class="tab-pane fade"
                        id="tab-profile"
                        role="tabpanel"
                        aria-labelledby="profile-tab"
                      >
                        <div className="row">
                          <div className=" border-0 pt-3 px-4">
                            <div className="row">
                              {Array.isArray(university?.state) &&
                                university.state.map((state, index) => (
                                  <div key={index} className="col-sm-4">
                                    <div
                                      className="card border-0 rounded-3 shadow"
                                      style={{ width: "8rem", height: "11rem" }}
                                    >
                                      <img
                                        src={
                                          university?.universityLogo
                                            ? university?.universityLogo
                                            : "https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png"
                                        }
                                        className="card-img-top"
                                        style={{
                                          width: "8rem",
                                          height: "7rem",
                                        }}
                                        alt="img"
                                      />
                                      <div className="card-body">
                                        <p className="card-text text-center">
                                          {university?.lga?.[index]?.length > 0
                                            ? university.lga[index]
                                            : state}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="tab-pane fade"
                        id="tab-populatCourse"
                        role="tabpanel"
                        aria-labelledby="profile-tab"
                      >
                        <div className="row">
                          <div className=" border-0 pt-3 px-4">
                            <div className="row">
                              {Array.isArray(university?.popularCategories) &&
                                university.popularCategories.map(
                                  (popularCategories, index) => (
                                    <div
                                      key={index}
                                      className="card card-body shadow border-0 rounded  mb-2 "
                                    >
                                      <span className="text-dark fw-bolder d-flex align-items-center justify-content-center gap-2 text-uppercase">
                                        {" "}
                                        {popularCategories}
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
                        id="tab-Course"
                        role="tabpanel"
                        aria-labelledby="profile-tab"
                      >
                        <div className="row">
                          <div className=" border-0 pt-3 px-4">
                            <div className="row">
                              {Array.isArray(university?.courseType) &&
                                university.courseType.map(
                                  (courseType, index) => (
                                    <div
                                      key={index}
                                      className="card card-body shadow border-0 rounded  mb-2"
                                    >
                                      <span className="text-dark fw-bolder d-flex align-items-center justify-content-center gap-2 text-uppercase">
                                        {courseType}
                                      </span>
                                    </div>
                                  )
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-5">
                    <div
                      className="alert alert-primary text-center fw-semibold  text-uppercase "
                      role="alert"
                    >
                      University Details.
                    </div>

                    <div className="card  border-0  shadow mt-3">
                      <div className="card-body">
                        <div className="row gy-3 py-2">
                          <div className="col-sm-6">
                            <div className=" fw-light text-lead text-capitalize">
                              OfferTAT
                            </div>
                            <div className="fw-semibold text-capitalize">
                              {university?.offerTAT}
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className=" fw-light text-lead text-capitalize">
                              Delivery Currency
                            </div>
                            <div className=" fw-semibold text-capitalize">
                              <Flags
                                code={university?.flag}
                                width={40}
                                height={20}
                              />{" "}
                              {university?.currency}
                            </div>
                          </div>
                        </div>
                        <div className="row gy-3 py-2">
                          <div className="col-sm-6">
                            <div className=" fw-light text-lead text-capitalize">
                              Average Fees
                            </div>
                            <div className=" fw-semibold text-capitalize">
                              {university?.averageFees}
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className=" fw-light text-lead text-capitalize">
                              Application Fees
                            </div>
                            <div className=" fw-semibold text-capitalize">
                              {university?.applicationFees}
                            </div>
                          </div>
                        </div>
                        <div className="row gy-3 py-2">
                          <div className="col-sm-6  ">
                            <div className=" fw-light text-lead text-capitalize">
                              Founded
                            </div>
                            <div className=" fw-semibold text-capitalize">
                              {university?.founded}
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className=" fw-light text-lead text-capitalize">
                              Institution Type
                            </div>
                            <div className=" fw-semibold text-capitalize">
                              {university?.institutionType}
                            </div>
                          </div>
                        </div>
                        <div className="row gy-3 py-2">
                          <div className="col-sm-6">
                            <div className=" fw-light text-lead text-capitalize">
                              Cost Of Living
                            </div>
                            <div className=" fw-semibold text-capitalize">
                              {university?.costOfLiving}
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className=" fw-light text-lead text-capitalize">
                              Gross Tuition
                            </div>
                            <div className=" fw-semibold text-capitalize">
                              {university?.grossTuition}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card  border-0  shadow mt-3">
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
                              {university?.eligibilityForCommission}
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

                  <div className="row g-3">
                    <div className="d-flex flex-row align-items-start justify-content-between">
                      <div
                        className="text-semibold text-decoration-underline fw-semibold text-uppercase "
                        style={{ color: "#fe5722",fontSize:'14px' }}
                      >
                        Other Courses You May Be Interested In
                      </div>
                    </div>
                    {program?.map((data, index) => (
                      <div key={index} className="col-md-4 ">
                        <div
                          className="card mb-3  border-0  shadow"
                          
                        >
                          <div className="row g-0 align-items-center justify-content-center">
                            <div className="col-md-4 ">
                              <img
                                src={
                                  data?.universityLogo
                                    ? data?.universityLogo
                                    : "https://img.freepik.com/premium-vector/university-campus-logo_1447-1790.jpg"
                                }
                                className="img-fluid rounded-pill img-thumbnail mx-auto d-block"
                                alt="Course Image"
                                style={{ width: "5rem", height: "5rem" }}
                              />
                            </div>
                            <div className="col-md-8">
                              <div className="card-body">
                                <h6 className="university-name" style={{fontSize:'14px',fontWeight:'bold'}}>
                                  {data?.universityName}
                                </h6>
                                <p className="course-name" style={{fontSize:'12px'}}>
                                 <b> CourseName -</b> {data?.programTitle}
                                </p>
                                <p className="duration" style={{fontSize:'12px'}}>
                                 <b>Duration -</b>  {data?.duration}
                                </p>

                                <button
                                  className="btn btn-sm  rounded-pill text-white text-uppercase fw-semibold px-3 py-1"
                                  style={{ backgroundColor: "#fe5722",fontSize:'12px' }}
                                >
                                  Apply Now
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
                        <a className="page-link" href="#" aria-label="Previous">
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
                        <a className="page-link" href="#" aria-label="Next">
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
