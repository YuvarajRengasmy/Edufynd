import React  from "react";
import { Link } from "react-router-dom";
import { CiSearch } from 'react-icons/ci';
import {Dialog,DialogContent,DialogTitle,IconButton,Pagination,} from "@mui/material";
const Studentpage = () => {

  
  return (
    <div>
      <div>
        <aside className="main-sidebar elevation-8" style={{ backgroundColor: "#fcf6f9" }} >
          <div style={{ marginLeft: "100px" }} className="d-md-none  shadow-lg rounded  position-absolute">
          </div>
          <div className="sidebar">
            <div className="user-panel mt-2 pb-3  d-flex ">
            </div>
            <div className="user-panel mt-2 pb-3  d-flex">
              <div className="image">
              </div>
              <div className="info  ">
                <a href="/Dashboard" className="brand-text font-weight-light text-decoration-none">
                  <h1 style={{ color: "#FE5722", fontSize: "30px", fontWeight: "bold" }}> EduFynd</h1>
                </a>
                <a className="d-block text-sm text-white" style={{ textDecoration: "none" }}>
                </a>
              </div>
            </div>
            <nav>
              <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <li className="nav-item">
                  <a href="/AgentHome" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                    <i className="nav-icon fas fa-tachometer-alt" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Dashboard Icon */}
                    <p style={{ fontSize: "16px", fontWeight: "bold" }}>Home</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/AgentAbout" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                    <i className="nav-icon fas fa-university" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* University Icon */}
                    <p style={{ fontSize: "16px", fontWeight: "bold" }}>About</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/AgentProgram" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                    <i className="nav-icon fas fa-user-graduate" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Student Icon */}
                    <p style={{ fontSize: "16px", fontWeight: "bold" }}>Program</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/Studentpage" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                    <i className="nav-icon fas fa-user-secret" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Agent Icon */}
                    <p style={{ fontSize: "16px", fontWeight: "bold" }}>Student</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/AgentContact" className="nav-link" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }}>
                    <i className="nav-icon fas fa-code" style={{ color: "#191725", fontSize: "16px", fontWeight: "bold" }} /> {/* Program Icon */}
                    <p style={{ fontSize: "16px", fontWeight: "bold" }}>Contact</p>
                  </a>
                </li>
              </ul>
              <br />
            </nav>
          </div>
        </aside>
        <div className="content-wrapper">
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <div className=' position-relative mr-5 mt-2'>
                    <span className="position-absolute start-25 text-center p-2 px-3 border-0" id="inputGroup-sizing-default"><CiSearch className="fs-5" /></span>
                    <input type="search" placeholder="Search" aria-describedby="button-addon3" className="form-control-lg bg-light border-0 ps-5 w-100%" />
                  </div>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb d-flex justify-content-end align-items-center">
                    <li class="m-2">
                      <Link class="btn-filters" >
                        <button className="btn btn-outline-primary p-2">
                          <span>
                            <i class="fa fa-file-pdf" aria-hidden="true"></i>
                          </span>
                        </button>
                      </Link>
                    </li>
                    <li class="m-2">
                      <Link class="btn-filters" >
                        <span>
                          <button className="btn btn-outline-primary p-2">
                            <i class="fa fa-file-excel" aria-hidden="true"></i>
                          </button>
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link class="btn-filters" >
                        <span>
                          <button className="btn btn-outline-primary p-2">
                            <i class="fa fa-filter" aria-hidden="true"></i>
                          </button>
                        </span>
                      </Link>
                    </li>
                    <li class="m-2">
                      <Link class="btn btn-pix-primary" to="/AddStudent">
                        <button
                          className="btn btn-outline border text-white rounded-pill p-2"
                          style={{ backgroundColor: "#9265cc" }}
                        >
                          <i
                            class="fa fa-plus-circle me-2"
                            aria-hidden="true"
                          ></i>{" "}
                          Add Student
                        </button>
                      </Link>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="card mt-2">
                <div className="card-body">
                  <div className="card-table">
                    <div className="table-responsive">
                      <table className=" table card-table dataTable text-center">
                        <thead>
                          <tr style={{ color: "#9265cc" }}>
                            <th>S.No</th>
                            <th>Student Code </th>
                            <th>Student Name </th>
                            <th>Email ID </th>
                            <th> Status </th>
                            <th>CreatedBy </th>
                            <th> Action </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr >
                            <td>1</td>
                            <td>AG0845</td>
                            <td>John</td>
                            <td>johninfo@gmail.com</td>
                            <td>Active</td>
                            <td>Agent</td>
                           
                            <td>
                              <div className="dropdown dropdown-action">
                                <a
                                  href="/#"
                                  className="action-icon dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="fe fe-more-horizontal"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <a href="/ViewAgentStudent" className="dropdown-item">
                                    <i className="far fa-eye me-2"></i>&nbsp;View
                                  </a>
                                  <a href="/EditAgentStudent" className="dropdown-item">
                                    <i className="far fa-edit me-2"></i>&nbsp;Edit
                                  </a>
                                  <a href="/" className="dropdown-item">
                                    <i className="far fa-trash-alt me-2"></i>&nbsp;Delete
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr >
                            <td>2</td>
                            <td>AG0985</td>
                            <td>John</td>
                            <td>johninfo@gmail.com</td>
                            <td>Active</td>
                            <td>Agent</td>
                           
                            <td>
                              <div className="dropdown dropdown-action">
                                <a
                                  href="/#"
                                  className="action-icon dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="fe fe-more-horizontal"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <a href="/ViewAgentStudent" className="dropdown-item">
                                    <i className="far fa-eye me-2"></i>&nbsp;View
                                  </a>
                                  <a href="/EditAgentStudent" className="dropdown-item">
                                    <i className="far fa-edit me-2"></i>&nbsp;Edit
                                  </a>
                                  <a href="/" className="dropdown-item">
                                    <i className="far fa-trash-alt me-2"></i>&nbsp;Delete
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr >
                            <td>3</td>
                            <td>AG0785</td>
                            <td>John</td>
                            <td>johninfo@gmail.com</td>
                            <td>Active</td>
                            <td>Staff</td>
                           
                            <td>
                              <div className="dropdown dropdown-action">
                                <a
                                  href="/#"
                                  className="action-icon dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="fe fe-more-horizontal"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <a href="/ViewAgentStudent" className="dropdown-item">
                                    <i className="far fa-eye me-2"></i>&nbsp;View
                                  </a>
                                  <a href="/EditAgentStudent" className="dropdown-item">
                                    <i className="far fa-edit me-2"></i>&nbsp;Edit
                                  </a>
                                  <a href="/" className="dropdown-item">
                                    <i className="far fa-trash-alt me-2"></i>&nbsp;Delete
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr >
                            <td>4</td>
                            <td>AG2345</td>
                            <td>John</td>
                            <td>johninfo@gmail.com</td>
                            <td>Active</td>
                            <td>Staff</td>
                           
                            <td>
                              <div className="dropdown dropdown-action">
                                <a
                                  href="/#"
                                  className="action-icon dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="fe fe-more-horizontal"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <a href="/ViewAgentStudent" className="dropdown-item">
                                    <i className="far fa-eye me-2"></i>&nbsp;View
                                  </a>
                                  <a href="/EditAgentStudent" className="dropdown-item">
                                    <i className="far fa-edit me-2"></i>&nbsp;Edit
                                  </a>
                                  <a href="/" className="dropdown-item">
                                    <i className="far fa-trash-alt me-2"></i>&nbsp;Delete
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr >
                            <td>5</td>
                            <td>AG5445</td>
                            <td>John</td>
                            <td>johninfo@gmail.com</td>
                            <td>Active</td>
                            <td>Agent</td>
                           
                            <td>
                              <div className="dropdown dropdown-action">
                                <a
                                  href="/#"
                                  className="action-icon dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="fe fe-more-horizontal"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <a href="/ViewAgentStudent" className="dropdown-item">
                                    <i className="far fa-eye me-2"></i>&nbsp;View
                                  </a>
                                  <a href="/EditAgentStudent" className="dropdown-item">
                                    <i className="far fa-edit me-2"></i>&nbsp;Edit
                                  </a>
                                  <a href="/" className="dropdown-item">
                                    <i className="far fa-trash-alt me-2"></i>&nbsp;Delete
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr >
                            <td>6</td>
                            <td>AG0845</td>
                            <td>John</td>
                            <td>johninfo@gmail.com</td>
                            <td>Active</td>
                            <td>Staff</td>
                           
                            <td>
                              <div className="dropdown dropdown-action">
                                <a
                                  href="/#"
                                  className="action-icon dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="fe fe-more-horizontal"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <a href="/ViewAgentStudent" className="dropdown-item">
                                    <i className="far fa-eye me-2"></i>&nbsp;View
                                  </a>
                                  <a href="/EditAgentStudent" className="dropdown-item">
                                    <i className="far fa-edit me-2"></i>&nbsp;Edit
                                  </a>
                                  <a href="/" className="dropdown-item">
                                    <i className="far fa-trash-alt me-2"></i>&nbsp;Delete
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr >
                            <td>7</td>
                            <td>AG0845</td>
                            <td>John</td>
                            <td>johninfo@gmail.com</td>
                            <td>Active</td>
                            <td>Agent</td>
                           
                            <td>
                              <div className="dropdown dropdown-action">
                                <a
                                  href="/#"
                                  className="action-icon dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="fe fe-more-horizontal"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <a href="/ViewAgentStudent" className="dropdown-item">
                                    <i className="far fa-eye me-2"></i>&nbsp;View
                                  </a>
                                  <a href="/EditAgentStudent" className="dropdown-item">
                                    <i className="far fa-edit me-2"></i>&nbsp;Edit
                                  </a>
                                  <a href="/" className="dropdown-item">
                                    <i className="far fa-trash-alt me-2"></i>&nbsp;Delete
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr >
                            <td>8</td>
                            <td>AG0845</td>
                            <td>John</td>
                            <td>johninfo@gmail.com</td>
                            <td>Active</td>
                            <td>Agent</td>
                           
                            <td>
                              <div className="dropdown dropdown-action">
                                <a
                                  href="/#"
                                  className="action-icon dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="fe fe-more-horizontal"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <a href="/ViewStudent" className="dropdown-item">
                                    <i className="far fa-eye me-2"></i>&nbsp;View
                                  </a>
                                  <a href="/EditAgent" className="dropdown-item">
                                    <i className="far fa-edit me-2"></i>&nbsp;Edit
                                  </a>
                                  <a href="/" className="dropdown-item">
                                    <i className="far fa-trash-alt me-2"></i>&nbsp;Delete
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="form-text text-danger" colSpan="9">
                              No data
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="float-right my-2">
                    <Pagination />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="text-center text-white" style={{ backgroundColor: '#3f51b5' }}>
          <div className="container">
            <section className="mb-5 ">
              <div className="row d-flex justify-content-center">
                <div className="col-lg-6 mt-5">
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
      <Dialog>
        <DialogContent>
          <div className="text-center m-4">
            <h5 className="mb-4">
              Are you sure you want to Delete <br /> the selected Product ?
            </h5>
            <button
              type="button"
              className="btn btn-save mx-3"
             
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn-cancel "
             
            >
              No
            </button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog  fullWidth maxWidth="sm">
        <DialogTitle>
          Filter Products
          <IconButton className="float-right" >
            <i className="fa fa-times fa-xs" aria-hidden="true"></i>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form>
            <div className="from-group mb-3">
              <label className="form-label">Search By Selling</label>
              <br />
              <input
                type="text"
                className="form-control"
                name="selling"
               
                
                placeholder="search..."
              />
            </div>
            <div>
              <button
                type="button"
                className="btn btn-cancel border text-white float-right bg"
                style={{ backgroundColor: "#9265cc" }}
                
              >
                Reset
              </button>
              <button
                type="submit"
               
                className="btn btn-save border text-white float-right mx-2"
                style={{ backgroundColor: "#9265cc" }}
              >
                Apply
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default Studentpage;