// *** 패키지 import

import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

// *** 액션 타입
const GET_FEED = "GET_FEED";

// *** 액션 생성 함수
const getFeed = createAction(GET_FEED, (feed) => ({ feed }));

// *** 초기값
const initialState = {
  myPosts: [
    {
      postId: 1,
      title: "제목이에요",
      content: "내용이에요",
    },
    {
      postId: 2,
      title: "제목 2에요",
      content: "내용 2에요",
    },
  ],
  myComments: [
    {
      commentId: 1,
      comment: "댓글이에요",
      createdAt: "2021-10-11",
    },
    {
      commentId: 2,
      comment: "댓글 2에요",
      createdAt: "2021-10-11",
    },
  ],
};

// *** 미들웨어
const getFeedFB = () => {
  return function (dispatch, getState, { history }) {
    const username = getState().user.username;

    axios
      .get(`http://3.37.36.119/api/feeds/${username}`)
      .then((response) => {
        console.log("피드 정보 가져오기 성공");
        dispatch(getFeed);
      })
      .catch((err) => {
        console.log("피드 정보 가져오기 실패", err);
      });
  };
};

// *** 리듀서
export default handleActions(
  {
    [GET_FEED]: (state, action) => {
      produce(state, (draft) => {
        draft = action.payload.feed;
      });
    },
  },
  initialState
);

// *** 액션 생성 함수 export
const actionCreators = {
  getFeedFB,
};

export { actionCreators };
