import React, { useEffect, useState, useRef } from "react";
import {savePaymentGetWay } from "../../api/invoice/payment";
import { toast } from "react-toastify";

import StripeCheckout from 'react-stripe-checkout';

const PaymentComponent = ({ Program }) => {
    const [payment ,setPayment]=useState({
        applicationFee: 2*100,
        name: "applicationFee",
      });
      const modalRef = useRef(null);

    const handlePayment = (token) => {
        const data = {
          token,
          applicationFee: 2*100,
          name: "applicationFee",
    
        };
        savePaymentGetWay (data)
          .then((res) => {
            toast.success("Successfully added payment");
            // getAllModuleDetails();
            if (modalRef.current) {
              modalRef.current.click(); // Close the modal
            }
          })
          .catch((err) => console.log(err));
      };
    
    

  return (
    <div>
                      <StripeCheckout
        stripeKey="pk_live_51OQ6F2A2rJSV7g6S1333dKPIqp5F7YahINaeS3w7fTFjiOcYneMtyXsE2QFiyGOkm9ruw6hNzZqiZSzUFGNdNVe10019LkXbRY"
        token={handlePayment}
        name="applicationFee"
        currency="INR"
        amount={payment?.applicationFee * 100} // Amount in paise (1 INR = 100 paise)
      >
  <button className="btn btn-primary btn-sm" style={{marginRight:"0.5rem"}}>Pay Now</button>
</StripeCheckout>
                      </div>
  );
};

export default PaymentComponent;
