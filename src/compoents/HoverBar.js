import React from 'react'
import './Hoverbar.css'
export const HoverBar = () => {
  return (
    <div>
        <div class="sBar">
        <ul class="nav flex-column">
            <li class="nav-item">
                <a class="nav-link" href="#">
                    <i class="fas fa-home"></i>
                    <span>Home</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">
                    <i class="fas fa-info-circle"></i>
                    <span>About</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">
                    <i class="fas fa-cogs"></i>
                    <span>Services</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">
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