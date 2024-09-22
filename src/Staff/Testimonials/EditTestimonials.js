import Sidebar from "../../compoents/StaffSidebar";
import { Link } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export const EditTestimonials = () => {
  return (
    <>
      <div>
        <Sidebar />
        <div
          className="content-wrapper "
          style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
        >
          <div className="content-header ">
            <div className="content container-fluid ">
              <form>
                <div className="row">
                  <div className="col-xl-12 ">
                    <div className="card  border-0 rounded-1 shadow-sm p-3 position-relative">
                      <div
                        className="card-header mt-3 border-0 rounded-0 position-absolute top-0 start-0"
                        style={{ background: "#fe5722", color: "#fff" }}
                      >
                        <h5 className="text-center text-capitalize p-1">
                          {" "}
                          Edit Testimonials Details
                        </h5>
                      </div>
                      <div className="card-body mt-5">
                        <div className="row g-3">
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              UserName <span className="text-danger">*</span>
                            </label>
                            <select
                              class="form-select form-select-lg rounded-1 text-capitalize"
                              aria-label="Default select example"
                            >
                              <option selected>Select Staff</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Type Of Users
                              <span className="text-danger">*</span>
                            </label>
                            <select
                              type="text"
                              className="form-select form-select-lg rounded-1  "
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              placeholder="Enter Name"
                              name="Username"
                            >
                              <option selected>Select User</option>
                              <option value="staff">Staff</option>
                              <option value="student">Student</option>
                              <option value="agent">Agent</option>
                              <option value="admin">Admin</option>
                            </select>
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Course/University
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control rounded-1 text-capitalize  "
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              placeholder="Example  UG/Coventry"
                              name="Username"
                              onKeyDown={(e) => {
                                if (/[^a-zA-Z\s]/.test(e.key)) {
                                  e.preventDefault();
                                }
                              }}
                            />
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Location<span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control rounded-1 text-capitalize"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              placeholder="Enter  Location"
                              name="Username"
                              onKeyDown={(e) => {
                                if (/[^a-zA-Z\s]/.test(e.key)) {
                                  e.preventDefault();
                                }
                              }}
                            />
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Image<span className="text-danger">*</span>
                            </label>
                            <input
                              type="file"
                              className="form-control tounded-1 text-capitalize "
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              placeholder="Enter  Image upload"
                              name="Username"
                            />
                            <div className="text-end">
                              <button className="btn btn-dark px-4 py-2 text-uppercase fw-semibold rounded-1 border-0">
                                <i
                                  class="fa fa-plus-circle"
                                  aria-hidden="true"
                                ></i>{" "}
                                &nbsp;&nbsp;Add
                              </button>
                            </div>
                          </div>
                          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Counsellor Name{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control rounded-1 text-capitalize"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              placeholder="Enter   Counsellor Name "
                              name="Username"
                              onKeyDown={(e) => {
                                if (/[^a-zA-Z\s]/.test(e.key)) {
                                  e.preventDefault();
                                }
                              }}
                            />
                          </div>
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <label style={{ color: "#231F20" }}>
                              Content<span className="text-danger">*</span>
                            </label>
                            <CKEditor
                              editor={ClassicEditor}
                              config={{
                                placeholder:
                                  "Start writing your content here...",
                                toolbar: [
                                  "heading",
                                  "|",
                                  "bold",
                                  "italic",
                                  "link",
                                  "bulletedList",
                                  "numberedList",
                                  "blockQuote",
                                  "|",
                                  "insertTable",
                                  "mediaEmbed",
                                  "imageUpload",
                                  "|",
                                  "undo",
                                  "redo",
                                ],
                                image: {
                                  toolbar: [
                                    "imageTextAlternative",
                                    "imageStyle:full",
                                    "imageStyle:side",
                                  ],
                                },
                                table: {
                                  contentToolbar: [
                                    "tableColumn",
                                    "tableRow",
                                    "mergeTableCells",
                                  ],
                                },
                              }}
                              name="content"
                              style={{
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                                zIndex: "0",
                              }}
                            />
                          </div>
                          <div className=" d-flex justify-content-end  ">
                            <Link
                              to="/staff_list_testimonials"
                              style={{
                                fontSize: "12px",
                              }}
                              className="btn rounded-1 btn-dark border-0 fw-semibold text-uppercase text-white px-4 py-2  m-1"
                            >
                              Cancel
                            </Link>
                            <button
                              style={{
                                backgroundColor: "#FE5722",
                                fontFamily: "Plus Jakarta Sans",
                                fontSize: "12px",
                              }}
                              type="submit"
                              className="btn rounded-1 btn-save border-0 fw-semibold text-uppercase text-white px-4 py-2 m-1"
                            >
                              Update
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
    </>
  );
};
export default EditTestimonials;
