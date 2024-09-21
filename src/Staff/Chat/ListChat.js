import { useEffect, useState, useRef } from "react";
import { getSingleStaff } from "../../api/staff";
 import { getStaffId} from "../../Utils/storage";
import { timeCall } from "../../Utils/DateFormat";
import {getallSuperAdmin } from "../../api/superAdmin";
import { postChat, getMessages } from "../../api/chat";
import io from "socket.io-client";
import Sidebar from "../../compoents/sidebar";

const ListChat = () => {
  const [showChatlist, setShowChatlist] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [staff, setStaff] = useState(null);
  const [superAdmin, setSuperAdmin] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [staffMessage, setstaffMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [socketmessage, setSocketMessage] = useState("");
  const [connectedstaffs, setConnectedstaffs] = useState([]);
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
    const newSocket = io("http://localhost:4409/api/");
    setSocket(newSocket);

    newSocket.on("socketId", (id) => {});

    newSocket.on("newMessage", (newMessage) => {
      if (
        (newMessage.senderType === "staff" ||
          newMessage.senderType === "superAdmin") &&
        ((newMessage.staffId &&
          newMessage.staffId === staff._id) ||
          newMessage.staffId._id === staff._id) &&
        ((newMessage.staffId && newMessage.staffId === selectedStaff?._id) ||
          newMessage.staffId._id === selectedStaff?._id)
      ) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      } else {
        setstaffMessage([]);
      }
    });
    newSocket.on("get-staff", (staffs) => {
      setConnectedstaffs(staffs);
    });

    newSocket.emit("new-staff-add", getStaffId());

    return () => {
      newSocket.disconnect();
    };
  }, [selectedStaff, staff]);
  const isstaffOnline = (staffId) => {
    return connectedstaffs.some(
      (staff) =>
        staff.staffId === staffId && staff.online
    );
  };

  useEffect(() => {});
  useEffect(() => {
    getstaffDetails();

    getDoctors();
  }, [searchQuery]);

  const getstaffDetails = () => {
    const id = getStaffId();
    getSingleStaff(id)
      .then((res) => {
        setStaff(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDoctors = () => {
    getallSuperAdmin()
      .then((res) => {
        const staffData = res?.data?.result || [];
        if (searchQuery) {
          const filteredstaff = staffData.filter((superAdmin) =>
            superAdmin.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setSuperAdmin(filteredstaff);
        } else {
          const staffWithStatuses = staffData.map((staff) => ({
            ...staff,
            isActive: staff.someLogicToDetermineActiveStatus,
          }));
          setSuperAdmin(staffWithStatuses);
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
      sender: staff.name,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      sentBy: "staff",
    };

    postChatMessage(selectedStaff._id, newMessage);
    setInputMessage("");
  };

  const postChatMessage = (superAdminId, message) => {
    const staff = getStaffId();
    const data = {
 
      superAdminId: superAdminId,
      staffId: staff,
      message: message.text,
      senderType: message.sender,
    };

    postChat(data)
      .then((res) => {
        const staffMessage = res.data.result;
        setstaffMessage(staffMessage);
        const list = {
          _id: staff._id,
          name: staff.name,
          profileImage: staff.profileImage,
        };
        const socketdata = {
          superAdminId: selectedStaff._id,
          staff: list,
          senderType: "staff",
          message: staffMessage.message,
          sentOn: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
        };
        const socketdata1 = {
          superAdminId: selectedStaff._id,
          staff: list,
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
  }, [selectedStaff]);

  const getMessage = () => {
    if (selectedStaff && selectedStaff._id) {
      setLoadingMessages(true);

      getMessages()
        .then((res) => {
          if (Array.isArray(res.data.result)) {
            const filteredMessages = res.data.result.filter(
              (message) =>
                (message.senderType === "superAdmin" ||
                  message.senderType === "staff") &&
                message.staffId &&
                message.staffId._id === staff._id &&
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
    <div className="container-fluid  ">
  <div className="row no-gutters">
    <div className="col-md-4 bg-light border-right" style={{ height: '100vh', overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: '#007bff #e9ecef' }}>
      <div className="d-flex align-items-center p-3 border-bottom bg-white">
        <img src={selectedStaff ? selectedStaff.photo : "https://via.placeholder.com/50"} className="rounded-circle me-3" alt="User Image" style={{ width: '3rem', height: '3rem' }} />
        <div>
          <h5 className="mb-0" style={{ color: '#343a40' }}>{selectedStaff ? selectedStaff.name : "User Name"}</h5>
          <small className="text-muted">{selectedStaff && isstaffOnline(selectedStaff._id) ? "Online" : "Offline"}</small>
        </div>

      </div>
      <div className="input-group p-3">
      <input
                      className="form-control form-control-sm mb-3"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      type="text"
                      placeholder="Search for people, groups, and messages"
                      style={{ fontSize: "12px" }}
                    />
        <div className="input-group-append">
          <button className="btn btn-outline-primary" type="button" style={{ borderRadius: '25px' }}><i className="fas fa-search"></i></button>
        </div>
      </div>
      <ul className="nav nav-tabs" id="chatTab" role="tablist">
        <li className="nav-item">
          <a className="nav-link active" id="all-tab" data-bs-toggle="tab" href="#all" role="tab" aria-controls="all" aria-selected="true">All</a>
        </li>
       
      </ul>
      <div className="tab-content" id="chatTabContent" style={{ overflowY: 'auto', height: 'calc(100% - 160px)' }}>
        <div className="tab-pane fade show active" id="all" role="tabpanel" aria-labelledby="all-tab">
          <div className="list-group list-group-flush">
            {superAdmin && superAdmin.map((staff) => (
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
                      <h6 className="mb-0" style={{ color: '#343a40' }}>{staff.name}</h6>
                      <small className="text-muted">{timeCall(staff.createdOn)}</small>
                    </div>
                    <p className="mb-0 text-truncate" style={{ color: '#6c757d' }}>{isstaffOnline(staff._id) ? "Online" : "Offline"}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
       
      </div>
    </div>

    {/* Chat Content */}
    <div className="col-md-8 d-flex flex-column" style={{ height: '100vh', overflow: 'auto', scrollbarWidth: 'thin', scrollbarColor: '#007bff #e9ecef' }}>
      <div className="d-flex align-items-center p-3 border-bottom bg-white">
        <img src={selectedStaff ? selectedStaff.photo : "https://via.placeholder.com/50"} className="rounded-circle me-3" alt="Contact Image" style={{ width: '3rem', height: '3rem' }} />
        <div>
          <h5 className="mb-0" style={{ color: '#343a40' }}>{selectedStaff ? selectedStaff.name : "Contact Name"}</h5>
          <small className="text-muted">  {selectedStaff && selectedStaff.designation}</small>
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
                ) : message.senderType === "superAdmin" && message.superAdminId.photo ? (
                  <img
                    src={message.superAdminId.photo}
                    alt="avatar"
                    className="rounded-circle me-3"
                    width="30"
                    height="30"
                  />
                ) : null}
                <div
                  className={`p-2 rounded ${message.senderType === "superAdmin" ? "bg-primary text-white" : "bg-secondary text-white"}`}
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
