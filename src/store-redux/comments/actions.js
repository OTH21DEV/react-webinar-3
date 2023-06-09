import { CREATE_COMMENT, GET_COMMENTS } from "./type";

const createComment = (data) => {
  return {
    type: CREATE_COMMENT,
    payload: data,
  };
};

const getComments = (data) => {
  return {
    type: GET_COMMENTS,
    payload: data,
  };
};
// need to take the token from session .token
export const postComment = (text,_id,_type) => {
  return async (dispatch, getState, services) => {
    // let token = getState().session.token
    let token = localStorage.getItem("token");

    try {
      const res = await services.api.request({
        // url:  `/api/v1/comments`,*
        //?lang=ru&fields=parent(_id,_type),text
        url: `/api/v1/comments`,
        body: JSON.stringify(
          // comment
          {
            text,
            parent: {
              _id,
              _type,
            },
          }
        ),
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Token": `${token}`,
          // "Access-Control-Allow-Origin": "*"
        },
      });
      console.log(res.data.result);
      //comment is created
      dispatch(createComment(res.data.result));
    } catch (error) {
      //error
      console.log(error);
    }
  };
};

export const receiveComments = (parentId) => {
  return async (dispatch, getState, services) => {
    // let token = getState().session.token
    let token = localStorage.getItem("token");

    try {
      const res = await services.api.request({
      
        url: `api/v1/comments?search[parent]=${parentId}&fields=*`,
        // body: JSON.stringify(
        //   // comment
        //   {
        //     text,
        //     parent: {
        //       _id,
        //       _type,
        //     },
        //   }
        // ),
        // method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Token": `${token}`,
          // "Access-Control-Allow-Origin": "*"
        },
      });
      console.log(res.data.result);
      //comment is created
      dispatch(createComment(res.data.result));
    } catch (error) {
      //error
      console.log(error);
    }
  };
};

// export default {
//   /**
//    * Загрузка товара
//    * @param id
//    * @return {Function}
//    */
//   postComment: (data) => {
//     return async (dispatch, getState, services) => {
//       let token = localStorage.getItem("token");

//       try {
//         const res = await services.api.request({
//           url: `api/v1/comments`,
//           method: "POST",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//             "X-Token": `${token}`,
//             // "Access-Control-Allow-Origin": "*"
//           },
//           body: JSON.stringify({
//             data,
//           }),
//         });
//         // Товар загружен успешно
//         dispatch({ type: "comment/create", payload: { data: res.data.result } });
//       } catch (e) {
//         //Ошибка загрузки
//         console.log(e);
//       }
//     };
//   },
// };
