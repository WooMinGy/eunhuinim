// import axios from "axios";
// import { getToken } from "./token";
// const instance = axios.create({
//   baseURL: "요청보낼 서버 도메인",
//   /*요청을 www.aa.com/user로 보낸다면, www.aa.com까지 기록*/
//   withCredentials: true,
// });
// // 가지고 있는 토큰 넣어주기!
// // 로그인 전이면 토큰이 없으니 못 넣어요.
// // 그럴 땐 로그인 하고 토큰을 받아왔을 때 넣어줍시다.
// instance.interceptors.request.use((config) => {
//   config.headers["Content-Type"] = "application/json; charset=utf-8";
//   config.headers["X-Requested-With"] = "XMLHttpRequest";
//   config.headers["authorization"] = getToken() ? `Bearer ${getToken()}` : "";
//   config.headers.Accept = "application/json";
//   return config;
// });
// const apis = {
//   // 회원가입
//   signup: (userinfo) => instance.post("/user/signup", userinfo),

//   //로그인
//   login: (userinfo) => instance.post("/user/login", userinfo),

//   //게시물
//   getPost: () => instance.get("/home"),

//   //게시글 조회
//   addPost: (article_info) => instance.post(`/api/article`, article_info),

//   //게시글 작성
//   updatePost: (article_id, article_info) =>
//     instance.put(`/api/article/${article_id}`, article_info),

//   //게시글 수정 //게시글 상세페이지 조회
//   getPostDetail: (article_id) => instance.get(`/article/${article_id}`),

//   //게시글 삭제
//   deletePostt: (article_id) => instance.delete(`/api/article/${article_id}`),

//   //댓글
//   getComment: (article_id) => instance.get(`/api/${article_id}/comment`),

//   // 댓글 조회
//   addComment: (article_id, comment_info) =>
//     instance.post(`/api/commnet/${article_id}`, comment_info), // 댓글 작성

//   // 댓글 삭제
//   deleteComment: (comment_id) => instance.delete(`/api/commnet/${comment_id}`),
// };
// export default apis;
