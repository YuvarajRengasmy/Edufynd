import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getSingleMeeting } from "../../api/Notification/meeting";
import { RichTextEditor } from "@mantine/rte";
import Sidebar from "../../compoents/sidebar";
import { Link } from "react-router-dom";
export const ViewMeetings = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const [notification, setnotification] = useState([]);

  useEffect(() => {
    getMeetingList();
  }, []);

  const getMeetingList = () => {
    getSingleMeeting(id)
      .then((res) => {
        setnotification(res?.data?.result || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div>
        <Sidebar />

        <div
          className="content-wrapper "
          style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
        >
          <div className="content-header ">
          <nav aria-label="breadcrumb">
  <ol className="breadcrumb justify-content-end">
    <li className="breadcrumb-item">
      <Link to='/dashboard' target="_self" className="text-decoration-none">Dashboard</Link>
    </li>
    <li className="breadcrumb-item">
      <Link to='/list_meetings' className="text-decoration-none">ListMeetings</Link>
    </li>
   {/* if edit is clicked the page should go to the edit page of that particular uiversity */}
      <li  className="breadcrumb-item">
        <Link to={{
          pathname: "/edit_meetings",
          search: `?id=${notification?._id}`,
        }} className="text-decoration-none">EditMeetings</Link>
      </li>
  
  </ol>
</nav>

          <div class="container ">
     
        <div class="card border-light rounded-1 shadow-sm p-4">
            <div class="card-body">
               
                <div class="d-flex justify-content-between mb-4">
                    <div>
                        <h4 class="card-title mb-1">Subject: {notification?.subject  || "Not Available"}</h4>
                        <p class="text-muted mb-1"><i class="fas fa-calendar-day"></i> Date: {notification?.date  || "Not Available"}</p>
                        <p class="text-muted mb-0"><i class="fas fa-clock"></i> Time: {notification?.time  || "Not Available"}</p>
                    </div>
                 
                    <div class="text-primary">
                        <i class="fas fa-calendar-alt fa-2x">&nbsp;&nbsp; Meetings</i>
                    </div>
                </div>
                
              
                <div class="d-flex mb-4">
                    <div class="mr-4">
                        <h6 class="text-primary mb-1">Host:</h6>
                        <p class="mb-0"><i class="fas fa-user"></i> {notification?.hostName  || "Not Available"}</p>
                    </div>
                    <div>
                        <h6 class="text-primary mb-1">Attendees:</h6>
                        <p class="mb-0"><i class="fas fa-users"></i>  {Array.isArray(notification?.attendees) &&
                        notification.attendees.length > 0
                          ? notification.attendees.map((attendees, index) => (
                              <span key={index}>{attendees}</span>
                            ))
                          : "N/A"}</p>
                    </div>
                </div>

              
                <div>
                    <h6 class="text-primary mb-2">Content:</h6>
                    <p class="card-text"> <RichTextEditor
                            value={notification?.content  || "Not Available"}
                            readOnly
                          /></p>
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
export default ViewMeetings;
