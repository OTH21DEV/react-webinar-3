import { memo } from "react";
import { useNavigate,Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./style.css";
import { cn as bem } from "@bem-react/classname";

function BtnLogin(props) {
  const cn = bem("Btn");

  let navigate = useNavigate();
  let pathArray = window.location.pathname.split("/");
  let path = pathArray[1];
  console.log(path);
  function handleClick() {
    navigate("/login");
  }

  return (
    <div className={cn("login")}>
      {path == "login" ? (
        <button onClick={handleClick}>Вход</button>
      ) : (
        <>
        <Link>{props.name}</Link>
          <button onClick={handleClick}>Выйти</button>
        </>
      )}
    </div>
  );
}
export default memo(BtnLogin);
