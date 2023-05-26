import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";

/**
 * Display header
 * @param {String} title header title
 * @returns
 */
function Head({ title }) {
  return (
    <div className="Head">
      <h1>{title}</h1>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
