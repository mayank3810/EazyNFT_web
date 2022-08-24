import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
// import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import Asset from "../Image/Asset";
import API from "../../services/API";
import Loading from "../Loading/Loading";
import { setConfetti } from "../../redux/actions/main";
import { getTokenId } from "../../utils/web";
import { ethers } from "ethers";

import { PolyoneNFTABI } from "../../utils/abs/abs";
import CustomInput from "../Common/CustomInput";
import config from "../../config/config";
import AddNFTProperties from "../Modals/AddNFTProperties";
import { CHAINS } from "../../chains.ts";
import imageCompression from "browser-image-compression";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FormSchema = Yup.object().shape({
  name: Yup.string().required("NFT name is required."),
  description: Yup.string().required("NFT description is required."),
  royalty: Yup.number("Royalty must be number")
    .min(1, "Royalty should be more than 1")
    .max(50, "Exceded maximum limit"),
  price: Yup.number("Price must be number"),
  size: Yup.string(),
  property: Yup.string(),
  copies: Yup.number()
    .min(1, "Number of copy should be more than 1")
    .max(100, "Exceded maximum limit"),
  websiteURL: Yup.string(),
});

const CreateNFTArea = (props) => {
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
  const [openPropertiesDialog, setopenPropertiesDialog] = useState(false);
  const [nftProperties, setnftProperties] = useState([]);
  const [uploadFile, setuploadFile] = useState(null);
  const [displayURL, setdisplayURL] = useState("");

  const [mfc_date, setMfc_date] = useState(new Date());
  const [expiry, setExpiry] = useState(new Date());
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      royalty: 10,
      price: "",
      size: "",
      property: "",
      copies: 1,
      websiteURL: "",
    },
    validationSchema: FormSchema,
    onSubmit: (values) => {
      handleSubmit();
    },
  });
  const { user } = props.userinfo;
  const ref = useRef();

  const handleCategories = (id) => {
    let _selectedCategories = [...selectedCategories];
    if (_selectedCategories.includes(id)) _selectedCategories = [];
    else _selectedCategories = [id];
    setSelectedCategories(_selectedCategories);
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
      error = "Wrong Network: Please change to Ethereum or Polygon";
    else if (!selectedCategories?.length) error = "Please select NFT Category";

    if (error) {
      toast.error(error);
      return true;
    }

    return false;
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

  const handleSubmit = async () => {
    let { name, description, copies, royalty, websiteURL } = formik.values;
    // console.log(formik.values);
    try {
      let { name, description, copies, royalty, websiteURL } = formik.values;
      copies = Number(copies);
      royalty = Number(royalty);
      if (checkValidations()) return;
      window.scroll({ top: 0, behavior: "smooth" });
      setState(1);
      let thumbnail = "";
      if (uploadFile?.type?.includes("video")) {
        const _file = await generateVideoThumbnail(uploadFile);
        thumbnail = await toBase64(_file, 0.05);
      } else {
        thumbnail = await toBase64(uploadFile, 0.05);
      }

      let image64 = await toBase64(uploadFile, 0.5);
      const _metaData = {
        name,
        description,
        walletAddress: user?.walletAddress,
        signature: user?.signature,
        image: image64,
      };

      setState(1);
      setmessage("Uploading...");
      let _metaDataResponse = await API.createMeta(_metaData);
      if (!_metaDataResponse?.result) {
        clear();
        toast.error("Error in uploading NFT");
        return;
      }
      _metaDataResponse = _metaDataResponse?.result;
      setmessage("Waiting for confirmation");
      setsubMessage("Confirm the request that appeared just now.");
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        config?.contractDetails[desiredChainId].polyoneContractAddress,
        PolyoneNFTABI,
        signer
      );
      const transaction = await contract.mintNFT(
        copies,
        royalty,
        _metaDataResponse?.ipfs
      );
      console.log("NFT txn hash: ", transaction?.hash);
      setmessage("Your Certificate is being minted");
      setsubMessage("");
      _metaDataResponse["etherScan"] = transaction?.hash;
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
        blockchainChainId: Number(desiredChainId),
        collectionName: selectedCollection,
        thumbnail,
        properties: [
          {
            key: "Expiry",
            value: expiry,
          },
          {
            key: "Manufacture Date",
            value: mfc_date,
          },
        ],
      };

      // if (nftProperties?.length) _createNFT["properties"] = nftProperties;
      let _categories = categories.filter((value) => {
        if (selectedCategories.includes(value.key)) return value;
      });
      if (_categories && _categories.length) {
        _createNFT["categories"] = _categories[0];
      }
      let nftRes = await API.createNFT(_createNFT);
      let result = await transaction.wait();
      const contractTokenId = await getTokenId(result?.transactionHash);
      let _saveNFT = {
        contractTokenId,
        tokenId: nftRes?.result?.tokenId,
        walletAddress: user?.walletAddress,
        signature: user?.signature,
        action: "updateTokenId",
      };
      API.saveNFT(_saveNFT);
      setTokenDetails(nftRes?.result);
      props.setConfetti(true);
      setnftTxn(null);
      setmessage("Your Certificate has been minted congratulations!");
      setsubMessage("You have successfully minted your NFT");
      setState(4);
      toast.success("Certificate created successfully");
    } catch (error) {
      setState(0);
      if (typeof error?.message === "string") toast.error(error?.message);
      else toast.error(error?.response?.data?.msg || "Something went wrong");
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.walletAddress)
      API.getCollections({
        walletAddress: user?.walletAddress,
        filter: { owner: user?.walletAddress },
        projection: { name: true, _id: false },
      })
        .then((response) => {
          const collections = response?.data?.result || [];
          let _selected = collections.length ? collections[0]?.name : "";
          setselectedCollection(_selected);
          setuserCollection(collections);
        })
        .catch((error) => {
          toast.error(error?.response?.message || "Something went wrong");
        });
  }, [user?.walletAddress]);

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

  const handleUpload = (media) => {
    if (!media || state !== 0) return;
    setuploadFile(media);
    setdisplayURL(URL.createObjectURL(media));
  };
  const removeNFT = () => {
    if (state !== 0) return;
    setuploadFile(null);
    setdisplayURL("");
  };

  const onUploadClick = () => {
    ref.current.click();
  };

  const loadingSectionValue = loadingSection();

  return (
    <>
      <div className="container">
        <div className="row create-nft-header">
          <div className="col-lg-4">
            <div className="title">Create Tags</div>
          </div>
          {/* <div className="col-lg-8">
            <div className="web-only upload-title">Upload NFT</div>
          </div> */}
        </div>

        {state === 0 ? (
          <>
            <form onSubmit={formik.handleSubmit}>
              <div className="row create-nft-form-section">
                <div className="col-lg-12">
                  {displayURL ? (
                    <div
                      className="item-details-img"
                      style={{ width: "fit-content", margin: "auto" }}
                    >
                      <span
                        className={"like-btn-inactive complete-center"}
                        onClick={removeNFT}
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
                      />
                    </div>
                  ) : (
                    <div
                      style={{ minHeight: "400px" }}
                      className="complete-center"
                    >
                      <div className="d-flex" style={{ gridGap: "20px" }}>
                        <div
                          className="complete-center upload-wrapper-circle"
                          style={{ fontSize: "31px" }}
                          onClick={onUploadClick}
                        >
                          <i className="ri-image-add-line ri-lg"></i>
                        </div>
                      </div>
                      <div className="create-nft-upload-title mt-4">
                        Upload assets
                      </div>
                      <div className="create-nft-upload-sub-title">
                        Image, Video, Audio, or 3D Model <br />
                        File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, GIF
                        MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB
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
                </div>
                <div className="col-lg-6">
                  {/* <CustomInput
                    id="name"
                    class="ez-input"
                    type="text"
                    label="Name"
                    errors={formik.errors}
                    touched={formik.touched}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  /> */}

                  <CustomInput
                    id="name"
                    class="ez-input"
                    type="text"
                    label="Product Name"
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
                </div>

                <div className="col-lg-6">
                  <div className="ez-input-container">
                    <label className={"label"} htmlFor="expiry">
                      Manufacture Date
                    </label>
                    <DatePicker
                      className="ez-input"
                      id="expiry"
                      selected={expiry}
                      onChange={(date) => setExpiry(date)}
                    />
                  </div>
                  {/* <button onClick={() => setMfc_date(false)} className="default-btn btn-sm">Never</button> */}
                  {/* <DatePickerField name="mfc_date" /> */}
                  {/* <CustomInput
                    id="mfc_date"
                    class="ez-input"
                    type="date"
                    label="Manufacture Date"
                    errors={formik.errors}
                    touched={formik.touched}
                    value={formik.values.mfc_date}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  /> */}

                  <div className="ez-input-container">
                    <label className={"label"} htmlFor="mfc_date">
                      Expiry Date
                    </label>
                    <DatePicker
                      className="ez-input"
                      id="mfc_date"
                      selected={mfc_date}
                      onChange={(date) => setMfc_date(date)}
                    />
                  </div>
                  {/* <CustomInput
                    id="expiry"
                    class="ez-input"
                    type="text"
                    label="Expiry"
                    errors={formik.errors}
                    touched={formik.touched}
                    value={formik.values.expiry}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  /> */}
                  <div className="mb-4 ez-input-container">
                    <label>Select Category</label>
                    <select
                      className="form-select ez-form-select"
                      value={selectedCategories[0]}
                      onChange={(e) => handleCategories(e?.target?.value)}
                    >
                      {categories.map((value, index) => (
                        <option key={index} value={value.key}>
                          {value.value}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* <CustomInput
                    id="name"
                    class="ez-input"
                    type="text"
                    label="NFC Hash"
                    errors={formik.errors}
                    touched={formik.touched}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <CustomInput
                    id="name"
                    class="ez-input"
                    type="text"
                    label="NFC Hash"
                    errors={formik.errors}
                    touched={formik.touched}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  /> */}
                </div>
                <div className="col-lg-12">
                  <button type="submit" className="default-btn center mt-4 ">
                    Mint Tag
                  </button>
                </div>
              </div>
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
      {/* <AddNFTProperties
        open={openPropertiesDialog}
        properties={nftProperties}
        handleSave={(e) => {
          setnftProperties(e);
          setopenPropertiesDialog(false);
        }}
        onClose={setopenPropertiesDialog}
      /> */}
    </>
  );
};

const mapStateToProps = (state) => {
  return { name: state.main.name, userinfo: state.user, main: state.main };
};

const mapDispatchToProps = {
  setConfetti,
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateNFTArea);
