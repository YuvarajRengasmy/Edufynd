    {/* {campuses.map((campus, index) => (
          
                <div  key={index}>
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
            
              <label>Campus</label>
              
              <select
              style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                value={campus.campus}
                onChange={(e) => handleInputChange(index, 'campus', e.target.value)}
                name='campus'
                className="form-select"
                placeholder='Enter Campus'
              >
                <option value="">Select Campus</option>
                {optionsToRender.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.campuses[index].campus.required && (
                                <span className="text-danger form-text profile_error">
                                  This field is required.
                                </span>
                              )}
                            

           
            </div>
             <div className="row mt-3">
            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
            <div >
              <label>Intake</label>
              <select
               style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                value={campus.inTake}
                onChange={(e) => handleInputChange(index, 'inTake', e.target.value)}
           
                name='inTake'
                className="form-select"
                placeholder='Enter Intake'
              >
                <option value="">Select Intake</option>
                {inTakeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option> 
                ))}
              </select>
            
              {errors.campuses[index].inTake.required && (
                                <span className="text-danger form-text profile_error">
                                  This field is required.
                                </span>
                              )}
                            
             

             
            </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
            <div >
              <label>Course Fees</label>
              <input
               style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                type="text"
                value={campus.courseFees}
                name='courseFees'
                onChange={(e) => handleInputChange(index, 'courseFees', e.target.value)}
                
                className="form-control"


                placeholder='Enter Course Fees'
              />
               {errors.campuses[index].courseFees.required && (
                                <span className="text-danger form-text profile_error">
                                  This field is required.
                                </span>
                              )}
                              {errors.campuses[index].courseFees.valid && (
                                <div className="text-danger form-text">
                                 Enter valid 4 digit number
                                </div>
                              )}
                              
            </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
            <div>
              <label>Duration</label>
              <input
               style={{ backgroundColor: '#fff', fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}
                type="text"
                value={campus.duration}
                name='duration'
                onChange={(e) => handleInputChange(index, 'duration', e.target.value)}
                className="form-control"


                placeholder='Enter Duration'
              />
               {errors.campuses[index].duration.required && (
                                <span className="text-danger form-text profile_error">
                                  This field is required.
                                </span>
                              )}
                              {errors.campuses[index].duration.valid && (
                                <div className="text-danger form-text">
                                Enter valid duration (1year or 2year)
                                </div>
                              )}
                            

            </div>
          </div>
        
          </div>
          
          <div className="col-lg-12 col-md-12 col-sm-12">
          <div>
            <button
              type="button"
              onClick={addCampus}
              style={{ backgroundColor: '#fe5722',fontSize:'14px' }}
              className="btn text-white"
            >
              Add Campus <i class="fa fa-plus-circle" aria-hidden="true"></i>
            </button>
          </div>
        </div>
          </div>
          
        
        ))} */}