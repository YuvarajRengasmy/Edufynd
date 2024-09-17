import { useEffect, useState, useRef } from "react";
import { getSingleSuperAdmin } from "../../api/superAdmin";
import { getSuperAdminId } from "../../Utils/storage";
// import { getStaffId} from "../../Utils/storage";
import { timeCall } from "../../Utils/DateFormat";

import { getallStaff } from "../../api/staff";
import { postChat, getMessages } from "../../api/chat";

import {
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBTypography,
  MDBCardFooter,
} from "mdb-react-ui-kit";
import { BsThreeDotsVertical } from "react-icons/bs";
import io from "socket.io-client";
import Sidebar from "../../compoents/AgentSidebar";

const ListChat = () => {
  const [showChatlist, setShowChatlist] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [superAdmin, setSuperAdmin] = useState(null);
  const [staff, setStaff] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [superAdminMessage, setsuperAdminMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [socketmessage, setSocketMessage] = useState("");
  const [connectedsuperAdmins, setConnectedsuperAdmins] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    const newSocket = io("https://api.edufynd.in");
    setSocket(newSocket);

    newSocket.on("socketId", (id) => {});

    newSocket.on("newMessage", (newMessage) => {
      if (
        (newMessage.senderType === "staff" ||
          newMessage.senderType === "superAdmin") &&
        ((newMessage.superAdminId &&
          newMessage.superAdminId === superAdmin._id) ||
          newMessage.superAdminId._id === superAdmin._id) &&
        ((newMessage.staffId && newMessage.staffId === selectedStaff?._id) ||
          newMessage.staffId._id === selectedStaff?._id)
      ) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } else {
        setsuperAdminMessage([]);
      }
    });
    newSocket.on("get-superAdmin", (superadmins) => {
      setConnectedsuperAdmins(superadmins);
    });

    newSocket.emit("new-superAdmin-add", getSuperAdminId());

    return () => {
      newSocket.disconnect();
    };
  }, [selectedStaff, superAdmin]);
  const issuperAdminOnline = (superAdminId) => {
    return connectedsuperAdmins.some(
      (superAdmin) =>
        superAdmin.superAdminId === superAdminId && superAdmin.online
    );
  };

  useEffect(() => {});
  useEffect(() => {
    getsuperAdminDetails();

    getDoctors();
  }, [searchQuery]);

  const getsuperAdminDetails = () => {
    const id = getSuperAdminId();
    getSingleSuperAdmin(id)
      .then((res) => {
        setSuperAdmin(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDoctors = () => {
    getallStaff()
      .then((res) => {
        const staffData = res?.data?.result || [];
        if (searchQuery) {
          const filteredstaff = staffData.filter((staff) =>
            staff.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setStaff(filteredstaff);
        } else {
          const staffWithStatuses = staffData.map((staff) => ({
            ...staff,
            isActive: staff.someLogicToDetermineActiveStatus,
          }));
          setStaff(staffWithStatuses);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (!selectedStaff) {
      return;
    }

    const newMessage = {
      text: inputMessage,
      sender: superAdmin.name,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      sentBy: "superAdmin",
    };

    postChatMessage(selectedStaff._id, newMessage);
    setInputMessage("");
  };

  const postChatMessage = (staffId, message) => {
    const superAdmin = getSuperAdminId();
    const data = {
      staffId: staffId,
      superAdminId: superAdmin,
      message: message.text,
      senderType: message.sender,
    };

    postChat(data)
      .then((res) => {
        const superAdminMessage = res.data.result;
        setsuperAdminMessage(superAdminMessage);
        const list = {
          _id: superAdmin._id,
          name: superAdmin.name,
          profileImage: superAdmin.profileImage,
        };
        const socketdata = {
          staffId: selectedStaff._id,
          superAdmin: list,
          senderType: "superAdmin",
          message: superAdminMessage.message,
          sentOn: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
        };
        const socketdata1 = {
          staffId: selectedStaff._id,
          superAdmin: list,
          senderType: "superAdmin",
          message: socketdata,
          sentOn: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
        };
        setSocketMessage(socketdata1);
        socket.emit("sendMessage", socketdata1);
      })
      .catch((err) => {
        console.error("Error sending chat message:", err);
      });
  };

  useEffect(() => {
    getMessage();
  }, [selectedStaff]);

  const getMessage = () => {
    if (selectedStaff && selectedStaff._id) {
      setLoadingMessages(true);

      getMessages()
        .then((res) => {
          if (Array.isArray(res.data.result)) {
            const filteredMessages = res.data.result.filter(
              (message) =>
                (message.senderType === "staff" ||
                  message.senderType === "superAdmin") &&
                message.superAdminId &&
                message.superAdminId._id === superAdmin._id &&
                message.staffId &&
                message.staffId._id === selectedStaff._id
            );

            setMessages(filteredMessages);
          } else {
            console.error("Invalid message data:", res.data);
          }
        })
        .catch((err) => {
          console.error("Error fetching chat messages:", err);
        })
        .finally(() => {
          setLoadingMessages(false);
        });
    }
  };

  const handleDoctorSelect = (staff) => {
    setSelectedStaff(staff);
    setShowChatlist(false);
    setShowChat(true);
  };

  return (
    <>
      <Sidebar />
      <div
        className="content-wrapper"
        style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
      >
       
      



       

          {/* <div className="container-fluid my-4">
            <div className="row">
            
              <div className="col-md-4 col-lg-4">
                <div className="card border-0">
                  <div className="card-body">
                    <input
                      className="form-control form-control-sm mb-3"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      type="text"
                      placeholder="Search for people, groups, and messages"
                      style={{ fontSize: "12px" }}
                    />
                    <ul className="nav flex-column">
                      {staff &&
                        staff.map((staff) => (
                          <li
                            className={`${
                              selectedStaff && selectedStaff._id === staff._id
                                ? "bg-dark text-white"
                                : "bg-white text-black"
                            }`}
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDoctorSelect(staff)}
                            key={staff._id}
                          >
                            <div className="border-0">
                              <div className="row g-0 align-items-center">
                                <div className="col-md-4">
                                  <div className="profile-container position-relative">
                                    <span
                                      className="position-absolute"
                                      style={{
                                        color: issuperAdminOnline(staff._id)
                                          ? "#10B118"
                                          : "transparent",
                                        top: "39px",
                                        left: "66%",
                                        height: "2rem",
                                        width: "2rem",
                                        backgroundColor: issuperAdminOnline(
                                          staff._id
                                        )
                                          ? "#231f20"
                                          : "transparent",
                                        border: issuperAdminOnline(staff._id)
                                          ? "2px solid white"
                                          : "none",
                                      }}
                                    ></span>
                                    <img
                                      src={staff.photo}
                                      alt="avatar"
                                      className="img-fluid rounded-circle mx-auto d-block"
                                      width="60"
                                      height="60"
                                      style={{
                                        border: issuperAdminOnline(staff._id)
                                          ? "3px solid #10B118"
                                          : "none",
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-8">
                                  <div className="card-body">
                                    <small className="fw-semibold mb-0">
                                      {staff.empName}
                                    </small>
                                    <span
                                      className="small fw-normal d-flex justify-content-between"
                                      style={{
                                        color: issuperAdminOnline(staff._id)
                                          ? "green"
                                          : "red",
                                      }}
                                    >
                                      {issuperAdminOnline(staff._id)
                                        ? "Online"
                                        : "Offline"}
                                      {timeCall(staff.createdOn)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>

             
              <div className="col-md-8 col-lg-8">
                <div className="card border-0 vh-100">
                  <div className="card-header bg-white d-flex justify-content-between align-items-center">
                    <div>
                      <button
                        id="message_box"
                        ref={messagesContainerRef}
                        className="btn btn-light d-md-none"
                        data-bs-bs-toggle="collapse"
                        data-bs-bs-target="#chat-sidebar"
                      >
                        <i className="fa fa-chevron-left"></i>
                      </button>
                      <h6 className="mb-0 fw-semibold text-capitalize">
                        {selectedStaff && selectedStaff.empName}
                      </h6>
                      <p className="mb-0 text-muted">
                        {selectedStaff && selectedStaff.designation}
                      </p>
                    </div>
                    <div className="float-end">
                      <button className="btn btn-outline-primary btn-sm">
                        <i className="fa fa-phone"></i>
                      </button>
                      <button className="btn btn-outline-primary btn-sm">
                        <i className="fa fa-video"></i>
                      </button>
                      <button
                        className="btn btn-outline-primary btn-sm"
                        data-bs-bs-toggle="dropdown"
                      >
                        <i className="fa fa-ellipsis-v"></i>
                      </button>
                      <div className="dropdown-menu border-0">
                        <a className="dropdown-item" href="#">
                          Archive
                        </a>
                        <a className="dropdown-item" href="#">
                          Mute
                        </a>
                        <a className="dropdown-item" href="#">
                          Clear Chat
                        </a>
                        <a className="dropdown-item" href="#">
                          Report
                        </a>
                        <a className="dropdown-item" href="#">
                          Block
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="card-body  overflow-auto p-0">
                    <div className="chat-messages p-3">
                      {loadingMessages && <p>Loading messages...</p>}
                      {!loadingMessages && messages.length > 0 ? (
                        messages.map((message, index) => (
                          <div
                            key={index}
                            className={`d-flex justify-content-${
                              message.senderType === "superAdmin"
                                ? "end"
                                : "start"
                            } mb-4`}
                          >
                            {message.senderType === "superAdmin" &&
                            message.superAdminId.profileImage ? (
                              <img
                                src={message.superAdminId.profileImage}
                                alt="avatar"
                                className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong mt-3"
                                width="30"
                                height="30"
                              />
                            ) : message.senderType === "staff" &&
                              message.staffId.photo ? (
                              <img
                                src={message.staffId.photo}
                                alt="avatar"
                                className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong mt-3"
                                width="50"
                                height="50"
                              />
                            ) : null}
                            <MDBCard
                              className="mask-custom"
                              style={{
                                backgroundColor:
                                  message.senderType === "superAdmin"
                                    ? "#EB2562"
                                    : "#1C2E46",
                                color:
                                  message.senderType === "superAdmin"
                                    ? "white"
                                    : "white",
                              }}
                            >
                              <p className="mb-0 text-white">
                                {message.sentBy === "superAdmin"
                                  ? `${superAdminMessage}`
                                  : `${message.message}`}
                              </p>

                              <p className="text-black ms-5 d-flex justify-content-end small mb-0 ms-2">
                                {message.sentOn && `${message.sentOn}`}
                              </p>
                            </MDBCard>
                          </div>
                        ))
                      ) : (
                        <p>No messages found.</p>
                      )}
                    </div>
                  </div>
                  <div className="card-footer bg-white">
                    <form className="d-flex" onSubmit={handleSendMessage}>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Type a message..."
                        value={inputMessage}
                        onChange={handleInputChange}
                        style={{ fontSize: "12px" }}
                      />
                      <button
                        type="submit"
                        o
                        className="btn btn-primary btn-sm ml-2"
                      >
                        <i className="fa fa-paper-plane"></i>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        

          <div className="container-fluid  ">
  <div className="row no-gutters">
    {/* Chat Contact List */}
    <div className="col-md-4 bg-light border-right" style={{ height: '100vh', overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: '#007bff #e9ecef' }}>
      <div className="d-flex align-items-center p-3 border-bottom bg-white">
        <img src={selectedStaff ? selectedStaff.photo : "https://via.placeholder.com/50"} className="rounded-circle me-3" alt="User Image" style={{ width: '3rem', height: '3rem' }} />
        <div>
          <h5 className="mb-0" style={{ color: '#343a40' }}>{selectedStaff ? selectedStaff.empName : "User Name"}</h5>
          <small className="text-muted">{selectedStaff && issuperAdminOnline(selectedStaff._id) ? "Online" : "Offline"}</small>
        </div>
        <div className="ms-auto">
          <div className="dropdown">
            <i className="fas fa-cog fa-lg text-muted " id="settingsDropdown" data-bs-toggle="dropdown" aria-expanded="false"></i>
            <ul className="dropdown-menu" aria-labelledby="settingsDropdown">
              <li><a className="dropdown-item" href="#">Account Settings</a></li>
              <li><a className="dropdown-item" href="#">Privacy</a></li>
              <li><a className="dropdown-item" href="#">Help</a></li>
              <li><a className="dropdown-item" href="#">Log Out</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="input-group p-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search or start new chat"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ borderRadius: '25px', borderColor: '#ced4da' ,fontSize:'12px'}}
        />
        <div className="input-group-append">
          <button className="btn btn-outline-primary" type="button" style={{ borderRadius: '25px' }}><i className="fas fa-search"></i></button>
        </div>
      </div>
      <ul className="nav nav-tabs" id="chatTab" role="tablist">
        <li className="nav-item">
          <a className="nav-link active" id="all-tab" data-bs-toggle="tab" href="#all" role="tab" aria-controls="all" aria-selected="true">All</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="unread-tab" data-bs-toggle="tab" href="#unread" role="tab" aria-controls="unread" aria-selected="false">Unread</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="groups-tab" data-bs-toggle="tab" href="#groups" role="tab" aria-controls="groups" aria-selected="false">Groups</a>
        </li>
      </ul>
      <div className="tab-content" id="chatTabContent" style={{ overflowY: 'auto', height: 'calc(100% - 160px)' }}>
        <div className="tab-pane fade show active" id="all" role="tabpanel" aria-labelledby="all-tab">
          <div className="list-group list-group-flush">
            {staff && staff.map((staff) => (
              <a
                href="#"
                className="list-group-item list-group-item-action"
                key={staff._id}
                onClick={() => handleDoctorSelect(staff)}
              >
                <div className="d-flex align-items-center">
                  <img src={staff.photo} className="rounded-circle me-3" alt="Contact Image" style={{ width: '3rem', height: '3rem' }} />
                  <div className="w-100">
                    <div className="d-flex justify-content-between">
                      <h6 className="mb-0" style={{ color: '#343a40' }}>{staff.empName}</h6>
                      <small className="text-muted">{timeCall(staff.createdOn)}</small>
                    </div>
                    <p className="mb-0 text-truncate" style={{ color: '#6c757d' }}>{issuperAdminOnline(staff._id) ? "Online" : "Offline"}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
        <div className="tab-pane fade" id="unread" role="tabpanel" aria-labelledby="unread-tab">
          <div className="list-group list-group-flush">
            <a href="#" className="list-group-item list-group-item-action" >
              <div className="d-flex align-items-center">
                <img src="https://via.placeholder.com/50" className="rounded-circle me-3" alt="Contact Image" style={{ width: '3rem', height: '3rem' }} />
                <div className="w-100">
                  <div className="d-flex justify-content-between">
                    <h6 className="mb-0" style={{ color: '#343a40' }}>John Doe</h6>
                    <small className="text-muted">2 min ago</small>
                  </div>
                  <p className="mb-0 text-truncate" style={{ color: '#6c757d' }}>You have a new message.</p>
                </div>
              </div>
            </a>
            <a href="#" className="list-group-item list-group-item-action" >
              <div className="d-flex align-items-center">
                <img src="https://via.placeholder.com/50" className="rounded-circle me-3" alt="Contact Image" style={{ width: '3rem', height: '3rem' }} />
                <div className="w-100">
                  <div className="d-flex justify-content-between">
                    <h6 className="mb-0" style={{ color: '#343a40' }}>Jane Smith</h6>
                    <small className="text-muted">15 min ago</small>
                  </div>
                  <p className="mb-0 text-truncate" style={{ color: '#6c757d' }}>Reminder: Please submit your report.</p>
                </div>
              </div>
            </a>
            <a href="#" className="list-group-item list-group-item-action" >
              <div className="d-flex align-items-center">
                <img src="https://via.placeholder.com/50" className="rounded-circle me-3" alt="Contact Image" style={{ width: '3rem', height: '3rem' }} />
                <div className="w-100">
                  <div className="d-flex justify-content-between">
                    <h6 className="mb-0" style={{ color: '#343a40' }}>Michael Brown</h6>
                    <small className="text-muted">30 min ago</small>
                  </div>
                  <p className="mb-0 text-truncate" style={{ color: '#6c757d' }}>New task assigned: Update project status.</p>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className="tab-pane fade" id="groups" role="tabpanel" aria-labelledby="groups-tab">
          <div className="list-group list-group-flush">
            <a href="#" className="list-group-item list-group-item-action" >
              <div className="d-flex align-items-center">
                <img src="https://via.placeholder.com/50" className="rounded-circle me-3" alt="Group Image" style={{ width: '3rem', height: '3rem' }} />
                <div className="w-100">
                  <div className="d-flex justify-content-between">
                    <h6 className="mb-0" style={{ color: '#343a40' }}>Project Team A</h6>
                    <small className="text-muted">5 new messages</small>
                  </div>
                  <p className="mb-0 text-truncate" style={{ color: '#6c757d' }}>Discussing upcoming project milestones.</p>
                </div>
              </div>
            </a>
            <a href="#" className="list-group-item list-group-item-action" >
              <div className="d-flex align-items-center">
                <img src="https://via.placeholder.com/50" className="rounded-circle me-3" alt="Group Image" style={{ width: '3rem', height: '3rem' }} />
                <div className="w-100">
                  <div className="d-flex justify-content-between">
                    <h6 className="mb-0" style={{ color: '#343a40' }}>Marketing Strategy</h6>
                    <small className="text-muted">12 new messages</small>
                  </div>
                  <p className="mb-0 text-truncate" style={{ color: '#6c757d' }}>Reviewing marketing strategies for Q4.</p>
                </div>
              </div>
            </a>
            <a href="#" className="list-group-item list-group-item-action" >
              <div className="d-flex align-items-center">
                <img src="https://via.placeholder.com/50" className="rounded-circle me-3" alt="Group Image" style={{ width: '3rem', height: '3rem' }} />
                <div className="w-100">
                  <div className="d-flex justify-content-between">
                    <h6 className="mb-0" style={{ color: '#343a40' }}>Product Development</h6>
                    <small className="text-muted">8 new messages</small>
                  </div>
                  <p className="mb-0 text-truncate" style={{ color: '#6c757d' }}>Updates on the new product features.</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

    {/* Chat Content */}
    <div className="col-md-8 d-flex flex-column" style={{ height: '100vh', overflow: 'auto', scrollbarWidth: 'thin', scrollbarColor: '#007bff #e9ecef' }}>
      <div className="d-flex align-items-center p-3 border-bottom bg-white">
        <img src={selectedStaff ? selectedStaff.photo : "https://via.placeholder.com/50"} className="rounded-circle me-3" alt="Contact Image" style={{ width: '3rem', height: '3rem' }} />
        <div>
          <h5 className="mb-0" style={{ color: '#343a40' }}>{selectedStaff ? selectedStaff.empName : "Contact Name"}</h5>
          <small className="text-muted">  {selectedStaff && selectedStaff.designation}</small>
        </div>
        <div className="ms-auto">
         
        
          <div className="dropdown ms-3">
            <i className="fas fa-ellipsis-v fa-lg text-muted " id="moreOptionsDropdown" data-bs-toggle="dropdown" aria-expanded="false"></i>
            <ul className="dropdown-menu" aria-labelledby="moreOptionsDropdown">
              <li><a className="dropdown-item" href="#">Block Contact</a></li>
              <li><a className="dropdown-item" href="#">Report Spam</a></li>
              <li><a className="dropdown-item" href="#">Clear Chat History</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex-grow-1 overflow-auto p-3 bg-light" style={{ scrollbarWidth: 'thin', scrollbarColor: '#007bff #e9ecef' }}>
        <div className="chat-messages">
          {loadingMessages && <p>Loading messages...</p>}
          {!loadingMessages && messages.length > 0 ? (
            messages.map((message, index) => (
              <div
                key={index}
                className={`d-flex mb-3 ${message.senderType === "superAdmin" ? "justify-content-end" : "justify-content-start"}`}
              >
                {message.senderType === "superAdmin" && message.superAdminId.profileImage ? (
                  <img
                    src={message.superAdminId.profileImage}
                    alt="avatar"
                    className="rounded-circle me-3"
                    width="30"
                    height="30"
                  />
                ) : message.senderType === "staff" && message.staffId.photo ? (
                  <img
                    src={message.staffId.photo}
                    alt="avatar"
                    className="rounded-circle me-3"
                    width="30"
                    height="30"
                  />
                ) : null}
                <div
                  className={`p-3 rounded ${message.senderType === "superAdmin" ? "bg-primary text-white" : "bg-secondary text-white"}`}
                >
                  <p className="mb-1">{message.message}</p>
                  <small className="text-muted">{message.sentOn}</small>
                </div>
              </div>
            ))
          ) : (
            <p>No messages found.</p>
          )}
        </div>
      </div>
      <div className="input-group p-3 border-top bg-white gap-2">
        <button className="btn btn-outline-primary" style={{ borderRadius: '25px' }}><i className="far fa-smile"></i></button>
        <button className="btn btn-outline-primary" style={{ borderRadius: '25px' }}><i className="fas fa-camera"></i></button>
        <button className="btn btn-outline-primary" style={{ borderRadius: '25px' }}><i className="fas fa-paperclip"></i></button>
        <button className="btn btn-outline-primary" style={{ borderRadius: '25px' }}><i className="fas fa-microphone"></i></button>
        <input
          type="text"
          className="form-control"
          placeholder="Type a message"
          value={inputMessage}
          onChange={handleInputChange}
          style={{ borderRadius: '25px', borderColor: '#ced4da',fontSize:'12px' }}
        />
        <div className="input-group-append">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSendMessage}
            style={{ borderRadius: '25px' }}
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>



      </div>
    </>
  );
};

export default ListChat;
