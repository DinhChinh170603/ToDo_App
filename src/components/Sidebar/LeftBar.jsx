import "bootstrap-icons/font/bootstrap-icons.css";
import PropTypes from "prop-types";
import Categories from "./Leftbar/Categories";
import Filter from "./Leftbar/Filter";

export const LeftBar = (props) => {

  return (
    <div className="left-bar">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          value={props.search}
          onChange={(e) => props.setSearch(e.target.value)}
        />
      </div>
      <Filter />
      <Categories />
    </div>
  );
};

LeftBar.propTypes = {
  search: PropTypes.string,
  setSearch: PropTypes.func,
};

export default LeftBar;
