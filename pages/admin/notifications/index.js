import LeftNav from "../../../components/Admin/LeftNav";
import NavbarAdmin from "../../../components/Layout/NavbarAdmin";

import dynamic from "next/dynamic";

const Tabs = dynamic(
  import("react-tabs").then((mod) => mod.Tabs),
  { ssr: false }
);
import { resetIdCounter, Tab, TabList, TabPanel } from "react-tabs";
const Users = () => {
  return (
    <>
      <NavbarAdmin />
      <div className="admin-main">
        <h1>Notofications</h1>
        <div className="tab featured-tab-area">
          <div className="row align-items-center">
            <div className="tabs_item mt-5">
              <div className="row">
                <div className="col-12">
                  <h3>Features</h3>
                </div>
                <div className="col-12">
                  <div className="form-wrap-admin">
                    <form>
                      <div class="form-group row">
                        <label
                          for="inputPassword"
                          class="col-sm-2 col-form-label"
                        >
                          Newsletter subscription
                        </label>
                        <div class="col-sm-10">
                          <label className="switch">
                            <input type="checkbox" />
                            <span className="slider round"></span>
                          </label>
                        </div>
                      </div>

                      <div class="form-group row">
                        <label
                          for="inputPassword"
                          class="col-sm-2 col-form-label"
                        >
                          Home page slider
                        </label>
                        <div class="col-sm-10">
                          <label className="switch">
                            <input type="checkbox" />
                            <span className="slider round"></span>
                          </label>
                        </div>
                      </div>

                      <div class="form-group row">
                        <label
                          for="inputPassword"
                          class="col-sm-2 col-form-label"
                        >
                          Home page categories
                        </label>
                        <div class="col-sm-10">
                          <label className="switch">
                            <input type="checkbox" />
                            <span className="slider round"></span>
                          </label>
                        </div>
                      </div>

                      <div class="form-group row">
                        <label
                          for="inputPassword"
                          class="col-sm-2 col-form-label"
                        >
                          Home page drops
                        </label>
                        <div class="col-sm-10">
                          <label className="switch">
                            <input type="checkbox" />
                            <span className="slider round"></span>
                          </label>
                        </div>
                      </div>

                      <div class="form-group row">
                        <label
                          for="inputPassword"
                          class="col-sm-2 col-form-label"
                        >
                          Home page slider
                        </label>
                        <div class="col-sm-10">
                          <label className="switch">
                            <input type="checkbox" />
                            <span className="slider round"></span>
                          </label>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
