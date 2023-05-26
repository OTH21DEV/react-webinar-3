import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';

/**
 * Display controls
 * @param {Function} onAdd add item
 * @returns 
 */
function Controls({onAdd}){
  return (
    <div className='Controls'>
      <button onClick={() => onAdd()}>Добавить</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func
};

Controls.defaultProps = {
  onAdd: () => {}
}

export default memo(Controls);
