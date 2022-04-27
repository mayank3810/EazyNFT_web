import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import API from "../../../services/API";
import { setConfetti } from "../../../redux/actions/main";
import { getTokenId } from "../../../utils/web";
import { ethers } from "ethers";

import { PolyoneNFTABI } from "../../../utils/abs/abs";
import CustomInput from "../../Common/CustomInput";
import config from "../../../config/config";
import AddNFTProperties from "../../Modals/AddNFTProperties";
import { CHAINS } from "../../../chains.ts";
import Asset from "../../Image/Asset";
import imageCompression from "browser-image-compression";

const FormSchema = Yup.object().shape({
  name: Yup.string().required("NFT name is must."),
  description: Yup.string().required("NFT description is must."),
  royalty: Yup.number("Royalty must be number").min(1).max(50),
  price: Yup.number("Price must be number"),
  size: Yup.string(),
  property: Yup.string(),
  copies: Yup.number().min(1).required("Copies is must."),
  polyoneShare: Yup.number("Polyone share must be number")
    .min(1)
    .max(50, "15% is the maximum"),
  dropWallet: Yup.string().required("User wallet address is required"),
  websiteURL: Yup.string(),
});

const CreateDropArea = (props) => {
  const { web3 } = props?.main;
  const { provider, desiredChainId, account } = web3;
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [state, setState] = useState(0);
  const [message, setmessage] = useState("");
  const [subMessage, setsubMessage] = useState("");
  const [nftTxn, setnftTxn] = useState(null);
  const [tokenDetails, setTokenDetails] = useState({});
  const [userCollection, setuserCollection] = useState([]);
  const [selectedCollection, setselectedCollection] = useState("");
  const [openOptional, setopenOptional] = useState(false);
  const [openPropertiesDialog, setopenPropertiesDialog] = useState(false);
  const [nftProperties, setnftProperties] = useState([]);
  const [uploadFile, setuploadFile] = useState(null);
  const [displayURL, setdisplayURL] = useState("");
  const [uploadthumbnailFile, setuploadthumbnailFile] = useState(null);
  const [displaythumbnailURL, setdisplaythumbnailURL] = useState("");
  const [startOn, setstartOn] = useState(new Date());
  const formik = useFormik({
    initialValues: {
      name: "",
      description: ``,
      royalty: 10,
      price: "",
      size: "",
      property: "",
      copies: 1,
      polyoneShare: 15,
      websiteURL: "",
      dropWallet: "",
    },
    validationSchema: FormSchema,
    onSubmit: (values) => {
      handleSubmit();
    },
  });
  const { user } = props.userinfo;
  const thumbnailRef = useRef();
  const ref = useRef();

  const handleCategories = (id) => {
    let _selectedCategories = [...selectedCategories];
    if (_selectedCategories.includes(id)) _selectedCategories = [];
    else _selectedCategories = [id];
    setSelectedCategories(_selectedCategories);
  };

  const generateVideoThumbnail = (file) => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const video = document.createElement("video");

      // this is important
      video.autoplay = true;
      video.muted = true;
      video.src = URL.createObjectURL(file);
      video.currentTime = 3;
      video.onloadeddata = () => {
        video.currentTime = 3;
        let ctx = canvas.getContext("2d");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        video.pause();
        canvas.toBlob((blob) => {
          file = new File([blob], "fileName.jpg", { type: "image/jpeg" });
          resolve(file);
        }, "image/jpeg");
      };
    });
  };

  const toBase64 = (file, size) => {
    return new Promise(async (resolve, reject) => {
      if (!file?.type?.includes("video") && !file?.type?.includes("gif")) {
        const imageFile = file;
        let _size = imageFile.size / 1024 / 1024;
        if (_size > size) {
          const options = {
            maxSizeMB: size || 0.1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
          };

          try {
            file = await imageCompression(imageFile, options);
          } catch (error) {
            reject("error in file compress");
          }
        }
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const clear = () => {
    setState(0);
    setmessage("");
    setsubMessage("");
    setnftTxn(null);
  };

  const checkValidations = () => {
    const maxSize = 150; // in mb
    let error = "";
    if (!uploadFile?.size) error = "Please upload NFT";
    else if (uploadFile.size / 1024 / 1024 > maxSize)
      error = `NFT size cannot be greater than ${maxSize}mb`;
    else if (!CHAINS[desiredChainId]?.status)
      error = "Wrong Network: Please change to Ethereum";
    else if (!selectedCategories?.length) error = "Please select NFT Category";
    if (error) {
      toast.error(error);
      return true;
    }
    return false;
  };

  const handleSubmit = async () => {
    try {
      let {
        name,
        description,
        copies,
        royalty,
        websiteURL,
        polyoneShare,
        dropWallet,
      } = formik.values;

      polyoneShare = Number(polyoneShare);
      copies = Number(copies);
      royalty = Number(royalty);
      if (checkValidations()) return;
      window.scroll({ top: 0, behavior: "smooth" });
      setState(1);
      let thumbnail = "";
      if (uploadthumbnailFile) {
        thumbnail = await toBase64(uploadthumbnailFile, 0.1);
      }
      if (!thumbnail) {
        if (uploadFile?.type?.includes("video")) {
          const _file = await generateVideoThumbnail(uploadFile);
          thumbnail = await toBase64(_file, 0.05);
        } else {
          thumbnail = await toBase64(uploadFile, 0.05);
        }
      }

      let image64 = await toBase64(uploadFile, 1);
      const _metaData = {
        name,
        description,
        walletAddress: user?.walletAddress,
        signature: user?.signature,
        image: image64,
      };

      setmessage("Uploading");
      let _metaDataResponse = await API.createMeta(_metaData);
      if (!_metaDataResponse?.result) {
        clear();
        toast.error("Error in uploading NFT");
        return;
      }
      _metaDataResponse = _metaDataResponse?.result;
      setmessage("Waiting for confirmation");
      setsubMessage("Confirm the request that appeared just now.");

      // const signer = provider.getSigner();
      // const contract = new ethers.Contract(
      //   config?.contractDetails[desiredChainId].polyoneContractAddress,
      //   PolyoneNFTABI,
      //   signer
      // );
      // const transaction = await contract.createNFTDrop(
      //   dropWallet || user?.walletAddress,
      //   [
      //     dropWallet,
      //     config?.contractDetails[desiredChainId].polyoneOwnerAddress,
      //   ],
      //   [polyoneShare, 100 - polyoneShare],
      //   [
      //     dropWallet,
      //     config?.contractDetails[desiredChainId].polyoneOwnerAddress,
      //   ],
      //   [polyoneShare, 100 - polyoneShare],
      //   copies,
      //   royalty,
      //   _metaDataResponse?.ipfs
      // );
      // console.log("NFT txn hash: ", transaction?.hash);
      setmessage("Your NFT is being minted");
      setsubMessage("");
      // _metaDataResponse["etherScan"] = transaction?.hash;
      const _createNFT = {
        metaData: _metaDataResponse,
        tokenName: "ERC-1155",
        walletAddress: user?.walletAddress,
        signature: user?.signature,
        royalty,
        copies,
        websiteURL,
        nftContractAddress:
          config?.contractDetails[desiredChainId].polyoneContractAddress,
        marketplaceContractAddress:
          config?.contractDetails[desiredChainId].marketplaceContractAddress,
        blockchainCurrency: CHAINS[desiredChainId].currency,
        blockchainChainId: desiredChainId,
        collectionName: selectedCollection,
        isDrop: true,
        dropFor: dropWallet,
        polyoneShare: polyoneShare,
        ownerAddress: config.polyoneOwnerAddress,
        dropLiveAt: startOn,
        thumbnail,
      };

      if (nftProperties?.length) _createNFT["properties"] = nftProperties;
      let _categories = categories.filter((value) => {
        if (selectedCategories.includes(value.key)) return value;
      });
      if (_categories && _categories.length) {
        _createNFT["categories"] = _categories[0];
      }
      let nftRes = await API.createNFT(_createNFT);
      // let result = await transaction.wait();
      // const contractTokenId = await getTokenId(result?.transactionHash);
      // let _saveNFT = {
      //   contractTokenId,
      //   tokenId: nftRes?.result?.tokenId,
      //   walletAddress: user?.walletAddress,
      //   signature: user?.signature,
      //   action: "updateTokenId",
      // };
      // API.saveNFT(_saveNFT);
      setTokenDetails(nftRes?.result);
      props.setConfetti(true);
      setnftTxn(null);
      setmessage("Your NFT has been uploaded congratulations!");
      setsubMessage("You have successfully uploaded your NFT");
      setState(4);
      toast.success("NFT created successfully");
    } catch (error) {
      setState(0);
      if (error?.message?.includes("Not an Admin "))
        error.message = "No admin access in contract.";
      if (typeof error?.message === "string") toast.error(error?.message);
      else toast.error(error?.response?.data?.msg || "Something went wrong");
      console.log(error);
    }
  };

  const fetchCollections = (walletAddress) => {
    API.getUserCollections({
      userWallet: walletAddress,
      filter: { owner: walletAddress },
      projection: { name: true, _id: false },
    })
      .then((response) => {
        const collections = response?.data || [];
        let _selected = collections.length ? collections[0]?.name : "";
        setselectedCollection(_selected);
        setuserCollection([...collections]);
      })
      .catch((error) => {
        toast.error(error?.response?.message || "Something went wrong");
      });
  };

  useEffect(() => {
    setuserCollection([]);
    if (formik?.values?.dropWallet) {
      try {
        ethers.utils.getAddress(formik?.values?.dropWallet);
        fetchCollections(formik?.values?.dropWallet);
      } catch {}
    } else if (user?.walletAddress) {
      // fetchCollections(user?.walletAddress);
    }
  }, [formik?.values?.dropWallet]);

  useEffect(() => {
    const categories = props?.main?.categories;
    let _categories = [];
    for (let i = 0; i < categories.length; i++)
      _categories.push({
        key: categories[i]?.categoryName,
        value: categories[i]?.categoryName,
      });
    setCategories(_categories);
    if (_categories.length) handleCategories(_categories[0].key);
  }, [props?.main?.categories]);

  const loadingSection = () => {
    if (!state) return null;
    return (
      <>
        {message && <h2 className="text-light">{message}</h2>}
        {subMessage && <h5 className="text-light mt-3">{subMessage}</h5>}
        {state === 4 && (
          <Link href={`/asset/${tokenDetails?.tokenId}`}>
            <button className="default-btn border-radius-5 mt-5">View</button>
          </Link>
        )}
      </>
    );
  };

  const handleUpload = (media, type) => {
    if (!media || state !== 0) return;
    if (type == "thumbnail") {
      setuploadthumbnailFile(media);
      setdisplaythumbnailURL(URL.createObjectURL(media));
    } else {
      setuploadFile(media);
      setdisplayURL(URL.createObjectURL(media));
    }
  };
  const removeNFT = (type) => {
    if (type == "thumbnail") {
      setuploadthumbnailFile(null);
      setdisplaythumbnailURL("");
    } else {
      setuploadFile(null);
      setdisplayURL("");
    }
  };

  const onUploadClick = (type) => {
    if (type == "thumbnail") {
      thumbnailRef.current.click();
    } else {
      ref.current.click();
    }
  };

  const loadingSectionValue = loadingSection();

  return (
    <>
      <div className="create-nft-container">
        <div className="row create-nft-header">
          <div className="col-lg-4">
            <div className="title">Create new Drop</div>
          </div>
          <div className="col-lg-8">
            {/* <div className="web-only upload-title">Upload NFT</div> */}
          </div>
        </div>

        <div className="row create-nft-form-section">
          <div className="col-lg-4 pl-0">
            {state === 0 ? (
              <>
                <form onSubmit={formik.handleSubmit}>
                  <CustomInput
                    id="name"
                    class="ez-input"
                    type="text"
                    label="Enter Display Name"
                    errors={formik.errors}
                    touched={formik.touched}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <CustomInput
                    id="description"
                    class="ez-input"
                    type="textarea"
                    label="Description"
                    errors={formik.errors}
                    touched={formik.touched}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{ height: "141px" }}
                  />
                  <CustomInput
                    id="dropWallet"
                    class="ez-input"
                    type="text"
                    label="User wallet address"
                    errors={formik.errors}
                    touched={formik.touched}
                    value={formik.values.dropWallet}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    guide={
                      !formik.values.dropWallet ? (
                        <div
                          role="button"
                          onClick={() =>
                            formik?.setFieldValue(
                              "dropWallet",
                              user?.walletAddress
                            )
                          }
                          className="text-success f-14"
                          style={{ margin: "5px 10px" }}
                        >
                          Use my wallet address
                        </div>
                      ) : null
                    }
                  />
                  <div className="mb-4 ez-input-container">
                    <label>Select Category</label>
                    <select
                      className="form-select ez-form-select"
                      value={selectedCategories[0]}
                      onChange={(e) => handleCategories(e?.target?.value)}
                    >
                      {categories.map((value, index) => (
                        <option key={value.key} value={value.key}>
                          {value.value}
                        </option>
                      ))}
                    </select>
                  </div>
                  {!!userCollection.length && (
                    <div className="mb-4 ez-input-container">
                      <label>Select Collection</label>
                      <select
                        className="form-select ez-form-select"
                        value={selectedCollection}
                        onChange={(e) =>
                          setselectedCollection(e?.target?.value)
                        }
                      >
                        {userCollection.map((value, index) => (
                          <option key={index} value={value?.name}>
                            {value?.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="d-flex justify-content-between">
                    <div
                      className="create-nft-sub-header"
                      role="button"
                      onClick={() => setopenOptional(!openOptional)}
                    >
                      Advance (Optional)
                    </div>
                    <div
                      className="create-nft-sub-header"
                      role="button"
                      onClick={() => setopenOptional(!openOptional)}
                    >
                      {!openOptional ? (
                        <i className="ri-add-line icon"></i>
                      ) : (
                        <i className="ri-subtract-line icon"></i>
                      )}
                    </div>
                  </div>
                  {openOptional && (
                    <>
                      <CustomInput
                        type="date"
                        name="startOn"
                        id="startOn"
                        className="form-control"
                        // placeholder="Select drop live time"
                        label="Drop live time"
                        showTimeSelect
                        selected={startOn}
                        onChange={(date) => setstartOn(date)}
                      />
                      <CustomInput
                        type="text"
                        name="polyoneShare"
                        id="polyoneShare"
                        class="ez-input"
                        label="Polyone Share %"
                        errors={formik.errors}
                        touched={formik.touched}
                        value={formik.values.polyoneShare}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <CustomInput
                        id="royalty"
                        class="ez-input"
                        type="number"
                        label="Royalty %"
                        errors={formik.errors}
                        touched={formik.touched}
                        value={formik.values.royalty}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <CustomInput
                        id="copies"
                        class="ez-input"
                        type="number"
                        label="Number of copies"
                        errors={formik.errors}
                        touched={formik.touched}
                        value={formik.values.copies}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <CustomInput
                        id="websiteURL"
                        class="ez-input"
                        type="text"
                        label="External Link"
                        errors={formik.errors}
                        touched={formik.touched}
                        value={formik.values.websiteURL}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <div className="d-flex justify-content-between">
                        <div className="create-nft-sub-header">Properties</div>
                        <div
                          className="create-nft-sub-header"
                          role="button"
                          onClick={() =>
                            setopenPropertiesDialog(!openPropertiesDialog)
                          }
                        >
                          {!openPropertiesDialog ? (
                            <i className="ri-add-line icon"></i>
                          ) : (
                            <i className="ri-subtract-line icon"></i>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        {nftProperties.map((value, index) => (
                          <>
                            <div className="col-6 mb-3">
                              <div
                                class="ez-input"
                                onClick={() =>
                                  setopenPropertiesDialog(!openPropertiesDialog)
                                }
                              >
                                {value?.key}
                              </div>
                            </div>
                            <div className="col-6 mb-3">
                              <div
                                class="ez-input"
                                onClick={() =>
                                  setopenPropertiesDialog(!openPropertiesDialog)
                                }
                              >
                                {value?.value}
                              </div>
                            </div>
                          </>
                        ))}
                      </div>
                    </>
                  )}
                  <button
                    type="submit"
                    className="button default-btn border-radius-5 mb-5 mt-4"
                  >
                    Mint Drop
                  </button>
                </form>
              </>
            ) : (
              <div
                className="complete-center text-center"
                style={{ minHeight: "75vh" }}
              >
                {loadingSectionValue}
              </div>
            )}
          </div>

          <div className="col-lg-8">
            {displayURL ? (
              <div
                className="item-details-img"
                style={{ width: "fit-content", margin: "auto" }}
              >
                <span
                  className={"like-btn-inactive complete-center"}
                  onClick={() => removeNFT()}
                  role="button"
                >
                  <i
                    className={"ri-delete-bin-line ri-lg"}
                    style={{ color: "black" }}
                  ></i>
                </span>

                <Asset
                  type={uploadFile?.type || "image"}
                  imageSrc={displayURL}
                  thumbnail={displayURL}
                  videoSrc={[displayURL]}
                  objectFit="cover"
                  onClick={onUploadClick}
                />
              </div>
            ) : (
              <div style={{ minHeight: "300px" }} className="complete-center">
                <div className="d-flex" style={{ gridGap: "20px" }}>
                  <div
                    className="complete-center upload-wrapper-circle"
                    style={{ fontSize: "31px" }}
                    onClick={onUploadClick}
                  >
                    <i className="ri-file-gif-line ri-lg"></i>
                  </div>
                  <div
                    className="complete-center upload-wrapper-circle"
                    style={{ fontSize: "31px" }}
                    onClick={onUploadClick}
                  >
                    <i className="ri-image-add-line ri-lg"></i>
                  </div>
                  <div
                    className="complete-center upload-wrapper-circle"
                    style={{ fontSize: "31px" }}
                    onClick={onUploadClick}
                  >
                    <i className="ri-video-upload-line ri-lg"></i>
                  </div>
                </div>
                <div className="create-nft-upload-title mt-4">
                  Upload assets
                </div>
              </div>
            )}
            {displaythumbnailURL ? (
              <div
                className="item-details-img mt-4"
                style={{ width: "fit-content", margin: "auto" }}
              >
                <span
                  className={"like-btn-inactive complete-center"}
                  onClick={() => removeNFT("thumbnail")}
                  role="button"
                >
                  <i
                    className={"ri-delete-bin-line ri-lg"}
                    style={{ color: "black" }}
                  ></i>
                </span>

                <Asset
                  type={uploadthumbnailFile?.type || "image"}
                  imageSrc={displaythumbnailURL}
                  thumbnail={displaythumbnailURL}
                  videoSrc={[displaythumbnailURL]}
                  objectFit="cover"
                />
              </div>
            ) : (
              <div style={{ minHeight: "300px" }} className="complete-center">
                <div className="d-flex" style={{ gridGap: "20px" }}>
                  <div
                    className="complete-center upload-wrapper-circle"
                    style={{ fontSize: "31px" }}
                    onClick={() => onUploadClick("thumbnail")}
                  >
                    <i className="ri-file-gif-line ri-lg"></i>
                  </div>
                  <div
                    className="complete-center upload-wrapper-circle"
                    style={{ fontSize: "31px" }}
                    onClick={() => onUploadClick("thumbnail")}
                  >
                    <i className="ri-image-add-line ri-lg"></i>
                  </div>
                </div>
                <div className="create-nft-upload-title mt-4">
                  Upload thumbnail
                </div>
              </div>
            )}
            <input
              type="file"
              accept=".jpeg,.png,.jpg,.mp4,.mov,.avi,.wmv,.gif"
              ref={ref}
              style={{ visibility: "hidden" }}
              name="fileName"
              onChange={(e) => handleUpload(e.target.files[0])}
            />
            <input
              type="file"
              accept=".jpeg,.png,.jpg,.gif"
              ref={thumbnailRef}
              style={{ visibility: "hidden" }}
              name="fileName"
              onChange={(e) => handleUpload(e.target.files[0], "thumbnail")}
            />
          </div>
        </div>
      </div>
      <AddNFTProperties
        open={openPropertiesDialog}
        properties={nftProperties}
        handleSave={(e) => {
          setnftProperties(e);
          setopenPropertiesDialog(false);
        }}
        onClose={setopenPropertiesDialog}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return { name: state.main.name, userinfo: state.user, main: state.main };
};

const mapDispatchToProps = {
  setConfetti,
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateDropArea);
