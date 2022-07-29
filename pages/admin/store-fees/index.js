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
        <h1>Store Fees</h1>
        <div className="tab featured-tab-area">
          <div className="row align-items-center">
            <Tabs>
              <div className="col-lg-6 col-md-8">
                <ul className="tabs">
                  <TabList>
                    <Tab>
                      <a>My wallet</a>
                    </Tab>
                    <Tab>
                      <a>Payouts</a>
                    </Tab>
                  </TabList>
                </ul>
              </div>

              <div className="tab_content  pt-45">
                <TabPanel>
                  <div className="tabs_item">
                    <div className="row">
                      <div className="col-12">
                        <h3>Wallet</h3>
                      </div>
                      <div className="col-12">
                        <div className="form-wrap-admin">
                          <form>
                            <div class="form-group row">
                              <label
                                for="staticEmail"
                                class="col-sm-2 col-form-label"
                              >
                                Walltet Address
                              </label>
                              <div class="col-sm-10">
                                <input class="form-control" type="text" />
                              </div>
                            </div>

                            <div class="form-group row">
                              <label
                                for="staticEmail"
                                class="col-sm-2 col-form-label"
                              >
                                Wallet Balance
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
                        <h3>Transactions</h3>
                      </div>
                      <div className="col-12">
                        <table className="">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Wallet Address</th>
                              <th>Organization</th>
                              <th>City</th>
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
                              <td>###</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </TabPanel>
              </div>

              <div className="tab_content  pt-45">
                <TabPanel>
                  <div className="tabs_item">
                    <div className="row">
                      <div className="col-12">
                        <h3>Payout Address</h3>
                      </div>
                      <div className="col-12">
                        <table className="">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Wallet Address</th>
                              <th>Organization</th>
                              <th>City</th>
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
                              <td>###</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </TabPanel>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
