import React, { useEffect, useState } from "react";
import Sidebar from "../../compoents/sidebar";
import { getSingleStudent } from "../../api/student";
import { useLocation } from "react-router-dom";

function Profile() {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const [student, setStudent] = useState({});

  useEffect(() => {
    getStudentDetails();
  }, []);

  const getStudentDetails = () => {
    getSingleStudent(id)
      .then((res) => {
        setStudent(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Sidebar />

      <div className="content-wrapper" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
        <div className="content-header">
          <div className="container-fluid">
            <h2 className="mb-4 text-center">Student Details</h2>

            <div className="row mb-4">
              <div className="col-md-4 text-center">
                <img
                  src={student?.photo ? student?.photo : "https://via.placeholder.com/150"}
                  alt="Profile Photo"
                  className="img-fluid rounded-circle img-thumbnail"
                  style={{ width: '10rem', height: '10rem' }}
                />
              </div>

              <div className="col-md-8">
                <h3 className="mb-2">{student?.name}</h3>
                <p className="text-muted mb-2">Student Code: {student?.studentCode}</p>
                <p className="text-muted mb-2"><i className="fas fa-envelope me-2"></i>{student?.email}</p>
                <p className="text-muted mb-2"><i className="fas fa-phone-alt me-2"></i>{student?.primaryNumber}</p>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-lg-6">
                <div className="card mb-3 shadow-sm">
                  <div className="card-header bg-primary text-white">
                    <h5 className="card-title mb-0"><i className="fas fa-info-circle me-2"></i> Basic Information</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item"><strong>Source:</strong> {student?.source}</li>
                    <li className="list-group-item"><strong>Date of Birth:</strong> {student?.dob}</li>
                    <li className="list-group-item"><strong>Passport:</strong> {student?.passportNo}</li>
                    <li className="list-group-item"><strong>Expiry Date:</strong> {student?.expiryDate}</li>
                    <li className="list-group-item"><strong>Citizenship:</strong> {student?.citizenship}</li>
                    <li className="list-group-item"><strong>Gender:</strong> {student?.gender}</li>
                    <li className="list-group-item"><strong>WhatsApp Number:</strong> {student?.whatsAppNumber}</li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="card mb-3 shadow-sm">
                  <div className="card-header bg-success text-white">
                    <h5 className="card-title mb-0"><i className="fas fa-graduation-cap me-2"></i> Academic Information</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item"><strong>Highest Qualification:</strong> {student?.highestQualification}</li>
                    <li className="list-group-item"><strong>Degree Name:</strong> {student?.degreeName}</li>
                    <li className="list-group-item"><strong>Institution:</strong> {student?.institution}</li>
                    <li className="list-group-item"><strong>Percentage:</strong> {student?.percentage}</li>
                    <li className="list-group-item"><strong>Academic Year:</strong> {student?.academicYear}</li>
                    <li className="list-group-item"><strong>Year Passed:</strong> {student?.yearPassed}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-lg-4">
                <div className="card mb-3 shadow-sm">
                  <div className="card-header bg-warning text-dark">
                    <h5 className="card-title mb-0"><i className="fas fa-file-alt me-2"></i> Test Type</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">{student?.englishTestType}</li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card mb-3 shadow-sm">
                  <div className="card-header bg-warning text-dark">
                    <h5 className="card-title mb-0"><i className="fas fa-tachometer-alt me-2"></i> Test Score</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">{student?.testScore}</li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card mb-3 shadow-sm">
                  <div className="card-header bg-warning text-dark">
                    <h5 className="card-title mb-0"><i className="fas fa-calendar-day me-2"></i> Date of Test</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">{student?.dateOfTest}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-lg-4">
                <div className="card mb-3 shadow-sm">
                  <div className="card-header bg-info text-white">
                    <h5 className="card-title mb-0"><i className="fas fa-globe me-2"></i> Desired Country</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">{student?.country}</li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card mb-3 shadow-sm">
                  <div className="card-header bg-info text-white">
                    <h5 className="card-title mb-0"><i className="fas fa-university me-2"></i> Desired University</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">{student?.desiredUniversity}</li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card mb-3 shadow-sm">
                  <div className="card-header bg-info text-white">
                    <h5 className="card-title mb-0"><i className="fas fa-book me-2"></i> Desired Course</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">{student?.desiredCourse}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-lg-6">
                <div className="card mb-3 shadow-sm">
                  <div className="card-header bg-danger text-white">
                    <h5 className="card-title mb-0"><i className="fas fa-briefcase me-2"></i> Work Experience</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">{student?.workExperience}</li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="card mb-3 shadow-sm">
                  <div className="card-header bg-danger text-white">
                    <h5 className="card-title mb-0"><i className="fas fa-ban me-2"></i> Visa Rejections</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">{student?.anyVisaRejections}</li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="card mb-3 shadow-sm">
                  <div className="card-header bg-danger text-white">
                    <h5 className="card-title mb-0"><i className="fas fa-globe-americas me-2"></i> Travel History</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">{student?.travelHistory}</li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="card mb-3 shadow-sm">
                  <div className="card-header bg-danger text-white">
                    <h5 className="card-title mb-0"><i className="fas fa-question-circle me-2"></i> Additional Information</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">{student?.additionalInfo}</li>
                  </ul>
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
