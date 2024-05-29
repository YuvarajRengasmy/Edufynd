import React, { useEffect ,useState } from "react";
import { getallAdmin } from "../../api/admin";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, IconButton, Pagination, } from "@mui/material";
import Header from "../../compoents/header";
import Sidebar from "../../compoents/sidebar";
export default function ListAgent() {

  const pageSize = 10;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  const [admin, setAdmin] = useState();

  useEffect(() => {
    getAllAdminDetails();
  }, [pagination.from, pagination.to]);

  const getAllAdminDetails = () => {
    const data = {
      limit: 10,
      page: pagination.from,
    };

    getallAdmin(data)
      .then((res) => {
        console.log("yuvi",res)
        setAdmin(res?.data?.result);
        setPagination({ ...pagination, count: res?.data?.result?.adminCount });
      })
      .catch((err) => {
        console.log(err);
      });
  };



  
  return (
    <div>
      <div class="">
        <div class="">
          <Sidebar />
        </div>
      </div>
      <Header />
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 style={{ color: "#9265cc" }}>Admin List</h1>
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
                    <Link class="btn btn-pix-primary" to="/AddAdmin">
                      <button
                        className="btn btn-outline border text-white rounded-pill p-2"
                        style={{ backgroundColor: "#9265cc" }}
                      >
                        <i
                          class="fa fa-plus-circle me-2"
                          aria-hidden="true"
                        ></i>{" "}
                        Add Admin
                      </button>
                    </Link>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="container">
          <div className="col-md-11">
            <div className="card mt-2">
              <div className="card-body">
                <div className="card-table">
                  <div className="table-responsive">
                    <table className=" table card-table dataTable text-center">
                      <thead>
                        <tr style={{ color: "#9265cc" }}>
                          <th> S.No.</th>
                          <th> Admin ID </th>
                          <th> Name </th>
                          <th> Email ID </th>
                          <th> Role </th>
                          <th> Contact number </th>
                          <th> Action </th>
                        </tr>
                      </thead>
                      <tbody>
                      {admin?.map((data, index) => (
                        <tr key={index} >
                          <td>#{pagination.from + index + 1}</td>
                          <td>{data?.adminCode}</td>
                          <td>{data?.name}</td>
                          <td>{data?.email}</td>
                          <td>{data?.role}</td>
                          <td>{data?.mobileNumber}</td>
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
                                <a href="/ViewAdmin" className="dropdown-item">
                                  <i className="far fa-eye me-2"></i>&nbsp;View
                                </a>
                                <a href="/EditAdmin" className="dropdown-item">
                                  <i className="far fa-edit me-2"></i>&nbsp;Edit
                                </a>
                                <a href="/" className="dropdown-item">
                                  <i className="far fa-trash-alt me-2"></i>&nbsp;Delete
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                       {admin?.length === 0 ? (
                        <tr>
                          <td className="form-text text-danger" colSpan="9">
                            No data
                          </td>
                        </tr>
                       ) : null}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="float-right my-2">
                  <Pagination variant="outlined" shape="rounded" color="primary"/>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
      <Dialog >
        <DialogContent>
          <div className="text-center m-4">
            <h5 className="mb-4">
              Are you sure you want to Delete <br /> the selected Product ?
            </h5>
            <button
              type="button"
              className="btn btn-save mx-3">
              Yes
            </button>
            <button
              type="button"
              className="btn btn-cancel ">
              No
            </button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog fullWidth maxWidth="sm">
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
                style={{ backgroundColor: "#9265cc" }}>
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
}
