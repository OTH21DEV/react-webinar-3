import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import "./style.css";

/**
 * Display form in login page
 * @param {Func} props.onSubmit get token from API
 * @param {String} props.error error message
 * @returns {HTMLElement}
 */
function FormLogin(props) {
  const cn = bem("Form");

  let navigate = useNavigate();

  const [user, setUser] = useState({
    login: "",
    password: "",
  });

  //get token from API
  const callbacks = {
    onSubmit: (login, password) => props.onSubmit(login, password),
  };

  function handleForm(e) {
    e.preventDefault();
    callbacks.onSubmit(user.login, user.password);
    navigate("/profile");
  }

  return (
    <div className={cn("wrapper")}>
      <form onSubmit={(e) => handleForm(e)}>
        <h2>Вход</h2>
        <div className={cn("input")}>
          <label>Логин</label>
          <input type="text" value={user.login} onChange={(e) => setUser({ ...user, login: e.target.value })}></input>
        </div>

        <div className={cn("input")}>
          <label>Пароль</label>
          <input type="text" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}></input>
        </div>

        {props.error ? <span className={cn("error-msg")}>{props.error}</span> : ""}

        <button className={cn("btn")}>Войти</button>
      </form>
    </div>
  );
}

FormLogin.propTypes = {
  props: PropTypes.objectOf(
    PropTypes.shape({
      onSubmit: PropTypes.func,
      error: PropTypes.string,
    }).isRequired
  ),
};
export default memo(FormLogin);
