import Navbar from '../components/Layout/Navbar';

import Copyright from "../components/Common/Copyright";
import { useState } from "react";
import axios from "axios";
import { useStateIfMounted } from "use-state-if-mounted";

const BuyerProfile = () => {
  //let history = useHistory();
  // States for registration
  const [count, setCount] = useStateIfMounted(0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);

  const goProfile = () => history.push("/profile");
  //const [error, setError] = useState(false);
  //const history = useHistory();
  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var data = JSON.stringify({
      email: email,
      password: password,
      username: name,
    });

    var config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/general/updateprofile`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        //browserHistory.push("/profile");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <Navbar /> />

      <div className="user-area pt-100 pb-70">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="collection-form-area">
                <div className="section-title">
                  <h2>Create Collectible Item</h2>
                </div>
                <div className="collection-form">
                  <div className="profile-outer">
                    <h3>Upload File</h3>
                    <div className="profileButton">
                      <input
                        className="profileButton-input"
                        type="file"
                        name="attachments[]"
                        accept="image/*, application/pdf"
                        id="upload"
                        multiple=""
                      />
                      <label
                        className="profileButton-button ripple-effect"
                        for="upload"
                      >
                        e. g. Image, Audio, Video
                      </label>
                      <span className="profileButton-file-name"></span>
                    </div>
                  </div>
                  <div className="preview-box">
                    <h3>Preview</h3>
                    <div className="previewButton">
                      <input
                        className="previewButton-input"
                        type="file"
                        name="attachments[]"
                        accept="image/*, application/pdf"
                        id="upload"
                        multiple=""
                      />
                      <label
                        className="previewButton-button ripple-effect"
                        for="upload"
                      >
                        Upload file to preview your brand new NFT
                      </label>
                      <span className="previewButton-file-name"></span>
                    </div>
                  </div>
                  <div className="collection-category">
                    <h3>Choose Item Category</h3>
                    <ul>
                      <li>
                        <a target="_blank" href="/create">
                          Art
                        </a>
                      </li>
                      <li>
                        <a target="_blank" href="/create">
                          Virtual Worlds
                        </a>
                      </li>
                      <li>
                        <a target="_blank" href="/create">
                          Trending Cards
                        </a>
                      </li>
                      <li>
                        <a target="_blank" href="/create">
                          Collectibles
                        </a>
                      </li>
                      <li>
                        <a target="_blank" href="/create">
                          Music
                        </a>
                      </li>
                      <li>
                        <a target="_blank" href="/create">
                          Games
                        </a>
                      </li>
                      <li>
                        <a target="_blank" href="/create">
                          Domains
                        </a>
                      </li>
                      <li>
                        <a target="_blank" href="/create">
                          Memes
                        </a>
                      </li>
                      <li>
                        <a target="_blank" href="/create">
                          NFT Gifts
                        </a>
                      </li>
                    </ul>
                  </div>
                  <form>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label>Item Name</label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            className="form-control"
                            placeholder="e. g. “walking in the air”"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <label>Description</label>
                          <textarea
                            name="description"
                            className="form-control"
                            id="description"
                            cols="30"
                            rows="5"
                            placeholder="e. g. “after purchasing you’ll able to get the real product”"
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group">
                          <label>Royalties</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="5%"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group">
                          <label>Size</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="e. g. “size” "
                          />
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="form-group">
                          <label>Property</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="subject"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <label>Number Of Copies</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="e. g. “1”"
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="checkbox-method-area">
                          <div className="col-lg-12 col-md-12">
                            <div className="checkbox-method">
                              <p>
                                <input
                                  type="radio"
                                  id="fixed-price"
                                  name="radio-group"
                                />
                                <label for="fixed-price">Fixed Price</label>
                              </p>
                            </div>
                          </div>
                          <div className="col-lg-12 col-md-12">
                            <div className="checkbox-method">
                              <p>
                                <input
                                  type="radio"
                                  id="timed-auction"
                                  name="radio-group"
                                />
                                <label for="timed-auction">Timed Auction</label>
                              </p>
                            </div>
                          </div>
                          <div className="col-lg-12 col-md-12">
                            <div className="checkbox-method">
                              <p>
                                <input
                                  type="radio"
                                  id="open-bid"
                                  name="radio-group"
                                />
                                <label for="open-bid">Open For Bid</label>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <button
                          type="submit"
                          className="default-btn border-radius-5"
                        >
                          Create Item
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <Copyright />
    </>
  );
};

export default BuyerProfile;
