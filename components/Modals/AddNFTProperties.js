import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

function AddNFTProperties(props) {
  const [array, setarray] = useState([]);

  useEffect(() => {
    if (!props?.properties?.length)
      setarray([
        {
          key: "",
          value: "",
        },
      ]);
    else setarray(props?.properties);
  }, [props?.open]);

  const onClose = () => {
    props?.onClose(false);
  };

  const handleAdd = () => {
    const _array = [...array];
    _array.push({
      key: "",
      value: "",
    });
    setarray(_array);
  };

  const handleDelete = (index) => {
    const _array = [...array];
    _array.splice(index, 1);

    if (!_array.length)
      _array.push({
        key: "",
        value: "",
      });
    setarray(_array);
  };

  const handleChange = (index, key, value) => {
    const _array = [...array];
    _array[index][key] = value;
    setarray(_array);
  };

  const handleSave = () => {
    let result = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i].key && array[i].value) result.push(array[i]);
    }
    props.handleSave(result);
  };

  return (
    <div
      style={{ display: props?.open ? "flex" : "none" }}
      className="modal"
    >
      <div
        className="modal-content"
        style={{
          width: "500px",
          minHeight: "250px",
          maxWidth: "100%",
          height: "auto",
        }}
      >
        <span onClick={() => onClose()} className="close-btn">
          <i className="ri-close-fill"></i>
        </span>
        <h5 className="text-center mt-3" style={{ color: "black" }}>
          Add NFT Properties
        </h5>

        {/* <div className="input-subtitle text-center mt-2">
          Properties show up underneath your item.
        </div> */}

        <div className="mt-4">
          <div className="row">
            <div className="col-5">
              <div>Type</div>
            </div>
            <div className="col-5">
              <div>Name</div>
            </div>

            <div className="col-2"></div>
          </div>
          <div style={{ maxHeight: "225px", overflow: "hidden" }}>
            {array.map((value, index) => (
              <div key={index} className="row" style={{ overflow: "hidden" }}>
                <div className="col-5">
                  <input
                    className="add-property-input"
                    value={value.key}
                    onChange={(e) =>
                      handleChange(index, "key", e?.target?.value)
                    }
                  />
                </div>
                <div className="col-5">
                  <input
                    className="add-property-input"
                    value={value.value}
                    onChange={(e) =>
                      handleChange(index, "value", e?.target?.value)
                    }
                  />
                </div>

                <div
                  className="col-2 complete-center"
                  style={{ justifyContent: "end" }}
                >
                  <span role="button" onClick={() => handleDelete(index)}>
                    <i className="ri-close-fill"></i>
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-between mt-3">
            <div
              role="button"
              className="d-flex mt-4 p-0"
              onClick={handleAdd}
              style={{
                maxWidth: "150px",
                fontSize: "14px",
                alignItems: "center",
              }}
            >
              Add More +
            </div>
            <button
              className="polyone-button mt-4"
              style={{ maxWidth: "150px" }}
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { userinfo: state.user, main: state.main };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(AddNFTProperties);
