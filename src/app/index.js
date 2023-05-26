import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import ItemDetails from "../components/item-details";
import useSelector from "../store/use-selector";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/:id" element={<ItemDetails />} />
        </Routes>
        {activeModal === "basket" && <Basket />}
      </Router>
    </>
  );
}

export default App;
