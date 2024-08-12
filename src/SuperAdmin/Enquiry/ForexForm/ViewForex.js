import React, { useState, useEffect } from "react";
import { getSingleForexEnquiry } from "../../../api/Enquiry/Forex";
import { useLocation } from "react-router-dom";
import Flags from "react-world-flags";
import Mastersidebar from "../../../compoents/sidebar";

export const ViewForex = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [forex, setForex] = useState(null);

  useEffect(() => {
    getForexDetails();
  }, []);

  const getForexDetails = () => {
    getSingleForexEnquiry(id)
      .then((res) => {
        setForex(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Mastersidebar />

      <div
        className="content-wrapper"
        style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
      >
        <div className="content-header">
          <div className="container">
            <div className="card  border-0">
              <div className="card-header  text-bg-primary ">
                <h6 className=" mb-0 p-2 fw-semibold">Forex Enquiry Profile</h6>
              </div>

              {forex ? (
                <div className="card-body">
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <h5>Agent Information</h5>
                      <div className="list-group">
                        <div className="list-group-item d-flex align-items-center">
                          <i className="fas fa-user-tie me-2 text-dark "></i>
                          <div>
                            <strong>Agent Name:</strong>
                            <p className="mb-0">
                              {forex.agentName || "Not Available"}
                            </p>
                          </div>
                        </div>
                        <div className="list-group-item d-flex align-items-center">
                          <i className="fas fa-building me-2 text-dark "></i>
                          <div>
                            <strong>Business Name:</strong>
                            <p className="mb-0">
                              {forex.businessName || "Not Available"}
                            </p>
                          </div>
                        </div>
                        <div className="list-group-item d-flex align-items-center">
                          <i className="fas fa-envelope me-2 text-dark "></i>
                          <div>
                            <strong>Agent Email ID:</strong>
                            <p className="mb-0">
                              {forex.agentEmail || "Not Available"}
                            </p>
                          </div>
                        </div>
                        <div className="list-group-item d-flex align-items-center">
                          <i className="fas fa-phone me-2 text-dark "></i>
                          <div>
                            <strong>Agent Primary Number:</strong>
                            <p className="mb-0">
                              {forex.agentPrimaryNumber || "Not Available"}
                            </p>
                          </div>
                        </div>
                        <div className="list-group-item d-flex align-items-center">
                          <i className="fab fa-whatsapp me-2 text-success"></i>
                          <div>
                            <strong>Agent WhatsApp Number:</strong>
                            <p className="mb-0">
                              {forex.agentWhatsAppNumber || "Not Available"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <h5>Student Information</h5>
                      <div className="list-group">
                        <div className="list-group-item d-flex align-items-center">
                          <i className="fas fa-user me-2 text-dark "></i>
                          <div>
                            <strong>Name of the Student:</strong>
                            <p className="mb-0">
                              {forex.studentName || "Not Available"}
                            </p>
                          </div>
                        </div>
                        <div className="list-group-item d-flex align-items-center">
                          <i className="fas fa-passport me-2 text-dark "></i>
                          <div>
                            <strong>Passport No:</strong>
                            <p className="mb-0">
                              {forex.passportNo || "Not Available"}
                            </p>
                          </div>
                        </div>
                        <div className="list-group-item d-flex align-items-center">
                          <i className="fas fa-calendar-alt me-2 text-dark "></i>
                          <div>
                            <strong>Expiry Date:</strong>
                            <p className="mb-0">
                              {forex.expiryDate || "Not Available"}
                            </p>
                          </div>
                        </div>
                        <div className="list-group-item d-flex align-items-center">
                          <i className="fas fa-envelope me-2 text-dark "></i>
                          <div>
                            <strong>Email ID:</strong>
                            <p className="mb-0">
                              {forex.email || "Not Available"}
                            </p>
                          </div>
                        </div>
                        <div className="list-group-item d-flex align-items-center">
                          <i className="fas fa-phone me-2 text-dark "></i>
                          <div>
                            <strong>Primary Number:</strong>
                            <p className="mb-0">
                              {forex.primaryNumber || "Not Available"}
                            </p>
                          </div>
                        </div>
                        <div className="list-group-item d-flex align-items-center">
                          <i className="fab fa-whatsapp me-2 text-success"></i>
                          <div>
                            <strong>WhatsApp Number:</strong>
                            <p className="mb-0">
                              {forex.whatsAppNumber || "Not Available"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-6">
                      <h5>Transaction Details</h5>
                      <div className="list-group">
                        <div className="list-group-item d-flex align-items-center">
                          <i className="fas fa-globe me-2 text-dark "></i>
                          <div>
                            <strong>Country:</strong>
                            <p className="mb-0">
                              {forex.country || "Not Available"}
                            </p>
                          </div>
                        </div>
                        <div className="list-group-item d-flex align-items-center">
                          <i className="fas fa-dollar-sign me-2 text-dark "></i>
                          <div>
                            <strong>Currency:</strong>
                            <p className="mb-0">
                              <Flags
                                code={forex.flag}
                                className="me-2"
                                name="flag"
                                style={{ width: "30px", height: "20px" }}
                              />
                              {forex.currency || "Not Available"}
                            </p>
                          </div>
                        </div>
                        <div className="list-group-item d-flex align-items-center">
                          <i className="fas fa-money-bill-wave-alt me-2 text-dark "></i>
                          <div>
                            <strong>Amount In Currency:</strong>
                            <p className="mb-0">
                              {forex.amountInCurrency || "Not Available"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <h5>Additional Details</h5>
                      <div className="list-group">
                        <div className="list-group-item d-flex align-items-center">
                          <i className="fas fa-user-tag me-2 text-dark "></i>
                          <div>
                            <strong>Assigned To:</strong>
                            <p className="mb-0">
                              {forex.assignedTo || "Not Available"}
                            </p>
                          </div>
                        </div>
                        <div className="list-group-item d-flex align-items-center">
                          <i className="fas fa-percent me-2 text-dark "></i>
                          <div>
                            <strong>Mark up:</strong>
                            <p className="mb-0">
                              {forex.markUp || "Not Available"}
                            </p>
                          </div>
                        </div>
                        <div className="list-group-item d-flex align-items-center">
                          <i className="fas fa-calculator me-2 text-dark "></i>
                          <div>
                            <strong>Profit (Value*Mark up):</strong>
                            <p className="mb-0">
                              {forex.profit || "Not Available"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center p-4">
                  <p>Loading...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewForex;
