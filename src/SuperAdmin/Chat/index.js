import React, { useState, useEffect, useRef } from "react";
import { getAllUserProfileDetails } from "../../api/user";
import { getSingleDoctor } from "../../api/doctor";
import { postChat, getMessages } from "../../api/chat";
import "./UserChat.css";
import {
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBTypography,
  MDBCardFooter,
} from "mdb-react-ui-kit";
import emptyprofile from "../../Assests/Images/empty_profile.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import io from "socket.io-client";
import DoctorHeader from "../../Components/DoctorHeader";
const ChatApp = () => {
  const [showChatlist, setShowChatlist] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [user, setUser] = useState(null);
  const [users, setallUsers] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [socketmessage, setSocketMessage] = useState("");
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
    const newSocket = io("https://api.metoo.care/");
    setSocket(newSocket);

    newSocket.on("socketId", (id) => {
      console.log("Received socketId from server:", id);
    });
    newSocket.on("newMessage", (newMessage) => {
      if (
        (newMessage.senderType === "doctor" ||
          newMessage.senderType === "user") &&
        ((newMessage.userId && newMessage.userId._id === selectedUser?._id) ||
          newMessage.userId === selectedUser?._id) &&
        ((newMessage.doctorId && newMessage.doctorId._id === user._id) ||
          newMessage.doctorId === user._id)
      ) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } else {
        setUserMessage([]);
      }
    });

    newSocket.on("get-users", (users) => {
      setConnectedUsers(users);
    });

    newSocket.emit("new-user-add", getDoctorId());
    return () => {
      newSocket.disconnect();
    };
  }, [selectedUser, user]);
  const isUserOnline = (userId) => {
    return connectedUsers.some((user) => user.userId === userId && user.online);
  };

  useEffect(() => {
    getUserDetails();
    getallUser();
  }, [searchQuery]);

  const getUserDetails = () => {
    const id = getDoctorId();
    getSingleDoctor(id)
      .then((res) => {
        setUser(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getallUser = () => {
    getAllUserProfileDetails()
      .then((res) => {
        const usersData = res?.data?.result || [];
        if (searchQuery) {
          const filteredUsers = usersData.filter((user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setallUsers(filteredUsers);
        } else {
          const usersWithStatuses = usersData.map((user) => ({
            ...user,
            isActive: user.someLogicToDetermineActiveStatus,
          }));
          setallUsers(usersWithStatuses);
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
    if (!selectedUser) {
      return;
    }

    const newMessage = {
      text: inputMessage,
      sender: user.doctorName,
      timestamp: new Date(),
      sentBy: "doctor",
    };

    postChatMessage(selectedUser._id, newMessage);
    setInputMessage("");
  };

  const postChatMessage = (doctorId, message) => {
    const userId = getDoctorId();
    const data = {
      doctorId: userId,
      userId: selectedUser._id,
      message: message.text,
      senderType: message.sentBy,
    };

    postChat(data)
      .then((res) => {
        const userMessage = res.data.result;
        setUserMessage(userMessage);
        const list = {
          _id: user._id,
          name: user.doctorName,
          profileImage: user.profileImage,
        };
        const socketdata = {
          doctorId: list,
          userId: selectedUser._id,
          senderType: "doctor",
          message: userMessage.message,
          sentOn: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
        };
        const socketdata1 = {
          doctorId: list,
          userId: selectedUser._id,
          senderType: "doctor",
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
                (message.senderType === "doctor" ||
                  message.senderType === "user") &&
                message.doctorId &&
                message.doctorId._id === user._id &&
                message.userId &&
                message.userId._id === selectedUser._id
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

  const handleUserSelect = (userchat) => {
    setSelectedUser(userchat);
    setShowChatlist(false);
    setShowChat(true);
    fetchMessagesForUser(userchat._id);
  };

  const fetchMessagesForUser = (userId) => {
    setMessages([]);
    setLoadingMessages(true);
    getMessages()
      .then((res) => {
        if (Array.isArray(res.data.result)) {
          const filteredMessages = res.data.result.filter(
            (message) =>
              (message.senderType === "doctor" ||
                message.senderType === "user") &&
              message.doctorId &&
              message.doctorId._id === user._id &&
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

  return (
    <>
      <DoctorHeader />
      <div className="py-3 gradient-custom1" style={{ height: "100vh" }}>
        <div className="container">
          <div className="row">
            <div className="list-divider col-lg-4 col-12">
              <h5 className="font-weight-bold mb-3 text-center text-white mt-2">
                Let's Chat With Doctor!
              </h5>
              <div
                className=" mask-custom rounded-3  "
                style={{ backgroundColor: "#1C2E46" }}
              >
                <div>
                  <div className="input-group mb-3 p-3 ">
                    <input
                      className="form-control p-3"
                      placeholder="Search for..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-0 p-3">
                  <div
                    className="mask-custom-scroll list-unstyled rounded-3 "
                    style={{ maxHeight: "500px", overflowY: "auto" }}
                  >
                    {users &&
                      users.map((userchat) => (
                        <li
                          className="p-2 border-bottom "
                          style={{
                            backgroundColor:
                              selectedUser && selectedUser._id === userchat._id
                                ? "#1C2E46"
                                : "white",
                            color:
                              selectedUser && selectedUser._id === userchat._id
                                ? "white"
                                : "black",
                            border:
                              selectedUser && selectedUser._id === userchat._id
                                ? "1px solid white"
                                : "1px solid white",
                            border: "3px solid white",
                            width: "auto",
                            cursor: "pointer",
                          }}
                          onClick={() => handleUserSelect(userchat)}
                          key={userchat._id}
                        >
                          <div className="pt-1 d-flex justify-content-between">
                            <span
                              className="small  mb-1"
                              style={{
                                color: isUserOnline(userchat._id)
                                  ? "green"
                                  : "red",
                                fontWeight: "900",
                              }}
                            >
                              {isUserOnline(userchat._id)
                                ? "Online"
                                : "Offline"}
                            </span>
                            <span className="small  mb-1">1 day ago</span>
                          </div>
                          <div className="d-flex justify-content-between ">
                            <div className="d-flex flex-row hover-zoom">
                              <div
                                className="profile-container"
                                style={{ position: "relative" }}
                              >
                                <span
                                  className="online-dot"
                                  style={{
                                    color: isUserOnline(userchat._id)
                                      ? "#10B118  "
                                      : "transparent",
                                    position: "absolute",
                                    top: "39px",
                                    left: "66%",
                                    height: "15px",
                                    width: "15px",
                                    borderRadius: "50%",
                                    backgroundColor: isUserOnline(userchat._id)
                                      ? "#10B118"
                                      : "transparent",
                                    border: isUserOnline(userchat._id)
                                      ? "2px solid white"
                                      : "none",
                                  }}
                                ></span>
                                <img
                                  src={userchat.profileImage}
                                  alt="avatar"
                                  className="rounded-circle d-flex align-self-center me-3 shadow-1-strong p-1"
                                  width="60"
                                  height="60"
                                  style={{
                                    border: isUserOnline(userchat._id)
                                      ? "3px solid #10B118"
                                      : "none",
                                    backgroundColor: "white",
                                  }}
                                />
                              </div>
                              <div className="pt-1">
                                <p className="fw-bold mb-0 ">
                                  {userchat && userchat.name}
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

            <div className="col-lg-8 col-12" style={{ maxHeight: "590px", zIndex: "1"}}>
              <div
                className="special-divider  mt-5 rounded-3"
                id="message_box"
                style={{
                  maxHeight: "530px",
                  overflowY: "auto",
                  backgroundColor: "#E6EDF8",
                }}
                ref={messagesContainerRef}
              >
                <MDBCol>
                  <MDBTypography listUnStyled className="text-white">
                    <div
                      className="  position-sticky fixed-top w-100  p-2 rounded d-flex justify-content-between"
                      style={{ zIndex: 9999, backgroundColor: "#1C2E46" }}
                    >
                      <div className="d-flex flex-row hover-zoom">
                        {selectedUser && selectedUser.profileImage ? (
                          <img
                            src={selectedUser && selectedUser.profileImage}
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
                              src={emptyprofile}
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
                          {selectedUser && selectedUser.profileImage ? (
                            <span
                              className="small  mb-1"
                              style={{
                                color: isUserOnline(
                                  selectedUser && selectedUser._id
                                )
                                  ? "green"
                                  : "red",
                                fontWeight: "700",
                              }}
                            >
                              {isUserOnline(selectedUser && selectedUser._id)
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
                    <div className="mask-custom-scroll p-5">
                      {loadingMessages && <p>Loading messages...</p>}
                      {!loadingMessages && messages.length > 0 ? (
                        <ul className="list-unstyled">
                          {messages.map((message, index) => (
                            <li
                              className={`d-flex justify-content-${
                                message.senderType === "doctor"
                                  ? "end"
                                  : "start"
                              } mb-4`}
                              key={index}
                            >
                              {message.senderType === "user" &&
                              message &&
                              message.userId.profileImage ? (
                                <img
                                  src={message.userId.profileImage}
                                  alt="avatar"
                                  className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                                  width="60"
                                  height="60"
                                />
                              ) : (
                                message.senderType === "doctor" &&
                                message &&
                                message.doctorId.profileImage && (
                                  <img
                                    src={message.doctorId.profileImage}
                                    alt="avatar"
                                    className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                                    width="60"
                                    height="60"
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
                                      message.senderType === "user"
                                        ? "#EB2562"
                                        : "#1C2E46",
                                    borderRadius: "50px 50px 0px 50px ",
                                    border: "none ",
                                  }}
                                >
                                  <p className="mb-0 text-white ">
                                    {message.sentBy === "doctor"
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
