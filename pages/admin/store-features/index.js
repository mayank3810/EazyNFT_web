import LeftNav from "../../../components/Admin/LeftNav";
import NavbarAdmin from "../../../components/Layout/NavbarAdmin";
import General from "./general";
import Appearance from "./appearance";
import Advanced from "./advanced";

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
      <LeftNav />
      <div className="admin-main">
        <h1>Store Settings</h1>
        <div className="tab featured-tab-area">
          <div className="row align-items-center">
            <Tabs>
              <div className="col-lg-6 col-md-8">
                <ul className="tabs">
                  <TabList>
                    <Tab>
                      <a>General</a>
                    </Tab>
                    <Tab>
                      <a>Appearence</a>
                    </Tab>
                    <Tab>
                      <a>Advanced</a>
                    </Tab>
                  </TabList>
                </ul>
              </div>

              <div className="tab_content  pt-45">
                <TabPanel>
                  <General></General>
                </TabPanel>


                <TabPanel>
                  <Appearance></Appearance>
                </TabPanel>

                <TabPanel>
                 <Advanced></Advanced>
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
