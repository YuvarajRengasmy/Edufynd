import { useEffect, useState, useRef } from "react";
// import { getsingleuser } from "../../Api/user";
import { getStaffId} from "../../Utils/storage";
// import { getAllDoctor } from "../../Api/doctorprofile";
// import { postChat, getMessages } from "../../Api/chat";
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

const ListChat = () => {
  const [showChatlist, setShowChatlist] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [user, setUser] = useState(null);
  const [doctors, setDoctors] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [socketmessage, setSocketMessage] = useState("");
  const [connectedUsers, setConnectedUsers] = useState([]);
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
    const newSocket = io("http://localhost:4409");
    setSocket(newSocket);

    newSocket.on("socketId", (id) => {});

    newSocket.on("newMessage", (newMessage) => {
      if (
        (newMessage.senderType === "staff" ||
          newMessage.senderType === "superAdmin") &&
        ((newMessage.superAdminId && newMessage.superAdminId === superAdmin._id) ||
          newMessage.superAdminId._id === superAdmin._id) &&
        ((newMessage.staffId && newMessage.staffId === selectedStaff?._id) ||
          newMessage.staffId._id === selectedStaff?._id)
      ) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } else {
        setUserMessage([]);
      }
    });
    newSocket.on("get-superAdmin", (superadmins) => {
      setConnectedUsers(superadmins);
    });

    newSocket.emit("new-user-add", getStaffId());

    return () => {
      newSocket.disconnect();
    };
  }, [selectedStaff, superAdmin]);
  const isUserOnline = (superAdmin) => {
    return connectedUsers.some((superAdmin) => superAdmin.superAdminId === superAdminId && superAdmin.online);
  };

  useEffect(() => {});
  useEffect(() => {
    getUserDetails();

    getDoctors();
  }, [searchQuery]);

  const getUserDetails = () => {
    const id = getUserId();
    getsingleuser(id)
      .then((res) => {
        setUser(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDoctors = () => {
    getAllDoctor()
      .then((res) => {
        const doctorsData = res?.data?.result || [];
        if (searchQuery) {
          const filteredDoctors = doctorsData.filter((doctor) =>
            doctor.doctorName.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setDoctors(filteredDoctors);
        } else {
          const doctorsWithStatuses = doctorsData.map((doctor) => ({
            ...doctor,
            isActive: doctor.someLogicToDetermineActiveStatus,
          }));
          setDoctors(doctorsWithStatuses);
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
    if (!selectedDoctor) {
      return;
    }

    const newMessage = {
      text: inputMessage,
      sender: user.name,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      sentBy: "user",
    };

    postChatMessage(selectedDoctor._id, newMessage);
    setInputMessage("");
  };

  const postChatMessage = (doctorId, message) => {
    const userId = getUserId();
    const data = {
      doctorId: doctorId,
      userId: userId,
      message: message.text,
      senderType: message.sender,
    };

    postChat(data)
      .then((res) => {
        const userMessage = res.data.result;
        setUserMessage(userMessage);
        const list = {
          _id: user._id,
          name: user.name,
          profileImage: user.profileImage,
        };
        const socketdata = {
          doctorId: selectedDoctor._id,
          userId: list,
          senderType: "user",
          message: userMessage.message,
          sentOn: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
        };
        const socketdata1 = {
          doctorId: selectedDoctor._id,
          userId: list,
          senderType: "user",
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
  }, [selectedDoctor]);

  const getMessage = () => {
    if (selectedDoctor && selectedDoctor._id) {
      setLoadingMessages(true);

      getMessages()
        .then((res) => {
          if (Array.isArray(res.data.result)) {
            const filteredMessages = res.data.result.filter(
              (message) =>
                (message.senderType === "doctor" ||
                  message.senderType === "user") &&
                message.userId &&
                message.userId._id === user._id &&
                message.doctorId &&
                message.doctorId._id === selectedDoctor._id
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

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setShowChatlist(false);
    setShowChat(true);
  };

  return (
    <>
      <Header />
      <div className="py-3 gradient-custom1" style={{ height: "100vh" }}>
        <div className="container mb-5">
          <div className="row mx-1 mx-md-5">
            <div className="list-divider col-lg-4 col-12 mb-4 mb-md-0 ">
              <h5 className="font-weight-bold mb-3 text-center text-white mt-2">
                Let's Chat With Doctor!
              </h5>

              <div
                className="mask-custom rounded-3 "
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
                    style={{ maxHeight: "420px", overflowY: "auto" }}
                  >
                    {doctors &&
                      doctors.map((doctor) => (
                        <li
                          className="p-2 border-bottom "
                          style={{
                            backgroundColor:
                              selectedDoctor &&
                              selectedDoctor._id === doctor._id
                                ? "#1C2E46"
                                : "white",
                            color:
                              selectedDoctor &&
                              selectedDoctor._id === doctor._id
                                ? "white"
                                : "black",
                            border:
                              selectedDoctor &&
                              selectedDoctor._id === doctor._id
                                ? "1px solid white"
                                : "1px solid white",
                            width: "auto",
                            cursor: "pointer",
                          }}
                          onClick={() => handleDoctorSelect(doctor)}
                          key={doctor._id}
                        >
                          <div className="pt-1 d-flex justify-content-between">
                            <span
                              className="small  mb-1"
                              style={{
                                color: isUserOnline(doctor._id)
                                  ? "green"
                                  : "red",
                                fontWeight: "700",
                              }}
                            >
                              {isUserOnline(doctor._id) ? "Online" : "Offline"}
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
                                    color: isUserOnline(doctor._id)
                                      ? "#10B118  "
                                      : "transparent",
                                    position: "absolute",
                                    top: "39px",
                                    left: "66%",
                                    height: "15px",
                                    width: "15px",
                                    borderRadius: "50%",
                                    backgroundColor: isUserOnline(doctor._id)
                                      ? "#10B118"
                                      : "transparent",
                                    border: isUserOnline(doctor._id)
                                      ? "2px solid white"
                                      : "none",
                                  }}
                                ></span>
                                <img
                                  src={doctor.profileImage}
                                  alt="avatar"
                                  className="rounded-circle d-flex align-self-center me-3 shadow-1-strong p-1"
                                  width="60"
                                  height="60"
                                  style={{
                                    border: isUserOnline(doctor._id)
                                      ? "3px solid #10B118"
                                      : "none",
                                    backgroundColor: "white",
                                  }}
                                />
                              </div>

                              <div className="pt-1">
                                <small className="fw-bold mb-0 ">
                                  {doctor && doctor.doctorName}
                                </small>
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
                        {selectedDoctor && selectedDoctor.profileImage ? (
                          <img
                            src={selectedDoctor.profileImage}
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
                            {selectedDoctor && selectedDoctor.doctorName}
                          </p>
                          {selectedDoctor && selectedDoctor._id ? (
                            <span
                              className="small  mb-1"
                              style={{
                                color: isUserOnline(selectedDoctor._id)
                                  ? "green"
                                  : "red",
                                fontWeight: "700",
                              }}
                            >
                              {isUserOnline(selectedDoctor._id)
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
                                message.senderType === "user" ? "end" : "start"
                              } mb-4`}
                              key={index}
                            >
                              {message.senderType === "user" &&
                              message &&
                              message.userId.profileImage ? (
                                <img
                                  src={message.userId.profileImage}
                                  alt="avatar"
                                  className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong mt-3"
                                  width="30"
                                  height="30"
                                />
                              ) : (
                                message.senderType === "doctor" &&
                                message &&
                                message.doctorId.profileImage && (
                                  <img
                                    src={message.doctorId.profileImage}
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
                                      message.senderType === "user"
                                        ? "#EB2562"
                                        : "#1C2E46",
                                    borderRadius: "50px 50px 0px 50px ",

                                    border: "none",
                                    borderBottom: "none",
                                  }}
                                >
                                  <p className="mb-0 text-white  ">
                                    {message.sentBy === "user"
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

export default ListChat;
