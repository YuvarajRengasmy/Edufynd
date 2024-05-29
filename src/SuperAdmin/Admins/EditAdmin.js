import React from "react";
import Header from "../../compoents/header";
import Sidebar from "../../compoents/sidebar";
import { Link, useNavigate } from "react-router-dom";

function EditAdmin() {
    return (
        <div>
            <div class="">
                <div class="">
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
                                    Add Admin
                                </h5>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 ">
                                    <div className="form-group">
                                        <label style={{ color: "#231F20" }}>
                                            {" "}
                                            Admin Name<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            placeholder="Enter Admin name"
                                            name="adminName"
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
                                                className="form-control "
                                                placeholder="Enter Passport No"
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
                                            name="Country"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 ">
                                    <div className="form-group">
                                        <label style={{ color: "#231F20" }}>
                                            Role <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            placeholder="Enter Role"
                                            name="role"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 ">
                                    <div className="form-group">
                                        <label style={{ color: "#231F20" }}>
                                            Contact number<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control "
                                            placeholder="Contact Number"
                                            name="contactNumber"
                                        />
                                    </div>
                                </div>
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
export default EditAdmin;
