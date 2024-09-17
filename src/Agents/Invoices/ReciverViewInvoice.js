import React, { useState, useRef, useEffect } from "react";
import { getSingleSenderInvoice } from "../../api/invoice/sender";
import { useLocation } from "react-router-dom";
import Mastersidebar from "../../compoents/AgentSidebar";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ViewInvoice = () => {
    const location = useLocation();
    const id = new URLSearchParams(location.search).get("id");
    const [invoice, setInvoice] = useState(null);

    useEffect(() => {
        if (id) {
            getAllInvoiceDetails();
        }
    }, [id]);

    const getAllInvoiceDetails = () => {
        getSingleSenderInvoice(id)
            .then((res) => {
                setInvoice(res?.data?.result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const invoiceRef = useRef(null);

    const downloadInvoice = () => {
        const invoiceNode = invoiceRef.current;
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        html2canvas(invoiceNode, {
            scale: 2,
            useCORS: true
        }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const imgWidth = pdfWidth;
            const imgHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
            pdf.save("invoice.pdf");
        });
    };

    return (
        <>
            <div >
                
                    <Mastersidebar />
                
                <div className="content-wrapper" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
                    <div className="content-header">
                        <div className=" container-fluid card shadow-sm border-0 text-center p-4" >
                            <div className="card-body " ref={invoiceRef}>
                                <h4 className="card-head fw-semibold" style={{ color: '#fe5722' }}>AFYND PRIVATE LIMITED</h4>
                                <h6 className="card-code" style={{ color: '#0f2239' }}>CIN - U72900TN2020PTC135299 </h6>
                                <p className="card-address" style={{ color: '#0f2239' }}><b>Corporate Office :</b> No 17, 3rd Floor, Gandhi Road, Alwarthiru Nagar, Chennai – 600087. TamilNadu, India. </p>
                                <div className="d-flex flex-row align-items-start justify-content-center gap-3">
                                    <p className="card-website" style={{ color: '#0f2239' }}><b>Web :</b> www.afynd.com </p>
                                    <p className="card-mail" style={{ color: '#0f2239' }}><b>E-Mail :</b> info@afynd.com </p>
                                    <p className="card-contact" style={{ color: '#0f2239' }}><b>Ph :</b> +91-44 – 4272 1119 </p>
                                </div>
                                <hr />
                                <div className="row g-3">
                                    <div className="col-sm-6">
                                        <div className="d-flex flex-column align-items-center justify-content-start">
                                            <p className="card-clientname">Invoice Number: {invoice?.senderInvoiceNumber   || "Not Available"}</p>
                                            <p className="card-clientname">Client Name: {invoice?.businessName  || "Not Available"}</p>
                                            <p className="card-Businessname">University Name: {invoice?.universityName  || "Not Available"}</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="d-flex flex-column align-items-center justify-content-start">
                                            <p className="card-Agentname">Application ID: {invoice?.applicationID  || "Not Available"}</p>
                                            <p className="card-Businessname">Payment Mode: {invoice?.paymentMethod  || "Not Available"}</p>
                                            <p className="card-Address">Fixed/Percentage: {invoice?.fixedAmount  || "Not Available"}</p>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="row g-3">
                                    <div className="col-sm-3">
                                        <p className="amount">Application ID: {invoice?.applicationID  || "Not Available"}</p>
                                    </div>
                                    <div className="col-sm-3">
                                        <p className="Demand">Course Fees: {invoice?.courseFeesAmount  || "Not Available"}</p>
                                    </div>
                                    <div className="col-sm-3">
                                        <p className="Demand">Commission: {invoice?.fixedAmount  || "Not Available"}</p>
                                    </div>
                                    <div className="col-sm-3">
                                        <p className="Demand">Total Amount: {invoice?.currency  || "Not Available"} {invoice?.fixedAmount  || "Not Available"}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="d-flex flex-column align-items-center justify-content-center">
                                    <p className="PROFIT">NET PROFIT: {invoice?.fixedAmount ? invoice?.fixedAmount : invoice?.courseFeesPercentage ? invoice?.courseFeesPercentage : 0}</p>
                                    <p className="CGST">CGST: {invoice?.cgst ? invoice?.cgst : 0}</p>
                                    <p className="SGST">SGST: {invoice?.sgst ? invoice?.sgst : 0}</p>
                                </div>
                                <button className="btn btn-primary" onClick={downloadInvoice}>Download PDF</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewInvoice;
