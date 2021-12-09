// PostDetail.js

// *** 패키지 import
import React, { useState } from "react";
import { Grid, Button, Text, Input } from "../elements/index";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

import Header from "../components/Header";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";
import axios from "axios";

const PostDetail = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user_token = localStorage.getItem("user_token") ? true : false;
  const params = useParams();

  const postInfo = useSelector((state) => state.post);

  React.useEffect(() => {
    if (!postInfo && !params.postId) {
      // 내가 작성한 게시물이 아니면서 게시물 정보가 없을 경우
      // 랜덤한 정보를 서버에 요청
      dispatch(postActions.randomPostFB());
      console.log("정보 없음");
    }
  });

  // 넘어가기 버튼 클릭 시 다음 게시물 요청하기
  const nextPost = () => {
    dispatch(postActions.randomPostFB());
    // 또는 페이지 다시 요청하기
    // history.replace('/post')
  };

  // 수정 버튼 클릭 시
  const postUpdate = () => {
    history.push({ pathnamae: "/postWrite", isEdit: true });
  };

  // 삭제 버튼 클릭 시
  const postDelete = () => {
    const deleteCheck = window.confirm("게시물을 삭제 하시겠습니까?");

    if (deleteCheck) {
      dispatch(postActions.deletePostDB(params.postId));
      window.alert("게시물이 삭제 되었습니다.");
      history.replace("/");
    }
  };

  if (!user_token) {
    window.alert("로그인 후 이용 가능합니다.");
    history.replace("/");
  }

  if (params.postId) {
    // 내 게시물일 경우
    return (
      <React.Fragment>
        <Header></Header>
        <Grid margin="5% 0px 2% 0px">
          <Grid>
            {postInfo.image ? (
              <img src={postInfo.image} alt="게시물 사진" width="50%"></img>
            ) : (
              <img
                src="https://img.insight.co.kr/static/2021/01/10/700/img_20210110130830_kue82l80.webp"
                alt="게시물 사진"
                width="50%"
              ></img>
            )}
          </Grid>
          <Grid margin="2% 0px 0px 0px">
            <Text
              border="1px solid"
              margin="auto"
              size="1em"
              width="50%"
              height="10vh"
            >
              {postInfo.title}
            </Text>
            <Text
              border="1px solid"
              margin="auto"
              size="1em"
              width="50%"
              height="50vh"
            >
              {postInfo.contents}
            </Text>
          </Grid>
        </Grid>
        <Grid margin="2% 0px 1% 0px">
          <Button
            text="수정"
            width="5vw"
            margin="0px 1% 0px 0px"
            _onClick={postUpdate}
          ></Button>
          <Button
            text="삭제"
            width="5vw"
            margin="0px 0px 0px 1%"
            _onClick={postDelete}
          ></Button>
        </Grid>
        <Grid>
          <CommentWrite></CommentWrite>
        </Grid>
        <Grid>
          <CommentList></CommentList>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    // 랜덤한 게시물일 경우
    <React.Fragment>
      <Header></Header>
      <Grid margin="5% 0px 2% 0px">
        <Grid>
          {postInfo.image ? (
            <img src={postInfo.image} alt="게시물 사진" width="50%"></img>
          ) : (
            <img
              src="https://img.insight.co.kr/static/2021/01/10/700/img_20210110130830_kue82l80.webp"
              alt="게시물 사진"
              width="50%"
            ></img>
          )}
        </Grid>
        <Grid margin="2% 0px 0px 0px">
          <Text
            border="1px solid"
            margin="auto"
            size="1em"
            width="50%"
            height="10vh"
          >
            {postInfo.title}
          </Text>
          <Text
            border="1px solid"
            margin="auto"
            size="1em"
            width="50%"
            height="50vh"
          >
            {postInfo.contents}
          </Text>
        </Grid>
      </Grid>
      <Grid margin="1% 0px 1% 0px">
        <Button
          text="넘어가기"
          width="20vw"
          margin="auto"
          _onClick={nextPost}
        ></Button>
      </Grid>
      <Grid>
        <CommentWrite></CommentWrite>
      </Grid>
      <Grid>
        <CommentList></CommentList>
      </Grid>
    </React.Fragment>
  );
};

export default PostDetail;
