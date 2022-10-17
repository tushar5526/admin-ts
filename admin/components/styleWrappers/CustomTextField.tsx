import React from "react";

const CustomTextField = ({ i, label, type = "text", customStyle}: any) => {
  return (
    <div className="custom_text_field" style={{...customStyle}}>
      <p>{label}</p>
      <p>{i}</p>
    </div>
  );
};

export default CustomTextField;
