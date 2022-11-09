import React, { ReactElement } from "react";
import styles from "./Dashboard.module.scss";
import Navigation from "../../containers/Navigation/Navigation";
import DBSidebar from "../../components/DBSidebar/DBSidebar";
import { Routes, Route, Navigate } from "react-router";
import { DBUsers } from "../../components/DBUsers/DBUsers";
import { DBViewUser } from "../../components/DBViewUser/DBViewUser";
const { dashboard } = styles;

const Dashboard = (): ReactElement => {
  return (
    <>
      <Navigation />
      <div className={dashboard}>
        <DBSidebar />
        {/* MAIN AREA   */}
        <Routes>
        <Route path="/users" element={<DBUsers />} />
          <Route path="/users/:id" element={<DBViewUser />} />
          <Route path='/' element={<Navigate to='users' />} />
          <Route path="*" element={<h2>Coming soon or 404 not found</h2>} />
        </Routes>
      </div>
    </>
  );
};

export default Dashboard;
