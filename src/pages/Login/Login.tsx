import React, { useState } from "react";
import styles from "./Login.module.scss";
import { LendsqrLogo } from "../../shared/assets";
import LeftImg from "./assets/bannerLeftImg.svg";
import { Formik } from "formik";
import { useNavigate } from "react-router";
import { Icon } from "@iconify/react";
// desructure styles class names
const { login, leftImgs, rightForm } = styles;
interface FormikInitValues {
  email: string;
  password: string;
}
interface FormikActions {
  setSubmitting: (a: boolean) => void;
  resetForm: (a: object) => void;
}
const formikInitValues: FormikInitValues = {
  email: "",
  password: "",
};
// LOGIN COMPONENT
const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const [isPasswordInputType, setPasswordInputType] = useState(true);
  const handleSubmit = (
    values: FormikInitValues,
    { setSubmitting }: FormikActions
  ) => {
    setTimeout(() => {
      // SIMULATE API RESPONSE TIME
      setSubmitting(false);
      // navigate(A PROTECTED ROUTE)
      navigate("/dashboard/users");
      // resetForm(formikInitValues) /* MIGHT DO THIS */
    }, 3000);
  };
  return (
    <div className={login}>
        <img src={LendsqrLogo} alt="Lendsqr" />
      <div className={leftImgs}>
        <img src={LendsqrLogo} alt="Lendsqr" />
        <img src={LeftImg} alt="A colorful asset with lot of shapes" />
      </div>
      <div className={rightForm}>
        <h1>Welcome!</h1>
        <p>Enter details to login.</p>
        <Formik initialValues={formikInitValues} onSubmit={handleSubmit}>
          {({ handleChange, handleSubmit, isSubmitting, values }) => {
            return (
              <form onSubmit={handleSubmit}>
                <input
                  type={"email"}
                  name={"email"}
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                />
                <input
                  name={"password"}
                  type={isPasswordInputType ? "password" : "text"}
                  value={values.password}
                  placeholder="Password"
                  onChange={handleChange}
                />
                <span onClick={() => setPasswordInputType((prevV) => !prevV)}>
                  Show
                </span>
                <button type="button">Forgot PASSWORD?</button>
                <button type="submit" disabled={isSubmitting}>
                  <span>Login</span>
                  {isSubmitting && 
                  <Icon icon="fa6-solid:spinner" />
                  }
                </button>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
