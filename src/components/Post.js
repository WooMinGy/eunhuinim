// Post.js

// *** 패키지 import
import React from "react";

import { Grid, Button, Text, Input } from "../elements/index";
import Card from "react-bootstrap/Card";

const Post = (props) => {
  const { noWrap, _onClick } = props;

  if (noWrap) {
    return (
      <div
        style={{
          width: "100%",
          padding: "1% 0px 0px 0px",
          marginTop: "1%",
          height: "30px",
          border: "1px solid black",
        }}
      >
        <Grid _onClick={_onClick} is_flex>
          <Grid>
            <Text margin="0px">{props.comment}</Text>
          </Grid>
          <Grid>
            <Text margin="0px">{props.createdAt}</Text>
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
          margin: "0% 1% 1% 1%",
          border: "1px solid black",
        }}
        onClick={_onClick}
      >
        <Card.Header>{props.title}</Card.Header>
        <Card.Body>
          <Card.Text>{props.content}</Card.Text>
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
