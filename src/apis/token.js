// const getToken = () => {
//   const token = sessionStorage.getItem("token");
//   if (token) {
//     const parseToken = JSON.parse(token);
//     // JSON.parse() 메서드는 JSON 문자열의 구문을 분석하고, 그 결과에서 JavaScript 값이나 객체를 생성
//     const totalToken = `${parseToken.accessToken},${parseToken.refreshToken}`;
//     // Refresh Token은 Access Token과 똑같은 형태의 JWT입니다.
//     // 처음에 로그인을 완료했을 때 Access Token과 동시에 발급되는
//     // Refresh Token은 긴 유효기간을 가지면서,
//     // Access Token이 만료됐을 때 새로 발급해주는 열쇠가 됩니다
//     // (여기서 만료라는 개념은 그냥 유효기간을 지났다는 의미입니다.)
//     return totalToken;
//   } else {
//     return null;
//   }
// };
// const setToken = (token) => {
//   if (!token) {
//     return false;
//   }
//   sessionStorage.setItem("token", token);
// };
// const delToken = () => {
//   sessionStorage.removeItem("token");
// };

// export { getToken, setToken, delToken };
