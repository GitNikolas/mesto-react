import React from "react";

const Input = (props) => {
  return (
    <>
      <input
        id = {props.id}
        className = {props.className}
        autoComplete="off"
        type={props.type}
        minLength={props.minLength}
        maxLength={props.maxLength}
        name={props.name}
        required=""
        placeholder={props.placeholder}
      />
      <span id={`error-${props.id}`} className="popup__error-message" />
    </>

  );
}

export default Input;
