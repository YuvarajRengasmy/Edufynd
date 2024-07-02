import React from "react";
import Header from "../../compoents/header";
import Sidebar from "../../compoents/sidebar";
import { Link, useNavigate } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FiEdit } from "react-icons/fi";

import { RiDeleteBin5Line } from "react-icons/ri";

function ViewAgent() {
    return (

        
        <div style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
            <div class="container-fluid">
                <nav class="navbar navbar-vertical navbar-expand-lg">
                    <Sidebar />
                    </nav>
                    <nav className="navbar navbar-top  navbar-expand">
                    <Header />
                </nav>
           
            <div className="content-wrapper">
                <div className="content-header mt-3">
                    <div className="content container-fluid w-75">
                        <form >
                            <div className="row">
                                <div className="col-lg-12 col-md-6 col-sm-12">
                                    <div className="upload-img form-group text-center">
                                        <label style={{ color: "#9265cc" }}>
                                            Profile Photo<span className="text-light">*</span>
                                        </label>
                                        <br />
                                        <label htmlFor="fileInputImage" className="file-upload">
                                            <img src="https://webalive-adearns.s3.ap-south-1.amazonaws.com/Manufacuturer/profileimageyuvi.jpg" width="180" height="180" alt="Preview" style={{ objectFit: "cover" }} className="preview-image" />
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
                                            Agent Name<span className="text-light">*</span>
                                        </label>
                                        <h5 className="fw-bold">Rajan</h5>
                                    </div>
                                </div>
                                <div className="col-lg-6 ">
                                    <div className="form-group">
                                        <label style={{ color: "#9265cc" }}>
                                            Email<span className="text-light">*</span>
                                        </label>
                                        <div className="d-flex gap-4">
                                            <h5 className="fw-bold">edufynd@info.com</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 ">
                                    <div className="form-group">
                                        <label style={{ color: "#9265cc" }}>
                                            {" "}
                                            Password<span className="text-light">*</span>
                                        </label>
                                        <h5 className="fw-bold">%HGHFFYUF@.....$FGHHH</h5>
                                    </div>
                                </div>
                                <div className="col-lg-6 ">
                                    <div className="form-group">
                                        <label style={{ color: "#9265cc" }}>
                                            Business Name <span className="text-light">*</span>
                                        </label>
                                        <h5 className="fw-bold">CONSULATING</h5>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label style={{ color: "#9265cc" }}>
                                            PAN Number of Individual <span className="text-light">*</span>
                                        </label>
                                        <h5 className="fw-bold">AOFY564FB</h5>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label style={{ color: "#9265cc" }}>
                                            PAN of Company <span className="text-light">*</span>
                                        </label>
                                        <h5 className="fw-bold">Arty765g43</h5>
                                    </div>
                                </div>
                                <div className="col-lg-6 ">
                                    <div className="form-group">
                                        <label style={{ color: "#9265cc" }}>
                                            Primary number<span className="text-light">*</span>
                                        </label>
                                        <h5 className="fw-bold">+91 987654321</h5>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label style={{ color: "#9265cc" }}>
                                            WhatsApp Number  <span className="text-light">*</span>
                                        </label>
                                        <h5 className="fw-bold">+91 987654321</h5>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label style={{ color: "#9265cc" }}>
                                            GSTN <span className="text-light">*</span>
                                        </label>
                                        <h5 className="fw-bold">grt677888dv4</h5>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label style={{ color: "#9265cc" }}>
                                            INC  <span className="text-light">*</span>
                                        </label>
                                        <h5 className="fw-bold">IBD45</h5>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label style={{ color: "#9265cc" }}>
                                            Agent payout  <span className="text-light">*</span>
                                        </label>
                                        <h5 className="fw-bold">Banking</h5>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label style={{ color: "#9265cc" }}>
                                            Agents Commission  <span className="text-light">*</span>
                                        </label>
                                        <h5 className="fw-bold">6%</h5>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label style={{ color: "#9265cc" }}>
                                            Country Interested <span className="text-light">*</span>
                                        </label>
                                        <h5 className="fw-bold">USA</h5>
                                    </div>
                                </div>
                                <div className="col-lg-6 ">
                                    <div className="form-group">
                                        <label style={{ color: "#9265cc" }}>
                                            Add staffo<span className="text-light">*</span>
                                        </label>
                                        <div className="d-flex gap-4">
                                            <h5 className="fw-bold">Kamal</h5>
                                            <h5 className="fw-bold">987654321</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="card rounded px-5 pt-3 ">
                                    <div className="row row-cols-md-2 row-cols-1">
                                        <div>
                                            <h6 className="fw-bold" style={{ color: "#9265cc" }}>
                                                Bank & Branch Name :
                                            </h6>
                                            <p className="fw-lighter">HDFC Bank:- Chennai</p>
                                        </div>
                                        <div>
                                            <h6 className="fw-bold" style={{ color: "#9265cc" }}>
                                                Account Number :
                                            </h6>
                                            <p className="fw-lighter">1234567890
                                            </p>
                                        </div>
                                        <div>
                                            <h6 className="fw-bold" style={{ color: "#9265cc" }}>
                                                IFSC CODE :
                                            </h6>
                                            <p className="fw-lighter">HDFC000000987</p>
                                        </div>
                                        <div>
                                            <h6 className="fw-bold" style={{ color: "#9265cc" }}>
                                                Account Holder Name  :
                                            </h6>
                                            <p className="fw-lighter">Rajesh</p>
                                        </div>
                                        <div>
                                            <h6 className="fw-bold" style={{ color: "#9265cc" }}>
                                                Account Type :
                                            </h6>
                                            <p className="fw-lighter">Current Type</p>
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
export default ViewAgent;
