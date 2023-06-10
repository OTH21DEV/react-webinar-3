import { memo, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { useDispatch, useSelector as useSelectorRedux } from "react-redux";
import { postComment } from "../../store-redux/comments/actions";
import formatDate from "../../utils/format-date";

function Comment({ session, article, comments }) {
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [id, setId] = useState("");
  let navigate = useNavigate();
  const params = useParams();

  function handleClick(e, id, type) {
    e.preventDefault();

    // navigate(`/articles/${params.id}`);
    setIsClicked(true);
    dispatch(postComment(text, id, type));
    //   window.location.reload()
  }

  const cn = bem("Comment");

  function login(e) {
    setIsClicked(true);
    setId(e.currentTarget.id);
  }

function cancel (){
    setIsClicked(false)
}
  return (
    <section className={cn("section")}>
      <div className={cn("heading")}>
        <h1>
          Комментарии<span> {`(${comments?.length})`}</span>
        </h1>
      </div>

      {comments &&
        comments?.map((comment, index) => {
          return (
            <div className={cn("wrapper")}>
              <div key={index} style={{ paddingLeft: `${comment.level * 30}px` }}>
                <div className={cn("title")}>
                  <h4>{comment.author}</h4>
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
                  {isClicked && id == comment._id && !session.exists && (
                    <div>
                      <p className={cn("login")}>
                        <Link to={"/login"} className={cn("write")}>
                          Войдите
                        </Link>
                        , чтобы иметь возможность ответить.
                        <a className={cn("cancel")} onClick={cancel}>
                          Отмена
                        </a>
                      </p>
                    </div>
                  )}

                  {isClicked && id == comment._id && session.exists && (
                    <div className={cn("input")} style={{ padding: 0 }}>
                      <h2>Новый ответ</h2>

                      <input value={text} type="text" onChange={(e) => setText(e.target.value)} />
                      <div>
                        <button className={cn("send-btn")} onClick={(e) => handleClick(e, comment._id, comment._type)}>
                          Отправить
                        </button>
                        <button className={cn("cancel-btn")} onClick={cancel}>Отмена</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

      {session.exists && !isClicked && (
        <div className={cn("input")}>
          <h2>Новый комментарий</h2>

          <input value={text} type="text" onChange={(e) => setText(e.target.value)} />
          <div>
            <button onClick={(e) => handleClick(e, article._id, article._type)}>Отправить</button>
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
    </section>
  );
}

export default memo(Comment);
