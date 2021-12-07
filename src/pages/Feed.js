// Feed.js

// *** 패키지 import
import React from "react";

import { Grid, Button, Text, Input } from "../elements/index";
import Post from "../components/Post";
import Header from "../components/Header";

const Feed = (props) => {
  return (
    <React.Fragment>
      <Header></Header>
      <Grid center>
        <Text size="1.5em" bold>
          내가 작성한 글
        </Text>
        <Grid is_flex padding="10px" width="auto" flexFlow>
          <Post></Post>
          <Post></Post>
          <Post></Post>
          <Post></Post>
          <Post></Post>
        </Grid>
      </Grid>
      <Grid>
        <Text size="1.5em" bold>
          내가 답변한 글
        </Text>
        <Grid is_flex padding="10px" width="auto" flexFlow>
          <Post noWrap></Post>
          <Post noWrap></Post>
          <Post noWrap></Post>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Feed;
