import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";

/**
 * Display list of items
 * @param {Array} list array of items
 * @param {Function} renderItem func to render items
 * @returns {HTMLElement}
 */
function List({ list, renderItem }) {
  return (
    <div className="List">
      {list.map((item) => (
        <div key={item._id} className="List-item">
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  renderItem: PropTypes.func,
};

List.defaultProps = {
  renderItem: (item) => {},
};

export default memo(List);
