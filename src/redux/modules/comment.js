// *** 패키지 import
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

// *** 액션 타입
const ADD_COMMENT = "ADD_COMMENT";

// *** 액션 생성 함수
const addComment = createAction(ADD_COMMENT, (comment) => ({
  comment,
}));

// *** 초기값
const initialState = {
  comments: [],
};

// *** 미들웨어
const addCommentFB = (postId, comment) => {
  return function (dispatch, getState, { history }) {
    console.log("댓글 작성");

    const token = localStorage.getItem("user_token");

    axios
      .post(
        `http://3.37.36.119/api/comments/${postId}`,
        { comment: comment },
        { headers: { Authorization: token } }
      )
      .then((response) => {
        console.log("댓글 작성 성공");
        dispatch(addComment(comment));
      })
      .catch((err) => {
        console.log("댓글 작성 실패", err);
      });
  };
};

// *** 리듀서
export default handleActions(
  {
    [ADD_COMMENT]: (state, action) => {
      return produce(state, (draft) => {
        draft.comments.push(action.payload.comment);
      });
    },
  },
  initialState
);

// *** 액션 생성 함수 export
const actionCreators = {
  addCommentFB,
};

export { actionCreators };
