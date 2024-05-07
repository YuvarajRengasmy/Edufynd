import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Agents/AgentHeader";
import Footer from "../Agents/AgentFooter";
function ViewStudent() {
    return (
        <div>
          <Header />
            <div className="content-wrapper">
                <div className="content-header mt-3">
                    <div className="content container-fluid w-75">
                        <form >
                            <div className="content-page-header">
                                <h5 className="text-bold" style={{ color: "#231F20" }}>
                                    View Student
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
                                            <img src="https://webalive-adearns.s3.ap-south-1.amazonaws.com/Manufacuturer/profileimageyuvi.jpg" width="180" height="180" alt="Preview" style={{ objectFit: "cover" }} className="preview-image" />
                                        </label>
                                    </div>
                                </div>
                                <div className="col-lg-6 ">
                                    <div className="form-group">
                                        <label style={{ color: "#9265cc" }}>
                                            {" "}
                                            Student Name<span className="text-danger">*</span>
                                        </label>
                                        <h5 className="fw-bold">John</h5>
                                    </div>
                                </div>
                                <div className="col-lg-6 ">
                                    <div className="form-group">
                                        <label style={{ color: "#9265cc" }}>
                                            Passport No<span className="text-danger">*</span>
                                        </label>
                                        <div className="d-flex gap-4">
                                            <h5 className="fw-bold">WBY78543N</h5>
                                            <h5 className="fw-bold">13-05-2034</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 ">
                                    <div className="form-group">
                                        <label style={{ color: "#9265cc" }}>
                                            {" "}
                                            DOB<span className="text-danger">*</span>
                                        </label>
                                        <h5 className="fw-bold">05-05-1998</h5>
                                    </div>
                                </div>
                                <div className="col-lg-6 ">
                                    <div className="form-group">
                                        <label style={{ color: "#9265cc" }}>
                                            Citizenship <span className="text-danger">*</span>
                                        </label>
                                        <h5 className="fw-bold">Indian</h5>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label style={{ color: "#9265cc" }}>
                                            Gender <span className="text-danger">*</span>
                                        </label>
                                        <h5 className="fw-bold">Male</h5>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label style={{ color: "#9265cc" }}>
                                            Email ID  <span className="text-danger">*</span>
                                        </label>
                                        <h5 className="fw-bold">edufynd@gmail.com</h5>
                                    </div>
                                </div>
                                <div className="col-lg-6 ">
                                    <div className="form-group">
                                        <label style={{ color: "#9265cc" }}>
                                            Contact number<span className="text-danger">*</span>
                                        </label>
                                        <h5 className="fw-bold">8825669408</h5>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label style={{ color: "#9265cc" }}>
                                            WhatsApp Number  <span className="text-danger">*</span>
                                        </label>
                                        <h5 className="fw-bold">8825669408</h5>
                                    </div>
                                </div>
                                <h4 style={{ color: "#FE5722" }}>Qualafication :</h4>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label style={{ color: "#9265cc" }}>
                                            Degree Name <span className="text-danger">*</span>
                                        </label>
                                        <h5 className="fw-bold">BE</h5>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label style={{ color: "#9265cc" }}>
                                            Academic Year & Year Passed <span className="text-danger">*</span>
                                        </label>
                                        <h5 className="fw-bold">2020</h5>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label style={{ color: "#9265cc" }}>
                                            Institution <span className="text-danger">*</span>
                                        </label>
                                        <h5 className="fw-bold">PES University</h5>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label style={{ color: "#9265cc" }}>
                                            Percentage <span className="text-danger">*</span>
                                        </label>
                                        <h5 className="fw-bold">8%</h5>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label style={{ color: "#9265cc" }}>
                                            English Language Test <span className="text-danger">*</span>
                                        </label>
                                        <h5 className="fw-bold">YES</h5>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label style={{ color: "#9265cc" }}>
                                            Desired Country  <span className="text-danger">*</span>
                                        </label>
                                        <h5 className="fw-bold">USA</h5>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label style={{ color: "#9265cc" }}>
                                            Desired University  <span className="text-danger">*</span>
                                        </label>
                                        <h5 className="fw-bold">PES</h5>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label style={{ color: "#9265cc" }}>
                                            Desired Course   <span className="text-danger">*</span>
                                        </label>
                                        <h5 className="fw-bold">UG</h5>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label style={{ color: "#9265cc" }}>
                                            Work Experience <span className="text-danger">*</span>
                                        </label>
                                        <h5 className="fw-bold">Software Developer IN 5year</h5>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label style={{ color: "#9265cc" }}>
                                            Finance<span className="text-danger">*</span>
                                        </label>
                                        <h5 className="fw-bold">Loan</h5>
                                    </div>
                                </div>
                                <div className="d-flex gap-5">
                                    <div>
                                        <h4 style={{ color: "#FE5722" }}>Do you have a travel history? :</h4>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label style={{ color: "#9265cc" }}>
                                                    Travel history?
                                                </label>
                                                <h5 className="fw-bold">No</h5>
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
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label style={{ color: "#9265cc" }}>
                                                    AnyVisaRejections
                                                </label>
                                                <h5 className="fw-bold">No</h5>
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
         <Footer/>
        </div>
    );
}
export default ViewStudent;
