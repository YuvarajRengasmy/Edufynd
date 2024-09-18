import React, { useState, useEffect } from "react";
import { getSingleAccommodationEnquiry } from "../../../api/Enquiry/accommodation";
import { useLocation } from "react-router-dom";
import Flags from "react-world-flags";
import Mastersidebar from "../../../compoents/AdminSidebar";
import { Link } from "react-router-dom";
export const ViewAccommodation = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [accommodation, setAccommodation] = useState(null);

  useEffect(() => {
    getAccommodationDetails();
  }, []);

  const getAccommodationDetails = () => {
    getSingleAccommodationEnquiry(id)
      .then((res) => {
        console.log("res", res);
        setAccommodation(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Mastersidebar />

      <div className="content-wrapper" style={{ fontSize: "14px" }}>
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
                <div
                  className="card-header mt-3 border-0 rounded-end-pill position-absolute top-0 start-0"
                  style={{ background: "#fe5722", color: "#fff" }}
                >
                  <h6 className="text-center text-capitalize p-1 h6">
                    View Accommodation Enquiry Details
                  </h6>
                </div>

                <div class="card-body">
                  <table
                    className="table table-hover table-bordered table-striped-columns mt-5"
                    style={{
                      fontFamily: "Plus Jakarta Sans",
                      fontSize: "14px",
                    }}
                  >
                    <tbody>
                      {accommodation?.agentName ? (
                        <>
                          <tr>
                            <td className="fw-bold">Source: Student/Agent</td>
                            <td>{accommodation?.source || "Not Available"}</td>
                          </tr>
                          <tr>
                            <td className="fw-bold">Agent ID</td>
                            <td>{accommodation?.agentId || "Not Available"}</td>
                          </tr>
                          <tr>
                            <td className="fw-bold">Agent Name</td>
                            <td>
                              {accommodation?.agentName || "Not Available"}
                            </td>
                          </tr>
                          <tr>
                            <td className="fw-bold">Agent Business Name</td>
                            <td>
                              {accommodation?.businessName || "Not Available"}
                            </td>
                          </tr>
                          <tr>
                            <td className="fw-bold">Agent Primary Number</td>
                            <td>
                              {accommodation?.dial3 +
                                " " +
                                accommodation?.agentPrimaryNumber ||
                                "Not Available"}
                            </td>
                          </tr>
                          <tr>
                            <td className="fw-bold">Agent WhatsApp Number</td>
                            <td>
                              {accommodation?.dial4 +
                                " " +
                                accommodation?.agentWhatsAppNumber ||
                                "Not Available"}
                            </td>
                          </tr>
                          <tr>
                            <td className="fw-bold">Agent Email ID</td>
                            <td>
                              {accommodation?.agentEmail || "Not Available"}
                            </td>
                          </tr>
                        </>
                      ) : (
                        <>
                          <tr>
                            <td className="fw-bold">Name of the Student</td>
                            <td>
                              {accommodation?.studentName || "Not Available"}
                            </td>
                          </tr>
                        </>
                      )}
                      {/* Common fields */}
                      <tr>
                        <td className="fw-bold">Name of the Student</td>
                        <td>{accommodation?.name || "Not Available"}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">ClientName</td>
                        <td>{accommodation?.typeOfClient || "Not Available"}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Passport Number</td>
                        <td>
                          {accommodation?.passportNumber || "Not Available"}
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Expiry Date</td>
                        <td>{accommodation?.expiryDate || "Not Available"}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Student Email ID</td>
                        <td>{accommodation?.email || "Not Available"}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Student Primary Number</td>
                        <td>
                          {accommodation?.dial1 +
                            " " +
                            accommodation?.primaryNumber || "Not Available"}
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Student WhatsApp number</td>
                        <td>
                          {accommodation?.dial2 +
                            " " +
                            accommodation?.whatsAppNumber || "Not Available"}
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-bold">University Name</td>
                        <td>
                          {accommodation?.universityName || "Not Available"}
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Course</td>
                        <td>{accommodation?.courseType || "Not Available"}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Accommodation Type</td>
                        <td>
                          {accommodation?.accommodationType || "Not Available"}
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Country</td>
                        <td>{accommodation?.country || "Not Available"}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">State</td>
                        <td>{accommodation?.state || "Not Available"}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">City</td>
                        <td>{accommodation?.lga || "Not Available"}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">
                          Assigned To (List Staff) Multiple Assign
                        </td>
                        <td>{accommodation?.assignedTo || "Not Available"}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Finalised By</td>
                        <td>{accommodation?.final || "Not Available"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewAccommodation;
