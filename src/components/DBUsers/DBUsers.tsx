import React, { ChangeEvent, ReactElement, useEffect, useState } from "react";
import styles from "./DBUsers.module.scss";

import { User } from "./types";
import * as Assets from "./assets";
import axios, { AxiosError } from "axios";
import Users from "./Users";
import { useNavigate } from "react-router";
import { boolean } from "yup";
const {
  usersDashboard,
  stats,
  usersTableContainer,
  bottomFilter,
  actions,
  filter,
} = styles;

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

type GetUserResponse = {
  data: User[];
};

const months = [
  "Jan",
  "Feb",
  "Mar ",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
// FORMAT DATE ACCORDING TO UI
const formatDate = (date: Date): string => {
  const inputDate = new Date(date);
  const mm = months[inputDate.getMonth()];
  const dd = inputDate.getDate();
  const yyyy = inputDate.getFullYear();
  const minutes = inputDate.getMinutes();
  const hh = inputDate.getHours();
  const timeUnit = hh >= 12 ? "PM" : "AM";
  const hours = hh >= 12 ? hh - 12 : hh;
  return `${mm} ${dd}, ${yyyy} ${hours}:${minutes} ${timeUnit}`;
};
type initFilterType = {
  orgName: string;
  username: string;
  email: string;
  date: string;
  phoneNumber: string;
  status: string;
  beginFilter: boolean;
};
const initFilter: initFilterType = {
  orgName: "",
  username: "",
  email: "",
  date: "",
  phoneNumber: "",
  status: "",
  beginFilter: false,
};
export const DBUsers = (): ReactElement => {
  const [users, setUsers] = useState<User[]>([]);
  const [viewsPerPage, setViewsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewActions, setViewActions] = useState(-1);
  const [showFilter, setShowFilter] = useState(false);
  const [filterValues, setFilterValues] = useState(initFilter);
  const navigate = useNavigate();
  useEffect(() => {
    if (!users || users.length === 0) {
      axios
        .get("https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users")
        .then((res: GetUserResponse) => {
          const { data } = res;
          setUsers(data);
        })
        .catch((err: AxiosError) => console.log(err));
      // TODO ADD ERROR HANDLING
    }
  });
  // TOGGLES OPEN AND CLOSE FILTER PANEL
  const handleFilter = () => setShowFilter((x) => !x);
  // SETS VALUES FOR FILTER INPUT FIELEDS
  const handleFilterChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setFilterValues((prevValues) => ({
      ...prevValues,
      beginFilter:false,
      [e?.target.name || "none"]: e?.target.value,
    }));
  };
  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { dataset } = event.target as HTMLButtonElement;
    const pagenum = dataset.pagenum;
    setCurrentPage(Number(pagenum));
  };

  const handleBackAndForwardBtn = (
    method: string,
    possiblePageNums: number
  ) => {
    if (!["back", "forward"].includes(method)) {
      throw new Error("Invalid method");
    }
    if (method === "back" && currentPage - 1 > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
    if (method === "forward" && currentPage + 1 <= possiblePageNums) {
      setCurrentPage((prevPage) => prevPage + 1);

      return;
    }
  };



  let filteredUsers = new Users(users).paginate(viewsPerPage, currentPage - 1);
  if (filterValues.beginFilter) {
    filteredUsers = filteredUsers
      .orgName(filterValues.orgName)
      .username(filterValues.username)
      .email(filterValues.email)
      .phoneNumber(filterValues.phoneNumber)
      .date(new Date(filterValues.date));
  }
  // USE THIS TO DETERMINE BUTTONS AVAILABLE FOR FILTER
  const possiblePageNums = Math.round(length / viewsPerPage);
  return (
    <div className={usersDashboard}>
      <h1>Users</h1>
      <div className={stats}>
        <Stat label="Users" value={"2,453"} icon={Assets.UsersImg} />
        <Stat
          label="Active Users"
          value={"2,453"}
          icon={Assets.ActiveUsersImg}
        />
        <Stat
          label="Users with loans"
          value={"12,453"}
          icon={Assets.LoanUsersImg}
        />
        <Stat
          label="Users with savings"
          value={"2,453"}
          icon={Assets.SavingsUsersImg}
        />
      </div>
      <div className={usersTableContainer}>
        {showFilter && (
          <div className={filter}>
            <p>
              <span>Organization</span>
              <select
                
                name={"orgName"}
                value={filterValues.orgName}
                onChange={handleFilterChange}
              >
                {/*
                 OPTIONS ARE SOME VALID ORGNIZATION FROM API RESPONSE 
                  THEY TYPICALLY WOULD BE QUERIED FROM ANOTER ENDPOINT 
                  */}
                <option value="" disabled>
                  Select
                </option>
                <option value="Aliquam-Velit-Ab">Aliquam-Velit-Ab</option>
                <option value="Labore-Dolor-Et">Labore-Dolor-Et</option>
                <option value="Accusamus-Minima-Repudiandae">
                  Accusamus-Minima-Repudiandae
                </option>
                <option value="Natus-Harum-Unde">Natus-Harum-Unde</option>
                <option value="Quas-Et-Ut">Quas-Et-Ut</option>
                <option value="Accusantium-Voluptatem-Voluptate">
                  Accusantium-Voluptatem-Voluptate
                </option>
                <option value='Tempore-Laudantium-Aut'>Tempore-Laudantium-Aut</option>
              </select>
            </p>

            <p>
              <span>Username</span>
              <input
                type="text"
                name="username"
                value={filterValues.username}
                placeholder="User"
                onChange={handleFilterChange}
              />
            </p>
            <p>
              <span>Email</span>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={filterValues.email}
                onChange={handleFilterChange}
              />
            </p>
            <p>
              <span>Date</span>
              <input
                type="date"
                placeholder="Date"
                name="date"
                value={filterValues.date}
                onChange={handleFilterChange}
              />
            </p>

            <p>
              <span>Phone Number</span>
              <input
                type="tel"
                placeholder="Phone Number"
                value={filterValues.phoneNumber}
                name="phoneNumber"
                onChange={handleFilterChange}
              />
            </p>

            <p>
              <span>Status</span>
              <select
                
                name="status"
                value={filterValues.status}
                onChange={handleFilterChange}
              >
                {/*
                 OPTIONS ARE SOME VALID ORGNIZATION FROM API RESPONSE 
                  THEY TYPICALLY WOULD BE QUERIED FROM ANOTER ENDPOINT 
                  */}
                <option value="" disabled>
                  Select
                </option>
                <option value="pending">Pending</option>
                <option value="blacklisted">Blacklisted</option>
                <option value="inactive">Inactive</option>
                <option value="active">Active</option>
              </select>
            </p>
            <p>
              <button onClick={() => setFilterValues(initFilter)}>Reset</button>
              <button
                onClick={() =>
                  setFilterValues((prev) => ({
                    ...prev,
                    beginFilter: true,
                  }))
                }
              >
                Filter
              </button>
            </p>
          </div>
        )}
        <table>
          <thead>
            <tr>
              <th>
                <span>Orgnization</span>
                <img
                  src={Assets.FilterImg}
                  alt="Filter"
                  onClick={handleFilter}
                />
              </th>

              <th>
                <span>Username</span>
                <img
                  src={Assets.FilterImg}
                  onClick={handleFilter}
                  alt="Filter"
                />
              </th>
              <th>
                <span>Email</span>
                <img
                  onClick={handleFilter}
                  src={Assets.FilterImg}
                  alt="Filter"
                />
              </th>
              <th>
                <span>Phone Number</span>
                <img
                  onClick={handleFilter}
                  src={Assets.FilterImg}
                  alt="Filter"
                />
              </th>
              <th>
                <span>Date Joined</span>
                <img
                  onClick={handleFilter}
                  src={Assets.FilterImg}
                  alt="Filter"
                />
              </th>
              <th>
                <span>Status</span>
                <img
                  onClick={handleFilter}
                  src={Assets.FilterImg}
                  alt="Filter"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {!filteredUsers
              ? null
              : filteredUsers.users.map((user, i) => (
                  <tr key={user.email + i}>
                    <td>{user.orgName}</td>
                    <td>{user.userName}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{formatDate(user.createdAt)}</td>
                    <td>{"pending"}</td>
                    <td>
                      <img
                        src={Assets.VerticalEmpisesImg}
                        onClick={() => setViewActions(i)}
                        alt="Option"
                      />
                      {viewActions === i && (
                        <div className={actions}>
                          <p onClick={() => navigate(`${user.id}`)}>
                            <img src={Assets.ViewImg} alt="view user" />
                            <span>View Details </span>
                          </p>
                          <p>
                            <img src={Assets.BlacklistImg} alt="view user" />
                            <span>Blacklist User </span>
                          </p>
                          <p>
                            <img src={Assets.ActivateImg} alt="view user" />
                            <span>Activate User</span>
                          </p>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      <div className={bottomFilter}>
        <div>
          {/* LEFT PART  */}
          <span>Showing</span>
          <select
            name="filter"
            value={viewsPerPage}
            onChange={(e) => setViewsPerPage(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span>{`out of ${length}`}</span>
        </div>
        <div>
          {/* RIGHT PART */}
          <button
            onClick={() => handleBackAndForwardBtn("back", possiblePageNums)}
          >
            <img src={Assets.LeftCaretImg} alt="Back" />
          </button>

          {[...Array(possiblePageNums)].map((_, index) => (
            <button
              data-pagenum={index + 1}
              key={"filterBtn" + index}
              onClick={handlePageChange}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handleBackAndForwardBtn("forward", possiblePageNums)}
          >
            <img src={Assets.LeftCaretImg} alt="Forward" />
          </button>
        </div>
      </div>
    </div>
  );
};
