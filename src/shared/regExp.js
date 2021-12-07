// regExp

export const isId = (username) => {
  // 아이디 정규식 체크 - 3 ~ 20자 영문, 숫자, -_ 조합
  let regId = /^[-_a-zA-Z]+[-_a-zA-Z0-9]{2,19}$/g;

  return regId.test(username);
};

export const isPassword = (password) => {
  // 비밀번호 정규식 체크 - 3 ~ 20자 영문, 숫자 조합
  let regPassword = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{3,20}$/;

  return regPassword.test(password);
};
