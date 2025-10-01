import React from "react";

export default function Input({ label, type = "text", value, onChange, name, placeholder }) {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label fw-semibold">
        {label}
      </label>
      <input
        type={type}
        className="form-control"
        id={name}
        name={name}
        placeholder={placeholder || label}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}
