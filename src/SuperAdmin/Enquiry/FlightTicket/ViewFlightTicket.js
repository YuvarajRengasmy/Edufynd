import React, { useState, useEffect } from "react";
import { getSingleFlightEnquiry } from "../../../api/Enquiry/flight";
import { useLocation } from "react-router-dom";
import Mastersidebar from '../../../compoents/sidebar';

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
      <div >
       
          <Mastersidebar />
      
        <div className="content-wrapper" style={{ fontSize: '14px' }}>
          <div className="content-header">
            <div className="container-fluid">
              <div className="card border-0 rounded-0 shadow-sm p-3 position-relative">
                <div
                  className="card-header mt-3 border-0 rounded-end-pill position-absolute top-0 start-0"
                  style={{ background: '#fe5722', color: '#fff' }}
                >
                  <h5 className="text-center text-capitalize p-1">View Flight Tickets Details</h5>
                </div>
                <div className="card-body">
                  <table
                    className="table table-hover table-bordered table-striped-columns mt-5"
                    style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}
                  >
                    <tbody>
                      <tr>
                        <td className="fw-bold">Name of the Student</td>
                        <td>{flight?.studentName}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Passport Number</td>
                        <td>{flight?.passportNo}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Source</td>
                        <td>{flight?.source}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Agent Name</td>
                        <td>{flight?.agentName}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Agent Business Name</td>
                        <td>{flight?.agentBusinessName }</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Agent Primary Number</td>
                        <td>{flight?.agentPrimaryNumber}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Agent WhatsApp Number</td>
                        <td>{flight?.agentWhatsappNumber}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Agent Email ID</td>
                        <td>{flight?.agentEmail}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Student Primary Number</td>
                        <td>{flight?.primaryNumber}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Student WhatsApp Number</td>
                        <td>{flight?.whatsappNumber}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Student Email ID</td>
                        <td>{flight?.email}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Location: From</td>
                        <td>{flight?.from}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Location: To</td>
                        <td>{flight?.to}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold">Date of Travel</td>
                        <td>{flight?.dateOfTravel}</td>
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

export default ViewFlightTicket;
