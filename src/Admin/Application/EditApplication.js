import React from "react";
import Sidebar from "../../compoents/AdminSidebar";
import Select from "react-select";
import { Link } from "react-router-dom";
export const EditApplication = () => {
  return (
    <>
      <Sidebar />

      <div
        className="content-wrapper "
        style={{ fontFamily: "Plus Jakarta Sans", fontSize: "13px" }}
      >
        <div className="content-header ">
          <div className=" container-fluid">
            <div className="row ">
              <div className="col-xl-12 ">
                <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
                  <div
                    className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0"
                    style={{ background: "#fe5722", color: "#fff" }}
                  >
                    <h5 className="text-center text-capitalize p-1">
                      {" "}
                      Edit Application Details
                    </h5>
                  </div>
                  <form>
                    <div className="card-body mt-5 ">
                      <div className="row g-3 ">
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Student Name <span className="text-danger">*</span>
                          </label>
                          <div className="">
                            <input
                              type="text"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              name="name"
                              className="form-control "
                              placeholder="Example John Doe"
                            />
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Citizenship
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control "
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            placeholder="Example Indian"
                            name="citizenship"
                          />
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            DOB<span className="text-danger">*</span>
                          </label>
                          <input
                            type="date"
                            className="form-control text-uppercase "
                            placeholder="Enter Name"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "11px",
                            }}
                            name="dob"
                          />
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            {" "}
                            Passport No<span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control "
                            placeholder="Example M12345678"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            name="passportNo"
                          />
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Expiry Date <span className="text-danger">*</span>
                          </label>
                          <input
                            type="date"
                            className="form-control   text-uppercase"
                            placeholder="Enter Contact Number "
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "11px",
                            }}
                            name="expiryDate"
                          />
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Gender<span className="text-danger">*</span>
                          </label>
                          <select
                            type="text"
                            className="form-select form-select-lg rounded-2 "
                            placeholder="Contact Number"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            name="gender"
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="others">Others</option>
                          </select>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Email ID<span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control "
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            placeholder="Example johndoe123@gmail.com"
                            name="email"
                          />
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
                            placeholder="Example 123-456-789"
                            name="primaryNumber"
                          />
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            WhatsApp Number{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control "
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            placeholder="Example 123-456-789 "
                            name="whatsAppNumber"
                          />
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Highest Qualification
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control "
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            placeholder="Example B.A. in English"
                            name="highestQualification"
                          />
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Degree Name
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control "
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            placeholder="Example  B.Sc. IT"
                            name="degreeName"
                          />
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Percentage<span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control "
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            placeholder="Example 85"
                            name="percentage"
                          />
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Institution Name
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control "
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            placeholder="Example Harvard University"
                            name="institution"
                          />
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Start Date<span className="text-danger">*</span>
                          </label>
                          <input
                            type="date"
                            className="form-control text-uppercase"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "11px",
                            }}
                            placeholder="Enter Start date"
                            name="academicYear"
                          />
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            End Date<span className="text-danger">*</span>
                          </label>
                          <input
                            type="date"
                            className="form-control text-uppercase"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "11px",
                            }}
                            placeholder="Enter End Date"
                            name="yearPassed"
                          />
                        </div>

                        <div
                          className="card-header border-0 rounded-0 "
                          style={{ background: "#fe5722", color: "#fff" }}
                        >
                          <h6 className="text-start text-capitalize pt-1">
                            Work Experience
                          </h6>
                        </div>

                        <div className="row g-3">
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>Duration</label>
                            <input
                              type="text"
                              className="form-control  "
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              placeholder="Example 2 Years"
                              name="duration"
                            />
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Last Employeer
                            </label>
                            <input
                              type="Text"
                              className="form-control  "
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              placeholder="Example Microsoft Corporation"
                              name="lastEmployeer"
                            />
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Last Designation
                            </label>
                            <input
                              type="Text"
                              className="form-control  "
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              placeholder="Example Senior Software Engineer"
                              name="lastDesignation"
                            />
                          </div>

                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Do You Have Any ELT{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <select
                              type="text"
                              className="form-select form-select-lg rounded-2 "
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              placeholder="Enter Do have any English Language Test "
                              name="doHaveAnyEnglishLanguageTest"
                            >
                              <option value="">Select English Test Type</option>
                              <option value="doHaveAnyEnglishLanguageTest">
                                Yes
                              </option>
                              <option value="no">No</option>
                            </select>
                          </div>
                        </div>

                        <div className="row g-3">
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              English Test Type
                            </label>
                            <select
                              type="text"
                              className="form-select form-select-lg rounded-2"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              placeholder="Enter English Test Type"
                              name="englishTestType"
                            >
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
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              placeholder="Example 75"
                              name="testScore"
                            />
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Date Of Test
                            </label>
                            <input
                              type="date"
                              className="form-control text-uppercase "
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "11px",
                              }}
                              placeholder="Enter Date Of Test"
                              name="dateOfTest"
                            />
                          </div>
                        </div>

                        <div className="row g-3">
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Do You Have Travel History
                              <span className="text-danger">*</span>
                            </label>
                            <select
                              type="text"
                              className="form-select form-select-lg rounded-2"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              placeholder="Enter Do You Have  Travel History"
                              name="doYouHaveTravelHistory"
                            >
                              <option value="">Select Travel History</option>
                              <option value="doYouHaveTravelHistory">
                                Yes
                              </option>
                              <option value="No">No</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Any Visa Rejections
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control "
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            placeholder="Example..."
                            name="anyVisaRejections"
                          />
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Visa Reason
                          </label>
                          <input
                            type="text"
                            className="form-control "
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            placeholder="Example Study"
                            name="visaReason"
                          />
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Travel History
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            placeholder="Example..."
                            name="travelHistory"
                          />
                        </div>

                        <div className="row g-3">
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>Date</label>
                            <input
                              type="date"
                              className="form-control text-uppercase"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "11px",
                              }}
                              placeholder="Enter Date"
                              name="dateVisa"
                            />
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>Purpose</label>
                            <input
                              type="text"
                              className="form-control "
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              placeholder="Example Businesss"
                              name="purposeVisa"
                            />
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>Country</label>
                            <input
                              type="text"
                              className="form-control  "
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              placeholder="Example United Kingdom"
                              name="countryNameVisa"
                            />
                          </div>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Country <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control "
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            placeholder="Example New York "
                            name="country"
                          />
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Intake <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control "
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            placeholder="Example Summer "
                            name="intake"
                          />
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            University <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control "
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            placeholder="Example Stanford University "
                            name="University"
                          />
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Program <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control "
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            placeholder="Example Game Devlopment "
                            name="program"
                          />
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Program Fees <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control "
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            placeholder="Example 2500 "
                            name="programfee"
                          />
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Appilcation Fees{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control "
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            placeholder="Example 4500 "
                            name="appilcationfee"
                          />
                        </div>

                        <div className="row g-3">
                          <div className="add-customer-btns mb-40 d-flex justify-content-end  ml-auto">
                            <Link
                              style={{
                                backgroundColor: "#231F20",
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              to="#"
                              className="btn btn-cancel border-0 fw-semibold text-uppercase px-4 py-2  text-white m-2"
                            >
                              Cancel
                            </Link>
                            <button
                              style={{
                                backgroundColor: "#FE5722",
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              type="submit"
                              className="btn btn-save border-0 fw-semibold text-uppercase text-white px-4 py-2  m-2"
                            >
                              Update
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
    </>
  );
};
export default EditApplication;
