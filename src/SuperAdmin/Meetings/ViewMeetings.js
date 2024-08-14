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
      <Link to='/DashBoard' target="_self" className="text-decoration-none">Dashboard</Link>
    </li>
    <li className="breadcrumb-item">
      <Link to='/ListMeetings' className="text-decoration-none">ListMeetings</Link>
    </li>
   {/* if edit is clicked the page should go to the edit page of that particular uiversity */}
      <li  className="breadcrumb-item">
        <Link to={{
          pathname: "/EditMeetings",
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
                        <h4 class="card-title mb-1">Subject: {notification?.subject}</h4>
                        <p class="text-muted mb-1"><i class="fas fa-calendar-day"></i> Date: {notification?.date}</p>
                        <p class="text-muted mb-0"><i class="fas fa-clock"></i> Time: {notification?.time}</p>
                    </div>
                 
                    <div class="text-primary">
                        <i class="fas fa-calendar-alt fa-2x">&nbsp;&nbsp; Meetings</i>
                    </div>
                </div>
                
              
                <div class="d-flex mb-4">
                    <div class="mr-4">
                        <h6 class="text-primary mb-1">Host:</h6>
                        <p class="mb-0"><i class="fas fa-user"></i> {notification?.hostName}</p>
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
                            value={notification?.content}
                            readOnly
                          /></p>
                </div>
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
