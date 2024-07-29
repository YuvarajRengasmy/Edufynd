import React from 'react'
import Sidebar from "../../../compoents/sidebar";
export const ViewDailyTask = () => {
  return (
    <>  
    <div >
      
            <Sidebar />
            
          
     
   
    <div className="content-wrapper " style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }} >
        <div className="content-header ">
        <div class="container mt-4">
        <h2 class="mb-4">Daily Marketing Tasks</h2>

      
        <div class="row mb-4">
            <div class="col-md-4 mb-3">
                <div class="bg-primary text-white rounded p-4 text-center">
                    <i class="fas fa-calendar-day fa-2x mb-3"></i>
                    <h5>Today's Tasks</h5>
                    <h1 class="display-4">8</h1>
                    <p>Tasks Scheduled</p>
                </div>
            </div>
            <div class="col-md-4 mb-3">
                <div class="bg-success text-white rounded p-4 text-center">
                    <i class="fas fa-check-circle fa-2x mb-3"></i>
                    <h5>Completed Tasks</h5>
                    <h1 class="display-4">5</h1>
                    <p>Tasks Completed</p>
                </div>
            </div>
            <div class="col-md-4 mb-3">
                <div class="bg-warning text-dark rounded p-4 text-center">
                    <i class="fas fa-hourglass-half fa-2x mb-3"></i>
                    <h5>Pending Tasks</h5>
                    <h1 class="display-4">3</h1>
                    <p>Tasks Pending</p>
                </div>
            </div>
        </div>

       
        <h3 class="mb-4">Task List</h3>
        <div class="row">
            <div class="col-md-4 mb-4">
                <div class="card border-primary">
                    <div class="card-body">
                        <h5 class="card-title">Task 1: Social Media Campaign</h5>
                        <p class="card-text">Run social media campaign for new product launch.</p>
                        <p class="text-muted">Due: 2024-07-30</p>
                        <span class="badge badge-success">Completed</span>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-4">
                <div class="card border-warning">
                    <div class="card-body">
                        <h5 class="card-title">Task 2: Blog Post</h5>
                        <p class="card-text">Write and schedule blog post about industry trends.</p>
                        <p class="text-muted">Due: 2024-08-02</p>
                        <span class="badge badge-warning">In Progress</span>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-4">
                <div class="card border-danger">
                    <div class="card-body">
                        <h5 class="card-title">Task 3: Email Newsletter</h5>
                        <p class="card-text">Prepare and send out the weekly email newsletter.</p>
                        <p class="text-muted">Due: 2024-08-01</p>
                        <span class="badge badge-danger">Pending</span>
                    </div>
                </div>
            </div>
        </div>

        
        <h3 class="mt-4 mb-3">Task Details</h3>
        <div class="row">
            <div class="col-md-4 mb-4">
                <div class="card border-primary">
                    <div class="card-body">
                        <h5 class="card-title">Task 1: Social Media Campaign</h5>
                        <p class="card-text">Run social media campaign for new product launch.</p>
                        <p class="text-muted">Due: 2024-07-30</p>
                        <div class="progress">
                            <div class="progress-bar bg-success" role="progressbar" style={{width:" 100"}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">Completed</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-4">
                <div class="card border-warning">
                    <div class="card-body">
                        <h5 class="card-title">Task 2: Blog Post</h5>
                        <p class="card-text">Write and schedule blog post about industry trends.</p>
                        <p class="text-muted">Due: 2024-08-02</p>
                        <div class="progress">
                            <div class="progress-bar bg-warning" role="progressbar" style={{width:" 50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">In Progress</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-4">
                <div class="card border-danger">
                    <div class="card-body">
                        <h5 class="card-title">Task 3: Email Newsletter</h5>
                        <p class="card-text">Prepare and send out the weekly email newsletter.</p>
                        <p class="text-muted">Due: 2024-08-01</p>
                        <div class="progress">
                            <div class="progress-bar bg-danger" role="progressbar" style={{width:" 20%"}} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">Pending</div>
                        </div>
                    </div>
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
export default ViewDailyTask