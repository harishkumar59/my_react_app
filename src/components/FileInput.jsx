import React from "react";

export default function FileInput({ file, setFile }) {
  function handleFile(e) {
    const selected = e.target.files[0];
    setFile(selected || null);
  }

  return (
    <div className="field">
      <label>Upload your college ID card / Resume (optional)</label>
      <input type="file" accept=".pdf,.doc,.docx,.png,.jpg" onChange={handleFile} />
      {file && <div className="file-preview">Selected file: {file.name}</div>}
    </div>
  );
}
