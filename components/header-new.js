import React from "react";

export default function HeaderNew() {
  return (
    <nav className="navbar bg-darker justify-content-between font-gordita">
      <div className="left d-flex">
        <a className="navbar-brand" href="#">
          <img src="/images/footer-logo.png" alt="" />
        </a>
        <form className="form-inline serach">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="search-btn" type="submit">
            <i className="ri-search-line"></i>
          </button>
        </form>
      </div>

      <div className="right d-flex nav-links">
        <a className="nav-item nav-link active" href="#">
          Drops
        </a>
        <a className="nav-item nav-link" href="#">
          Marketplace
        </a>
        <a className="nav-item nav-link" href="#">
          Discover
        </a>
        <a className="nav-item nav-link " href="#">
          Connect
        </a>
        <a className="nav-item nav-link " href="#">
          Stats
        </a>
        <a className="nav-item nav-link " href="#">
          Action
        </a>
        <button type="button" class="btn btn-icon">
          <i className="ri-user-3-line"></i>
        </button>
      </div>
    </nav>
  );
}
