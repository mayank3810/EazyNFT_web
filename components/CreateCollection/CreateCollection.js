import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { useRouter } from "next/router";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import Asset from "../Image/Asset";
import API from "../../services/API";
import Loading from "../Loading/Loading";
import AuthorProfile from "../Collection/AuthorProfile";
import { setConfetti } from "../../redux/actions/main";
import { getAllCollectionCategories } from "../../redux/actions/collection";
import imageCompression from "browser-image-compression";
import CustomInput from "../Common/CustomInput";
import { debounce } from "lodash";

const FormSchema = Yup.object().shape({
  name: Yup.string().required("Name is must."),
  description: Yup.string(),
  telegram: Yup.string(),
  discord: Yup.string(),
  instagram: Yup.string(),
  medium: Yup.string(),
  websiteURL: Yup.string(),
});

const CreateCollectionArea = (props) => {
  // const { library, account } = useActiveWeb3React();
  const { web3 } = props?.main;
  const { provider, desiredChainId, account } = web3;
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const {
    acceptedFiles: banneracceptedFiles,
    getRootProps: bannergetRootProps,
    getInputProps: bannergetInputProps,
  } = useDropzone();
  const router = useRouter();
  const [logoImage, setlogoImage] = useState({
    file: null,
    fileUrl: null,
  });
  const [bannerImage, setbannerImage] = useState({
    file: null,
    fileUrl: null,
  });
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [state, setState] = useState(0);
  const [collectionDetails, setCollectionDetails] = useState();
  const [nameVerification, setNameVerification] = useState();
  const collectionName = router?.query?.name;

  useEffect(() => {
    if (!props?.collection?.collectionCategories?.length)
      props.getAllCollectionCategories();
  }, []);

  useEffect(() => {
    const _categories = props?.collection?.collectionCategories;
    const _result = [];
    for (let i = 0; i < _categories.length; i++) {
      _result.push({
        key: _categories[i]?.categoryName,
        value: _categories[i]?.categoryName,
      });
    }
    setCategories(_result);
    handleCategories(_result?.[0]?.key);
  }, [props?.collection?.collectionCategories]);

  useEffect(() => {
    if (collectionName) {
      getCollection(collectionName);
    }
  }, [collectionName, account]);

  const getCollection = (collectionName) => {
    API.getCollection({ name: collectionName })
      .then((response) => {
        handleCategories(response?.data?.category?.key);
        setCollectionDetails(response?.data);
      })
      .catch((error) => {
        if (typeof error?.message === "string") toast.error(error?.message);
        else toast.error(error?.response?.data?.msg || "Something went wrong");
      });
  };

  const formik = useFormik({
    initialValues: {
      name: collectionDetails?.name,
      description: collectionDetails?.description,
      telegram: collectionDetails?.socialmedia?.telegram,
      discord: collectionDetails?.socialmedia?.discord,
      instagram: collectionDetails?.socialmedia?.instagram,
      medium: collectionDetails?.socialmedia?.medium,
      websiteURL: collectionDetails?.socialmedia?.websiteURL,
    },
    enableReinitialize: true,
    validationSchema: FormSchema,
    onSubmit: (values) => {
      handleSubmit();
    },
  });
  const { user } = props.userinfo;

  const handleCategories = (id) => {
    let _selectedCategories = [...selectedCategories];
    if (_selectedCategories.includes(id)) _selectedCategories = [];
    else _selectedCategories = [id];
    setSelectedCategories(_selectedCategories);
  };

  const handleImage = (media) => {
    if (!media) return;
    setlogoImage({
      file: media,
      fileUrl: URL.createObjectURL(media),
    });
  };

  const updateCollection = async (newCollectionDetails) => {
    try {
      let data = {};
      for (let key in newCollectionDetails) {
        if (key === "category") {
          if (newCollectionDetails[key] != collectionDetails[key]?.key)
            data[key] = {
              key: newCollectionDetails[key],
              value: newCollectionDetails[key],
            };
        } else if (newCollectionDetails[key] != collectionDetails[key]) {
          data[key] = newCollectionDetails[key];
        }
      }
      if (data.name) {
        data.name = collectionDetails?.name;
        data.newName = newCollectionDetails?.name;
      } else {
        data.name = newCollectionDetails?.name;
      }
      setState(1);
      let result = await API.updateCollection(data);
      setCollectionDetails(result?.data);
      setState(0);
      toast.success("Collection updated successfully");
      router.push(`/edit-collection?name=${newCollectionDetails?.name}`);
    } catch (error) {
      setState(0);
      if (typeof error?.message === "string") toast.error(error?.message);
      else toast.error(error?.response?.data?.msg || "Something went wrong");
    }
  };

  const handleBannerImage = (media) => {
    if (!media) return;
    setbannerImage({
      file: media,
      fileUrl: URL.createObjectURL(media),
    });
  };

  const toBase64 = (file, size) => {
    return new Promise(async (resolve, reject) => {
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
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async () => {
    if (nameVerification === "fail") return;
    setState(1);
    try {
      let {
        name,
        description,
        instagram,
        discord,
        medium,
        websiteURL,
        telegram,
      } = formik.values;
      let logo = logoImage?.file
        ? await toBase64(logoImage?.file, 0.1)
        : collectionDetails?.logo;
      const banner = bannerImage?.file
        ? await toBase64(bannerImage?.file, 0.8)
        : collectionDetails?.banner;
      const category = selectedCategories.length
        ? selectedCategories[0]
        : undefined;
      const data = {
        walletAddress: user?.walletAddress,
        signature: user?.signature,
        logo,
        banner,
        category,
        name,
        description,
        socialmedia: {
          websiteURL,
          discord,
          instagram,
          medium,
          telegram,
        },
      };
      window.scroll({ top: 0, behavior: "smooth" });
      if (collectionDetails) {
        updateCollection(data);
        return;
      }
      let result = await API.createCollection(data);
      setCollectionDetails(result?.data);
      setState(4);
      toast.success("Collection created successfully");
    } catch (error) {
      setState(0);
      if (typeof error?.message === "string") toast.error(error?.message);
      else toast.error(error?.response?.data?.msg || "Something went wrong");
    }
  };

  useEffect(() => {
    if (acceptedFiles.length) {
      handleImage(acceptedFiles[0]);
    }
  }, [acceptedFiles]);

  useEffect(() => {
    if (banneracceptedFiles.length) {
      handleBannerImage(banneracceptedFiles[0]);
    }
  }, [banneracceptedFiles]);

  const debouncedProfiles = useCallback(
    debounce((value) => verifyName(value), 500),
    []
  );

  useEffect(() => {
    if (formik.values.name) {
      if (collectionDetails && collectionDetails?.name == formik.values.name)
        return;
      debouncedProfiles(formik.values.name);
    }
  }, [formik.values.name]);

  const verifyName = (name) => {
    API.verifyCollectionName(name)
      .then((response) => {
        setNameVerification(response?.data ? "success" : "fail");
      })
      .catch((error) => {
        setNameVerification("fail");
      });
  };

  const loadingSection = () => {
    return (
      <>
        <h2>
          Collection {collectionName ? "updated" : "created"} successfully!
        </h2>
        <div>
          <Link href={`/collection/${collectionDetails?.name}`}>
            <button className="default-btn border-radius-5 mt-5">
              View Collection
            </button>
          </Link>
        </div>
      </>
    );
  };

  const loadingSectionValue = loadingSection(state);

  return (
    <>
      <div className="collection-widget-area pt-50 pb-70">
        <div className="section-title">
          <h2>{collectionDetails ? "Edit" : "Create"} Collection</h2>
        </div>
        <div className="row pt-45">
          <div className="col-lg-3">
            {!state ? (
              <AuthorProfile user={user} />
            ) : (
              <div className="featured-card box-shadow">
                <div className="featured-card-img">
                  <Link
                    href={
                      state === 4
                        ? `/collection/${collectionDetails?.name}`
                        : ""
                    }
                  >
                    <a style={{ height: "328px", width: "100%" }}>
                      <img
                        src={logoImage?.fileUrl || collectionDetails?.logo}
                        alt="Images"
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </a>
                  </Link>
                </div>

                <div className="content">
                  <h3>
                    <Link
                      href={
                        state === 4
                          ? `/collection/${collectionDetails?.name}`
                          : ""
                      }
                    >
                      <a>{formik.values.name} </a>
                    </Link>
                  </h3>
                  <Link href="/author-profile">
                    <a className="featured-user-option">
                      <img
                        src={
                          user?.profilePic ||
                          "../images/featured/featured-user2.jpg"
                        }
                        alt="Images"
                      />
                      <span>Created by @{user.username || user.name}</span>
                    </a>
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className="col-lg-9">
            {state ? (
              <LoadingWrapper>
                {state < 4 && (
                  <div className="mb-5">
                    <Loading />
                  </div>
                )}
                {state === 4 && (
                  <div className="mt-4 text-center">{loadingSectionValue}</div>
                )}
              </LoadingWrapper>
            ) : (
              <div className="collection-form-area">
                <div className="collection-form">
                  <div className="preview-box">
                    <h3>Logo</h3>
                    <div className="col-4">
                      <div {...getRootProps({ className: "dropzone" })}>
                        <input {...getInputProps()} accept=".jpeg,.png,.jpg" />
                        <div className="previewButton">
                          {logoImage?.file?.name || collectionDetails?.logo ? (
                            <>
                              <Asset
                                type={logoImage?.file?.type || "image"}
                                imageSrc={
                                  logoImage.fileUrl || collectionDetails?.logo
                                }
                                thumbnail={
                                  logoImage.fileUrl || collectionDetails?.logo
                                }
                                objectFit="cover"
                              />
                              <div className="previewButton-button ripple-effect upload-hover"></div>
                            </>
                          ) : (
                            <>
                              <label className="previewButton-button ripple-effect">
                                Upload Logo
                              </label>
                              <span className="previewButton-file-name"></span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="preview-box">
                    <h3>Banner Image</h3>
                    <div {...bannergetRootProps({ className: "dropzone" })}>
                      <input
                        {...bannergetInputProps()}
                        accept=".jpeg,.png,.jpg"
                      />
                      <div
                        className="previewButton"
                        style={{ height: "200px", width: "100%" }}
                      >
                        {bannerImage?.file?.name ||
                        collectionDetails?.banner ? (
                          <>
                            <Asset
                              type={bannerImage?.file?.type || "image"}
                              imageSrc={
                                bannerImage.fileUrl || collectionDetails?.banner
                              }
                              thumbnail={
                                bannerImage.fileUrl || collectionDetails?.banner
                              }
                              objectFit="cover"
                              width="100%"
                            />
                            <div className="previewButton-button ripple-effect upload-hover"></div>
                          </>
                        ) : (
                          <>
                            <label className="previewButton-button ripple-effect">
                              Upload Banner Image
                            </label>
                            <span className="previewButton-file-name"></span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="collection-category">
                    <h3>Category</h3>
                    <ul>
                      {categories.map((category, index) => (
                        <li
                          className={
                            selectedCategories.includes(category.key)
                              ? "active"
                              : ""
                          }
                          onClick={() => handleCategories(category.key)}
                        >
                          <span>{category.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                      <div className="col-lg-12">
                        <CustomInput
                          type="text"
                          name="name"
                          id="name"
                          className="form-control"
                          placeholder="Teasures of sand"
                          label="Name"
                          errors={formik.errors}
                          touched={formik.touched}
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.values.name && nameVerification && (
                          <div
                            className={
                              nameVerification === "success"
                                ? "text-success"
                                : "text-danger"
                            }
                            style={{ position: "relative", top: "-15px" }}
                          >
                            {nameVerification === "success"
                              ? "This name is available"
                              : "The name is already taken"}
                          </div>
                        )}
                      </div>

                      <div className="col-lg-12 col-md-12">
                        <CustomInput
                          type="textarea"
                          name="description"
                          className="form-control"
                          id="description"
                          cols="30"
                          rows="5"
                          placeholder="e. g. “after purchasing you’ll able to get the real product”"
                          label="Description"
                          errors={formik.errors}
                          touched={formik.touched}
                          value={formik.values.description}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>

                      <div className="col-lg-12">
                        <CustomInput
                          type="text"
                          name="websiteURL"
                          id="websiteURL"
                          className="form-control"
                          placeholder="Website URL"
                          label="Links"
                          errors={formik.errors}
                          touched={formik.touched}
                          value={formik.values.websiteURL}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>

                      <div className="col-lg-12">
                        <CustomInput
                          type="text"
                          name="discord"
                          id="discord"
                          className="form-control"
                          placeholder="Discord URL"
                          errors={formik.errors}
                          touched={formik.touched}
                          value={formik.values.discord}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>

                      <div className="col-lg-12">
                        <CustomInput
                          type="text"
                          name="instagram"
                          id="instagram"
                          className="form-control"
                          placeholder="Instagram URL"
                          errors={formik.errors}
                          touched={formik.touched}
                          value={formik.values.instagram}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>

                      <div className="col-lg-12">
                        <CustomInput
                          type="text"
                          name="medium"
                          id="medium"
                          className="form-control"
                          placeholder="Medium URL"
                          errors={formik.errors}
                          touched={formik.touched}
                          value={formik.values.medium}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                      <div className="col-lg-12">
                        <CustomInput
                          type="text"
                          name="telegram"
                          id="telegram"
                          className="form-control"
                          placeholder="Telegram URL"
                          errors={formik.errors}
                          touched={formik.touched}
                          value={formik.values.telegram}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <button
                          type="submit"
                          className="default-btn border-radius-5"
                        >
                          {collectionDetails
                            ? "Update Details"
                            : "Create Collection"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0;
  min-height: 100%;
  min-width: 100%;
`;

const mapStateToProps = (state) => {
  return {
    name: state.main.name,
    userinfo: state.user,
    main: state.main,
    collection: state.collectibles,
  };
};

const mapDispatchToProps = {
  setConfetti,
  getAllCollectionCategories,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCollectionArea);
