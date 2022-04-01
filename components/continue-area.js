import React from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";

import { openConnectModal, setRedirect } from "../redux/actions/main";

function ContinueArea(props) {
  const router = useRouter();

  const handleCreateRedirect = () => {
    if (props?.userinfo?.user?.walletAddress) {
      router.push("/create");
    } else {
      props.openConnectModal(true);
      props.setRedirect("/create");
    }
  };

  return (
    <div className="bg-darker font-gordita padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 continue-area border-right">
            <div className="from-container">
              <h2>Are you a Creator?</h2>
              <p>
                Apply to be a creator on PolyOne marketplace <br /> &nbsp;
              </p>

              <a
                href="https://xnj5nqs78a0.typeform.com/to/iQzHVfpu"
                target={"_blank"}
                className="default-btn border-radius-5"
              >
                Continue <i class="ri-arrow-right-line icon"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-6 continue-area">
            <div className="from-container">
              <h2>Are you a Buyer?</h2>
              <p className="mb-5">
                Own curated NFTs from an international roster <br /> of emerging
                and established artists
              </p>

              {/* <Link href="/discover"> */}
              <a
                className="default-btn border-radius-5"
                href="https://xnj5nqs78a0.typeform.com/to/iQzHVfpu"
                target={"_blank"}
              >
                Continue <i class="ri-arrow-right-line icon"></i>
              </a>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { userinfo: state.user, main: state.main };
};

const mapDispatchToProps = {
  openConnectModal,
  setRedirect,
};
export default connect(mapStateToProps, mapDispatchToProps)(ContinueArea);
