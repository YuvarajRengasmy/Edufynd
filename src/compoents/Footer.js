import React, { useEffect, useState, useRef } from "react";
const Footer = () => {
    return (
        <div >
            <footer className="text-center text-white" style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
                <div className="container">
                    <section className="mt-5">
                        <div className="row text-center d-flex justify-content-center pt-3">
                            <div className="col-md-2">
                                <h6 className="text-uppercase font-weight-bold">
                                    <a href="#!" className="text-white text-decoration-none ">About us</a>
                                </h6>
                            </div>
                            <div className="col-md-2">
                                <h6 className="text-uppercase font-weight-bold">
                                    <a href="#!" className="text-white text-decoration-none">Programs</a>
                                </h6>
                            </div>
                            <div className="col-md-2">
                                <h6 className="text-uppercase font-weight-bold">
                                    <a href="#!" className="text-white text-decoration-none">University</a>
                                </h6>
                            </div>
                            <div className="col-md-2">
                                <h6 className="text-uppercase font-weight-bold">
                                    <a href="#!" className="text-white text-decoration-none">Faq</a>
                                </h6>
                            </div>
                            <div className="col-md-2">
                                <h6 className="text-uppercase font-weight-bold">
                                    <a href="#!" className="text-white text-decoration-none">Contact</a>
                                </h6>
                            </div>
                        </div>
                    </section>
                    <hr className="my-5" />
                    <section className="mb-5">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-6">
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
                                    distinctio earum repellat quaerat voluptatibus placeat nam,
                                    commodi optio pariatur est quia magnam eum harum corrupti
                                    dicta, aliquam sequi voluptate quas.
                                </p>
                            </div>
                        </div>
                    </section>
                    <section className="text-center mb-5">
                        <a href="/" className="text-white me-4">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="/" className="text-white me-4">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="/" className="text-white me-4">
                            <i className="fab fa-google"></i>
                        </a>
                        <a href="/" className="text-white me-4">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="/" className="text-white me-4">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="/" className="text-white me-4">
                            <i className="fab fa-github"></i>
                        </a>
                    </section>
                </div>
                <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                    © 2024 Copyright:
                    <a className="text-white text-decoration-none" href="https://mdbootstrap.com/">Edufynd</a>
                </div>
            </footer>
        </div>
    )
}
export default Footer;