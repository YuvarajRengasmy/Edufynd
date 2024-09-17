import React, { useEffect, useState } from "react";
import Header from "../../compoents/header";
import Sidebar from "../../compoents/sidebar";
import { updateAdmin, getSingleAdmin } from "../../api/admin";
import { Link, useNavigate, useLocation } from "react-router-dom";
import BackButton from "../../compoents/backButton";
function AddAgent() {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [admin, setAdmin] = useState("");

  useEffect(() => {
    getAllClientDetails();
  }, []);

  const getAllClientDetails = () => {
    getSingleAdmin(id)
      .then((res) => {
        console.log(res);
        setAdmin(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Sidebar />

      <div
        className="content-wrapper"
        style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
      >
        <div className="content-header ">

        <BackButton/>
          <div className="container-fluid">
            <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
              <div
                className="card-header mt-3 border-0 rounded-end-pill position-absolute top-0 start-0"
                style={{ background: "#fe5722", color: "#fff" }}
              >
                <h6 className="text-center text-capitalize p-1">
                  View Admin Details
                </h6>
              </div>

              <div class="card-body">
                <table
                  className="table table-hover table-bordered table-striped-columns mt-5"
                  style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
                >
                  <tbody>
                    <tr>
                      <td className="fw-bold">Admin Name </td>
                      <td>{admin?.name}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Role </td>
                      <td>{admin?.role}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Email </td>
                      <td>{admin?.email}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Contact Number </td>
                      <td>{admin?.mobileNumber}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">createdBy </td>
                      <td>{admin?.createdBy}</td>
                    </tr>
                   
                   
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="container-fluid my-2">
  <div className="row ">
    <div className="col-12 col-lg-7 col-auto">
      <ul className="list-unstyled">
        
        <li className="mb-4 position-relative">
          <div className="row align-items-start g-0">

          <div className="col-1 d-flex justify-content-center align-items-center">
              <div className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center" style={{width: '2rem', height: '2rem'}}>
                <i className="fas fa-check" />
              </div>
            </div>
            <div className="col-4 text-center">
              <p className="mb-1 fw-semibold text-muted">23 August, 2023 10:30 AM</p>
              <p className="mb-0 text-muted">Changed by:<strong>John Doe</strong></p>
            </div>
           
          
           
            <div className="col-7">
            <div className="mb-3">
              
              <div className="bg-success text-white rounded-3 p-2">
                <h6 className="mb-1">New University Name</h6>
                <p className="mb-0">University Y</p>
              </div>
            </div>
              <div className="mb-3">
             
                <div className="bg-danger text-white rounded-3 p-2">
                  <h6 className="mb-1">Old University Name</h6>
                  <p className="mb-0">University X</p>
                </div>
              </div>
           
            </div>
          </div>
          <div className="position-absolute top-0 start-0 translate-middle-x" style={{width: 2, height: '100%', backgroundColor: '#007bff'}} />
        </li>
       
      </ul>
    </div>
  </div>
</div>
        </div>
      </div>
    </>
  );
}
export default AddAgent;
