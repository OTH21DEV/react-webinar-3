import { useCallback, useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import Profile from "./profile";
import useStore from "../hooks/use-store";
import { Outlet} from "react-router-dom";
import useInit from "../hooks/use-init";
// import {browserHistory} from 'react-router-dom'
/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);
  // test
  const store = useStore();
  // const isLogged = useSelector((state) => state.login.isLogged);
  //test auth
  const isLogged = useSelector((state) => state.login.isLogged);


//test
const tokenInLocalStorage = localStorage.getItem("token");

useInit(
  () => {

    if(tokenInLocalStorage){

      // store.actions.login.getUserDataFromApi(tokenInLocalStorage);
      //test auth
      store.actions.auth.getAuthStatus(tokenInLocalStorage);
      //test rabotaet pri ssilke 
      // store.actions.login.getUserDataFromApi(tokenInLocalStorage)
    }
  },
  [tokenInLocalStorage],
  true
);

function PrivateRoute() {
 
  return isLogged ? <Outlet /> :<Login  />;
  // return isLogged? browserHistory.push('/profile'): <Navigate to="/login" />;
}


  return (
    <>
      <Routes >
        <Route path={""} element={<Main />} />
        <Route path={"/articles/:id"} element={<Article />} />
        <Route path={"/login"} element={<Login />} />
         <Route element={<PrivateRoute />}>
          <Route path={"/profile"} element={<Profile />} />
        </Route> 
         
          {/* <Route path={"/profile"} element={<Profile />} /> */}
                 {/* <Route path={"/profile"} element={isLogged? <Profile />: <Login />} /> */}

      
      </Routes>
      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
