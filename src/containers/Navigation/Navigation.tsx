import React, { ReactElement } from "react";
import styles from "./Navigation.module.scss";
import { Icon } from "@iconify/react";
import UserImg from "./assets/lady.png";
import ExpandImg from "./assets/vector.svg";
const { nav, searchBox, rightPart } = styles;
import { LendsqrLogo } from "../../shared/assets";
// TYPICALLY USER IMAGE AND NAME WILL COME FROM API
const Navigation = (): ReactElement => {
  return (
    <nav className={nav}>
      <img src={LendsqrLogo} alt="Lengsqr" />
      <p className={searchBox}>
        <input type={"text"} placeholder={"Search for anything"} />
        <button type="button">
          <Icon icon="ant-design:search-outlined" />
        </button>
      </p>
      <div className={rightPart}>
        <a href="/#">Docs</a>
        <Icon icon="clarity:notification-line" />
        <img src={UserImg} alt={"user"} />
        <p>
          <span>Adedeji</span>
          <img src={ExpandImg} alt="Open" />
        </p>
      </div>
    </nav>
  );
};

export default Navigation;
