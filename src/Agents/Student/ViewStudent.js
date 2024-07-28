import React from "react";
import Header from "../../compoents/header";
import Sidebar from "../../compoents/AgentSidebar";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
    return (
        <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
            <div class="container-fluid">
                <nav class=" navbar navbar-vertical navbar-expand-lg">
                    <Sidebar />
                </nav>


                <div className="content-wrapper">
                    <div className="content-header mt-3">
                        <div className="content container-fluid ">
                            <form >
                                <div className="content-page-header">
                                    <p className="text-bold" style={{ color: "#231F20" }}>
                                        View Student
                                    </p>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12 col-md-6 col-sm-12">
                                        <div className="upload-img form-group text-center">
                                            <label style={{ color: "#231F20" }}>
                                                Profile Photo<span className="text-danger">*</span>
                                            </label>
                                            <br />
                                            <label htmlFor="fileInputImage" className="file-upload">
                                                <img src="https://webalive-adearns.s3.ap-south-1.amazonaws.com/Manufacuturer/profileimageyuvi.jpg" width="180" height="180" alt="Preview" style={{ objectFit: "cover" }} className="preview-image" />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                                        <div className="form-group">
                                            <label style={{ color: "#9265cc" }}>
                                                {" "}
                                                Student Name<span className="text-danger">*</span>
                                            </label>
                                            <p className="fw-bold">John</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                                        <div className="form-group">
                                            <label style={{ color: "#9265cc" }}>
                                                Passport No<span className="text-danger">*</span>
                                            </label>

                                            <p className="fw-bold">WBY78543N</p>


                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                                        <div className="form-group">
                                            <label style={{ color: "#9265cc" }}>
                                                {" "}
                                                Expiry Date<span className="text-danger">*</span>
                                            </label>
                                            <p className="fw-bold">13-05-2034</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                                        <div className="form-group">
                                            <label style={{ color: "#9265cc" }}>
                                                {" "}
                                                DOB<span className="text-danger">*</span>
                                            </label>
                                            <p className="fw-bold">05-05-1998</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                                        <div className="form-group">
                                            <label style={{ color: "#9265cc" }}>
                                                Citizenship <span className="text-danger">*</span>
                                            </label>
                                            <p className="fw-bold">Indian</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label style={{ color: "#9265cc" }}>
                                                Gender <span className="text-danger">*</span>
                                            </label>
                                            <p className="fw-bold">Male</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label style={{ color: "#9265cc" }}>
                                                Email ID  <span className="text-danger">*</span>
                                            </label>
                                            <p className="fw-bold">edufynd@gmail.com</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                                        <div className="form-group">
                                            <label style={{ color: "#9265cc" }}>
                                                Contact number<span className="text-danger">*</span>
                                            </label>
                                            <p className="fw-bold">8825669408</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label style={{ color: "#9265cc" }}>
                                                WhatsApp Number  <span className="text-danger">*</span>
                                            </label>
                                            <p className="fw-bold">8825669408</p>
                                        </div>
                                    </div>
                                    <h4 style={{ color: "#FE5722" }}>Qualafication :</h4>
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label style={{ color: "#9265cc" }}>
                                                Degree Name <span className="text-danger">*</span>
                                            </label>
                                            <p className="fw-bold">BE</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label style={{ color: "#9265cc" }}>
                                                Academic Year & Year Passed <span className="text-danger">*</span>
                                            </label>
                                            <p className="fw-bold">2020</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label style={{ color: "#9265cc" }}>
                                                Institution <span className="text-danger">*</span>
                                            </label>
                                            <p className="fw-bold">PES University</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label style={{ color: "#9265cc" }}>
                                                Percentage <span className="text-danger">*</span>
                                            </label>
                                            <p className="fw-bold">8%</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label style={{ color: "#9265cc" }}>
                                                English Language Test <span className="text-danger">*</span>
                                            </label>
                                            <p className="fw-bold">YES</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label style={{ color: "#9265cc" }}>
                                                Desired Country  <span className="text-danger">*</span>
                                            </label>
                                            <p className="fw-bold">USA</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label style={{ color: "#9265cc" }}>
                                                Desired University  <span className="text-danger">*</span>
                                            </label>
                                            <p className="fw-bold">PES</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label style={{ color: "#9265cc" }}>
                                                Desired Course   <span className="text-danger">*</span>
                                            </label>
                                            <p className="fw-bold">UG</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label style={{ color: "#9265cc" }}>
                                                Work Experience <span className="text-danger">*</span>
                                            </label>
                                            <p className="fw-bold">Software Developer IN 5year</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label style={{ color: "#9265cc" }}>
                                                Finance<span className="text-danger">*</span>
                                            </label>
                                            <p className="fw-bold">Loan</p>
                                        </div>
                                    </div>
                                    <div className="d-flex gap-5">
                                        <div>
                                            <h4 style={{ color: "#FE5722" }}>Do you have a travel history? :</h4>
                                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                <div className="form-group">
                                                    <label style={{ color: "#9265cc" }}>
                                                        Travel history?
                                                    </label>
                                                    <p className="fw-bold">No</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label style={{ color: "#9265cc" }}>
                                                        Reason <span className="text-danger">*</span>
                                                    </label>
                                                    <textarea
                                                        className="form-control"
                                                        type="none"
                                                        name="additionalComments"
                                                        rows="4"
                                                    >
                                                        PFA the project requirement. Kindly go through the document and make sure to submit the flow chart by Friday EOD
                                                    </textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style={{ color: "#FE5722" }}>Any visa rejections? :</h4>
                                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                                                <div className="form-group">
                                                    <label style={{ color: "#9265cc" }}>
                                                        AnyVisaRejections
                                                    </label>
                                                    <p className="fw-bold">No</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label style={{ color: "#9265cc" }}>
                                                        Reason <span className="text-danger">*</span>
                                                    </label>
                                                    <textarea
                                                        className="form-control"
                                                        name="additionalComments"
                                                        rows="4"
                                                    >
                                                        PFA the project requirement. Kindly go through the document and make sure to submit the flow chart by Friday EOD
                                                    </textarea>
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
}
export default Profile;
