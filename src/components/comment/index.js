import { memo, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import shallowequal from "shallowequal";
import "./style.css";
import { useDispatch, useSelector as useSelectorRedux } from "react-redux";
import { postComment } from "../../store-redux/comments/actions";
import commentAction from "../../store-redux/comments/actions";

function Comment({ session, article }) {
  const dispatch = useDispatch();

  const select = useSelectorRedux(
    (state) => ({
      article: state.article.data,
      waiting: state.article.waiting,
    }),
    shallowequal
  );

  const [text, setText] = useState("");
  console.log(text);

  console.log(select.article);

  function handleClick(e) {
    e.preventDefault();

    dispatch(postComment(text, select.article._id, select.article._type));
  }

  const cn = bem("Comment");
  return session.exists ? (
    <div className={cn("wrapper")}>
      <div>
        <h1 className={cn("title")}>Комментарии</h1>
        <span></span>
      </div>
      <div className={cn("input")}>
        <h2>Новый комментарий</h2>

        <input value={text} type="text" onChange={(e) => setText(e.target.value)} />

        <button onClick={(e) => handleClick(e)}>Отправить</button>
      </div>
    </div>
  ) : (
    <div className={cn("wrapper")}>
      <div>
        <h1 className={cn("title")}>Комментарии</h1>
        <span></span>
      </div>
      <div>
        <p className={cn("login")}>
          <span>Войдите</span>, чтобы иметь возможность комментировать
        </p>
      </div>
    </div>
  );
}

export default memo(Comment);
