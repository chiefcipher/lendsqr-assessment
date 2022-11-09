import React, {  ReactElement, useEffect, useState } from "react";
import styles from "./DBUsers.module.scss";
import { Filter, initFilterType } from "../Filter/Filter";
import { User } from "./types";
import * as Assets from "./assets";
import axios, { AxiosError } from "axios";
import Users from "./Users";
import { useNavigate } from "react-router";
import { Seo } from "../Seo/Seo";
const {
  usersDashboard,
  stats,
  usersTableContainer,
  bottomFilter,
  actions,
  inactive,
  active,
  pending,
  blacklisted,
} = styles;

interface stat {
  value: string;
  label: string;
  icon: string;
}

const customButtonClass = [inactive, active, blacklisted, pending];
enum customButtonText {
  inactive = 0,
  active,
  blacklisted,
  pending,
}
// CUSTOM BUTTON TO RETURN PENDING, ACTIVE, BLACKLISTED OR INACTIVE STATUS
const Button = ({ index }: { index: number }) => {
  const determiner = index % 4;
  // 0 - inactive
  //1 -active
  //2 -blacklisted
  //3 -pending
  return (
    <button className={customButtonClass[determiner]}>
      {customButtonText[determiner]}
    </button>
  );
};
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

export const DBUsers = (): ReactElement => {
  const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
  const [users, setUsers] = useState<User[]>(storedUsers);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(storedUsers);
  const [viewsPerPage, setViewsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewActions, setViewActions] = useState(-1);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!users || users.length === 0) {
      axios
        .get("https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users")
        .then((res: GetUserResponse) => {
          const { data } = res;
          localStorage.setItem("users", JSON.stringify(data));
          setUsers(data);
          setFilteredUsers(data);
        })
        .catch((err: AxiosError) => console.log(err));
      // TODO ADD ERROR HANDLING
    }
  });
  // TOGGLES OPEN AND CLOSE FILTER PANEL
  const handleFilter = () => setShowFilter((x) => !x);
  // SETS VALUES FOR FILTER INPUT FIELEDS

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

  const activateFilter = (values: initFilterType) => {
    if (showFilter) {
      let newUsers = new Users(users)
        .orgName(values.orgName)
        .username(values.username)
        .email(values.email)
        .phoneNumber(values.phoneNumber);
      if (values.date) {
        // check if valid date before filter
        newUsers = newUsers.date(new Date(values.date));
      }

      setFilteredUsers(newUsers.users);
    }
  };

  const paginatedUsers = new Users(showFilter ? filteredUsers : users).paginate(
    viewsPerPage,
    currentPage - 1
  );

  // USE THIS TO DETERMINE BUTTONS AVAILABLE FOR FILTER
  const possiblePageNums = Math.round(users.length / viewsPerPage);
  return (
    <>
      <Seo title={"Users"} description="Users list" />
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
          {showFilter && <Filter activateFilter={activateFilter} />}
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
              {!paginatedUsers
                ? null
                : paginatedUsers.users.map((user, i) => (
                    <tr key={user.email + i}>
                      <td>{user.orgName}</td>
                      <td>{user.userName}</td>
                      <td>{user.email}</td>
                      <td>{user.phoneNumber}</td>
                      <td>{formatDate(user.createdAt)}</td>
                      <td>
                        <Button index={i} />
                      </td>
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
              onClick={() =>
                handleBackAndForwardBtn("forward", possiblePageNums)
              }
            >
              <img src={Assets.LeftCaretImg} alt="Forward" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
