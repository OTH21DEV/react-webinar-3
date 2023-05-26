import {useCallback, useContext, useEffect, useState} from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Main from "./main";
import Basket from "./basket";
import ItemDetails from '../components/item-details';
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);
  // const activeModal = useSelector(state => console.log(state));
  return (
    <>
    <Router>
      <Routes>
      <Route path ='/' element = {<Main/>}/>
      <Route path ='/:id' element = {<ItemDetails/>}/>
      {/* {activeModal === 'basket' &&  <Route path ='/' element = {<Basket/>}/>} */}
      {/* <Route path ='/basket' element = {<Basket/>}/> */}
      {/* {activeModal==='basket' &&  <Route path ='/basket' element = {<Basket/>}/>} */}
      </Routes>
      </Router>
        {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
