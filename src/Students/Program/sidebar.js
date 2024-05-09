import { CiLinkedin } from 'react-icons/ci';
import { RiCoinsFill } from 'react-icons/ri';
import { SiGnuprivacyguard } from 'react-icons/si';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
const UserDetails = () => {
  return (
    <div className='container'>
      <div className='card shadow border-0 p-3'>
        <div className='card shadow border-1 rounded p-3 mt-3 mb-3'>
          <span className='text-secondary fw-bolder d-flex align-items-center justify-content-center gap-2 text-uppercase'>Similar programs <span><RiCoinsFill className='text-warning fs-4' /> </span> </span>
        </div>
        <div>
          <div class="card single-job-items mb-3">
            <div class="card-body job-items d-flex align-items-center">
              <div class="company-img mr-3">
                <a href="#"><img src={"https://photos.applyboard.com/schools/000/000/154/logos/small/ILAC_LOGO_1.png?1574286109"} alt="Company Logo" width="100" height="50" class="img-fluid" /></a>
              </div>
              <div class="job-tittle job-tittle2">
                <a href="#">
                  <h4 class="card-title">General English - Intensive English Program (30 lessons/week)</h4>
                </a>
                <ul class="list-unstyled mb-0">
                  <li>International Language Academy of Canada (ILAC) - Vancouvery</li>
                  <li><i class="fas fa-map-marker-alt"></i>   Vancouver, British Columbia, CA</li>
                  <li>$ 12,425.00 CAD / Year</li>
                </ul>
              </div>
            </div>
            <div class="card-footer items-link items-link2 d-flex justify-content-center">
              <a href="/ViewProgramUniversity" class="btn btn-primary ">View Program</a>
            </div>
          </div>
          <div class="card single-job-items mb-3">
            <div class="card-body job-items d-flex align-items-center">
              <div class="company-img mr-3">
                <a href="#"><img src={"https://photos.applyboard.com/schools/000/000/154/logos/small/ILAC_LOGO_1.png?1574286109"} alt="Company Logo" width="100" height="50" class="img-fluid" /></a>
              </div>
              <div class="job-tittle job-tittle2">
                <a href="#">
                  <h4 class="card-title">General English - Intensive English Program (30 lessons/week)</h4>
                </a>
                <ul class="list-unstyled mb-0">
                  <li>International Language Academy of Canada (ILAC) - Vancouvery</li>
                  <li><i class="fas fa-map-marker-alt"></i>   Vancouver, British Columbia, CA</li>
                  <li>$ 12,425.00 CAD / Year</li>
                </ul>
              </div>
            </div>
            <div class="card-footer items-link items-link2 d-flex justify-content-center">
              <a href="/ViewProgramUniversity" class="btn btn-primary ">View Program</a>

            </div>
          </div>
          <div class="card single-job-items mb-3">
            <div class="card-body job-items d-flex align-items-center">
              <div class="company-img mr-3">
                <a href="#"><img src={"https://photos.applyboard.com/schools/000/000/154/logos/small/ILAC_LOGO_1.png?1574286109"} alt="Company Logo" width="100" height="50" class="img-fluid" /></a>
              </div>
              <div class="job-tittle job-tittle2">
                <a href="#">
                  <h4 class="card-title">General English - Intensive English Program (30 lessons/week)</h4>
                </a>
                <ul class="list-unstyled mb-0">
                  <li>International Language Academy of Canada (ILAC) - Vancouvery</li>
                  <li><i class="fas fa-map-marker-alt"></i>   Vancouver, British Columbia, CA</li>
                  <li>$ 12,425.00 CAD / Year</li>
                </ul>
              </div>
            </div>
            <div class="card-footer items-link items-link2 d-flex justify-content-center">
              <a href="/ViewProgramUniversity" class="btn btn-primary ">View Program</a>

            </div>
          </div>
          <div class="card single-job-items mb-3">
            <div class="card-body job-items d-flex align-items-center">
              <div class="company-img mr-3">
                <a href="#"><img src={"https://photos.applyboard.com/schools/000/000/154/logos/small/ILAC_LOGO_1.png?1574286109"} alt="Company Logo" width="100" height="50" class="img-fluid" /></a>
              </div>
              <div class="job-tittle job-tittle2">
                <a href="#">
                  <h4 class="card-title">General English - Intensive English Program (30 lessons/week)</h4>
                </a>
                <ul class="list-unstyled mb-0">
                  <li>International Language Academy of Canada (ILAC) - Vancouvery</li>
                  <li><i class="fas fa-map-marker-alt"></i>   Vancouver, British Columbia, CA</li>
                  <li>$ 12,425.00 CAD / Year</li>
                </ul>
              </div>
            </div>
            <div class="card-footer items-link items-link2 d-flex justify-content-center">
              <a href="/ViewProgramUniversity" class="btn btn-primary ">View Program</a>

            </div>
          </div>
          <div class="card single-job-items mb-3">
            <div class="card-body job-items d-flex align-items-center">
              <div class="company-img mr-3">
                <a href="#"><img src={"https://photos.applyboard.com/schools/000/000/154/logos/small/ILAC_LOGO_1.png?1574286109"} alt="Company Logo" width="100" height="50" class="img-fluid" /></a>
              </div>
              <div class="job-tittle job-tittle2">
                <a href="#">
                  <h4 class="card-title">General English - Intensive English Program (30 lessons/week)</h4>
                </a>
                <ul class="list-unstyled mb-0">
                  <li>International Language Academy of Canada (ILAC) - Vancouvery</li>
                  <li><i class="fas fa-map-marker-alt"></i>   Vancouver, British Columbia, CA</li>
                  <li>$ 12,425.00 CAD / Year</li>
                </ul>
              </div>
            </div>
            <div class="card-footer items-link items-link2 d-flex justify-content-center">
              <a href="/ViewProgramUniversity" class="btn btn-primary ">View Program</a>

            </div>
          </div>
          <div class="card single-job-items mb-3">
            <div class="card-body job-items d-flex align-items-center">
              <div class="company-img mr-3">
                <a href="#"><img src={"https://photos.applyboard.com/schools/000/000/154/logos/small/ILAC_LOGO_1.png?1574286109"} alt="Company Logo" width="100" height="50" class="img-fluid" /></a>
              </div>
              <div class="job-tittle job-tittle2">
                <a href="#">
                  <h4 class="card-title">General English - Intensive English Program (30 lessons/week)</h4>
                </a>
                <ul class="list-unstyled mb-0">
                  <li>International Language Academy of Canada (ILAC) - Vancouvery</li>
                  <li><i class="fas fa-map-marker-alt"></i>   Vancouver, British Columbia, CA</li>
                  <li>$ 12,425.00 CAD / Year</li>
                </ul>
              </div>
            </div>
            <div class="card-footer items-link items-link2 d-flex justify-content-center">
              <a href="/ViewProgramUniversity" class="btn btn-primary ">View Program</a>

            </div>
          </div>
          <div class="card single-job-items mb-3">
            <div class="card-body job-items d-flex align-items-center">
              <div class="company-img mr-3">
                <a href="#"><img src={"https://photos.applyboard.com/schools/000/000/154/logos/small/ILAC_LOGO_1.png?1574286109"} alt="Company Logo" width="100" height="50" class="img-fluid" /></a>
              </div>
              <div class="job-tittle job-tittle2">
                <a href="#">
                  <h4 class="card-title">General English - Intensive English Program (30 lessons/week)</h4>
                </a>
                <ul class="list-unstyled mb-0">
                  <li>International Language Academy of Canada (ILAC) - Vancouvery</li>
                  <li><i class="fas fa-map-marker-alt"></i>   Vancouver, British Columbia, CA</li>
                  <li>$ 12,425.00 CAD / Year</li>
                </ul>
              </div>
            </div>
            <div class="card-footer items-link items-link2 d-flex justify-content-center">
              <a href="/ViewProgramUniversity" class="btn btn-primary ">View Program</a>

            </div>
          </div>
        </div>
        <div className='mt-8 d-grid  col-xl-12 mx-auto'>
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-end">
              <li class="page-item disabled">
                <a class="page-link">Previous</a>
              </li>
              <li class="page-item"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item">
                <a class="page-link" href="#">Next</a>
              </li>
            </ul>
          </nav>
        </div>

      </div>
    </div>
  )
}
export default UserDetails;