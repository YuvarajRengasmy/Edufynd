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
              
            <div class="container mt-4">
  
    <div class="promotion-header d-flex justify-content-between align-items-center">
      <h1 class="display-4">Promotion Details</h1>
      <a href="promotions.html" class="btn btn-secondary">Back to Promotions</a>
    </div>
    
    <div class="row mt-4">
      
      <div class="col-lg-8">
        <div class="card mb-4">
          <div class="card-body">
            <h3 class="">Summer Sale</h3>
            <p class="card-text">
              <strong>Description:</strong> Enjoy discounts on all summer products.<br/>
              <strong>Start Date:</strong> June 1, 2024<br/>
              <strong>End Date:</strong> August 31, 2024<br/>
              <strong>Status:</strong> Active
            </p>
            <div class="d-flex">
              <button class="btn btn-warning me-2">Edit</button>
              <button class="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>

       
        <div class="promotion-media mb-4">
          <h5>Promotion Media</h5>
          <div id="promotionCarousel" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="image1.jpg" class="d-block w-100" alt="Promotion Image 1"/>
              </div>
              <div class="carousel-item">
                <img src="image2.jpg" class="d-block w-100" alt="Promotion Image 2"/>
              </div>
              
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#promotionCarousel" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#promotionCarousel" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>

      
      <div class="col-lg-4">
        <div class="card">
          <div class="card-header">
            <h5 class="">Additional Information</h5>
          </div>
          <div class="card-body">
            <p><strong>Target Audience:</strong> All summer product customers</p>
            <p><strong>Promotion Code:</strong> SUMMER2024</p>
            <p><strong>Terms & Conditions:</strong> Valid while stocks last.</p>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewPromotion;
