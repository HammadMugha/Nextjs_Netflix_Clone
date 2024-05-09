import React from "react";

export default function Button({ text, style,onClick }) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer px-5 py-3 ${style ? style : "px-5 py-3"}`}
    >
      {text}
    </button>
  );
}
