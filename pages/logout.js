import Navbar from '../components/Layout/Navbar';
import PageBanner from '../components/Common/PageBanner';

import Copyright from '../components/Common/Copyright';
import Link from 'next/link'
import { connect } from "react-redux"
import { setInfo } from "../redux/actions/main"
import { LogoutUser } from "../redux/actions/user";
import React, { useState, useEffect } from "react";
import useActiveWeb3React from '../hooks/useActiveWeb3React';

const Logout = (props) => {

  const { userinfo, LogoutUser } = props;
  const { deactivate } = useActiveWeb3React();

  useEffect(() => {
    LogoutUser();
    deactivate();
  },[])


  return (
    <>
      <Navbar /> />
    
      <div className='error-area ptb-100'>
        <div className='d-table'>
          <div className='d-table-cell'>
            <div className='error-content'>
              
              <h3 className="mb-3">Logged Out</h3>
              <Link href='/add-wallet'>
                <a className='default-btn'>
                  Return To Connect Page
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
  setInfo, LogoutUser
}
export default connect(mapStateToProps, mapDispatchToProps)(Logout)
