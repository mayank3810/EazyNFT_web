import Navbar from '../components/Layout/Navbar';import PageBanner from '../components/Common/PageBanner';

import Copyright from '../components/Common/Copyright';
import Link from 'next/link'
import { connect } from "react-redux"
import { setInfo } from "../redux/actions/main"
import { VerifyUser } from "../redux/actions/user";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const VerifiedEmail = (props) => {

  const { userinfo, VerifyUser } = props;
  const router = useRouter()

  useEffect((e) => {
    if (router.query && router.query.emailToken) {
      props.VerifyUser(router.query.emailToken).then((res) => {
        toast.success("Email verified successully.");
      }).catch((error) => {
        toast.error("Failed to verify email. Please try again.")
      });
    }

  }, [router])


  return (
    <>
      <Navbar /> />

      <div className='error-area ptb-100'>
        <div className='d-table'>
          <div className='d-table-cell'>
            <div className='error-content'>

              <h3 className="mb-3">Your email is successfully verified.</h3>
              <Link href='/profile'>
                <a className='default-btn'>
                  Return to Profile
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      
      <Copyright />
    </>
  );
};

const mapStateToProps = state => {
  return { name: state.main.name, userinfo: state.user }
}

const mapDispatchToProps = {
  setInfo, VerifyUser
}
export default connect(mapStateToProps, mapDispatchToProps)(VerifiedEmail)
