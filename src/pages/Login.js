// Login.js

// *** 패키지 import
import React from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user.js";

import { Grid, Button, Input, Text } from "../elements/index";
import SignUp from "../pages/SignUp";
import { useHistory } from "react-router";
import axios from "axios";

const Login = (props) => {
  const [id, setId] = React.useState(""); // 아이디
  const [pwd, setPwd] = React.useState(""); // 비밀번호
  const [modal, setModal] = React.useState(props.modal ? true : false); // 모달창이 열렸는 지 닫혔는 지
  const [active, setActive] = React.useState(true); // disabled가 활성화인 지 비활성화인 지
  const [signUpModal, setSignUpModal] = React.useState(false); // 로그인창인 지 회원가입 창인 지

  const dispatch = useDispatch();
  const history = useHistory();

  // disabled 체크
  const checkActive = () => {
    id !== "" && pwd !== "" ? setActive(false) : setActive(true);
  };

  // 로그인 버튼 클릭 시
  const login = () => {
    axios({
      method: "post",
      url: "http://3.37.36.119/api/login",
      data: {
        username: "username",
        password: "password",
      }
    })
      .then((response) => {
        // 성공 일 때 200 뜸
        if (response.status === 200) {
          window.alert("로그인 성공");
          setModal(false);
          props.setIsLogin(true);
          history.push('/')
        }
      })
      .catch((err) => {
        console.log("회원가입 실패", err);
      });
  };

  // 회원가입 버튼 클릭 시
  const join = () => {
    setSignUpModal(true);
  };

  // 모달창을 닫으면 header의 state도 false로 바꾸기
  const modalOff = () => {
    setModal(false);
    props.setLoginModal(false);
  };

  return (
    <div>
      {signUpModal ? ( // 회원가입 버튼을 눌렀을 경우
        <SignUp
          modal={signUpModal}
          setSignUpModal={props.setSignUpModal}
          setLoginModal={props.setLoginModal}
        ></SignUp>
      ) : (
        // 2번 경우처럼 로그인 -> 회원가입으로 이동하는 것이기 때문에 loginModal과 signUpModal을 보냅니다.
        // 누르지 않았을 경우
        <Modal
          isOpen={modal}
          ariaHideApp={false}
          onRequestClose={modalOff}
          // 모달창 밖을 누르거나, ESC를 누를 경우 모달창을 끈다.
          style={{
            // inLine Styles
            content: {
              left: "32.5%",
              right: "32.5%",
              botton: "10%",
            },
          }}
        >
          <Grid padding="16px" center>
            <Text size="3vw" margin="6vh" bold>
              로그인
            </Text>
            <Grid padding="16px 0px" height="20%">
              {/* <form action="http://3.37.36.119/api/login" method="post"> */}
              <Input
                type="text"
                label="아이디"
                placeholder="아이디를 입력 해주세요"
                value={id}
                _onChange={(e) => {
                  setId(e.target.value);
                }}
                _onKeyUp={checkActive}
              ></Input>
              <Input
                type="password"
                label="비밀번호"
                placeholder="비밀번호를 입력 해주세요"
                value={pwd}
                _onChange={(e) => {
                  setPwd(e.target.value);
                }}
                _onKeyUp={checkActive}
                is_submit
              ></Input>

              <Button
                className={!active ? "activeBtn" : "unActiveBtn"}
                width="18vw"
                margin="3% 0px 3% 0px"
                _onClick={login}
                disabled={active}
              >
                로그인
              </Button>
              {/* </form> */}
              <Hr />
              <p>아직 회원이 아니시라면?</p>
              <Button width="18vw" margin="1% 0px 1% 0px" _onClick={join}>
                회원가입
              </Button>
            </Grid>
          </Grid>
        </Modal>
      )}
    </div>
  );
};

const Hr = styled.hr`
  margin-top: 3%;
  margin-bottom: 3%;
  width: 80%;
`;

export default Login;
