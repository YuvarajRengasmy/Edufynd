import React, { useEffect, useState } from "react";
import { getSinglePromotion } from "../../api/promotions";
import { RichTextEditor } from "@mantine/rte";
import { Link, useLocation } from "react-router-dom";

import Sidebar from "../../compoents/sidebar";
export const ViewPromotion = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [notification, setnotification] = useState([]);
  useEffect(() => {
    getPromotionList();
  }, []);

  const getPromotionList = () => {
    getSinglePromotion(id)
      .then((res) => {
        setnotification(res?.data?.result || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
     
      <div style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}>
        <div >
         
            <Sidebar />
          

          <div
            className="content-wrapper "
            style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
          >
            <div className="content-header ">
            <nav aria-label="breadcrumb">
  <ol className="breadcrumb justify-content-end">
    <li className="breadcrumb-item">
      <Link to='/dashboard' target="_self" className="text-decoration-none">Dashboard</Link>
    </li>
    <li className="breadcrumb-item">
      <Link to='/list_promotions' className="text-decoration-none">ListPromotions</Link>
    </li>
   {/* if edit is clicked the page should go to the edit page of that particular uiversity */}
      <li  className="breadcrumb-item">
        <Link to={{
          pathname: "/edit_promotions",
          search: `?id=${notification?._id}`,
        }} className="text-decoration-none">EditPromotions</Link>
      </li>
  
  </ol>
</nav>
            <div class="container mt-4">
   
    <div class="bg-primary text-white p-3 rounded mb-4 d-flex justify-content-between align-items-center">
      <h1 class="display-4">Promotion Details</h1>
      <a href="promotions.html" class="btn btn-light">Back to Promotions</a>
    </div>

    <div class="row">
    
      <div class="col-lg-8">
        <div class="card mb-4">
          <div class="card-body">
           
            <h2 class="">Promotion Subject</h2>
            <p><strong>Type of User:</strong> Regular</p>
            <p><strong>Username:</strong> johndoe</p>
            <p><strong>Content:</strong> Get amazing discounts on all summer products. Shop now and enjoy exclusive offers!</p>
            
           
            <img src="promotion-image.jpg" class="img-fluid rounded mb-3" alt="Promotion Image"/>

            
            <div class="d-flex">
              <button class="btn btn-primary me-2">Edit</button>
              <button class="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>
      </div>
      
      
      <div class="col-lg-4">
        <div class="card">
          <div class="card-header bg-dark text-white">
            <h5 class="">Related Actions</h5>
          </div>
          <div class="card-body">
            <ul class="list-group">
              <li class="list-group-item"><a href="#" class="btn btn-info btn-sm">View Details</a></li>
              <li class="list-group-item"><a href="#" class="btn btn-warning btn-sm">Generate Report</a></li>
              <li class="list-group-item"><a href="#" class="btn btn-success btn-sm">Send Notification</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
              
          


   
              <div className="container-fluid">
                <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
                  <div
                    className="card-header mt-3 border-0 rounded-end-pill position-absolute top-0 start-0"
                    style={{ background: "#fe5722", color: "#fff" }}
                  >
                    <h5 className="text-center text-capitalize p-1">
                      View Promotion Details
                    </h5>
                  </div>
                  <div className="card-body">
                    <table
                      className="table table-hover table-bordered table-striped-columns mt-5"
                      style={{
                        fontFamily: "Plus Jakarta Sans",
                        fontSize: "14px",
                      }}
                    >
                      <tbody>
                        <tr>
                          <th>Type of User</th>
                          <td>{notification.typeOfUser}</td>
                        </tr>
                        <tr>
                          <th>Username</th>
                          {Array.isArray(notification?.userName) &&
                          notification.userName.length > 0
                            ? notification.userName.map((username, index) => (
                                <li key={index}>{username}</li>
                              ))
                            : "N/A"}
                        </tr>
                        <tr>
                          <th>Content</th>
                          <td>
                            {" "}
                            <RichTextEditor
                              value={notification?.content}
                              readOnly
                            />
                          </td>
                        </tr>
                        <tr>
                          <th>Subject</th>
                          <td>{notification?.subject}</td>
                        </tr>
                        <tr>
                          <th>Image</th>
                          <td>
                            <img
                              src={
                                notification?.uploadImage || "path/to/image.jpg"
                              }
                              width="150"
                              height="150"
                              alt="Notification"
                              className="img-fluid"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
      </div>
    </>
  );
};
export default ViewPromotion;
