import React, { useState } from "react";
import Header from "../Home/HeaderHome";
import Footer from "../../compoents/Footer";
const Contact = () => {
  return (
    <div>
      <Header /><br /><br />
      <main id="main" className="main mt-5">
        <div className="pagetitle">
        </div>
        <section className="section contact">
          <div className="row gy-4">
            <div className="col-xl-6">
              <div className="row">
                <div className="col-lg-6">
                  <div className="info-box card text-center">
                    <i className="bi bi-geo-alt fs-4" style={{ color: "#0D206B" }} ><h5>Address</h5></i>

                    <p>17/3A2, Gandhi St, Alwartirunagar<br />Chennai-600087 Tamil Nadu, India</p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="info-box card text-center">
                    <i className="bi bi-telephone fs-4 " style={{ color: "#0D206B" }} > <h5>Call Us</h5> </i>
                    <p>+91 94861 54327<br /> +91 04123 45678</p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="info-box card text-center ">
                    <i className="bi bi-envelope fs-4" style={{ color: "#0D206B" }}><h5>Email Us</h5></i>
                    <p>info@example.com<br />contact@example.com</p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="info-box card text-center">
                    <i className="bi bi-clock fs-4" style={{ color: "#0D206B" }}> <h5>Open Hours</h5></i>
                    <p>Monday - Friday<br />9:00AM - 05:00PM</p>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="info-box card">
                    <p className="fs-4 fw-italic" style={{ color: "#0D206B" }}>EduFynd is an Edtech company that helps students achieve their study abroad dreams. Join us in crafting a world where education transcends borders.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="card p-4">
                <form action="forms/contact.php" method="post" className="php-email-form">
                  <div className="row gy-4">
                    <div className="col-md-6">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input type="text" name="name" className="form-control" placeholder="Your Name" required />
                    </div>
                    <div className="col-md-6 ">
                      <label htmlFor="name" className="form-label">Email</label>
                      <input type="email" className="form-control" name="email" placeholder="Your Email" required />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="name" className="form-label">Subject</label>
                      <input type="text" className="form-control" name="subject" placeholder="Subject" required />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="name" className="form-label">Message</label>
                      <textarea className="form-control" name="message" rows={6} placeholder="Message" required defaultValue={""} />
                    </div>
                    <div className="col-md-12 text-center">
                      <button className="btn btn-primary" type="submit">Send Message</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
export default Contact;