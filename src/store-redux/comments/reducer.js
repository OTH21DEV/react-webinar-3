import { CREATE_COMMENT, GET_COMMENTS } from "./type";

// Начальное состояние
const initialState = {
  data: {},
};
const reducer = (state = initialState, action) => {
  //   console.log(action.payload.data);
  switch (action.type) {
    case CREATE_COMMENT:
      return {
        ...state,
        data: action.payload.data,
      };
    case GET_COMMENTS:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;

