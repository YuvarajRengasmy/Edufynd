import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import Sidebar from "../../compoents/sidebar";

export const AddBlog = () => {
  return (
    <>
      <Sidebar />

      <div
        className="content-wrapper "
        style={{ fontFamily: "Plus Jakarta Sans", fontSize: "13px" }}
      >
        <div className="content-header ">
          <div className="container ">
            <form>
              <div className="row">
                <div className="col-lg-8 ">
                  <div className="card  border-0 rounded-1 shadow-sm p-3 position-relative">
                    <div
                      className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0"
                      style={{ background: "#fe5722", color: "#fff" }}
                    >
                      <h5 className="text-center text-capitalize p-1">
                        
                        Add Blog Details
                      </h5>
                    </div>
                    <div className="card-body mt-5">
                      <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                          type="text"
                          className="form-control rounded-1 text-muted"
                          id="title"
                          placeholder="Title"
                          style={{
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                          name="title"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="slug">
                          Slug
                          <small>
                            (If you leave it blank, it will be generated
                            automatically.)
                          </small>
                        </label>
                        <input
                          type="text"
                          className="form-control rounded-1 text-muted"
                          id="slug"
                          placeholder="Slug"
                          style={{
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                          name="slug"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="summary">
                          Summary & Description (Meta Tag)
                        </label>
                        <textarea
                          className="form-control rounded-1 text-muted"
                          id="summary"
                          placeholder="Summary & Description (Meta Tag)"
                          style={{
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                          name="summary"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="keywords">Keywords (Meta Tag)</label>
                        <input
                          type="text"
                          className="form-control rounded-1 text-muted"
                          id="keywords"
                          placeholder="Keywords (Meta Tag)"
                          style={{
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                          name="keywords"
                        />
                      </div>

                      

                     



                      

                      <div className="form-group">
                        <label htmlFor="tags">Tags</label>
                        <input
                          type="text"
                          className="form-control rounded-1 text-muted"
                          id="tags"
                          placeholder="Tags"
                          style={{
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                          name="tags"
                        />
                        <small className="form-text text-muted">
                          (Type tag and hit enter)
                        </small>
                      </div>

                      <div className="form-group">
                        <label htmlFor="optionalUrl">Optional URL</label>
                        <input
                          type="url"
                          className="form-control rounded-1 text-muted"
                          id="optionalUrl"
                          placeholder="Optional URL"
                          style={{
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "12px",
                          }}
                          name="url"
                        />
                      </div>

                      <label className="control-label control-label-content">
                        Content
                      </label>
                      <div id="main_editor">
                       
                      
                        <div className="form-group">
                        <Editor
            apiKey="zsaa70k6kdt6bw9gg6ff5qwe2jd1pl3l0cul48u6w5nwrb3q"  
            init={{
                height: 500,
                menubar: true,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                    'emoticons imagetools autosave save directionality',
                    'advcode codesample hr nonbreaking',
                    'pagebreak toc textpattern'
                ],
                toolbar: 'undo redo | formatselect | bold italic backcolor | \
                          alignleft aligncenter alignright alignjustify | \
                          bullist numlist outdent indent | removeformat | help | \
                          insertfile image media link codesample emoticons | \
                          code fullscreen preview save print'
            }}
        />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="card card-body  border-0 rounded-1 shadow-sm p-3 ">
                    <div className="container">
                   
                    
                     
                         
                            <h6 className="box-title">Image</h6>
                            <small
                              className="small-title"
                              style={{ fontSize: "10px" }}
                            >
                              Main post image
                            </small>
                         
                       
                        <div
                          className="box-body"
                          style={{
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "13px",
                          }}
                        >
                          <div className="form-group m-0">
                            <div className="row">
                              <div className="col-sm-12">
                                <div
                                  id="post_select_image_container"
                                  className="post-select-image-container"
                                >
                                 
                                </div>
                                <input
                                  type="hidden"
                                  name="post_image_id"
                                  id="post_image_id"
                                />
                              </div>
                            </div>
                            <div className="row m-b-5">
                              <div className="col-sm-12">
                                <label>Add Image </label>
                              </div>
                              <div className="col-sm-12 m-b-5">
                                <input
                                  type="file"
                                  className="form-control rounded-1 text-muted"
                                  name="image_url"
                                  id="video_thumbnail_url"
                                  placeholder="Add Image Url"
                                  style={{
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                                />
                              </div>
                            </div>
                            <div className="row row-image-description">
                              <div className="col-sm-12">
                                <label className="control-label">
                                  Image Description
                                </label>
                                <input
                                  type="text"
                                  className="form-control rounded-1 text-muted"
                                  name="image_description"
                                  placeholder="Image Description"
                                  value=""
                                  style={{
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                     
                    </div>
                  </div>

                  {/* Additional Images Section */}
                  <div className="card card-body  border-0 rounded-1 shadow-sm p-3 ">
                    <div className="box">
                      <div className="box-header with-border">
                        <div className="left">
                          <h6 className="box-title">Additional Images</h6>
                          <small
                            className="small-title"
                            style={{ fontSize: "10px" }}
                          >
                            More main images (slider will be active)
                          </small>
                        </div>
                      </div>
                      <div className="box-body">
                        <div className="form-group m-0">
                          <div className="row">
                            <div className="col-sm-12">
                              <button
                                className="btn btn-sm px-3 py-2 text-uppercase fw-semibold"
                                style={{
                                  fontSize: "10px",
                                  backgroundColor: "#231f20",
                                  color: "#fff",
                                }}
                              >
                                <i className="fa fa-image"></i> Select Image
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
                  <div className="card card-body  border-0 rounded-1 shadow-sm p-3 ">
                    <div className="box">
                      <div className="box-header with-border">
                        <div className="left">
                          <h6 className="box-title">Files</h6>
                          <small
                            className="small-title"
                            style={{ fontSize: "10px" }}
                          >
                            Downloadable additional files (.pdf, .docx, .zip
                            etc..)
                          </small>
                        </div>
                      </div>
                      <div className="box-body">
                        <div className="form-group m-0">
                          <div className="row">
                            <div className="col-sm-12">
                              <button
                                className="btn btn-sm px-3 py-2 text-uppercase fw-semibold"
                                style={{
                                  fontSize: "10px",
                                  backgroundColor: "#231f20",
                                  color: "#fff",
                                }}
                                data-bs-toggle="modal"
                                data-bs-target="#BlogModel"
                              >
                                <i class="fa fa-file" aria-hidden="true"></i>
                                &nbsp;&nbsp;&nbsp;Select File
                              </button>
                            </div>
                            <div className="col-sm-12 post-selected-files-container">
                              <div
                                id="post_selected_files"
                                className="post-selected-files"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Category Section */}
                  <div className="card card-body  border-0 rounded-1 shadow-sm p-3 ">
                    <div className="box">
                      <div className="box-header with-border">
                        <div className="left">
                          <hp className="box-title">Category</hp>
                        </div>
                      </div>
                      <div className="box-body">
                        <div className="form-group">
                          <label>Language</label>
                          <select
                            name="lang_id"
                            className="form-select"
                            autoComplete="off"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                          >
                            <option value="1" selected>
                              English
                            </option>
                            <option value="2">Arabic</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="control-label">Category</label>
                          <select
                            id="categories"
                            name="category_id"
                            className="form-select"
                            autoComplete="off"
                            required
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                          >
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
                          <select
                            id="subcategories"
                            name="subcategory_id"
                            className="form-select"
                            autoComplete="off"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",
                            }}
                          >
                            <option value="Select a category 1">
                              Select a category 1
                            </option>
                            <option value="Select a category 2">
                              Select a category 2
                            </option>
                            <option value="Select a category 3">
                              Select a category 3
                            </option>
                            <option value="Select a category 4">
                              Select a category 4
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Publish Section */}
                  <div className="card card-body  border-0 rounded- shadow-sm p-3 ">
                    <div className="box">
                      <div className="box-header with-border">
                        <div className="left">
                          <p className="box-title">Publish</p>
                        </div>
                      </div>
                      <div className="box-body">
                        <div className="form-group">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              name="scheduled_post"
                              value="1"
                              id="cb_scheduled"
                              className="custom-control-input"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                            />
                            <label
                              htmlFor="cb_scheduled"
                              className="custom-control-label"
                            >
                              Scheduled Post
                            </label>
                          </div>
                        </div>
                        <div id="date_published_content" className="form-group">
                          <div className="row">
                            <div className="col-sm-12">
                              <label>Date Published</label>
                              <div
                                className="input-group date"
                                id="datetimepicker"
                              >
                                <input
                                  type="text"
                                  className="form-control rounded-1 text-muted"
                                  name="date_published"
                                  id="input_date_published"
                                  placeholder="Date Published"
                                  style={{
                                    fontFamily: "Plus Jakarta Sans",
                                    fontSize: "12px",
                                  }}
                                />
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
    </>
  );
};
export default AddBlog;
