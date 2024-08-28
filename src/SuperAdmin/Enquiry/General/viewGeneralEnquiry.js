import React, { useState, useEffect } from "react";
import { updateGeneralEnquiry,getSingleGeneralEnquiry } from '../../../api/Enquiry/GeneralEnquiry';

import { Link, useLocation } from "react-router-dom";
import { formatDate } from "../../../Utils/DateFormat";
import Mastersidebar from "../../../compoents/sidebar";

export const ViewGeneralEnquiry = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [student, setStudent] = useState();
  const pageSize = 5;

  useEffect(() => {
    getStudentDetails();
  }, []);

  const getStudentDetails = () => {
    getSingleGeneralEnquiry(id)
      .then((res) => {
        setStudent(res?.data?.result);
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
      <Link to='/list_general_enquiry' className="text-decoration-none">ListGeneralEnquiry</Link>
    </li>
   {/* if edit is clicked the page should go to the edit page of that particular uiversity */}
      <li  className="breadcrumb-item">
        <Link to={{
          pathname: "/edit_general_enquiry",
          search: `?id=${student?._id}`,
        }} className="text-decoration-none">EditGeneralEnquiry</Link>
      </li>
  
  </ol>
</nav>
          <div className="container-fluid">
            <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
              <div
                className="card-header mt-3 border-0 rounded-end-pill position-absolute top-0 start-0"
                style={{ background: "#fe5722", color: "#fff" }}
              >
                <h5 className="text-center text-capitalize p-1">
                  View General Enquiry Details
                </h5>
              </div>

              <div class="card-body">
                <table
                  className="table table-hover table-bordered table-striped-columns mt-5"
                  style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
                >
                  <tbody>

                  {student?.agentName ? (
    <>
      <tr>
        <td className="fw-bold">Source: Student/Agent</td>
        <td>{student?.source || "Not Available"}</td>
      </tr>
      <tr>
        <td className="fw-bold">Agent ID</td>
        <td>{student?.agentId || "Not Available"}</td>
      </tr>
      <tr>
        <td className="fw-bold">Agent Name</td>
        <td>{student?.agentName || "Not Available"}</td>
      </tr>
      <tr>
        <td className="fw-bold">Agent Business Name</td>
        <td>{student?.businessName || "Not Available"}</td>
      </tr>
      <tr>
        <td className="fw-bold">Agent Primary Number</td>
        <td>{student?.dial3 + " " + student?.agentPrimaryNumber || "Not Available"}</td>
      </tr>
      <tr>
        <td className="fw-bold">Agent WhatsApp Number</td>
        <td>{student?.dial4 + " " +student?.agentWhatsAppNumber || "Not Available"}</td>
      </tr>
      <tr>
        <td className="fw-bold">Agent Email ID</td>
        <td>{student?.agentEmail || "Not Available"}</td>
      </tr>
    </>
  ) : (
    <>
      <tr>
        <td className="fw-bold">Name of the Student</td>
        <td>{student?.studentName || "Not Available"}</td>
      </tr>
      
    </>
  )}
                    <tr>
                      <td className="fw-bold">Student Name </td>
                      <td>{student?.name || "Not Available" }</td>
                    </tr>
                   
                    <tr>
                      <td className="fw-bold">Passport No </td>
                      <td>{student?.passportNo || "Not Available"}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Expiry Date</td>
                      <td>{student?.expiryDate || "Not Available"}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Contact Number </td>
                      <td>{student?.mobileNumber || "Not Available"}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Email ID </td>
                      <td>{student?.email || "Not Available"}</td>
                    </tr>{" "}
                    <tr>
                      <td className="fw-bold">CGPA / Year passed </td>
                      <td>
                        {student?.cgpa || "Not Available"}/{student?.yearPassed || "Not Available"}
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Desired Country </td>
                      <td>{student?.desiredCountry || "Not Available"}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Desired Course </td>
                      <td>{student?.desiredCourse || "Not Available"}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">
                        Do you need support for loan?{" "}
                      </td>
                      <td>{student?.doYouNeedSupportForLoan || "Not Available"}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Qualification </td>
                      <td>{student?.qualification || "Not Available"}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Whatsapp Number </td>
                      <td>{student?.whatsAppNumber || "Not Available"}</td>
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
export default ViewGeneralEnquiry;
