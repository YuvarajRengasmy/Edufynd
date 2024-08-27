import React, { useState, useEffect } from "react";
import { getSingleAccommodationEnquiry } from "../../../api/Enquiry/accommodation";
import { useLocation } from "react-router-dom";
import Flags from "react-world-flags";
import Mastersidebar from "../../../compoents/sidebar";
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
      
        <div className="content-header">

        <nav aria-label="breadcrumb">
  <ol className="breadcrumb justify-content-end">
    <li className="breadcrumb-item">
      <Link to='/DashBoard' target="_self" className="text-decoration-none">Dashboard</Link>
    </li>
    <li className="breadcrumb-item">
      <Link to='/ListAccommodation' className="text-decoration-none">ListAccommodation</Link>
    </li>
   {/* if edit is clicked the page should go to the edit page of that particular uiversity */}
      <li  className="breadcrumb-item">
        <Link to={{
          pathname: "/EditAccommodation",
          search: `?id=${ accommodation?._id}`,
        }} className="text-decoration-none">EditAccommodation</Link>
      </li>
  
  </ol>
</nav>
         
        </div>
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
                        <tr>
                          <td className="fw-bold">Source: Student/Agent </td>
                          <td>{accommodation?.source || "Not Available"}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Agent ID </td>
                          <td>{accommodation?.agentId || "Not Available"}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Agent Name </td>
                          <td>{accommodation?.agentName || "Not Available"}</td>
                        </tr>{" "}
                        <tr>
                          <td className="fw-bold">AgentBusiness Name </td>
                          <td>{accommodation?.businessName || "Not Available"}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Agent Primary Number</td>
                          <td>{accommodation?.agentPrimaryNumber || "Not Available"}</td>
                        </tr>{" "}
                        <tr>
                          <td className="fw-bold">Agent WhatsApp Number </td>
                          <td>{accommodation?.agentWhatsAppNumber || "Not Available"}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Agent Email ID </td>
                          <td>{accommodation?.agentEmail || "Not Available"}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Name of the Student </td>
                          <td>{accommodation?.studentName || "Not Available"}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Passport Number </td>
                          <td>{accommodation?.passportNumber || "Not Available"}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Expiry Date </td>
                          <td>Expiry Date</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Student Email ID </td>
                          <td>{accommodation?.email || "Not Available"}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Student Primary Number </td>
                          <td>{accommodation?.primaryNumber || "Not Available"}</td>
                        </tr>{" "}
                        <tr>
                          <td className="fw-bold">Student WhatsApp number </td>
                          <td>{accommodation?.whatsAppNumber || "Not Available"}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">University Name </td>
                          <td>{accommodation?.universityName || "Not Available"}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Course</td>
                          <td>Course</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Accommodation Type </td>
                          <td>Accommodation Type</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Country </td>
                          <td>Country</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">State </td>
                          <td>State</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">City </td>
                          <td>City</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Accommodation Type </td>
                          <td>Accommodation Type</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">
                            Assigned To (List Staff) Multiple Assign
                          </td>
                          <td>{accommodation?.assignedTo || "Not Available"}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Finalised By</td>
                          <td>Finalised By</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Location</td>
                          <td>Location</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">
                            Holding Offer from the University (Yes/No){" "}
                          </td>
                          <td>
                            {accommodation?.holdingOfferFromTheUniversity || "Not Available"}
                          </td>
                        </tr>
                        <tr>
                          <td className="fw-bold">
                            Location where accommodation is required{" "}
                          </td>
                          <td>
                            {
                              accommodation?.locationWhereAccommodationIsRequired || "Not Available"
                            }
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div class="card mb-3">
                  <div class="card-header bg-primary text-white">
                   Agent Details
                  </div>
                  <div class="card-body ">
                  <div class="row mb-3">
                      <div class="col-6 fw-bold">
                        <i class="fas fa-graduation-cap"></i>Agent Name:
                      </div>
                      <div class="col-6">John doe</div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-6 fw-bold">
                        <i class="fas fa-graduation-cap"></i>Agent Business Name:
                      </div>
                      <div class="col-6">John doe</div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-6 fw-bold">
                        <i class="fas fa-graduation-cap"></i>Agent Primary Number:
                      </div>
                      <div class="col-6">John doe</div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-6 fw-bold">
                        <i class="fas fa-graduation-cap"></i>Agent Whatsapp Number:
                      </div>
                      <div class="col-6">John doe</div>
                    </div>
                    <div class="row mb-3">
                      <div class="col-6 fw-bold">
                        <i class="fas fa-graduation-cap"></i>Agent Email:
                      </div>
                      <div class="col-6">John doe</div>
                    </div>

                    <div class="row mb-3">
                      <div class="col-6 fw-bold">
                        <i class="fas fa-graduation-cap"></i>Student Name:
                      </div>
                      <div class="col-6">John doe</div>
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
export default ViewAccommodation;
