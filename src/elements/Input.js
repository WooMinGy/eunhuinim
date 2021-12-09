import React from "react";
import styled from "styled-components";

import { Text, Grid } from "./index";

const Input = (props) => {
  const {
    label,
    placeholder,
    _onChange,
    _onKeyUp,
    type,
    multiLine,
    value,
    is_submit,
    onSubmit,
  } = props;

  if (multiLine) {
    return (
      <>
        {label && <Text margin="0px">{label}</Text>}
        <ElTextarea
          rows={10}
          value={value}
          placeholder={placeholder}
          onKeyUp={_onKeyUp}
          onChange={_onChange}
        ></ElTextarea>
      </>
    );
  }

  return (
    <React.Fragment>
      <>
        {label && <Text margin="0px">{label}</Text>}
        {is_submit ? (
          <ElInput
            type={type}
            placeholder={placeholder}
            onKeyUp={_onKeyUp}
            onChange={_onChange}
            value={value}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onSubmit(e);
              }
            }}
          />
        ) : (
          <ElInput
            type={type}
            placeholder={placeholder}
            onChange={_onChange}
            onKeyUp={_onKeyUp}
          />
        )}
      </>
    </React.Fragment>
  );
};

Input.defaultProps = {
  label: false,
  placeholder: "텍스트를 입력해주세요.",
  type: "text",
  value: "",
  multiLine: false,
  is_submit: false,
  onSubmit: () => {},
  _onChange: () => {},
  _onBlur: () => {},
};

const ElInput = styled.input`
  border: 1px solid #212121;
  width: 60%;
  ${(props) => (props.height ? `height : ${props.height};` : "")}
  padding: 12px 4px;
  box-sizing: border-box;
`;

const ElTextarea = styled.textarea`
  border: 1px solid #212121;
  width: 60%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

export default Input;
