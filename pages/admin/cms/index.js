import LeftNav from "../../../components/Admin/LeftNav";
import NavbarAdmin from "../../../components/Layout/NavbarAdmin";
import TermsConditions from "./terms-conditions";
import PrivacyPolicy from "./privacy-policy";

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
        <h1>CMS</h1>
        <div className="tab featured-tab-area">
          <div className="row align-items-center">
            <Tabs>
              <div className="col-lg-6 col-md-8">
                <ul className="tabs">
                  <TabList>
                    <Tab>
                      <a>Privacy policy</a>
                    </Tab>
                    <Tab>
                      <a>T&C</a>
                    </Tab>
                    <Tab>
                      <a>Blog</a>
                    </Tab>
                  </TabList>
                </ul>
              </div>

              <div className="tab_content  pt-45">
                <TabPanel>
                  <PrivacyPolicy></PrivacyPolicy>
                </TabPanel>

                <TabPanel>
                  <TermsConditions></TermsConditions>
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
