import React, { ReactElement } from "react";
import styles from "./Dashboard.module.scss";
import Navigation from "../../containers/Navigation/Navigation";

const Dashboard = (): ReactElement => {
  return (
    <>
      <Navigation />
      <div></div>
    </>
  );
};

export default Dashboard;
