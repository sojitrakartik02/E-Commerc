import React from "react";
import AppLayout from "../../Compo/AppLayout/AppLayout";

import AdminMenu from "../../Compo/AppLayout/AdminMenu";

const Users = () => {
  return (
    <AppLayout title={"Dsahboard - Users"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>All Users</h1>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Users;
