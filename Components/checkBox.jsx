import React, { useState } from "react";

const CustomCheckbox = ({ text, defaultChecked = false }) => {
  const [checked, setChecked] = useState(defaultChecked);

  const checkboxStyle = {
    minWidth: "1.5rem",
    minHeight: "1.5rem",
    backgroundColor: checked ? "#00e8ac" : "transparent",
    border: "1px solid #00e8ac",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "background-color 0.2s",
    cursor: "pointer",
    marginRight: "10px",
  };

  const containerStyle = {
    display: "flex",
    alignItems: "start",
    cursor: "pointer",
    margin: "1rem 0rem",
  };

  const checkmarkStyle = {
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
  };

  return (
    <div style={containerStyle} onClick={() => setChecked(!checked)}>
      <div style={checkboxStyle}>
        {checked && <span style={checkmarkStyle}>✓</span>}
      </div>
      <p>{text}</p>
    </div>
  );
};

export default CustomCheckbox;
