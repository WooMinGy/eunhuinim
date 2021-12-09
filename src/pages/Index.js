// Index.js

// *** 패키지 import
import mainImage from "../mainImage.png";
import { Grid, Button, Text } from "../elements/index";
import Header from "../components/Header";

import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

const Index = (props) => {
  const history = useHistory();

  const user_token = localStorage.getItem("user_token") ? true : false;
  const [isLogin, setIsLogin] = React.useState(user_token);

  return (
    <div>
      <Header></Header>
      <Grid padding="1%">
        <Text size="2vw" bold>
          익명의 멘탈 케어 사용 설명서
        </Text>
        <Text>1. 로그인 후 이용 하실 수 있습니다.</Text>
        <Text>2. 상담 내용은 랜덤으로 제공 됩니다.</Text>
        <Text>3. 한번 넘어간 상담은 다시는 보실 수 없습니다.</Text>
        <Text>4. 모든 서비스는 익명으로 이뤄집니다.</Text>
        <Img src={mainImage} alt="이미지"></Img>
        {isLogin ? (
          <Grid is_flex margin="40px 0px 40px 0px" center>
            <Button
              width="20vw"
              margin="0px 0px 0px 28%"
              _onClick={() => {
                history.push("/postWrite");
              }}
            >
              작성하기
            </Button>
            <Button
              width="20vw"
              margin="0px 28% 0px 0px"
              _onClick={() => {
                history.push("/post");
              }}
            >
              상담하기
            </Button>
          </Grid>
        ) : null}
      </Grid>
    </div>
  );
};

const Img = styled.img`
  width: 30%;
`;

export default Index;
