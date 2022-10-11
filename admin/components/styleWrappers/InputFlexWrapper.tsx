import React from "react";

const InputFlexWrapper = ({ children, g = "1fr 1fr 1fr", flex }: any) => {
  return (
    <div style={{ gridTemplateColumns: g }} className={flex ? "flex_show_wrapper": "input_flex_wrapper"}>
      {children}
    </div>
  );
};

export default InputFlexWrapper;
