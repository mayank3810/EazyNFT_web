import React from "react";

const TeamArea = ({ data = [] }) => {
  return (
    <>
      <div className="team-area pt-100 pb-70">
        <div className="container">
          <div className="section-title">
            <h2>Our Team</h2>
          </div>

          <div className="row pt-45">
            {data.map((data, index) => (
              <div key={index} className="col-lg-3 col-6">
                <div className="team-card">
                  <img
                    src={
                      "https://cloud.squidex.io/api/assets/polyone/" +
                      data.displayImage[0]
                    }
                    alt="Images"
                  />
                  <h3>{data.Name}</h3>
                  <span> {data.designation}</span>
                  <p>{data.aboutShort}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="team-shape">
          <img src="../images/team/team-shape.png" alt="Images" />
        </div>
      </div>
    </>
  );
};

export default TeamArea;
