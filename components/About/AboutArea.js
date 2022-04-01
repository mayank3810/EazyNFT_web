import React from "react";

const AboutArea = ({ data }) => {
  //console.log(data);
  const html_markup = { __html: data?.content.iv };
  if (data) {
    return (
      <>
        <div className="about-area pt-50 pb-70">
          <div className="container">
            <div className="about-content">
              <div className="section-title">
                <h2>{data?.title?.iv}</h2>
                <p>{data?.description?.iv}</p>
              </div>
            </div>

            <div className="row">
              {data?.images?.iv.map((image, index) => (
                <div key={index} className="col-lg-6 col-sm-6">
                  <div className="about-img">
                    <img
                      src={
                        "https://cloud.squidex.io/api/assets/polyone/" + image
                      }
                      alt="Images"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div
              className="about-bottom-content"
              dangerouslySetInnerHTML={html_markup}
            ></div>
          </div>
        </div>
      </>
    );
  }
};

export default AboutArea;
