import React from "react";

import { Grid, Input, Button } from "../elements";
import { actionCreators as commentActions } from "../redux/modules/comment";
import { useDispatch, useSelector } from "react-redux";

const CommentWrite = (props) => {
  const postId = useSelector((state) => state.post.postId);
  const [comment, setComment] = React.useState();
  const dispatch = useDispatch();

  const onChange = (e) => {
    setComment(e.target.value);
  };

  const write = () => {
    if (comment == undefined || comment === "") {
      window.alert("댓글을 입력 해주세요");
      return;
    }
    dispatch(commentActions.addCommentFB(postId, comment));
    setComment(""); // 댓글을 입력하면 input의 value를 날려준다.
  };

  return (
    <React.Fragment>
      <Grid padding="16px" width="70%" margin="auto">
        <Input
          placeholder="댓글 내용을 입력해주세요 :)"
          _onChange={onChange}
          value={comment}
          onSubmit={write}
          is_submit
        />
        <Button width="50px" margin="0px 2px 0px 2px" _onClick={write}>
          작성
        </Button>
      </Grid>
    </React.Fragment>
  );
};

export default CommentWrite;
