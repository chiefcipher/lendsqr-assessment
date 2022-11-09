import React, { ReactElement, useEffect, useState } from "react";
import styles from "./DBViewUser.module.scss";
import { User } from "./types";
import * as Assets from "./assets";
import axios, { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router";
import { Seo } from "../Seo/Seo";
const {
  userDashboard,
  header,
  topView,
  information,
  container,
  row,
  topViewMains,
  topViewBtns,
} = styles;

type GetUserResponse = {
  data: User;
};

// dahsboard view user
export const DBViewUser = (): ReactElement => {
  const [user, setUser] = useState<User>();

  const navigate = useNavigate();
  const { id } = useParams();
  console.log(user);
  useEffect(() => {
    if (!user) {
      axios
        .get(
          `https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users/${id}`
        )
        .then((res: GetUserResponse) => {
          const { data } = res;
          setUser(data);
        })
        .catch((err: AxiosError) => console.log(err));
      // TODO ADD ERROR HANDLING
    }
  });

  return (
    <>
<Seo  
title={`Viewing ${user?.profile.firstName} ${user?.profile.lastName}`}
description={`View detailed user page`}
/>
    <div className={userDashboard}>
      <div className={header}>
        <p onClick={() => navigate(-1)}>
          <img src={Assets.BackArrImg} alt="Back" />
          <span>Back to Users</span>
        </p>
        <p>
          <span>User Details</span>
          <button>blacklist user</button>
          <button>Activate user</button>
        </p>
      </div>
      <div className={topView}>
        <div className={topViewMains}>
          <div>
            <img src={user?.profile.avatar} alt={user?.userName} />
            <p>
              <span>
                {user?.profile.firstName} {user?.profile.lastName}
              </span>
              <span>{user?.accountNumber}</span>
            </p>
          </div>
          <div>
            <span>User’s Tier</span>
            <p>
              <img src={Assets.FilledStar} alt="Filled star" />
              <img src={Assets.TransparetStar} alt="No star" />
              <img src={Assets.TransparetStar} alt="No star" />
            </p>
          </div>
          <div>
            <span> ₦{user?.accountBalance}</span>

            <span>{user?.accountNumber}/Providus bank</span>
          </div>
        </div>
        <div className={topViewBtns}>
          {/* this buttons would navigate to /route and implement ui eventually */}
          <button>General Details</button>
          <button>Documents</button>
          <button>Loans</button>
          <button>Savings</button>
          <button>App and system</button>
        </div>
      </div>
      <div className={information}>
        <h2>Personal Information</h2>
        <div className={container}>
          {/* CONTAINERS FOR PERSONAL INFO */}
          <div className={row}>
            {/* TODO CONVERT TO GRID */}
            <p>
              <span>Full name</span>
              <span>{`${user?.profile.lastName} ${user?.profile.firstName}`}</span>
            </p>

            <p>
              <span>phone number</span>
              <span>{user?.phoneNumber}</span>
            </p>
            <p>
              <span>email address</span>
              <span>{user?.email}</span>
            </p>
            <p>
              <span>bvn</span>
              <span>{user?.profile.bvn}</span>
            </p>
            <p>
              <span>gender</span>
              <span>{user?.profile.gender}</span>
            </p>
          </div>

          <div className={row}>
            <p>
              <span>marital status</span>
              <span>{"Maried"}</span>
              {/* NO API FIELD FOR MARITAL STATUS */}
            </p>
            <p>
              <span>children</span>
              <span>None</span>
              {/* NO API FIELD FOR CHILDREN */}
            </p>
            <p>
              <span>Type of residence</span>
              <span>Parent’s Apartment</span>
              {/* NO TYPE OF RESIDENCE FIELD FROM API RESPONSE */}
            </p>
          </div>
        </div>

        <h2>Education and Employment</h2>
        <div className={container}>
          {/* CONTAINER FOR EDUCATION & EPLOYMENT */}
          <div className={row}>
            <p>
              <span>level of education</span>
              <span>{user?.education.level}</span>
            </p>
            <p>
              <span>employment status</span>
              <span>{user?.education.employmentStatus}</span>
            </p>
            <p>
              <span>sector of employment</span>
              <span>{user?.education.sector}</span>
            </p>
            <p>
              <span>Duration of employment</span>
              <span>{user?.education.duration}</span>
            </p>
          </div>
          {/* TODO ADD FAVICON */}
          <div className={row}>
            <p>
              <span>office email</span>
              <span>{user?.education.officeEmail}</span>
            </p>
            <p>
              <span>Monthly income</span>
              <span>
                {user?.education.monthlyIncome[0]}-
                {user?.education.monthlyIncome[1]}
              </span>
            </p>
            <p>
              <span>loan repayment</span>
              <span>{user?.education.loanRepayment}</span>
            </p>
          </div>
        </div>

        <h2>Socials</h2>
        <div className={container}>
          {/* CONTAINER FOR SOCIALS */}
          <div className={row}>
            <p>
              <span>twitter</span>
              <span>{user?.socials.twitter}</span>
            </p>
            <p>
              <span>facebook</span>
              <span>{user?.socials.facebook}</span>
            </p>
            <p>
              <span>instagram</span>
              <span>{user?.socials.instagram}</span>
            </p>
          </div>
        </div>

        <h2>Guarantor</h2>
        <div className={container}>
          {/* CONTAINER FOR guarantor */}
          <div className={row}>
            <p>
              <span>full name</span>
              <span>{`${user?.guarantor.firstName} ${
                user?.guarantor.lastName || ""
              }`}</span>
            </p>
            <p>
              <span>phone number</span>
              <span>{user?.guarantor.phoneNumber}</span>
            </p>
            <p>
              <span>email address</span>
              <span>{user?.guarantor.address}</span>
            </p>
            <p>
              <span>relationship</span>
              <span>Sibling</span>
              {/* NO RELATIONSHIP IN GUARANTOR FIELD FROM API RESPONSE */}
            </p>
          </div>
        </div>
      </div>
    </div>

    </>

  );
};
