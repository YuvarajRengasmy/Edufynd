import React, { useEffect, useState, useRef } from "react";
import Sortable from "sortablejs";
import {getallBlog,deleteBlog} from "../../api/blog";
import { formatDate } from "../../Utils/DateFormat";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Pagination,
} from "@mui/material";
import { toast } from "react-toastify";

import Mastersidebar from "../../compoents/sidebar";

import { FaFilter } from "react-icons/fa";

export const ListBlog = () => {

  const [blog, setBlog] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const [open, setOpen] = useState(false);

  const pageSize = 8;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });
  useEffect(() => {
    getAllUniversityDetails();
  }, [pagination.from, pagination.to]);

  const getAllUniversityDetails = () => {
    const data = {
      limit: 8,
      page: pagination.from,
    };
    getallBlog(data)
      .then((res) => {
        console.log(res?.data?.result);
        setBlog(res?.data?.result);
        setPagination({
          ...pagination,
          count: res?.data?.result,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openPopup = (data) => {
    setOpen(true);
    setDeleteId(data);
  };

  const closePopup = () => {
    setOpen(false);
  };
  const deleteClientData = () => {
    deleteBlog(deleteId)
      .then((res) => {
        toast.success(res?.data?.message);
        closePopup();
        getAllUniversityDetails();
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const tableRef = useRef(null);

  useEffect(() => {
    const table = tableRef.current;

    // Apply SortableJS to the table headers
    const sortable = new Sortable(table.querySelector("thead tr"), {
      animation: 150,
      swapThreshold: 0.5,
      handle: ".sortable-handle",
      onEnd: (evt) => {
        const oldIndex = evt.oldIndex;
        const newIndex = evt.newIndex;

        // Move the columns in the tbody
        table.querySelectorAll("tbody tr").forEach((row) => {
          const cells = Array.from(row.children);
          row.insertBefore(cells[oldIndex], cells[newIndex]);
        });
      },
    });

    return () => {
      sortable.destroy();
    };
  }, []);

  return (
    <>
      <Mastersidebar />

      <div
        className="content-wrapper"
        style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
      >
        <div className="content-header  bg-light shadow-sm sticky-top">
          <div className="container">
            <div className="row ">
              <div className="col-xl-12">
                <ol className="breadcrumb d-flex flex-row justify-content-end align-items-center w-100">
                  <li className="flex-grow-1">
                    <div className="input-group" style={{ maxWidth: "600px" }}>
                      <input
                        type="search"
                        placeholder="Search"
                        aria-describedby="button-addon3"
                        className="form-control-lg bg-white border-2 ps-1 rounded-4 w-100"
                        style={{
                          borderColor: "#FE5722",
                          paddingRight: "1.5rem",
                          marginLeft: "0px",
                          fontSize: "12px", // Keep the font size if it's correct
                          height: "11px", // Set the height to 11px
                          padding: "0px", // Adjust padding to fit the height
                        }}
                      />
                      <span
                        className="input-group-text bg-transparent border-0"
                        id="button-addon3"
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                        }}
                      >
                        <i
                          className="fas fa-search"
                          style={{ color: "black" }}
                        ></i>
                      </span>
                    </div>
                  </li>
                  <li class="m-1">
                    <div>
                      <button
                        className="btn btn-primary"
                        style={{ fontSize: "11px" }}
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRight"
                        aria-controls="offcanvasRight"
                      >
                        {" "}
                        <FaFilter />
                      </button>
                      <div
                        className="offcanvas offcanvas-end"
                        tabIndex={-1}
                        id="offcanvasRight"
                        aria-labelledby="offcanvasRightLabel"
                      >
                        <div className="offcanvas-header">
                          <h5 id="offcanvasRightLabel">Filter Notifications</h5>
                          <button
                            type="button"
                            className="btn-close text-reset"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                          />
                        </div>
                        <div className="offcanvas-body ">
                          <form>
                            <div className="from-group mb-3">
                              <label className="form-label">Date</label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="businessName"
                                placeholder="Search...Date"
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                              />
                              <label className="form-label">Subject</label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="businessContactNo"
                                placeholder="Search...Subject"
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                              />

                              <label className="form-label">Users</label>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                name="status"
                                placeholder="Search...Users"
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                              />
                            </div>
                            <div>
                              <button
                                data-bs-dismiss="offcanvas"
                                className="btn btn-cancel border-0 fw-semibold text-uppercase px-4 py-2 rounded-pill text-white float-right bg"
                                style={{
                                  backgroundColor: "#0f2239",
                                  color: "#fff",
                                  fontSize: "12px",
                                }}
                                // onClick={resetFilter}
                              >
                                Reset
                              </button>
                              <button
                                data-bs-dismiss="offcanvas"
                                type="submit"
                                // onClick={filterProgramList}
                                className="btn btn-save border-0 fw-semibold text-uppercase px-4 py-2 rounded-pill text-white float-right mx-2"
                                style={{
                                  backgroundColor: "#fe5722",
                                  color: "#fff",
                                  fontSize: "12px",
                                }}
                              >
                                Apply
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li class="m-1">
                    <Link>
                      <button
                        style={{ backgroundColor: "#E12929", fontSize: "11px" }}
                        className="btn text-white "
                      >
                        <span>
                          <i class="fa fa-file-pdf" aria-hidden="true"></i>
                        </span>
                      </button>
                    </Link>
                  </li>
                  <li class="m-1">
                    <Link class="btn-filters">
                      <span>
                        <button
                          style={{
                            backgroundColor: "#22A033",
                            fontSize: "11px",
                          }}
                          className="btn text-white "
                        >
                          <i class="fa fa-file-excel" aria-hidden="true"></i>
                        </button>
                      </span>
                    </Link>
                  </li>

                  <li class="m-1">
                    <Link class="btn-filters">
                      <span>
                        <button
                          style={{
                            backgroundColor: "#9265cc",
                            fontSize: "11px",
                          }}
                          className="btn text-white "
                        >
                          <i class="fa fa fa-upload" aria-hidden="true"></i>
                        </button>
                      </span>
                    </Link>
                  </li>
                  <li class="m-1">
                    <Link class="btn btn-pix-primary" to="/add_blog">
                      <button
                        className="btn btn-outline px-4 py-2  fw-semibold text-uppercase border-0 text-white  "
                        style={{ backgroundColor: "#fe5722", fontSize: "12px" }}
                      >
                        <i
                          class="fa fa-plus-circle me-2"
                          aria-hidden="true"
                        ></i>{" "}
                        Add Blog
                      </button>
                    </Link>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-3">
      <div className="row">
        {/* Card 1: Recent Blogs */}
        <div className="col-md-3 col-sm-6 mb-3">
          <div
            className="card rounded-3 border-0 text-white shadow-sm"
            style={{ backgroundColor: "#3F51B5" }} // Indigo
          >
            <div className="card-body">
              <h6 className="card-title">
                <i className="fas fa-pencil-alt" style={{ color: '#ffffff' }}></i> Recent Blogs
              </h6>
              <p className="card-text">Latest blog posts.</p>
              <p className="card-text">Total: 10</p>
            </div>
          </div>
        </div>

        {/* Card 2: Popular Blogs */}
        <div className="col-md-3 col-sm-6 mb-3">
          <div
            className="card rounded-3 border-0 text-white shadow-sm"
            style={{ backgroundColor: "#FFC107" }} // Amber
          >
            <div className="card-body">
              <h6 className="card-title">
                <i className="fas fa-star" style={{ color: '#ffffff' }}></i> Popular Blogs
              </h6>
              <p className="card-text">Most read and liked blogs.</p>
              <p className="card-text">Total: 15</p>
            </div>
          </div>
        </div>

        {/* Card 3: Draft Blogs */}
        <div className="col-md-3 col-sm-6 mb-3">
          <div
            className="card rounded-3 border-0 text-white shadow-sm"
            style={{ backgroundColor: "#00BCD4" }} // Cyan
          >
            <div className="card-body">
              <h6 className="card-title">
                <i className="fas fa-file-alt" style={{ color: '#ffffff' }}></i> Draft Blogs
              </h6>
              <p className="card-text">Blogs that are in draft stage.</p>
              <p className="card-text">Total: 8</p>
            </div>
          </div>
        </div>

        {/* Card 4: Archived Blogs */}
        <div className="col-md-3 col-sm-6 mb-3">
          <div
            className="card rounded-3 border-0 text-white shadow-sm"
            style={{ backgroundColor: "#607D8B" }} // Blue Grey
          >
            <div className="card-body">
              <h6 className="card-title">
                <i className="fas fa-archive" style={{ color: '#ffffff' }}></i> Archived Blogs
              </h6>
              <p className="card-text">Archived or old blog posts.</p>
              <p className="card-text">Total: 25</p>
            </div>
          </div>
        </div>
      </div>
    </div>
        <div className="content-body">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="card rounded-0  border-0">
                <div className="card-header bg-white mb-0 mt-1 pb-0">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex  mb-0">
                      <p className="me-auto ">
                        Change
                        <select
                          className="form-select form-select-sm rounded-1 d-inline mx-2"
                          aria-label="Default select example1"
                          style={{
                            width: "auto",
                            display: "inline-block",
                            fontSize: "12px",
                          }}
                        >
                          <option value="5">Active</option>
                          <option value="10">InActive</option>
                          <option value="20">Delete</option>
                        </select>{" "}
                      </p>
                      <button
        type="button"
        className="btn btn-outline-dark btn-sm px-4 py-2 text-uppercase fw-semibold"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <i className="fa fa-plus-circle" aria-hidden="true"></i> Assign to
      </button>
   

    {/* Modal */}
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Assign to
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">
                  Staff List
                </label>
                <input
                  type="text"
                  className="form-control rounded-1 text-capitalize"
                  id="exampleFormControlInput1"
                  placeholder="Example JohnDoe"
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger px-4 py-2 text-uppercase fw-semibold"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-success px-4 py-2 text-uppercase fw-semibold"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
                    </div>

                    <div>
                    
                       
                        <ul class="nav nav-underline fs-9" id="myTab" role="tablist">
                          <li>
                            {" "}
                            <a
              className="nav-link active "
              id="home-tab"
              data-bs-toggle="tab"
              href="#tab-home"
              role="tab"
              aria-controls="tab-home"
              aria-selected="true"
            >
                          <i class="fa fa-list" aria-hidden="true"></i>    List View
                            </a>
                          </li>
                          <li>
                            
                              <a
                              className="nav-link "
                              id="profile-tab"
                              data-bs-toggle="tab"
                              href="#tab-profile"
                              role="tab"
                              aria-controls="tab-profile"
                              aria-selected="false"
                            >
                            
                            <i class="fa fa-th" aria-hidden="true"></i>  Grid View
                            </a>
                          </li>
                        </ul>
                      
                     
                    </div>
                  </div>
                </div>
                  <div className="card-body">

                  <div className="tab-content ">
                    {/* List View */}
                    <div
                      className="tab-pane fade show active"
                      id="tab-home"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                    >
 <div className="card-table">
                      <div className="table-responsive">
                        <table
                          className=" table table-hover card-table  dataTable text-center"
                          style={{ color: "#9265cc", fontSize: "12px" }}
                          ref={tableRef}
                        >
                          <thead className="table-light">
                            <tr
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                            >
                              <th className="text-capitalize text-start sortable-handle">
                                S No
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                                Date
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                              Title
                              </th>
                              <th className="text-capitalize text-start sortable-handle">
                              Category
                              </th>

                              <th className="text-capitalize text-start sortable-handle">
                                Action{" "}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                          {blog?.map((data,index) => (
                            <tr
                            key={index}
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "11px",
                              }}
                            >
                              <td className="text-capitalize text-start text-truncate">{pagination.from + index + 1}</td>
                              <td className="text-capitalize text-start text-truncate"> {formatDate(data.createdOn)}</td>
                              <td className="text-capitalize text-start text-truncate">{data.title}</td>

                              <td className="text-capitalize text-start text-truncate">{data.category}</td>

                              <td className="text-capitalize text-start text-truncate">
                                <div className="d-flex">
                                  <Link
                                    className="dropdown-item"
                                    to={{
                                      pathname: "/view_blog",
                                      search: `?id=${data?._id}`,
                                    }}
                                    data-bs-toggle="tooltip"
                                    title="View"
                                  >
                                    <i className="far fa-eye text-primary me-1"></i>
                                  </Link>
                                  <Link
                                    className="dropdown-item"
                                    to={{
                                      pathname: "/edit_blog",
                                      search: `?id=${data?._id}`,
                                    }}
                                    data-bs-toggle="tooltip"
                                    title="Edit"
                                  >
                                    <i className="far fa-edit text-warning me-1"></i>
                                  </Link>
                                  <button
                                    className="dropdown-item"
                                    data-bs-toggle="tooltip"
                                    onClick={() => {
                                      openPopup(data?._id);
                                    }}
                                    title="Delete"
                                  >
                                    <i className="far fa-trash-alt text-danger me-1"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
 ))}

                          </tbody>
                        </table>
                      </div>
                    </div>

        
</div>



<div
                     class="tab-pane fade " id="tab-profile" role="tabpanel" aria-labelledby="profile-tab"
                    >
          
          <div className="container">
  <div className="row">
  {blog?.map((data,index) => (
      <div className="col-md-4 mb-4" key={index}>
        <div className="card shadow-sm  rounded-1 text-bg-light h-100" style={{fontSize:'10px'}}>
          <div className="card-header   d-flex justify-content-between align-items-center">
            <h6 className="mb-0"></h6>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-12 mb-2">
                <div className="row">
                  <div className="col-md-5">
                    <strong>S.No</strong>
                  </div>
                  <div className="col-md-7">
                  {pagination.from + index + 1}
                  </div>
                </div>
              </div>
              <div className="col-md-12 mb-2">
                <div className="row">
                  <div className="col-md-5">
                    <strong>Date</strong>
                  </div>
                  <div className="col-md-7">
                  {formatDate(data.createdOn)}
                  </div>
                </div>
              </div>
              <div className="col-md-12 mb-2">
                <div className="row">
                  <div className="col-md-5">
                    <strong>Title</strong>
                  </div>
                  <div className="col-md-7">
                  {data.title}
                  </div>
                </div>
              </div>
              <div className="col-md-12 mb-2">
                <div className="row">
                  <div className="col-md-5">
                    <strong>Category</strong>
                  </div>
                  <div className="col-md-7" style={{textAlign:'justify'}}>
                  {data.category}
                  </div>
                </div>
              </div>
            
            </div>
          </div>
          <div className="card-footer bg-light d-flex justify-content-between align-items-center border-top-0">
          <Link
                                    className="btn btn-sm btn-outline-primary"
                                    to={{
                                      pathname: "/view_blog",
                                      search: `?id=${data?._id}`,
                                    }}
                                    data-bs-toggle="tooltip"
                                    title="View"
                                  >
                                    <i className="far fa-eye text-primary me-1"></i>View
                                  </Link>
                                  <Link
                                    className="btn btn-sm btn-outline-warning"
                                    to={{
                                      pathname: "/edit_blog",
                                      search: `?id=${data?._id}`,
                                    }}
                                    data-bs-toggle="tooltip"
                                    title="Edit"
                                  >
                                    <i className="far fa-edit text-warning me-1"></i>Edit
                                  </Link>
                                  <button
                                    className="btn btn-sm btn-outline-danger"
                                    data-bs-toggle="tooltip"
                                    onClick={() => {
                                      openPopup(data?._id);
                                    }}
                                    title="Delete"
                                  >
                                    <i className="far fa-trash-alt text-danger me-1"></i>Delete
                                  </button>
          </div>
        </div>
      </div>
))}
  </div>
</div>







                    </div>
                </div>
                   

                    <div className="d-flex justify-content-between align-items-center p-3">
        <p className="me-auto ">
                          Show
                          <select
                            className="form-select form-select-sm rounded-1 d-inline mx-2"
                            aria-label="Default select example1"
                            style={{ width: "auto", display: "inline-block", fontSize: "12px" }}
                          >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                          </select>{" "}
                          Entries    out of 100
                        </p> 
                        <Pagination
                        variant="outlined"
                        shape="rounded"
                        color="primary"
                      />
        </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={open}>
        <DialogContent>
          <div className="text-center p-4">
            <h6 className="mb-4 text-capitalize">
              Are you sure you want to delete the selected Blog?
            </h6>
            <button
              type="button"
              className="btn btn-success px-4 py-2 border-0 rounded-pill fw-semibold text-uppercase mx-3"
              onClick={deleteClientData}
              style={{ fontSize: "12px" }}
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn-danger px-4 py-2 border-0 rounded-pill fw-semibold text-uppercase"
              onClick={closePopup}
              style={{ fontSize: "12px" }}
            >
              No
            </button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog fullWidth maxWidth="sm">
        <DialogTitle>
          Filter University
          <IconButton className="float-right">
            <i className="fa fa-times fa-xs" aria-hidden="true"></i>
          </IconButton>
        </DialogTitle>
        <DialogContent></DialogContent>
      </Dialog>
      <Dialog fullWidth maxWidth="sm">
        <DialogTitle>
          Upload University List
          <IconButton className="float-right">
            <i className="fa fa-times fa-xs" aria-hidden="true"></i>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form>
            <div className="from-group mb-3">
              <div className="mb-3">
                <input
                  type="file"
                  name="file"
                  className="form-control text-dark bg-transparent"
                  style={{ fontSize: "14px" }}
                />
              </div>
            </div>
            <div>
              <Link
                to="/ListUniversity"
                className="btn btn-cancel border-0 rounded-pill text-uppercase px-3 py-1 fw-semibold text-white float-right bg"
                style={{
                  backgroundColor: "#0f2239",
                  color: "#fff",
                  fontSize: "12px",
                }}
              >
                Cancel
              </Link>
              <button
                type="submit"
                // onClick={handleFileUpload}
                className="btn btn-save border-0 rounded-pill text-uppercase fw-semibold px-3 py-1 text-white float-right mx-2"
                style={{
                  backgroundColor: "#fe5722",
                  color: "#fff",
                  fontSize: "12px",
                }}
              >
                Apply
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default ListBlog;
