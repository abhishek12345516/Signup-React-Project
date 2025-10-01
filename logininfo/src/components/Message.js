import React from "react";

export default function Message({ message }) {
  if (!message) return null;

  const cls =
    message.type === "success"
      ? "alert alert-success"
      : "alert alert-danger";

  return <div className={cls}>{message.text}</div>;
}
