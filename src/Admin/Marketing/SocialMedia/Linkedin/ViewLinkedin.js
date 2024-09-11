import React from 'react'
import Sidebar from "../../../../compoents/AdminSidebar";
import { Link } from "react-router-dom";
const ViewLinkedin = () => {
  return (
    <div >
        
    <Sidebar />
    
  


<div className="content-wrapper "  style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
<div className="content-header ">
<div class="container-fluid mt-4">
<h2 class="mb-4"> View Social Media </h2>

<div class="row mb-4">
    <div class="col-md-3">
        <div class="card border-primary mb-3">
            <div class="card-body text-center">
                <i class="fab fa-facebook-f fa-2x text-primary mb-3"></i>
                <h5 class="card-title">Facebook</h5>
                <h1 class="display-3">12K</h1>
                <p class="card-text">Followers</p>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card border-info mb-3">
            <div class="card-body text-center">
                <i class="fab fa-twitter fa-2x text-info mb-3"></i>
                <h5 class="card-title">Twitter</h5>
                <h1 class="display-3">8K</h1>
                <p class="card-text">Followers</p>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card border-danger mb-3">
            <div class="card-body text-center">
                <i class="fab fa-instagram fa-2x text-danger mb-3"></i>
                <h5 class="card-title">Instagram</h5>
                <h1 class="display-3">15K</h1>
                <p class="card-text">Followers</p>
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card border-secondary mb-3">
            <div class="card-body text-center">
                <i class="fab fa-linkedin-in fa-2x text-secondary mb-3"></i>
                <h5 class="card-title">LinkedIn</h5>
                <h1 class="display-3">5K</h1>
                <p class="card-text">Followers</p>
            </div>
        </div>
    </div>
</div>


<h3 class="mb-4">Recent Social Media Posts</h3>
<div class="media mb-4">
    <i class="fab fa-facebook-f fa-3x text-primary mr-3"></i>
    <div class="media-body">
        <h5 class="mt-0">Facebook Post</h5>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non eros est. Donec viverra, lorem in dictum auctor, justo libero gravida lectus, at fermentum est eros vel orci.</p>
        <small class="text-muted">Posted on: 2024-07-29</small>
    </div>
</div>
<div class="media mb-4">
    <i class="fab fa-twitter fa-3x text-info mr-3"></i>
    <div class="media-body">
        <h5 class="mt-0">Twitter Update</h5>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non eros est. Donec viverra, lorem in dictum auctor, justo libero gravida lectus, at fermentum est eros vel orci.</p>
        <small class="text-muted">Posted on: 2024-07-28</small>
    </div>
</div>
<div class="media mb-4">
    <i class="fab fa-instagram fa-3x text-danger mr-3"></i>
    <div class="media-body">
        <h5 class="mt-0">Instagram Post</h5>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non eros est. Donec viverra, lorem in dictum auctor, justo libero gravida lectus, at fermentum est eros vel orci.</p>
        <small class="text-muted">Posted on: 2024-07-27</small>
    </div>
</div>


<h3 class="mt-4 mb-3">Social Media Activity</h3>
<ul class="list-group">
    <li class="list-group-item d-flex justify-content-between align-items-center">
        Facebook Engagement
        <span class="badge badge-primary badge-pill">+200 Likes</span>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-center">
        Twitter Mentions
        <span class="badge badge-info badge-pill">+50 Mentions</span>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-center">
        Instagram Comments
        <span class="badge badge-danger badge-pill">+30 Comments</span>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-center">
        LinkedIn Shares
        <span class="badge badge-secondary badge-pill">+15 Shares</span>
    </li>
</ul>
</div>

</div>
</div>
</div>
  )
}

export default ViewLinkedin
