import React from "react";
import StudentForm from "./components/StudentForm";

export default function App() {
  return (
    <div className="app-container">
      <header>
        <h1>7Shards Career Enhancement Cell (7CEC)</h1>
        <p>Fill this form to apply for placement, internship or skill development.</p>
      </header>

      <main>
        <StudentForm />
      </main>

      <footer className="footer">
        <small>© {new Date().getFullYear()} Your College Name</small>
      </footer>
    </div>
  );
}
