import React, { useState, useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import axios from "axios";
import {
  UpdateUser,
  sendEmailOtp,
  getAllUsers,
} from "../../../redux/actions/user";
import { walletShotener } from "../../../utils/wallet";
import API from "../../../services/API";

const AuthorProfile = (props) => {
  const router = useRouter();

  const [buyer, setBuyer] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [aboutme, setAboutme] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [displayPicURL, setDisplayPicURL] = useState("");
  const [emailVerified, setIsEmailVerified] = useState(false);
  const [isVerified, setisVerified] = useState(false);
  const [isEmailVerified, setisEmailVerified] = useState(false);
  const [isActive, setisActive] = useState(false);
  const inputFile = useRef(null);
  const btnUpload = useRef(null);
  const walletAddress = router?.query?.index;

  useEffect(() => {
    let user = props.userinfo.user;
    if (walletAddress) {
      getUserDetails(walletAddress);
    }
  }, [walletAddress]);

  const getUserDetails = async (walletAddress) => {
    const _user = await API.adminGetUser(walletAddress);
    if (_user?.data) {
      const user = _user?.data;
      setBuyer(user);
      setName(user.name);
      setEmail(user.email);
      setMobileNumber(user.mobileNumber);
      setAboutme(user.aboutUser);
      setDisplayPicURL(user.profilePic);
      setIsEmailVerified(user.isEmailVerified);
      setisVerified(user?.isVerified);
      setisEmailVerified(user?.isEmailVerified);
      setisActive(user?.isActive);

      try {
        API.checkEmailVerified(user.email)
          .then((response) => {
            if (response.data) {
              setIsEmailVerified(response.data.isEmailVerified);
            }
          })
          .catch((m) => {
            setIsEmailVerified(false);
          });
      } catch (error) {
        setIsEmailVerified(false);
      }
    }
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      let payload = {
        name: name,
        email: email,
        userName: name,
        mobileNumber: mobileNumber,
        aboutUser: aboutme,
        walletAddress: props?.userinfo?.user?.walletAddress,
        signature: props?.userinfo?.user?.signature,
        userWalletAddress: walletAddress,
        isVerified,
        isEmailVerified,
        isActive,
      };
      let response = await API.adminUpdateUser(payload);
      getUserDetails(walletAddress);
      toast.success("User updated successfully");
    } catch (error) {
      toast.error("User update failed");
    }
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleAboutme = (e) => {
    setAboutme(e.target.value);
  };

  const handleMobileNumber = (e) => {
    setMobileNumber(e.target.value);
  };

  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };

  const verifyEmail = (e) => {
    e.preventDefault();

    let payload = {
      email: email,
    };
    props
      .sendEmailOtp(payload)
      .then((res) => {
        toast.success("Please check your inbox for verification link.");
      })
      .catch((error) => {
        toast.error("Failed to send the email. Please try again.");
      });
  };

  const uploadAction = async (e) => {
    e.preventDefault(); // Stop form submit
    try {
      let response = await fileUpload();
      let payload = {
        walletAddress: props?.userinfo?.user?.walletAddress,
        signature: props?.userinfo?.user?.signature,
        userWalletAddress: walletAddress,
        profilePic:
          process.env.NEXT_PUBLIC_IMAGE_URL + response.data.data.fileName,
      };
      await API.adminUpdateUser(payload);
      getUserDetails(walletAddress);
      setSelectedFile(null);
      toast.success("User profile update successfully");
    } catch (error) {
      toast.error("User update failed");
    }
  };

  const fileUpload = () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/general/uploadImage`;
    const formData = new FormData();
    formData.append("file", selectedFile);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return axios.post(url, formData, config);
  };

  const handleImage = (media) => {
    setSelectedFile(media);
    setDisplayPicURL(URL.createObjectURL(media));
  };

  return (
    <>
      {buyer && (
        <>
          <div className="discover-area pt-50 pb-70">
            <div className="container">
              <div className="section-title">
                <h2>(Admin) Update Profile</h2>
              </div>
              <div className="row pt-45">
                <div className="col-lg-3">
                  <div className="author-profile-sidebar  mr-20">
                    <div className="author-user">
                      <div
                        className="author-user"
                        style={{ cursor: "pointer" }}
                        onClick={onButtonClick}
                      >
                        {displayPicURL && (
                          <img src={displayPicURL} alt="Profile image" />
                        )}

                        {!displayPicURL && (
                          <img
                            src="../images/profile-picture.webp"
                            alt="Profile image"
                          />
                        )}
                      </div>
                      <form onSubmit={uploadAction}>
                        <input
                          type="file"
                          accept=".jpeg,.png,.jpg"
                          ref={inputFile}
                          style={{ visibility: "hidden" }}
                          name="fileName"
                          onChange={(e) => handleImage(e.target.files[0])}
                        />

                        <div className="text-center">
                          {selectedFile !== null && (
                            <button ref={btnUpload} className="btn btn-primary">
                              Set profile picture
                            </button>
                          )}
                        </div>
                      </form>
                    </div>

                    <div className="text-center">
                      <h3 style={{ marginTop: "0px" }}>
                        <a>{buyer?.name || "Unnamed"}</a>
                      </h3>
                      {buyer.username && <span>@{buyer.username}</span>}
                      <p>Wallet: {walletShotener(buyer.walletAddress)}</p>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                      <span>Active:</span>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={isActive}
                          onClick={() => setisActive(!isActive)}
                        />
                        <span className="slider round"></span>
                      </label>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Verified:</span>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={isVerified}
                          onClick={() => setisVerified(!isVerified)}
                        />
                        <span className="slider round"></span>
                      </label>
                    </div>
                    {buyer?.email && (
                      <div className="d-flex justify-content-between">
                        <span>Email Verified:</span>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={isEmailVerified}
                            onClick={() => setisEmailVerified(!isEmailVerified)}
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                <>
                  <div className="col-lg-9">
                    <div className="contact-form">
                      <div className="bar"></div>
                      <form id="contactForm" onSubmit={handleSubmit}>
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

                          <div className="col-lg-12">
                            <div className="form-group">
                              <label>Phone number</label>
                              <input
                                type="text"
                                value={mobileNumber ? mobileNumber : ""}
                                onChange={handleMobileNumber}
                                name="mobileNumber"
                                className="form-control"
                              />
                            </div>
                          </div>

                          <div className="col-lg-12">
                            <div className="form-group">
                              <label>About me</label>
                              <textarea
                                type="text"
                                value={aboutme}
                                onChange={handleAboutme}
                                name="aboutme"
                                className="form-control"
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
                          {/* <div className="col-lg-12 text-right">
                            {!emailVerified && (
                              <button
                                onClick={verifyEmail}
                                className="btn btn-sm float-right verify-email text-danger btn-link"
                              >
                                Verify your email
                              </button>
                            )}
                          </div> */}

                          <div className="col-lg-12 col-md-12 text-center">
                            <button type="submit" className="default-btn">
                              Save
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return { userinfo: state.user };
};

const mapDispatchToProps = {
  UpdateUser,
  sendEmailOtp,
  getAllUsers,
};
export default connect(mapStateToProps, mapDispatchToProps)(AuthorProfile);
