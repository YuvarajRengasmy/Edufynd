import React from "react";
import Header from "../../compoents/header";
import Sidebar from "../../compoents/sidebar";
import { Link, useNavigate } from "react-router-dom";

function EditAdmin() {
    return (
        <div style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
            <div class="container-fluid">
                <nav class="navbar navbar-vertical navbar-expand-lg">
                    <Sidebar />
                   
                </nav>
                <nav className="navbar navbar-top navbar-expand">
                <Header />
                </nav>
           
            <div className="content-wrapper "style={{backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} >
                <div className="content-header">
                    <div className="content card card-body border-0 container-fluid">
                        <form >
                            <div className="content-page-header">
                                <h5 className="text-bold" style={{ color: "#231F20" }}>
                                   Edit Admin
                                </h5>
                            <hr className="p-0" />
                            </div>
                            <div className="row mb-3">
                                <div className="col ">
                                    <div className="form-group">
                                        <label style={{ color: "#231F20" }}>
                                            {" "}
                                            Admin Name<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            placeholder="Enter Admin name"
                                            name=" Enter Admin Name"
                                        />
                                    </div>
                                </div>
                                <div className="col ">
                                    <div className="form-group">
                                        <label style={{ color: "#231F20" }}>
                                            Email<span className="text-danger">*</span>
                                        </label>
                                        <div className="d-flex gap-4">
                                            <input
                                                type="text"
                                                className="form-control "
                                                placeholder="Enter E-Mail"
                                                name="  Country"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col ">
                                    <div className="form-group">
                                        <label style={{ color: "#231F20" }}>
                                            {" "}
                                            Password<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control "
                                            name="Country"
                                            placeholder="Enter Password"
                                        />
                                    </div>
                                </div>
                                </div>
                                <div className="row mb-3">
                                <div className="col ">
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
                                <div className="col ">
                                    <div className="form-group">
                                        <label style={{ color: "#231F20" }}>
                                            Contact number<span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control "
                                            placeholder=" Enter Contact Number"
                                            name="contactNumber"
                                        />
                                    </div>
                                </div>
                                </div>
                                <div className="row mb-3">
                                <div className="add-customer-btns mb-40 d-flex justify-content-end w-30 ml-auto">
                                    <Link
                                        style={{ backgroundColor: "#231F20" }}
                                        to="/ListAgent"
                                        className="btn btn-cancel border-0 text-white w-25 m-2"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        style={{ backgroundColor: "#FE5722" }}
                                        type="submit"
                                        className="btn btn-save border-0 text-white w-25 m-2"
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
export default EditAdmin;
