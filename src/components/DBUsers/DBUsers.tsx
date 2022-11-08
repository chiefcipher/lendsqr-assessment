import React, { ReactElement, useEffect, useState } from "react";
import styles from "./DBUsers.module.scss";

import { Education, Guarantor, Profile, Socials } from "./types";
import * as Assets from "./assets";
import axios from "axios";
const { usersDashboard, stats, usersTableContainer } = styles;

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

type User = {
  accountBalance: string;
  accountNumber: string;
  createdAt: string;
  education: Education;
  guarantor: Guarantor;
  email : string , 
  id: string;
  lastActiveDate: string;
  orgName: string;
  phoneNumber: string;
  profile: Profile;
  socials: Socials;
  userName: string;
};

type GetUserResponse = {
  data: User[];
};
export const DBUsers = (): ReactElement => {
  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    if (!users) {
      axios
        .get("https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users")
        .then((res: GetUserResponse) => {
          const { data } = res;
          setUsers(data);
        })
        .catch((err) => console.log(err));
      // TODO ADD ERROR HANDLING
    }
  });
  console.log(users);
  return (
    <div className={usersDashboard}>
      <h1>Users</h1>
      <div className={stats}>
        <Stat label="Users" value={"2,453"} icon={Assets.UsersImg} />
        <Stat label="Active Users" value={"2,453"} icon={Assets.ActiveUsersImg} />
        <Stat label="Users with loans" value={"12,453"} icon={Assets.LoanUsersImg} />
        <Stat
          label="Users with savings"
          value={"2,453"}
          icon={Assets.SavingsUsersImg}
        />
      </div>
      <div className={usersTableContainer}>
        <table>
          <thead>
            <tr>
              <th>
                <span>Orgnization</span>
                <img src={Assets.FilterImg} alt="Filter" />
              </th>

              <th>
                <span>Username</span>
                <img src={Assets.FilterImg} alt="Filter" />
              </th>
              <th>
                <span>Email</span>
                <img src={Assets.FilterImg} alt="Filter" />
              </th>
              <th>
                <span>Date Joined</span>
                <img src={Assets.FilterImg} alt="Filter" />
              </th>
              <th>
                <span>Status</span>
                <img src={Assets.FilterImg} alt="Filter" />
              </th>
            </tr>
          </thead>
          <tbody>
            
            {!users ? null :  users.map((user, i) => (
              <tr key={user.email + i}>
                <td>{user.orgName}</td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.createdAt}</td>
                <td>{user.status}</td>
                <td>{user.status}</td>
              </tr>
            ))
            } 
            
          </tbody>
        </table>
      </div>
    </div>
  );
};
