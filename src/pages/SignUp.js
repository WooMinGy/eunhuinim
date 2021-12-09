// SignUp.js

// *** 패키지 import
import React from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import { Grid, Button, Input, Text, Span } from "../elements";
import { useHistory } from "react-router";

import axios from "axios";

const SignUp = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  // 모달창 열렸는지 여부
  const [modalIsOpen, setModalIsOpen] = React.useState(
    props.modal ? true : false
  );

  // 아이디, 비밀번호, 비밀번호 확인
  const [username, setId] = React.useState(""); // 아이디
  const [password, setPwd] = React.useState(""); // 비밀번호
  const [passwordCheck, setPwdCheck] = React.useState(""); // 비밀번호

  // 오류 메세지 상태 저장
  const [idMessage, setIdMessage] = React.useState("");
  const [pwdMessage, setPwdMessage] = React.useState("");
  const [pwdCheckMessage, setPwdCheckMessage] = React.useState("");

  // 유효성 검사
  const [isId, setIsId] = React.useState("");
  const [isPwd, setIsPwd] = React.useState("");
  const [isPwdCheck, setIsPwdCheck] = React.useState("");

  // disabled 활성화 여부
  const [active, setActive] = React.useState(true);

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

  // 아이디 유효성 검사
  const idCheck = (e) => {
    setId(e.target.value);
    // 아이디 정규식이 너무 헷갈림 특수기호 -_ 나중에 한번더 확인할 것 !
    const regId = /^[a-zA-Z0-9]+([-_]|[a-zA-Z0-9]){2,19}$/g;
    const idCurrent = e.target.value;

    if (!regId.test(idCurrent)) {
      setIdMessage("영문, 숫자, -_를 조합하여 3~20자로 만들어주세요!");
      setIsId(false);
    } else {
      setIdMessage("올바른 아이디 형식이에요 :)");
      setIsId(true);
    }
  };

  // 비밀번호 유효성 검사
  const pwdCheck = (e) => {
    setPwd(e.target.value);
    const regPwd = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{3,20}$/;
    const pwdCurrent = e.target.value;

    if (!regPwd.test(pwdCurrent)) {
      setPwdMessage("영문, 숫자를 조합하여 3~20자로 만들어주세요!");
      setIsPwd(false);
    } else {
      setPwdMessage("올바른 비밀번호에요 :)");
      setIsPwd(true);
    }
  };

  // 비밀번호 일치 여부
  const isSamePwd = (e) => {
    setPwdCheck(e.target.value);
    const regPwd = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{3,20}$/;
    const SamePwdCurrent = e.target.value;

    if (password === SamePwdCurrent) {
      setPwdCheckMessage("비밀번호가 같아요 :)");
      setIsPwdCheck(true);
    } else {
      setPwdCheckMessage("비밀번호가 틀려요... 다시 확인해주세요!");
      setIsPwdCheck(false);
    }
  };

  // signUpDB 실행!
  //  -> 보통은 다른 함수 안에서 실행하고 onClick에 넣어줬는데 그렇게 안해서 400이 뜨나?
  const signUpCheck = () => {
    dispatch(userActions.signUpDB(username, password, passwordCheck));
    setModalIsOpen(false);
    props.setSignUpModal(false);
    props.setLoginModal(true); // 회원가입 성공 시 로그인 모달창 띄움
  };

  // 뷰
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
          <Text size="3vw" bold>
            회원가입
          </Text>
          <Grid padding="16px 0px" height="20%">
            {/* <form action="http://3.37.36.119/api/signup" method="post"> */}
            <Input
              label="아이디"
              placeholder="아이디를 입력하세요."
              type="text"
              value={username}
              _onChange={idCheck}
              _onKeyUp={checkActive}
            />
            <br />
            {username.length > 0 && (
              <Span size="3px" className={`${isId ? "success" : "error"}`}>
                {idMessage}
              </Span>
            )}
            <br />
            {/* <form action="http://3.37.36.119/api/signup" method="post"> */}

            <Input
              label="비밀번호"
              placeholder="비밀번호를 입력하세요."
              type="password"
              value={password}
              _onChange={pwdCheck}
              _onKeyUp={checkActive}
            />
            <br />
            {password.length > 0 && (
              <Span size="3px" className={`${isPwd ? "success" : "error"}`}>
                {pwdMessage}
              </Span>
            )}
            <br />

            <Input
              label="비밀번호 확인"
              placeholder="비밀번호를 다시 입력하세요."
              type="password"
              value={passwordCheck}
              _onChange={isSamePwd}
              _onKeyUp={checkActive}
            />
            <br />
            {passwordCheck.length > 0 && (
              <Span
                size="3px"
                className={`${isPwdCheck ? "success" : "error"}`}
              >
                {pwdCheckMessage}
              </Span>
            )}
            <br />

            <Button
              text="회원가입하기"
              className={!active ? "activeBtn" : "unActiveBtn"}
              width="18vw"
              margin="3% 0px 3% 0px"
              _onClick={signUpCheck}
              disabled={active}
            ></Button>
            {/* </form> */}
            {/* </form> */}
          </Grid>
        </Grid>
      </Modal>
    </React.Fragment>
  );
};

export default SignUp;
