import { memo, useCallback,useEffect } from "react";
import BtnLogin from "../../components/btn-login";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import FormLogin from "../../components/form-login";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";

/**
 * Display login page
 * @returns {HTMLElement}
 */
function Login() {

  
  const { t } = useTranslate();
  const store = useStore();

  const select = useSelector((state) => ({
    error: state.login.error,
    userName: state.login.userName,
  }));


  const callbacks = {
    //get token from API
    onSubmit: useCallback((login, password, navigate) => store.actions.login.getTokenFromApi(login, password, navigate), [store]),
    //delete user info on logout
    onLogOut: useCallback((token) => store.actions.login.logOut(token), [store]),
    //test

      //reset error 
      onReset: useCallback(()=>store.actions.login.resetError(),[store])
  };

  return (
    <PageLayout>
      <BtnLogin name={select.userName} toLogin={"/login"} toProfile={"/profile"} onLogOut={callbacks.onLogOut} onReset={callbacks.onReset} profile={select.login} />
      <Head title={t("title")} />
      <Navigation />
      <FormLogin onSubmit={callbacks.onSubmit} error={select.error} onReset={callbacks.onReset}/>
    </PageLayout>
  );
}

export default memo(Login);
