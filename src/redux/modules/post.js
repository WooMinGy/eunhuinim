// *** 패키지 import
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { apis } from "../../shared/api";
import { imageCreators } from "./image";

// *** 액션 타입
const GET_POST = "GET_POST";
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";
const UPLOAD = "UPLOAD";

// *** 액션 생성 함수
const setPost = createAction(SET_POST, (post) => ({ post }));
const getPost = createAction(GET_POST, (post) => ({ post }));
const addpost = createAction(ADD_POST, (post) => ({ post }));
const editpost = createAction(EDIT_POST, (postId, post) => ({ postId, post }));
const deletepost = createAction(DELETE_POST, (postId) => ({ postId }));
const upload = createAction(UPLOAD, (imgUrl) => ({ imgUrl }));

// *** 초기값
const initialState = {
  postId: null,
  title: null,
  content: null,
  comments: [
    {
      commentId: null,
      comment: null,
      createdAt: null,
    },
  ],
};
const initialUrl = {
  imgUrl: null,
};

// *** 미들웨어

// 게시물 추가
const addPostDB = (title, content, imageUrl) => {
  return function (dispatch, getState, { history }) {
    const token = localStorage.getItem("user_token");
    // console.log(token);
    axios
      .post(
        `http://3.37.36.119/api/posts`,

        { title: title, content: content, imageUrl: imageUrl },
        {
          headers: { Authorization: token },
        } // 400일때 헤더가 있는데 서버측에서 헤더가 없다고 하면 데이터값 뒤로 헤더를 빼주자
      )
      .then((response) => {
        console.log(response);
        // dispatch(addpost(title, content, imageUrl));
        history.replace("/");
      })
      .catch((err) => {
        console.log("글을 작성하려면 로그인을 하세요!", err);
      });
  };
};

// 게시물 수정
const editPostDB =
  (title, content) =>
  async (dispatch, getState, { history }) => {
    try {
      await apis.editPost(title, content);
      dispatch(editpost(title, content));
      history.goBack();
    } catch (err) {}
  };

// 게시물 삭제
const deletePostDB =
  (postId) =>
  (dispatch, getState, { history }) => {
    try {
      apis.deletePost(postId);
      history.replace("/");
    } catch (err) {}
  };

// const deletePostDB = () => {
//   return function (dispatch, getState, { history }) {
//     const token = localStorage.getItem("user_token");

//     axios
//       .delete("http://3.37.36.119/api/posts", {
//         headers: { Authorization: token },
//       })
//       .then((response) => {
//         console.log(response);
//       })
//       .catch((err) => {
//         console.log("게시물 삭제 실패", err);
//       });
//   };
// };

// 랜덤 게시물 조회
const randomPostFB = () => {
  return function (dispatch, getState, { history }) {
    console.log("게시물 조회");
    const token = localStorage.getItem("user_token");

    axios
      .get("http://3.37.36.119/api/posts", {
        headers: { Authorization: token },
      })
      .then((response) => {
        console.log(response.data);

        if (response.data === "") {
          history.replace("/");
          window.alert("게시물이 없습니다.");
          return;
        }
        dispatch(getPost(response.data));
        console.log("게시물 조회 성공");
      })
      .catch((err) => {
        console.log("게시물 조회 실패", err);
      });
  };
};

// 내 게시물 조회
const myPostFB = (postId) => {
  return function (dispatch, getState, { history }) {
    console.log("내가 작성한 게시물 조회");
    const token = localStorage.getItem("user_token");

    axios
      .get("http://3.37.36.119/api/posts/" + postId, {
        headers: { Authorization: token },
      })
      .then((response) => {
        console.log("내가 작성한 게시물 조회 성공");
        dispatch(getPost(response.data));
      })
      .catch((err) => {
        console.log("내가 작성한 게시물 조회 실패", err);
      });
  };
};

// 내 댓글 조회
const myCommentFB = (commentId) => {
  return function (dispatch, getState, { history }) {
    console.log("내가 댓글을 작성한 게시물 조회");
    const token = localStorage.getItem("user_token");

    axios
      .get(
        "http://3.37.36.119/api/comments/" + commentId,
        { commentId: commentId },
        {
          headers: { Authorization: token },
        }
      )
      .then((response) => {
        console.log(response);
        console.log("내가 댓글을 작성한 게시물 조회 성공");

        dispatch(getPost(response.data));
      })
      .catch((err) => {
        console.log("내가 댓글을 작성한 게시물 조회 실패", err);
      });
  };
};

// *** 리듀서
export default handleActions(
  {
    [SET_POST]: (state, action) => {
      produce(state, (draft) => {});
    },
    [GET_POST]: (state, action) => {
      return produce(state, (draft) => {
        draft.postId = action.payload.postList.postId;
        draft.title = action.payload.postList.title;
        draft.content = action.payload.postList.content;
        draft.comments = { ...action.payload.postList.comments };
      });
    },
    [ADD_POST]: (state, action) => {
      produce(state, (draft) => {});
    },
    [UPLOAD]: (state, action) =>
      produce(state, (draft) => {
        draft.imgUrl = action.payload.imgUrl;
      }),
  },
  initialState
);

// *** 액션 생성 함수 export
const actionCreators = {
  addPostDB,
  editPostDB,
  deletePostDB,
  setPost,
  getPost,
  randomPostFB,
  myPostFB,
  myCommentFB,
};

export { actionCreators };
