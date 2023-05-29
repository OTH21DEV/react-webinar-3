import React from "react";
import "./style.css";

/**
 * Display wrapper
 */
function LinkBasketWrapper({ children }) {
  return <div className="link-basket-wrapper">{children}</div>;
}

export default React.memo(LinkBasketWrapper);
