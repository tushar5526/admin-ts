import React from "react";

const InputFlexWrapper = ({ children, g = "1fr 1fr 1fr" }: any) => {
  return (
    <div style={{ gridTemplateColumns: g }} className="input_flex_wrapper">
      {children}
    </div>
  );
};

export default InputFlexWrapper;
