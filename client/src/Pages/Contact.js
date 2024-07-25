import React from "react";
import AppLayout from "../Compo/AppLayout/AppLayout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <AppLayout title={"Contact US"}>
      <div className="row contactus" style={{ marginTop: "20px" }}>
        <div className="col-md-6">
          <img src="/images/contactus.jpeg" style={{ width: "100%" }} />
        </div>
        <div className="col-md-6">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            any quiery and info aboout product feel free to call anytime 24*7
            avalibale
          </p>
          <p className="mt-3">
            <BiMailSend /> :kartiksojitra77@gmail.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> :7043468230
          </p>
          <p className="mt-3">
            <BiSupport /> :1800-000-000 (toll free)
          </p>
        </div>
      </div>
    </AppLayout>
  );
};

export default Contact;
