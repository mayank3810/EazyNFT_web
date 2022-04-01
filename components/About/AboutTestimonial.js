import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(import("react-owl-carousel3"));

const options = {
  loop: true,
  margin: 0,
  nav: false,
  mouseDrag: false,
  dots: true,
  autoplay: true,
  smartSpeed: 500,
  responsive: {
    0: {
      items: 1,
    },
    768: {
      items: 1,
    },
    1000: {
      items: 1,
    },
  },
};

const AboutTestimonial = ({ title, data }) => {
  const [display, setDisplay] = useState(false);
  const [isMounted, setisMounted] = useState(false);

  useEffect(() => {
    setisMounted(true);
    setDisplay(true);
  }, []);
  return (
    <>
      <div className="testimonial-area-two ptb-100">
        <div className="container">
          <div className="section-title text-center">
            <h2>{title}</h2>
          </div>

          <div className="testimonial-slider-two owl-theme pt-45">
            {display ? (
              <OwlCarousel {...options}>
                {data.map((data, index) => (
                  <div key={index} className="testimonial-slider-item">
                    <div className="row align-items-center">
                      <div className="col-lg-9">
                        <div className="testimonial-slider-content">
                          <img
                            src="../images/testimonial/testimonial-line.png"
                            alt="image"
                          />
                          <p>{data.testimonialContent}</p>
                          <ul>
                            <li>{data.Author}</li>
                          </ul>
                        </div>
                      </div>

                      <div className="col-lg-3">
                        <div className="testimonial-slider-img">
                          <img
                            src={
                              "https://cloud.squidex.io/api/assets/polyone/" +
                              data.Image[0]
                            }
                            alt="Images"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutTestimonial;
