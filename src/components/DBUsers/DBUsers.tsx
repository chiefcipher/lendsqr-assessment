import React, { ReactElement } from "react";
import styles from "./DBUsers.module.scss";
import UsersImg from "./assets/users.svg";
import LoanUsersImg from "./assets/loanUsers.svg";
import ActiveUsersImg from "./assets/activeUsers.svg";
import SavingsUsersImg from "./assets/savingsUsers.svg";
const { usersDashboard, stats } = styles;
interface stat {
  value: string;
  label: string;
  icon: string;
}
const Stat = ({ value, icon, label }: stat) => {
  return (
    <div>
      <img src={icon} alt={label} />
      <h4>{label}</h4>
      <p>{value}</p>
    </div>
  );
};
export const DBUsers = (): ReactElement => {
  return (
    <div className={usersDashboard}>
      <h1>Users</h1>
      <div className={stats}>
        <Stat label="Users" value={"2,453"} icon={UsersImg} />
        <Stat label="Active Users" value={"2,453"} icon={ActiveUsersImg} />
        <Stat label="Users with loans" value={"12,453"} icon={LoanUsersImg} />
        <Stat
          label="Users with savings"
          value={"2,453"}
          icon={SavingsUsersImg}
        />
      </div>
    </div>
  );
};
