import React, { useState } from "react";
import FormField from "./FormField";
import FileInput from "./FileInput";

const initialState = {
  email: "",
  fullName: "",
  contactNumber: "",
  currentQualification: "",
  departmentName: "",
  opportunityType: [], // checkboxes
  doneInternshipBefore: "",
  jobLookingFor: "",
  certifiedCourse: "",
};

export default function StudentForm() {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm((prev) => {
        const set = new Set(prev[name] || []);
        if (checked) set.add(value);
        else set.delete(value);
        return { ...prev, [name]: Array.from(set) };
      });
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  function validate() {
    const err = {};
    if (!form.email) err.email = "Email required";
    if (!form.fullName) err.fullName = "Full name required";
    if (!form.contactNumber) err.contactNumber = "Contact number required";
    if (!form.currentQualification) err.currentQualification = "Choose qualification";
    return err;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({});
    const err = validate();
    if (Object.keys(err).length) {
      setErrors(err);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setSubmitting(true);
    setSuccess(null);

    // Demo: prepare data for submission
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      // stringify arrays
      data.append(k, Array.isArray(v) ? v.join(", ") : v);
    });
    if (file) data.append("file", file);

    // For demo, we'll just log the values. Replace this with a fetch() call to your backend.
    try {
      // Example: send to your backend api
      // const resp = await fetch("/api/submit", { method: "POST", body: data });

      // DEMO: simulate network delay
      await new Promise((r) => setTimeout(r, 800));

      console.log("FORM SUBMIT (preview):");
      for (const pair of data.entries()) {
        console.log(pair[0], ":", pair[1]);
      }

      setSuccess("Form submitted successfully (demo).");
      setForm(initialState);
      setFile(null);
    } catch (error) {
      console.error(error);
      setSuccess("Submission failed. See console for details.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="student-form" onSubmit={handleSubmit} encType="multipart/form-data">
      {success && <div className="success">{success}</div>}

      <FormField label="Email *" name="email" value={form.email} onChange={handleChange} error={errors.email} type="email" placeholder="your@mail.com" />
      <FormField label="Full Name *" name="fullName" value={form.fullName} onChange={handleChange} error={errors.fullName} placeholder="sujal sigh" />
      <FormField label="Contact Number *" name="contactNumber" value={form.contactNumber} onChange={handleChange} error={errors.contactNumber} placeholder="+91 98xxxxxxx" />
      
      <div className="field">
        <label>Current Academic Qualification *</label>
        <div className="radios">
          <label><input type="radio" name="currentQualification" value="Third Year" checked={form.currentQualification === "Third Year"} onChange={handleChange} /> Third Year</label>
          <label><input type="radio" name="currentQualification" value="Graduated" checked={form.currentQualification === "Graduated"} onChange={handleChange} /> Graduated</label>
          <label><input type="radio" name="currentQualification" value="Master's Programme" checked={form.currentQualification === "Master's Programme"} onChange={handleChange} /> Master's Programme</label>
          <label><input type="radio" name="currentQualification" value="Other" checked={form.currentQualification === "Other"} onChange={handleChange} /> Other</label>
        </div>
        {errors.currentQualification && <div className="error">{errors.currentQualification}</div>}
      </div>

      <FormField label="Department Name" name="departmentName" value={form.departmentName} onChange={handleChange} placeholder="CSE, IT, ECE..." />

      <div className="field">
        <label>Which type of opportunity are you primarily interested in?</label>
        <div className="checkboxes">
          <label><input type="checkbox" name="opportunityType" value="Placement" checked={form.opportunityType.includes("Placement")} onChange={handleChange} /> Placement</label>
          <label><input type="checkbox" name="opportunityType" value="Internship" checked={form.opportunityType.includes("Internship")} onChange={handleChange} /> Internship</label>
          <label><input type="checkbox" name="opportunityType" value="Skill Development" checked={form.opportunityType.includes("Skill Development")} onChange={handleChange} /> Skill Development</label>
          <label><input type="checkbox" name="opportunityType" value="Other" checked={form.opportunityType.includes("Other")} onChange={handleChange} /> Other</label>
        </div>
      </div>

      <div className="field">
        <label>Have you done any internship or job earlier?</label>
        <label><input type="radio" name="doneInternshipBefore" value="Yes" checked={form.doneInternshipBefore === "Yes"} onChange={handleChange} /> Yes</label>
        <label><input type="radio" name="doneInternshipBefore" value="No" checked={form.doneInternshipBefore === "No"} onChange={handleChange} /> No</label>
      </div>

      <FormField label="What kind of job or internship are you looking for, and in which field?" name="jobLookingFor" value={form.jobLookingFor} onChange={handleChange} textarea placeholder="Describe role, tech stack, domain..." />

      <FormField label="Have you completed any certified course related to this field of job/role?" name="certifiedCourse" value={form.certifiedCourse} onChange={handleChange} placeholder="List courses (Coursera, Udemy) ..." />

      <FileInput file={file} setFile={setFile} />

      <div className="form-actions">
        <button type="submit" disabled={submitting}>{submitting ? "Submitting..." : "Submit"}</button>
      </div>
    </form>
  );
}
