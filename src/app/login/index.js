import { memo, useCallback, useEffect } from "react";
import BtnLogin from "../../components/btn-login";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import FormLogin from "../../components/form-login";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import { useNavigate } from "react-router-dom";

/**
 * Display login page
 * @returns {HTMLElement}
 */
function Login() {
  const { t } = useTranslate();
  const store = useStore();

  const select = useSelector((state) => ({
    userName: state.auth.user.name,
    error: state.auth.error,
  }));

  let navigate = useNavigate();

  const callbacks = {
    onSubmit: useCallback((login, password) => store.actions.auth.getAuthDetailsFromApi(login, password), [store]),
    onLogOut: useCallback(() => store.actions.auth.logOut(), [store]),
    getProfileData: useCallback(() => store.actions.profile.getUserDataFromApi(), [store]),
    resetError: useCallback(() => store.actions.auth.resetError(), [store]),
  };

  useEffect(() => {
    callbacks.getProfileData();
  }, []);
  useEffect(() => {
    callbacks.resetError();
  }, [navigate]);

  return (
    <PageLayout>
      <BtnLogin name={select.userName} toLogin={"/login"} toProfile={"/profile"} onLogOut={callbacks.onLogOut} />
      <Head title={t("title")} />
      <Navigation />
      <FormLogin onSubmit={callbacks.onSubmit} error={select.error} />
    </PageLayout>
  );
}

export default memo(Login);
