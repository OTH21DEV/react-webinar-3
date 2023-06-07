import { Routes, Route } from "react-router-dom";
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import Profile from "./profile";
import useStore from "../hooks/use-store";
import useInit from "../hooks/use-init";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);

  const store = useStore();

  const isLogged = useSelector((state) => state.auth.isLogged);

  useInit(
    () => {
      store.actions.auth.checkIfAuth();
    },
    [],
    true
  );

  return (
    <>
      <Routes>
        <Route path={""} element={<Main />} />
        <Route path={"/articles/:id"} element={<Article />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/profile"} element={isLogged ? <Profile /> : <Login />} />
      </Routes>
      {activeModal === "basket" && <Basket />}
    </>
  );
}

export default App;
