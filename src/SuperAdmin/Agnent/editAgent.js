import React from "react";
import Header from "../../compoents/header";
import Sidebar from "../../compoents/sidebar";
import { Link, useNavigate } from "react-router-dom";
import BankDetails from "./BankDetails";
function AddAgent() {
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
                                    Add Agent
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
                                            Agent Name<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={"John Doe"}
                                            className="form-control "
                                            placeholder="Enter name"
                                            name="name"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 ">
                                    <div className="form-group">
                                        <label style={{ color: "#231F20" }}>
                                            Email<span className="text-danger">*</span>
                                        </label>
                                        <div className="d-flex gap-4">
                                            <input
                                                type="text"
                                                value={"John@info.com"}
                                                className="form-control "
                                                placeholder="Enter Email"
                                                name="Country"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 ">
                                    <div className="form-group">
                                        <label style={{ color: "#231F20" }}>
                                            {" "}
                                            Password<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            value={"123456"}
                                            placeholder="Enter Password"
                                            name="Country"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 ">
                                    <div className="form-group">
                                        <label style={{ color: "#231F20" }}>
                                            Business Name <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            placeholder="Enter Business Name"
                                            value={"Consulating"}
                                            name="businessName"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label style={{ color: "#231F20" }}>
                                            PAN Number of Individual <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter pan number "
                                            value={"1234567890"}
                                            name="gender "
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label style={{ color: "#231F20" }}>
                                            PAN of Company <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Company Pan "
                                            value={"1234567890"}
                                            name="gender "
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 ">
                                    <div className="form-group">
                                        <label style={{ color: "#231F20" }}>
                                            Primary number<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            value={"1234567890"}
                                            className="form-control "
                                            placeholder="Primary Number"
                                            name="Primary Number"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label style={{ color: "#231F20" }}>
                                            WhatsApp Number  <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={"1234567890"}
                                            className="form-control"
                                            placeholder="WhatsApp Number "
                                            name="gender "
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label style={{ color: "#231F20" }}>
                                            GSTN <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={"1234567890"}
                                            className="form-control"
                                            placeholder="Enter GSTN NO"
                                            name="gstNo"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label style={{ color: "#231F20" }}>
                                            INC  <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={"1234567890"}
                                            className="form-control"
                                            placeholder="Enter The INC"
                                            name="inc"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label style={{ color: "#231F20" }}>
                                            Agent payout  <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={"yes"}
                                            className="form-control"
                                            placeholder="Enter Agent Payout"
                                            name="Institution"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label style={{ color: "#231F20" }}>
                                            Agents Commission  <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={"6%"}
                                            className="form-control"
                                            placeholder="Enter Agent Commission"
                                            name="Percentage"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label style={{ color: "#231F20" }}>
                                            Country Interested <span className="text-danger">*</span>
                                        </label>
                                        <select className="form-control">
                                            <option>select in option</option>
                                            <option>Yes</option>
                                            <option>No</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-6 ">
                                    <div className="form-group">
                                        <label style={{ color: "#231F20" }}>
                                            Add staffo<span className="text-danger">*</span>
                                        </label>
                                        <div className="d-flex gap-4">
                                            <input
                                                type="text"
                                                value={"kumar"}
                                                className="form-control "
                                                placeholder="Enter Staff Name"
                                                name="Country"
                                            />
                                            <input
                                                type="text"
                                                value={"9876543210"}
                                                className="form-control "
                                                placeholder="Enter Staff Number"
                                                name="Country"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <BankDetails />
                                <div className="add-customer-btns mb-40 d-flex justify-content-end w-30 ml-auto">
                                    <Link
                                        style={{ backgroundColor: "#231F20" }}
                                        to="/ListAgent"
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
export default AddAgent;
