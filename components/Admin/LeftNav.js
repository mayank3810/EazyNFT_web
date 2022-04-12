import React, { useState, useEffect } from "react";
import Pagination from "../Common/Pagination";
import Link from "next/link";
import { useRouter } from "next/router";
import routes from "../../config/routes";

const LeftNav = () => {
  const { asPath } = useRouter();
  const router = useRouter();
  const isUser = asPath.includes(routes.admin.users.root);

  return (
    <nav className="admin-nav-menu bg-dark">
      <div className="smartphone-menu-trigger"></div>
      <ul>
        <li>
          <a href="/discover">All NFTs</a>
        </li>
        <li
          className={isUser ? "active" : ""}
          onClick={() => router.push(routes.admin.users.root)}
        >
          <span>User</span>
        </li>
        <li
          className={asPath === routes.admin.category.root ? "active" : ""}
          onClick={() => router.push(routes.admin.category.root)}
        >
          <span>Category</span>
        </li>
        <li
          className={asPath === routes.admin.drop.root ? "active" : ""}
          onClick={() => router.push(routes.admin.drop.root)}
        >
          <span>Drops</span>
        </li>


        <li
          className={asPath === routes.admin.collection.root ? "active" : ""}
          onClick={() => router.push(routes.admin.collection.root)}
        >
          <span>Collections</span>
        </li>

        <li>
          <a href="/create-collection">Create Collections</a>
        </li>

        <li
          className={asPath === routes.admin.dashboard.root ? "active" : ""}
          onClick={() => router.push(routes.admin.dashboard.root)}
        >
          <span>Dashboard</span>
        </li>




        {/* <li tabindex="3" className="icon-settings">
          <span>Settings</span>
        </li> */}
      </ul>
    </nav>
  );
};

export default LeftNav;
