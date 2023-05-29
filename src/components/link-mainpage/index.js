import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

/**
 * Display LinkMainPage
 */
function LinkMainPage(props) {
  return (
    <Link className="link-mainpage" to={"/"}>
      Главная
    </Link>
  );
}

export default React.memo(LinkMainPage);
