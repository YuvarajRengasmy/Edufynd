<div style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans',fontSize: '14px' }}>
<div className='scroll-bar' style={{backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans'}}>
  <div className='container' >
    <div className='container d-flex flex-column border-start border-end gap-2  bg-white'>
      <div className='row gap-lg-2 gap-md-2 gap-2 p-0 mt-1 d-flex justify-content-center'>
        <div className='container '>
          <div className='row mt-3'>
            <div className='col-lg-4'>
            <div className='container'>
      <div className='card shadow border-0 p-3'>
          <div className="mb-2 ">
                      <img src={
                 university?.universityLogo?university?.universityLogo:
                  "https://wallpapercave.com/wp/wp6837474.jpg"
                } className="card-img-top img-fluid rounded-top-2" alt="bannerImage" style={{ maxHeight: '6rem', objectFit: 'cover' }} />
                      <div className="position-absolute top-55 start-50 translate-middle">
                      <img src= {"https://photos.applyboard.com/schools/000/000/154/logos/small/ILAC_LOGO_1.png?1574286109"} className="rounded-circle img-fluid mx-auto" alt="profileImage" style={{ width: '7rem', height: '7rem', objectFit: 'cover' }} />
                      </div>
                  </div>
          <span className='text-center mt-5' style={{ fontSize: "18px", fontWeight: "500" }}>{university?.universityName}</span>
          <p className='text-center text-secondary mt-2'>{university?.country}</p>
          <div className='card shadow border-1 rounded p-3 mt-2 mb-2'>
              <span className='text-secondary fw-bolder d-flex align-items-center justify-content-center gap-2 text-uppercase'>UniverSity Rank: <span><RiCoinsFill className='text-warning fs-4' /> {university?.ranking}</span> </span>
          </div>
          
          <div className='card border-0 p-2 mt-3' style={{ backgroundColor: "#f1f1f4" }}>
              <div className='card-body'>
                  <div className='d-flex flex-wrap align-items-center justify-content-between'>
                      <span className='fs-5' style={{ fontWeight: "500",fontSize: "18px" }}>Institution Details</span>     
                  </div>
                  <div className=''>
                      <p className='text-secondary mt-2'>Founded:- {university?.founded}</p>
                      <p className='text-secondary mt-2'>Application fee:- {university?.applicationFee} </p>
                      <p className='text-secondary mt-2'>Cost of living:- {university?.costOfLiving} </p>
                      <p className='text-secondary mt-2'>Gross tuition:- {university?.grossTuition} </p>
                      <p className='text-secondary mt-2'>Institution type:- {university?.institutionType} </p>
                  </div>
              </div>
          </div>
        
          <div className='card border-0 p-2 mt-3' style={{ backgroundColor: "#f1f1f4" }}>
              <div className='card-body'>
                  <div className='d-flex flex-wrap align-items-center justify-content-between'>
                      <span className='fs-5' style={{ fontWeight: "500",fontSize: "18px" }}>Average Time to Receive Letter of Acceptance</span>
                  </div>
                  <div className=''>
                      <p className='text-secondary mt-2'>January - April:- Under 15 days </p>
                      <p className='text-secondary mt-2'>May - August:- Under 15 days</p>
                      <p className='text-secondary mt-2'>September - December:- Under 15 days</p>                     
                  </div>
              </div>
          </div>
      </div>
  </div>
            </div>
            <div className='col-lg-8 scroll-hide' >
            <div className='container'>
  <div>
    <h4 style={{  fontFamily: 'Plus Jakarta Sans',fontSize: '18px' }}>  <RiSchoolLine /> :- About</h4>
    <div className='container card my-2 px-4'>

      <p>{university?.admissionRequirement} </p>
    </div>
  </div>
  <br />
  
  <div>
<h4 className=' mt-2'style={{  fontFamily: 'Plus Jakarta Sans',fontSize: '18px' }}> <RiFileTextLine color="purple" />  :Campus</h4>
<div className='container card my-2 px-4'>
<div >

        <div className='row mt-4'>
        {Array.isArray(university?.campus) &&
               university?.campus?.map(
                  (campus, index) => (
          <div key={index} className="col-12 col-lg-12 col-xl-6 mb-3">
            <div className="card" style={{ width: '100%' }}>
              <img src={banner} className="card-img-top" alt="events" style={{ width: '100%', height: 50, objectFit: 'cover' }} />
              <div  className="card-body">
                <div className="d-flex">
                  <div className="col-12 text-center mt-1">
                  <h5 className="text-center ">{campus}</h5>
                    <button type="button" style={{  fontFamily: 'Plus Jakarta Sans',fontSize: '14px' }} className="btn btn-primary">view</button>
                  </div>
                </div>
              </div>
             
            </div>
          </div>
          
        ))}
       
         
        </div>
      
      </div>
</div>
</div>

  <div>
    <h4 className='mt-4' style={{  fontFamily: 'Plus Jakarta Sans',fontSize: '18px' }}>  < RiMapPin2Line /> :- Location</h4>
    <div className='container card my-2 px-4'>
      <iframe className="position-relative  w-100 h-100" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.6308475275847!2d80.1860759148148!3d13.044570390728517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52675282a32249%3A0x7e7ac7268da97b24!2s17%2FA2%2C%203rd%20Floor%2C%20Daaru%20Complex%2C%20Gandhi%20St%2C%20Alwartirunagar%2C%20Chennai%2C%20Tamil%20Nadu%20600087!5e0!3m2!1sen!2sin!4v1641299492069!5m2!1sen!2sin&q=17%2FA2%2C%203rd%20Floor%2C%20Daaru%20Complex%2C%20Gandhi%20St%2C%20Alwartirunagar%2C%20Chennai%2C%20Tamil%20Nadu%20600087" frameBorder={0} style={{ minHeight: 250, border: 0 }} allowFullScreen aria-hidden="false" tabIndex={0} />
    </div>
  </div>
  <br />
  <h4 className=' mt-2'style={{  fontFamily: 'Plus Jakarta Sans',fontSize: '18px' }}>  < RiProjectorFill /> :- Program</h4>
  <div class="container">
    <div class="row ">
      <div class="col-lg-12">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Search jobs..." aria-label="Search jobs" aria-describedby="searchButton" style={{  fontFamily: 'Plus Jakarta Sans',fontSize: '14px' }}/>
          <button class="btn btn-primary" type="button" id="searchButton" style={{  fontFamily: 'Plus Jakarta Sans',fontSize: '14px' }}>Search</button>
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

  {program.map((program) => (
<div key={program._id} className="card single-job-items mb-3">
<div className="card-body job-items d-flex align-items-center">
<div className="company-img mr-3">
  <a href="#"><img src={"https://photos.applyboard.com/schools/000/000/154/logos/small/ILAC_LOGO_1.png?1574286109"} alt="Company Logo" width="100" height="50" className="img-fluid" /></a>
</div>
<div className="job-tittle job-tittle2">
  <a href="#">
    <h4 className="card-title" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>{program?.universityName}</h4>
  </a>
  <ul className="list-unstyled mb-0">
    <li>{program?.programTitle}</li>
    <li style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
      <i className="fas fa-map-marker-alt"></i> {program?.campus} - {program?.country}
    </li>
    <li style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>{program?.courseFee}</li>
  </ul>
</div>
</div>
<div className="card-footer items-link items-link2 d-flex justify-content-center">
<Link
  className="btn text-white"
  style={{ backgroundColor: "#FE5722", fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}
  to={{ pathname: "/ViewProgram", search: `?id=${program?._id}` }}
>
  View Program
</Link>
</div>
</div>
))}
                               

                                
                            
  
  
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
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>