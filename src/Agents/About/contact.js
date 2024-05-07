import React from "react";
import Header from "../Agents/AgentHeader";
import Footer from "../../compoents/Footer";
import { CiSearch } from 'react-icons/ci';

const Contact = () => {
  return (
    <div>
      <Header />
      <br /><br />
      <div style={{ width: '100%', height: '400px', backgroundImage: `url(${"https://campusdirect.io/static/media/banner.b190f2c0.jpg"})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="mask" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', height: '400px' }}>
          <div className='text-center'>
            <div className='pt-4 text-light text-center ms-5'>
              <h4 className='mt-5 fw-bold'>Don't miss out!</h4>
              <h4 className='fw-bold '>Explore the vibrant events happening locally and globally.</h4>
            </div>
            <div className='mt-5 position-relative'>
              <span className="position-absolute start-25 text-center p-2 px-3 border-0" id="inputGroup-sizing-default"><CiSearch className="fs-5" /></span>
              <input
                type="search"
                placeholder="Search"
                aria-describedby="button-addon3"
                className="form-control-lg bg-light border-0 ps-5 w-50"
              />
            </div>
            <div>
              <div className="container-box rotated mt-5">
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#popupModal">
                  Enquiry
                </button>
              </div>
              <div className="modal fade" id="popupModal" tabIndex={-1} aria-labelledby="popupModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title fw-bold" id="popupModalLabel">Enquiry Us</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                      <form id="contact_form" name="contact_form" method="post">
                        <div className="mb-3">
                          <label htmlFor="email_addr" className='form-label'>Email address</label>
                          <input type="email" required maxLength={50} className="form-control" id="email_addr" name="email" placeholder="Enter The Email" />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="name_input" className='form-label'>Name</label>
                          <input type="text" required maxLength={50} className="form-control" id="name_input" name="name" placeholder="Enter The Name" />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="phone_input" className='form-label'>Phone</label>
                          <input type="tel" required maxLength={50} className="form-control" id="phone_input" name="Phone" placeholder="Enter The Phone" />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="message" className='form-label'>Message</label>
                          <textarea className="form-control" id="message" name="message" rows={3} defaultValue={""} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          </div>
          <div className="row g-4">
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
              <h5>Get In Touch</h5>
              <p className="mb-4">Afynd professional are expert and creative. Weâ€™re capable enough to handle your complex projects in a most innovative way. We deliver IT & Business solutions to achieve challenging business objectives. <a href="https://afynd.com/">Touch Now</a>.</p>
              <div className="d-flex align-items-center mb-3">
                <div className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary" style={{ width: 50, height: 50 }}>
                  <i className="fa fa-map-marker-alt text-white" />
                </div>
                <div className="ms-3">
                  <h5 className="text-primary">Office</h5>
                  <p className="mb-0">17/A2, 3rd Floor, Daaru Complex, Gandhi St, Alwartirunagar, Chennai - 600 091</p>
                </div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary" style={{ width: 50, height: 50 }}>
                  <i className="fa fa-phone-alt text-white" />
                </div>
                <div className="ms-3">
                  <h5 className="text-primary">Mobile</h5>
                  <p className="mb-0">+91 98765 12340</p>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary" style={{ width: 50, height: 50 }}>
                  <i className="fa fa-envelope-open text-white" />
                </div>
                <div className="ms-3">
                  <h5 className="text-primary">Email</h5>
                  <p className="mb-0">info@example.com</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
              <iframe className="position-relative rounded w-100 h-100" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.6308475275847!2d80.1860759148148!3d13.044570390728517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52675282a32249%3A0x7e7ac7268da97b24!2s17%2FA2%2C%203rd%20Floor%2C%20Daaru%20Complex%2C%20Gandhi%20St%2C%20Alwartirunagar%2C%20Chennai%2C%20Tamil%20Nadu%20600087!5e0!3m2!1sen!2sin!4v1641299492069!5m2!1sen!2sin&q=17%2FA2%2C%203rd%20Floor%2C%20Daaru%20Complex%2C%20Gandhi%20St%2C%20Alwartirunagar%2C%20Chennai%2C%20Tamil%20Nadu%20600087" frameBorder={0} style={{ minHeight: 300, border: 0 }} allowFullScreen aria-hidden="false" tabIndex={0} />
            </div>
            <div className="col-lg-4 col-md-12 wow fadeInUp" data-wow-delay="0.5s">
              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input type="text" className="form-control" id="name" placeholder="Your Name" />
                      <label htmlFor="name">Your Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input type="email" className="form-control" id="email" placeholder="Your Email" />
                      <label htmlFor="email">Your Email</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input type="text" className="form-control" id="subject" placeholder="Subject" />
                      <label htmlFor="subject">Subject</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea className="form-control" placeholder="Leave a message here" id="message" style={{ height: 150 }} defaultValue={""} />
                      <label htmlFor="message">Message</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary w-100 py-3" type="submit">Send Message</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Contact