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

  const scrollToBottomStudent = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottomStudent();
  }, [selectedStudent, messages]);

  useEffect(() => {
    const newSocket = io("http://localhost:4409");
    setSocket(newSocket);

    newSocket.on("socketId", (id) => {
      console.log("Received socketId from server:", id);
    });
    newSocket.on("newMessage", (newMessage) => {
        if (
          (newMessage.senderType === "staff" ||
            newMessage.senderType === "superAdmin" ||
            newMessage.senderType === "student" ) &&
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

          <div className="col-lg-8 col-12" style={{ maxHeight: '590px', zIndex: '1' }}>
            <div
              className="special-divider mt-5 rounded-3"
              id="message_box"
              style={{
                maxHeight: '530px',
                overflowY: 'auto',
                backgroundColor: '#E6EDF8',
              }}
            >
              <MDBCol>
                <MDBTypography listUnStyled className="text-white">
                  <div
                    className="position-sticky fixed-top w-100 p-2 rounded d-flex justify-content-between"
                    style={{ zIndex: 9999, backgroundColor: '#1C2E46' }}
                  >
                    <div className="d-flex flex-row hover-zoom">
                       {selectedUser ? (
                        <>
                          {selectedUser.photo ? (
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
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              {selectedUser.name[0].toUpperCase()}
                            </div>
                          )}
                          <div className="pt-1">
                            <p className="fw-bold mb-0">
                              {selectedUser.name}
                            </p>
                            <p className="small mb-1">Super Admin</p>
                          </div>
                        </>
                      ) : 
                       selectedStudent ? ( 
                        <>
                          {selectedStudent.photo ? (
                            <img
                              src={selectedStudent.photo}
                              alt="avatar"
                              className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                              width="40"
                              height="40"
                            />
                          ) : (
                            <div
                              className="rounded-circle d-flex align-self-center me-3 shadow-1-strong bg-light text-dark"
                              style={{
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              {selectedStudent.name[0].toUpperCase()}
                            </div>
                          )}
                          <div className="pt-1">
                            <p className="fw-bold mb-0">
                              {selectedStudent.name}
                            </p>
                            <p className="small mb-1">Student</p>
                          </div>
                        </>
                      ) : (
                        <p className="fw-bold mb-0">Chat</p>
                      )}
                      <BsThreeDotsVertical
                        className="text-light"
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                  </div>

                  <div
                    className="d-flex flex-column"
                    ref={selectedUser ? messagesContainerRef : messagesContainerRefStudent}
                  >
                    {loadingMessages ? (
                      <p>Loading...</p>
                    ) : (
                      messages.map((message, index) => (
                        <div key={index} className={`d-flex flex-column ${message.senderType === 'superAdmin' ? 'align-items-start' : 'align-items-end'}`}>
                          <div
                            className={`d-flex flex-row mb-4 ${
                              message.senderType === 'superAdmin' ? 'justify-content-start' : 'justify-content-end'
                            }`}
                          >
                            {message.senderType === 'superAdmin' ? (
                              <div
                                className="text-white rounded-3 px-3 py-2 me-3"
                                style={{
                                  backgroundColor: '#1C2E46',
                                  border: '1px solid white',
                                  borderRadius: '20px',
                                }}
                              >
                                <p className="small mb-0">{message.message}</p>
                              </div>
                            ) : (
                              <div
                                className="bg-light rounded-3 px-3 py-2"
                                style={{ border: '1px solid white', borderRadius: '20px' }}
                              >
                                <p className="small mb-0">{message.message}</p>
                              </div>
                            )}
                          </div>
                          <p className={`small text-muted ${message.senderType === 'superAdmin' ? 'text-start' : 'text-end'}`}>
                            {message.sentBy} | {message.sentOn}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </MDBTypography>
              </MDBCol>
            </div>
            <div
              className="position-sticky bottom-0"
              style={{ zIndex: 9999 }}
            >
              <MDBCard className="d-flex flex-row" style={{ border: 'none' }}>
                <MDBCardBody>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Type your message..."
                    value={inputMessage}
                    onChange={handleInputChange}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
                  />
                </MDBCardBody>
                <MDBCardFooter>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleSendMessage(inputMessage)}
                  >
                    Send
                  </button>
                </MDBCardFooter>
              </MDBCard>

            
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ChatApp;
