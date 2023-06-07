import { memo } from "react";
import { useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./style.css";
import { cn as bem } from "@bem-react/classname";

/**
 * Display login btn and link
 * @param {Func} props.onLogOut func to delete the user info
 * @param {String} props.toLogin link to login
 * @param {String} props.name user name
 * @returns {HTMLLinkElement}
 */
function BtnLogin(props) {
  const cn = bem("Btn");

  let navigate = useNavigate();

  //delete user info with provided token
  const callbacks = {
    logout: () => props.onLogOut(),
  };

  function handleLogin() {
    navigate(props.toLogin);
  }

  function handleLogout() {
    navigate(props.toLogin);
    callbacks.logout();
  }
  return (
    <div className={cn("login")}>
      {!props.name ? (
        <button onClick={handleLogin}>Вход</button>
      ) : (
        <>
          <Link to={props.toProfile}>{props.name}</Link>
          <button onClick={handleLogout}>Выйти</button>
        </>
      )}
    </div>
  );
}

BtnLogin.propTypes = {
  props: PropTypes.objectOf(
    PropTypes.shape({
      onLogOut: PropTypes.func,
      toLogin: PropTypes.string,
      name: PropTypes.string,
    }).isRequired
  ),
};
export default memo(BtnLogin);
