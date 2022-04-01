import React, { useState } from "react";

const PromoteArea = ({ data }) => {
  const [clicked, setClicked] = useState(false);

  const toggle = (index) => {
    if (clicked === index) {
      return setClicked(null);
    }
    setClicked(index);
  };
  return (
    <>
      <div className="promoted-area pb-70">
        <div className="container">
          <div className="section-title">
            <h2>Promoted Articles</h2>
          </div>
          <div className="row pt-45 ">
            {data?.map((data, index) => (
              <div className="col-lg-4 col-md-6">
                <div className="promoted-int-content">
                  <div className="promoted">
                    <div
                      className="promoted-item"
                      key={index}
                      onClick={() => toggle(index)}
                    >
                      <a
                        className={
                          clicked === index
                            ? "promoted-title active"
                            : "promoted-title"
                        }
                      >
                        <i className="ri-arrow-right-s-line"></i>
                        {data.title}
                      </a>
                      {clicked === index && (
                        <div className={clicked === index ? "show" : ""}>
                          <div className="promoted-content show">
                            <p>{data.description}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PromoteArea;
