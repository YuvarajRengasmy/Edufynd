import React from "react";
import Header from "../../compoents/header";
import Sidebar from "../../compoents/sidebar";
import { Link } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Dropdown } from 'react-bootstrap';


function AddAgent() {



    return (
        <div style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} >
            <div class="container-fluid">
                <nav class="navbar navbar-vertical navbar-expand-lg">
                    <Sidebar />
                    </nav>
                    <nav className="navbar navbar-top navbar-expand">
                    <Header />
                    </nav>
                   
               
           
            <div className="content-wrapper " style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
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
                                            <span className="text-danger"></span>
                                        </label>
                                        <div className="d-flex justify-content-between align-items-start">
                                            <h3 className="fw-bold" style={{ color: "#FE5722" }}>
                                                Admin Access
                                            </h3>
                                            <div className="modal-btn">
                                                <a
                                                    className="text-decoration-none text-dark"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#modal_1"
                                                    aria-controls="modal_1"
                                                    aria-expanded="false"
                                                    role="button"
                                                >
                                                    <h5>
                                                        Access  &nbsp;
                                                        <IoMdAddCircleOutline />
                                                    </h5>
                                                </a>
                                            </div>
                                            <div
                                                className="modal fade "
                                                id="modal_1"
                                                aria-hidden="true"
                                                aria-labelledby="exampleModalToggleLabel"
                                                tabIndex="-1"
                                                data-bs-backdrop="static"
                                                data-bs-keyboard="false"
                                            >
                                                <div className="modal-dialog modal-lg modal-dialog-centered  modal-dialog-scrollable">
                                                    <div className="modal-content border-0 shadow-lg rounded m-3">
                                                        <div
                                                            className="card w-100  border-0  shadow"
                                                            style={{ height: "500px" }}
                                                        >
                                                            <div className="modal-header d-flex justify-content-between align-items-center">
                                                                <p className="modal-title fs-4 fw-bolder mb-3"   id="exampleModalToggleLabel"   >                                                               
                                                                    Add BankDetails
                                                                </p>
                                                                <button  type="button"
                                                                    className="btn-close bg-white border rounded-5 m-0 mb-3"
                                                                    data-bs-dismiss="modal"
                                                                    aria-label="Close"
                                                                ></button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <div className="container-fluid">
                                                                    <form className="fw-bolder">
                                                                        <div className=" row row-cols-lg-2 row-cols-1">
                                                                            <div className="mb-3 col">
                                                                                <label htmlFor="role" className="form-label">
                                                                                    Account Number:  <span className="text-danger">*</span>
                                                                                </label>
                                                                                <div class="btn-group dropend">
                                                                                    <button type="button" class="btn btn-secondary">
                                                                                        Split dropend
                                                                                    </button>
                                                                                    <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                        <span class="visually-hidden">Toggle Dropend</span>
                                                                                    </button>
                                                                                    <ul class="dropdown-menu">
                                                                                        <li><a class="dropdown-item" >Action</a></li>
                                                                                        <li><a class="dropdown-item" >Another action</a></li>
                                                                                        <li><a class="dropdown-item" >Action</a></li>
                                                                                        <li><a class="dropdown-item" >Another action</a></li>
                                                                                        <li><a class="dropdown-item" >Action</a></li>
                                                                                        <li><a class="dropdown-item" >Another action</a></li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                            <div className="mb-3 col">
                                                                                <label htmlFor="role" className="form-label">
                                                                                    Account Number:  <span className="text-danger">*</span>
                                                                                </label>
                                                                                <div class="btn-group dropend">
                                                                                    <button type="button" class="btn btn-secondary">
                                                                                        Split dropend
                                                                                    </button>
                                                                                    <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                        <span class="visually-hidden">Toggle Dropend</span>
                                                                                    </button>
                                                                                    <ul class="dropdown-menu">
                                                                                        <li><a class="dropdown-item" >Action</a></li>
                                                                                        <li><a class="dropdown-item" >Another action</a></li>
                                                                                        <li><a class="dropdown-item" >Action</a></li>
                                                                                        <li><a class="dropdown-item" >Another action</a></li>
                                                                                        <li><a class="dropdown-item" >Action</a></li>
                                                                                        <li><a class="dropdown-item" >Another action</a></li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                            <div className="mb-3 col">
                                                                                <label htmlFor="role" className="form-label">
                                                                                    Account Number:  <span className="text-danger">*</span>
                                                                                </label>
                                                                                <div class="btn-group dropend">
                                                                                    <button type="button" class="btn btn-secondary">
                                                                                        Split dropend
                                                                                    </button>
                                                                                    <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                        <span class="visually-hidden">Toggle Dropend</span>
                                                                                    </button>
                                                                                    <ul class="dropdown-menu">
                                                                                        <li><a class="dropdown-item" >Action</a></li>
                                                                                        <li><a class="dropdown-item" >Another action</a></li>
                                                                                        <li><a class="dropdown-item" >Action</a></li>
                                                                                        <li><a class="dropdown-item" >Another action</a></li>
                                                                                        <li><a class="dropdown-item" >Action</a></li>
                                                                                        <li><a class="dropdown-item" >Another action</a></li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                            <div className="mb-3 col">
                                                                                <label htmlFor="role" className="form-label">
                                                                                    Account Number:  <span className="text-danger">*</span>
                                                                                </label>
                                                                                <div class="btn-group dropend">
                                                                                    <button type="button" class="btn btn-secondary">
                                                                                        Split dropend
                                                                                    </button>
                                                                                    <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                        <span class="visually-hidden">Toggle Dropend</span>
                                                                                    </button>
                                                                                    <ul class="dropdown-menu">
                                                                                        <li><a class="dropdown-item" >Action</a></li>
                                                                                        <li><a class="dropdown-item" >Another action</a></li>
                                                                                        <li><a class="dropdown-item" >Action</a></li>
                                                                                        <li><a class="dropdown-item" >Another action</a></li>
                                                                                        <li><a class="dropdown-item" >Action</a></li>
                                                                                        <li><a class="dropdown-item" >Another action</a></li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                            <div className="mb-3 col">
                                                                                <label htmlFor="role" className="form-label">
                                                                                    Account Number:  <span className="text-danger">*</span>
                                                                                </label>
                                                                                <div class="btn-group dropend">
                                                                                    <button type="button" class="btn btn-secondary">
                                                                                        Split dropend
                                                                                    </button>
                                                                                    <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                        <span class="visually-hidden">Toggle Dropend</span>
                                                                                    </button>
                                                                                    <ul class="dropdown-menu">
                                                                                        <li><a class="dropdown-item" >Action</a></li>
                                                                                        <li><a class="dropdown-item" >Another action</a></li>
                                                                                        <li><a class="dropdown-item" >Action</a></li>
                                                                                        <li><a class="dropdown-item" >Another action</a></li>
                                                                                        <li><a class="dropdown-item" >Action</a></li>
                                                                                        <li><a class="dropdown-item" >Another action</a></li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                            <div className="mb-3 col">
                                                                                <label htmlFor="role" className="form-label">
                                                                                    Account Number:  <span className="text-danger">*</span>
                                                                                </label>
                                                                                <div class="btn-group dropend">
                                                                                    <button type="button" class="btn btn-secondary">
                                                                                        Split dropend
                                                                                    </button>
                                                                                    <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                        <span class="visually-hidden">Toggle Dropend</span>
                                                                                    </button>
                                                                                    <ul class="dropdown-menu">
                                                                                        <li><a class="dropdown-item" >Action</a></li>
                                                                                        <li><a class="dropdown-item" >Another action</a></li>
                                                                                        <li><a class="dropdown-item" >Action</a></li>
                                                                                        <li><a class="dropdown-item" >Another action</a></li>
                                                                                        <li><a class="dropdown-item" >Action</a></li>
                                                                                        <li><a class="dropdown-item" >Another action</a></li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                            <div className="mb-3 col">
                                                                                <label htmlFor="role" className="form-label">
                                                                                    Account Number:  <span className="text-danger">*</span>
                                                                                </label>
                                                                                <div class="btn-group dropend">
                                                                                    <button type="button" class="btn btn-secondary">
                                                                                        Split dropend
                                                                                    </button>
                                                                                    <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                        <span class="visually-hidden">Toggle Dropend</span>
                                                                                    </button>
                                                                                    <ul class="dropdown-menu">
                                                                                        <li><a class="dropdown-item" >Action</a></li>
                                                                                        <li><a class="dropdown-item" >Another action</a></li>
                                                                                        <li><a class="dropdown-item" >Action</a></li>
                                                                                        <li><a class="dropdown-item" >Another action</a></li>
                                                                                        <li><a class="dropdown-item" >Action</a></li>
                                                                                        <li><a class="dropdown-item" >Another action</a></li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                            <div className="mb-3 col">
                                                                                <label htmlFor="role" className="form-label">
                                                                                    Account Number:  <span className="text-danger">*</span>
                                                                                </label>
                                                                                <div class="btn-group dropend">
                                                                                    <button type="button" class="btn btn-secondary">
                                                                                        Split dropend
                                                                                    </button>
                                                                                    <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                        <span class="visually-hidden">Toggle Dropend</span>
                                                                                    </button>
                                                                                    <ul class="dropdown-menu">
                                                                                        <li><a class="dropdown-item" >Action</a></li>
                                                                                        <li><a class="dropdown-item" >Another action</a></li>
                                                                                        <li><a class="dropdown-item" >Action</a></li>
                                                                                        <li><a class="dropdown-item" >Another action</a></li>
                                                                                        <li><a class="dropdown-item" >Action</a></li>
                                                                                        <li><a class="dropdown-item" >Another action</a></li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                            <div className="mb-3 col">
                                                                                <label htmlFor="role" className="form-label">
                                                                                    Account Number:  <span className="text-danger">*</span>
                                                                                </label>
                                                                                <div class="btn-group dropend">
                                                                                    <button type="button" class="btn btn-secondary">
                                                                                        Split dropend
                                                                                    </button>
                                                                                    <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                        <span class="visually-hidden">Toggle Dropend</span>
                                                                                    </button>
                                                                                    <ul class="dropdown-menu">
                                                                                        <li><a class="dropdown-item" >Action</a></li>
                                                                                        <li><a class="dropdown-item" >Another action</a></li>
                                                                                        <li><a class="dropdown-item" >Action</a></li>
                                                                                        <li><a class="dropdown-item" >Another action</a></li>
                                                                                        <li><a class="dropdown-item" >Action</a></li>
                                                                                        <li><a class="dropdown-item" >Another action</a></li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                            <div className="mb-3 col">
                                                                                <label htmlFor="role" className="form-label">
                                                                                    Account Number:  <span className="text-danger">*</span>
                                                                                </label>
                                                                                <div class="btn-group dropend">
                                                                                    <button type="button" class="btn btn-secondary">
                                                                                        Split dropend
                                                                                    </button>
                                                                                    <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                        <span class="visually-hidden">Toggle Dropend</span>
                                                                                    </button>
                                                                                    <ul class="dropdown-menu">
                                                                                        <li><a class="dropdown-item" >Action</a></li>
                                                                                        <li><a class="dropdown-item" >Another action</a></li>
                                                                                        <li><a class="dropdown-item" >Action</a></li>
                                                                                        <li><a class="dropdown-item" >Another action</a></li>
                                                                                        <li><a class="dropdown-item" >Action</a></li>
                                                                                        <li><a class="dropdown-item" >Another action</a></li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                            <div className="mb-3 col">
                                                                                <label htmlFor="role" className="form-label">
                                                                                    Account Number:  <span className="text-danger">*</span>
                                                                                </label>
                                                                                <div class="btn-group dropend">
                                                                                    <button type="button" class="btn btn-secondary">
                                                                                        Split dropend
                                                                                    </button>
                                                                                    <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                        <span class="visually-hidden">Toggle Dropend</span>
                                                                                    </button>
                                                                                    <ul class="dropdown-menu">
                                                                                        <li><a class="dropdown-item" >Action</a></li>
                                                                                        <li><a class="dropdown-item" >Another action</a></li>
                                                                                        <li><a class="dropdown-item" >Action</a></li>
                                                                                        <li><a class="dropdown-item" >Another action</a></li>
                                                                                        <li><a class="dropdown-item" >Action</a></li>
                                                                                        <li><a class="dropdown-item" >Another action</a></li>
                                                                                    </ul>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="modal-footer d-flex gap-3 mb-5">
                                                                            <button type="submit" className="btn" style={{ backgroundColor: "#FE5722", color: "white" }}>
                                                                                Submit
                                                                            </button>
                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-secondary"
                                                                                data-bs-dismiss="modal"
                                                                                style={{ backgroundColor: "#231F20" }}
                                                                            >
                                                                                Cancel
                                                                            </button>
                                                                        </div>
                                                                    </form>
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
                        </form>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}
export default AddAgent;
