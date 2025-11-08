import React from "react";

export default function FormField({ label, name, value, onChange, error, placeholder = "", type = "text", textarea = false }) {
  return (
    <div className="field">
      <label>{label}</label>
      {textarea ? (
        <textarea name={name} value={value} onChange={onChange} placeholder={placeholder} />
      ) : (
        <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} />
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
}
