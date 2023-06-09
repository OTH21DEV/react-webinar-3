import { memo, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import shallowequal from "shallowequal";
import "./style.css";
import { useDispatch, useSelector as useSelectorRedux } from "react-redux";
import { postComment } from "../../store-redux/comments/actions";
import commentAction from "../../store-redux/comments/actions";
import formatDate from "../../utils/format-date";
import treeToList from "../../utils/tree-to-list";

function Comments({ session, article, comments }) {
  const dispatch = useDispatch();

  console.log(comments);
  console.log(article);
  const cn = bem("Comments");

  return (
    session.exists &&
    comments?.map((comment, index) => {
      return (
        <div key={index} className={cn("wrapper")}>
          <div className={cn("title")}>
            <h4>{session.user.profile.name}</h4>
            <p>{formatDate(comment.dateCreate)}</p>
          </div>
          <p className={cn("text")}>{comment.text}</p>
          <a href="">Ответить</a>
        </div>
      );
    })
  );
}
export default memo(Comments);
