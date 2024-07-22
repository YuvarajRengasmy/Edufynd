import React from "react";
import Header from "../../compoents/header";
import Sidebar from "../../compoents/HoverBar";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  return (
    <div style={{ fontFamily: "Plus Jakarta Sans", fontSize: "1px" }}>
      <div class="container-fluid">
        <nav class="navbar navbar-vertical navbar-expand-lg">
          <Sidebar />
        </nav>

        <div
          className="content-wrapper "
          style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
        >
          <div className="content-header ">
            <div className="content container-fluid">
              <form>
                <div className="content-page-header">
                  <h5 className="text-bold" style={{ color: "#231F20" }}>
                    Add Student
                  </h5>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-6 col-sm-12">
                    <div className="upload-img form-group text-center">
                      <label style={{ color: "#231F20" }}>
                        Profile Photo<span className="text-danger">*</span>
                      </label>
                      <br />
                      <label htmlFor="fileInputImage" className="file-upload">
                        <img
                          src="https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png"
                          width="180"
                          height="180"
                          alt="Preview"
                          style={{ objectFit: "cover" }}
                          className="preview-image"
                        />
                      </label>
                      <input
                        name="profileImage"
                        id="fileInputImage"
                        type="file"
                        style={{
                          backgroundColor: "#fff",
                          display: "none",
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                        accept="image/*"
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                    <div className="form-group">
                      <label style={{ color: "#231F20" }}>
                        {" "}
                        Student Name<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control "
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                        placeholder="Enter name"
                        name="name"
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                    <div className="form-group">
                      <label style={{ color: "#231F20" }}>
                        {" "}
                        Email<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control "
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                        placeholder="Enter Email"
                        name="email"
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                    <div className="form-group">
                      <label style={{ color: "#231F20" }}>
                        Password <span className="text-danger">*</span>
                      </label>
                      <div className="d-flex gap-4">
                        <input
                          type="text"
                          className="form-control "
                          style={{
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                          placeholder="Enter Password"
                          name="password"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                    <div className="form-group">
                      <label style={{ color: "#231F20" }}>
                        Passport No<span className="text-danger">*</span>
                      </label>
                      <div className="d-flex gap-4">
                        <input
                          type="text"
                          className="form-control "
                          style={{
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                          placeholder="Enter Passport No"
                          name="Country"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                    <div className="form-group">
                      <label style={{ color: "#231F20" }}>
                        {" "}
                        Expriy Date<span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        className="form-control "
                        name="Country"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                    <div className="form-group">
                      <label style={{ color: "#231F20" }}>
                        {" "}
                        DOB<span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        className="form-control "
                        name="Country"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                    <div className="form-group">
                      <label style={{ color: "#231F20" }}>
                        Citizenship <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control "
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                        placeholder="Enter Citizenship"
                        name="name"
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label style={{ color: "#231F20" }}>
                        Gender <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                        placeholder="Enter Gender "
                        name="gender "
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label style={{ color: "#231F20" }}>
                        Email ID <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                        placeholder="Enter E-Mail "
                        name="gender "
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                    <div className="form-group">
                      <label style={{ color: "#231F20" }}>
                        Contact number<span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control "
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                        placeholder="Primary Number"
                        name="Primary Number"
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label style={{ color: "#231F20" }}>
                        WhatsApp Number <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                        placeholder="WhatsApp Number "
                        name="gender "
                      />
                    </div>
                  </div>
                  <h4 style={{ color: "#FE5722" }}>Qualafication :</h4>
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label style={{ color: "#231F20" }}>
                        Degree Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                        placeholder="Enter Degree Name"
                        name="degree Name"
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label style={{ color: "#231F20" }}>
                        Academic Year & Year Passed{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                        placeholder="Enter Degree Name"
                        name="degree Name"
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label style={{ color: "#231F20" }}>
                        Institution <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                        placeholder="Enter Institution"
                        name="Institution"
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label style={{ color: "#231F20" }}>
                        Percentage <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                        placeholder="Enter Percentage"
                        name="Percentage"
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label style={{ color: "#231F20" }}>
                        English Language Test{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-control"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      >
                        <option>select in option</option>
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label style={{ color: "#231F20" }}>
                        Desired Country <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-control"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      >
                        <option>select in option</option>
                        <option>UK</option>
                        <option>USA</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label style={{ color: "#231F20" }}>
                        Desired University{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-control"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      >
                        <option>select in option</option>
                        <option>PES</option>
                        <option>IKKTE</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label style={{ color: "#231F20" }}>
                        Desired Course <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-control"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      >
                        <option>select in option</option>
                        <option>UG</option>
                        <option>PG</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label style={{ color: "#231F20" }}>
                        Work Experience <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                        placeholder="Work Experience"
                        name="Work Experience"
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label style={{ color: "#231F20" }}>
                        Finance<span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-control"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      >
                        <option>select in option</option>
                        <option>Self Funding</option>
                        <option>Loan</option>
                      </select>
                    </div>
                  </div>
                  <h4 style={{ color: "#FE5722" }}> Any visa rejections? :</h4>
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label style={{ color: "#231F20" }}>
                        Any visa rejections{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-control"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      >
                        <option>select in option</option>
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div
                      className="form-group"
                      style={{
                        fontFamily: "Plus Jakarta Sans",
                        fontSize: "12px",
                      }}
                    >
                      <label style={{ color: "#231F20" }}>
                        Rejections <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className="form-control"
                        placeholder="Enter Reason"
                        name="admissionRequirements"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                        rows="5" // You can adjust the number of rows as needed
                      ></textarea>
                    </div>
                  </div>
                  <h4 style={{ color: "#FE5722" }}>
                    Do you have a travel history? :
                  </h4>
                  <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label style={{ color: "#231F20" }}>
                        Travel history? <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-control"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                      >
                        <option>select in option</option>
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label style={{ color: "#231F20" }}>
                        Reason <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className="form-control"
                        style={{
                          fontFamily: "Plus Jakarta Sans",
                          fontSize: "12px",
                        }}
                        placeholder="Enter Reason"
                        name="admissionRequirements"
                        rows="5" // You can adjust the number of rows as needed
                      ></textarea>
                    </div>
                  </div>
                  <div className="add-customer-btns mb-40 d-flex justify-content-end w-50 ml-auto">
                    <Link
                      style={{
                        backgroundColor: "#231F20",
                        fontFamily: "Plus Jakarta Sans",
                        fontSize: "12px",
                      }}
                      to="/ListStudent"
                      className="btn btn-cancel border text-white w-50 m-2"
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
                      className="btn btn-save border text-white w-50 m-2"
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
  );
}
export default Profile;
