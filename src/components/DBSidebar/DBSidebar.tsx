import React, { ReactElement } from "react";
import {  NavLink } from "react-router-dom";
import styles from "./DBSidebar.module.scss";
import * as Icons from "./assets/index";

const { dbsidebar } = styles;
interface btnInterface {
  text: string;
  icon: string;
  url: string;
}
// modified sidebar anchor
const A = ({ text, url, icon }: btnInterface): ReactElement => {
  return (
    <NavLink to={url}>
      <img src={icon} alt={text} />
      <span>{text}</span>
    </NavLink>
  );
};
const DBSidebar = (): ReactElement => {
  return (
    <div className={dbsidebar}>
      <h2>
        <img src={Icons.OrganizationImg} alt="Switch Organization" />
        <span>Switch Organization</span>
        <img src={Icons.VeeImg} alt="Switch" />
      </h2>
      <h3>
        <img src={Icons.DashboardImg} alt="Dashboard" />
        <span>Dashboard</span>
      </h3>
      <h4>Customers</h4>
      <A text={"Users"} icon={Icons.UsersImg} url={"users"} />
      <A text={"Guarantors"} icon={Icons.GuarantorsImg} url={"guarantors"} />
      <A text={"Loans"} icon={Icons.LoansImg} url={"loans"} />
      <A text={"Decision Models"} icon={Icons.DecisionImg} url={"decision"} />
      <A text={"Savings"} icon={Icons.SavingsImg} url={"savings"} />
      <A text={"Loan Requests"} icon={Icons.LoanReqImg} url={"request-loan"} />
      <A text={"Whitelist"} icon={Icons.WhitelistImg} url={"whitelist"} />
      <A text={"Karma"} icon={Icons.KarmaImg} url={"karma"} />
      <h4>BUSINESSES</h4>

      <A
        text={"Organization"}
        icon={Icons.OrganizationImg}
        url={"organization"}
      />
      <A text={"Loan Products"} icon={Icons.LoanReqImg} url={"loan-products"} />
      <A
        text={"Savings Products"}
        icon={Icons.SavingsImg}
        url={"savings-products"}
      />

      <A text={"Fees and Charges"} icon={Icons.FeesImg} url={"fees"} />

      <A
        text={"Transactions"}
        icon={Icons.TransactionsImg}
        url={"transactions"}
      />

      <A text={"Services"} icon={Icons.ServicesImg} url={"services"} />

      <A
        text={"Service Account"}
        icon={Icons.ServiceAccImg}
        url={"service-account"}
      />

      <A text={"Settlements"} icon={Icons.SettlementImg} url={"settlements"} />
      <A text={"Reports"} icon={Icons.ReportsImg} url={"reports"} />
      <h4>Settings</h4>
      <A text={"Preferences"} icon={Icons.PreferencesImg} url={"preferences"} />
      <A text={"Fees and Pricing"} icon={Icons.PricingImg} url={"pricing"} />
      <A text={"Audit Logs"} icon={Icons.AuditLogsImg} url={"audit"} />
    </div>
  );
};

export default DBSidebar;
