import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import { UpdateUser, sendEmailOtp } from "../redux/actions/user";

import Copyright from "../components/Common/Copyright";
import CustomInput from "../components/Common/CustomInput";
import API from "../services/API";
import Navbar from "../components/Layout/Navbar";

const FormSchema = Yup.object().shape({
  name: Yup.string().required("Name is required."),
  aboutUser: Yup.string(),
  email: Yup.string().email("Enter a vaild email address"),
});

const AuthorProfile = (props) => {
  const [buyer, setBuyer] = useState("");
  const [profilePicFile, setprofilePicFile] = useState(null);
  const [displayPicURL, setDisplayPicURL] = useState("");
  const [profileBannerFile, setprofileBannerFile] = useState(null);
  const [displayBannerURL, setDisplayBannerURL] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [emailVerified, setIsEmailVerified] = useState(false);
  const userProfile = useRef(null);
  const userBanner = useRef(null);

  const formik = useFormik({
    initialValues: {
      name: buyer?.name,
      aboutUser: buyer?.aboutUser,
      email: buyer?.email,
      instagram: buyer?.socialmediaLink?.instagram,
      twitter: buyer?.socialmediaLink?.twitter,
      web: buyer?.socialmediaLink?.web,
    },
    enableReinitialize: true,
    validationSchema: FormSchema,
    onSubmit: (values) => {
      handleSubmit();
    },
  });

  useEffect(() => {
    let user = props.userinfo.user;
    if (user && user.walletAddress) {
      setBuyer(user);
      setDisplayPicURL(user.profilePic || "../images/profile-picture.webp");
      setDisplayBannerURL(
        user?.coverPic || "https://cdn.wallpapersafari.com/53/85/Rx5hJd.jpg"
      );
      setIsEmailVerified(user.isEmailVerified);
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
    } else {
      setBuyer(null);
    }
  }, [props, props?.userinfo?.user, props?.userinfo?.email]);

  const onButtonClick = (type) => {
    if (type === "pic") userProfile.current.click();
    else if (type === "banner") userBanner.current.click();
  };

  const verifyEmail = () => {
    const { email } = formik.values;
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

  const handleSubmit = async () => {
    try {
      const maxSize = 5; // in mb
      if (profilePicFile && profilePicFile.size / 1024 / 1024 > maxSize) {
        toast.error(`Photo size cannot be greater than ${maxSize}mb`);
        return;
      }
      if (profileBannerFile && profileBannerFile.size / 1024 / 1024 > maxSize) {
        toast.error(`Cover Photo size cannot be greater than ${maxSize}mb`);
        return;
      }
      setisLoading(true);
      let _profilePic = displayPicURL;
      if (profilePicFile) {
        let imageUrl = await fileUpload(profilePicFile);
        _profilePic = process.env.NEXT_PUBLIC_IMAGE_URL + imageUrl;
        setDisplayPicURL(_profilePic);
        setprofilePicFile(null);
      }
      let _coverPic = displayBannerURL;
      if (profileBannerFile) {
        let imageUrl = await fileUpload(profileBannerFile);
        _coverPic = process.env.NEXT_PUBLIC_IMAGE_URL + imageUrl;
        setDisplayBannerURL(_coverPic);
        setprofileBannerFile(null);
      }
      const { name, email, aboutUser, instagram, twitter, web } = formik.values;
      let payload = {
        name,
        email,
        userName: name,
        aboutUser,
        socialmediaLink: {
          instagram,
          twitter,
          web,
        },
        profilePic: _profilePic,
        coverPic: _coverPic,
      };
      props
        .UpdateUser(payload)
        .then((res) => {
          toast.success("Profile update successfully");
        })
        .catch((error) => {
          toast.error("Profile update failed");
        })
        .finally((f) => {
          setisLoading(false);
        });
    } catch (error) {
      toast.error(error?.message || error);
      setisLoading(false);
    }
  };

  const fileUpload = async (file) => {
    let response = await API.uploadImage(file);
    return response?.data?.fileName;
  };

  const handleImage = (media) => {
    debugger;
    setprofilePicFile(media);
    setDisplayPicURL(URL.createObjectURL(media));
  };

  const handleBanner = (media) => {
    setprofileBannerFile(media);
    setDisplayBannerURL(URL.createObjectURL(media));
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="section-title">
          <div className="profile-page-title">Edit Profile</div>
        </div>
        <div className="pt-45">
          <div className="author-user">
            <div
              style={{
                height: "200px",
                width: "100%",
                borderRadius: "5px",
                overflow: "hidden",
                cursor: "pointer",
                margin: "auto",
              }}
              onClick={() => onButtonClick("banner")}
            >
              <img className="img-100" src={displayBannerURL} />
              <input
                type="file"
                accept=".jpeg,.png,.jpg"
                ref={userBanner}
                style={{ visibility: "hidden" }}
                name="fileName"
                onChange={(e) => handleBanner(e.target.files[0])}
              />
            </div>
            <div
              className="author-user"
              style={{ cursor: "pointer" }}
              onClick={() => onButtonClick("pic")}
              style={{
                height: "120px",
                width: "120px",
                borderRadius: "50%",
                overflow: "hidden",
                cursor: "pointer",
                margin: "auto",
                marginTop: "-60px",
              }}
            >
              <img
                src={displayPicURL}
                alt="Profile image"
                className="img-100"
                style={{
                  border: "4px solid white",
                  borderRadius: "50%",
                }}
              />
            </div>

            <input
              type="file"
              accept=".jpeg,.png,.jpg"
              ref={userProfile}
              style={{ visibility: "hidden" }}
              name="fileName"
              onChange={(e) => handleImage(e.target.files[0])}
            />
          </div>
          <div className="row mb-4">
            <div className="col-6">
              <div
                class="ez-input"
                style={{ cursor: "pointer" }}
                onClick={() => onButtonClick("pic")}
              >
                Upload Photo
              </div>
            </div>
            <div className="col-6">
              <div
                class="ez-input"
                style={{ cursor: "pointer" }}
                onClick={() => onButtonClick("banner")}
              >
                Upload Cover
              </div>
            </div>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <CustomInput
              id="name"
              class="ez-input"
              type="text"
              label="Name"
              errors={formik.errors}
              touched={formik.touched}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <CustomInput
              id="aboutUser"
              class="ez-input"
              type="textarea"
              label="Bio"
              errors={formik.errors}
              touched={formik.touched}
              value={formik.values.aboutUser}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{ height: "120px" }}
            />
            <CustomInput
              id="email"
              class="ez-input"
              type="text"
              label="Email"
              errors={formik.errors}
              touched={formik.touched}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              guide={
                emailVerified ? null : (
                  <div
                    className="verify-email text-success"
                    onClick={verifyEmail}
                  >
                    Verify
                  </div>
                )
              }
            />
            <div
              className="profile-page-sub-title mb-4"
              style={{ textAlign: "left" }}
            >
              Links
            </div>
            <CustomInput
              id="web"
              class="ez-input"
              type="text"
              label="Personal site"
              errors={formik.errors}
              touched={formik.touched}
              value={formik.values.web}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <CustomInput
              id="instagram"
              class="ez-input"
              type="text"
              label="Instagram"
              errors={formik.errors}
              touched={formik.touched}
              value={formik.values.instagram}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <CustomInput
              id="twitter"
              class="ez-input"
              type="text"
              label="Twitter"
              errors={formik.errors}
              touched={formik.touched}
              value={formik.values.twitter}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <button
              disabled={isLoading}
              type="submit"
              className="polyone-button mt-3"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
      
      <Copyright />
    </>
  );
};

const mapStateToProps = (state) => {
  return { userinfo: state.user };
};

const mapDispatchToProps = {
  UpdateUser,
  sendEmailOtp,
};
export default connect(mapStateToProps, mapDispatchToProps)(AuthorProfile);
