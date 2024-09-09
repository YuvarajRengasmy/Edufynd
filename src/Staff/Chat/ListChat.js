import React, { useState, useEffect, useRef } from "react";
import { getallSuperAdmin } from "../../api/superAdmin";
import { getallStudent} from "../../api/student";
import { getSingleStaff } from "../../api/staff";
import { postChatStaff, getMessages,postChatStudent } from "../../api/chat";
import { timeCall} from "../../Utils/DateFormat";

import "./Chatus.css";
import {
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBTypography,
  MDBCardFooter,
} from "mdb-react-ui-kit";
import { getStaffId } from "../../Utils/storage";
import { BsThreeDotsVertical } from "react-icons/bs";
import io from "socket.io-client";
import Sidebar from "../../compoents/StaffSidebar";

const ChatApp = () => {
  const [showChatlist, setShowChatlist] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [staff, setStaff] = useState(null);
  const [superAdmin, setSuperAdmin] = useState(null);
  const [student, setStudent] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [socketmessage, setSocketMessage] = useState("");
  const [connectedUsers, setConnectedUsers] = useState([]);
  const messagesContainerRef = useRef(null);
  const messagesContainerRefStudent = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };


 
  useEffect(() => {
    const newSocket = io("https://api.edufynd.in");
    setSocket(newSocket);

    newSocket.on("socketId", (id) => {
      console.log("Received socketId from server:", id);
    });
    newSocket.on("newMessage", (newMessage) => {
        if (
          (newMessage.senderType === "staff" ||
            newMessage.senderType === "superAdmin" ||
            newMessage.senderType === "student") &&
          ((newMessage.superAdminId && newMessage.superAdminId._id === selectedUser?._id) ||
            newMessage.superAdmin === selectedUser?._id) &&
          ((newMessage.studentId && newMessage.studentId._id === selectedStudent?._id) ||
          newMessage.student === selectedStudent?._id)&&
          ((newMessage.staffId && newMessage.staffId._id === staff._id) ||
            newMessage.staffId === staff._id)
        ) {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        } else {
          setUserMessage([]);
        }
      });
      newSocket.on("get-users", (superAdmin) => {
        setConnectedUsers(superAdmin);
      });
      newSocket.on("get-users", (student) => {
        setConnectedUsers(student);
      });

      newSocket.emit("new-user-add", getStaffId());

      return () => {
        newSocket.disconnect();
      };
    }, [selectedUser, staff, selectedStudent]);

  const isUserOnline = (superAdminId) => {
    return connectedUsers.some((staff) => staff.superAdminId === superAdminId && staff.online);
  };
  const isStudentOnline = (studentId) => {
    return connectedUsers.some((student) => student.studentId === studentId && student.online);
  };

  useEffect(() => {
    getUserDetails();
    getallUser();
   
  }, [searchQuery]);
  
  useEffect(() => {
    
    getallStudentUsers();
  }, [searchQuery]);

  const getUserDetails = () => {
    const id = getStaffId();
    getSingleStaff(id)
      .then((res) => {
        setStaff(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getallUser = () => {
    getallSuperAdmin()
      .then((res) => {
        const usersData = res?.data?.result || [];
        if (searchQuery) {
          const filteredUsers = usersData.filter((staff) =>
            staff.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setSuperAdmin(filteredUsers);
        } else {
          const usersWithStatuses = usersData.map((staff) => ({
            ...staff,
            isActive: staff.someLogicToDetermineActiveStatus,
          }));
          setSuperAdmin(usersWithStatuses);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getallStudentUsers = () => {
    getallStudent()
      .then((res) => {
        const studentData = res?.data?.result || [];
        const filteredStudents = searchQuery
          ? studentData.filter((student) =>
              student.studentName.toLowerCase().includes(searchQuery.toLowerCase())
            )
          : studentData;
        setStudent(filteredStudents);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (selectedUser) {
      const newMessage = {
        text: inputMessage,
        sender: 'staff',
        timestamp: new Date(),
        sentBy: 'staff',
      };

      postChatMessage(selectedUser._id, newMessage);
      setInputMessage('');
    } else if (selectedStudent) {
      const newMessage = {
        text: inputMessage,
        sender: 'staff',
        timestamp: new Date(),
        sentBy: 'staff',
      };

      postStudentMessage(selectedStudent._id, newMessage);
      setInputMessage('');
    }

    setInputMessage('');
  };

  const postChatMessage = (superAdminId, message) => {
    const staffId = getStaffId();
    const data = {
      staffId: staffId,
      superAdminId: selectedUser._id,
      message: message.text,
      senderType: message.sentBy,
    };

    postChatStaff(data)
      .then((res) => {
        const userMessage = res.data.result;
        setUserMessage(userMessage);
        const list = {
          _id: staff._id,
          name: staff.empName,
          photo: staff.photo,
        };
        const socketdata = {
          staffId: list,
          superAdminId: selectedUser._id,
          senderType: "staff",
          message: userMessage.message,
          sentOn: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
        };
        const socketdata1 = {
          staffId: list,
          staffId: selectedUser._id,
          senderType: "staff",
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
 


//   student chat code

const postStudentMessage = (studentId, message) => {
    const staffId = getStaffId();
    const data = {
      staffId: staffId,
      studentId: selectedStudent._id,
      message: message.text,
      senderType: message.sentBy,
    };

    postChatStudent(data)
      .then((res) => {
        const userMessage = res.data.result;
        setUserMessage(userMessage);
        const list = {
          _id: staff._id,
          name: staff.name,
          photo: staff.photo,
        };
        const socketdata = {
          staffId: list,
          superAdminId: selectedStudent._id,
          senderType: "staff",
          message: userMessage.message,
          sentOn: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
        };
        const socketdata1 = {
          staffId: list,
          staffId: selectedStudent._id,
          senderType: "staff",
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
  }, [selectedUser]);

  const getMessage = () => {
    if (selectedUser && selectedUser._id) {
      setLoadingMessages(true);

      getMessages()
        .then((res) => {
          if (Array.isArray(res.data.result)) {
            const filteredMessages = res.data.result.filter(
              (message) =>
                (message.senderType === "staff" ||
                  message.senderType === "superAdmin") &&
                message.staffId &&
                message.staffId._id === staff._id &&
                message.superAdminId &&
                message.superAdminId._id === selectedUser._id
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


//   student chat code
useEffect(() => {
    getStudentMessage();
  }, [selectedStudent]);

  const getStudentMessage = () => {
    if (selectedStudent && selectedStudent._id) {
      setLoadingMessages(true);

      getMessages()
        .then((res) => {
          if (Array.isArray(res.data.result)) {
            const filteredMessages = res.data.result.filter(
              (message) =>
                (message.senderType === "staff" ||
                  message.senderType === "student") &&
                message.staffId &&
                message.staffId._id === staff._id &&
                message.studentId &&
                message.studentId._id === selectedStudent._id
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

  const handleStudentSelect = (userchat) => {
    setSelectedStudent(userchat);
    setShowChatlist(false);
    setShowChat(true);
    fetchMessagesForStudent(userchat._id);
  };

  const fetchMessagesForStudent = (studentId) => {
    setMessages([]);
    setLoadingMessages(true);
    getMessages()
      .then((res) => {
        if (Array.isArray(res.data.result)) {
          const filteredMessages = res.data.result.filter(
            (message) =>
              (message.senderType === "staff" ||
                message.senderType === "student") &&
              message.staffId &&
              message.staffId._id === staff._id &&
              message.studentId &&
              message.studentId._id === studentId
          );

          setMessages(filteredMessages);
          scrollToBottom();
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
  };

//   superadmin chat code

  const handleUserSelect = (userchat) => {
    setSelectedUser(userchat);
    setShowChatlist(false);
    setShowChat(true);
    fetchMessagesForUser(userchat._id);
  };

  const fetchMessagesForUser = (superAdminId) => {
    setMessages([]);
    setLoadingMessages(true);
    getMessages()
      .then((res) => {
        if (Array.isArray(res.data.result)) {
          const filteredMessages = res.data.result.filter(
            (message) =>
              (message.senderType === "staff" ||
                message.senderType === "superAdmin") &&
              message.staffId &&
              message.staffId._id === staff._id &&
              message.superAdminId &&
              message.superAdminId._id === superAdminId
          );

          setMessages(filteredMessages);
          scrollToBottom();
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
  };

  return (
    <>
    
    <div className="py-3 gradient-custom1" style={{ height: '100vh' }}>
      <div className="container">
        <div className="row">
          <div className="list-divider col-lg-4 col-12">
            <h5 className="font-weight-bold mb-3 text-center text-white mt-2">
              Let's Chat With Edufynd!
            </h5>
            <div className="mask-custom rounded-3" style={{ backgroundColor: '#1C2E46' }}>
              <div className="input-group mb-3 p-3">
                <input
                  className="form-control p-3"
                  placeholder="Search for..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="mb-0 p-3">
                <div
                  className="mask-custom-scroll list-unstyled rounded-3"
                  style={{ maxHeight: '500px', overflowY: 'auto' }}
                >
                  {superAdmin &&
                    superAdmin
                      .filter(userchat => userchat.name.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((userchat) => (
                        <li
                          className="p-2 border-bottom"
                          style={{
                            backgroundColor: selectedUser && selectedUser._id === userchat._id
                              ? '#1C2E46'
                              : 'white',
                            color: selectedUser && selectedUser._id === userchat._id
                              ? 'white'
                              : 'black',
                            border: '3px solid white',
                            cursor: 'pointer',
                          }}
                          onClick={() => handleUserSelect(userchat)}
                          key={userchat._id}
                        >
                          <div className="d-flex justify-content-between">
                            <div className="d-flex flex-row hover-zoom">
                              <div className="profile-container" style={{ position: 'relative' }}>
                                <span
                                  className="online-dot"
                                  style={{
                                    color: isUserOnline(userchat._id) ? '#10B118' : 'transparent',
                                    position: 'absolute',
                                    top: '39px',
                                    left: '66%',
                                    height: '15px',
                                    width: '15px',
                                    borderRadius: '50%',
                                    backgroundColor: isUserOnline(userchat._id) ? '#10B118' : 'transparent',
                                    border: isUserOnline(userchat._id) ? '2px solid white' : 'none',
                                  }}
                                ></span>
                                <img
                                  src={userchat.photo}
                                  alt="avatar"
                                  className="rounded-circle d-flex align-self-center me-3 shadow-1-strong p-1"
                                  width="60"
                                  height="60"
                                  style={{
                                    border: isUserOnline(userchat._id) ? '3px solid #10B118' : 'none',
                                    backgroundColor: 'white',
                                  }}
                                />
                              </div>
                              <div className="pt-1">
                                <p className="fw-bold mb-0">{userchat.name}</p>
                                <span
                                  className="small mb-1"
                                  style={{
                                    color: isUserOnline(userchat._id) ? 'green' : 'red',
                                    fontWeight: '900',
                                  }}
                                >
                                  {isUserOnline(userchat._id) ? 'Online' : 'Offline'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                </div>
                <div
                  className="mask-custom-scroll list-unstyled rounded-3"
                  style={{ maxHeight: '500px', overflowY: 'auto' }}
                >
                  {student &&
                    student
                      .filter(userchat => userchat.name.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((userchat) => (
                        <li
                          className="p-2 border-bottom"
                          style={{
                            backgroundColor: selectedStudent && selectedStudent._id === userchat._id
                              ? '#1C2E46'
                              : 'white',
                            color: selectedStudent && selectedStudent._id === userchat._id
                              ? 'white'
                              : 'black',
                            border: '3px solid white',
                            cursor: 'pointer',
                          }}
                          key={userchat._id}
                          onClick={() => handleStudentSelect(userchat)}
                        >
                          <div className="d-flex flex-start">
                            <img
                              className="rounded-circle d-flex align-self-center me-3"
                              src={userchat.photo || 'https://mdbootstrap.com/img/Photos/Avatars/img%20(1).jpg'}
                              alt="avatar"
                              width="60"
                              height="60"
                            />
                            <div className="w-100">
                              <div className="justify-content-between mb-3">
                                <p className="fw-bold mb-0">{userchat.name}</p>
                                <p className="text-muted mb-0">
                                  {isStudentOnline(userchat._id) ? 'Online' : 'Offline'} &nbsp;
                                  {timeCall(userchat?.createdOn)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                </div>
              </div>
            </div>
          </div>

          <div
              className="  col-lg-8 col-md-12 "
              style={{ maxHeight: "590px", zIndex: "1" }}
            >
              <div
                className="special-divider  mt-5 rounded-3"
                id="message_box"
                style={{
                  maxHeight: "480px",
                  overflowY: "auto",
                  backgroundColor: "#E6EDF8",
                }}
                ref={messagesContainerRef}
              >
                <MDBCol>
                  <MDBTypography listUnStyled className="">
                    <div
                      className="  position-sticky fixed-top w-100  p-2 rounded d-flex justify-content-between"
                      style={{ zIndex: 9999, backgroundColor: "#1C2E46" }}
                    >
                      <div className="d-flex flex-row hover-zoom">
                        {selectedUser && selectedUser.photo ? (
                          <img
                            src={selectedUser.photo}
                            alt="avatar"
                            className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                            width="40"
                            height="40"
                          />
                        ) : (
                          <div
                            className="rounded-circle d-flex align-self-center me-3 shadow-1-strong bg-light text-dark"
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
                              className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                              width="40"
                              height="40"
                            />
                          </div>
                        )}
                        <div className="pt-1">
                          <p className="fw-bold mb-0 text-white">
                            {selectedUser && selectedUser.name}
                          </p>
                          {selectedUser && selectedUser._id ? (
                            <span
                              className="small  mb-1"
                              style={{
                                color: isUserOnline(selectedUser._id)
                                  ? "green"
                                  : "red",
                                fontWeight: "700",
                              }}
                            >
                              {isUserOnline(selectedUser._id)
                                ? "Online"
                                : "Offline"}
                            </span>
                          ) : null}
                        </div>
                      </div>
                      <div className="mt-2 text-white">
                        <BsThreeDotsVertical />
                      </div>
                    </div>

                    <div className="mask-custom-scroll p-5 ">
                      {loadingMessages && <p>Loading messages...</p>}
                      {!loadingMessages && messages.length > 0 ? (
                        <ul className="list-unstyled">
                          {messages.map((message, index) => (
                            <li
                              className={`d-flex justify-content-${
                                message.senderType === "staff" ? "end" : "start"
                              } mb-4`}
                              key={index}
                            >
                              {message.senderType === "staff" &&
                              message &&
                              message.staffId.photo ? (
                                <img
                                  src={message.staffId.photo}
                                  alt="avatar"
                                  className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong mt-3"
                                  width="30"
                                  height="30"
                                />
                              ) : (
                                message.senderType === "superAdmin" &&
                                message &&
                                message.superAdminId.photo && (
                                  <img
                                    src={message.superAdminId.photo}
                                    alt="avatar"
                                    className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong mt-3"
                                    width="30"
                                    height="30"
                                  />
                                )
                              )}
                              <MDBCard
                                className="mask-custom "
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
                                      message.senderType === "staff"
                                        ? "#EB2562"
                                        : "#1C2E46",
                                    borderRadius: "50px 50px 0px 50px ",

                                    border: "none",
                                    borderBottom: "none",
                                  }}
                                >
                                  <p className="mb-0 text-white  ">
                                    {message.sentBy === "staff"
                                      ? `${userMessage}`
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
                                    {" "}
                                    {message.sentOn && `${message.sentOn}`}
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
              <div
                className="container p-2 rounded-2 "
                style={{ backgroundColor: "#1C2E46" }}
              >
                <div className="row">
                  <div
                    className=" col-sm-12 col-lg-12 col-md-8"
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
                    <div className="messages-box d-flex mt-2 ms-2">
                      <input
                        className="form-control"
                        placeholder="Type your message"
                        rows={2}
                        value={inputMessage}
                        onChange={handleInputChange}
                      ></input>
                      <button
                        style={{
                          backgroundColor: "#EB2562",
                          color: "white",
                          borderRadius: "5px",
                          border: "none",
                          padding: "2%",
                        }}
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
    </>
  );
};

export default ChatApp;
