import LeftNav from "../../../components/Admin/LeftNav";
import NavbarAdmin from "../../../components/Layout/NavbarAdmin";
import Seo from "./seo";
import Analytics from "./analytics";

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
        <h1>SEO and Analytics</h1>
        <div className="tab featured-tab-area">
          <div className="row align-items-center">
            <Tabs>
              <div className="col-lg-6 col-md-8">
                <ul className="tabs">
                  <TabList>
                    <Tab>
                      <a>SEO</a>
                    </Tab>
                    <Tab>
                      <a>Analytics</a>
                    </Tab>
                  </TabList>
                </ul>
              </div>

              <div className="tab_content  pt-45">
                <TabPanel>
                  <Seo></Seo>
                </TabPanel>

                <TabPanel>
                  <Analytics></Analytics>
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
