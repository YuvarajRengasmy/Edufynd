import React, { useEffect, useState } from "react";
import { RichTextEditor } from "@mantine/rte";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Autocomplete,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { getallCategory } from "../../api/settings/blogSettings";
import { getFilterCategory } from "../../api/settings/blogSettings";
import DatePicker from "react-datepicker"; // Add this line
import Sidebar from "../../compoents/sidebar";

export const AddBlog = () => {
  const initialState = {
    title: "",
    slug: "",
    summary: "",
    keyWords: "",
    tags: "",
    optionalURL: "",
    content: "",
    uploadFile:[{uploadImage: ""}],
    uploadFiles: "",
    category: "",
    schedulePost: "",
  };

  const initialStateErrors = {
    title: { required: false },
    slug: { required: false },
    summary: { required: false },
    keyWords: { required: false },
    tags: { required: false },
    optionalURL: { required: false },
    content: { required: false },
    uploadImage: { required: false },
    uploadFiles: { required: false },
    category: { required: false },
    schedulePost: { required: false },
  };

  const [blog, setBlog] = useState(initialState);
  const [errors, setErrors] = useState(initialStateErrors);
  const [submitted, setSubmitted] = useState(false);
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const pageSize = 10;
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState('');


  const [isScheduled, setIsScheduled] = useState(false);
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  const handleValidation = (data) => {
    let error = { ...initialStateErrors };
    if (data.title === "") {
      error.title.required = true;
    }
    if (data.slug === "") {
      error.slug.required = true;
    }
    if (data.summary === "") {
      error.summary.required = true;
    }
    if (data.keyWords === "") {
      error.keyWords.required = true;
    }
    if (data.tags === "") {
      error.tags.required = true;
    }
    if (data.optionalURL === "") {
      error.optionalURL.required = true;
    }
    if (data.content === "") {
      error.content.required = true;
    }
    if (data.uploadImage === "") {
      error.uploadImage.required = true;
    }
    if (data.uploadFiles === "") {
      error.uploadFiles.required = true;
    }
    if (data.category === "") {
      error.category.required = true;
    }
    if (data.schedulePost === "") {
      error.schedulePost.required = true;
    }
    return error;
  };
  useEffect(() => {
    getAllCategoryDetails();
  }, [pagination.from, pagination.to]);

  const getAllCategoryDetails = () => {
    const data = {
      limit: pageSize,
      page: pagination.from,
    };
    getFilterCategory(data)
      .then((res) => {
        setCategory(res?.data?.result?.dropDownList || []);
        setPagination({
          ...pagination,
          count: res?.data?.result?.dropDownCount || 0,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddImage = () => {
    setBlog([...blog, null]);
};

  
const convertToBase65 = (e, name, index, listName) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const updatedList = [...blog[listName]];
    updatedList[index][name] = reader.result;
    setBlog({ ...blog, [listName]: updatedList });
  };
  reader.onerror = (error) => {
    console.log("Error: ", error);
  };
};

const handleListInputChange = (e, index, listName) => {
  const { name, value, files } = e.target;
  const updatedList = [...blog[listName]];

  if (files && files[0]) {
    convertToBase65(e, name, index, listName);
  } else {
    updatedList[index][name] = value;
    setBlog({ ...blog, [listName]: updatedList });
  }
};







const addEntry = (listName) => {
  const newEntry = listName === "uploadFile"
    ? { uploadImage: "",name:""}
    : null;
  setBlog({ ...blog, [listName]: [...blog[listName], newEntry] });
};

const removeEntry = (index, listName) => {
  const updatedList = blog[listName].filter((_, i) => i !== index);
  setBlog({ ...blog, [listName]: updatedList });
};
 
  const convertToBase64 = (e, name) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBlog((prevUniversity) => ({
        ...prevUniversity,
        [name]: reader.result,
      }));
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        if (input.trim() !== '') {
            setTags([...tags, input.trim()]);
            setInput('');
        }
    }
};

const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
};
  const handleInputs = (event) => {
    const { name, value, files } = event.target;
    if (files && files[0]) {
      convertToBase64(event, name);
    } else {
      setBlog((prevUniversity) => ({
        ...prevUniversity,
        [name]: value,
      }));
    }

    if (submitted) {
      const newError = handleValidation({ ...blog, [name]: value });
      setErrors(newError);
    }
  };

  const handleRichTextChange = (value) => {
    setBlog((prevUniversity) => ({
      ...prevUniversity,

      content: value,
    }));
  };
  const handleCheckboxChange = (e) => {
    setIsScheduled(e.target.checked);
  };

  return (
    <>
      <Sidebar />

      <div
        className="content-wrapper"
        style={{ fontFamily: "Plus Jakarta Sans", fontSize: "13px" }}
      >
        <div className="content-header">
          <div className="container">
            <form>
              <div className="row">
                <div className="col-lg-8">
                  <div className="card border-0 rounded-1 shadow-sm p-3 position-relative">
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
                        {errors.title.required && (
                          <div className="text-danger form-text">
                            This field is required.
                          </div>
                        )}
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
                          value={"crm.edufynd.in/" + blog.title}
                        />
                        {errors.slug.required && (
                          <div className="text-danger form-text">
                            This field is required.
                          </div>
                        )}
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
                        {errors.summary.required && (
                          <div className="text-danger form-text">
                            This field is required.
                          </div>
                        )}
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
                          name="keyWords"
                        />
                        {errors.keyWords.required && (
                          <div className="text-danger form-text">
                            This field is required.
                          </div>
                        )}
                      </div>

                      <div className="form-group">
            <label htmlFor="tags-input">Tags </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', border: '1px solid #ccc', padding: '5px' }}>
                {tags.map((tag, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '5px',
                            margin: '5px',
                            backgroundColor: '#e1e1e1',
                            borderRadius: '5px',
                        }}
                    >
                        <span>{tag}</span>
                        <button
                            type="button"
                            onClick={() => removeTag(index)}
                            style={{
                                marginLeft: '10px',
                                backgroundColor: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            &times;
                        </button>
                    </div>
                ))}
                <input
                    type="text"
                    id="tags-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="form-control rounded-1 text-muted"
                    style={{
                        border: 'none',
                        outline: 'none',
                        padding: '5px',
                        flexGrow: 1,
                    }}
                />
            </div>
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
                          name="optionalURL"
                        />
                        {errors.optionalURL.required && (
                          <div className="text-danger form-text">
                            This field is required.
                          </div>
                        )}
                      </div>

                      <label className="control-label control-label-content">
                        Content
                      </label>
                      <div className="col-xl-12 col-lg-12 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label style={{ color: "#231F20" }}>
                            Admission Requirements{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <RichTextEditor
                            placeholder="Start writing your content here..."
                            name="admissionRequirement"
                            // onChange={handleRichTextChange}
                            // value={university.admissionRequirement}
                            type="text"
                            style={{
                              fontFamily: "Plus Jakarta Sans",
                              fontSize: "12px",

                              zIndex: "0",
                            }}
                          />
                          {errors.content.required && (
                            <div className="text-danger form-text">
                              This field is required.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="card card-body border-0 rounded-1 shadow-sm p-3">
                    <div className="container">
                      <h6 className="box-title">Image
                     
                      </h6>
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
                              ></div>
                              <input
                                type="hidden"
                                name="post_image_id"
                                id="post_image_id"
                              />
                            </div>
                          </div>
                          <div className="row m-b-5">
                           <small className="small-title" style={{ fontSize: "10px" }}> Main banner image </small>
                        
                           {/* <div className="col-xl-12 col-lg-6 col-md-6 col-sm-12">
                        <CKEditor
  editor={ClassicEditor}
  data={notification.content}  // Use 'data' instead of 'value'
  config={{
    placeholder: 'Start writing your content here...',
    toolbar: [ 'heading', '|', 'bold', 'italic', 'link' ]  // Adjust toolbar as needed
  }}
  onChange={(event, editor) => {
    const data = editor.getData();
    console.log({ data });
    handleRichTextChange(data);  // Call your handler here
  }}
  style={{
    fontFamily: "Plus Jakarta Sans",
    fontSize: "12px",
    zIndex: '0'
  }}
/>
                       
                        </div> */}
                        
                        {blog.uploadFile.map((uploadImage, index) => (
  <div key={index} className="mb-3">
    <div className="row gy-2 ">
   
    <div className="col-xl-12 col-lg-6 col-md-6 col-sm-12">
    <label style={{ color: "#231F20" }}>File Document</label>
    <input
      type="file"
      name="uploadImage"
      value={uploadImage.uploadImage}
      onChange={(e) => handleListInputChange(e, index, "uploadImage")}
      className="form-control rounded-1 "
      style={{ fontSize: "12px" }}
      placeholder="Upload File"
    />
    </div>
   
    </div>
    <button
      type="button"
      onClick={() => removeEntry(index, "uploadFile")}
      className="btn mt-2"
    >
      <i className="far fa-trash-alt text-danger me-1"></i>
    </button>
  </div>
))}

<button
  type="button"
  onClick={() => addEntry("uploadFile")}
className="btn text-white mt-2 col-sm-6"
  style={{ backgroundColor: "#7267ef" }}
>
  <i className="fas fa-plus-circle"></i>&nbsp;&nbsp;Add
</button>
                           
                            
                        
                   
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Files Section */}
                  <div className="card card-body border-0 rounded-1 shadow-sm p-3">
                    <div className="box">
                      <div className="box-header with-border">
                        <div className="left">
                          <h6 className="box-title">Files</h6>
                          <small
                            className="small-title"
                            style={{ fontSize: "10px" }}
                          >
                            Downloadable additional files (.pdf, .docx, .zip
                            etc.)
                          </small>
                        </div>
                      </div>
                      <div className="box-body">
                        <div className="form-group m-0">
                          <div className="row">
                            <div className="col-sm-12 m-b-5">
                              <input
                                type="file"
                                className="form-control rounded-1 text-muted"
                                name="file"
                                id="file"
                                placeholder="Add File"
                                style={{
                                  fontFamily: "Plus Jakarta Sans",
                                  fontSize: "12px",
                                }}
                              />
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
                  <div className="card card-body border-0 rounded-1 shadow-sm p-3">
                    <div className="box">
                      <div className="box-header with-border">
                        <div className="left">
                          <h6 className="box-title">Category</h6>
                        </div>
                      </div>
                      <div className="box-body">
                        <div className="form-group">
                          <label htmlFor="category">Category</label>
                          <select
                            id="category"
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
                            {category.map((category) => (
                              <option
                                key={category.id}
                                value={category.categoryName}
                              >
                                {category.categoryName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Publish Section */}
                  <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="schedulePost"
                          checked={isScheduled}
                          onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label" htmlFor="schedulePost">
                          Schedule Post
                        </label>
                      </div>

                      {isScheduled && (
                        <div className="form-group mt-3">
                          <label htmlFor="schedulePost">Schedule Date</label>
                          <DatePicker
                            selected={blog.schedulePost}
                            onChange={(date) => setBlog((prevBlog) => ({
                              ...prevBlog,
                              schedulePost: date,
                            }))}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            className="form-control rounded-1 text-muted"
                          />
                          {errors.schedulePost.required && (
                            <div className="text-danger form-text">
                              This field is required.
                            </div>
                          )}
                        </div>
                      )}
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
