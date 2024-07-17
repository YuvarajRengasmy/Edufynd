import React from 'react'
import './Hoverbar.css'
import { Link } from "react-router-dom";
import Edufynd from "../styles/Assets/Admin/edufynd-logo.svg"
export const HoverBar = () => {
  return (
    <div>
        <div class="sBar">
        <ul class="nav flex-column">
        <div className="user-panel mt-2  d-flex">

<div className="info  mt-1 p-2">
  <Link to="/DashBoard"  className="brand-text font-weight-light text-decoration-none">
    <img src={Edufynd} alt="logo" className='img-fluid ' style={{ width: "100%" }} />
  </Link>

</div>
</div>
            <li class="nav-item">
                <Link class="nav-link" to="#"  style={{ fontSize: "14px", fontWeight: "bold", }}>
                    <i class="fas fa-home"></i>
                    <span>Home</span>
                </Link>
            </li>
            <li class="nav-item">
                <Link class="nav-link" to="#"  style={{ fontSize: "14px", fontWeight: "bold", }}>
                    <i class="fas fa-info-circle"></i>
                    <span>About</span>
                </Link>
            </li>
            <li class="nav-item">
                <Link class="nav-link" to="#"  style={{ fontSize: "14px", fontWeight: "bold", }}>
                    <i class="fas fa-cogs"></i>
                    <span>Services</span>
                </Link>
            </li>
            <li class="nav-item">
                <Link class="nav-link" to="#"  style={{ fontSize: "14px", fontWeight: "bold", }}>
                    <i class="fas fa-envelope"></i>
                    <span>Contact</span>
                </Link>
            </li>
        </ul>
    </div>
    </div>
  )
}
export default HoverBar