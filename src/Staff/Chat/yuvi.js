import React, { useState, useEffect, useRef } from "react";
import { getallSuperAdmin } from "../../api/superAdmin";
import { getallStudent } from "../../api/student";
import { getSingleStaff } from "../../api/staff";
import { postChatStaff, getMessages } from "../../api/chat";
import "./Chatus.css";
import { MDBCol, MDBCard, MDBCardBody, MDBTypography, MDBCardFooter } from "mdb-react-ui-kit";
import { getStaffId } from "../../Utils/storage";
import { BsThreeDotsVertical } from "react-icons/bs";
import io from "socket.io-client";
import Sidebar from "../../compoents/StaffSidebar";

const ChatApp = () => {
  const [showChatlist, setShowChatlist] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [staff, setStaff] = useState(null);
  const [superAdmin, setSuperAdmin] = useState([]);
  const [student, setStudent] = useState([]);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [socketMessage, setSocketMessage] = useState("");
  const [connectedUsers, setConnectedUsers] = useState([]);
  const messagesContainerRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedUser, messages]);

  useEffect(() => {
    const newSocket = io("http://localhost:4409");
    setSocket(newSocket);

    newSocket.on("socketId", (id) => {
      console.log("Received socketId from server:", id);
    });

    newSocket.on("newMessage", (newMessage) => {
      if (
        (newMessage.senderType === "staff" || newMessage.senderType === "superAdmin") &&
        ((newMessage.superAdminId && newMessage.superAdminId._id === selectedUser?._id) ||
          newMessage.superAdmin === selectedUser?._id) &&
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

    newSocket.emit("new-user-add", getStaffId());
    return () => {
      newSocket.disconnect();
    };
  }, [selectedUser, staff]);

  const isUserOnline = (userId) => {
    return connectedUsers.some((user) => user.userId === userId && user.online);
  };

  useEffect(() => {
    getUserDetails();
    getallSuperAdminUsers();
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

  const getallSuperAdminUsers = () => {
    getallSuperAdmin()
      .then((res) => {
        const usersData = res?.data?.result || [];
        const filteredUsers = searchQuery
          ? usersData.filter((staff) =>
              staff.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
          : usersData;
        setSuperAdmin(filteredUsers);
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
    if (!selectedUser) {
      return;
    }

    const newMessage = {
      text: inputMessage,
      sender: staff.empName,
      timestamp: new Date(),
      sentBy: "staff",
    };

    postChatMessage(selectedUser._id, newMessage);
    setInputMessage("");
  };

  const postChatMessage = (userId, message) => {
    const staffId = getStaffId();
    const data = {
      staffId: staffId,
      userId: userId,
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
        const socketData = {
          staffId: list,
          userId: userId,
          senderType: "staff",
          message: userMessage.message,
          sentOn: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
        };
        setSocketMessage(socketData);
        socket.emit("sendMessage", socketData);
      })
      .catch((err) => {
        console.error("Error sending chat message:", err);
      });
  };

  useEffect(() => {
    if (selectedUser) {
      fetchMessagesForUser(selectedUser._id);
    }
  }, [selectedUser]);

  const fetchMessagesForUser = (userId) => {
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
              message.userId &&
              message.userId._id === userId
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

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setShowChatlist(false);
    setShowChat(true);
  };

  return (
    <>
      <div className="py-3 gradient-custom1" style={{ height: "100vh" }}>
        <div className="container">
          <div className="row">
            <div className="list-divider col-lg-4 col-12">
              <h5 className="font-weight-bold mb-3 text-center text-white mt-2">
                Let's Chat With Edufynd!
              </h5>
              <div className="mask-custom rounded-3" style={{ backgroundColor: "#1C2E46" }}>
                <div className="input-group mb-3 p-3">
                  <input
                    className="form-control p-3"
                    placeholder="Search for..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="mb-0 p-3">
                  <div className="mask-custom-scroll list-unstyled rounded-3" style={{ maxHeight: "500px", overflowY: "auto" }}>
                    {superAdmin &&
                      superAdmin.map((userchat) => (
                        <li
                          className="p-2 border-bottom"
                          style={{
                            backgroundColor: selectedUser && selectedUser._id === userchat._id
                              ? "#1C2E46"
                              : "white",
                            color: selectedUser && selectedUser._id === userchat._id
                              ? "white"
                              : "black",
                            border: "3px solid white",
                            width: "auto",
                            cursor: "pointer",
                          }}
                          key={userchat._id}
                          onClick={() => handleUserSelect(userchat)}
                        >
                          <div className="d-flex flex-start">
                            <img
                              className="rounded-circle d-flex align-self-center me-3"
                              src={userchat.photo || "https://mdbootstrap.com/img/Photos/Avatars/img%20(1).jpg"}
                              alt="avatar"
                              width="60"
                              height="60"
                            />
                            <div className="w-100">
                              <div className="d-flex justify-content-between mb-3">
                                <p className="fw-bold mb-0">{userchat.name}</p>
                              </div>
                              <p className="text-muted mb-0">
                                {isUserOnline(userchat._id) ? "Online" : "Offline"}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    {student &&
                      student.map((userchat) => (
                        <li
                          className="p-2 border-bottom"
                          style={{
                            backgroundColor: selectedUser && selectedUser._id === userchat._id
                              ? "#1C2E46"
                              : "white",
                            color: selectedUser && selectedUser._id === userchat._id
                              ? "white"
                              : "black",
                            border: "3px solid white",
                            width: "auto",
                            cursor: "pointer",
                          }}
                          key={userchat._id}
                          onClick={() => handleUserSelect(userchat)}
                        >
                          <div className="d-flex flex-start">
                            <img
                              className="rounded-circle d-flex align-self-center me-3"
                              src={userchat.photo || "https://mdbootstrap.com/img/Photos/Avatars/img%20(1).jpg"}
                              alt="avatar"
                              width="60"
                              height="60"
                            />
                            <div className="w-100">
                              <div className="d-flex justify-content-between mb-3">
                                <p className="fw-bold mb-0">{userchat.studentName}</p>
                              </div>
                              <p className="text-muted mb-0">
                                {isUserOnline(userchat._id) ? "Online" : "Offline"}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <MDBCol lg="8" md="6" className="chat-col">
              {showChat && (
                <MDBCard className="chat-card">
                  <MDBCardBody className="overflow-auto chat-body" ref={messagesContainerRef}>
                    {loadingMessages ? (
                      <p>Loading...</p>
                    ) : (
                      messages.map((message, index) => (
                        <MDBTypography
                          tag="p"
                          key={index}
                          className={`message-bubble ${
                            message.sentBy === "staff" ? "sent" : "received"
                          }`}
                        >
                          {message.text}
                        </MDBTypography>
                      ))
                    )}
                  </MDBCardBody>
                  <MDBCardFooter className="d-flex justify-content-between align-items-center chat-footer">
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
                        className="form-control p-4"
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
                  </MDBCardFooter>
                </MDBCard>
              )}
            </MDBCol>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatApp;
