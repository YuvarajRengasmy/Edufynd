import React from 'react'
import Sidebar from "../../../compoents/sidebar";

export const ViewCampaign = () => {
  return (
    <>  
    <div >
      
            <Sidebar />
            
          
        
   
    <div className="content-wrapper "  style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
        <div className="content-header ">
        <div class="container-fluid mt-4">
        <h2 class="mb-4">Social Media Campaigns</h2>

        <div class="row mb-4">
            <div class="col-md-4 mb-3">
                <div class="card bg-primary h-100 text-white">
                    <img src="https://via.placeholder.com/500x250?text=Campaign+1" class="card-img-top" alt="Campaign 1"/>
                    <div class="card-body">
                        <h5 class="card-title">Campaign 1: New Product Launch</h5>
                        <p class="card-text">Engage audiences with exciting posts about the upcoming product launch.</p>
                        <p class="card-text"><small>Start Date: 2024-08-01</small></p>
                        <p class="card-text"><small>End Date: 2024-08-15</small></p>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-3">
                <div class="card bg-success h-100 text-white">
                    <img src="https://via.placeholder.com/500x250?text=Campaign+2" class="card-img-top" alt="Campaign 2"/>
                    <div class="card-body">
                        <h5 class="card-title">Campaign 2: Summer Sale</h5>
                        <p class="card-text">Promote our summer sale with eye-catching graphics and offers.</p>
                        <p class="card-text"><small>Start Date: 2024-08-16</small></p>
                        <p class="card-text"><small>End Date: 2024-08-31</small></p>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-3">
                <div class="card bg-warning h-100 text-dark">
                    <img src="https://via.placeholder.com/500x250?text=Campaign+3" class="card-img-top" alt="Campaign 3"/>
                    <div class="card-body">
                        <h5 class="card-title">Campaign 3: Holiday Special</h5>
                        <p class="card-text">Celebrate the holidays with special campaigns and festive content.</p>
                        <p class="card-text"><small>Start Date: 2024-12-01</small></p>
                        <p class="card-text"><small>End Date: 2024-12-25</small></p>
                    </div>
                </div>
            </div>
        </div>

        
        <h3 class="mt-4 mb-3">Campaign Details</h3>
        <div class="card-deck">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Campaign 1: New Product Launch</h5>
                    <p class="card-text">A comprehensive campaign to build excitement for our new product. Includes teaser posts, countdowns, and launch day promotions.</p>
                    <p class="card-text"><small>Start Date: 2024-08-01</small></p>
                    <p class="card-text"><small>End Date: 2024-08-15</small></p>
                    <a href="#" class="btn btn-primary">View Details</a>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Campaign 2: Summer Sale</h5>
                    <p class="card-text">An engaging campaign to drive traffic during our summer sale. Features discount announcements, special offers, and summer-themed posts.</p>
                    <p class="card-text"><small>Start Date: 2024-08-16</small></p>
                    <p class="card-text"><small>End Date: 2024-08-31</small></p>
                    <a href="#" class="btn btn-success">View Details</a>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Campaign 3: Holiday Special</h5>
                    <p class="card-text">A festive campaign to celebrate the holiday season with themed content, promotions, and community engagement.</p>
                    <p class="card-text"><small>Start Date: 2024-12-01</small></p>
                    <p class="card-text"><small>End Date: 2024-12-25</small></p>
                    <a href="#" class="btn btn-warning">View Details</a>
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
export default ViewCampaign