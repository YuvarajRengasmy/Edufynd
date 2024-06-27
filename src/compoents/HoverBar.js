import React from 'react'
import './Hoverbar.css'
import Edufynd from "../styles/Assets/Admin/edufynd-logo.svg"
export const HoverBar = () => {
  return (
    <div>
        <div class="sBar">
        <ul class="nav flex-column">
        <div className="user-panel mt-2  d-flex">

<div className="info  mt-1 p-2">
  <a href="/DashBoard" className="brand-text font-weight-light text-decoration-none">
    <img src={Edufynd} alt="logo" className='img-fluid ' style={{ width: "100%" }} />
  </a>

</div>
</div>
            <li class="nav-item">
                <a class="nav-link" href="#" style={{ fontSize: "14px", fontWeight: "bold", }}>
                    <i class="fas fa-home"></i>
                    <span>Home</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" style={{ fontSize: "14px", fontWeight: "bold", }}>
                    <i class="fas fa-info-circle"></i>
                    <span>About</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" style={{ fontSize: "14px", fontWeight: "bold", }}>
                    <i class="fas fa-cogs"></i>
                    <span>Services</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" style={{ fontSize: "14px", fontWeight: "bold", }}>
                    <i class="fas fa-envelope"></i>
                    <span>Contact</span>
                </a>
            </li>
        </ul>
    </div>
    </div>
  )
}
export default HoverBar