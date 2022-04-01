import PlanetDetailCard from "../../components/PreLaunch/PlanetDetailCard";
import PlanetNftCard from "../PlanetNftCard";

const MintPlanetBanner = () => {
  return (
    <>
      <div className="line"></div>
      <div
        id="mint-section"
        style={{
          backgroundImage: 'url("/images/home-one/mint-bg.png")',
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="bg-dark "
      >
        <div className="container pb-5">
          <div className="row justify-content-center">
            <div className="col-lg-12 mt-5 ">
              {/* <h1 className="text-center section-heading  mt-5">
                Reserve a planet
              </h1> */}
              <div className="position-relative custom-heading">
                <h1 className="text-center    m-3">
                  Reserve&nbsp; your NFT Access Ticket
                </h1>
                <img
                  className="position-absolute"
                  src="/images/landing-page/circle.svg"
                ></img>
                <div className="col-12 d-flex justify-content-center">
                  <p className="mt-5 mb-5">
                    It’s the Solar Equinox! Be first to receive a PolyOne
                    Genesis NFT of the <span className="tag pink">Earth</span>
                    {", "}
                    <span className="tag  violet">Moon</span> or our very own{" "}
                    <span className="tag orange">Sun</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 col-center  mt-5">
              {/* <PlanetNftCard /> */}
              <PlanetDetailCard token="earth" />
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12 col-center mt-5">
              {/* <PlanetNftCard /> */}
              <PlanetDetailCard token="sun" />
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12 col-center mt-5">
              {/* <PlanetNftCard /> */}
              <PlanetDetailCard token="moon" />
            </div>
          </div>
        </div>
        <div className="line" />
      </div>
    </>
  );
};

export default MintPlanetBanner;
