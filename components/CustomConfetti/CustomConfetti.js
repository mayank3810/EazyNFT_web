import React, { useEffect } from "react";
import Confetti from "react-confetti";
import { useDispatch, useSelector } from "react-redux";
import { setConfetti } from "../../redux/actions/main";
import { connect } from "react-redux";

const CustomConfetti = (props) => {
  const showConffeti = props?.confetti;

  useEffect(() => {
    if (showConffeti) {
      setTimeout(() => {
        props.setConfetti(false);
      }, 5000);
    }
  }, [showConffeti]);
  if (!props.confetti) return null;

  return <Confetti width={window.screen.width} height={window.screen.height} />;
};
const mapStateToProps = (state) => {
  return { confetti: state.main.confetti };
};

const mapDispatchToProps = {
  setConfetti,
};
export default connect(mapStateToProps, mapDispatchToProps)(CustomConfetti);
