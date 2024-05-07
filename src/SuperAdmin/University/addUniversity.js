import React from "react";
import Header from "../../compoents/header";
import Sidebar from "../../compoents/sidebar";
import { Link, useNavigate } from "react-router-dom";
import AddComission from "./addComission";
import AddProgram from "./addProgram";
function Profile() {
  return (
    <div>
      <div class="position-fixed">
        <div class="fixed-element">
          <Sidebar />
          <Header />
        </div>
      </div>
      <div className="content-wrapper">
        <div className="content-header mt-3">
          <div className="content container-fluid w-75">
            <form >
              <div className="content-page-header">
                <h5 className="text-bold" style={{ color: "#231F20" }}>
                  Add University
                </h5>
              </div>
              <div className="row">
                <div className="col-lg-12 col-md-6 col-sm-12">
                  <div className="upload-img form-group text-center">
                    <label style={{ color: "#231F20" }}>
                      University Logo<span className="text-danger">*</span>
                    </label>
                    <br />
                    <label htmlFor="fileInputImage" className="file-upload">
                      <img src="https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png" width="180" height="180" alt="Preview" style={{ objectFit: "cover" }} className="preview-image" />
                    </label>
                    <input
                      name="profileImage"
                      id="fileInputImage"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
                <div className="col-lg-6 ">
                  <div className="form-group">
                    <label style={{ color: "#231F20" }}>
                      {" "}
                      University Name<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter name"
                      name="name"
                    />
                  </div>
                </div>
                <div className="col-lg-6 ">
                  <div className="form-group">
                    <label style={{ color: "#231F20" }}>
                      {" "}
                      Email<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter Email"
                      name="email"
                    />
                  </div>
                </div>
                <div className="col-lg-6 ">
                  <div className="form-group">
                    <label style={{ color: "#231F20" }}>
                      Password <span className="text-danger">*</span>
                    </label>
                    <div className="d-flex gap-4">
                      <input
                        type="text"
                        className="form-control "
                        placeholder="Enter Password"
                        name="password"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 ">
                  <div className="form-group">
                    <label style={{ color: "#231F20" }}>
                      Country<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter Country "
                      name="Country"
                    />
                  </div>
                </div>
                <div className="col-lg-6 ">
                  <div className="form-group">
                    <label style={{ color: "#231F20" }}>
                      {" "}
                      Campus Name<span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-control"
                      name="campus"
                    >
                      <option>Select Campus</option>
                      <option>Select Campus</option>
                      <option>Select Campus</option>
                      <option>Select Campus</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-6 ">
                  <div className="form-group">
                    <label style={{ color: "#231F20" }}>
                      Ranking <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-control"
                      name="ranking"
                    >
                      <option>Select Ranking</option>
                      <option>Select Ranking</option>
                      <option>Select Ranking</option>
                      <option>Select Ranking</option>
                      <option>Select Ranking</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#231F20" }}>
                      Average Fees<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Average Fees"
                      name="Average Fees"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#231F20" }}>
                      Popular Categories  <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-control"
                      name="Popular Categories"
                    >
                      <option>Select Categories</option>
                      <option>Select Categories</option>
                      <option>Select Categories</option>
                      <option>Select Categories</option>
                      <option>Select Categories</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#231F20" }}>
                      Offer TAT <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter state"
                      name="state"
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label style={{ color: "#231F20" }}>
                      Admission Requirement <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      placeholder="Enter admission requirements"
                      name="admissionRequirements"
                      rows="5" // You can adjust the number of rows as needed
                    ></textarea>
                  </div>
                </div>
                <AddComission />
                <AddProgram />
                <div className="add-customer-btns mb-40 d-flex justify-content-end w-50 ml-auto">
                  <Link
                    style={{ backgroundColor: "#231F20" }}
                    to="/ListUniversity"
                    className="btn btn-cancel border text-white w-50 m-2"
                  >
                    Cancel
                  </Link>
                  <button
                    style={{ backgroundColor: "#FE5722" }}
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
  );
}
export default Profile;
