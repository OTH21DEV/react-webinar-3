import { memo,useEffect,useCallback } from "react";
import PropTypes from "prop-types";
import btnLogin from "../../components/btn-login";
import BtnLogin from "../../components/btn-login";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import FormLogin from "../../components/form-login";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";

import useSelector from "../../hooks/use-selector";


function Login() {
  const { t } = useTranslate();
  const store = useStore();

  const select = useSelector((state) => ({
    error: state.login.error,
  }));




//   const callbacks = {
//     onSubmit: useCallback((login,password,navigate) =>  store.actions.login.getTokenFromApi(login,password,navigate), [store]),
    
//     // openModalBasket: useCallback(() => store.actions.modals.open("basket"), [store]),
//     // //Текущая страница
//     // setCurrentPage: useCallback((page) => store.actions.catalog.setCurrentPage(page), [store]),
//     // //Загрузка товаров текущей страницы
//     // setItems: useCallback((limit, skip) => store.actions.catalog.setItemsInCurrentPage(limit, skip), [store]),
//   };





  console.log(select.error);
//   useEffect(() => {
//     store.actions.login.getTokenFromApi();
//   }, [], true);

// console.log( store.actions.login.getTokenFromApi())
  return (
    <PageLayout>
      <BtnLogin />
      <Head title={t("title")} />

      <Navigation />
      {/* <FormLogin onSubmit={callbacks.onSubmit} error={select.error}/> */}
      <FormLogin />
    </PageLayout>
  );
}

export default memo(Login);
