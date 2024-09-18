import Sidebar from "../../compoents/sidebar";
import { Link } from "react-router-dom";
import BackButton from "../../compoents/backButton";
export const ViewTestimonials = () => {
  return (
    <>
      <div>
        <Sidebar />
        <div
          className="content-wrapper "
          style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
        >
          <div className="content-header ">
            <BackButton />
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb justify-content-end">
                <li className="breadcrumb-item">
                  <Link
                    to="/DashBoard"
                    target="_self"
                    className="text-decoration-none"
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <Link
                    to="/list_testimonials"
                    className="text-decoration-none"
                  >
                    ListTestimonials
                  </Link>
                </li>
                {/* if edit is clicked the page should go to the edit page of that particular uiversity */}
                <li className="breadcrumb-item">
                  <Link
                    to={{
                      pathname: "/edit_Testimonials",
                    }}
                    className="text-decoration-none"
                  >
                    EditTestimonials
                  </Link>
                </li>
              </ol>
            </nav>
            <div className="container-fluid">
              <div className="card  border-0 rounded-0 shadow-sm p-3 position-relative">
                <div
                  className="card-header mt-3 border-0 rounded-end-pill position-absolute top-0 start-0"
                  style={{ background: "#fe5722", color: "#fff" }}
                >
                  <h5 className="text-center text-capitalize p-1">
                    View Testimonials Details
                  </h5>
                </div>
                <div className="card-body">
                  <table
                    className="table table-hover table-bordered table-striped-columns mt-5"
                    style={{
                      fontFamily: "Plus Jakarta Sans",
                      fontSize: "14px",
                    }}
                  >
                    <tbody>
                      <tr>
                        <th>Name</th>
                        <td>John Doe</td>
                      </tr>
                      <tr>
                        <th>Course/University</th>
                        <td>Computer Science / MIT</td>
                      </tr>
                      <tr>
                        <th>Location</th>
                        <td>Room 101, Main Building</td>
                      </tr>
                      <tr>
                        <th>Content</th>
                        <td>
                          This training session will cover advanced React
                          techniques, including hooks, context API, and
                          performance optimization.
                        </td>
                      </tr>
                      <tr>
                        <th>Image</th>
                        <td>
                          <img
                            src="path/to/image.jpg"
                            alt="Training"
                            style={{ width: "100px", height: "auto" }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>Counsellor Name</th>
                        <td>Jane Smith</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="container-fluid my-2">
              <div className="row ">
                <div className="col-12 col-lg-7 col-auto">
                  <ul className="list-unstyled">
                    <li className="mb-4 position-relative">
                      <div className="row align-items-start g-0">
                        <div className="col-1 d-flex justify-content-center align-items-center">
                          <div
                            className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center"
                            style={{ width: "2rem", height: "2rem" }}
                          >
                            <i className="fas fa-check" />
                          </div>
                        </div>
                        <div className="col-4 text-center">
                          <p className="mb-1 fw-semibold text-muted">
                            23 August, 2023 10:30 AM
                          </p>
                          <p className="mb-0 text-muted">
                            Changed by:<strong>John Doe</strong>
                          </p>
                        </div>
                        <div className="col-7">
                          <div className="mb-3">
                            <div className="bg-success text-white rounded-3 p-2">
                              <h6 className="mb-1">New University Name</h6>
                              <p className="mb-0">University Y</p>
                            </div>
                          </div>
                          <div className="mb-3">
                            <div className="bg-danger text-white rounded-3 p-2">
                              <h6 className="mb-1">Old University Name</h6>
                              <p className="mb-0">University X</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="position-absolute top-0 start-0 translate-middle-x"
                        style={{
                          width: 2,
                          height: "100%",
                          backgroundColor: "#007bff",
                        }}
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewTestimonials;
