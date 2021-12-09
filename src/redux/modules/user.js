// *** 패키지 import
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";
import { apis } from "../../shared/api";

import axios from "axios";

// *** 액션 타입
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

// *** 액션 생성 함수
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (is_login, username) => ({
  is_login,
  username,
}));

// *** 초기값
const initialState = {
  is_login: false, // 임시
  username: null, // 아이디
};

// *** 미들웨어

// *** 로그인 여부 확인
const loginCheckFB = () => {
  return function (dispatch, getState, { history }) {
    console.log("로그인 여부 확인");
    const token = localStorage.getItem("user_token");

    axios
      .get("http://3.37.36.119/api/islogin", {
        headers: { Authorization: token },
      })
      .then((response) => {
        const is_login = true; // 로그인 상태
        const username = response.data.userInfo.username; // 사용자 정보
        localStorage.setItem("username", username);

        dispatch(setUser(is_login, username));
      })
      .catch((err) => {
        console.log("로그인 여부 확인 실패", err);
      });
  };
};

// *** 로그인 처리
const loginFB = (username, password) => {
  return function (dispatch, getState, { history }) {
    axios // 로그인 요청
      .post("http://3.37.36.119/user/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        const user_token = response.headers.authorization;
        localStorage.setItem("user_token", user_token);
        window.alert("로그인 되셨습니다.");
        window.location.reload();
      })
      .catch((err) => {
        console.log("로그인 요청 실패", err);
        window.alert("아이디/비밀번호를 확인 해주세요");
      });
  };
};

// *** 로그아웃
const logoutFB = () => {
  return function (dispatch, getState, { history }) {
    axios // 로그아웃
      .get("http://3.37.36.119/api/logout")
      .then((reponse) => {
        dispatch(logOut());
        console.log("로그아웃 성공");
        window.location.reload();
      })
      .catch((err) => {
        console.log("로그아웃 실패");
      });
  };
};

// *** 회원가입
const signUpDB = (username, password, passwordCheck) => {
  return function (dispatch, getState, { history }) {
    apis
      .signup(username, password, passwordCheck)
      .then((res) => {
        window.alert("회원가입 되셨습니다.");
      })
      .catch((err) => {
        window.alert("이미 존재하는 아이디 또는 이메일입니다.");
      });
  };
};

// *** 리듀서
export default handleActions(
  {
    [SET_USER]: (state, action) => {
      produce(state, (draft) => {
        draft.is_login = action.payload.is_login;
        draft.username = action.payload.username;
      });
    },
    [LOG_OUT]: (state, action) => {
      produce(state, (draft) => {
        draft.username = null;
        draft.is_login = false;
      });
    },
    [GET_USER]: (state, action) => {
      produce(state, (draft) => {});
    },
  },
  initialState
);

// *** 액션 생성 함수 export
const actionCreators = {
  loginFB,
  logoutFB,
  loginCheckFB,
  signUpDB,
};

export { actionCreators };
