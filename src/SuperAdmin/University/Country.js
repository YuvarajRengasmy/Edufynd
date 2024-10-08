// import React, { useRef, useState } from "react";
// import Select from "react-select";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { Tooltip, OverlayTrigger } from "react-bootstrap";

// const YourComponent = ({ status, handleEditModule, handleTrack, handleTrackSubmit, handleSelectChange, handleRichTextChange }) => {
//   const modalRef = useRef(null);
//   const [submitted, setSubmitted] = useState(false);
//   const [track, setTrack] = useState({ newStatus: "", duration: "", commentBox: "", progress: "", document: "" });
//   const [trackErrors, setTrackErrors] = useState({ newStatus: {}, duration: {}, commentBox: {} });

//   const getProgressColor = (progress) => {
//     if (progress === 100) return "#28a745"; // Green for completed
//     if (progress > 0) return "#ffc107"; // Yellow for in-progress
//     return "#dc3545"; // Red for not started
//   };

//   return (
//     <div className="row">
//       {status
//         .sort((a, b) => a.position - b.position) // Sort by position
//         .map((item, index) => {
//           // Check if the previous status is completed
//           const isPreviousCompleted = index === 0 || status[index - 1].completed;

//           return (
//             <div
//               className="position-relative m-2"
//               key={item.id} // Use a unique identifier instead of index if possible
//               style={{ flex: "1 1 auto", maxWidth: "10%" }}
//             >
//               <div className="position-relative">
//                 <div
//                   className="progress"
//                   role="progressbar"
//                   aria-label="Progress"
//                   aria-valuenow={item.progress}
//                   aria-valuemin="0"
//                   aria-valuemax="100"
//                   style={{ height: "9px" }}
//                 >
//                   <div
//                     className="progress-bar progress-bar-striped progress-bar-animated"
//                     style={{
//                       width: `${item.progress}%`,
//                       backgroundColor: getProgressColor(item.progress),
//                     }}
//                   ></div>
//                 </div>

//                 <OverlayTrigger
//                   placement="bottom"
//                   overlay={<Tooltip>{item.position}</Tooltip>}
//                 >
//                   <button
//                     type="button"
//                     className={`position-absolute text-bold top-0 start-0 translate-middle-y btn btn-sm btn-primary rounded-pill ${!isPreviousCompleted ? 'disabled' : ''}`}
//                     data-bs-toggle={isPreviousCompleted ? "modal" : undefined} // Only enable modal if previous is complete
//                     data-bs-target={isPreviousCompleted ? `#modal-${index}` : undefined}
//                     style={{
//                       width: "2rem",
//                       height: "2rem",
//                       left: "0",
//                       color: "#FFF",
//                     }}
//                     onClick={isPreviousCompleted ? () => handleEditModule(item) : undefined} // Only trigger edit if previous is complete
//                   >
//                     {item.position}
//                   </button>
//                 </OverlayTrigger>

//                 {/* Status Name */}
//                 <div className="d-flex justify-content-start align-items-center mt-3">
//                   {item.statusName}
//                 </div>
//                 <div className="d-flex justify-content-start align-items-center mt-3 d-none">
//                   {item.subCategory}
//                 </div>

//                 {/* Modal for Editing */}
//                 <div
//                   className="modal fade"
//                   id={`modal-${index}`}
//                   tabIndex="-1"
//                   aria-labelledby="exampleModalLabel"
//                   aria-hidden="true"
//                 >
//                   <div className="modal-dialog modal-dialog-centered">
//                     <div className="modal-content">
//                       <div className="modal-header">
//                         <h1 className="modal-title fs-5" id="staticBackdropLabel">
//                           Application Status
//                         </h1>
//                         <button
//                           type="button"
//                           className="btn-close"
//                           data-bs-dismiss="modal"
//                           aria-label="Close"
//                           ref={modalRef}
//                         ></button>
//                       </div>
//                       <div className="modal-body">
//                         {/* Form for Editing */}
//                         <form onSubmit={handleTrackSubmit}>
//                           {/* Status Input */}
//                           <div className="col-sm-6 col-lg-12 col-sm-12 mb-3 mb-3">
//                             <input
//                               type="text"
//                               name="newStatus"
//                               value={track.newStatus}
//                               onChange={handleTrack}
//                               className="form-control"
//                               placeholder="Enter Status...."
//                               aria-label="Status"
//                               aria-describedby="basic-addon1"
//                               style={{ fontSize: "12px" }}
//                             />
//                             {submitted && trackErrors.newStatus.required && (
//                               <p className="text-danger">Status is required</p>
//                             )}
//                           </div>

