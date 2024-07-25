import React from "react";
import AppLayout from "../Compo/AppLayout/AppLayout";

const Policy = () => {
  return (
    <AppLayout title={"Private Policy"}>
      <div className="row contactus" style={{ marginTop: "20px" }}>
        <div className="col-md-6">
          <img src="/images/contactus.jpeg" style={{ width: "100%" }} />
        </div>
        <div className="col-md-4">
          <p>add privacy policy</p>
          <p>add privacy policy</p>
          <p>add privacy policy</p>
          <p>add privacy policy</p>
          <p>add privacy policy</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default Policy;
