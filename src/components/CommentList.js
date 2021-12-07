// CommentList.js

// *** 패키지 import
import React from "react";

import { Grid, Button, Text, Input } from "../elements/index";

const CommentList = (props) => {
  return (
    <React.Fragment>
      <CommentItem></CommentItem>
    </React.Fragment>
  );
};

const CommentItem = (props) => {
  const { post_id, contents, insert_dt } = props;
  return (
    <React.Fragment>
      <Grid is_flex>
        <Grid>
          <Text bold>익명</Text>
        </Grid>
        <Grid>
          <Text margin="0px">{contents}</Text>
        </Grid>
        <Grid>
          <Text margin="0px">{insert_dt}</Text>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

CommentList.defaultProps = {
  post_id: null,
};

CommentItem.defaultProps = {
  user_name: "mean0",
  user_id: "",
  post_id: 1,
  contents: "귀여운 고양이네요!",
  insert_dt: "2021-01-01 19:00:00",
};

export default CommentList;
