import React, { useEffect, useState,useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import { getSuperAdminForSearch } from "../../api/superAdmin";
import { formatDate } from "../../Utils/DateFormat";
import { FaFacebook } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import {getSingleBlog,getFilterBlog} from "../../api/blog";
import { RichTextEditor } from "@mantine/rte";
import { Link, useLocation } from "react-router-dom";
import Mastersidebar from "../../compoents/sidebar";
export const Blogdetailing = () => {

  const renderedCategories = new Set();

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [blog, setBlog] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const [link, setLink] = useState("");
  const [data, setData] = useState(false);
  const search = useRef(null);
  const pageSize = 3;

  var searchValue = location.state;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });
  useEffect(() => {
    if (search.current) {
      search.current.focus();
    }
  }, []);

  useEffect(() => {
    if (searchValue) {
      search.current.value = searchValue.substring(1);
      handleSearch();
    }
  }, [searchValue]);
  const handleInputsearch = (event) => {
    if (event.key === "Enter") {
      search.current.blur();
      handleSearch();
    }
  };

  const handleSearch = (event) => {
    const data = search.current.value;
    event?.preventDefault();
    getSuperAdminForSearch(data)
      .then((res) => {
        const blogList = res?.data?.result?.blogList;
        setBlogs(blogList);
        const result = blogList.length ? "blog" : "";
        setLink(result);
        setData(result === "" ? true : false);
      })
      .catch((err) => console.log(err));
  };
  const handlePageChange = (event, page) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({ ...pagination, from: from, to: to });
  };
  useEffect(() => {
    getblogDetails();
    getAllUniversityDetails();
  }, [pagination.from, pagination.to]);
  const getAllUniversityDetails = () => {
    const data = {
      limit: 3,
      page: pagination.from,
    };
    getFilterBlog(data)
      .then((res) => {
        console.log(res?.data?.result?.blogList);
        setBlogs(res?.data?.result?.blogList);
        setPagination({
          ...pagination,
          count: res?.data?.result?.blogCount,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };


 
  const getblogDetails = () => {
    getSingleBlog(id)
      .then((res) => {
        setBlog(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
     

      <Mastersidebar/>
      <div className="content-wrapper">
      <div className="container my-5">
        <div className="row">
        
          <div className="col-md-7 col-12 mb-4">
          <h4
                  className="card-title fs-3 fw-bold"
                  style={{ color: "#0f2239" }}
                >
                  {blog?.title}
                </h4>
            <div className="card rounded-2 border-0 shadow p-3 h-100">
            {Array.isArray(blog?.uploadFile) && blog.uploadFile.length > 0 && (
    <div id="carouselExample" className="carousel slide">
      <div className="carousel-inner">
        {blog.uploadFile.map((data, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <img
              src={data?.uploadImage}
              className="d-block w-100"
              style={{ borderRadius: "10px" }}
              alt={`blog-image-${index}`}
            />
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon btn btn-dark" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next "
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon btn btn-dark " aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  )}
              <div className="card-body">
              
              <p
                                  className="clearfix"
                                  style={{ textAlign: "justify" }}
                                >
                                  <RichTextEditor
                                    value={blog?.content}
                                    readOnly
                                  />{" "}
                                </p>
                <hr />
                <div className="row">
                  <div className="col-lg-6 col-12 mb-3 mb-lg-0">
                 
                    <div className="d-flex flex-row align-items-center gap-3">
                      <h6 className="fw-bold h5">Tags:</h6>
                      {Array.isArray(blog?.tags) &&
                                    blog.tags.map((data, index) => (
                      <a
                      key={index} 
                        href="#"
                        className="text-decoration-none text-dark bg-light p-2 rounded-2"
                      >
                        {data}
                      </a>
                        ))}
                    </div>
               
                  </div>
                  <div className="col-lg-6 col-12">
                    <div className="d-flex flex-row align-items-center gap-2">
                      <h6 className="fw-bold h5">Share:</h6>
                      <div className="mb-3 mt-2">
                        <a href="https://www.facebook.com/edufynd/">
                          <span className="one text-white rounded-circle ps-2 pb-2 pt-1 pe-2 fs-6">
                            <FaFacebook />
                          </span>
                        </a>
                      </div>
                      <div className="mb-3 mt-2">
                        <a href="https://www.linkedin.com/company/edufynd">
                          <span className="one text-white rounded-circle ps-2 pb-2 pt-1 pe-2 fs-6">
                            <FaLinkedinIn />
                          </span>
                        </a>
                      </div>
                      <div className="mb-3 mt-2">
                        <a href="https://www.instagram.com/edufynd/">
                          <span className="one text-white rounded-circle ps-2 pb-2 pt-1 pe-2 fs-6">
                            <FaInstagram />
                          </span>
                        </a>
                      </div>
                      <div className="mb-3 mt-2">
                        <a href="www.youtube.com/@EduFynd">
                          <span className="one text-white rounded-circle ps-2 pb-2 pt-1 pe-2 fs-6">
                            <FaYoutube />
                          </span>
                        </a>
                      </div>
                      <div className="mb-3 mt-2">
                        <a href="https://x.com/edufynd">
                          <span className="one text-white rounded-circle ps-2 pb-2 pt-1 pe-2 fs-6">
                            <FaTwitter />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5 col-12">
            <div className="card card-body rounded-2 border-0 shadow mb-4">
            <form onSubmit={handleSearch}>
              <div className="input-group p-4">
                <input
                  type="text"
                  ref={search}
                  onChange={handleInputsearch}
                  className="form-control form-control-lg"
                  style={{ fontSize: "15px" }}
                  placeholder="Search Product..."
                  aria-label="Search"
                />
                <button
                 
                   type="submit"
                  className="input-group-text btn btn-lg"
                  style={{ backgroundColor: "#fe5722", color: "#fff" }}
                >
                  <FaSearch />
                </button>
              </div>
              </form>
            </div>
           
            <div className="card card-body rounded-2 border-0 shadow mb-4">
              <h4 className="fw-bold" style={{ color: "#0f2239" }}>
                Recent Posts
              </h4>
              <hr className="border-4 border-warning rounded-2" />
              {blogs?.map((item,index) => (
              <div key={index} className="card rounded-2 border-0 mb-3">
                <div className="row g-0">
                  <div className="col-4">
                    <img
                      src={item?.uploadFiles}
                      className="img-fluid rounded-3 mx-auto d-block"
                      alt="Recent post 1"
                    />
                  </div>
                  <div className="col-8">
                    <div className="card-body">
                      <h6 className="card-title">
                      <Link
                                className="text-decoration-none text-dark"
                                to={{
                                  pathname: "/Blog-Details",
                                  search: `?id=${item?._id}`,
                                }}
                              >
                                {item?.title}
                               
                              </Link>
                       
                      </h6>
                      <p className="card-text">
                        <small className="text-body-secondary">
                          <span
                            className="align-self-center"
                            style={{ color: "#fe5722" }}
                          >
                            <FaCalendar />
                          </span>{" "}
                          {formatDate(item.createdOn)}
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              ))}
            </div>
           
            <div  className="card card-body rounded-2 border-0 shadow">
              <h4 className="fw-bold" style={{ color: "#0f2239" }}>
                Popular category
              </h4>
              <hr className="border-4 border-warning rounded-2" />
              {blogs?.map((item, index) => {
  if (renderedCategories.has(item?.category)) {
    return null; // Skip this iteration if the category is already rendered
  }
  
  renderedCategories.add(item?.category);
  
  return (
    <div className="row flex-wrap gap-2">
      <a
       key={index}
        href="#"
        className="text-decoration-none text-dark bg-light p-2 rounded-2"
      >
        {item?.category}
      </a>
    </div>
  );
})}




            </div>
           
          </div>
        </div>
      </div>
      </div>

     
    </div>
  );
};
export default Blogdetailing;
