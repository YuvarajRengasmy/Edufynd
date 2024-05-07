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
                AddComission
              </h3>
              <div className="modal-btn">
                <a
                  className="text-decoration-none text-dark"
                  data-bs-toggle="modal"
                  data-bs-target="#modal_5"
                  aria-controls="modal_5"
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
                id="modal_5"
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
                          AddComission
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
                                <label htmlFor="role" className="form-label">
                                  Payment Method : <span className="text-danger">*</span>
                                </label>
                                <select
                                  name="role"
                                  className="form-select"
                                  id="role"
                                >
                                  <option value="1">Select In Option</option>
                                  <option value="1">Fixed</option>
                                  <option value="2">Percentage</option>
                                </select>
                              </div>
                              <div className="mb-3 col">
                                <label
                                  htmlFor="organization"
                                  className="form-label"
                                >
                                  Amount/Percentage :
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  name="organization"
                                  placeholder="Enter Amount/Percentage"
                                  className="form-control"
                                  id="organization"
                                />
                              </div>
                              <div className="mb-3 col">
                                <label className="form-label">
                                  Eligibility For Commission :<span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  name="from"
                                  placeholder="Enter Your Currency"
                                  className="form-control"
                                  id="from"
                                />
                              </div>
                              <div className="mb-3 col">
                                <label className="form-label">
                                  Currency : <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  name="to"
                                  placeholder="Enter Your Currency"
                                  className="form-control"
                                  id="to"
                                />
                              </div>
                              <div className="mb-2">
                                <label htmlFor="skills" className="form-label">
                                  Payment TAT :
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  name="skills"

                                  placeholder="Enter Your Payment TAT"
                                  className="form-control w-100"
                                  id="skills"
                                />
                              </div>
                              <div className="mb-2">
                                <label
                                  htmlFor="location"
                                  className="form-label"
                                >
                                  Tax :<span className="text-danger">*</span>
                                </label>
                                <select
                                  name="location"
                                  className="form-select"
                                  id="location"
                                >
                                  <option value="1">Select In Option</option>
                                  <option value="1">Inclusive</option>
                                  <option value="2">Exclusive</option>
                                </select>



                              </div>
                              <div className="mb-2">
                                <label
                                  htmlFor="location"
                                  className="form-label"
                                >
                                  Commission paid on :<span className="text-danger">*</span>
                                </label>
                                <select
                                  name="location"
                                  className="form-select"
                                  id="location"
                                >
                                  <option value="1">Select In Option</option>
                                  <option value="1">Course Fees</option>
                                  <option value="2">Paid Fees</option>
                                </select>
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
                    data-bs-target="#modal_5"
                    aria-controls="modal_5"
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
                    PaymentMethod :
                  </h6>
                  <p className="fw-lighter">Fixed </p>
                </div>
                <div>
                  <h6 className="fw-bold" style={{ color: "#231F20" }}>
                    Amount/Percentage :
                  </h6>
                  <p className="fw-lighter"> 25000</p>
                </div>
                <div>
                  <h6 className="fw-bold" style={{ color: "#231F20" }}>
                    EligibilityForCommission :
                  </h6>
                  <p className="fw-lighter"> 25000</p>
                </div>
                <div>
                  <h6 className="fw-bold" style={{ color: "#231F20" }}>
                    Currency :
                  </h6>
                  <p className="fw-lighter"> yes</p>
                </div>
                <div>
                  <h6 className="fw-bold" style={{ color: "#231F20" }}>
                    Payment TAT :
                  </h6>
                  <p className="fw-lighter"> On</p>
                </div>
                <div>
                  <h6 className="fw-bold" style={{ color: "#231F20" }}>
                    Tax :
                  </h6>
                  <p className="fw-lighter">Inclusive</p>
                </div>
                <div>
                  <h6 className="fw-bold" style={{ color: "#231F20" }}>
                    CommissionPaidOn
                  </h6>
                  <p className="fw-lighter">Course Fees</p>
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
