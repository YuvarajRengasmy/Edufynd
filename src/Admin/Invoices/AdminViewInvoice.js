import React from "react";
import Mastersidebar from "../../compoents/AdminSidebar";
export const AdminViewInvoice = () => {
  return (
    <>
      <div>
        <Mastersidebar />

        <div
          className="content-wrapper"
          style={{ fontFamily: "Plus Jakarta Sans", fontSize: "14px" }}
        >
          <div className="content-header">
            <div className="card shadow-sm border-0 text-center p-4">
              <div className="card-body">
                <h4
                  className="card-head  fw-semibold"
                  style={{ color: "#fe5722" }}
                >
                  AFYND PRIVATE LIMITED
                </h4>
                <h6 className="card-code" style={{ color: "#0f2239" }}>
                  CIN - U72900TN2020PTC135299{" "}
                </h6>
                <p className="card-address" style={{ color: "#0f2239" }}>
                  <b>Corporate Office :</b> No 17, 3rd Floor, Gandhi Road,
                  Alwarthiru Nagar, Chennai – 600087. TamilNadu, India.{" "}
                </p>
                <div className="d-flex flex-row align-items-start justify-content-center gap-3">
                  <p className="card-website" style={{ color: "#0f2239" }}>
                    <b>Web :</b> www.afynd.com{" "}
                  </p>
                  <p className="card-mail" style={{ color: "#0f2239" }}>
                    <b>E-Mail : </b> info@afynd.com{" "}
                  </p>
                  <p className="card-contact" style={{ color: "#0f2239" }}>
                    <b>Ph : </b> +91-44 – 4272 1119{" "}
                  </p>
                </div>
                <hr />
                <div className="row g-3">
                  <div className="col-sm-6">
                    <div className="d-flex flex-column align-items-center justify-content-start">
                      <p className="card-clientname">Client Name: XXXXX</p>
                      <p className="card-Businessname">Business Name: XXXXX</p>
                      <p className="card-Address">Address: XXXXX</p>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex flex-column align-items-center justify-content-start">
                      <p className="card-Agentname">Agent Name: XXXXX</p>
                      <p className="card-Businessname">Business Name: XXXXX</p>
                      <p className="card-Address">Address: XXXXX</p>
                    </div>
                  </div>
                  <hr />
                </div>
                <div className="row g-3">
                  <div className="col-sm-3">
                    <p className="amount">Invoice Amount: INR 70,000</p>
                  </div>
                  <div className="col-sm-3">
                    {" "}
                    <p className="Demand">Demand Code:XXXX</p>
                  </div>
                  <div className="col-sm-3">
                    {" "}
                    <p className="amount">Invoice Amount: INR 90,000</p>
                  </div>
                  <div className="col-sm-3">
                    {" "}
                    <p className="Demand">Demand Code:XXXX</p>
                  </div>
                </div>
                <hr />
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <p className="PROFIT">NET PROFIT: INR 16950</p>
                  <p className="CGST">CGST: INR 1,525</p>
                  <p className="SGST">SGST: INR 1,525</p>
                </div>
                <hr />
                <table class="table  table-striped table-responsive-sm table-bordered table-hover">
                  <thead
                    style={{
                      fontFamily: "Plus Jakarta Sans",
                      fontSize: "13px",
                    }}
                  >
                    <tr>
                      <th>SNO</th>
                      <th>DATE</th>
                      <th>PAYMENT METHOD</th>
                      <th>RECEIVED</th>
                      <th>PAID</th>
                    </tr>
                  </thead>
                  <tbody
                    style={{
                      fontFamily: "Plus Jakarta Sans",
                      fontSize: "12px",
                    }}
                  >
                    <tr>
                      <td>01</td>
                      <td>10/10/2023</td>

                      <td>Bank Transfer – Ref No</td>
                      <td>20000</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>02</td>
                      <td>10/10/2023</td>

                      <td>Bank Transfer – Ref No</td>
                      <td>-</td>
                      <td>15000</td>
                    </tr>
                    <tr>
                      <td>03</td>
                      <td>16/10/2023</td>

                      <td>UPI – Ref No</td>
                      <td>70000</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>04</td>
                      <td>17/10/2023</td>

                      <td>Bank Transfer – Ref No</td>
                      <td>20000</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td colspan="3">TOTAL</td>

                      <td>90000</td>
                      <td>70000</td>
                    </tr>
                    <tr>
                      <td colspan="3">Net Profit</td>

                      <td>-</td>
                      <td>-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminViewInvoice;
