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
      <div className="sidebar-header-s">MANAGE NFTS</div>
      <ul>
        <li>

          <Link href="/discover">
            <a>All NFTs</a>
          </Link>
        </li>

        <li>
          <Link href="/admin/users">
            <a>Users</a>
          </Link>
        </li>


        <li>
          <Link href="/admin/category">
            <a>Category</a>
          </Link>
        </li>

        <li>
          <Link href="/admin/drop">
            <a >Drops</a>
          </Link>
        </li>

        <li>
          <Link href="/collections">
            <a>Collections</a>
          </Link>
        </li>

      </ul>

      <div className="sidebar-header-s">MANAGE STORE</div>
      <ul>
        <li>
          <Link href="/admin/store-features">
            <a >Store Settings</a>
          </Link>
        </li>
        <li>
          <Link href="/admin/store-features">
            <a >SEO and Analytics</a>
          </Link>

        </li>
        <li>
          <Link href="/admin/store-features">
            <a>Store Fees</a>
          </Link>
        </li>

      </ul>


      <div className="sidebar-header-s">YOUR ACCOUNT</div>
      <ul>
        <li>
          <Link href="/admin/store-features">
            <a>General</a>
          </Link>
        </li>
        <li>
          <Link href="/admin/store-features">
            <a>Plans & Billing</a>
          </Link>
        </li>
        <li>
          <Link href="/admin/store-features">
            <a>Notifications</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default LeftNav;
