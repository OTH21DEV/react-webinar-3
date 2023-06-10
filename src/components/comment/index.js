import { memo, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import shallowequal from "shallowequal";
import "./style.css";
import { useDispatch, useSelector as useSelectorRedux } from "react-redux";
import { postComment } from "../../store-redux/comments/actions";
import commentAction from "../../store-redux/comments/actions";
import formatDate from "../../utils/format-date";

function Comment({ session, article, comments }) {
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [id, setId] = useState("");

  function handleClick(e) {
    e.preventDefault();

    dispatch(postComment(text, article._id, article._type));
  }

  const cn = bem("Comment");

  function login(e) {
    setIsClicked(true);
    setId(e.currentTarget.id);
  }

  return (
    <>
      <div className={cn("heading")}>
        <h1>
          Комментарии<span> {`(${comments?.length})`}</span>
        </h1>
        {/* <div>{`(${comments?.length})`}</div> */}
      </div>

      {comments &&
        comments.map((comment, index) => {
          return (
            <div key={index} className={cn("wrapper")}>
              <div className={cn("title")}>
                {/* <h4>{session?.user.profile.name}</h4> */}
                {/* <h4>{session.exists && session?.user.profile.name}</h4> */}
                <p>{formatDate(comment.dateCreate)}</p>
              </div>
              <div>
                <p className={cn("text")}>{comment.text}</p>
                <a
                  className={cn("response-btn")}
                  onClick={(e) => {
                    login(e);
                  }}
                  id={comment._id}
                >
                  Ответить
                </a>
                {id == comment._id && !session.exists && (
                  <div>
                    <p className={cn("login")}>
                      <Link to={"/login"} className={cn("write")}>
                        Войдите
                      </Link>
                      , чтобы иметь возможность комментировать
                      <a href={`/articles/${article._id}`} className={cn("cancel")}>
                        Отмена
                      </a>
                    </p>
                  </div>
                )}

                {id == comment._id && session.exists && (
                  <div className={cn("input")}>
                    <h2>Новый ответ</h2>

                    <input value={text} type="text" onChange={(e) => setText(e.target.value)} />
                    <div>
                      <button className={cn("send-btn")}>Отправить</button>
                      <button>Отмена</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

      {session.exists && !isClicked &&(
        <div className={cn("input")}>
          <h2>Новый комментарий</h2>

          <input value={text} type="text" onChange={(e) => setText(e.target.value)} />
          <div>
            <button>Отправить</button>
          </div>
        </div>
      )}

      {!session.exists && (
        <div className={cn("wrapper-login")}>
          <p className={cn("login")}>
            <Link to={"/login"} className={cn("write")}>
              Войдите
            </Link>
            , чтобы иметь возможность комментировать
          </p>
        </div>
      )}
    </>
  );
}

export default memo(Comment);
