import React from "react";

const AboutWidget = ({ data }) => {
  // console.log(data);
  if (data) {
    return (
      <>
        <div className="about-widget-area pt-100 pb-70">
          <div className="container">
            <div className="row">
              {data.map((data, index) => (
                <div key={index} className="col-lg-4 col-6">
                  <div className="about-card">
                    <div className="number">{index + 1}</div>
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
  }
};

export default AboutWidget;
