import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import cx from "classnames";
import { useOnScreen } from "../../services/hooks";

const StyledVideo = styled.video`
  object-fit: ${(p) => p.objectFit};
`;

const PlayIconWrapper = styled.div`
  position: absolute;
  right: 18px;
  margin-top: -48px;
  display: inline-block;
  height: 25px;
  width: 25px;
  background: white;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;

  :hover path {
    fill: var(--text-tertiary);
  }
`;

const AssetComp = (props) => {
  return (
    <>
      {props.type?.indexOf("video") < 0 ? (
        <Image {...props} />
      ) : (
        <Video muted="true" {...props} />
      )}
    </>
  );
};

const Image = ({
  imageSrc = "",
  thumbnail,
  objectFit,
  assetLoadCallBack,
  className,
}) => {
  const [loading, setLoading] = useState(true);

  function onError() {}
  function onLoad() {
    setLoading(false);
    if (assetLoadCallBack) assetLoadCallBack();
  }
  return (
    <>
      <img
        loading="lazy"
        src={imageSrc?.replace(
          "polyone.blob.core.windows.net",
          "polyone.azureedge.net"
        )}
        className={cx("asset-img-wrapper", className)}
        onError={onError}
        onLoad={onLoad}
        style={{ objectFit }}
      />
      {/* {loading && (
        <div className="asset-img-loading complete-center">
          <i class="ri-loader-fill"></i>
          <img
            loading="lazy"
            src={thumbnail}
            style={{ objectFit }}
            className="asset-img-loading--lazy"
          />
        </div>
      )} */}
    </>
  );
};

const Video = ({
  videoSrc = [],
  thumbnail,
  objectFit,
  // videoRef,
  controls = false,
  className,
  assetLoadCallBack,
  id,
}) => {
  const [loading, setLoading] = useState(true);
  const [isMute, setisMute] = useState(false);
  const [videoSet, setVideoSet] = useState(videoSrc);
  const [hasAudio, setHasAudio] = useState(false);
  const videoRef = useRef();
  const onScreen = useOnScreen(videoRef);

  useEffect(() => {
    setVideoSet(videoSrc);
  }, [videoSrc]);
  function onError() {
    if (videoSet.length > 1) {
      const [, ...rest] = videoSet;
      setVideoSet(rest);
    }
  }
  // useEffect(() => {
  //   if (!isMute && !onScreen) {
  //     setisMute(true);
  //     videoRef.current.muted = true;
  //   }
  // }, [onScreen, isMute]);

  function onLoadStart() {}
  function canplay() {
    setLoading(false);
    // setisMute(false);
    if (assetLoadCallBack) assetLoadCallBack();
  }

  useEffect(() => {
    function eventHandler(value) {
      var x = document.getElementById(id);
      if (x) x.muted = true;
    }
    if (videoRef?.current) {
      videoRef?.current?.addEventListener("loadeddata", eventHandler);
    }

    return () => {
      videoRef?.current?.removeEventListener("loadeddata", eventHandler);
    };
  }, [videoRef?.current]);

  // const checkAudio = (video) => {
  //   return (
  //     video.mozHasAudio ||
  //     Boolean(video.webkitAudioDecodedByteCount) ||
  //     Boolean(video.audioTracks && video.audioTracks.length)
  //   );
  // };

  // const togglePause = () => {
  //   if (!isMute) {
  //     setisMute(true);
  //     videoRef?.current?.muted = true;
  //   } else {
  //     setisMute(false);
  //     videoRef?.current?.muted = false;
  //   }
  // };

  return (
    <>
      <StyledVideo
        id={id}
        ref={videoRef}
        muted
        poster={thumbnail?.replace(
          "polyone.blob.core.windows.net",
          "polyone.azureedge.net"
        )}
        loop
        controls={controls}
        autoPlay
        playsInline
        className={cx("asset-video-wrapper", className)}
        controlsList="nodownload"
        disablePictureInPicture
        src={videoSet[0]?.replace(
          "polyone.blob.core.windows.net",
          "polyone.azureedge.net"
        )}
        onLoadStart={onLoadStart}
        onCanPlay={canplay}
        objectFit={objectFit}
        onError={onError}
      />
      {/* {!controls && hasAudio && (
        <PlayIconWrapper onClick={togglePause}>
          {isMute ? <i class="ri-volume-mute-fill"/>
 : <i class="ri-volume-up-line"/>}
        </PlayIconWrapper>
      )} */}

      {loading && (
        <div className="complete-center">
          <i class="ri-loader-fill"></i>
        </div>
      )}
    </>
  );
};

function propsAreEqual(prevProps, nextProps) {
  return (
    prevProps.type === nextProps.type &&
    prevProps.thumbnail === nextProps.thumbnail &&
    prevProps.videoSrc === nextProps.videoSrc &&
    prevProps.imageSrc === nextProps.imageSrc
  );
}

const Asset = React.memo(AssetComp, propsAreEqual);

export default Asset;
