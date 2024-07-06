import React from 'react'
import Mastersidebar from '../../compoents/sidebar';
export const AddSenderInvoice = () => {
  return (
    <div> <div  style={{  fontFamily: 'Plus Jakarta Sans' }}>
    <div className="container-fluid">
          <nav className="navbar navbar-vertical navbar-expand-lg">
            <Mastersidebar />
          </nav>
        <div className='content-wrapper' style={{ fontSize:'14px' }}>
<div className='content-header'>
  <div className='container card card-body p-4 border-0'>
    <h4 className='card-title  fw-bold'>Add Invoice Details  </h4>
    <hr/>
  <form className="p-1">
   
<div className='row g-3'>
<div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label className="form-label" for="inputTax">Tax </label>
                          <select class="form-select" aria-label="Default select example1"   >
  <option >Select Tax</option>
  <option value="1" selected style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}>Yes</option>
  <option value="2" selected style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}>No</option>
 
</select>
<br/>
                      <div className='row g-4'>
                        <div className="col">
                          <label className="form-label" for="inputGST">GST </label>
                          <select class="form-select" aria-label="Default select example2"   >
  <option >Select GST</option>
  <option value="1" selected style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}>Yes</option>
  <option value="2" selected style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}>No</option>
 
</select>
                       
                        </div>
                        <div className="col">
                          <label className="form-label" for="inputTDS">TDS  </label>
                          <select class="form-select" aria-label="Default select example3"   >
  <option >Select TDS</option>
  <option value="1" selected style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}>Yes</option>
  <option value="2" selected style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}>No</option>
 
</select>
                       
                        </div>
                        </div>
                        </div>

                       <h4 className='card-title  fw-bold mt-5'>Sender Name  </h4>
    <hr/>
<div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label className="form-label" for="inputClientname">Client Name</label>
                          <input className="form-control" id="inputClientname" type="text" name='Clientname' placeholder='Enter Client Name'  style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}/>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label className="form-label" for="inputuniversity">University Name </label>
                          <select class="form-select" aria-label="Default select example4"   >
  <option >Select University</option>
  <option value="1" selected style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}>Yes</option>
  <option value="2" selected style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}>No</option>
 
</select>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label className="form-label" for="inputapplicationid">Application ID </label>
                          <select class="form-select" aria-label="Default select example5"   >
  <option >Select Application ID</option>
  <option value="1" selected style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}>Yes</option>
  <option value="2" selected style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}>No</option>
 
</select>
                       
                        </div>


                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label className="form-label" for="inputcurrency">Currency </label>
                          <input className="form-control" id="inputcurrency" name='currency' type="text" placeholder="Enter Currency" style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}/>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label className="form-label" for="inputcommission">Commission</label>
                          <input className="form-control" id="inputcomission" name='commission' type="text" placeholder="Enter Commission" style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}/>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label className="form-label" for="inputamountreceived">Amount to be received Currency</label>
                          <input className="form-control" id="inputamountreceived" name='amountreceived' type="text" placeholder='Enter Amount to be received Currency' style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}/>
                        </div>
  
    

                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label className="form-label" for="inputprimarynumber">Amount Received in INR& Currency</label>
                          <input className="form-control" id="inputPrimarynumber" name='amountreceived' type="text" placeholder='EnterAmount Received in INR& Currency' style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }} />
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label className="form-label" for="inputinrvalue">INR Value </label>
                          <input className="form-control" id="inputinrvalue" name='inrvalue' type="text" placeholder="Enter INR Value " style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}/>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label className="form-label" for="inputreceivername">Receiver Name</label>
                          <input className="form-control" id="inputreceivername" name='recievername' type="text" placeholder="Enter Reciever Name " style={{fontFamily: 'Plus Jakarta Sans', fontSize:'12px' }}/>
                       
                     
                        </div>
                      
                       
                      
   
 
                     
                     
    
                    
                      <div className='d-flex flex-row align-item-center justify-content-end gap-4'>
                      
                          <button className="btn w-25 " type="submit" style={{backgroundColor:'#fe5722',color:'#fff'}}>Save</button>
                        
                       
                          <button className="btn w-25 " style={{backgroundColor:'#0f2239',color:'#fff'}} type="submit">Cancel</button>
                        
                      </div>
</div>
  
                      
                    
                   
                        
                      </form>
  </div>
</div>
        
        </div>
                    
               </div>     
    </div></div>
  )
}
export default  AddSenderInvoice