import NavbarTwo from "../components/Layout/NavbarTwo";
import PageBanner from "../components/Common/PageBanner";
import Footer from "../components/Layout/Footer";
import Copyright from "../components/Common/Copyright";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setInfo } from "../redux/actions/main";
import { LoginUser } from "../redux/actions/user";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const { userinfo, LoginUser } = props;

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoader(true);
    LoginUser(email, password)
      .then((res) => {
        if (res.data && res.data.userRole) {
          router.push("/home");
        } else {
          toast.error(res.msg);
        }
        setLoader(false);
      })
      .catch((err) => {
        toast.error("Login Failed");
        setLoader(false);
      });
  };

  return (
    <>
      <NavbarTwo />

      <div className="user-area pt-100 pb-70">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="user-all-form">
                <div className="contact-form">
                  {router.query && router.query.newAccount && (
                    <div style={{ paddingBottom: "30px" }}>
                      <div className="alert alert-success" role="alert">
                        Your account is registered successfully.
                      </div>
                    </div>
                  )}

                  <h3> Log In Now</h3>
                  <form
                    id="loginForm"
                    disabled={loader}
                    onSubmit={handleSubmit}
                  >
                    <div className="row">
                      <div className="col-lg-12 ">
                        <div className="form-group">
                          <label>Email</label>
                          <input
                            type="text"
                            name="name"
                            onChange={handleEmail}
                            value={email}
                            id="name"
                            className="form-control"
                            required
                            data-error="Please enter your Username or Email"
                          />
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-group">
                          <label>Password</label>
                          <input
                            onChange={handlePassword}
                            value={password}
                            className="form-control"
                            type="password"
                            name="password"
                          />
                        </div>
                      </div>

                      <div className="col-lg-12 form-condition">
                        <div className="agree-label">
                          <input type="checkbox" id="chb1" />
                          <label htmlFor="chb1">
                            Remember Me
                            <Link href="/forgot-password">
                              <a className="forget">Forgot My Password?</a>
                            </Link>
                          </label>
                        </div>
                      </div>

                      <div className="col-lg-12 col-md-12 text-center">
                        <div></div>
                        <button
                          type="submit"
                          disabled={loader}
                          className="default-btn"
                        >
                          {loader && (
                            <span>
                              {" "}
                              <i className="fa-spin ri-loader-2-line"></i>{" "}
                            </span>
                          )}
                          {!loader && <span> Log In Now </span>}
                        </button>
                      </div>

                      <div className="col-12">
                        <div className="sub-title">
                          <span>Do not have account with us?</span>
                        </div>
                      </div>

                      <div className="login-with-account">
                        <div className="col-lg-12 col-md-12 text-center">
                          <Link href="/register">
                            <a className="forget">Register Now?</a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <Copyright />
    </>
  );
};

const mapStateToProps = (state) => {
  return { name: state.main.name, userinfo: state.user };
};

const mapDispatchToProps = {
  setInfo,
  LoginUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
