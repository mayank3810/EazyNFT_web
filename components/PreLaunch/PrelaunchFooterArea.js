import Link from 'next/link';

const PrelaunchFooterArea = () => {
  return (
    <footer className="footer-margin">
    <nav className="navbar dark">
      <div className="container navbar-container">
        <div className="col-sm-2">
          <a className="navbar-brand" href="#">
            <img
              className="logo"
              src="/images/landing-page/Logo.png"
              alt="image"
            />
          </a>
        </div>
        <div className="col-sm-4">
          <a className="footer-link">Terms & Conditions</a>
          <a className="footer-link">White Paper</a>
        </div>
        <div className="col-sm-6 d-flex justify-content-end">
          <div className="header-link ">
            <a className="hide-mobile" href="https://twitter.com/polyoneNFT">
              <i className="ri-twitter-fill header-icon"></i>
            </a>
            <a className="hide-mobile" href="https://discord.com/invite/polyoneNFT">
              <i className="ri-discord-fill header-icon"></i>
            </a>
            <a target="_blank" className="hide-mobile" href="https://instagram.com/polyoneNFT">
                  <i className="ri-instagram-fill header-icon"></i>
                </a>
          </div>
        </div>
      </div>
    </nav>
  </footer>
  );
};

export default PrelaunchFooterArea;
