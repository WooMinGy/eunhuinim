// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { actionCreators as imageActions } from "../redux/modules/image";
// import { Button, Grid } from "../elements";
// import { apis } from "./api";
// import axios from "axios";

// const Upload = (props) => {
//   const dispatch = useDispatch();
//   const fileInput = React.useRef();
//   const [files, setFiles] = React.useState("");

//   const selectFile = (e) => {
//     // console.log(e.target.files[0]); //파일 선택했을때 파일 값 둘이 같아야함
//     // console.log(fileInput.current.files[0]); //ref값으로 가져와 지는지
//     setFiles(e.target.files[0]);
//   };

//   const uploadDB = () => {
//     const formData = new FormData();
//     formData.append("file", files);
//     axios({
//       method: "post",
//       url: "http://3.37.36.119/api/images",
//       data: formData,
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization: localStorage.getItem("user_token"),
//       },
//     })
//       .then((response) => {
//         window.alert("사진이 업로드 되었습니다.");
//       })
//       .catch((err) => {
//         window.alert("사진 업로드 실패");
//       });
//   };

//   return (
//     <React.Fragment>
//       <Grid>
//         <input
//           type="file"
//           name="file"
//           encType="multipart/form-data"
//           onChange={selectFile}
//           ref={fileInput}
//         />
//         <Button
//           cusror="pointer"
//           height="30px"
//           width="8%"
//           margin="30px 0px -20px -60px"
//           _onClick={uploadDB}
//         >
//           업로드
//         </Button>
//       </Grid>
//     </React.Fragment>
//   );
// };

// export default Upload;
