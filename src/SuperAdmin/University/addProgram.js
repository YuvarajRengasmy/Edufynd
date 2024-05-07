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
                AddProgram
              </h3>
              <div className="modal-btn">
                <a
                  className="text-decoration-none text-dark"
                  data-bs-toggle="modal"
                  data-bs-target="#modal_6"
                  aria-controls="modal_6"
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
                id="modal_6"
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
                          AddProgram
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
                                  Program Title : <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  name="to"
                                  placeholder="Enter Your Program Title"
                                  className="form-control"
                                  id="to"
                                />
                              </div>
                              <div className="mb-3 col">
                                <label htmlFor="role" className="form-label">
                                  Course Type :  <span className="text-danger">*</span>
                                </label>
                                <select
                                  name="role"
                                  className="form-select"
                                  id="role"
                                >
                                  <option value="1">Select In Option</option>
                                  <option value="1">UG</option>
                                  <option value="2">PG</option>
                                  <option value="2">Phd</option>
                                  <option value="2">HSC</option>
                                </select>
                              </div>
                              <div className="mb-3 col">
                                <label
                                  htmlFor="organization"
                                  className="form-label"
                                >
                                  Application Fees :
                                  <span className="text-danger">*</span>
                                </label>
                                <select
                                  name="role"
                                  className="form-select"
                                  id="role"
                                >
                                  <option value="1">Select In Option</option>
                                  <option value="1">Currency</option>
                                  <option value="2">Amount</option>
                                  <option value="2">Discounted Value</option>
                                </select>
                              </div>
                              <div className="mb-3 col">
                                <label className="form-label">
                                  Campus :<span className="text-danger">*</span>
                                </label>
                                <select
                                  name="role"
                                  className="form-select"
                                  id="role"
                                >
                                  <option value="1">Select In Option</option>
                                  <option value="1">Uk</option>
                                  <option value="2">USA</option>
                                  <option value="2">Dubai</option>
                                </select>
                              </div>
                              <div className="mb-3 col">
                                <label className="form-label">
                                  Course Fee : <span className="text-danger">*</span>
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
                                  Intake :
                                  <span className="text-danger">*</span>
                                </label>
                                <select
                                  name="role"
                                  className="form-select"
                                  id="role"
                                >
                                  <option value="1">Select In Option</option>
                                  <option value="1">JAN - April</option>
                                  <option value="2">May - Augest</option>
                                  <option value="2">Sep - Dec</option>
                                </select>
                              </div>
                              <div className="mb-2">
                                <label
                                  htmlFor="location"
                                  className="form-label"
                                >
                                  Program Duration :<span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  name="to"
                                  placeholder="Enter Your Program Durugation"
                                  className="form-control"
                                  id="to"
                                />
                              </div>
                              <div className="mb-2">
                                <label
                                  htmlFor="location"
                                  className="form-label"
                                >
                                  English language Test (ELT)  :<span className="text-danger">*</span>
                                </label>
                                <select
                                  name="location"
                                  className="form-select"
                                  id="location"
                                >
                                  <option value="1">Select In Option</option>
                                  <option value="1">Yes</option>
                                  <option value="2">No</option>
                                </select>
                              </div>
                              <div className="mb-2">
                                <label
                                  htmlFor="location"
                                  className="form-label"
                                >
                                  University Interview   :<span className="text-danger">*</span>
                                </label>
                                <select
                                  name="location"
                                  className="form-select"
                                  id="location"
                                >
                                  <option value="1">Select In Option</option>
                                  <option value="1">Yes</option>
                                  <option value="2">No</option>
                                </select>
                              </div>
                              <div className="mb-2">
                                <label
                                  htmlFor="location"
                                  className="form-label"
                                >
                                  GRE/GMAT requirement   :<span className="text-danger">*</span>
                                </label>
                                <select
                                  name="location"
                                  className="form-select"
                                  id="location"
                                >
                                  <option value="1">Select In Option</option>
                                  <option value="1">Yes</option>
                                  <option value="2">No</option>
                                </select>
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
                <h4 className="fw-bold align-items-center justify-content-start">Program Title : Python</h4>
                <div className="modal-btn d-flex gap-2 align-items-center justify-content-end">
                  <Link
                    className="btn  btn-sm btn-light  border-0"
                    data-bs-toggle="modal"
                    data-bs-target="#modal_6"
                    aria-controls="modal_6"
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
                    Course Type  :
                  </h6>
                  <p className="fw-lighter">UG</p>
                </div>
                <div>
                  <h6 className="fw-bold" style={{ color: "#231F20" }}>
                    Application Fees
                    :
                  </h6>
                  <p className="fw-lighter">Currency
                  </p>
                </div>
                <div>
                  <h6 className="fw-bold" style={{ color: "#231F20" }}>
                    Campus :
                  </h6>
                  <p className="fw-lighter">USA</p>
                </div>
                <div>
                  <h6 className="fw-bold" style={{ color: "#231F20" }}>
                    Course Fee  :
                  </h6>
                  <p className="fw-lighter">25000</p>
                </div>
                <div>
                  <h6 className="fw-bold" style={{ color: "#231F20" }}>
                    Intake :
                  </h6>
                  <p className="fw-lighter"> Open</p>
                </div>
                <div>
                  <h6 className="fw-bold" style={{ color: "#231F20" }}>
                    Duration :
                  </h6>
                  <p className="fw-lighter">6month</p>
                </div>
                <div>
                  <h6 className="fw-bold" style={{ color: "#231F20" }}>
                    University Interview
                  </h6>
                  <p className="fw-lighter">Yes</p>
                </div>
                <div>
                  <h6 className="fw-bold" style={{ color: "#231F20" }}>
                    GRE/GMAT requirement
                  </h6>
                  <p className="fw-lighter">Yes</p>
                </div>
              </div>
            </div>
            <div className="card rounded px-3 pt-1 ">
              <div className="container">
                <h4 className="fw-bold align-items-center justify-content-start">Program Title : Python</h4>
                <div className="modal-btn d-flex gap-2 align-items-center justify-content-end">

                  <Link

                    className="btn  btn-sm btn-light  border-0"
                    data-bs-toggle="modal"
                    data-bs-target="#modal_6"
                    aria-controls="modal_6"
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
                    Course Type  :
                  </h6>
                  <p className="fw-lighter">UG</p>
                </div>
                <div>
                  <h6 className="fw-bold" style={{ color: "#231F20" }}>
                    Application Fees
                    :

                  </h6>
                  <p className="fw-lighter">Currency
                  </p>
                </div>
                <div>
                  <h6 className="fw-bold" style={{ color: "#231F20" }}>
                    Campus :

                  </h6>
                  <p className="fw-lighter">USA</p>
                </div>
                <div>
                  <h6 className="fw-bold" style={{ color: "#231F20" }}>
                    Course Fee  :
                  </h6>
                  <p className="fw-lighter">25000</p>
                </div>
                <div>
                  <h6 className="fw-bold" style={{ color: "#231F20" }}>
                    Intake :
                  </h6>
                  <p className="fw-lighter"> Open</p>
                </div>
                <div>
                  <h6 className="fw-bold" style={{ color: "#231F20" }}>
                    Duration :
                  </h6>
                  <p className="fw-lighter">6month</p>
                </div>
                <div>
                  <h6 className="fw-bold" style={{ color: "#231F20" }}>
                    University Interview
                  </h6>
                  <p className="fw-lighter">Yes</p>
                </div>
                <div>
                  <h6 className="fw-bold" style={{ color: "#231F20" }}>
                    GRE/GMAT requirement
                  </h6>
                  <p className="fw-lighter">Yes</p>
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
