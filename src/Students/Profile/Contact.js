import React, { useState } from "react";
import Header from "../Home/HeaderHome";
import { toast } from "react-toastify";
import { saveContact } from "../../api/student";
import Footer from "../../compoents/Footer";
import Sidebar from "../../compoents/AgentSidebar";
const Contact = () => {
  const initialStateInputs = {
    name: "",
    email: "",
    mobileNumber: "",
    messages: "",
  };

  const initialStateErrors = {
    name: { required: false },
    email: { required: false },
    mobileNumber: { required: false },
    messages: { required: false },
  };

  const [inputs, setInputs] = useState(initialStateInputs);
  const [errors, setErrors] = useState(initialStateErrors);
  const [submitted, setSubmitted] = useState(false);

  const handleInputs = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
    if (submitted) {
      setErrors({ ...errors, [event.target.name]: false });
    }
  };

  const handleValidation = (data) => {
    let newErrors = { ...initialStateErrors };

    if (data.name === "") {
      newErrors.name = true;
    }
    if (data.email === "") {
      newErrors.email = true;
    }
    if (data.mobileNumber === "") {
      newErrors.mobileNumber = true;
    }
    if (data.messages === "") {
      newErrors.messages = true;
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(inputs);
    setErrors(newError);
    setSubmitted(true);
    const allInputsValid = Object.values(newError);
    const valid = allInputsValid.some((x) => x.required === true);
    if (!valid) {
      saveContact(inputs)
        .then((res) => {
          toast.success(res?.data?.message);
          event.target.reset();
          setInputs(initialStateInputs);
          setErrors(initialStateErrors);
          setSubmitted(false);
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };
  return (
    <>
      <Sidebar />
      <div className="content-wrapper" style={{fontSize:'14px',fontFamily:'plus jarkata'}}>
        <main id="main" >
          
          <section className="section content-header">
            <div className="container">

            
            <div className="row gy-4">
              <div className="col-xl-6">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="info-box card text-center border-0 rounded-2 shadow-sm">
                      <i
                        className="bi bi-geo-alt fs-4"
                        style={{ color: "#fe5722" }}
                      >
                        <h5>Address</h5>
                      </i>

                      <p>
                        17/3A2, Gandhi St, Alwartirunagar
                        <br />
                        Chennai-600087 Tamil Nadu, India
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="info-box card text-center border-0 rounded-2 shadow-sm ">
                      <i
                        className="bi bi-telephone fs-4 "
                        style={{ color: "#fe5722" }}
                      >
                        {" "}
                        <h5>Call Us</h5>{" "}
                      </i>
                      <p>
                        +91 94861 54327
                        <br /> +91 04123 45678
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="info-box card text-center border-0 rounded-2 shadow-sm ">
                      <i
                        className="bi bi-envelope fs-4"
                        style={{ color: "#fe5722" }}
                      >
                        <h5>Email Us</h5>
                      </i>
                      <p>
                        info@example.com
                        <br />
                        contact@example.com
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="info-box card text-center border-0 rounded-2 shadow-sm">
                      <i
                        className="bi bi-clock fs-4"
                        style={{ color: "#fe5722" }}
                      >
                        {" "}
                        <h5>Open Hours</h5>
                      </i>
                      <p>
                        Monday - Friday
                        <br />
                        9:00AM - 05:00PM
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="info-box card border-0 rounded-2">
                      <p
                        className="fs-4 fw-italic"
                        style={{ color: "#0D206B" }}
                      >
                        EduFynd is an Edtech company that helps students achieve
                        their study abroad dreams. Join us in crafting a world
                        where education transcends borders.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="card p-4 border-0 rounded-2 shadow">
                  <form onSubmit={handleSubmit}>
                    <div className="row gy-4">
                      <div className="col-md-6">
                        <label htmlFor="name" className="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          onChange={handleInputs}
                          className="form-control"
                          placeholder="Your Name"
                          required
                        />
                        {errors.name?.required ? (
                          <span className="text-danger form-text">
                            This field is required.
                          </span>
                        ) : null}
                      </div>
                      <div className="col-md-6 ">
                        <label htmlFor="name" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          onChange={handleInputs}
                          placeholder="Your Email"
                          required
                        />
                        {errors.email?.required ? (
                          <span className="text-danger form-text">
                            This field is required.
                          </span>
                        ) : null}
                      </div>
                      <div className="col-md-12">
                        <label htmlFor="name" className="form-label">
                          Mobile
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="mobileNumber"
                          onChange={handleInputs}
                          placeholder="Enter Mobile Number"
                          required
                        />
                        {errors.mobileNumber?.required ? (
                          <span className="text-danger form-text">
                            This field is required.
                          </span>
                        ) : null}
                      </div>
                      <div className="col-md-12">
                        <label htmlFor="name" className="form-label">
                          Message
                        </label>
                        <textarea
                          className="form-control"
                          name="message"
                          onChange={handleInputs}
                          rows={6}
                          placeholder="Message"
                          required
                          defaultValue={""}
                        />
                        {errors.messages?.required ? (
                          <span className="text-danger form-text">
                            This field is required.
                          </span>
                        ) : null}
                      </div>
                      <div className="col-md-12 text-center">
                        <button
                          className="btn border-0 rounded-2 text-white fw-semibold"
                          type="submit"
                          style={{ backgroundColor: "#fe5722" }}
                        >
                          Send Message
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};
export default Contact;
