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
      <div className="content-wrapper" style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}>
  <div className="content-header">
    <div className="container-fluid my-4">
      <div className="row">
        {/* Staff List */}
        <div className="col-md-4 col-lg-4">
          <div className="card border-0">
            <div className="card-body">
              <input
                className="form-control form-control-sm mb-3"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                placeholder="Search for people, groups, and messages"
                style={{ fontSize: '12px' }}
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
                                  color: issuperAdminOnline(staff._id) ? "#10B118" : "transparent",
                                  top: "39px",
                                  left: "66%",
                                  height: "2rem",
                                  width: "2rem",
                                  backgroundColor: issuperAdminOnline(staff._id) ? "#231f20" : "transparent",
                                  border: issuperAdminOnline(staff._id) ? "2px solid white" : "none",
                                }}
                              ></span>
                              <img
                                src={staff.photo}
                                alt="avatar"
                                className="img-fluid rounded-circle mx-auto d-block"
                                width="60"
                                height="60"
                                style={{
                                  border: issuperAdminOnline(staff._id) ? "3px solid #10B118" : "none",
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-md-8">
                            <div className="card-body">
                              <small className="fw-semibold mb-0">{staff.empName}</small>
                              <span
                                className="small fw-normal d-flex justify-content-between"
                                style={{ color: issuperAdminOnline(staff._id) ? "green" : "red" }}
                              >
                                {issuperAdminOnline(staff._id) ? "Online" : "Offline"}
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

        {/* Chat Window */}
        <div className="col-md-8 col-lg-8">
          <div className="card border-0 vh-100">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <div>
                <button
                  id="message_box"
                  ref={messagesContainerRef}
                  className="btn btn-light d-md-none"
                  data-bs-toggle="collapse"
                  data-bs-target="#chat-sidebar"
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
                <button className="btn btn-outline-primary btn-sm" data-bs-toggle="dropdown">
                  <i className="fa fa-ellipsis-v"></i>
                </button>
                <div className="dropdown-menu border-0">
                  <a className="dropdown-item" href="#">Archive</a>
                  <a className="dropdown-item" href="#">Mute</a>
                  <a className="dropdown-item" href="#">Clear Chat</a>
                  <a className="dropdown-item" href="#">Report</a>
                  <a className="dropdown-item" href="#">Block</a>
                </div>
              </div>
            </div>
            <div className="card-body  overflow-auto p-0">
              <div className="chat-messages p-3">
                {loadingMessages && <p>Loading messages...</p>}
                {!loadingMessages && messages.length > 0 ? (
                  messages.map((message, index) => (
                    <div key={index} className={`d-flex justify-content-${message.senderType === "superAdmin" ? "end" : "start"} mb-4`}>
                      {message.senderType === "superAdmin" && message.superAdminId.profileImage ? (
                        <img
                          src={message.superAdminId.profileImage}
                          alt="avatar"
                          className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong mt-3"
                          width="30"
                          height="30"
                        />
                      ) : message.senderType === "staff" && message.staffId.photo ? (
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
                          backgroundColor: message.senderType === "superAdmin" ? "#EB2562" : "#1C2E46",
                          color: message.senderType === "superAdmin" ? "white" : "white",
                         
                        }}
                      >
                       
                          <p className="mb-0 text-white">
                            {message.sentBy === "superAdmin" ? `${superAdminMessage}` : `${message.message}`}
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
              <form className="d-flex">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Type a message..."
                  style={{ fontSize: '12px' }}
                />
                <button type="submit" className="btn btn-primary btn-sm ml-2">
                  <i className="fa fa-paper-plane"></i>
                </button>
              </form>
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
