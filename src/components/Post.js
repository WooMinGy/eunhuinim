// Post.js

// *** 패키지 import
import React from "react";

import { Grid, Button, Text, Input } from "../elements/index";
import Card from "react-bootstrap/Card";

const Post = (props) => {
  const { noWrap } = props;

  if (noWrap) {
    return (
      <div
        style={{
          width:"100%",
          padding:"1% 0px 0px 0px",
          height:"30px",
          border: "1px solid black",
          marginTop: "2%",
        }}
      >
        <Grid is_flex>
          <Grid>
            <Text margin="0px">제목</Text>
          </Grid>
          <Grid>
            <Text margin="0px">내용</Text>
          </Grid>
        </Grid>
      </div>
    );
  }

  return (
    <React.Fragment>
      <Card
        border="dark"
        style={{
          width: "18rem",
          height: "15rem",
          border: "1px solid black",
          marginTop: "2%",
        }}
      >
        <Card.Header>제목</Card.Header>
        <Card.Body>
          <Card.Text>내용</Card.Text>
        </Card.Body>
      </Card>
      <br />
    </React.Fragment>
  );
};

Post.defaultProps = {
  noWrap: false,
};

export default Post;
