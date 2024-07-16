import React from 'react'
import Sidebar from "../../compoents/sidebar";
import { Link } from "react-router-dom";
import { RichTextEditor } from '@mantine/rte';

export const AddBlog = () => {
  return (
    <div  style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
    <div class="container-fluid">
        <nav class="navbar navbar-vertical navbar-expand-lg">
            <Sidebar />
          
        </nav>
    
    <div className="content-wrapper " style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '12px' }}>
        <div className="content-header ">
            <div className="content container-fluid ">
                <form >
                    <div className="row">            
          <div className="col-xl-12 ">
          <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
        <div className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0" style={{background:'#fe5722',color:'#fff'}}>
        <h5 className='text-center text-capitalize p-1'> Add Blog Details</h5>
        </div>
        <div className="card-body mt-5">
        <div className='text-end'><a className='btn text-uppercase fw-semibold px-4 py-2  ' style={{backgroundColor:'#fe5722',color:'#fff',fontSize:'12px'}}>


        <i class="fa fa-plus-circle me-2" aria-hidden="true"></i> Add Tags</a></div>
                      <div className="row g-2">
                     
                     
                        <div className="row g-2">
                      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                         Title<span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control "
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            placeholder="Enter  Title"
                            name="title"
                          />
                          
                        </div>
                        </div>
                        <div className='row g-2'>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <label for="exampleFormControlTextarea1" class="form-label">Introduction</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" name='introduction' rows="3" placeholder='Enter Introduction'   style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}></textarea>
                          
                        </div>
                        </div>
                      
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                             Content 1<span className="text-danger">*</span>
                              </label>
                            <RichTextEditor
                            name="content1"
         
          placeholder="Start writing your content here..."
          style={{
            fontFamily: "Plus Jakarta Sans",
            fontSize: "12px",
            minHeight: '200px', overflowY: 'auto'
           
          }}
        />
       
                              
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                             Content 2<span className="text-danger">*</span>
                              </label>
                            <RichTextEditor
          name="content2"
          placeholder="Start writing your content here..."
          style={{
            fontFamily: "Plus Jakarta Sans",
            fontSize: "12px",
            minHeight: '200px', overflowY: 'auto'
           
          }}
        />
       
                              
                            </div>
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                             Content 3<span className="text-danger">*</span>
                              </label>
                            <RichTextEditor
          name="content3"
          placeholder="Start writing your content here..."
          style={{
            fontFamily: "Plus Jakarta Sans",
            fontSize: "12px",
            minHeight: '200px', overflowY: 'auto'
           
          }}
        />
       
                              
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>
                        Tags<span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control "
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            placeholder="Enter  tags"
                            name="tags"
                          />
                          
                        </div>
                       

                   
                        

                       
                       
                     
                        
                       
                        

                        <div className="add-customer-btns mb-40 d-flex justify-content-end  ml-auto">
                        <button
                                style={{
                                  backgroundColor: "#231F20",
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                type='reset'
                                className="btn btn-cancel border-0 fw-semibold text-uppercase text-white px-4 py-2  m-1"
                              >
                                Cancel
                              </button>
                          <button
                            style={{
                              backgroundColor: "#FE5722",
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                            type="submit"
                            className="btn btn-save border-0 fw-semibold text-uppercase text-white px-4 py-2 m-1"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                    </div>
                    </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </div>
</div>
  )
}
export default AddBlog