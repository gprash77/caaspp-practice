"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TOTAL_PRACTICE_TESTS } from "@/lib/questions";

const tests = [
  {
    id: "math-cat",
    subject: "math",
    type: "cat",
    label: "Mathematics — Computer Adaptive Test",
    description: "Multiple-choice, text-input, and multi-select questions covering all math claims.",
  },
  {
    id: "math-pt",
    subject: "math",
    type: "pt",
    label: "Mathematics — Performance Task",
    description: "Multi-step problems that require modeling, reasoning, and problem solving.",
  },
  {
    id: "ela-cat",
    subject: "ela",
    type: "cat",
    label: "ELA — Computer Adaptive Test",
    description: "Reading comprehension, vocabulary, and writing questions with passages.",
  },
  {
    id: "ela-pt",
    subject: "ela",
    type: "pt",
    label: "ELA — Performance Task Segment",
    description: "Read sources, answer research questions, and respond to a writing task.",
  },
];

export default function Home() {
  const router = useRouter();
  const [grade, setGrade] = useState("3");
  const [practiceTest, setPracticeTest] = useState("1");

  const handleStart = (subject: string, type: string) => {
    router.push(`/test?grade=${grade}&subject=${subject}&type=${type}&test=${practiceTest}`);
  };

  return (
    <div className="landing-container">
      <div className="landing-card">
        <div className="landing-header">
          <h1>CAASPP Practice Test</h1>
          <p>California Assessment of Student Performance and Progress</p>
        </div>
        <div className="landing-body">
          <div style={{ display: "flex", gap: 16, marginBottom: 0 }}>
            <div className="select-group" style={{ flex: 1 }}>
              <label htmlFor="grade">Select Grade</label>
              <select
                id="grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              >
                <option value="3">Grade 3</option>
                <option value="4" disabled>
                  Grade 4 (Coming Soon)
                </option>
                <option value="5" disabled>
                  Grade 5 (Coming Soon)
                </option>
              </select>
            </div>
            <div className="select-group" style={{ flex: 1 }}>
              <label htmlFor="practiceTest">Practice Test</label>
              <select
                id="practiceTest"
                value={practiceTest}
                onChange={(e) => setPracticeTest(e.target.value)}
              >
                {Array.from({ length: TOTAL_PRACTICE_TESTS }, (_, i) => (
                  <option key={i + 1} value={String(i + 1)}>
                    Test {i + 1}{i === 0 ? " (Original)" : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontWeight: 600, marginBottom: 12, color: "#333", fontSize: 15 }}>
              Select a Test
            </label>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {tests.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleStart(t.subject, t.type)}
                  style={{
                    background: "white",
                    border: "2px solid #ccc",
                    borderRadius: 8,
                    padding: "14px 18px",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "border-color 0.15s, background 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#00529b";
                    e.currentTarget.style.background = "#f0f6ff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#ccc";
                    e.currentTarget.style.background = "white";
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: 15, color: "#00529b", marginBottom: 4 }}>
                    {t.label}
                  </div>
                  <div style={{ fontSize: 13, color: "#666", lineHeight: 1.4 }}>
                    {t.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div
            style={{
              background: "#f0f4f8",
              borderRadius: 6,
              padding: "16px 20px",
              marginBottom: 8,
              fontSize: 14,
              lineHeight: 1.6,
              color: "#444",
            }}
          >
            <strong>About this practice test:</strong>
            <ul style={{ margin: "8px 0 0", paddingLeft: 20 }}>
              <li>Questions similar to the real CAASPP test</li>
              <li>Interface matches the actual test format you will see at school</li>
              <li>After you finish, you will get a score report showing what you did well and what to practice more</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
