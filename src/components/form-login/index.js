import { memo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./style.css";
import { cn as bem } from "@bem-react/classname";

import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";

function FormLogin() {
  const cn = bem("Form");

  let navigate = useNavigate();
  const store = useStore();
  const select = useSelector((state) => ({
    error: state.login.error,
  }));
  // console.log(select.login);

  const tokenInLocalStorage = localStorage.getItem("token");

  const [user, setUser] = useState({
    login: "",
    password: "",
  });

  //   const callbacks = {
  //     onSubmit: (login,password,navigate) => props.onSubmit(login, password, navigate),

  //   };

  function handleForm(e) {
    e.preventDefault();
    // take token from api - put in login page
    store.actions.login.getTokenFromApi(user.login, user.password, navigate);
  }
  //   function handleForm(e) {
  //     e.preventDefault();
  //     //take token from api - put in login page
  //     // store.actions.login.getTokenFromApi(user.login, user.password, navigate);
  //     // callbacks.onSubmit(user.login, user.password, navigate)
  //   }
  return (
    <div className={cn("wrapper")}>
      {/* <form onSubmit={(e) => handleForm(e)}> */}
      {/* <form onSubmit={(e)=>{handleForm(e);callbacks.onSubmit(user.login, user.password, navigate)}}> */}
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
        {select.error ? <span className={cn("error-msg")}>{select.error}</span> : ""}
        {/* {props.error? <span className={cn("error-msg")}>{props.error}</span>:''} */}
        <button className={cn("btn")}>Войти</button>
      </form>
    </div>
  );
}
export default memo(FormLogin);
