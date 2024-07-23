import React from 'react'
import Sidebar from "../../compoents/sidebar";

import { RichTextEditor } from '@mantine/rte';
import { Editor } from '@tinymce/tinymce-react';
export const EditBlog = () => {
  return (
    <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
      <div class="container-fluid">
        <nav class="navbar navbar-vertical navbar-expand-lg">
          <Sidebar />

        </nav>

        <div className="content-wrapper " style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '13px' }}>
          <div className="content-header ">
            <div className="content container-fluid ">
              <form >
                <div className="row">
                  <div className="col-lg-8 ">
                    <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
                      <div className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0" style={{ background: '#fe5722', color: '#fff' }}>
                        <h5 className='text-center text-capitalize p-1'> Edit Blog Details</h5>
                      </div>
                      <div className="card-body mt-5">



                       
                          <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                              type="text"
                              className="form-control"
                              id="title"
                              placeholder="Title"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              name='title'
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="slug">Slug <small>(If you leave it blank, it will be generated automatically.)</small></label>
                            <input
                              type="text"
                              className="form-control"
                              id="slug"
                              placeholder="Slug"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              name='slug'

                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="summary">Summary & Description (Meta Tag)</label>
                            <textarea
                              className="form-control"
                              id="summary"
                              placeholder="Summary & Description (Meta Tag)"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              name='summary'

                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="keywords">Keywords (Meta Tag)</label>
                            <input
                              type="text"
                              className="form-control"
                              id="keywords"
                              placeholder="Keywords (Meta Tag)"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              name='keywords'

                            />
                          </div>

                          <div className="form-group">
                            <label>Visibility</label>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="visibility"
                                id="show"
                                value="1"
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                                
                              />
                              <label className="form-check-label" htmlFor="show">
                                Show
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="show"
                                id="hide"
                                value="0"
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                              

                              />
                              <label className="form-check-label" htmlFor="hide">
                                Hide
                              </label>
                            </div>
                          </div>

                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="featured"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              name='addtofeatured'

                            />
                            <label className="form-check-label" htmlFor="featured">Add to Featured</label>
                          </div>

                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="breaking"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              name='addtobreaking'

                            />
                            <label className="form-check-label" htmlFor="breaking">Add to Breaking</label>
                          </div>

                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="slider"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              name='addtoslider'

                            />
                            <label className="form-check-label" htmlFor="slider">Add to Slider</label>
                          </div>

                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="recommended"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              name='addtorecommended'

                            />
                            <label className="form-check-label" htmlFor="recommended">Add to Recommended</label>
                          </div>

                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="needAuth"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              name='showonlytoregisteredusers'

                            />
                            <label className="form-check-label" htmlFor="needAuth">Show Only to Registered Users</label>
                          </div>

                          <div className="form-group">
                            <label htmlFor="tags">Tags</label>
                            <input
                              type="text"
                              className="form-control"
                              id="tags"
                              placeholder="Tags"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              name='tags'

                            />
                            <small className="form-text text-muted">(Type tag and hit enter)</small>
                          </div>

                          <div className="form-group">
                            <label htmlFor="optionalUrl">Optional URL</label>
                            <input
                              type="url"
                              className="form-control"
                              id="optionalUrl"
                              placeholder="Optional URL"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              name='url'
                            />
                          </div>
                        
            
              
                    <label className="control-label control-label-content">Content</label>
                    <div id="main_editor">
                        <div className="row">
                            <div className="col-sm-12 editor-buttons">
                                <button type="button" className="btn btn-sm text-uppercase fw-semibold px-3 py-2" data-bs-toggle="modal" data-bs-target="#BlogModel" data-image-type="editor" style={{fontSize:'10px',backgroundColor:'#231f20',color:'#fff'}}>
                                    <i className="fa fa-image"></i>&nbsp;&nbsp;&nbsp;Add Image
                                </button>
                                <div class="modal fade" id="BlogModel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header moader-header-xl">
        <div className='d-flex flex-row justify-content-between align-items-center gap-5'>
        <h1 class=" fw-semibold text-uppercase " id="exampleModalLabel" style={{fontSize:'18px'}}>Images</h1>
        <input type="email" class="form-control rounded-3" id="floatingInput" placeholder="Search" style={{fontSize:'12px',width:'500px'}}/>
 
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"  style={{fontSize:'12px'}}></button>
        </div>
      
      </div>
      <div class="modal-body">
       <div className='row'>
       <div className='col-sm-3 border-end'>
           
           <label>Upload Images</label>
            <input type="file" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
          
                     
                   
                  </div>
                  
                  <div className='col-sm-9 '>
                    <div className='container-fluid' style={{height:'340px',overflow:'auto'}}>
                      <div className='row'>
                        <div className='col-sm-2'>
                          <div className='card border-0 shadow-sm'>
                            <img src='https://placehold.co/80x80' className='card-img-top img-fluid' alt='images1' />
                            <div className='card-body'>
                              <p className=' text-center' style={{fontSize:'12px'}}>Image Name</p>
                            </div>
          
                          </div>
                        </div>
                        <div className='col-sm-2'>
                          <div className='card border-0 shadow-sm'>
                            <img src='https://placehold.co/80x80' className='card-img-top img-fluid' alt='images1' />
                            <div className='card-body'>
                              <p className=' text-center' style={{fontSize:'12px'}}>Image Name</p>
                            </div>
          
                          </div>
                        </div>
                        <div className='col-sm-2'>
                          <div className='card border-0 shadow-sm'>
                            <img src='https://placehold.co/80x80' className='card-img-top img-fluid' alt='images1' />
                            <div className='card-body'>
                              <p className=' text-center' style={{fontSize:'12px'}}>Image Name</p>
                            </div>
          
                          </div>
                        </div>
                        <div className='col-sm-2'>
                          <div className='card border-0 shadow-sm'>
                            <img src='https://placehold.co/80x80' className='card-img-top img-fluid' alt='images1' />
                            <div className='card-body'>
                              <p className=' text-center' style={{fontSize:'12px'}}>Image Name</p>
                            </div>
          
                          </div>
                        </div>
                        <div className='col-sm-2'>
                          <div className='card border-0 shadow-sm'>
                            <img src='https://placehold.co/80x80' className='card-img-top img-fluid' alt='images1' />
                            <div className='card-body'>
                              <p className=' text-center' style={{fontSize:'12px'}}>Image Name</p>
                            </div>
          
                          </div>
                        </div>
                        <div className='col-sm-2'>
                          <div className='card border-0 shadow-sm'>
                            <img src='https://placehold.co/80x80' className='card-img-top img-fluid' alt='images1' />
                            <div className='card-body'>
                              <p className=' text-center' style={{fontSize:'12px'}}>Image Name</p>
                            </div>
          
                          </div>
                        </div>
                        <div className='col-sm-2'>
                          <div className='card border-0 shadow-sm'>
                            <img src='https://placehold.co/80x80' className='card-img-top img-fluid' alt='images1' />
                            <div className='card-body'>
                              <p className=' text-center' style={{fontSize:'12px'}}>Image Name</p>
                            </div>
          
                          </div>
                        </div>
                        <div className='col-sm-2'>
                          <div className='card border-0 shadow-sm'>
                            <img src='https://placehold.co/80x80' className='card-img-top img-fluid' alt='images1' />
                            <div className='card-body'>
                              <p className=' text-center' style={{fontSize:'12px'}}>Image Name</p>
                            </div>
          
                          </div>
                        </div>
                        <div className='col-sm-2'>
                          <div className='card border-0 shadow-sm'>
                            <img src='https://placehold.co/80x80' className='card-img-top img-fluid' alt='images1' />
                            <div className='card-body'>
                              <p className=' text-center' style={{fontSize:'12px'}}>Image Name</p>
                            </div>
          
                          </div>
                        </div>
                        <div className='col-sm-2'>
                          <div className='card border-0 shadow-sm'>
                            <img src='https://placehold.co/80x80' className='card-img-top img-fluid' alt='images1' />
                            <div className='card-body'>
                              <p className=' text-center' style={{fontSize:'12px'}}>Image Name</p>
                            </div>
          
                          </div>
                        </div>
                        <div className='col-sm-2'>
                          <div className='card border-0 shadow-sm'>
                            <img src='https://placehold.co/80x80' className='card-img-top img-fluid' alt='images1' />
                            <div className='card-body'>
                              <p className=' text-center' style={{fontSize:'12px'}}>Image Name</p>
                            </div>
          
                          </div>
                        </div>
                        <div className='col-sm-2'>
                          <div className='card border-0 shadow-sm'>
                            <img src='https://placehold.co/80x80' className='card-img-top img-fluid' alt='images1' />
                            <div className='card-body'>
                              <p className=' text-center' style={{fontSize:'12px'}}>Image Name</p>
                            </div>
          
                          </div>
                        </div>
                        <div className='col-sm-2'>
                          <div className='card border-0 shadow-sm'>
                            <img src='https://placehold.co/80x80' className='card-img-top img-fluid' alt='images1' />
                            <div className='card-body'>
                              <p className=' text-center' style={{fontSize:'12px'}}>Image Name</p>
                            </div>
          
                          </div>
                        </div>
                        <div className='col-sm-2'>
                          <div className='card border-0 shadow-sm'>
                            <img src='https://placehold.co/80x80' className='card-img-top img-fluid' alt='images1' />
                            <div className='card-body'>
                              <p className=' text-center' style={{fontSize:'12px'}}>Image Name</p>
                            </div>
          
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
       </div>
         
          
      
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-sm text-uppercase fw-semibold px-4 py-2" data-bs-dismiss="modal" style={{fontSize:'12px',backgroundColor:'#231f20',color:"#fff"}}>Close</button>
       
      </div>
    </div>
  </div>
