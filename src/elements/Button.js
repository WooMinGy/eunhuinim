import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const {
    cursor,
    height,
    text,
    _onClick,
    is_float,
    children,
    margin,
    width,
    className,
    padding,
    disabled,
  } = props;

  if (is_float) {
    return (
      <React.Fragment>
        <FloatButton onClick={_onClick}>{text ? text : children}</FloatButton>
      </React.Fragment>
    );
  }

  const styles = {
    cursor: cursor,
    height: height,
    margin: margin,
    width: width,
    padding: padding,
  };

  return (
    <React.Fragment>
      <ElButton
        className={className}
        {...styles}
        onClick={_onClick}
        disabled={disabled}
      >
        {text ? text : children}
      </ElButton>
    </React.Fragment>
  );
};

Button.defaultProps = {
  className: "",
  text: false,
  children: null,
  _onClick: () => {},
  is_float: false,
  margin: false,
  width: "100%",
  height: "10%",
  padding: "12px 0px",
  disabled: false,
  cursor: "pointer",
};

const ElButton = styled.button`
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  background-color: ${(props) =>
    props.className === "unActiveBtn" ? "gray" : "black"};
  color: #ffffff;
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  border: none;
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  cursor: "pointer"
`;

const FloatButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: #212121;
  color: #ffffff;
  box-sizing: border-box;
  font-size: 36px;
  font-weight: 800;
  position: fixed;
  bottom: 50px;
  right: 16px;
  text-align: center;
  vertical-align: middle;
  border: none;
  border-radius: 50px;
  cursor: "pointer";
`;

export default Button;
