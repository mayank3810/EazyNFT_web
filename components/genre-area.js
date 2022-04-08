import React from "react";
import { connect } from "react-redux";
import Link from "next/link";

function GenreArea(props) {
  const { categories } = props?.main;

  return (
    <div className="bg-dark pt-5 pb-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 class="mb-4">Categories</h2>
          </div>

          <div className="row mt-4">
            {categories.map((value, index) => (
              <Link href={`/category?id=${value?.categoryName}`}>
                <div key={index} className="col-lg-3 col-md-4 col-sm-12 mb-4">
                  <div
                    style={{
                      backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 80), rgba(0, 0, 0, 0.2)), url("images/category/${
                        index + 1
                      }.jpg")`,
                    }}
                    className="genre-card"
                    role="button"
                  >
                    <span>
                      <div>{value?.categoryName}</div>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { name: state.main.name, userinfo: state.user, main: state.main };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(GenreArea);
