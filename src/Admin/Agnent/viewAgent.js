import React, { useState, useEffect } from "react";
import { getSingleAgent } from "../../api/agent";
import { useLocation } from "react-router-dom";
import Sidebar from "../../compoents/AdminSidebar";
import { Link } from "react-router-dom";
import BackButton from "../../compoents/backButton";
function Profile() {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [agent, setAgent] = useState(null);

  useEffect(() => {
    if (id) {
      getAgentDetails();
    }
  }, [id]);

  const getAgentDetails = () => {
    getSingleAgent(id)
      .then((res) => {
        setAgent(res?.data?.result);
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
        <div className="content-header">
          <BackButton />
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4">
              <div className="card border-0 text-center">
                <img
                  src={
                    agent?.agentBusinessLogo ||
                    "https://via.placeholder.com/150"
                  }
                  className="card-img-top img-fluid rounded-circle mx-auto img-thumbnail mt-3"
                  alt="Agent Photo"
                  style={{ width: "8rem", height: "8rem" }}
                />
                <div className="card-body">
                  <h3 className="agent-name">
                    {agent?.agentName || "Not Available"}
                  </h3>
                  <p className="card-text">
                    {agent?.source || "Not Available"}
                  </p>
                  <button className="btn btn-primary btn-sm">
                    <i className="fas fa-envelope"></i>{" "}
                    {agent?.email || "Not Available"}
                  </button>
                </div>
              </div>
              <div className="card mt-4">
                <div className="card-header bg-primary text-white">
                  <h5>Bank Details</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group">
                    <li className="list-group-item">
                      <strong>Account Name:</strong>{" "}
                      {agent?.accountName || "Not Available"}
                    </li>
                    <li className="list-group-item">
                      <strong>Bank Name:</strong>{" "}
                      {agent?.bankName || "Not Available"}
                    </li>
                    <li className="list-group-item">
                      <strong>Account Number:</strong>{" "}
                      {agent?.accountNumber || "Not Available"}
                    </li>
                    <li className="list-group-item">
                      <strong>Branch:</strong>{" "}
                      {agent?.branch || "Not Available"}
                    </li>
                    <li className="list-group-item">
                      <strong>IFSC:</strong> {agent?.ifsc || "Not Available"}
                    </li>
                    <li className="list-group-item">
                      <strong>Account Type:</strong>{" "}
                      {agent?.accountType || "Not Available"}
                    </li>
                    <li className="list-group-item">
                      <strong>Swift:</strong> {agent?.swift || "Not Available"}
                    </li>
                    <li className="list-group-item">
                      <strong>Commission:</strong>{" "}
                      {agent?.agentsCommission || "Not Available"}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card border-0 mb-4">
                <div className="card-header bg-primary text-white">
                  <h5>Agent Information</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <ul className="list-group">
                        <li className="list-group-item">
                          <strong>Agent Code:</strong>{" "}
                          {agent?.agentCode || "Not Available"}
                        </li>
                        <li className="list-group-item">
                          <strong>Agent Name:</strong>{" "}
                          {agent?.agentName || "Not Available"}
                        </li>
                        <li className="list-group-item">
                          <strong>Business Name:</strong>{" "}
                          {agent?.businessName || "Not Available"}
                        </li>
                        <li className="list-group-item">
                          <strong>Email:</strong>{" "}
                          {agent?.email || "Not Available"}
                        </li>
                        <li className="list-group-item">
                          <strong>Mobile Number:</strong>{" "}
                          {agent?.mobileNumber || "Not Available"}
                        </li>
                        <li className="list-group-item">
                          <strong>WhatsApp Number:</strong>{" "}
                          {agent?.whatsAppNumber || "Not Available"}
                        </li>
                        <li className="list-group-item">
                          <strong>Address Line 1:</strong>{" "}
                          {agent?.addressLine1 || "Not Available"}
                        </li>
                        <li className="list-group-item">
                          <strong>Address Line 2:</strong>{" "}
                          {agent?.addressLine2 || "Not Available"}
                        </li>
                        <li className="list-group-item">
                          <strong>Address Line 3:</strong>{" "}
                          {agent?.addressLine3 || "Not Available"}
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul className="list-group">
                        <li className="list-group-item">
                          <strong>Country:</strong>{" "}
                          {agent?.country || "Not Available"}
                        </li>
                        <li className="list-group-item">
                          <strong>State:</strong>{" "}
                          {agent?.state || "Not Available"}
                        </li>
                        <li className="list-group-item">
                          <strong>City:</strong>{" "}
                          {agent?.city || "Not Available"}
                        </li>
                        <li className="list-group-item">
                          <strong>PIN:</strong> {agent?.pin || "Not Available"}
                        </li>
                        <li className="list-group-item">
                          <strong>Business Website:</strong>{" "}
                          {agent?.businessWebsite || "Not Available"}
                        </li>
                        <li className="list-group-item">
                          <strong>GSTN:</strong>{" "}
                          {agent?.gstn || "Not Available"}
                        </li>
                        <li className="list-group-item">
                          <strong>PAN (Individual):</strong>{" "}
                          {agent?.panNumberIndividual || "Not Available"}
                        </li>
                        <li className="list-group-item">
                          <strong>PAN (Company):</strong>{" "}
                          {agent?.panNumberCompany || "Not Available"}
                        </li>
                        <li className="list-group-item">
                          <strong>Staff Name:</strong>{" "}
                          {agent?.staffName || "Not Available"}
                        </li>
                        <li className="list-group-item">
                          <strong>Staff Contact No:</strong>{" "}
                          {agent?.staffContactNo || "Not Available"}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card border-0 mb-4">
                <div className="card-header bg-primary text-white">
                  <h5>Business Details</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <ul className="list-group">
                        <li className="list-group-item">
                          <strong>Registration No:</strong>{" "}
                          {agent?.registrationNo || "Not Available"}
                        </li>
                        <li className="list-group-item">
                          <strong>Business Type:</strong>{" "}
                          {agent?.businessType || "Not Available"}
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul className="list-group">
                        <li className="list-group-item">
                          <strong>Require Visa Filing Support:</strong>{" "}
                          {agent?.requireVisaFilingSupport
                            ? "Yes"
                            : "No" || "Not Available"}
                        </li>
                        <li className="list-group-item">
                          <strong>Visa Commission:</strong>{" "}
                          {agent?.visaCommission || "Not Available"}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
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
                      <div
                        className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center"
                        style={{ width: "2rem", height: "2rem" }}
                      >
                        <i className="fas fa-check" />
                      </div>
                    </div>
                    <div className="col-4 text-center">
                      <p className="mb-1 fw-semibold text-muted">
                        23 August, 2023 10:30 AM
                      </p>
                      <p className="mb-0 text-muted">
                        Changed by:<strong>John Doe</strong>
                      </p>
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
                  <div
                    className="position-absolute top-0 start-0 translate-middle-x"
                    style={{
                      width: 2,
                      height: "100%",
                      backgroundColor: "#007bff",
                    }}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
