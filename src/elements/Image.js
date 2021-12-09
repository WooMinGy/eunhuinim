import styled from "styled-components";
import React from "react";

const Image = (props) => {
  const {
    shape,
    src,
    size,
    border,
    position,
    justifyContent,
    textAlign,
    margin,
  } = props;

  const styles = {
    textAlign: textAlign,
    justifyContent: justifyContent,
    src: src,
    size: size,
    border: border,
    position: position,
    margin: margin,
  };
  if (shape === "circle") {
    return <ImageCircle {...styles}></ImageCircle>;
  }
  if (shape === "rectangle") {
    return (
      <AspectOutter>
        <AspectInner {...styles}></AspectInner>
      </AspectOutter>
    );
  }
  return (
    <React.Fragment>
      <ImageDefault {...styles}></ImageDefault>
    </React.Fragment>
  );
};

Image.defaultProps = {
  border: null,
  shape: "circle",
  src: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F4I5WI%2FbtrmwRawr5e%2FupbtbZr3K2KRI00Wisxt11%2Fimg.png",
  size: 36,
};

const ImageDefault = styled.div`
  --size: ${(props) => props.size}px; //css에서도 변수를 만들 수 있다.
  width: var(--size);
  height: var(--size);
  background-image: url("${(props) => props.src}");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

const AspectOutter = styled.div`
  width: 35%;
  min-width: 250px;
`;
//background-size: cover;
//background-position: center;
const AspectInner = styled.div`
  margin: 0 auto;
  padding-top: 75%; // 넓이의 4:3 반응형 직사각형을 만들거기 때문에 75%를 줬다.
  overflow: hidden;
  background-image: url("${(props) => props.src}");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  ${(props) => (props.border ? `border : ${props.border};` : "")}
`;

const ImageCircle = styled.div`
  --size: ${(props) => props.size}px; //css에서도 변수를 만들 수 있다.
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-image: url("${(props) => props.src}");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin: 4px;
`;

export default Image;
