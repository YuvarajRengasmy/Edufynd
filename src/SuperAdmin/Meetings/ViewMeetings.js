import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getSingleMeeting } from "../../api/Notification/meeting";
import { RichTextEditor } from "@mantine/rte";
import Sidebar from "../../compoents/sidebar";
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
                              <li key={index}>{attendees}</li>
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
