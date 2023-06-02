import { memo, useEffect,useCallback } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import BtnLogin from "../../components/btn-login";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import profileDetails from "../../components/profile-details";
import ProfileDetails from "../../components/profile-details";

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
    onSubmit: useCallback((login, password, navigate) => store.actions.login.getTokenFromApi(login, password, navigate), [store]),
// onLogout:useCallback()=>

onLogOut: useCallback((token) => store.actions.login.logOut(token), [store]),
   
  };
  return (
    <PageLayout>
      <BtnLogin name={select.login.userName} toLogin={'/login'} toProfile={'/profile'} onLogOut={callbacks.onLogOut}/>
      {/* <NavLogin name={select.login.userName} ></NavLogin> */}
      <Head title={t("title")} />

      <Navigation />
      <ProfileDetails profile={select.login} />
    </PageLayout>
  );
}

export default memo(Profile);
