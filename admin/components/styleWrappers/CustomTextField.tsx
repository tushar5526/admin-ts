import React from "react";

const CustomTextField = ({ i, label, type = "text" }: any) => {
  return (
    <div className="custom_text_field">
      <p>{label}</p>
      <p>{i}</p>
    </div>
  );
};

export default CustomTextField;
