// import { RiCoinsFill } from "react-icons/ri";
// import { Link, useLocation } from "react-router-dom";
// import React, { useEffect, useState } from "react";
// import { IoMdRocket } from "react-icons/io";
// import { IoMailUnread } from "react-icons/io5";
// import banner from "../../styles/Assets/Student/EventBanner.png";
// import { getSingleUniversity, UniversityProgram } from "../../api/university";
// import { getallCommission } from "../../api/commission";
// import { getallProgram, getUniversityProgram,getUniversityByName } from "../../api/Program";
// import Sidebar from "../../compoents/sidebar";
// import { FaUniversity } from "react-icons/fa";
// import { FaGlobeAmericas } from "react-icons/fa";
// const UserProfile = () => {
//   const location = useLocation();
//   const universityId = new URLSearchParams(location.search).get("id");
//   const [university, setUniversity] = useState();
//   const [commission, setCommission] = useState([]);
//   const [program, setProgram] = useState([]);
//   const pageSize = 5;
//   const [filter, setFilter] = useState(false);
//   const [pagination, setPagination] = useState({
//     count: 0,
//     from: 0,
//     to: pageSize,
//   });

//   useEffect(() => {
//     getUniversityDetails();
//     getUniversityCommission();
//     filter ? filterProgramList() : getAllProgram();
//   }, [universityId, pagination.from, pagination.to]);


//   useEffect(() => {
//     const fetchUniversityDetails = async () => {
//       try {
//         const data = await getUniversityByName(name);
//         setUniversity(data.result);
//       } catch (error) {
//         console.error('Failed to fetch university details:', error);
//       }
//     };

//     fetchUniversityDetails();
//   }, [name]);
//   const getUniversityCommission = () => {
//     getallCommission()
//       .then((res) => {
//         setCommission(res?.data?.result);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   const getUniversityDetails = () => {
//     getSingleUniversity(universityId)
//       .then((res) => {
//         setUniversity(res?.data?.result);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   const getAllProgram = () => {
//     const data = {
//       limit: pageSize,
//       page: pagination.from,
//       universityId: universityId,
//     };

