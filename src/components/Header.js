// Header.js

// *** 패키지 import
import React from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import { Grid, Button, Text } from "../elements/index";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

import { getCookie } from "../shared/Cookie";

const Header = (props) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const is_cookie = getCookie("is_login");
  // const is_session = sessionStorage.getItem("세션 이름") ? true : false;

  const [loginModal, setLoginModal] = React.useState(false);
  const [signUpModal, setSignUpModal] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(is_cookie);

  const loginModalOpen = () => {
    setLoginModal(true);
  };

  const signUpModalOpen = () => {
    setSignUpModal(true);
  };

  const logOut = () => {
    dispatch(userActions.logoutFB());
    setIsLogin(false);
    window.alert("로그아웃 하셨습니다.");
  };

  if (isLogin) {
    return (
      <React.Fragment>
        <Grid is_flex padding="4px 16px">
          <Grid _onClick={() => (window.location.href = "/")}>
            <Text margin="0px" size="24px" bold>
              로고
            </Text>
          </Grid>

          <Grid is_flex>
            <Button
              _onClick={() => {
                history.push("/feed");
              }}
            >
              {" "}
              피드
            </Button>
            <Button _onClick={logOut}>로그아웃</Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <div style={{ overflow: "hidden" }}>
      <Grid is_flex padding="4px 16px">
        <Grid _onClick={() => (window.location.href = "/")}>
          <Text margin="0px" size="24px" bold>
            로고
          </Text>
        </Grid>

        <Grid is_flex>
          <Button _onClick={loginModalOpen}>로그인</Button>
          {
            loginModal && (
              <Login
                modal={loginModal}
                setLoginModal={setLoginModal}
                setSignUpModal={setSignUpModal}
                setIsLogin={setIsLogin}
              ></Login>
            )
            // 기존 코드 loginModal && <Login modal={loginModal}></Login>에서는
            // login modal이 꺼지더라도 loginModal은 true이기 때문에 버튼을 누를 수 없습니다.

            // 수정 코드에서는 setLoginModal이라는 key 값에 setLoginModal state 변경 함수를
            // value로 넘겨서 자식 컴포넌트에서 부모 컴포넌트의 state를 변경 할 수 있도록 하였습니다.

            // + Header에서 로그인을 누를 때 사용자가 이동 할 수 있는 경로는 2가지 입니다.
            // 1) 헤더 로그인 버튼 클릭 -> 로그인 기능 이용
            // : 이 경우에는 setLoginModal만 가져가서 modal창이 닫힐 때 false로 바꿔주면 됩니다.
            // 2) 헤더 로그인 버튼 클릭 -> 회원가입 버튼 클릭 -> 회원가입 기능 이용
            // : 이 경우에는 loginModal, signUpModal 둘 다 true가 되기 때문에 둘 다 false로 바꿔줘야 합니다.
          }
          <Button _onClick={signUpModalOpen}>회원가입</Button>
          {signUpModal && (
            <SignUp
              modal={signUpModal}
              setSignUpModal={setSignUpModal}
            ></SignUp>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Header;
