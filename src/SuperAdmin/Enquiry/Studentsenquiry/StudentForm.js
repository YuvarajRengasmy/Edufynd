import React, { useState, useEffect } from "react";
import { getSingleStudnetEnquiry } from "../../../api/Enquiry/student";
import { Link, useLocation } from "react-router-dom";
import { formatDate } from "../../../Utils/DateFormat";
import Mastersidebar from '../../../compoents/sidebar';


export const StudentForm = () => {


  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [student, setStudent] = useState();
  const pageSize = 5;


  useEffect(() => {
    getStudentDetails();
  }, []);


  const getStudentDetails = () => {
    getSingleStudnetEnquiry(id)
      .then((res) => {
        setStudent(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };




  return (
    <>
      <div >

        <Mastersidebar />

        <div className="content-wrapper" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>
          <div className="content-header">
            <div class="container">
            <div class="col-12 text-center">
        <h2>Student Enquiry Profile</h2>
        <p class="text-muted">Details of the student's enquiry</p>
      </div>
              <div class="row">

                <div class="col-md-6">
                  <div class="card mb-3">
                    <div class="card-header bg-primary text-white">Personal Information</div>
                    <div class="card-body">
                      <div class="row mb-3">
                        <div class="col-6 fw-bold"><i class="fas fa-id-badge"></i> Student Name:</div>
                        <div class="col-6">{student?.name}</div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-6 fw-bold"><i class="fas fa-genderless"></i> Gender:</div>
                        <div class="col-6"> {student?.gender}</div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-6 fw-bold"><i class="fas fa-calendar-alt"></i> Date of Birth:</div>
                        <div class="col-6"> {formatDate(student?.dob)}</div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-6 fw-bold"><i class="fas fa-globe"></i> Citizenship:</div>
                        <div class="col-6">{student?.citizenShip}
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-6 fw-bold"><i class="fas fa-passport"></i> Passport No:</div>
                        <div class="col-6">{student?.passportNo}</div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-6 fw-bold"><i class="fas fa-calendar-day"></i> Expiry Date:</div>
                        <div class="col-6"> {formatDate(student?.expiryDate)}</div>
                      </div>
                    </div>
                  </div>

                  <div class="card mb-3">
                    <div class="card-header bg-primary text-white">Contact Information</div>
                    <div class="card-body">
                      <div class="row mb-3">
                        <div class="col-6 fw-bold"><i class="fas fa-envelope"></i> Email ID:</div>
                        <div class="col-6">{student?.email}</div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-6 fw-bold"><i class="fas fa-phone-alt"></i> Primary Number:</div>
                        <div class="col-6">{student?.primaryNumber}</div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-6 fw-bold"><i class="fab fa-whatsapp "></i> WhatsApp Number:</div>
                        <div class="col-6">{student?.whatsAppNumber}</div>
                      </div>
                    </div>
                  </div>
                  <div class="card mb-3">
                    <div class="card-header bg-primary text-white">Application Status</div>
                    <div class="card-body text-end">
                      <Link  to={{pathname: "/EnquiryStudent", search: `?id=${student?._id}`,}} class="btn btn-sm px-4 py-2 fw-semibold text-uppercase" style={{backgroundColor:'#231f20',color:'#fff'}}>Apply</Link>
                    </div>
                  </div>
                </div>


                <div class="col-md-6">
                  <div class="card mb-3">
                    <div class="card-header bg-primary text-white">Educational Details</div>
                    <div class="card-body">
                      <div class="row mb-3">
                        <div class="col-6 fw-bold"><i class="fas fa-graduation-cap"></i> Qualification:</div>
                        <div class="col-6">{student?.qualification}</div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-6 fw-bold"><i class="fas fa-calendar-check"></i> Passed Year:</div>
                        <div class="col-6">{student?.yearPassed}</div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-6 fw-bold"><i class="fas fa-percent"></i> CGPA:</div>
                        <div class="col-6">{student?.cgpa}</div>
                      </div>
                    </div>
                  </div>

                  <div class="card mb-3">
                    <div class="card-header bg-primary text-white">Application Details</div>
                    <div class="card-body">
                      <div class="row mb-3">
                        <div class="col-6 fw-bold"><i class="fas fa-globe-americas"></i> Desired Country:</div>
                        <div class="col-6">{student?.desiredCountry}</div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-6 fw-bold"><i class="fas fa-university"></i> Desired University:</div>
                        <div class="col-6">{student?.desiredUniversity}</div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-6 fw-bold"><i class="fas fa-book"></i> Desired Course:</div>
                        <div class="col-6"> {student?.desiredCourse}</div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-6 fw-bold"><i class="fas fa-question-circle"></i> Do You Hold Any Other Offer?:</div>
                        <div class="col-6">{student?.doYouHoldAnyOtherOffer}</div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-6 fw-bold"><i class="fas fa-globe"></i> Country:</div>
                        <div class="col-6">
                          {student?.country ? student?.country : "N/A"}</div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-6 fw-bold"><i class="fas fa-university"></i> University:</div>
                        <div class="col-6">{student?.university ? student?.university : "N/A"}</div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-6 fw-bold"><i class="fas fa-book"></i> Program:</div>
                        <div class="col-6"> {student?.program ? student?.program : "N/A"}</div>
                      </div>
                    </div>
                  </div>












                  <div class="card mb-3">
                    <div class="card-header bg-primary text-white">Additional Information</div>
                    <div class="card-body">
                 
                      <div class="row mb-3">
                        <div class="col-6 fw-bold"><i class="fas fa-user-tie"></i> Referee Name:</div>
                        <div class="col-6"> {student?.refereeName ? student?.refereeName : "N/A"}
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-6 fw-bold"><i class="fas fa-phone"></i> Referee Contact:</div>
                        <div class="col-6"> {student?.refereeContactNo ? student?.refereeContactNo : "N/A"}
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-6 fw-bold"><i class="fas fa-hand-holding-usd"></i> Request Loan Support:</div>
                        <div class="col-6">{student?.doYouNeedSupportForLoan}</div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-6 fw-bold"><i class="fas fa-chalkboard-teacher"></i> Register for IELTS Class:</div>
                        <div class="col-6"> {student?.registerForIELTSClass}</div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-6 fw-bold"><i class="fas fa-user"></i> Assigned To:</div>
                        <div class="col-6"> {student?.assignedTo}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>





          </div>
        </div>
      </div>
    </>
  )
}
export default StudentForm;
