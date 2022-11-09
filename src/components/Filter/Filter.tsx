import React, { useState, ChangeEvent } from "react";
import styles from "./Filter.module.scss";
export type initFilterType = {
  orgName: string;
  username: string;
  email: string;
  date: string;
  phoneNumber: string;
  status: string;
};
const initFilter: initFilterType = {
  orgName: "",
  username: "",
  email: "",
  date: "",
  phoneNumber: "",
  status: "",
};
type filterProps = {
  activateFilter: (a: initFilterType) => void;
};
export const Filter = ({ activateFilter }: filterProps) => {
  const [filterValues, setFilterValues] = useState(initFilter);
  
  const handleFilterChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setFilterValues((prevValues) => ({
      ...prevValues,
      beginFilter: false,
      [e?.target.name || "none"]: e?.target.value,
    }));
  };
  return (
    <div className={styles.filter}>
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
          <option value="Tempore-Laudantium-Aut">Tempore-Laudantium-Aut</option>
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
        <button onClick={() => activateFilter(filterValues)}>Filter</button>
      </p>
    </div>
  );
};
