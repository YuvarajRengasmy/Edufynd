import React, { useState, useEffect } from "react";
import { getSingleCommission } from "../../api/commission";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "../../compoents/sidebar";
export const ViewComission = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [commission, setCommission] = useState();
  const pageSize = 5;

  useEffect(() => {
    getCommissionDetails();
  }, []);

  const getCommissionDetails = () => {
    getSingleCommission(id)
      .then((res) => {
        setCommission(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {" "}
     
        <div >
         
            <Sidebar />
         

          <div
            className="content-wrapper "
            style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
          >
            <div className="content-header ">

            <div class="container mt-5">
        <div class="row">
            <div class="col-12 text-center mb-4">
                <h2>Commission Details</h2>
            </div>
        </div>

        <div class="row g-3">
            <div class="col-md-6">
                <div class="card h-100">
                    <div class="card-header bg-primary text-white">
                        <i class="fas fa-globe me-2"></i> Country and University
                    </div>
                    <div class="card-body">
                        <p><i class="fas fa-globe me-2"></i><strong>Country:</strong> {commission?.country}</p>
                        <p><i class="fas fa-university me-2"></i><strong>University:</strong> {commission?.universityName}</p>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="card h-100">
                    <div class="card-header bg-primary text-white">
                        <i class="fas fa-credit-card me-2"></i> Payment Information
                    </div>
                    <div class="card-body">
                        <p><i class="fas fa-credit-card me-2"></i><strong>Payment Method:</strong> {commission?.paymentMethod}</p>
                       
                        <p><i class="fas fa-check-circle me-2"></i><strong>Eligibility:</strong> {commission?.eligibility}</p>
                        <p><i class="fas fa-percent me-2"></i><strong>Tax:</strong>{commission?.tax}</p>
                        <p><i class="fas fa-money-check-alt me-2"></i><strong>Payment Type:</strong> {commission?.paymentType}</p>
                    </div>
                </div>
            </div>


            {commission?.years?.map((year, yearIndex) => (
            <div class="col-md-6">

           
                <div class="card">
                    <div  key={yearIndex} class="card-header bg-primary text-white">
                        <i class="fas fa-calendar-alt me-2"></i> Year {year.year}
                    </div>
                    {year.courseTypes?.map((courseType, courseIndex) => (
                    <div key={courseIndex} class="card-body">
                        <p><i class="fas fa-calendar-alt me-2"></i><strong>Year:</strong>{year.year} </p>
                        <p><i class="fas fa-book-open me-2"></i><strong>Course Type:</strong> {courseType.courseType}</p>
                        <p><i class="fas fa-clipboard-list me-2"></i><strong>Intake:</strong>{courseType.inTake}</p>
                        <p><i class="fas fa-dollar-sign me-2"></i><strong>Commission:</strong> {courseType.value}</p>
                    </div>
                     ))}
                </div>
                
            </div>
             ))}

         
                     
        </div>

    
    </div>



            
            </div>
          </div>
        </div>
      
    </>
  );
};
export default ViewComission;
