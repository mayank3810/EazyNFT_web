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
        <h1>Plans & Billing</h1>
        <div className="tab featured-tab-area">
          <div className="row align-items-center">
            <div className="tabs_item mt-5">
              <div className="row">
                <div className="col-12">
                  <h3>Current Plan</h3>
                </div>
                <div className="col-12">
                  <div className="form-wrap-admin">
                    <form>
                      <div class="form-group row">
                        <label
                          for="staticEmail"
                          class="col-sm-2 col-form-label"
                        >
                          Plan name
                        </label>
                        <div class="col-sm-10">
                          <input class="form-control" type="text" />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="row mt-5">
                <div className="col-12">
                  <h3>Invoices</h3>
                </div>
                <div className="col-12">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Wallet Address</th>
                        <th>Email</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>###</td>
                        <td>###</td>
                        <td>###</td>
                        <td>###</td>
                        <td>###</td>
                      </tr>
                    </tbody>
                  </table>
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
