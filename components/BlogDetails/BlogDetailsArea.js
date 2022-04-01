import React from "react";
import Link from "next/link";

const BlogDetailsArea = ({ data, relatedPostsData }) => {
  // console.log(data);
  return (
    <>
      {data && data.data && (
        <div className="blog-details-area pt-100 pb-70">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <div className="side-bar-area pr-20">
                  <div className="side-bar-profile">
                    <img
                      src={
                        "https://cloud.squidex.io/api/assets/polyone/" +
                        data?.data?.author.iv.image[0]
                      }
                      alt="Images"
                    />
                    <h3>{data?.data?.author.iv.name}</h3>
                    <p>{data?.data?.author.iv.about}</p>
                    <ul className="social-link">
                      {data?.data?.author.iv.facebook ? (
                        <li>
                          <a
                            href={data?.data?.author.iv.facebook}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="ri-facebook-fill"></i>
                          </a>
                        </li>
                      ) : (
                        <></>
                      )}
                      {data.data.author.iv.instagram ? (
                        <li>
                          <a
                            href={data.data.author.iv.instagram}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="ri-instagram-fill"></i>
                          </a>
                        </li>
                      ) : (
                        <></>
                      )}
                      {data.data.author.iv.twitter ? (
                        <li>
                          <a
                            href={data.data.author.iv.twitter}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="ri-twitter-fill"></i>
                          </a>
                        </li>
                      ) : (
                        <></>
                      )}
                      {data.data.author.iv.linkedin ? (
                        <li>
                          <a
                            href={data.data.author.iv.linkedin}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="ri-linkedin-fill"></i>
                          </a>
                        </li>
                      ) : (
                        <></>
                      )}
                    </ul>
                  </div>

                  {/* <div className="side-bar-widget">
                <h3 className="title">Search</h3>
                <form className="search-form">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search keyword"
                  />
                  <button type="submit">
                    <i className="ri-search-line"></i>
                  </button>
                </form>
              </div> */}

                  <div className="widget-popular-post">
                    <h3 className="title">Related Blog</h3>
                    {relatedPostsData.map((relatedPost, index) => (
                      <article key={index} className="item">
                        <Link href={`/blog/${relatedPost.id}`} replace={true}>
                          <a className="thumb">
                            <span
                              style={{
                                backgroundImage: `url("https://cloud.squidex.io/api/assets/polyone/${relatedPost.data.displayImage.iv[0]}")`,
                              }}
                              className="full-image cover"
                              role="img"
                            ></span>
                          </a>
                        </Link>
                        <div className="info">
                          <h4 className="title-text">
                            <Link
                              href={`/blog/${relatedPost.id}`}
                              replace={true}
                            >
                              <a>{relatedPost.data.title.iv}</a>
                            </Link>
                          </h4>

                          <p>
                            {new Date(relatedPost.data.date?.iv).toDateString()}{" "}
                          </p>
                        </div>
                      </article>
                    ))}

                    {/* <article className="item">
                  <Link href="/blog-details">
                    <a className="thumb">
                      <span
                        className="full-image cover bg2"
                        role="img"
                      ></span>
                    </a>
                  </Link>
                  <div className="info">
                    <h4 className="title-text">
                      <Link href="/blog-details">
                        <a>Edition365: A Portrait Of The Year That</a>
                      </Link>
                    </h4>

                    <p>July 17, 2021 </p>
                  </div>
                </article>

                <article className="item">
                  <Link href="/blog-details">
                    <a className="thumb">
                      <span
                        className="full-image cover bg3"
                        role="img"
                      ></span>
                    </a>
                  </Link>
                  <div className="info">
                    <h4 className="title-text">
                      <Link href="/blog-details">
                        <a>Announcing Our $100m Raise</a>
                      </Link>
                    </h4>

                    <p>July 19, 2021 </p>
                  </div>
                </article> */}
                  </div>

                  {/* <div className="side-bar-widget">
                <h3 className="title">Sort By</h3>
                <div className="form-group select-group">
                  <select className="form-select form-control">
                    <option data-display="Sort By (Default)">
                      Sort By (Default)
                    </option>
                    <option value="1"> Top Rate</option>
                    <option value="2">Mid Rate</option>
                    <option value="3">Low Rated</option>
                  </select>
                </div>
              </div> */}

                  {/* <div className="side-bar-widget-categories">
                <h3 className="title">Categories</h3>
                <ul>
                  <li>
                    <Link href="/categories">
                      <a target="_blank">Art</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/categories">
                      <a target="_blank">Virtual Worlds</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/categories">
                      <a target="_blank">Collectibles</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/categories">
                      <a target="_blank">Music</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/categories">
                      <a target="_blank">Games</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/categories">
                      <a target="_blank">Domains</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/categories">
                      <a target="_blank">Memes</a>
                    </Link>
                  </li>
                </ul>
              </div> */}

                  <div className="side-bar-widget">
                    <h3 className="title">Tags</h3>
                    <ul className="side-bar-widget-tag">
                      {data.data.tags.iv?.map((data, index) => (
                        <li key={index}>
                          <a>{data}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-8">
                <div className="blog-details-content">
                  <div className="content">
                    <h1>{data.data?.title.iv}</h1>
                    <ul>
                      <li>{new Date(data.data.date?.iv).toDateString()}</li>
                    </ul>
                  </div>

                  <div className="blog-preview-img">
                    <img
                      src={
                        "https://cloud.squidex.io/api/assets/polyone/" +
                        data.data.displayImage.iv[0]
                      }
                      alt="Blog Images"
                    />

                    <a className="tag-btn">{data.data.tags.iv[0]}</a>
                  </div>

                  <div
                    className="blog-articel"
                    dangerouslySetInnerHTML={{ __html: data?.data.content.iv }}
                  ></div>

                  {/* <blockquote className="blockquote">
                <p>
                  Elementum lacus, tempus aliquam turpis diam amet leo enim.
                  Nisi enim condimentum tincidunt ornare nam adipiscing.
                  Volutpat lacus, est hendrerit elit sed interdum. amet leo
                  enim. Nisi enim lorem hepotis ipsum tincidunt nam
                  adipiscing. Volutpat lacus, est hendrerit elit sed interdum.
                </p>
                <img src="../images/blog/blog-line.png" alt="Images" />
              </blockquote> */}

                  <div className="article-share-area">
                    <div className="row align-items-center">
                      <div className="col-lg-5 col-sm-5">
                        <ul className="tag-list">
                          <li className="title">Tag :</li>

                          {data.data.tags.iv?.map((data, index) => (
                            <li key={index}>
                              <a>{data}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-lg-7 col-sm-7">
                        <div className="article-social-icon">
                          <ul className="social-icon">
                            <li className="title">Share Post</li>
                            <li>
                              <a
                                href="https://discord.com/invite/polyoneNFT"
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i className="ri-facebook-fill"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                href="https://www.instagram.com/"
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i className="ri-instagram-fill"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                href="https://twitter.com/polyoneNFT"
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i className="ri-twitter-fill"></i>
                              </a>
                            </li>
                            <li>
                              <a
                                href="https://www.linkedin.com/"
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i className="ri-linkedin-fill"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="comments-form">
                <h3>0 Comment</h3>

                <div className="contact-form">
                  <h4>Reply A Comment</h4>
                  <form id="contactForm">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label>First Name</label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            className="form-control"
                            required
                            data-error="Please Enter Your Name"
                            placeholder="Your Name"
                          />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group">
                          <label>Your Email</label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            className="form-control"
                            required
                            data-error="Please Enter Your Email"
                            placeholder="Your Email"
                          />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group">
                          <label>Your Website</label>
                          <input
                            type="text"
                            required
                            data-error="Please Enter Your Website"
                            className="form-control"
                            placeholder="Your Website"
                          />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group">
                          <label>Your Subject</label>
                          <input
                            type="text"
                            name="msg_subject"
                            id="msg_subject"
                            className="form-control"
                            required
                            data-error="Please Enter Your Subject"
                            placeholder="Your Subject"
                          />
                        </div>
                      </div>

                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <label>Your Comment</label>
                          <textarea
                            name="comment"
                            className="form-control"
                            cols="30"
                            rows="5"
                            required
                            data-error="Write Your Comment"
                            placeholder="Your Comment"
                          ></textarea>
                        </div>
                      </div>

                      <div className="col-lg-12 col-md-12">
                        <div className="agree-label">
                          <input type="checkbox" id="chb1" />
                          <label forhtml="chb1">
                            Save my name, email, and website in this browser
                            for the next time I comment.
                          </label>
                        </div>
                      </div>

                      <div className="col-lg-12 col-md-12">
                        <button
                          type="submit"
                          className="default-btn border-radius-5"
                        >
                          Send Message{" "}
                          <i className="ri-arrow-right-s-line"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogDetailsArea;
