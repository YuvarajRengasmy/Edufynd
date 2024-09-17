import React, { useEffect, useState } from 'react';
import { getallNotifications } from '../../api/Notification/Notification';
import { Link } from 'react-router-dom';
import { timeCal } from '../../Utils/DateFormat';
import Sidebar from "../../compoents/StaffSidebar";
import { getStaffId } from '../../Utils/storage';

const Notification = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [notification, setNotification] = useState([]);
    const [count, setCount] = useState('');
    const [scroll, setScroll] = useState(false);
    const [next, setNext] = useState(0);
    const [reload, setReload] = useState(false);
    const [title, setTitle] = useState();

    useEffect(() => {
        getNotificationList();
    }, [next]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll); // Clean up listener
    }, []);

    const handleScroll = () => {
        const value = window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 200;
        setScroll(value);
    };

    useEffect(() => {
        if (scroll) {
            loadMoreNotification();
        }
    }, [scroll]);

    const getNotificationList = () => {
        const findData = {
            limit: 10,
            page: next,
            title: title,
            to: getStaffId() // Pass staff ID here
        };
        getallNotifications(findData).then(res => {
            const notificationList = res?.data?.result;
            setNotification(prevNotifications => [...prevNotifications, ...notificationList]);
            setCount(res?.data?.notificationCount);
        }).catch(err => console.log(err));
    };

    const loadMoreNotification = () => {
        let nextNotification = next + 10;
        if (count <= nextNotification) {
            setReload(true);
        } else {
            setNext(nextNotification);
        }
    };

    const handleTabs = (tab) => {
        setActiveTab(tab);
        setReload(false);
        let title;
        if (tab === 'mypost') {
            title = ['Like', 'Comment'];
        } else if (tab === 'mentions') {
            title = ['Mention'];
        } else if (tab === 'session') {
            title = ['Book Session'];
        }
        setTitle(title);
        setScroll(false);
        if (next !== 0) {
            setNotification([]);
            setNext(0);
        } else {
            getNotificationList(); // Fetch notifications based on the updated tab and title
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar style={{ position: 'fixed', top: 0, left: 0, height: '100vh', width: '250px' }} />
            <div style={{ marginLeft: '250px', width: 'calc(100% - 250px)' }}>
                <div className='container '>
                    <div className='container d-flex flex-column border-start border-end gap-2 align-items-center py-5 bg-white '>
                        {/* Nav tabs */}
                        <div className='container bg-white rounded-2 p-2' style={{ minHeight: '500px' }}>
                            <nav className="nav nav-pills d-flex flex-wrap justify-content-lg-center justify-content-center mb-3 align-items-center gap-1 mt-lg-1 mt-5" id="pills-tab" role="tablist">
                                <a
                                    className={`nav-link navLinkBtn text-dark p-2 rounded-5 border ${activeTab === 'all' ? 'active bg-success text-white' : ''}`}
                                    id="pills-all-tab" data-bs-toggle="pill"
                                    href="#pills-all"
                                    role="tab"
                                    aria-controls="pills-all"
                                    aria-selected={activeTab === 'all'}
                                    onClick={() => handleTabs('all')}>
                                    All 
                                </a>
                                <a
                                    className={`nav-link navLinkBtn text-dark p-2 rounded-5 border ${activeTab === 'session' ? 'active bg-success text-white' : ''}`}
                                    id="pills-session-tab" data-bs-toggle="pill"
                                    href="#pills-session"
                                    role="tab"
                                    aria-controls="pills-session"
                                    aria-selected={activeTab === 'session'}
                                    onClick={() => handleTabs('session')}>
                                    Application
                                </a>
                                <a
                                    className={`nav-link navLinkBtn text-dark p-2 rounded-5 border ${activeTab === 'mypost' ? 'active bg-success text-white' : ''}`}
                                    id="pills-mypost-tab"
                                    data-bs-toggle="pill"
                                    href="#pills-mypost"
                                    role="tab"
                                    aria-controls="pills-mypost"
                                    aria-selected={activeTab === 'mypost'}
                                    onClick={() => handleTabs('mypost')}>
                                    Student
                                </a>
                                <a
                                    className={`nav-link navLinkBtn text-dark p-2 rounded-5 border ${activeTab === 'mentions' ? 'active bg-success text-white' : ''}`}
                                    id="pills-mentions-tab"
                                    data-bs-toggle="pill"
                                    href="#pills-mentions"
                                    role="tab"
                                    aria-controls="pills-mentions"
                                    aria-selected={activeTab === 'mentions'}
                                    onClick={() => handleTabs('mentions')}>
                                   Enquiry
                                </a>
                            </nav>

                            {/* Tab Content */}
                            <div className="tab-content w-100" id="pills-tabContent">
                                {/* All Notification */}
                                <div className="tab-pane fade show active" id="pills-all" role="tabpanel" aria-labelledby="pills-all-tab">
                                    <div className='container-fluid bg-white'>
                                        <div className='card mt-2 mb-2'>
                                            <div className='card-body p-2'>
                                                {notification.map((data, index) => (
                                                    <div key={index} className='row-col-lg-3 mb-3 d-flex align-items-center gap-2'>
                                                        <div className='col-lg-1 col-md-1 col-2'>
                                                            <img className='img-fluid rounded-circle' src={data?.from?.user?.image ?? 'https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png'} alt="avatar" style={{ width: '3rem', height: '3rem', objectFit: 'cover' }} />
                                                        </div>
                                                        <div className='col-lg-9 col-md-9 col-8 text-start'>
                                                            <span className='fw-bolder'><Link to="/ProfilePage" className='text-decoration-none text-dark'>Edufynd</Link></span><br />
                                                            <small className='text-secondary d-block'>{timeCal(data?.createdOn)}</small>
                                                            <small className='text-secondary'>{data?.subject}</small>
                                                        </div>
                                                    </div>
                                                ))}
                                                {reload && notification.length > 0 ? (
                                                    <div className='form-text text-danger text-center'>The notification has ended.</div>
                                                ) : null}
                                                {notification.length === 0 ? (
                                                    <div className='form-text text-danger text-center'>Notifications aren't there.</div>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Booked Session Notification */}
                                <div className="tab-pane fade" id="pills-session" role="tabpanel" aria-labelledby="pills-session-tab">
                                    <div className='container-fluid card bg-white'>
                                        {notification.map((data, index) => (
                                            <div key={index} className='container mt-2 mb-2 d-flex align-items-center justify-content-lg-between justify-content-sm-between justify-content-center flex-wrap'>
                                                <div className='d-flex align-items-center gap-3 flex-wrap justify-content-lg-between justify-content-md-between justify-content-center'>
                                                    <div>
                                                        <img className='img-fluid rounded-circle' src={data?.from?.user?.image ?? 'https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png'} alt="avatar" style={{ width: '3rem', height: '3rem', objectFit: 'cover' }} />
                                                    </div>
                                                    <div className='text-center text-lg-start'>
                                                        <span className='fw-bolder'><Link to="/ProfilePage" className='text-decoration-none text-dark'>Edufynd</Link></span><br />
                                                        <small className='text-secondary'>{timeCal(data?.date)}</small>
                                                        <small className='text-secondary d-block'>{data?.description}</small>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* My Post Notification */}
                                <div className="tab-pane fade" id="pills-mypost" role="tabpanel" aria-labelledby="pills-mypost-tab">
                                    <div className='container-fluid card bg-white'>
                                        {notification.map((data, index) => (
                                            <div key={index} className='container mt-2 mb-2 d-flex align-items-center justify-content-lg-between justify-content-sm-between justify-content-center flex-wrap'>
                                                <div className='d-flex align-items-center gap-3 flex-wrap justify-content-lg-between justify-content-md-between justify-content-center'>
                                                    <div>
                                                        <img className='img-fluid rounded-circle' src={data?.from?.user?.image ?? 'https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png'} alt="avatar" style={{ width: '3rem', height: '3rem', objectFit: 'cover' }} />
                                                    </div>
                                                    <div className='text-center text-lg-start'>
                                                        <span className='fw-bolder'><Link to="/ProfilePage" className='text-decoration-none text-dark'>Edufynd</Link></span><br />
                                                        <small className='text-secondary'>{timeCal(data?.date)}</small>
                                                        <small className='text-secondary d-block'>{data?.description}</small>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Mentions Notification */}
                                <div className="tab-pane fade" id="pills-mentions" role="tabpanel" aria-labelledby="pills-mentions-tab">
                                    <div className='container-fluid card bg-white'>
                                        {notification.map((data, index) => (
                                            <div key={index} className='container mt-2 mb-2 d-flex align-items-center justify-content-lg-between justify-content-sm-between justify-content-center flex-wrap'>
                                                <div className='d-flex align-items-center gap-3 flex-wrap justify-content-lg-between justify-content-md-between justify-content-center'>
                                                    <div>
                                                        <img className='img-fluid rounded-circle' src={data?.from?.user?.image ?? 'https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png'} alt="avatar" style={{ width: '3rem', height: '3rem', objectFit: 'cover' }} />
                                                    </div>
                                                    <div className='text-center text-lg-start'>
                                                        <span className='fw-bolder'><Link to="/ProfilePage" className='text-decoration-none text-dark'>Edufynd</Link></span><br />
                                                        <small className='text-secondary'>{timeCal(data?.date)}</small>
                                                        <small className='text-secondary d-block'>{data?.description}</small>
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
    );
};

export default Notification;
