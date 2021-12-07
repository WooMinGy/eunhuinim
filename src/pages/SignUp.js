// SignUp.js

// *** 패키지 import
import React, { useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import { Grid, Button, Input, Text } from "../elements";
import { isId, isPassword } from "../shared/regExp.js";
import { useHistory } from "react-router";

import axios from "axios";

const SignUp = (props) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = React.useState(
    props.modal ? true : false
  ); // 모달창 열렸는지 여부
  const [username, setId] = React.useState(""); // 아이디
  const [password, setPwd] = React.useState(""); // 비밀번호
  const [passwordCheck, setPwdCheck] = React.useState(""); // 비밀번호
  const [active, setActive] = React.useState(true); // disabled 활성화 여부

  // 모달창을 닫으면 header의 state도 false로 바꾸기
  const modalOff = () => {
    setModalIsOpen(false);
    if (props.setLoginModal) {
      // setLoginModal이 있을 경우에 false로 바꿉니다.
      props.setLoginModal(false);
    }
    props.setSignUpModal(false);
  };

  /* disabled 체크 */
  const checkActive = () => {
    username !== "" &&
    password !== "" &&
    passwordCheck !== "" &&
    password === passwordCheck
      ? setActive(false)
      : setActive(true);
  };

  // 회원가입 동기 처리
  const signUp = () => {
    axios({
      method: 'post',
      url: 'http://3.37.36.119/api/signup',
      data: {
        username: 'username',
        password: 'password',
        passwordCheck : 'password',
      }
    }).then((response) => {
      // 성공 일 때 200 뜸
      if(response.status === 200){
        window.alert("회원가입 성공")
        setModalIsOpen(false) 
        history.push('/')
      }
    }).catch((err)=>{
      console.log("회원가입 실패", err)
    })
  };

  /* 아이디 형식 체크 */
  // if (!isId(username)) {
  //   console.log("아이디 형식이 맞지 않습니다.");
  //   window.alert(
  //     "아이디 형식이 맞지 않습니다. 아이디는 영문, 숫자, -_를 조합하여 3~20자로 만들어 주세요! :)"
  //   );
  //   return;
  // }

  /* 비밀번호 형식 체크 */
  // if (!isPassword(password)) {
  //   console.log("비밀번호 형식이 맞지 않습니다.");
  //   window.alert(
  //     "비밀번호 형식이 맞지 않습니다. 비밀번호는 영문, 숫자를 조합하여 3~20자로 만들어 주세요! :)"
  //   );
  //   return;
  // }

  /* 비밀번호 일치 여부 */
  // if (password !== passwordCheck) {
  //   window.alert("비밀번호가 일치하지 않습니다.");
  //   return;
  // }

  /* 회원가입 미들웨어 */
  // dispatch(userActions.signupAPI(userInfo));

  return (
    <React.Fragment>
      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={modalOff}
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
            회원가입
          </Text>
          <Grid padding="16px 0px" height="20%">
            {/* <form action="http://3.37.36.119/api/signup" method="post"> */}
            <Input
              label="아이디"
              placeholder="아이디를 입력하세요."
              type="text"
              value={username}
              _onChange={(e) => {
                setId(e.target.value);
              }}
              _onKeyUp={checkActive}
            />

            <Input
              label="비밀번호"
              placeholder="비밀번호를 입력하세요."
              type="password"
              value={password}
              _onChange={(e) => {
                setPwd(e.target.value);
              }}
              _onKeyUp={checkActive}
            />

            <Input
              label="비밀번호 확인"
              placeholder="비밀번호를 다시 입력하세요."
              type="password"
              value={passwordCheck}
              _onChange={(e) => {
                setPwdCheck(e.target.value);
              }}
              _onKeyUp={checkActive}
            />

            <Button
              text="회원가입하기"
              className={!active ? "activeBtn" : "unActiveBtn"}
              width="18vw"
              margin="3% 0px 3% 0px"
              _onClick={signUp}
              disabled={active}
            ></Button>
            {/* </form> */}
          </Grid>
        </Grid>
      </Modal>
    </React.Fragment>
  );
};

export default SignUp;
