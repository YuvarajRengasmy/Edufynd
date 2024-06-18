import React from 'react'

export const StudentForm = () => {
  return (
    <div className='container'>
  

                      <form class="row g-3">
                        <div class="col-md-6">
                          <label class="form-label" for="inputEmail4">Email</label>
                          <input class="form-control" id="inputEmail4" type="email"/>
                        </div>
                        <div class="col-md-6">
                          <label class="form-label" for="inputPassword4">Password</label>
                          <input class="form-control" id="inputPassword4" type="password"/>
                        </div>
                        <div class="col-12">
                          <label class="form-label" for="inputAddress">Address</label>
                          <input class="form-control" id="inputAddress" type="text" placeholder="1234 Main St"/>
                        </div>
                        <div class="col-12">
                          <label class="form-label" for="inputAddress2">Address 2</label>
                          <input class="form-control" id="inputAddress2" type="text" placeholder="Apartment, studio, or floor"/>
                        </div>
                        <div class="col-md-6">
                          <label class="form-label" for="inputCity">City</label>
                          <input class="form-control" id="inputCity" type="text"/>
                        </div>
                        <div class="col-md-4">
                          <label class="form-label" for="inputState">State</label>
                          <select class="form-select" id="inputState">
                            <option selected="selected">Choose...</option>
                            <option>...</option>
                          </select>
                        </div>
                        <div class="col-md-2">
                          <label class="form-label" for="inputZip">Zip</label>
                          <input class="form-control" id="inputZip" type="text"/>
                        </div>
                        <div class="col-12">
                          <div class="form-check">
                            <input class="form-check-input" id="gridCheck" type="checkbox"/>
                            <label class="form-check-label" for="gridCheck">Check me out</label>
                          </div>
                        </div>
                        <div class="col-12">
                          <button class="btn btn-primary" type="submit">Sign in</button>
                        </div>
                      </form>
                    
                    
    </div>
  )
}
export default StudentForm