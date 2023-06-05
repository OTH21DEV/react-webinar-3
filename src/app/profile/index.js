import { memo, useEffect, useCallback } from "react";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import BtnLogin from "../../components/btn-login";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import ProfileDetails from "../../components/profile-details";

/**
 * Display user profile page
 * @returns {HTMLElement}
 */
function Profile() {
  const tokenInLocalStorage = localStorage.getItem("token");
  const { t } = useTranslate();

  const store = useStore();

  useEffect(() => {
    if (tokenInLocalStorage) {
      store.actions.login.getUserDataFromApi(tokenInLocalStorage);
    }
  }, [tokenInLocalStorage]);
  const select = useSelector((state) => ({
    error: state.login.error,
    login: state.login,
  }));

  const callbacks = {
    //get token from API
    onSubmit: useCallback((login, password, navigate) => store.actions.login.getTokenFromApi(login, password, navigate), [store]),
    //delete user info on logout
    onLogOut: useCallback((token) => store.actions.login.logOut(token), [store]),
      //reset error 
      onReset: useCallback(()=>store.actions.login.resetError(),[store])
  };
  return (
    <PageLayout>
      <BtnLogin name={select.login.userName} toLogin={"/login"} toProfile={"/profile"} onLogOut={callbacks.onLogOut} onReset={callbacks.onReset} profile={select.login} />
      <Head title={t("title")} />
      <Navigation />
      <ProfileDetails profile={select.login}  />
    </PageLayout>
  );
}

export default memo(Profile);
