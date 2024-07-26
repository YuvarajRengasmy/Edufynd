import React, { useEffect, useState } from "react";
import Sidebar from "../../compoents/sidebar";
import { getSingleStudent } from "../../api/student";
import { useLocation } from "react-router-dom";
import { FaUser, FaPassport, FaCalendarAlt, FaFlag, FaBirthdayCake, FaMale, FaPhone, FaWhatsapp } from 'react-icons/fa';

function Profile() {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const [student, setStudent] = useState(null); // Initialize with null

  useEffect(() => {
    if (id) {
      getStudentDetails();
    }
  }, [id]);

  const getStudentDetails = () => {
    getSingleStudent(id)
      .then((res) => {
        setStudent(res?.data?.result);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (!student) {
    return <div>Loading...</div>; // Add a loading state while fetching data
  }

  const {
    source,
    name,
    citizenship,
    dob,
    passportNo,
    expiryDate,
    gender,
    email,
    primaryNumber,
    whatsappNumber,
    highestQualification,
    degreeName,
    percentage,
    institution,
    startDate,
    endDate,
    workExperience = {} // Default to an empty object if not provided
  } = student;

  return (
    <>
      <div>
        <Sidebar />
        <div className="content-wrapper" style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '13px' }}>
          <div className="content-header">
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="card border-0 shadow-sm rounded-0 text-bg-white p-4">
                    <div className="bg-transparent mb-3">
                      <div className="row g-0">
                        <div className="col-md-12">
                          <img
                            src="https://pics.craiyon.com/2023-07-15/dc2ec5a571974417a5551420a4fb0587.webp"
                            style={{ width: '150px', height: '150px' }}
                            className="img-fluid rounded-pill"
                            alt="student_image"
                          />
                        </div>
                        <div className="col-md-12 align-self-center">
                          <div className="row g-4">
                            <div className="col-sm-6">
                              <div className="d-flex flex-column align-items-start justify-content-start">
                                <p className="card-text text-capitalize fw-bold"><FaUser style={{ color: '#fe5722' }} /> Source</p>
                                <p className="card-text text-capitalize fw-bold"><FaUser style={{ color: '#fe5722' }} /> Student Name</p>
                                <p className="card-text text-capitalize fw-bold"><FaFlag style={{ color: '#fe5722' }} /> Citizenship</p>
                                <p className="card-text text-capitalize fw-bold"><FaBirthdayCake style={{ color: '#fe5722' }} /> DOB</p>
                                <p className="card-text text-capitalize fw-bold"><FaPassport style={{ color: '#fe5722' }} /> Passport No</p>
                                <p className="card-text text-capitalize fw-bold"><FaCalendarAlt style={{ color: '#fe5722' }} /> Expiry Date</p>
                                <p className="card-text text-capitalize fw-bold"><FaMale style={{ color: '#fe5722' }} /> Gender</p>
                                <p className="card-text text-capitalize fw-bold"><FaUser style={{ color: '#fe5722' }} /> Email ID</p>
                                <p className="card-text text-capitalize fw-bold"><FaPhone style={{ color: '#fe5722' }} /> Primary Number</p>
                                <p className="card-text text-capitalize fw-bold"><FaWhatsapp style={{ color: '#fe5722' }} /> WhatsApp Number</p>
                                <p className="card-text text-capitalize fw-bold"><FaUser style={{ color: '#fe5722' }} /> Highest Qualification</p>
                                <p className="card-text text-capitalize fw-bold"><FaPassport style={{ color: '#fe5722' }} /> Degree Name</p>
                                <p className="card-text text-capitalize fw-bold"><FaFlag style={{ color: '#fe5722' }} /> Percentage</p>
                                <p className="card-text text-capitalize fw-bold"><FaCalendarAlt style={{ color: '#fe5722' }} /> Institution</p>
                                <p className="card-text text-capitalize fw-bold"><FaCalendarAlt style={{ color: '#fe5722' }} /> Start Date</p>
                                <p className="card-text text-capitalize fw-bold"><FaFlag style={{ color: '#fe5722' }} /> End Date</p>
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="d-flex flex-column align-items-start justify-content-start">
                                <p className="card-text text-capitalize fw-light">{source}</p>
                                <p className="card-text text-capitalize fw-light">{name}</p>
                                <p className="card-text text-capitalize fw-light">{citizenship}</p>
                                <p className="card-text text-capitalize fw-light">{dob}</p>
                                <p className="card-text text-capitalize fw-light">{passportNo}</p>
                                <p className="card-text text-capitalize fw-light">{expiryDate}</p>
                                <p className="card-text text-capitalize fw-light">{gender}</p>
                                <p className="card-text text-capitalize fw-light">{email}</p>
                                <p className="card-text text-capitalize fw-light">{primaryNumber}</p>
                                <p className="card-text text-capitalize fw-light">{whatsappNumber}</p>
                                <p className="card-text text-capitalize fw-light">{highestQualification}</p>
                                <p className="card-text text-capitalize fw-light">{degreeName}</p>
                                <p className="card-text text-capitalize fw-light">{percentage}</p>
                                <p className="card-text text-capitalize fw-light">{institution}</p>
                                <p className="card-text text-capitalize fw-light">{startDate}</p>
                                <p className="card-text text-capitalize fw-light">{endDate}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="border-4 rounded-2" />
                    {/* <div className="header bg-none">
                      <h5>Work Experience</h5>
                      <div className="container my-3 text-center">
                        <div className="row g-3">
                          <div className="col-md-6">
                            <div className="d-flex flex-column align-items-start justify-content-start">
                              <p className="card-text text-capitalize fw-bold"><FaUser style={{ color: '#fe5722' }} /> Duration</p>
                              <p className="card-text text-capitalize fw-bold"><FaUser style={{ color: '#fe5722' }} /> Last Employer</p>
                              <p className="card-text text-capitalize fw-bold"><FaUser style={{ color: '#fe5722' }} /> Last Designation</p>
                              <p className="card-text text-capitalize fw-bold"><FaUser style={{ color: '#fe5722' }} /> Do You Have Any English Language Test</p>
                              <p className="card-text text-capitalize fw-bold"><FaPassport style={{ color: '#fe5722' }} /> English Test Type</p>
                              <p className="card-text text-capitalize fw-bold"><FaCalendarAlt style={{ color: '#fe5722' }} /> Test Score</p>
                              <p className="card-text text-capitalize fw-bold"><FaFlag style={{ color: '#fe5722' }} /> Date Of Test</p>
                              <p className="card-text text-capitalize fw-bold"><FaCalendarAlt style={{ color: '#fe5722' }} /> Do You Have Travel History</p>
                              <p className="card-text text-capitalize fw-bold"><FaCalendarAlt style={{ color: '#fe5722' }} /> Travel Date</p>
                              <p className="card-text text-capitalize fw-bold"><FaCalendarAlt style={{ color: '#fe5722' }} /> Purpose</p>
                              <p className="card-text text-capitalize fw-bold"><FaCalendarAlt style={{ color: '#fe5722' }} /> Country</p>
                              <p className="card-text text-capitalize fw-bold"><FaFlag style={{ color: '#fe5722' }} /> Any Visa Rejections</p>
                              <p className="card-text text-capitalize fw-bold"><FaCalendarAlt style={{ color: '#fe5722' }} /> Reason</p>
                              <p className="card-text text-capitalize fw-bold"><FaCalendarAlt style={{ color: '#fe5722' }} /> Agency</p>
                              <p className="card-text text-capitalize fw-bold"><FaCalendarAlt style={{ color: '#fe5722' }} /> Note</p>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="d-flex flex-column align-items-start justify-content-start">
                              <p className="card-text text-capitalize fw-light">{workExperience.duration}</p>
                              <p className="card-text text-capitalize fw-light">{workExperience.lastEmployer}</p>
                              <p className="card-text text-capitalize fw-light">{workExperience.lastDesignation}</p>
                              <p className="card-text text-capitalize fw-light">{workExperience.englishLanguageTest}</p>
                              <p className="card-text text-capitalize fw-light">{workExperience.englishTestType}</p>
                              <p className="card-text text-capitalize fw-light">{workExperience.testScore}</p>
                              <p className="card-text text-capitalize fw-light">{workExperience.dateOfTest}</p>
                              <p className="card-text text-capitalize fw-light">{workExperience.travelHistory}</p>
                              <p className="card-text text-capitalize fw-light">{workExperience.travelDate}</p>
                              <p className="card-text text-capitalize fw-light">{workExperience.purpose}</p>
                              <p className="card-text text-capitalize fw-light">{workExperience.country}</p>
                              <p className="card-text text-capitalize fw-light">{workExperience.visaRejections}</p>
                              <p className="card-text text-capitalize fw-light">{workExperience.reason}</p>
                              <p className="card-text text-capitalize fw-light">{workExperience.agency}</p>
                              <p className="card-text text-capitalize fw-light">{workExperience.note}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
