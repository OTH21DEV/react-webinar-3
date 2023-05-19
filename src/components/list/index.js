import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';
import { generateCode } from "../../utils";

function List({list, onDeleteItem, onSelectItem,btnName,modalShow}){

  return (
    <div className='List'>{
      list.map(item =>
        <div key={generateCode()} className='List-item'>
          <Item list={list} item={item} onDelete={onDeleteItem} onSelect={onSelectItem} btnName={btnName} modalShow={modalShow}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })),
  onDeleteItem: PropTypes.func,
  onSelectItem: PropTypes.func
};

List.defaultProps = {
  onDeleteItem: () => {},
  onSelectItem: () => {},
}

export default React.memo(List);
