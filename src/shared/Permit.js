// src/shared/Permit.js
import React from "react";
import { useSelector } from "react-redux";

const Permit = (props) => {
  // 유저 정보가 있는 지, 토큰이 있는 지를 체크합니다.
  const username = useSelector((state) => state.user.username); // 유저 정보
  const is_login = localStorage.getItem("user_token");

  if (is_login && username) {
    return <React.Fragment>{props.children}</React.Fragment>;
  }

  return null;
};

export default Permit;
