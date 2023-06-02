import { memo, useCallback } from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import BtnLogin from "../../components/btn-login";
import useSelector from "../../hooks/use-selector";

/**
 * Display main page
 * @returns {HTMLElement}
 */
function Main() {
  const store = useStore();

  useInit(
    () => {
      store.actions.catalog.initParams();
      store.actions.categories.getCategoriesFromApi()
    },
    [],
    true
  );

  const { t } = useTranslate();

  const select = useSelector((state) => ({
    error: state.login.error,
    userName: state.login.userName,
  }));

  const callbacks = {
    //get token from API
    onSubmit: useCallback((login, password, navigate) => store.actions.login.getTokenFromApi(login, password, navigate), [store]),
    //delete user info on logout
    onLogOut: useCallback((token) => store.actions.login.logOut(token), [store]),
  };

  return (
    <PageLayout>
      <BtnLogin name={select.userName} toLogin={"/login"} toProfile={"/profile"} onLogOut={callbacks.onLogOut}></BtnLogin>
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <CatalogFilter />
      <CatalogList />
    </PageLayout>
  );
}

export default memo(Main);