</div>
                            </div>
                        </div>
                        <br/>
                        <div className="form-group">
                        <Editor
                            apiKey="zsaa70k6kdt6bw9gg6ff5qwe2jd1pl3l0cul48u6w5nwrb3q" // Replace with your TinyMCE API key
                           
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar:
                                    'undo redo | formatselect | bold italic backcolor | \
                                    alignleft aligncenter alignright alignjustify | \
                                    bullist numlist outdent indent | removeformat | help'
                            }}
                           
                        />
                        </div>
                       
                    </div>
              
           
        






                        

                      </div>
                    </div>
                  </div>
                  <div className='col-lg-4'>
                  <div className="card card-body  border-0 rounded-0 shadow-sm p-3 ">
                  <div className="container">
            {/* Image Section */}
            <div className="box">
                <div className="box-header with-border">
                    <div className="left">
                        <h6 className="box-title">
                            Image
                          
                        </h6>
                        <small className="small-title" style={{fontSize:'10px'}}>Main post image</small>
                    </div>
                </div>
                <div className="box-body" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '13px' }}>
                    <div className="form-group m-0">
                        <div className="row">
                            <div className="col-sm-12">
                                <div id="post_select_image_container" className="post-select-image-container">
                                   
                                       
                                      
                                            <button className="btn btn-sm px-3 py-2 fw-semibold text-uppercase"   style={{backgroundColor:'#231f20',color:'#fff',fontSize:'10px'}} data-bs-toggle="modal" data-bs-target="#BlogModel" data-image-type="additional">   <i className="fa fa-image"></i>&nbsp;&nbsp;&nbsp;Select Image</button>
                                        
                                    
                                </div>
                                <input type="hidden" name="post_image_id" id="post_image_id" />
                            </div>
                        </div>
                        <div className="row m-b-5">
                            <div className="col-sm-12">
                                <label>or&nbsp;Add Image Url</label>
                            </div>
                            <div className="col-sm-12 m-b-5">
                                <input type="text" className="form-control" name="image_url" id="video_thumbnail_url" placeholder="Add Image Url"   style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }} />
                            </div>
                        </div>
                        <div className="row row-image-description">
                            <div className="col-sm-12">
                                <label className="control-label">Image Description</label>
                                <input type="text" className="form-control" name="image_description" placeholder="Image Description" value=""    style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </div>

            {/* Additional Images Section */}
            <div className="card card-body  border-0 rounded-0 shadow-sm p-3 ">
            <div className="box">
                <div className="box-header with-border">
                    <div className="left">
                        <h6 className="box-title">
                            Additional Images
                           
                        </h6>
                        <small className="small-title" style={{fontSize:'10px'}}>More main images (slider will be active)</small>
                    </div>
                </div>
                <div className="box-body">
                    <div className="form-group m-0">
                        <div className="row">
                            <div className="col-sm-12">
                                <button className="btn btn-sm px-3 py-2 text-uppercase fw-semibold" style={{fontSize:'10px',backgroundColor:'#231f20',color:'#fff'}}  >
                                <i className="fa fa-image"></i>  Select Image
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="form-group m-0">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="additional-image-list"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>

            {/* Files Section */}
            <div className="card card-body  border-0 rounded-0 shadow-sm p-3 ">
            <div className="box">
                <div className="box-header with-border">
                    <div className="left">
                        <h6 className="box-title">
                            Files
                           
                        </h6>
                        <small className="small-title" style={{fontSize:'10px'}}>Downloadable additional files (.pdf, .docx, .zip etc..)</small>
                    </div>
                </div>
                <div className="box-body">
                    <div className="form-group m-0">
                        <div className="row">
                            <div className="col-sm-12">
                                <button className="btn btn-sm px-3 py-2 text-uppercase fw-semibold" style={{fontSize:'10px',backgroundColor:'#231f20',color:'#fff'}}data-bs-toggle="modal" data-bs-target="#BlogModel">
                                <i class="fa fa-file" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Select File
                                </button>
                            </div>
                            <div className="col-sm-12 post-selected-files-container">
                                <div id="post_selected_files" className="post-selected-files"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>

            {/* Category Section */}
            <div className="card card-body  border-0 rounded-0 shadow-sm p-3 ">
            <div className="box">
                <div className="box-header with-border">
                    <div className="left">
                        <hp className="box-title">Category</hp>
                    </div>
                </div>
                <div className="box-body">
                    <div className="form-group">
                        <label>Language</label>
                        <select name="lang_id" className="form-select"  autoComplete="off"   style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}>
                            <option value="1" selected>English</option>
                            <option value="2">Arabic</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Category</label>
                        <select id="categories" name="category_id" className="form-select" autoComplete="off"  required   style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}>
                            <option value="">Select a category</option>
                            <option value="Fashion">Fashion</option>
                            <option value="Life Style">Life Style</option>
                            <option value="Quizzes">Quizzes</option>
                            <option value="RSS News">RSS News</option>
                            <option value="Sport">Sport</option>
                            <option value="Travel">Travel</option>
                            <option value="9">Videos</option>
                        </select>
                    </div>
                    <div className="form-group m-0">
                        <label className="control-label">Subcategory</label>
                        <select id="subcategories" name="subcategory_id" className="form-select" autoComplete="off"   style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}>
                            <option value="Select a category 1">Select a category 1</option>
                            <option value="Select a category 2">Select a category 2</option>
                            <option value="Select a category 3">Select a category 3</option>
                            <option value="Select a category 4">Select a category 4</option>
                        </select>
                    </div>
                </div>
            </div>
            </div>

            {/* Publish Section */}
            <div className="card card-body  border-0 rounded-0 shadow-sm p-3 ">
            <div className="box">
                <div className="box-header with-border">
                    <div className="left">
                        <p className="box-title">Publish</p>
                    </div>
                </div>
                <div className="box-body">
                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" name="scheduled_post" value="1" id="cb_scheduled" className="custom-control-input"   style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }} />
                            <label htmlFor="cb_scheduled" className="custom-control-label">Scheduled Post</label>
                        </div>
                    </div>
                    <div id="date_published_content" className="form-group">
                        <div className="row">
                            <div className="col-sm-12">
                                <label>Date Published</label>
                                <div className='input-group date' id='datetimepicker'>
                                    <input type='text' className="form-control" name="date_published" id="input_date_published" placeholder="Date Published"   style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}/>
                                    <span className="input-group-addon">
                                        <span className="glyphicon glyphicon-calendar"></span>
                                    </span>
                                </div>
                            </div>
                        </div>
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
export default EditBlog