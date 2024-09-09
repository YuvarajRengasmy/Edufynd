import React, { useState, useEffect } from "react";
import { getSingleForexEnquiry } from "../../../api/Enquiry/Forex";
import { useLocation } from "react-router-dom";
import Flags from "react-world-flags";
import Mastersidebar from "../../../compoents/AdminSidebar";

export const AdminViewForex = () => {
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
      <div>
        <Mastersidebar />

        <div className="content-wrapper" style={{ fontSize: "14px" }}>
          <div className="content-header">
            <div className="container-fluid">
              <div className="card border-0 rounded-0 shadow-sm p-3 position-relative">
                <div
                  className="card-header mt-3 border-0 rounded-end-pill position-absolute top-0 start-0"
                  style={{ background: "#fe5722", color: "#fff" }}
                >
                  <h5 className="text-center text-capitalize p-1">
                    FOREX Details
                  </h5>
                </div>
                <div className="card-body">
                  {forex ? (
                    <table
                      className="table table-hover table-bordered table-striped-columns mt-5"
                      style={{
                        fontFamily: "Plus Jakarta Sans",
                        fontSize: "14px",
                      }}
                    >
                      <tbody>
                        <tr>
                          <td className="fw-bold">Forex ID</td>
                          <td>{forex.forexID}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Source</td>
                          <td>{forex.source}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Agent Name</td>
                          <td>{forex.agentName}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Business Name</td>
                          <td>{forex.businessName}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Agent Primary Number</td>
                          <td>{forex.agentPrimaryNumber}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Agent WhatsApp Number</td>
                          <td>{forex.agentWhatsAppNumber}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Agent Email</td>
                          <td>{forex.agentEmail}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Student Name</td>
                          <td>{forex.studentName}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Passport No</td>
                          <td>{forex.passportNo}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Expiry Date</td>
                          <td>Expiry Date</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Email ID</td>
                          <td>{forex.email}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Primary Number</td>
                          <td>{forex.primaryNumber}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">WhatsApp Number</td>
                          <td>{forex.whatsAppNumber}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">University Name</td>
                          <td>{forex.universityName}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Course</td>
                          <td>Course</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Payment Type</td>
                          <td>{forex.paymentType}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Country</td>
                          <td>{forex.country}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Flag</td>
                          <td>
                            <Flags
                              code={forex.flag}
                              className="me-2"
                              name="flag"
                              style={{ width: "40px", height: "30px" }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Currency</td>
                          <td>{forex.currency}</td>
                        </tr>

                        <tr>
                          <td className="fw-bold">Amount In Currency</td>
                          <td>{forex.amountInCurrency}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Assigned To</td>
                          <td>{forex.assignedTo}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Mark up</td>
                          <td>Mark up</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Profit (Value*Mark up)</td>
                          <td>Profit (Value*Mark up)</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Status</td>
                          <td>{forex.status ? forex.status : "-"}</td>
                        </tr>
                      </tbody>
                    </table>
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminViewForex;
