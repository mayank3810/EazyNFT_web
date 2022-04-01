import NavbarTwo from "../components/Layout/NavbarTwo";
import PageBanner from "../components/Common/PageBanner";
import Footer from "../components/Layout/Footer";
import Copyright from "../components/Common/Copyright";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AddUser } from "../redux/actions/user";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const Register = (props) => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoader(true);

    let payload = {
      name: name,
      email: email,
      userName: email,
      password: password,
      walletAddress: Math.random(),
    };
    props
      .AddUser(payload)
      .then((res) => {
        toast.success("Registered successfully");
        router.push({
          pathname: "/login",
          query: { newAccount: true },
        });
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error("User registration failed");
        setLoader(false);
      });
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
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
                  <h3> Create Account </h3>
                  <div className="bar"></div>
                  <form
                    id="registerForm"
                    disabled={loader}
                    onSubmit={handleSubmit}
                  >
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label>Your Name</label>
                          <input
                            type="text"
                            onChange={handleName}
                            value={name}
                            name="name"
                            className="form-control"
                            required
                            data-error="Please Enter Your Username"
                          />
                        </div>
                      </div>

                      <div className="col-lg-12 ">
                        <div className="form-group">
                          <label>Email</label>
                          <input
                            type="email"
                            onChange={handleEmail}
                            value={email}
                            className="form-control"
                            required
                            name="email"
                            data-error="Please enter Email"
                          />
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-group">
                          <label>Password</label>
                          <input
                            className="form-control"
                            onChange={handlePassword}
                            value={password}
                            type="password"
                            name="password"
                          />
                        </div>
                      </div>

                      <div className="col-lg-12 col-md-12 text-center">
                        <button type="submit" className="default-btn">
                          {loader && (
                            <span>
                              {" "}
                              <i className="fa-spin ri-loader-2-line"></i>{" "}
                            </span>
                          )}
                          {!loader && <span> Register Now</span>}
                        </button>
                      </div>

                      <div className="col-12">
                        <div className="sub-title">
                          <span>Already have an Account?</span>
                        </div>
                      </div>
                      <div className="login-with-account">
                        <div className="col-lg-12 col-md-12 text-center">
                          <Link href="/login">
                            <a className="forget">Login Now?</a>
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
  return { userinfo: state.user };
};

const mapDispatchToProps = {
  AddUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);