//                           {/* Sub Category Input */}
//                           <div className="col-sm-6 col-lg-12 col-sm-12 mb-3 mb-3">
//                             <Select
//                               isMulti
//                               options={CategoriesOptions}
//                               name="subCategory"
//                               onChange={handleSelectChange}
//                               styles={{
//                                 container: (base) => ({
//                                   ...base,
//                                   fontFamily: "Plus Jakarta Sans",
//                                   fontSize: "12px",
//                                   zIndex: "2",
//                                 }),
//                               }}
//                               placeholder="Select Sub Category"
//                             />
//                           </div>

//                           {/* Duration Input */}
//                           <div className="col-sm-6 col-lg-12 col-sm-12 mb-3 mb-3">
//                             <input
//                               type="text"
//                               name="duration"
//                               value={track.duration}
//                               onChange={handleTrack}
//                               className="form-control"
//                               placeholder="Enter Duration...."
//                               aria-label="Status"
//                               aria-describedby="basic-addon1"
//                               style={{ fontSize: "12px" }}
//                             />
//                             {submitted && trackErrors.duration.required && (
//                               <p className="text-danger">Duration is required</p>
//                             )}
//                           </div>

//                           {/* Rich Text Editor */}
//                           <div className="col-sm-6 col-lg-12 col-sm-12 mb-3">
//                             <CKEditor
//                               editor={ClassicEditor}
//                               value={track.commentBox}
//                               config={{
//                                 placeholder:
//                                   "Start writing your content here...",
//                                 toolbar: [
//                                   "heading",
//                                   "|",
//                                   "bold",
//                                   "italic",
//                                   "link",
//                                   "bulletedList",
//                                   "numberedList",
//                                   "blockQuote",
//                                   "|",
//                                   "insertTable",
//                                   "mediaEmbed",
//                                   "imageUpload",
//                                   "|",
//                                   "undo",
//                                   "redo",
//                                 ],
//                                 image: {
//                                   toolbar: [
//                                     "imageTextAlternative",
//                                     "imageStyle:full",
//                                     "imageStyle:side",
//                                   ],
//                                 },
//                                 table: {
//                                   contentToolbar: [
//                                     "tableColumn",
//                                     "tableRow",
//                                     "mergeTableCells",
//                                   ],
//                                 },
//                               }}
//                               onChange={(event, editor) => {
//                                 const data = editor.getData();
//                                 console.log({ data });
//                                 handleRichTextChange(data);
//                               }}
//                               name="commentBox"
//                               style={{
//                                 fontFamily: "Plus Jakarta Sans",
//                                 fontSize: "12px",
//                                 zIndex: "0",
//                               }}
//                             />
//                             {submitted && trackErrors.commentBox.required && (
//                               <p className="text-danger">Comment is required</p>
//                             )}
//                           </div>

//                           {/* Progress and File Upload Inputs */}
//                           <div className="col-sm-6 col-lg-12 col-sm-12 mb-3 mb-3">
//                             <input
//                               type="number"
//                               className="form-control"
//                               style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
//                               value={track.progress}
//                               placeholder="Enter Progress"
//                               name="progress"
//                               onChange={handleTrack}
//                             />
//                           </div>
//                           <div className="col-sm-6 col-lg-12 col-sm-12 mb-3 mb-3">
//                             <input
//                               type="file"
//                               className="form-control"
//                               style={{ fontFamily: "Plus Jakarta Sans", fontSize: "12px" }}
//                               placeholder="Enter File Upload"
//                               name="document"
//                               onChange={handleTrack}
//                             />
//                           </div>

//                           {/* Modal Footer */}
//                           <div className="modal-footer">
//                             <button
//                               type="button"
//                               className="btn px-4 py-2 text-uppercase fw-semibold"
//                               data-bs-dismiss="modal"
//                               style={{
//                                 fontSize: "12px",
//                                 backgroundColor: "#231f20",
//                                 color: "#fff",
//                               }}
//                             >
//                               Close
//                             </button>
//                             <button
//                               type="submit"
//                               className="btn px-4 py-2 text-uppercase fw-semibold"
//                               style={{
//                                 fontSize: "12px",
//                                 backgroundColor: "#fe5722",
//                                 color: "#fff",
//                               }}
//                               data-bs-dismiss="modal"
//                             >
//                               Submit
//                             </button>
//                           </div>
//                         </form>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//     </div>
//   );
// };

// export default YourComponent;
