// PostWrtie.js

// *** 패키지 import
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

import Upload from "../shared/Upload";
import { Grid, Button, Text, Input, Image } from "../elements/index";
import Header from "../components/Header";
import axios from "axios";

const PostWrite = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user_token = localStorage.getItem("user_token") ? true : false;

  const [postId, setPostId] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [contents, setContents] = React.useState("");
  const [active, setActive] = React.useState(true);
  const postInfo = useSelector((state) => state.post);

  // 이미지 업로드 부분
  const fileInput = React.useRef();
  const [files, setFiles] = React.useState("");
  const [imgFile, setImgFile] = React.useState("");
  const [preview, setPreview] = React.useState("");

  const selectFile = (e) => {
    // console.log(e.target.files[0]); //파일 선택했을때 파일 값 둘이 같아야함
    // console.log(fileInput.current.files[0]); //ref값으로 가져와 지는지
    setFiles(e.target.files[0]);
  };

  const uploadDB = () => {
    const formData = new FormData();
    formData.append("file", files);
    axios({
      method: "post",
      url: "http://3.37.36.119/api/images",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("user_token"),
      },
    })
      .then((response) => {
        window.alert("사진이 업로드 되었습니다.");
        setImgFile(response.data.imageUrl); // 서버에서 받아온 이미지url
        setPreview(`http://3.37.36.119${response.data.imageUrl}`); // 이미지url 변수에 저장
      })
      .catch((err) => {
        window.alert("사진 업로드 실패");
      });
  };

  // 제목 onchange 함수
  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  // 내용 onchange 함수
  const changeContents = (e) => {
    setContents(e.target.value);
  };

  const checkActive = () => {
    title !== "" && contents !== "" ? setActive(false) : setActive(true);
  };

  const write = () => {
    // console.log(localStorage.user_token);
    // window.alert("게시물 작성이 완료 되었습니다!");
    dispatch(postActions.addPostDB(title, contents, imgFile));
    history.replace("/");
  };

  if (!user_token) {
    window.alert("로그인 후 이용 가능합니다.");
    history.replace("/");
  }

  return (
    <React.Fragment>
      <Header></Header>
      <Grid>
        <input
          type="file"
          name="file"
          encType="multipart/form-data"
          onChange={selectFile}
          ref={fileInput}
        />
        <Button
          cusror="pointer"
          height="30px"
          width="8%"
          margin="30px 0px -20px -60px"
          _onClick={uploadDB}
        >
          업로드
        </Button>
      </Grid>
      <Grid margin="5% 0px 2% 0px">
        <Grid is_flex>
          {
            //  is_edit ? (
            //   <Image
            //     src={test}
            //     alt="게시물 사진"
            //     shape="rectangle"
            //     width="50%"
            //   ></Image>
            // ) :
            preview ? (
              <Image
                src={preview}
                alt="게시물 사진"
                shape="rectangle"
                width="50%"
              ></Image>
            ) : (
              <Image
                src="https://blog.kakaocdn.net/dn/yNtgW/btrmKkQHuOa/OleSub2Kfz7nKcaA54M3Jk/img.gif"
                alt="게시물 사진"
                shape="rectangle"
                width="50%"
                border="2px solid black"
              ></Image>
            )
          }
        </Grid>
      </Grid>
      <Grid margin="10% 0px 0px 0px">
        <Input
          label="제목"
          value={title}
          s
          placeholder="제목을 입력 해주세요"
          _onChange={changeTitle}
          _onKeyUp={checkActive}
        ></Input>
        <Input
          label="게시글 내용"
          value={contents}
          placeholder="내용을 작성 해주세요"
          multiLine
          _onChange={changeContents}
          _onKeyUp={checkActive}
        />
      </Grid>
      <Grid is_flex margin="40px 0px 40px 0px" center>
        <Button
          width="20vw"
          margin="0px 0px 0px 28%"
          className={!active ? "activeBtn" : "unActiveBtn"}
          disabled={active}
          _onClick={write}
        >
          작성
        </Button>
        <Button
          cursor="pointer"
          width="20vw"
          margin="0px 28% 0px 0px"
          _onClick={() => {
            history.push("/");
          }}
        >
          목록
        </Button>
      </Grid>
    </React.Fragment>
  );
};

export default PostWrite;
