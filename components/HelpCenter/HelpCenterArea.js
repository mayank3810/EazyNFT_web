import React from "react";

const HelpCenterArea = ({ data }) => {
  return (
    <>
      <div className="help-center-area pt-50 pb-70">
        <div className="container">
          <div className="row">
            {data?.map((data, index) => (
              <div key={index} className="col-lg-4 col-6">
                <div className="help-center-card">
                  <h3>{data.title}</h3>
                  <p>{data.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpCenterArea;
