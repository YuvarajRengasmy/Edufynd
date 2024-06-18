import React, { useState, useEffect } from "react";
import { getMonthYear } from "../../Utils/DateFormat";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Dialog, DialogContent } from "@mui/material";
const Experiences = () => {
    const openPopup = (data) => {
        setOpen(true);
        setDeleteId(data);
    };
    const closePopup = () => {
        setOpen(false);
    };
    const [open, setOpen] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState(null);
    return (
        <>
            <div className="container p-0">
                <div className="card  shadow border-0 rounded mt-5 p-4">
                    <div className="">
                        <div className="d-flex justify-content-between align-items-start">
                            <h3 className="fw-bold" style={{ color: "#FE5722" }}>
                                Add BankDetails
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
                                        Add &nbsp;
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
                                                <p
                                                    className="modal-title fs-4 fw-bolder mb-3"
                                                    id="exampleModalToggleLabel"
                                                >
                                                    Add BankDetails
                                                </p>
                                                <button
                                                    type="button"

                                                    className="btn-close bg-white border rounded-5 m-0 mb-3"
                                                    data-bs-dismiss="modal"
                                                    aria-label="Close"
                                                ></button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="container-fluid">
                                                    <form
                                                        className="fw-bolder"
                                                    >
                                                        <div className=" row row-cols-lg-2 row-cols-1">
                                                            <div className="mb-3 col">
                                                                <label className="form-label">
                                                                    Bank & BranchName : <span className="text-danger">*</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="to"
                                                                    placeholder="Enter Your BankName"
                                                                    className="form-control"
                                                                    id="to"
                                                                /><br />
                                                                <input
                                                                    type="text"
                                                                    name="to"
                                                                    placeholder="Enter Your BranchName"
                                                                    className="form-control"
                                                                    id="to"
                                                                />
                                                            </div>
                                                            <div className="mb-3 col">
                                                                <label htmlFor="role" className="form-label">
                                                                    Account Number:  <span className="text-danger">*</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="to"
                                                                    placeholder="Enter Your AccountNumber"
                                                                    className="form-control"
                                                                    id="to"
                                                                />
                                                            </div>
                                                            <div className="mb-3 col">
                                                                <label
                                                                    htmlFor="organization"
                                                                    className="form-label"
                                                                >
                                                                    IFSC CODE
                                                                    <span className="text-danger">*</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="to"
                                                                    placeholder="Enter Your IFSC CODE"
                                                                    className="form-control"
                                                                    id="to"
                                                                />
                                                            </div>
                                                            <div className="mb-3 col">
                                                                <label className="form-label">
                                                                    Account Holder Name:<span className="text-danger">*</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="to"
                                                                    placeholder="Enter Your AccountHolderName"
                                                                    className="form-control"
                                                                    id="to"
                                                                />
                                                            </div>
                                                            <div className="mb-3 col">
                                                                <label className="form-label">
                                                                    Account Type <span className="text-danger">*</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="to"
                                                                    placeholder="Enter Your AccountType"
                                                                    className="form-control"
                                                                    id="to"
                                                                />
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
                        <div className="card rounded px-3 pt-1 ">
                            <div className="container">
                                <div className="modal-btn d-flex gap-2 align-items-center justify-content-end">
                                    <Link
                                        className="btn  btn-sm btn-light  border-0"
                                        data-bs-toggle="modal"
                                        data-bs-target="#modal_1"
                                        aria-controls="modal_1"
                                        type="button"
                                    >
                                        <h4>
                                            <FiEdit />
                                        </h4>
                                    </Link>
                                    <Link
                                        className="btn  btn-sm btn-light  border-0"
                                        type="button"
                                    >
                                        <h4>
                                            <RiDeleteBin5Line />
                                        </h4>
                                    </Link>
                                </div>
                            </div>
                            <div className="row row-cols-md-2 row-cols-1">
                                <div>
                                    <h6 className="fw-bold" style={{ color: "#231F20" }}>
                                        Bank & Branch Name :
                                    </h6>
                                    <p className="fw-lighter">HDFC Bank:- Chennai</p>
                                </div>
                                <div>
                                    <h6 className="fw-bold" style={{ color: "#231F20" }}>
                                        Account Number :
                                    </h6>
                                    <p className="fw-lighter">Currency
                                    </p>
                                </div>
                                <div>
                                    <h6 className="fw-bold" style={{ color: "#231F20" }}>
                                        IFSC CODE :
                                    </h6>
                                    <p className="fw-lighter">USA</p>
                                </div>
                                <div>
                                    <h6 className="fw-bold" style={{ color: "#231F20" }}>
                                        Account Holder Name  :
                                    </h6>
                                    <p className="fw-lighter">25000</p>
                                </div>
                                <div>
                                    <h6 className="fw-bold" style={{ color: "#231F20" }}>
                                        Account Type :
                                    </h6>
                                    <p className="fw-lighter"> Open</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog open={open}>
                <DialogContent>
                    <div className="text-center m-4">
                        <h5 className="mb-4">
                            Are you sure you want to remove <br /> the selected Experience
                            Details ?
                        </h5>
                        <button
                            type="button"
                            className="btn btn-primary mx-3"
                        >
                            Yes
                        </button>
                        <button
                            type="button"
                            className="btn btn-light "
                            onClick={closePopup}
                        >
                            No
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};
export default Experiences;
