import React, { useState, useEffect } from "react";
import { getSingleAgent } from "../../api/agent";
import { useLocation } from "react-router-dom";
import Sidebar from "../../compoents/sidebar";
import { Link } from "react-router-dom";
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

        <nav aria-label="breadcrumb">
  <ol className="breadcrumb justify-content-end">
    <li className="breadcrumb-item">
      <Link to='/DashBoard' target="_self" className="text-decoration-none">Dashboard</Link>
    </li>
    <li className="breadcrumb-item">
      <Link to='/ListAgent' className="text-decoration-none">ListAgent</Link>
    </li>
   {/* if edit is clicked the page should go to the edit page of that particular uiversity */}
      <li  className="breadcrumb-item">
        <Link to={{
          pathname: "/EditAgent",
          search: `?id=${ agent?._id}`,
        }} className="text-decoration-none">EditAgent</Link>
      </li>
  
  </ol>
</nav>
         
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
                    <h3 className="agent-name">{agent?.agentName}</h3>
                    <p className="card-text">{agent?.source}</p>
                    <button className="btn btn-primary btn-sm">
                      <i className="fas fa-envelope"></i> {agent?.email}
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
                        <strong>Account Name:</strong> {agent?.accountName}
                      </li>
                      <li className="list-group-item">
                        <strong>Bank Name:</strong> {agent?.bankName}
                      </li>
                      <li className="list-group-item">
                        <strong>Account Number:</strong> {agent?.accountNumber}
                      </li>
                      <li className="list-group-item">
                        <strong>Branch:</strong> {agent?.branch}
                      </li>
                      <li className="list-group-item">
                        <strong>IFSC:</strong> {agent?.ifsc}
                      </li>
                      <li className="list-group-item">
                        <strong>Account Type:</strong> {agent?.accountType}
                      </li>
                      <li className="list-group-item">
                        <strong>Swift:</strong> {agent?.swift}
                      </li>
                      <li className="list-group-item">
                        <strong>Commission:</strong> {agent?.agentsCommission}
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
                            <strong>Agent Code:</strong> {agent?.agentCode}
                          </li>
                          <li className="list-group-item">
                            <strong>Agent Name:</strong> {agent?.agentName}
                          </li>
                          <li className="list-group-item">
                            <strong>Business Name:</strong>{" "}
                            {agent?.businessName}
                          </li>
                          <li className="list-group-item">
                            <strong>Email:</strong> {agent?.email}
                          </li>
                          <li className="list-group-item">
                            <strong>Mobile Number:</strong>{" "}
                            {agent?.mobileNumber}
                          </li>
                          <li className="list-group-item">
                            <strong>WhatsApp Number:</strong>{" "}
                            {agent?.whatsAppNumber}
                          </li>
                          <li className="list-group-item">
                            <strong>Address Line 1:</strong>{" "}
                            {agent?.addressLine1}
                          </li>
                          <li className="list-group-item">
                            <strong>Address Line 2:</strong>{" "}
                            {agent?.addressLine2}
                          </li>
                          <li className="list-group-item">
                            <strong>Address Line 3:</strong>{" "}
                            {agent?.addressLine3}
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <ul className="list-group">
                          <li className="list-group-item">
                            <strong>Country:</strong> {agent?.country}
                          </li>
                          <li className="list-group-item">
                            <strong>State:</strong> {agent?.state}
                          </li>
                          <li className="list-group-item">
                            <strong>City:</strong> {agent?.city}
                          </li>
                          <li className="list-group-item">
                            <strong>PIN:</strong> {agent?.pin}
                          </li>
                          <li className="list-group-item">
                            <strong>Business Website:</strong>{" "}
                            {agent?.businessWebsite}
                          </li>
                          <li className="list-group-item">
                            <strong>GSTN:</strong> {agent?.gstn}
                          </li>
                          <li className="list-group-item">
                            <strong>PAN (Individual):</strong>{" "}
                            {agent?.panNumberIndividual}
                          </li>
                          <li className="list-group-item">
                            <strong>PAN (Company):</strong>{" "}
                            {agent?.panNumberCompany}
                          </li>
                          <li className="list-group-item">
                            <strong>Staff Name:</strong> {agent?.staffName}
                          </li>
                          <li className="list-group-item">
                            <strong>Staff Contact No:</strong>{" "}
                            {agent?.staffContactNo}
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
                            {agent?.registrationNo}
                          </li>
                          <li className="list-group-item">
                            <strong>Business Type:</strong>{" "}
                            {agent?.businessType}
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <ul className="list-group">
                          <li className="list-group-item">
                            <strong>Require Visa Filing Support:</strong>{" "}
                            {agent?.requireVisaFilingSupport ? "Yes" : "No"}
                          </li>
                          <li className="list-group-item">
                            <strong>Visa Commission:</strong>{" "}
                            {agent?.visaCommission}
                          </li>
                        </ul>
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
}

export default Profile;
