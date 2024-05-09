import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { RiProjectorFill, RiMapPin2Line, RiSchoolLine, RiFileTextLine } from 'react-icons/ri';
const UserExperience = () => {

  return (
    <>
      <div className='container'>
        <div>
          <h4 className='fw-bold mt-2'>  <RiSchoolLine /> :- About</h4>
          <div className='container card my-2 px-4'>

            <p>The International Language Academy of Canada (ILAC) is very diverse, and there are students from over 75 countries. The ambassadors speak over 40 languages and ensure the best possible experience at ILAC. ILAC has modern, boutique style facilities in Toronto and Vancouver, two of the cities to live in the world according to UNESCO. </p>
          </div>
        </div>
        <br />
        <div>
          <h4 className='fw-bold mt-2'> <RiFileTextLine color="purple" />  :-Features</h4>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Deserunt ut unde corporis</h5>
              <div className="accordion accordion-flush" id="faq-group-2">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" data-bs-target="#faqsTwo-1" type="button" data-bs-toggle="collapse">
                      Cumque voluptatem recusandae blanditiis?
                    </button>
                  </h2>
                  <div id="faqsTwo-1" className="accordion-collapse collapse" data-bs-parent="#faq-group-2">
                    <div className="accordion-body">
                      Ut quasi odit odio totam accusamus vero eius. Nostrum asperiores voluptatem eos nulla ab dolores est asperiores iure. Quo est quis praesentium aut maiores. Corrupti sed aut expedita fugit vero dolorem. Nemo rerum sapiente. A quaerat dignissimos.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" data-bs-target="#faqsTwo-2" type="button" data-bs-toggle="collapse">
                      Provident beatae eveniet placeat est aperiam repellat adipisci?
                    </button>
                  </h2>
                  <div id="faqsTwo-2" className="accordion-collapse collapse" data-bs-parent="#faq-group-2">
                    <div className="accordion-body">
                      In minus quia impedit est quas deserunt deserunt et. Nulla non quo dolores minima fugiat aut saepe aut inventore. Qui nesciunt odio officia beatae iusto sed voluptatem possimus quas. Officia vitae sit voluptatem nostrum a.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" data-bs-target="#faqsTwo-3" type="button" data-bs-toggle="collapse">
                      Minus aliquam modi id reprehenderit nihil?
                    </button>
                  </h2>
                  <div id="faqsTwo-3" className="accordion-collapse collapse" data-bs-parent="#faq-group-2">
                    <div className="accordion-body">
                      Voluptates magni amet enim perspiciatis atque excepturi itaque est. Sit beatae animi incidunt eum repellat sequi ea saepe inventore. Id et vel et et. Nesciunt itaque corrupti quia ducimus. Consequatur maiores voluptatum fuga quod ut non fuga.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" data-bs-target="#faqsTwo-4" type="button" data-bs-toggle="collapse">
                      Quaerat qui est iusto asperiores qui est reiciendis eos et?
                    </button>
                  </h2>
                  <div id="faqsTwo-4" className="accordion-collapse collapse" data-bs-parent="#faq-group-2">
                    <div className="accordion-body">
                      Numquam ut reiciendis aliquid. Quia veritatis quasi ipsam sed quo ut eligendi et non. Doloremque sed voluptatem at in voluptas aliquid dolorum.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" data-bs-target="#faqsTwo-5" type="button" data-bs-toggle="collapse">
                      Laboriosam asperiores eum?
                    </button>
                  </h2>
                  <div id="faqsTwo-5" className="accordion-collapse collapse" data-bs-parent="#faq-group-2">
                    <div className="accordion-body">
                      Aut necessitatibus maxime quis dolor et. Nihil laboriosam molestiae qui molestias placeat corrupti non quo accusamus. Nemo qui quis harum enim sed. Aliquam molestias pariatur delectus voluptas quidem qui rerum id quisquam. Perspiciatis voluptatem voluptatem eos. Vel aut minus labore at rerum eos.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4 className='fw-bold mt-2'>  < RiMapPin2Line /> :- Location</h4>
          <div className='container card my-2 px-4'>
            <iframe className="position-relative  w-100 h-100" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.6308475275847!2d80.1860759148148!3d13.044570390728517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52675282a32249%3A0x7e7ac7268da97b24!2s17%2FA2%2C%203rd%20Floor%2C%20Daaru%20Complex%2C%20Gandhi%20St%2C%20Alwartirunagar%2C%20Chennai%2C%20Tamil%20Nadu%20600087!5e0!3m2!1sen!2sin!4v1641299492069!5m2!1sen!2sin&q=17%2FA2%2C%203rd%20Floor%2C%20Daaru%20Complex%2C%20Gandhi%20St%2C%20Alwartirunagar%2C%20Chennai%2C%20Tamil%20Nadu%20600087" frameBorder={0} style={{ minHeight: 300, border: 0 }} allowFullScreen aria-hidden="false" tabIndex={0} />
          </div>
        </div>
        <br />
        <h4 className='fw-bold mt-2'>  < RiProjectorFill /> :- Program</h4>
        <div class="container">
          <div class="row ">
            <div class="col-lg-12">
              <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Search jobs..." aria-label="Search jobs" aria-describedby="searchButton" />
                <button class="btn btn-primary" type="button" id="searchButton">Search</button>
              </div>
            </div>
            <div class="d-flex col-md-12 gap-3">
              <div class="small-section-tittle2">
              </div>
              <div class="select-job-items2">
                <select class="form-select" name="select">
                  <option value="">All Category</option>
                  <option value=""><input type="checkbox" />
                    <span class="checkmark">Category</span></option>
                  <option value="">Category 2</option>
                  <option value="">Category 3</option>
                  <option value="">Category 4</option>
                </select>
              </div>
              <div class="select-job-items2">
                <select class="form-select" name="select">
                  <option value="">All Category</option>
                  <option value="">Category 1</option>
                  <option value="">Category 2</option>
                  <option value="">Category 3</option>
                  <option value="">Category 4</option>
                </select>
              </div>
              <div class="select-job-items2">
                <select class="form-select" name="select">
                  <option value="">All Category</option>
                  <option value="">Category 1</option>
                  <option value="">Category 2</option>
                  <option value="">Category 3</option>
                  <option value="">Category 4</option>
                </select>
              </div>
              <div class="select-job-items2">
                <select class="form-select" name="select">
                  <option value="">All Category</option>
                  <option value="">Category 1</option>
                  <option value="">Category 2</option>
                  <option value="">Category 3</option>
                  <option value="">Category 4</option>
                </select>
              </div>
              <div class="select-job-items2">
                <select class="form-select" name="select">
                  <option value="">All Category</option>
                  <option value="">Category 1</option>
                  <option value="">Category 2</option>
                  <option value="">Category 3</option>
                  <option value="">Category 4</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <br />
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
                <li><i class="fas fa-map-marker-alt"></i>  Vancouver, British Columbia, CA</li>
                <li>$ 12,425.00 CAD / Year</li>
              </ul>
            </div>
          </div>
          <div class="card-footer items-link items-link2 d-flex justify-content-between">
            <a href="job_details.html" class="btn btn-primary">View Program</a>
            <span>1-17 month ESL program</span>
          </div>
        </div>
        <div class="card single-job-items mb-3">
          <div class="card-body job-items d-flex align-items-center">
            <div class="company-img mr-3">
              <a href="#"><img src={"https://photos.applyboard.com/schools/000/000/154/logos/small/ILAC_LOGO_1.png?1574286109"} alt="Company Logo" width="100" height="50" class="img-fluid" /></a>
            </div>
            <div class="job-tittle job-tittle2">
              <a href="#">
                <h4 class="card-title">Graduate Certificate - Human Resources Management</h4>
              </a>
              <ul class="list-unstyled mb-0">
                <li>International Language Academy of Canada (ILAC) - Vancouvery</li>
                <li><i class="fas fa-map-marker-alt"></i>  Vancouver, British Columbia, CA</li>
                <li>$ 8,425.00 CAD / Year</li>
              </ul>
            </div>
          </div>
          <div class="card-footer items-link items-link2 d-flex justify-content-between">
            <a href="job_details.html" class="btn btn-primary">View Program</a>
            <span>1 year graduate certificate</span>
          </div>
        </div>
        <div class="card single-job-items mb-3">
          <div class="card-body job-items d-flex align-items-center">
            <div class="company-img mr-3">
              <a href="#"><img src={"https://photos.applyboard.com/schools/000/000/154/logos/small/ILAC_LOGO_1.png?1574286109"} alt="Company Logo" width="100" height="50" class="img-fluid" /></a>
            </div>
            <div class="job-tittle job-tittle2">
              <a href="#">
                <h4 class="card-title">Graduate Certificate - People Analytics (B430)</h4>
              </a>
              <ul class="list-unstyled mb-0">
                <li>International Language Academy of Canada (ILAC) - Vancouvery</li>
                <li><i class="fas fa-map-marker-alt"></i>  Vancouver, British Columbia, CA</li>
                <li>$ 12,425.00 CAD / Year</li>
              </ul>
            </div>
          </div>
          <div class="card-footer items-link items-link2 d-flex justify-content-between">
            <a href="job_details.html" class="btn btn-primary">View Program</a>
            <span>12 months (2 semesters in-class, 1 semester work experience)</span>
          </div>
        </div>
        <div class="card single-job-items mb-3">
          <div class="card-body job-items d-flex align-items-center">
            <div class="company-img mr-3">
              <a href="#"><img src={"https://photos.applyboard.com/schools/000/000/154/logos/small/ILAC_LOGO_1.png?1574286109"} alt="Company Logo" width="100" height="50" class="img-fluid" /></a>
            </div>
            <div class="job-tittle job-tittle2">
              <a href="#">
                <h4 class="card-title">Graduate Certificate - Information Technology Business Analysis (1372)</h4>
              </a>
              <ul class="list-unstyled mb-0">
                <li>International Language Academy of Canada (ILAC) - Vancouvery</li>
                <li><i class="fas fa-map-marker-alt"></i>  Vancouver, British Columbia, CA</li>
                <li>$ 12,425.00 CAD / Year</li>
              </ul>
            </div>
          </div>
          <div class="card-footer items-link items-link2 d-flex justify-content-between">
            <a href="job_details.html" class="btn btn-primary">View Program</a>
            <span>2 year graduate certificate</span>
          </div>
        </div>
        <div class="card single-job-items mb-3">
          <div class="card-body job-items d-flex align-items-center">
            <div class="company-img mr-3">
              <a href="#"><img src={"https://photos.applyboard.com/schools/000/000/154/logos/small/ILAC_LOGO_1.png?1574286109"} alt="Company Logo" width="100" height="50" class="img-fluid" /></a>
            </div>
            <div class="job-tittle job-tittle2">
              <a href="#">
                <h4 class="card-title">Graduate Certificate - People Analytics (B430)</h4>
              </a>
              <ul class="list-unstyled mb-0">
                <li>International Language Academy of Canada (ILAC) - Vancouvery</li>
                <li><i class="fas fa-map-marker-alt"></i>  Vancouver, British Columbia, CA</li>
                <li>$ 12,425.00 CAD / Year</li>
              </ul>
            </div>
          </div>
          <div class="card-footer items-link items-link2 d-flex justify-content-between">
            <a href="job_details.html" class="btn btn-primary">View Program</a>
            <span>1 year graduate certificate</span>
          </div>
        </div>
      </div>
    </>
  )
}
export default UserExperience;