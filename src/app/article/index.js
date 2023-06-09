import { memo, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import ArticleCard from "../../components/article-card";
import LocaleSelect from "../../containers/locale-select";
import TopHead from "../../containers/top-head";
import { useDispatch, useSelector as useSelectorRedux } from "react-redux";
import shallowequal from "shallowequal";
import articleActions from "../../store-redux/article/actions";

import Comment from "../../components/comment";
import Comments from "../../components/comments";

import useSelectorStore from "../../hooks/use-selector";
import { receiveComments } from "../../store-redux/comments/actions";
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";

function Article() {
  const store = useStore();

  const dispatch = useDispatch();

  // Параметры из пути /articles/:id
  const params = useParams();

  useInit(() => {
    //store.actions.article.load(params.id);
    dispatch(articleActions.load(params.id));
    dispatch(receiveComments(params.id));
  }, [params.id]);

  const select = useSelectorRedux(
    (state) => ({
      article: state.article.data,
      waiting: state.article.waiting,
      comments: state.comments.data.items,
    }),
    shallowequal
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const { t } = useTranslate();
  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.actions.basket.addToBasket(_id), [store]),
  };

  console.log(select.comments);

  function test(comments) {
    const root = { _id: null, children: [] };
    const commentsById = {};

    comments &&
      comments.forEach((comment) => {
        commentsById[comment._id] = comment;
        comment.children = [];
      });

    comments &&
      comments.forEach((comment) => {
        const parent = commentsById[comment.parent._id] || root;
        parent.children.push(comment);
      });
    return root.children;
  }

  console.log(test(select.comments));

  let filtered = test(select.comments);

  // let newArr = treeToList(filtered, (item, level));
  // console.log(newArr);

  const userAuth = useSelectorStore((state) => ({
    session: state.session,
  }));

  return (
    <PageLayout>
      <TopHead />
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t} />
      </Spinner>
      <Comment session={userAuth.session} articleId={params.id} article={select.article} comments={select.comments}></Comment>
      <Comments session={userAuth.session} articleId={params.id} article={select.article} comments={filtered}></Comments>
    </PageLayout>
  );
}

export default memo(Article);
