import { memo, useEffect, useCallback } from "react";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import BtnLogin from "../../components/btn-login";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import ProfileDetails from "../../components/profile-details";
import useInit from "../../hooks/use-init";

/**
 * Display user profile page
 * @returns {HTMLElement}
 */
function Profile() {
  const tokenInLocalStorage = localStorage.getItem("token");
  const { t } = useTranslate();

  const store = useStore();

  // useEffect(() => {
  //   if (tokenInLocalStorage) {
  //     store.actions.login.getUserDataFromApi(tokenInLocalStorage);
  //   }
  // }, [tokenInLocalStorage]);

  // test
  useInit(
    () => {
      if (tokenInLocalStorage) {
        store.actions.login.getUserDataFromApi(tokenInLocalStorage);
        // store.actions.auth.getAuthStatus(tokenInLocalStorage);
      }
    },
    [tokenInLocalStorage],
    true
  );
  console.log(tokenInLocalStorage)


  const select = useSelector((state) => ({
    // error: state.login.error,
    userName: state.login.userName,
    profile: state.login,
  }));

  const callbacks = {
    //get token from API
    onSubmit: useCallback((login, password, navigate) => store.actions.login.getTokenFromApi(login, password, navigate), [store]),
    //delete user info on logout
    onLogOut: useCallback((token) => store.actions.login.logOut(token), [store]),
    onReset: useCallback(() => store.actions.auth.resetState(), [store]),
  };
  return (
    <PageLayout>
      <BtnLogin name={select.userName} toLogin={"/login"} toProfile={"/profile"} onLogOut={callbacks.onLogOut} onReset={callbacks.onReset}  />
      <Head title={t("title")} />
      <Navigation />
      <ProfileDetails profile={select.profile} />
    </PageLayout>
  );
}

export default memo(Profile);
