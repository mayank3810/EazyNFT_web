import React from "react";
import Link from "next/link";
import { walletShotener } from "../../utils/wallet";
import { toast } from "react-toastify";

const AuthorProfile = (props) => {
  const { user } = props;
  const copyLink = (value) => {
    const el = document.createElement("textarea");
    el.value = value;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    toast.success("Address copied");
  };
  return (
    <>
      <div className="author-profile-sidebar  mr-20">
        <div className="author-user mb-3">
          <img
            src={
              user?.profilePic || "../images/profile-picture.webp"
            }
            alt="Images"
          />
        </div>

        <h3>
          <Link href="/author-profile">
            <a>{user?.name || "Unnamed"}</a>
          </Link>
        </h3>
        {user?.username && <span>@{user?.username}</span>}
        {user?.aboutUser && <p>{user?.aboutUser}</p>}
        {user?.walletAddress && (
          <div
            role="button"
            className="sp-title"
            onClick={() => copyLink(user?.walletAddress)}
          >
            Wallet: {walletShotener(user?.walletAddress)}{" "}
            <i className="ri-folders-line"></i>
          </div>
        )}

        {/* <div className="author-content">
          <div className="content-left">
            <span>Followers</span>
            <h4>2941</h4>
          </div>

          <div className="content-right">
            Follow
            <ul className="author-social">
              <li>
                <a
                  href="https://discord.com/invite/polyoneNFT"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="ri-facebook-fill"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="ri-instagram-fill"></i>
                </a>
              </li>
              <li>
                <a href="https://twitter.com/polyoneNFT" target="_blank" rel="noreferrer">
                  <i className="ri-twitter-fill"></i>
                </a>
              </li>
            </ul>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default AuthorProfile;
