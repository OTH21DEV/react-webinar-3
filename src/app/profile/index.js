import { memo,useCallback } from "react";
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
  const { t } = useTranslate();

  const store = useStore();

  useInit(
    () => {
      store.actions.profile.getUserDataFromApi();
    },
    [],
    true
  );

  const select = useSelector((state) => ({
    userName: state.auth.user.name,
    profile: state.profile.userProfile,
  }));

  const callbacks = {
    onLogOut: useCallback(() => store.actions.auth.logOut(), [store]),
  };
  return (
    <PageLayout>
      <BtnLogin name={select.userName} toLogin={"/login"} toProfile={"/profile"} onLogOut={callbacks.onLogOut} />
      <Head title={t("title")} />
      <Navigation />
      <ProfileDetails profile={select.profile} />
    </PageLayout>
  );
}

export default memo(Profile);
