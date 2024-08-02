import React from "react";
import Sidebar from "../../compoents/sidebar";

export const ViewAppliaction = () => {
    return (
        <>
            <Sidebar />
            <div className="content-wrapper" style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}>
                <div className="content-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="card border-0 shadow-sm p-2">
                                    <div className="card-body">
                                        <div class="position-relative m-4">
                                            <div class="progress" role="progressbar " aria-label="Progress" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style={{ height: " 7px" }}>
                                                <div class="progress-bar progress-bar-striped progress-bar-animated" style={{ width: "50%" }}></div>
                                            </div>
                                            <button type="button" class="position-absolute top-0 translate-middle btn btn-sm btn-primary rounded-pill" data-bs-toggle="modal" data-bs-target="#exampleModal1" style={{ width: "2rem", height: "2rem", left: '0' }}>1</button>
                                            <button type="button" class="position-absolute top-0  translate-middle btn btn-sm btn-success rounded-pill" data-bs-toggle="modal" data-bs-target="#exampleModal2" style={{ width: "2rem", height: "2rem", left: '20%' }}>2</button>
                                            <button type="button" class="position-absolute top-0  translate-middle btn btn-sm btn-secondary rounded-pill" data-bs-toggle="modal" data-bs-target="#exampleModal3" style={{ width: "2rem", height: "2rem", left: '40%' }}>3</button>
                                            <button type="button" class="position-absolute top-0  translate-middle btn btn-sm btn-danger rounded-pill" data-bs-toggle="modal" data-bs-target="#exampleModal4" style={{ width: "2rem", height: "2rem", left: '60%' }}>4</button>
                                            <button type="button" class="position-absolute top-0  translate-middle btn btn-sm btn-warning rounded-pill" data-bs-toggle="modal" data-bs-target="#exampleModal5" style={{ width: "2rem", height: "2rem", left: '80%' }}>5</button>
                                            <button type="button" class="position-absolute top-0  translate-middle btn btn-sm btn-light rounded-pill" data-bs-toggle="modal" data-bs-target="#exampleModal6" style={{ width: "2rem", height: "2rem", left: '100%' }}>6</button>
                                        </div>





                                        <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Application Status</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="input-group mb-3">
                                                            <span class="input-group-text" id="basic-addon1"><i class="fa fa-tasks nav-icon text-dark"></i></span>
                                                            <input type="text" class="form-control" placeholder="Enter Status...." aria-label="Username" aria-describedby="basic-addon1" style={{ fontSize: '12px' }} />
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn  px-4 py-2 text-uppercase fw-semibold" data-bs-dismiss="modal" style={{ fontSize: '12px', backgroundColor: '#231f20', color: '#fff' }}>Close</button>
                                                        <button type="button" class="btn  px-4 py-2 text-uppercase fw-semibold" style={{ fontSize: '12px', backgroundColor: '#fe5722', color: '#fff' }}>Submit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Application Status</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="input-group mb-3">
                                                            <span class="input-group-text" id="basic-addon1"><i class="fa fa-tasks nav-icon text-dark"></i></span>
                                                            <input type="text" class="form-control" placeholder="Enter Status...." aria-label="Username" aria-describedby="basic-addon1" style={{ fontSize: '12px' }} />
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn  px-4 py-2 text-uppercase fw-semibold" data-bs-dismiss="modal" style={{ fontSize: '12px', backgroundColor: '#231f20', color: '#fff' }}>Close</button>
                                                        <button type="button" class="btn  px-4 py-2 text-uppercase fw-semibold" style={{ fontSize: '12px', backgroundColor: '#fe5722', color: '#fff' }}>Submit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Application Status</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="input-group mb-3">
                                                            <span class="input-group-text" id="basic-addon1"><i class="fa fa-tasks nav-icon text-dark"></i></span>
                                                            <input type="text" class="form-control" placeholder="Enter Status...." aria-label="Username" aria-describedby="basic-addon1" style={{ fontSize: '12px' }} />
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn  px-4 py-2 text-uppercase fw-semibold" data-bs-dismiss="modal" style={{ fontSize: '12px', backgroundColor: '#231f20', color: '#fff' }}>Close</button>
                                                        <button type="button" class="btn  px-4 py-2 text-uppercase fw-semibold" style={{ fontSize: '12px', backgroundColor: '#fe5722', color: '#fff' }}>Submit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="modal fade" id="exampleModal4" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Application Status</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="input-group mb-3">
                                                            <span class="input-group-text" id="basic-addon1"><i class="fa fa-tasks nav-icon text-dark"></i></span>
                                                            <input type="text" class="form-control" placeholder="Enter Status...." aria-label="Username" aria-describedby="basic-addon1" style={{ fontSize: '12px' }} />
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn  px-4 py-2 text-uppercase fw-semibold" data-bs-dismiss="modal" style={{ fontSize: '12px', backgroundColor: '#231f20', color: '#fff' }}>Close</button>
                                                        <button type="button" class="btn  px-4 py-2 text-uppercase fw-semibold" style={{ fontSize: '12px', backgroundColor: '#fe5722', color: '#fff' }}>Submit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="modal fade" id="exampleModal5" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Application Status</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="input-group mb-3">
                                                            <span class="input-group-text" id="basic-addon1"><i class="fa fa-tasks nav-icon text-dark"></i></span>
                                                            <input type="text" class="form-control" placeholder="Enter Status...." aria-label="Username" aria-describedby="basic-addon1" style={{ fontSize: '12px' }} />
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn  px-4 py-2 text-uppercase fw-semibold" data-bs-dismiss="modal" style={{ fontSize: '12px', backgroundColor: '#231f20', color: '#fff' }}>Close</button>
                                                        <button type="button" class="btn  px-4 py-2 text-uppercase fw-semibold" style={{ fontSize: '12px', backgroundColor: '#fe5722', color: '#fff' }}>Submit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="modal fade" id="exampleModal6" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Application Status</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="input-group mb-3">
                                                            <span class="input-group-text" id="basic-addon1"><i class="fa fa-tasks nav-icon text-dark"></i></span>
                                                            <input type="text" class="form-control" placeholder="Enter Status...." aria-label="Username" aria-describedby="basic-addon1" style={{ fontSize: '12px' }} />
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn  px-4 py-2 text-uppercase fw-semibold" data-bs-dismiss="modal" style={{ fontSize: '12px', backgroundColor: '#231f20', color: '#fff' }}>Close</button>
                                                        <button type="button" class="btn  px-4 py-2 text-uppercase fw-semibold" style={{ fontSize: '12px', backgroundColor: '#fe5722', color: '#fff' }}>Submit</button>
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
            </div>
        </>
    );
};
export default ViewAppliaction;
