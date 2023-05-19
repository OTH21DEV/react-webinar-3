import React from "react";
import PropTypes from "prop-types";
import { calculateTotal } from "../../utils";
import { numberWithSpace } from "../../utils";

import'./style.css'
import Head from "../head";
import List from "../list";
import Item from "../item";

function Modal({ title, list, btnName, onDeleteItem, onSelectItem, modalShow ,setModalShow}) {
  const total = calculateTotal(list);
  return (
    <div className="Modal-overlay">
    <div className="Modal">
      <Head title={title} modalShow={modalShow} setModalShow={setModalShow}></Head>

      {!list ? null : <List list={list} btnName={btnName} onDeleteItem={onDeleteItem} onSelectItem={onSelectItem} modalShow={modalShow} />}
      <div className="Modal-total">
        <p>Итого</p>
        <p>{numberWithSpace (total.totalPrice)} <span>&#8381;</span></p>
      </div>
    </div>
    </div>
  );
}

export default Modal;
