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
import { debounce } from "lodash";

// import useActiveWeb3React from "../../../hooks/useActiveWeb3React";
import Asset from "../../Image/Asset";
import API from "../../../services/API";
import Loading from "../../Loading/Loading";
import { setConfetti } from "../../../redux/actions/main";
import { getAllCollectionCategories } from "../../../redux/actions/collection";
import CustomInput from "../../Common/CustomInput";

const FormSchema = Yup.object().shape({
  name: Yup.string().required("Name is must."),
  description: Yup.string(),
  telegram: Yup.string(),
  discord: Yup.string(),
  instagram: Yup.string(),
  medium: Yup.string(),
  websiteURL: Yup.string(),
});

const EditCollection = (props) => {
  // const { library, account } = useActiveWeb3React();
  const { web3 } = props?.main;
  const { account } = web3;
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
  const [isVerified, setisVerified] = useState(false);
  const [isAccepted, setisAccepted] = useState(false);
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
        setisVerified(response?.data?.isVerified);
        setisAccepted(response?.data?.isAccepted);
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
      data["isVerified"] = isVerified;
      data["isAccepted"] = isAccepted;
      data["owner"] = collectionDetails?.owner;

      if (data.name) {
        data.name = collectionDetails?.name;
        data.newName = newCollectionDetails?.name;
      } else {
        data.name = newCollectionDetails?.name;
      }
      setState(1);
      let result = await API.adminUpdateCollection(data);
      setCollectionDetails(result?.data);
      setState(0);
      toast.success("Collection updated successfully");
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

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleSubmit = async () => {
    if (nameVerification === "fail") return;
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
        ? await toBase64(logoImage?.file)
        : collectionDetails?.logo;
      const banner = bannerImage?.file
        ? await toBase64(bannerImage?.file)
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
      updateCollection(data);
      return;
    } catch (error) {
      setState(0);
      if (typeof error?.message === "string") toast.error(error?.message);
      else toast.error(error?.response?.data?.msg || "Something went wrong");
    }
  };

  const deleteCollection = async () => {
    const data = {
      name: collectionDetails?.name,
      owner: collectionDetails?.owner,
    };
    const res = await API.adminDeleteCollection(data);
    toast.success("Collection deleted successfully");
    router.push(`/admin/users/edit/${collectionDetails?.owner}`);
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

  return (
    <>
      <div className="collection-widget-area pt-20 pb-70">
        <div className="section-title">
          <h2>( Admin ) Edit Collection</h2>
        </div>
        <div className="row pt-45 justify-content-center">
          <div className="col-lg-3">
            <div className="featured-card box-shadow">
              <div
                className="featured-card-img"
                role="button"
                onClick={() =>
                  router.push(
                    `/admin/users/collection?name=${collectionDetails?.name}`
                  )
                }
              >
                <Link
                  href={`/admin/users/collection?name=${collectionDetails?.name}`}
                >
                  <>
                    <a style={{ height: "150px" }}>
                      <img
                        src={collectionDetails?.banner}
                        alt="Images"
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </a>
                    <div className="text-center">
                      <span className="collection-card-logo">
                        <img
                          src={collectionDetails?.logo}
                          alt="Images"
                          style={{
                            height: "100%",
                            width: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </span>
                    </div>
                  </>
                </Link>
              </div>

              <div className="content text-center">
                <h3>
                  <Link
                    href={`/admin/users/collection?name=${collectionDetails?.name}`}
                  >
                    <a>{collectionDetails?.name}</a>
                  </Link>
                </h3>

                <div className="d-flex justify-content-between mt-4">
                  <span>Verified:</span>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={isVerified}
                      onClick={() => setisVerified(!isVerified)}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <span>Active:</span>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={isAccepted}
                      onClick={() => setisAccepted(!isAccepted)}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-9">
            {state ? (
              <LoadingWrapper>
                {state < 4 && (
                  <div className="mb-5">
                    <Loading />
                  </div>
                )}
              </LoadingWrapper>
            ) : (
              <div className="collection-form-area">
                <div className="collection-form">
                  <div className="preview-box">
                    <h3>Logo</h3>
                    <div className="col-4">
                      <div {...getRootProps({ className: "dropzone" })}>
                        <input {...getInputProps()} />
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
                      <input {...bannergetInputProps()} />
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
                      <div className="col-lg-12 col-md-12 d-flex justify-content-between">
                        <button
                          type="submit"
                          className="btn btn-lg btn-success border-radius-5"
                        >
                          {collectionDetails
                            ? "Update Details"
                            : "Create Collection"}
                        </button>
                        <div
                          className="btn btn-danger btn-lg"
                          onClick={() => deleteCollection()}
                        >
                          Delete
                        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(EditCollection);
