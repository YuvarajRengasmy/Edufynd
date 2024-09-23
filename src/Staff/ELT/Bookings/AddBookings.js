import React from "react";
import Sidebar from "../../../compoents/StaffSidebar";
import { Link } from "react-router-dom";
export const AddBookings = () => {
  return (
    <>
      <Sidebar />

      <div
        className="content-wrapper "
        style={{ fontFamily: "Plus Jakarta Sans", fontSize: "13px" }}
      >
        <div className="content-header ">
          <div className="content container-fluid ">
            <form>
              <div className="row">
                <div className="col-xl-12 ">
                  <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
                    <div
                      className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0"
                      style={{ background: "#fe5722", color: "#fff" }}
                    >
                      <h5 className="text-center text-capitalize p-1">
                        {" "}
                        Add Bookings Details
                      </h5>
                    </div>
                    <div className="card-body mt-5">
                      <div className="row mb-3">
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Student Name<span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control rounded-2 "
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            placeholder="Example John Doe"
                            name="studetname"
                          />
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            ELT Test Name <span className="text-danger">*</span>
                          </label>

                          <select
                            class="form-select form-select-lg rounded-2"
                            aria-label="Default select example"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                          >
                            <option selected>Select ELT</option>
                            <option value=" IELTS "> IELTS </option>
                            <option value=" TOEFL"> TOEFL</option>
                            <option value=" PTE"> PTE</option>
                            <option value=" Cambridge English Exams ">
                              {" "}
                              Cambridge English Exams
                            </option>
                            <option value=" Duolingo English Test">
                              {" "}
                              Duolingo English Test
                            </option>
                            <option value=" TOEIC">TOEIC</option>
                          </select>
                        </div>

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                            Schedule Class{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="datetime-local"
                            className="form-control rounded-2 text-uppercase "
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            placeholder="Example 29-07-2024 12:47 "
                            name="scheduleclass"
                          />
                        </div>
                      </div>
                      <div className="add-customer-btns mb-40 d-flex justify-content-end  ml-auto">
                        <Link
                          to="/staff_list_bookings"
                          style={{
                            backgroundColor: "#231F20",
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                          type="reset"
                          className="btn btn-cancel border-0 fw-semibold text-uppercase text-white px-4 py-2  m-1"
                        >
                          Cancel
                        </Link>
                        <button
                          style={{
                            backgroundColor: "#FE5722",
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                          type="submit"
                          className="btn btn-save border-0 fw-semibold text-uppercase text-white px-4 py-2 m-1"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddBookings;
