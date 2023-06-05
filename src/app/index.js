import { useCallback, useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import Profile from "./profile";
import useStore from "../hooks/use-store";
import { Outlet } from "react-router-dom";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);
  // test
  const store = useStore();
  //test
  const isLogged = useSelector((state) => state.login.isLogged);
  console.log(isLogged);

  //test
  const callbacks = {
    //get token from API
    onSubmit: useCallback((token) => store.actions.login.getUserDataFromApi(token), [store]),
  };

  function PrivateRoute() {
    // const tokenInLocalStorage = localStorage.getItem("token");
    // return tokenInLocalStorage ? <Outlet /> : <Navigate to="/login" />;

    return isLogged ? <Outlet /> : <Navigate to="/login" />;
  }

  return (
    <>
      <Routes>
        <Route path={""} element={<Main />} />
        <Route path={"/articles/:id"} element={<Article />} />
        <Route path={"/login"} element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path={"/profile"} element={<Profile />} />
        </Route>
      </Routes>

      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
