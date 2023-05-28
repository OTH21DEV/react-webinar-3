import { BrowserRouter as Router, Routes, Route,Navigate} from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import ItemDetails from "../components/item-details";
import useSelector from "../store/use-selector";
import useStore from '../store/use-store';
import { useEffect } from "react";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);
//  const location = useLocation()
//  const store = useStore()

//  useEffect(()=>{
//   store.actions.modals.close()
//  },[location])
  return (
    <>
      <Router>
        <Routes >
          <Route path="/" element={<Main />} />
          <Route path="/:id" element={<ItemDetails />} />
          {/* <Route path="*" element={<Navigate to='/' />} /> */}
        {/* {activeModal === "basket" && <Route path="/:id" element={<Basket/>  }/>} */}
        </Routes>
        {activeModal === "basket" && <Basket />}
       
      </Router>
    </>
  );
}

export default App;
