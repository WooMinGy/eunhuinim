// src/shared/Permit.js
import React from "react";
import {useSelector} from "react-redux";
import { setCookie, getCookie, deleteCookie } from "../shared/Cookie";


const Permit = (props) => {
    
    // 유저 정보가 있는 지, 토큰이 있는 지를 체크합니다!
    const user_info = useSelector(state => state.user.user); // 유저 정보
    const is_login = getCookie('is_login') // 쿠키

    // 세션이 있나 확인한다.
    // const is_login = sessionStorage.getItem("세션 이름");

    if(is_login && user_info){
        return <React.Fragment>{props.children}</React.Fragment>;    
    }

    return null;
}

export default Permit;