"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { listAvailableAssessments } from "@/lib/assessment-manifest";

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
  const availableTests = listAvailableAssessments(Number(grade));

  const handleStart = (subject: string, type: string) => {
    const sectionKey = `caaspp-latest:${grade}:${subject}:${type}:${practiceTest}`;
    const existingAttempt = window.sessionStorage.getItem(sectionKey);
    const attemptId = existingAttempt || window.crypto.randomUUID();
    window.sessionStorage.setItem(sectionKey, attemptId);
    router.push(`/test?grade=${grade}&subject=${subject}&type=${type}&test=${practiceTest}&attempt=${attemptId}`);
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
                onChange={(e) => {
                  setGrade(e.target.value);
                  const firstAvailable = listAvailableAssessments(Number(e.target.value))[0];
                  setPracticeTest(String(firstAvailable?.testNumber ?? 1));
                }}
              >
                <option value="3">Grade 3</option>
                <option value="4">Grade 4</option>
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
                {availableTests.map((assessment) => (
                  <option key={assessment.testNumber} value={String(assessment.testNumber)}>
                    Test {assessment.testNumber}{assessment.testNumber === 1 ? " (Original)" : ""}
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

          <Link
            href="/minemath"
            style={{
              display: "block",
              marginTop: 16,
              padding: "16px 18px",
              border: "2px solid #2e7d32",
              borderRadius: 8,
              background: "#eff8f1",
              color: "#173f20",
              textDecoration: "none",
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>
              Play Minemath
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.4, color: "#34513a" }}>
              Mine blocks by solving math problems, craft stronger tools, and reach the diamond chamber.
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
