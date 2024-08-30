import React, { useState } from "react";

const YourComponent = () => {
  const initialState = {
    typeOfUser: "",
    userName: "",
    hostName: "",
    content: "",
    eventTopic: "",
    universityName: "",
    date: "",
    time: "",
    venue: "",
    fileUpload: [], // Empty array to start with
  };

  const [formState, setFormState] = useState(initialState);

  const addFileUploadField = () => {
    setFormState((prevState) => ({
      ...prevState,
      fileUpload: [...prevState.fileUpload, { id: prevState.fileUpload.length + 1, file: null }],
    }));
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    const updatedFileUpload = [...formState.fileUpload];
    updatedFileUpload[index].file = file;

    setFormState((prevState) => ({
      ...prevState,
      fileUpload: updatedFileUpload,
    }));
  };

  return (
    <div>
      <div className="col-xl-12 col-lg-6 col-md-6 col-sm-12">
        {/* Render existing file upload inputs */}
        {formState.fileUpload.map((fileInput, index) => (
          <div key={fileInput.id} className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
            <label style={{ color: "#231F20" }}>
              File {fileInput.id}<span className="text-danger">*</span>
            </label>
            <input
              type="file"
              name="file"
              onChange={(e) => handleFileChange(e, index)}
              className="form-control"
            />
          </div>
        ))}
        {/* Add New File Upload Button */}
        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
          <button type="button" onClick={addFileUploadField} className="btn btn-primary mt-3">
            Add File
          </button>
        </div>
      </div>
    </div>
  );
};

export default YourComponent;
