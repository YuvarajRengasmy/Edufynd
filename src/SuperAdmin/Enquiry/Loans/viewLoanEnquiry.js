import React, { useState, useEffect, useRef } from "react";
import { getSingleLoanEnquiry } from "../../../api/Enquiry/Loan";
import { useLocation } from "react-router-dom";
import Mastersidebar from "../../../compoents/sidebar";
import { Link } from "react-router-dom";
export const ViewLoanEnquiry = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [loan, setLoan] = useState(null);
  // Reference for the hidden anchor

  useEffect(() => {
    getLoanDetails();
  }, []);

  const getLoanDetails = () => {
    getSingleLoanEnquiry(id)
      .then((res) => {
        setLoan(res?.data?.result);
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
      <Link to='/ListLoanEnquiry' className="text-decoration-none">ListLoanEnquiry</Link>
    </li>
   {/* if edit is clicked the page should go to the edit page of that particular uiversity */}
      <li  className="breadcrumb-item">
        <Link to={{
          pathname: "/EditLoanEnquiry",
          search: `?id=${loan?._id}`,
        }} className="text-decoration-none">EditLoanEnquiry</Link>
      </li>
  
  </ol>
</nav>
         
          
        </div>
        <div className="container-fluid">
            <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
              <div
                className="card-header mt-3 border-0 rounded-end-pill position-absolute top-0 start-0"
                style={{ background: "#fe5722", color: "#fff" }}
              >
                <h5 className="text-center text-capitalize p-1">
                  View Loan Enquiry Details
                </h5>
              </div>

              <div className="card-body ">
                <table
                  className="table table-hover table-bordered table-striped-columns mt-5"
                  style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
                >
                  <tbody>
                    <tr>
                      <td className="fw-bold">Student Name</td>
                      <td>{loan?.studentName || "Not Available"}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Primary Number</td>
                      <td>{loan?.primaryNumber || "Not Available"}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">WhatsApp Number</td>
                      <td>{loan?.whatsAppNumber || "Not Available"}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Email ID</td>
                      <td>{loan?.email || "Not Available"}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">
                        Do you have a valid offer from any university?
                      </td>
                      <td>{loan?.doYouHaveAValidOfferFromAnyUniversity || "Not Available"}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Loan Amount Required</td>
                      <td>{loan?.loanAmountRequired || "Not Available"}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">What is your monthly income?</td>
                      <td>{loan?.whatIsYourMonthlyIncome || "Not Available"}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Passport Number</td>
                      <td>{loan?.passportNumber || "Not Available"}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">
                        Did you apply for loan elsewhere?
                      </td>
                      <td>{loan?.didYouApplyForLoanElsewhere || "Not Available"}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Co-applicant Name</td>
                      <td>{loan?.coApplicantName || "Not Available"}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Co-applicant Age</td>
                      <td>{loan?.age || "Not Available"}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Co-applicant Status</td>
                      <td>{loan?.employmentStatus || "Not Available"}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Co-applicant Income</td>
                      <td>{loan?.incomeDetails || "Not Available"}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">
                        Will you submit your collateral if required?
                      </td>
                      <td>{loan?.willyouSubmitYourCollateral || "Not Available"}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Passport Document</td>
                      <td>
                        {loan?.uploadPassport ? (
                          <div>
                            <a
                              href={loan.uploadPassport}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-sm mx-2"
                              style={{
                                background: "#fe5722",
                                color: "#fff",
                                fontSize: "12px",
                              }}
                            >
                              <i class="fa fa-eye" aria-hidden="true"></i>{" "}
                              Passport
                            </a>
                            <a
                              href={loan.uploadPassport}
                              download="Passport.pdf"
                              rel="noopener noreferrer"
                              className="btn btn-sm mx-2"
                              style={{
                                background: "#fe5722",
                                color: "#fff",
                                fontSize: "12px",
                              }}
                            >
                              <i class="fa fa-download" aria-hidden="true"></i>{" "}
                              Passport
                            </a>
                          </div>
                        ) : (
                          "No document available"
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Offer Letter</td>
                      <td>
                        {loan?.uploadOfferletter ? (
                          <div>
                            <a
                              href={loan.uploadOfferletter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-sm mx-2"
                              style={{
                                background: "#fe5722",
                                color: "#fff",
                                fontSize: "12px",
                              }}
                            >
                              <i class="fa fa-eye" aria-hidden="true"></i> Offer
                              Letter
                            </a>
                            <a
                              href={loan.uploadOfferletter}
                              download="offer_letter.pdf"
                              rel="noopener noreferrer"
                              // Reference to trigger click
                              className="btn btn-sm mx-2"
                              style={{
                                background: "#fe5722",
                                color: "#fff",
                                fontSize: "12px",
                              }}
                            >
                              <i class="fa fa-download" aria-hidden="true"></i>{" "}
                              Offer Letter
                            </a>
                          </div>
                        ) : (
                          "No document available"
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
      </div>
    </>
  );
};

export default ViewLoanEnquiry;
