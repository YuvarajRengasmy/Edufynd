import { useEffect, useState, useRef } from "react";
import { getSingleSuperAdmin } from "../../api/superAdmin";
import { getSuperAdminId } from "../../Utils/storage";
// import { getStaffId} from "../../Utils/storage";
import { timeCall } from "../../Utils/DateFormat";

import { getallStaff } from "../../api/staff";
import { postChat, getMessages } from "../../api/chat";
import "./Chatus.css";
import {
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBTypography,
  MDBCardFooter,
} from "mdb-react-ui-kit";
import { BsThreeDotsVertical } from "react-icons/bs";
import io from "socket.io-client";
import Sidebar from "../../compoents/sidebar";

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
        <div className="content-header">

      

        <div class="container-fluid my-4">
        <div class="row">
          
            <div class="col-md-4 col-lg-4">
                <div class="card border-0">
                   
                    <div class="card-body">
                        
                        <input class="form-control form-control-sm mb-3 " type="text" placeholder="Search for people, groups, and messages" style={{fontSize:'12px'}}/>

                      
                        <ul class="nav flex-column">
                           
                            <li class="nav-item border-0">
                                <a class="nav-link d-flex align-items-center py-2" href="" data-bs-toggle="tab">
                                    <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="User" class="rounded-circle mr-2" style={{width: "40px", height:" 40px"}}/>
                                    <div class="flex-fill">
                                        <h6 class="mb-0" style={{fontSize:'14px'}}>Sharuka Nijibum</h6>
                                        <p class="mb-0 text-muted" style={{fontSize:'12px'}}> <small>This is a message from you</small></p>
                                    </div>
                                    <small class="text-muted">Just now</small>
                                </a>
                            </li>
                            <li class="nav-item  border-0">
                                <a class="nav-link d-flex align-items-center py-2" href="" data-bs-toggle="tab">
                                    <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="User" class="rounded-circle mr-2" style={{width: "40px", height:" 40px"}}/>
                                    <div class="flex-fill">
                                        <h6 class="mb-0" style={{fontSize:'14px'}}>Sharuka Nijibum</h6>
                                        <p class="mb-0 text-muted" style={{fontSize:'12px'}}> <small>This is a message from you</small></p>
                                    </div>
                                    <small class="text-muted">Just now</small>
                                </a>
                            </li>
                            <li class="nav-item  border-0">
                                <a class="nav-link d-flex align-items-center py-2" href="" data-bs-toggle="tab">
                                    <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="User" class="rounded-circle mr-2" style={{width: "40px", height:" 40px"}}/>
                                    <div class="flex-fill">
                                        <h6 class="mb-0" style={{fontSize:'14px'}}>Sharuka Nijibum</h6>
                                        <p class="mb-0 text-muted" style={{fontSize:'12px'}}> <small>This is a message from you</small></p>
                                    </div>
                                    <small class="text-muted">Just now</small>
                                </a>
                            </li>
                            <li class="nav-item  border-0">
                                <a class="nav-link d-flex align-items-center py-2" href="" data-bs-toggle="tab">
                                    <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="User" class="rounded-circle mr-2" style={{width: "40px", height:" 40px"}}/>
                                    <div class="flex-fill">
                                        <h6 class="mb-0" style={{fontSize:'14px'}}>Sharuka Nijibum</h6>
                                        <p class="mb-0 text-muted" style={{fontSize:'12px'}}> <small>This is a message from you</small></p>
                                    </div>
                                    <small class="text-muted">Just now</small>
                                </a>
                            </li>
                           
                        </ul>
                    </div>
                </div>
            </div>

           
            <div class="col-md-8 col-lg-8">
                <div class="card border-0 h-100">
                    <div class="card-header bg-white d-flex justify-content-between align-items-center">
                        <div>
                            <button class="btn btn-light d-md-none" data-bs-toggle="collapse" data-bs-target="#chat-sidebar">
                                <i class="fa fa-chevron-left"></i>
                            </button>
                            <h6 class="mb-0 fw-semibold text-capitalize">Sharuka Nijibum</h6>
                            <p class="mb-0 text-muted">Active now</p>
                        </div>
                        <div className="float-end">
                            <button class="btn btn-outline-primary btn-sm"><i class="fa fa-phone"></i></button>
                            <button class="btn btn-outline-primary btn-sm"><i class="fa fa-video"></i></button>
                            <button class="btn btn-outline-primary btn-sm " data-bs-toggle="dropdown">
                                <i class="fa fa-ellipsis-v"></i>
                            </button>
                            <div class="dropdown-menu border-0">
                                <a class="dropdown-item" href="#">Archive</a>
                                <a class="dropdown-item" href="#">Mute</a>
                                <a class="dropdown-item" href="#">Clear Chat</a>
                                <a class="dropdown-item" href="#">Report</a>
                                <a class="dropdown-item" href="#">Block</a>
                            </div>
                        </div>
                    </div>
                    <div class="card-body p-0">
                        <div class="chat-messages p-3">
                      
                            <div class="d-flex align-items-start mb-3">
                                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="User" class="rounded-circle mr-2" style={{width:" 40px" ,height:" 40px"}}/>
                                <div class="bg-light p-2 rounded">
                                    <p class="mb-0">Hi, I need help with my booking.</p>
                                </div>
                            </div>
                            <div class="d-flex align-items-end justify-content-end mb-3">
                                <div class="bg-primary text-white p-2 rounded">
                                    <p class="mb-0">Sure, let me assist you with that.</p>
                                </div>
                                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="User" class="rounded-circle ml-2" style={{width:" 40px" ,height:" 40px"}}/>
                            </div>
                           
                        </div>
                    </div>
                    <div class="card-footer bg-white">
                        <form class="d-flex">
                            <input type="text" class="form-control form-control-sm" placeholder="Type a message..." style={{fontSize:'12px'}}/>
                            <button type="submit" class="btn btn-primary btn-sm ml-2">
                                <i class="fa fa-paper-plane"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-md-4">
                <div className="mask-custom card text-bg-secondary border-0 h-100">
                  <div className="card-header border-0">
                    <div className="input-group my-3">
                      <input
                        className="form-control border-0 form-control-sm"
                        placeholder="Search for..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ fontSize: "12px" }}
                      />
                    </div>
                  </div>
                  <div className="card-body">
                    <ul
                      className="mask-custom-scroll list-unstyled"
                      style={{
                        maxHeight: "450px",
                        overflowY: "auto",
                        scrollbarWidth: "none",
                      }}
                    >
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

              <div className="col-12 col-md-8">
                <div className="card card-body text-bg-light h-100 border-0">
                  <div
                    id="message_box"
                    style={{
                      maxHeight: "450px",
                      overflowY: "auto",
                      backgroundColor: "#E6EDF8",
                      scrollbarWidth: "none",
                    }}
                    ref={messagesContainerRef}
                  >
                    <div>
                      <MDBCol>
                        <MDBTypography>
                          <div
                            className="position-sticky fixed-top w-100 d-flex justify-content-between"
                            style={{ zIndex: 9999, backgroundColor: "#231f20" }}
                          >
                            <div className="d-flex align-items-center">
                              {selectedStaff && selectedStaff.photo ? (
                                <img
                                  src={selectedStaff.photo}
                                  alt="avatar"
                                  className="rounded-circle d-flex align-self-center me-3 shadow-1-strong mx-auto d-block"
                                  width="40"
                                  height="40"
                                />
                              ) : (
                                <div
                                  className="rounded-circle d-flex align-self-center me-3 shadow-1-strong bg-light text-dark mx-auto d-block"
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <img
                                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                    alt="avatar"
                                    className="rounded-circle d-flex align-self-center me-3 shadow-1-strong mx-auto d-block"
                                    width="40"
                                    height="40"
                                  />
                                </div>
                              )}
                              <div className="ms-2">
                                <p className="fw-bold mb-0 text-white">
                                  {selectedStaff && selectedStaff.empName}
                                </p>
                                {selectedStaff && selectedStaff._id && (
                                  <span
                                    className="small mb-1"
                                    style={{
                                      color: issuperAdminOnline(
                                        selectedStaff._id
                                      )
                                        ? "green"
                                        : "red",
                                      fontWeight: "700",
                                    }}
                                  >
                                    {issuperAdminOnline(selectedStaff._id)
                                      ? "Online"
                                      : "Offline"}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="text-end">
                              <BsThreeDotsVertical />
                            </div>
                          </div>

                          <div className="mask-custom-scroll p-5">
                            {loadingMessages && <p>Loading messages...</p>}
                            {!loadingMessages && messages.length > 0 ? (
                              <ul className="list-unstyled">
                                {messages.map((message, index) => (
                                  <li
                                    className={`d-flex justify-content-${
                                      message.senderType === "superAdmin"
                                        ? "end"
                                        : "start"
                                    } mb-4`}
                                    key={index}
                                  >
                                    {message.senderType === "superAdmin" &&
                                    message &&
                                    message.superAdminId.profileImage ? (
                                      <img
                                        src={message.superAdminId.profileImage}
                                        alt="avatar"
                                        className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong mt-3"
                                        width="30"
                                        height="30"
                                      />
                                    ) : (
                                      message.senderType === "staff" &&
                                      message &&
                                      message.staffId.photo && (
                                        <img
                                          src={message.staffId.photo}
                                          alt="avatar"
                                          className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong mt-3"
                                          width="30"
                                          height="30"
                                        />
                                      )
                                    )}
                                    <MDBCard
                                      className="mask-custom"
                                      style={{
                                        background: "none",
                                        backgroundColor: "none",
                                        border: "none",
                                        borderBottom: "none",
                                        boxShadow: "none",
                                      }}
                                    >
                                      <MDBCardBody
                                        style={{
                                          backgroundColor:
                                            message.senderType === "superAdmin"
                                              ? "#EB2562"
                                              : "#1C2E46",
                                          borderRadius: "50px 50px 0px 50px",
                                          border: "none",
                                          borderBottom: "none",
                                        }}
                                      >
                                        <p className="mb-0 text-white">
                                          {message.sentBy === "superAdmin"
                                            ? `${superAdminMessage}`
                                            : `${message.message}`}
                                        </p>
                                      </MDBCardBody>
                                      <MDBCardFooter
                                        style={{
                                          background: "none",
                                          borderTop: "none",
                                        }}
                                      >
                                        <p className="text-black ms-5 d-flex justify-content-end small mb-0 ms-2">
                                          {message.sentOn &&
                                            `${message.sentOn}`}
                                        </p>
                                      </MDBCardFooter>
                                    </MDBCard>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <div>No messages available.</div>
                            )}
                          </div>
                        </MDBTypography>
                      </MDBCol>
                    </div>
                  </div>
                  <div
                    className="card-footer"
                    style={{ backgroundColor: "#231f20", color: "#fff" }}
                  >
                    <div className="row">
                      <div
                        className="col-12"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            const messageText = e.target.value.trim();
                            if (messageText !== "") {
                              handleSendMessage(messageText);
                              e.target.value = "";
                            }
                          }
                        }}
                      >
                        <div className="messages-box d-flex gap-3 my-2">
                          <input
                            className="form-control form-control-sm border-0"
                            placeholder="Type Your Message....."
                            rows={2}
                            value={inputMessage}
                            onChange={handleInputChange}
                            style={{ fontSize: "12px" }}
                          />
                          <button
                            style={{
                              backgroundColor: "#fe5722",
                              color: "#fff",
                              fontSize: "12px",
                            }}
                            className="btn btn-sm border-0 fw-semibold text-uppercase"
                            onClick={handleSendMessage}
                          >
                            Send
                          </button>
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
    </>
  );
};

export default ListChat;
