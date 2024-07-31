import React, { useEffect, useState } from "react";
import {
  isValidEmail,
  isValidPassword,
  isValidPhone,
} from "../../Utils/Validation";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { saveNotifications } from "../../api/Notification/Notification";

import Sidebar from "../../compoents/AdminSidebar";

import "react-quill/dist/quill.snow.css";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { RichTextEditor } from "@mantine/rte";

export const AdminAddNotifications = () => {
  const initialState = {
    typeOfUser: "",
    userName: "",
    subject: "",
    // content: "",
    uploadImage: "",
  };

  const initialStateErrors = {
    typeOfUser: { required: false },
    userName: { required: false },
    subject: { required: false },
    // content: { required: false },
    uploadImage: { required: false },
  };

  const navigate = useNavigate();
  const handleValidation = (data) => {
    let error = initialStateErrors;

    if (data.typeOfUser === "") {
      error.typeOfUser.required = true;
    }

    if (data.userName === "") {
      error.userName.required = true;
    }

    if (data.subject === "") {
      error.subject.required = true;
    }
    // if (data.content === "") {
    //   error.content.required = true;
    // }
    if (data.uploadImage === "") {
      error.uploadImage.required = true;
    }

    return error;
  };

  const [notification, setnotification] = useState(initialState);
  const [errors, setErrors] = useState(initialStateErrors);
  const [submitted, setSubmitted] = useState(false);

  const handleInputs = (event) => {
    const { name, value } = event.target;
    const updateNotifications = { ...notification, [name]: value };
    setnotification(updateNotifications);

    if (submitted) {
      const newError = handleValidation(updateNotifications);
      setErrors(newError);
    }
  };
  const handleErrors = (obj) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const prop = obj[key];
        if (prop.required === true || prop.valid === true) {
          return false;
        }
      }
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(notification);
    setErrors(newError);
    setSubmitted(true);
    const updateNotifications = {
      ...notification,
    };
    if (handleErrors(newError)) {
      saveNotifications(updateNotifications)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/ListNotifications");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    } else {
      toast.error("Please fill mandatory fields");
    }
  };

  return (
    <>
      <div>
        <Sidebar />

        <div
          className="content-wrapper "
          style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
        >
          <div className="content-header ">
            <div className=" container-fluid ">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-xl-12 ">
                    <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
                      <div
                        className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0"
                        style={{ background: "#fe5722", color: "#fff" }}
                      >
                        <h5 className="text-center text-capitalize p-1">
                          {" "}
                          Add Notifications Details
                        </h5>
                      </div>
                      <div className="card-body mt-5">
                        <div className="row g-3">
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Type of Users{" "}
                              <span className="text-danger">*</span>
                            </label>

                            <select
                              class="form-select form-select-lg"
                              name="typeOfUser"
                              onChange={handleInputs}
                              aria-label="Default select example"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                            >
                              <option selected>Select User</option>
                              <option value="Staff">Staff</option>
                              <option value="Student">Student</option>
                              <option value="Agent">Agent</option>
                            </select>
                            {errors.typeOfUser.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                          </div>

                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              UserName<span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control "
                              onChange={handleInputs}
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              placeholder="Enter UserName"
                              name="userName"
                            />
                            {errors.userName.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : null}
                          </div>
                          <div className="row gy-2 ">
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Subject<span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control "
                                onChange={handleInputs}
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                placeholder="Enter  Subject"
                                name="subject"
                              />
                              {errors.subject.required ? (
                                <div className="text-danger form-text">
                                  This field is required.
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className="row gy-2 ">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Content<span className="text-danger">*</span>
                              </label>
                              <RichTextEditor
                                placeholder="Start writing your content here..."
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                  minHeight: "200px",
                                  overflowY: "auto",
                                }}
                                name="content"
                                // onChange={handleInputs}
                              />
                            </div>
                          </div>
                          <div className="row gy-2 ">
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                              <label style={{ color: "#231F20" }}>
                                Image upload
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="file"
                                className="form-control "
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                placeholder="Enter  Image upload"
                                name="uploadImage"
                                onChange={handleInputs}
                              />
                              {errors.uploadImage.required ? (
                                <div className="text-danger form-text">
                                  This field is required.
                                </div>
                              ) : null}
                            </div>
                          </div>

                          <div className="add-customer-btns mb-40 d-flex justify-content-end  ml-auto">
                            <button
                              style={{
                                backgroundColor: "#231F20",
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              type="reset"
                              className="btn btn-cancel border-0 fw-semibold text-uppercase text-white px-4 py-2  m-1"
                            >
                              Cancel
                            </button>
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
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminAddNotifications;
