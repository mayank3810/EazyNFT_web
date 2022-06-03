import Link from "next/link";

const Copyright = () => {
  return (
    <>
      <div className="copyright-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 d-flex terms-wrapper">
              <img className="mr-20" src="/images/favicon.png" />
              <div className="copy-right-text">
                <ul className="copy-right-list">
                  <li>
                    <Link href="/terms-condition">
                      <a>Terms & Conditions</a>
                    </Link>
                  </li>

                  <li>
                    <Link href="/privacy-policy">
                      <a>Privacy Policy</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="copy-right-social">
                <ul className="social-link">
                  <li>
                    <a
                      className="hide-mobile"
                      href="https://instagram.com/"
                    >
                      <img src="/images/icons/insta-icon.svg" alt="insta" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="hide-mobile"
                      href="https://twitter.com/"
                    >
                      <img src="/images/icons/twitter-icon.svg" alt="twitter" />
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      className="hide-mobile"
                      href="https://discord.com/"
                    >
                      <img src="/images/icons/discord-icon.svg" alt="discord" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Copyright;
