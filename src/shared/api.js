import axios from "axios";

// 사용자 정의 인스턴스 기본 설정 참고 (https://yamoo9.github.io/axios/guide/config-defaults.html#%EA%B8%80%EB%A1%9C%EB%B2%8C-axios-%EA%B8%B0%EB%B3%B8-defaults-%EC%84%A4%EC%A0%95)
const instance = axios.create({
  baseURL: "http://3.37.36.119",
  headers: {
    "content-type": "application/json;charset=UTF-8", // 자바스크립트는 json형태로 받아와야 한다.
    accept: "application/json,",
  },
});
// Tip. html form 태그를 사용하여 post 방식으로 요청하거나, jQuery의 ajax 등의 요철을 할때
// default Content-Type은 'application/json,'이 아니라 'application/x-www-form-urlencoded'다.

// interceptors의 역할 => then이나 catch로 처리되기 전
// 요청(request)이나 응답(response)을 가로채 어떠한 작업을 수행할 수 있게 한다. 참고 (https://yamoo9.github.io/axios/guide/interceptors.html)
instance.interceptors.request.use(function (config) {
  const accessToken = localStorage.user_token; // 우리는 로컬스토리지에 저장하기로 했음!
  config.headers.common["X-AUTH-TOKEN"] = `${accessToken}`; // header에 토큰값을 넣는다 => header에 토큰값이 있어 앞으로 request를 자유자재로 할 수 있다.
  return config;
});

// 만약 위의 방법이 되지 않을시엔 (https://velog.io/@kyh196201/HTTP-%ED%97%A4%EB%8D%94-%ED%86%A0%ED%81%B0-%EC%84%A4%EC%A0%95-axios-%EC%9D%B8%ED%84%B0%EC%85%89%ED%84%B0)
// 위 사이트의 (4) 부분 참고해보기

/* interceptors의 형태 */
//  xxx.interceptors.request.use(funcion (config){
//  요청을 보내기 전에 수행할 일
//  return config;
//  });

// 데이터 요청 to 서버
export const apis = {
  // user
  login: (username, password) =>
    instance.post("/user/login", { username: username, password: password }),
  signup: (username, password, passwordCheck) =>
    instance.post("/api/signup", {
      username: username,
      password: password,
      passwordCheck: passwordCheck,
    }),
  islogin: (username) =>
    instance.get("/api/islogin", {
      userInfo: {
        username: username,
      },
    }),

  // 게시글 - post
  addPost: (title, content) =>
    instance.post("/api/posts", {
      title: title,
      content: content,
    }),
  editPost: (postId, content) => instance.put(`/api/posts/${postId}`, content),
  deletePost: (postId) => instance.put(`/api/posts/${postId}`),

  // 랜덤 게시글 조회 get

  // 내가 작성한 게시글 조회 get

  // 내가 댓글을 작성한 글 조회 get

  // 댓글 작성 post

  // 피드 페이지 get

  // 아이디 중복 검사post,, 로그아웃get 필요한가?
};
