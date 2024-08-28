import React, { useState, useEffect } from "react";
import { getSingleFlightEnquiry } from "../../../api/Enquiry/flight";
import { useLocation } from "react-router-dom";
import Mastersidebar from "../../../compoents/sidebar";
import { Link } from "react-router-dom";
export const ViewFlightTicket = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [flight, setFlight] = useState(null);

  useEffect(() => {
    getFlightDetails();
  }, []);

  const getFlightDetails = () => {
    getSingleFlightEnquiry(id)
      .then((res) => {
        console.log("res", res);
        setFlight(res?.data?.result);
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
      <Link to='/ListFlightTicket' className="text-decoration-none">ListFlightTicket</Link>
    </li>
   {/* if edit is clicked the page should go to the edit page of that particular uiversity */}
      <li  className="breadcrumb-item">
        <Link to={{
          pathname: "/EditFlightTicket",
          search: `?id=${flight?._id}`,
        }} className="text-decoration-none">EditFlightTicket</Link>
      </li>
  
  </ol>
</nav>
          <div className="container-fluid">
            <div className="card border-0 rounded-0 shadow-sm p-3 position-relative">
              <div
                className="card-header mt-3 border-0 rounded-end-pill position-absolute top-0 start-0"
                style={{ background: "#fe5722", color: "#fff" }}
              >
                <h5 className="text-center text-capitalize p-1">
                  View Flight Tickets Details
                </h5>
              </div>
              <div className="card-body">
                <table
                  className="table table-hover table-bordered table-striped-columns mt-5"
                  style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
                >
                 <tbody>
  {/* Student Details */}
  <tr>
    <td className="fw-bold">Name of the Student</td>
    <td>{flight?.name || "Not Available"}</td>
  </tr>
  <tr>
    <td className="fw-bold">Passport Number</td>
    <td>{flight?.passportNo || "Not Available"}</td>
  </tr>
  <tr>
    <td className="fw-bold">Student Primary Number</td>
    <td>{flight?.dial1  +"  "+ flight?.primaryNumber || "Not Available"}</td>
  </tr>
  <tr>
    <td className="fw-bold">Student WhatsApp Number</td>
    <td>{flight?.dial2  +"  "+ flight?.whatsAppNumber || "Not Available"}</td>
  </tr>
  <tr>
    <td className="fw-bold">Student Email ID</td>
    <td>{flight?.email || "Not Available"}</td>
  </tr>

  {/* Conditionally render Agent Details if available */}
  {flight?.agentName ? (
    <>
      <tr>
        <td className="fw-bold">Source</td>
        <td>{flight?.source || "Not Available"}</td>
      </tr>
      <tr>
        <td className="fw-bold">Agent Name</td>
        <td>{flight?.agentName || "Not Available"}</td>
      </tr>
      <tr>
        <td className="fw-bold">Agent Business Name</td>
        <td>{flight?.businessName || "Not Available"}</td>
      </tr>
      <tr>
        <td className="fw-bold">Agent Primary Number</td>
        <td>{flight?.dial3  +"  "+ flight?.agentPrimaryNumber || "Not Available"}</td>
      </tr>
      <tr>
        <td className="fw-bold">Agent WhatsApp Number</td>
        <td>{ flight?.dial4  +"  "+ flight?.agentWhatsAppNumber|| "Not Available"}</td>
      </tr>
      <tr>
        <td className="fw-bold">Agent Email ID</td>
        <td>{flight?.agentEmail || "Not Available"}</td>
      </tr>
    </>
  ) : (
    <>
      <tr>
        <td className="fw-bold">Name of the Student</td>
        <td>{flight?.studentName || "Not Available"}</td>
      </tr>
      
    </>
  )}

  {/* Common Fields */}
  <tr>
    <td className="fw-bold">Location: From</td>
    <td>{flight?.from || "Not Available"}</td>
  </tr>
  <tr>
    <td className="fw-bold">Location: To</td>
    <td>{flight?.to || "Not Available"}</td>
  </tr>
  <tr>
    <td className="fw-bold">Date of Travel</td>
    <td>{flight?.dateOfTravel || "Not Available"}</td>
  </tr>
</tbody>

                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewFlightTicket;
