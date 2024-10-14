import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../../compoents/sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import { updateApplication, statusApplication, getSingleApplication } from "../../api/applicatin";
import { toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { formatDate } from "../../Utils/DateFormat";
import BackButton from "../../compoents/backButton";

export const ViewApplication = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const modalRef = useRef(null);

  const initialState = {
    statusName: "",
    commentBox: "",
    reply: [],
    uploadFile: [{ fileName: "", uploadImage: "" }],
  };

  const initialStateErrors = {
    reply: { required: false },
    uploadFile: { required: false },
  };

  const [track, setTrack] = useState(initialState);
  const [tracks, setTracks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [statuses, setStatuses] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [trackErrors, setTrackErrors] = useState(initialStateErrors);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    if (id) {
      getApplicationDetails();
      getAgentList();
    }
  }, [id]);

  const handleRichTextChanges = (data) => {
    setTrack((prevTrack) => ({ ...prevTrack, reply: data }));
  };

  const convertToBase64 = (e, name, index) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const updatedList = [...track.uploadFile];
      updatedList[index][name] = reader.result;
      setTrack({ ...track, uploadFile: updatedList });
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  const handleListInputChange = (e, index) => {
    const { name, value, files } = e.target;
    const updatedList = [...track.uploadFile];
    if (files && files[0]) {
      convertToBase64(e, "uploadImage", index);
    } else {
      updatedList[index][name] = value;
      setTrack({ ...track, uploadFile: updatedList });
    }
  };

  const addEntry = () => {
    setTrack({ ...track, uploadFile: [...track.uploadFile, { fileName: "", uploadImage: "" }] });
  };

  const removeEntry = (index) => {
    const updatedList = track.uploadFile.filter((_, i) => i !== index);
    setTrack({ ...track, uploadFile: updatedList });
  };

  const getApplicationDetails = () => {
    getSingleApplication(id)
      .then((res) => {
        setTracks(res?.data?.result || []);
        setStatuses(res?.data?.result?.status || []);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getAgentList = () => {
    getSingleApplication(id)
      .then((res) => {
        setTracks(res?.data?.result || []);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleTrackSubmit = (event) => {
    event.preventDefault();

    // Here you could add any validation you require
    if (!track.reply) {
      setTrackErrors((prev) => ({ ...prev, reply: { required: true } }));
      return;
    }

    const data = {
      _id: id,
      uploadFile: track.uploadFile,
      reply: track.reply,
    };

    statusApplication(data)
      .then((res) => {
        toast.success("Successfully updated application status");
        getAgentList();
        handleClose();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Failed to update status");
      });
  };

  return (
    <>
      <Sidebar />
      <div className="content-wrapper" style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}>
        <div className="content-header text-end">
          <BackButton />
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12">
              <div className="container-fluid">
                <div className="row">
                  <div className="container-fluid my-2">
                    <div className="row flex-nowrap">
                      <div className="col-md-8 col-sm-8">
                        <div className="card border-0 rounded-1 shadow-sm vh-100 min-vh-100 overflow-auto">
                          <div className="card-header bg-white sticky-top">
                            <h6 className="card-title">Application Track</h6>
                          </div>
                          <div className="card-body">
                            <div className="chat-messages">
                              <div className="container-fluid">
                                <div className="row">
                                  {tracks?.status && tracks.status.map((item, index) => (
                                    <div key={index} className="d-flex justify-content-end mb-4">
                                      <div className="profile-content">
                                        <img
                                          src={tracks?.photo || "https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"}
                                          className="card-img-top rounded-circle border-0"
                                          alt="Profile"
                                          style={{ width: "4.5rem", height: "4.5rem" }}
                                        />
                                      </div>
                                      <div className="col-10">
                                        <div className="card">
                                          <div className="card-header text-bg-danger">
                                            <p className="mb-0">Application Decision: {item?.statusName}</p>
                                            <div className="d-flex gap-2">
                                              <p className="mb-0">{formatDate(item?.createdOn)}</p>
                                              <button
                                                className="btn btn-sm btn-link text-white fw-semibold px-3 py-1 text-center rounded-1"
                                                data-bs-toggle="modal"
                                                data-bs-target="#StatusModal35"
                                                onClick={handleShow}
                                              >
                                                <i className="fa fa-reply" aria-hidden="true"></i>
                                              </button>
                                            </div>
                                          </div>
                                          <div className="card-body">
                                            <CKEditor
                                              editor={ClassicEditor}
                                              data={item?.commentBox}
                                              disabled={true}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal for Reply and File Upload */}
        <div className="modal fade" id="StatusModal35" tabIndex="-1" aria-labelledby="staticBackdropLabel21" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel21">Reply Message</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleTrackSubmit}>
                  <div className="form-group mb-3">
                    <label htmlFor="subject">Subject</label>
                    <CKEditor
                      editor={ClassicEditor}
                      value={track.reply}
                      config={{
                        placeholder: "Start writing your content here...",
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
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        handleRichTextChanges(data);
                      }}
                      name="reply"
                    />
                  </div>

                  {track.uploadFile.map((uploadImage, index) => (
                    <div key={index} className="mb-3">
                      <div className="d-flex gy-2">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>File Name</label>
                          <input
                            type="text"
                            name="fileName"
                            value={uploadImage.fileName}
                            onChange={(e) => handleListInputChange(e, index)}
                            className="form-control rounded-1"
                            placeholder="File Upload Title"
                          />
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                          <label style={{ color: "#231F20" }}>File Document</label>
                          <input
                            type="file"
                            name="uploadImage"
                            onChange={(e) => handleListInputChange(e, index)}
                            className="form-control rounded-1"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeEntry(index)}
                        className="btn mt-2"
                      >
                        <i className="far fa-trash-alt text-danger me-1"></i>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addEntry}
                    className="btn text-white mt-2 col-sm-6"
                  >
                    Add File Upload
                  </button>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default  ViewApplication;