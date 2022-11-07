import React, { ReactElement } from "react";
import styles from "./Dashboard.module.scss";
import Navigation from "../../containers/Navigation/Navigation";
import DBSidebar from "../../components/DBSidebar/DBSidebar";
import { Routes, Route } from "react-router";
import { DBUsers } from "../../components/DBUsers/DBUsers";
const { dashboard } = styles;

const Dashboard = (): ReactElement => {
  return (
    <>
      <Navigation />
      <div className={dashboard}>
        <DBSidebar />
        {/* TODO DB MAIN AREA COMES HERE TOO  */}
        <Routes>
          <Route path="/users" element={<DBUsers />} />
          <Route path="*" element={<h2>Coming soon</h2>} />
        </Routes>
      </div>
    </>
  );
};

export default Dashboard;
