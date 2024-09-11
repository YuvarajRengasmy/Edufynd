import React, { useEffect, useState } from "react";
import { getSingleTraining } from "../../api/Notification/traning";
import { RichTextEditor } from "@mantine/rte";
import Sidebar from "../../compoents/AdminSidebar";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import BackButton from "../../compoents/backButton";
export const ViewTraining = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [training, setTraining] = useState({});

  useEffect(() => {
    getNotificationList();
  }, []);

  const getNotificationList = () => {
    getSingleTraining(id)
      .then((res) => {
        setTraining(res?.data?.result || {});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>
        <Sidebar />

        <div className="content-wrapper" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
          <div className="content-header">
          <BackButton/>
         
            <div className="container-fluid my-3">
              <div className="card border-light shadow-sm p-4">
                <div className="card-body">
                  
                  <div className="d-flex align-items-center mb-4">
                    <div className="bg-light rounded-circle p-3 mr-3 text-primary">
                      <i className="fas fa-chalkboard-teacher fa-2x"></i>
                    </div>
                    <div>
                      <h4 className="card-training mb-1">Training Topic: {training?.trainingTopic  || "Not Available"}</h4>
                      <p className="text-muted mb-1">
                        <i className="fas fa-calendar-day"></i>&nbsp;&nbsp; Date: {training?.date  || "Not Available"}
                      </p>
                      <p className="text-muted mb-1">
                        <i className="fas fa-clock"></i>&nbsp;&nbsp; Time: {training?.time  || "Not Available"}
                      </p>
                    </div>
                  </div>

                  <div className="border-left border-primary pl-4 mb-4">
                    <div className="mb-3">
                      <h6 className="font-weight-bold text-primary">
                        <i className="fas fa-hand-pointer"></i>&nbsp;&nbsp; Request Training
                      </h6>
                      <p className="mb-1">Requested by: {training?.requestTraining  || "Not Available"}</p>
                    </div>
                    <div>
                      <h6 className="font-weight-bold text-primary">
                        <i className="fas fa-info-circle"></i>&nbsp;&nbsp; Details
                      </h6>
                      <p className="mb-1">
                        <i className="fas fa-tag"></i>&nbsp;&nbsp; Type of Users: {training?.typeOfUser  || "Not Available"}
                      </p>
                      <p className="mb-1">
                        <i className="fas fa-users"></i>&nbsp;&nbsp; Attendees: 
                        {Array.isArray(training?.usersName) && training.usersName.length > 0
                          ? training.usersName.map((attendee, index) => (
                            <span key={index}>{attendee}</span>
                          ))
                          : "N/A"}
                      </p>
                      <p className="mb-1">
                        <i className="fas fa-file-alt"></i>&nbsp;&nbsp; Material: {training?.material  || "Not Available"}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h6 className="text-primary mb-2">Additional Information:</h6>
                    <p className="mb-1">
                      <span className="badge badge-primary">
                        <i className="fas fa-user-tie"></i>
                      </span>&nbsp;&nbsp; Name: {training?.name  || "Not Available"}
                    </p>
                    <p className="mb-1">
                      <span className="badge badge-primary">
                        <i className="fas fa-file-upload"></i>
                      </span> &nbsp;&nbsp;Document: 
                      {training?.uploadDocument ? (
                        <a href={training.uploadDocument} download="Document.pdf" className="btn btn-sm btn-custom">
                          <i className="fa fa-download" aria-hidden="true"></i> Download
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </p>
                    <p className="mb-1">
                      <span className="badge badge-primary">
                        <i className="fas fa-book"></i>
                      </span> &nbsp;&nbsp; Subject: {training?.subject  || "Not Available"}
                    </p>
                  </div>

                  <div>
                    <h6 className="text-primary mb-2">Content:</h6>
                    <p className="card-text">
                      <RichTextEditor value={training?.content  || "Not Available"} readOnly />
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="container-fluid my-2">
  <div className="row ">
    <div className="col-12 col-lg-7 col-auto">
      <ul className="list-unstyled">
        
        <li className="mb-4 position-relative">
          <div className="row align-items-start g-0">

          <div className="col-1 d-flex justify-content-center align-items-center">
              <div className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center" style={{width: '2rem', height: '2rem'}}>
                <i className="fas fa-check" />
              </div>
            </div>
            <div className="col-4 text-center">
              <p className="mb-1 fw-semibold text-muted">23 August, 2023 10:30 AM</p>
              <p className="mb-0 text-muted">Changed by:<strong>John Doe</strong></p>
            </div>
           
          
           
            <div className="col-7">
            <div className="mb-3">
              
              <div className="bg-success text-white rounded-3 p-2">
                <h6 className="mb-1">New University Name</h6>
                <p className="mb-0">University Y</p>
              </div>
            </div>
              <div className="mb-3">
             
                <div className="bg-danger text-white rounded-3 p-2">
                  <h6 className="mb-1">Old University Name</h6>
                  <p className="mb-0">University X</p>
                </div>
              </div>
           
            </div>
          </div>
          <div className="position-absolute top-0 start-0 translate-middle-x" style={{width: 2, height: '100%', backgroundColor: '#007bff'}} />
        </li>
       
      </ul>
    </div>
  </div>
</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewTraining;