//     getallProgram(data)
//       .then((res) => {
//         console.log(res);
//         setProgram(res?.data?.result?.programList);
//         setPagination({
//           ...pagination,
//           count: res?.data?.result?.programCount,
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const filterProgramList = (event) => {
//     event?.preventDefault();
//     setFilter(true);
//     const data = {
//       universityName: university?.universityName,
//       universityId: university?._id,
//       limit: 10,
//       page: pagination.from,
//     };
//     getUniversityProgram(data)
//       .then((res) => {
//         setProgram(res?.data?.result?.programList);
//         setPagination({
//           ...pagination,
//           count: res?.data?.result?.programCount,
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   return (
//     <>
//       <div>
//         <Sidebar />

//         <div
//           className="content-wrapper"
//           style={{ fontFamily: "Plus Jakarta Sans", fontSize: "13px" }}
//         >
//           <div className="content-header">
//             <div className="container ">
//               <div className="row">
//                 <div className="col-xl-12">
//                   <div className="card border-0 rounded-0 ">
                   
//                     <div className="card-body  ">
//                       <div className="container">
//                         <div className="row ">
//                           <div className="col-md-8">
//                             <ul
//                               class="nav nav-pills fs-9"
//                               id="myTab"
//                               role="tablist"
//                             >
//                               <li class="nav-item" role="presentation">
//                                 <a
//                                   class="nav-link active text-Capitalize "
//                                   id="home-tab"
//                                   data-bs-toggle="tab"
//                                   href="#tab-home"
//                                   role="tab"
//                                   aria-controls="tab-home"
//                                   aria-selected="true"
//                                 >
//                                   About
//                                 </a>
//                               </li>
//                               <li class="nav-item" role="presentation">
//                                 <a
//                                   class="nav-link text-Capitalize "
//                                   id="profile-tab"
//                                   data-bs-toggle="tab"
//                                   href="#tab-profile"
//                                   role="tab"
//                                   aria-controls="tab-profile"
//                                   aria-selected="false"
//                                   tabindex="-1"
//                                 >
//                                   Campus
//                                 </a>
//                               </li>
//                               <li class="nav-item" role="presentation">
//                                 <a
//                                   class="nav-link   text-Capitalize "
//                                   id="profile-tab"
//                                   data-bs-toggle="tab"
//                                   href="#tab-populatCourse"
//                                   role="tab"
//                                   aria-controls="tab-profile"
//                                   aria-selected="false"
//                                   tabindex="-1"
//                                 >
//                                   Categories
//                                 </a>
//                               </li>
//                               <li class="nav-item" role="presentation">
//                                 <a
//                                   class="nav-link text-Capitalize "
//                                   id="profile-tab"
//                                   data-bs-toggle="tab"
//                                   href="#tab-Course"
//                                   role="tab"
//                                   aria-controls="tab-profile"
//                                   aria-selected="false"
//                                   tabindex="-1"
//                                 >
//                                   Course
//                                 </a>
//                               </li>
//                               <li class="nav-item" role="presentation">
//                                 <a
//                                   class="nav-link text-Capitalize "
//                                   id="profile-tab"
//                                   data-bs-toggle="tab"
//                                   href="#Payment-course"
//                                   role="tab"
//                                   aria-controls="tab-profile"
//                                   aria-selected="false"
//                                   tabindex="-1"
//                                 >
//                                   Payment Method
//                                 </a>
//                               </li>
//                               <li class="nav-item" role="presentation">
//                                 <a
//                                   class="nav-link text-Capitalize "
//                                   id="home-review-tab"
//                                   data-bs-toggle="tab"
//                                   href="#tab-Review"
//                                   role="tab"
//                                   aria-controls="tab-home"
//                                   aria-selected="true"
//                                 >
//                                   Requirement
//                                 </a>
//                               </li>
//                             </ul>
//                             <div
//                               class="tab-content mt-3"
//                               id="myTabContent"
//                               style={{
//                                 height: "350px",
//                                 overflowY: "auto",
//                                 scrollbarWidth: "none",
//                               }}
//                             >
//                               <div
//                                 class="tab-pane fade active show"
//                                 id="tab-home"
//                                 role="tabpanel"
//                                 aria-labelledby="home-tab"
//                               >
//                                 <p
//                                   className="clearfix"
//                                   style={{ textAlign: "justify" }}
//                                 >
//                                   {university?.about}{" "}
//                                 </p>
//                               </div>
//                               <div
//                                 class="tab-pane fade"
//                                 id="tab-profile"
//                                 role="tabpanel"
//                                 aria-labelledby="profile-tab"
//                               >
//                                 <div className="row">
//                                   {Array.isArray(university?.campuses) &&
//                                     university.campuses.map((data, index) => (
//                                       <div key={index} className="col-md-3">
//                                         <div className="card text-bg-light  border-0   border-start   border-5 border-danger  align-items-center">
//                                           <div className="align-self-center mt-2 mb-0">
//                                             <img
//                                               src={
//                                                 university?.universityLogo
//                                                   ? university?.universityLogo
//                                                   : "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg"
//                                               }
//                                               className="card-img-top img-fluid rounded-circle object-fit-cover mx-auto d-block mb-0"
                                             
//                                               alt="img"
//                                               style={{width:'4rem',height:'4rem'}}
//                                             />
//                                           </div>

//                                           <div className="card-body">
//                                             <p className="card-text text-center mb-1">
//                                               {data?.lga}
//                                             </p>
//                                             <p className="card-text text-center">
//                                               {data?.state}
//                                             </p>
//                                           </div>
//                                         </div>
//                                       </div>
//                                     ))}
//                                 </div>
//                               </div>
                             

                             
//                               <div
//                                 class="tab-pane fade"
//                                 id="Payment-course"
//                                 role="tabpanel"
//                                 aria-labelledby="profile-tab"
//                               >
//                                  <div className="row">
//       <div className="col-sm-12 pt-3 px-5">
//         {commission.length > 0 ? (
//           commission.map((item, index) => {
//             const universityDetails = findUniversityByName(item.name);
            
//             return (
//               <div key={index} className="row">
//                 <div className="card shadow-sm mt-3">
//                   <div className="card-body">
//                     <div className="row gy-3 py-2">
//                       <div className="col-sm-6">
//                         <div className="fw-light text-lead text-capitalize">
//                           Payment Method
//                         </div>
//                         <div className="fw-semibold text-capitalize">
//                           {universityDetails ? universityDetails.name : item.universityName}
//                         </div>
//                       </div>
//                       <div className="col-sm-6">
//                         <div className="fw-light text-lead text-capitalize">
//                           Amount/Percentage
//                         </div>
//                         <div className="fw-semibold text-capitalize">
//                           {item.amount
//                             ? item.amount
//                             : item.percentage
//                             ? item.percentage
//                             : "null"}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="row gy-3 py-2">
//                       <div className="col-sm-6">
//                         <div className="fw-light text-lead text-capitalize">
//                           Eligibility For Commission
//                         </div>
//                         <div className="fw-semibold text-capitalize">
//                           {item.eligibilityForCommission}
//                         </div>
//                       </div>
//                       <div className="col-sm-6">
//                         <div className="fw-light text-lead text-capitalize">
//                           Payment TAT
//                         </div>
//                         <div className="fw-nsemibold">
//                           {item.paymentTAT}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="row gy-3 py-2">
//                       <div className="col-sm-6">
//                         <div className="fw-light text-lead text-capitalize">
//                           Tax
//                         </div>
//                         <div className="fw-semibold text-capitalize">
//                           {item.tax}
//                         </div>
//                       </div>
//                       <div className="col-sm-6">
//                         <div className="fw-light text-lead text-capitalize">
//                           Commission Paid On
//                         </div>
//                         <div className="fw-semibold text-capitalize">
//                           {item.commissionPaidOn}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <div className="text-center">No commission data available.</div>
//         )}
//       </div>
//     </div>
//                               </div>
                              
//                             </div>
//                           </div>

                         

                         
//                           <nav aria-label="Page navigation example justify-content-end  text-end">
//                             <ul className="pagination">
//                               <li className="page-item">
//                                 <a
//                                   className="page-link"
//                                   href="#"
//                                   aria-label="Previous"
//                                 >
//                                   <span aria-hidden="true">&laquo;</span>
//                                 </a>
//                               </li>
//                               <li className="page-item">
//                                 <a className="page-link" href="#">
//                                   1
//                                 </a>
//                               </li>
//                               <li className="page-item">
//                                 <a className="page-link" href="#">
//                                   2
//                                 </a>
//                               </li>

//                               <li className="page-item">
//                                 <a
//                                   className="page-link"
//                                   href="#"
//                                   aria-label="Next"
//                                 >
//                                   <span aria-hidden="true">&raquo;</span>
//                                 </a>
//                               </li>
//                             </ul>
//                           </nav>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default UserProfile;
