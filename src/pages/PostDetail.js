// PostDetail.js

// *** 패키지 import
import React, { useState } from "react";
import { getCookie } from "../shared/Cookie";

import { Grid, Button, Text, Input } from "../elements/index";
import Header from "../components/Header";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";

const PostDetail = (props) => {
  const is_cookie = getCookie("is_login");
  const [isLogin, setIsLogin] = useState(is_cookie)
  const [myPost, setMyPost] = useState(true);

  return (
    <React.Fragment>
      <Header></Header>
      <Grid margin="5% 0px 5% 0px">
        <Text>게시물 제목입니다.</Text>
      </Grid>
      <Grid margin="5% 0px 5% 0px">
        <Text>게시물 내용입니다.</Text>
      </Grid>
      {isLogin ? (
        <Grid margin="0px 0px 0px 0px">
          <CommentWrite></CommentWrite>
        </Grid>
      ) : null}
      <Grid>
        <CommentList></CommentList>
      </Grid>
      <Grid is_flex center>
        {myPost ? (
          <Grid is_flex>
            <Button
              text="수정"
              width="12.5vw"
              margin="0px 0px 0px 40%"
            ></Button>
            <Button text="삭제" width="12.5vw" marin="0px 0px 0px 30%"></Button>
          </Grid>
        ) : (
          <Button text="넘기기" width="20vw" margin="0px 0px 0px 28%"></Button>
        )}
        <Button text="댓글쓰기" width="20vw" margin="0px 25% 0px 0px"></Button>
      </Grid>
    </React.Fragment>
  );
};

export default PostDetail;
