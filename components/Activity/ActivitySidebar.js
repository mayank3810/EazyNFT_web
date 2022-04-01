import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import { debounce } from "lodash";

const ActivitySidebar = (props) => {
  const [selectedCategory, setselectedCategory] = useState({});
  const [category, setcategory] = useState([]);
  const [search, setsearch] = useState("");
  const [searchValue, setsearchValue] = useState("");

  useEffect(() => {
    setcategory(props?.filterData);
  }, [props?.filterData]);

  const handleSelected = (key) => {
    const _selectedCategory = { ...selectedCategory };
    if (_selectedCategory[key]) delete _selectedCategory[key];
    else _selectedCategory[key] = true;
    setselectedCategory(_selectedCategory);

    // const _category = [...category];
    // _category.sort((a, b) => {
    //   if (_selectedCategory[a.categoryName]) return -1;
    //   return 1;
    // });
    // setcategory(_category);
  };

  const debounceCollectiables = useCallback(
    debounce((q) => setsearch(q), 500),
    []
  );

  useEffect(() => {
    props.updateFilter({
      search,
      selectedCategory: Object.keys(selectedCategory),
    });
  }, [search, selectedCategory]);

  const handleReset = () => {
    setselectedCategory({});
    setsearch("");
    setsearchValue("");
  };

  const handleSearchInput = (value) => {
    debounceCollectiables(value);
    setsearchValue(value);
  };

  return (
    <>
      <div className="side-bar-area pl-20">
        <div className="side-bar-widget">
          <h3 className="title">
            Filter
            <a role="button" onClick={handleReset}>
              Clear All
            </a>
          </h3>
          <form className="search-form">
            <input
              type="search"
              className="form-control"
              placeholder="Search keyword"
              value={searchValue}
              onChange={(e) => handleSearchInput(e?.target?.value)}
            />
            {/* <button type="submit">
              <i className="ri-search-line"></i>
            </button> */}
          </form>
        </div>

        <div className="side-bar-widget-categories">
          <h3 className="title">Categories</h3>
          <ul>
            {category.map((value, index) => (
              <li key={index}>
                <a
                  role="button"
                  className={selectedCategory[value?._id] ? "active" : ""}
                  onClick={() => handleSelected(value?._id)}
                >
                  {value?._id}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    main: state.main,
    userinfo: state.user,
    collectibles: state.collectibles,
  };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(ActivitySidebar);
