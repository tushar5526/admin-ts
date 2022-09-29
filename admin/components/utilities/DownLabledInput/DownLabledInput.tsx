import React from "react";

const DownLabledInput = ({ i, label, type = "text" }: any) => {
  return (
    <p className="downlabel">
      {type === "text" ? (
        <span className="downlabel_field">{i}</span>
      ) : (
        <p>boolean</p>
      )}
      <span className="downlabel_label">{label}</span>
    </p>
  );
};

export default DownLabledInput;
