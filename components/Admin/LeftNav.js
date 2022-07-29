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
          <Link href="/certificates">
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
            <a>Drops</a>
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
            <a>Store Settings</a>
          </Link>
        </li>
        <li>
          <Link href="/admin/seo-analytics">
            <a>SEO and Analytics</a>
          </Link>
        </li>
        <li>
          <Link href="/admin/store-fees">
            <a>Store Fees</a>
          </Link>
        </li>
        <li>
          <Link href="/admin/cms">
            <a>CMS</a>
          </Link>
        </li>
      </ul>

      <div className="sidebar-header-s">YOUR ACCOUNT</div>
      <ul>
        <li>
          <Link href="/admin/account-settings">
            <a>General</a>
          </Link>
        </li>
        <li>
          <Link href="/admin/plans-billing">
            <a>Plans & Billing</a>
          </Link>
        </li>
        <li>
          <Link href="/admin/notifications">
            <a>Notifications</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default LeftNav;
