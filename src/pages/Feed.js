// Feed.js

// *** 패키지 import
import React from "react";

import { Grid, Button, Text, Input } from "../elements/index";
import Post from "../components/Post";
import Header from "../components/Header";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as feedActions } from "../redux/modules/feed";
import { actionCreators as postActions } from "../redux/modules/post";

const Feed = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const user_token = localStorage.getItem("user_token") ? true : false;
  const feedInfo = useSelector((state) => state.feed);

  React.useEffect(() => {
    if (!feedInfo) {
      dispatch(feedActions.getFeedFB());
    }
  });

  // 게시물을 눌렀을 때 해당 게시물로 이동
  const postDetail = (postId) => {
    console.log("게시물 페이지 이동");
    dispatch(postActions.myPostFB(postId));
  };

  // 댓글 눌렀을 때 해당 게시물로 이동
  const commentDetail = (commentId) => {
    console.log("댓글 페이지 이동");
    dispatch(postActions.myCommentFB(commentId));
  };

  if (!user_token) {
    window.alert("로그인 후 이용 가능합니다.");
    history.replace("/");
  }

  return (
    <React.Fragment>
      <Header></Header>
      <Grid center>
        <Text size="1.5em" bold>
          내가 작성한 글
        </Text>
        <Grid
          is_flex
          padding="40px"
          width="auto"
          flexFlow
          justifyContent="flex-start"
        >
          {feedInfo.myPosts.map((p) => {
            return (
              <Post
                _onClick={() => {
                  postDetail(p.postId);
                }}
                key={p.postId}
                {...p}
              ></Post>
            );
          })}
        </Grid>
      </Grid>
      <Grid>
        <Text size="1.5em" bold>
          내가 답변한 글
        </Text>
        <Grid is_flex padding="10px" width="auto" flexFlow>
          {feedInfo.myComments.map((c) => {
            return (
              <Post
                noWrap
                _onClick={() => {
                  commentDetail(c.commentId);
                }}
                key={c.commentId}
                {...c}
              ></Post>
            );
          })}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Feed;
