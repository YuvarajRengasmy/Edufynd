import React, { useState, useEffect } from "react";
import { getSingleLoanEnquiry } from "../../../api/Enquiry/Loan";
import { useLocation } from "react-router-dom";
import Mastersidebar from '../../../compoents/sidebar';

export const ViewLoanEnquiry = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [loan, setLoan] = useState(null);

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
    <div className="student-form" style={{ fontFamily: 'Plus Jakarta Sans' }}>
      <div className="container-fluid">
        <nav className="navbar navbar-vertical navbar-expand-lg">
          <Mastersidebar />
        </nav>
        <div className="content-wrapper" style={{ fontSize: '14px' }}>
          <div className="content-header">
            <div className="container">
              <div className="card card-body border-0 rounded-0 shadow-sm p-4">
                <h5 className='text-center text-uppercase'>Loan Enquiry Details</h5>
                <hr className='text-dark border-4 border-dark rounded-3' />
                <div className="border-0 text-bg-transparent mb-3 p-1">
                  <div className="row g-0">
                    <div className="col-md-4 align-self-center">
                      <img src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg" className="img-fluid w-100 mx-auto d-block" alt="profile" />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <table className='table table-hover table-striped w-100'>
                          <tbody>
                            <tr>
                              <td className='fw-bold'>Student Name</td>
                              <td>{loan?.studentName}</td>
                            </tr>
                            <tr>
                              <td className='fw-bold'>Primary Number</td>
                              <td>{loan?.primaryNumber}</td>
                            </tr>
                            <tr>
                              <td className='fw-bold'>WhatsApp Number</td>
                              <td>{loan?.whatsAppNumber}</td>
                            </tr>
                            <tr>
                              <td className='fw-bold'>Email ID</td>
                              <td>{loan?.email}</td>
                            </tr>
                            <tr>
                              <td className='fw-bold'>Do you have a valid offer from any university?</td>
                              <td>{loan?.doYouHaveAValidOfferFromAnyUniversity}</td>
                            </tr>
                            <tr>
                              <td className='fw-bold'>Loan Amount Required</td>
                              <td>{loan?.loanAmountRequired}</td>
                            </tr>
                            <tr>
                              <td className='fw-bold'>What is your monthly income?</td>
                              <td>{loan?.whatIsYourMonthlyIncome}</td>
                            </tr>
                            <tr>
                              <td className='fw-bold'>Passport Number</td>
                              <td>{loan?.passportNumber}</td>
                            </tr>
                            <tr>
                              <td className='fw-bold'>Did you apply for loan elsewhere?</td>
                              <td>{loan?.didYouApplyForLoanElsewhere}</td>
                            </tr>
                            <tr>
                              <td className='fw-bold'>Co-applicant Name</td>
                              <td>{loan?.coApplicantName}</td>
                            </tr>
                            <tr>
                              <td className='fw-bold'>Co-applicant Age</td>
                              <td>{loan?.age}</td>
                            </tr>
                            <tr>
                              <td className='fw-bold'>Co-applicant Status</td>
                              <td>{loan?.employmentStatus}</td>
                            </tr>
                            <tr>
                              <td className='fw-bold'>Co-applicant Income</td>
                              <td>{loan?.incomeDetails}</td>
                            </tr>
                            <tr>
                              <td className='fw-bold'>Will you submit your collateral if required?</td>
                              <td>{loan?.willyouSubmitYourCollateral}</td>
                            </tr>
                            <tr>
                              <td className='fw-bold'>Passport Document</td>
                              <td>
                                {loan?.uploadPassport ? (
                                  <a href={loan.uploadPassport} download="PassportDocument.pdf" className="btn btn-primary btn-sm">
                                    Download Passport Document
                                  </a>
                                ) : (
                                  'No document available'
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td className='fw-bold'>Offer Letter</td>
                              <td>
                                {loan?.uploadOfferletter ? (
                                  <a href={loan.uploadOfferletter} download="OfferLetter.pdf" className="btn btn-primary btn-sm">
                                    Download Offer Letter
                                  </a>
                                ) : (
                                  'No document available'
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewLoanEnquiry;
