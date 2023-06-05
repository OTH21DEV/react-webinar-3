import { memo, useCallback, useMemo, useEffect } from "react";
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
import BtnLogin from "../../components/btn-login";

function Article() {
  const store = useStore();

  // Параметры из пути /articles/:id
  const params = useParams();

  useInit(() => {
    store.actions.article.load(params.id);
  }, [params.id]);

  const select = useSelector((state) => ({
    article: state.article.data,
    waiting: state.article.waiting,
    userName: state.login.userName,
  }));

  console.log(select);
  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.actions.basket.addToBasket(_id), [store]),
    //test
    //get token from API
    onSubmit: useCallback((login, password, navigate) => store.actions.login.getTokenFromApi(login, password, navigate), [store]),
    //delete user info on logout
    onLogOut: useCallback((token) => store.actions.login.logOut(token), [store]),
    //reset error
    onReset: useCallback(() => store.actions.login.resetError(), [store]),
  };

  return (
    <PageLayout>
      <BtnLogin name={select.userName} toLogin={"/login"} toProfile={"/profile"} onLogOut={callbacks.onLogOut}></BtnLogin>
      {/* <BtnLogin name={select.userName} toLogin={"/login"} toProfile={"/profile"} onLogOut={callbacks.onLogOut} onReset={callbacks.onReset} profile={select.login} ></BtnLogin> */}
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
