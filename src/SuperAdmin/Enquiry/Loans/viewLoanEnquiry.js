import React, { useState, useEffect, useRef } from "react";
import { getSingleLoanEnquiry } from "../../../api/Enquiry/Loan";
import { useLocation } from "react-router-dom";
import Mastersidebar from '../../../compoents/sidebar';

export const ViewLoanEnquiry = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [loan, setLoan] = useState(null);
  const pdfLinkRef = useRef(null); // Reference for the hidden anchor

  useEffect(() => {
    getLoanDetails();
  }, []);

  useEffect(() => {
    if (loan?.uploadOfferletter) {
      pdfLinkRef.current.click(); // Trigger the click event to open the PDF
    }
  }, [loan]);

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
              <div className="card border-0 rounded-0 shadow-sm p-4">
                <div className="card-header rounded-pill border-0 p-2"style={{backgroundColor:'#fe5722'}}>
                <h4 className='text-center text-capitalize text-white' >Loan Enquiry Details</h4>
                </div>
              
              
                
                  
                   
                    
                      <div className="card-body">
                        <table className='table table-bordered table-hover table-primary ' style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
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
                                  <div>
                                    <a
                                      href={loan.uploadPassport}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="btn  btn-sm mx-2"
                                      style={{backgroundColor:'#fe5722',color:'#fff',fontSize:'12px'}}
                                    >
                                     <i class="fa fa-eye" aria-hidden="true"></i>  View Passport
                                    </a>
                                  </div>
                                ) : (
                                  'No document available'
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td className='fw-bold'>Offer Letter</td>
                              <td>
                                {loan?.uploadOfferletter ? (
                                  <div>
                                    <a
                                      href={loan.uploadOfferletter}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      ref={pdfLinkRef} // Reference to trigger click
                                      className="btn  btn-sm mx-2"
                                      style={{backgroundColor:'#fe5722',color:'#fff',fontSize:'12px'}}
                                    >
                                    <i class="fa fa-eye" aria-hidden="true"></i>   View Offer Letter
                                    </a>
                                  </div>
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
  );
};

export default ViewLoanEnquiry;
