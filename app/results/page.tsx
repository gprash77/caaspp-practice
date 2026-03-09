"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getQuestions,
  mathClaims,
  elaClaims,
  mathDomains,
  type Question,
} from "@/lib/questions";

interface TestData {
  grade: number;
  subject: "math" | "ela";
  testType?: "cat" | "pt";
  answers: Record<number, string | string[]>;
  questionIds: number[];
}

interface QuestionResult {
  question: Question;
  userAnswer: string | string[];
  isCorrect: boolean;
}

function normalizeAnswer(a: string): string {
  return a.trim().toLowerCase().replace(/\s+/g, " ");
}

function checkAnswer(question: Question, userAnswer: string | string[]): boolean {
  const correct = question.correctAnswer;

  if (Array.isArray(correct)) {
    if (!Array.isArray(userAnswer)) return false;
    const sortedCorrect = [...correct].sort();
    const sortedUser = [...userAnswer].sort();
    return (
      sortedCorrect.length === sortedUser.length &&
      sortedCorrect.every((c, i) => normalizeAnswer(c) === normalizeAnswer(sortedUser[i]))
    );
  }

  if (typeof userAnswer === "string") {
    // For text-input, handle comma-separated answers
    if (correct.includes(",")) {
      const correctParts = correct.split(",").map((s) => normalizeAnswer(s));
      const userParts = userAnswer.split(",").map((s) => normalizeAnswer(s));
      return (
        correctParts.length === userParts.length &&
        correctParts.every((c, i) => c === userParts[i])
      );
    }
    return normalizeAnswer(userAnswer) === normalizeAnswer(correct);
  }

  return false;
}

function getPerformanceLevel(pct: number): { label: string; color: string; className: string } {
  if (pct >= 80) return { label: "Above Standard", color: "#2e7d32", className: "good" };
  if (pct >= 50) return { label: "Near Standard", color: "#f57c00", className: "needs-work" };
  return { label: "Below Standard", color: "#c62828", className: "struggling" };
}

export default function ResultsPage() {
  const router = useRouter();
  const [testData, setTestData] = useState<TestData | null>(null);
  const [results, setResults] = useState<QuestionResult[]>([]);
  const [expandedQ, setExpandedQ] = useState<Set<number>>(new Set());

  useEffect(() => {
    const stored = sessionStorage.getItem("testResults");
    if (!stored) {
      router.push("/");
      return;
    }
    const data: TestData = JSON.parse(stored);
    setTestData(data);

    const questions = getQuestions(data.grade, data.subject, data.testType || "cat");
    const qResults: QuestionResult[] = questions.map((q) => ({
      question: q,
      userAnswer: data.answers[q.id] || "",
      isCorrect: checkAnswer(q, data.answers[q.id] || ""),
    }));
    setResults(qResults);
  }, [router]);

  if (!testData || results.length === 0) {
    return <div style={{ padding: 40, textAlign: "center" }}>Loading results...</div>;
  }

  const totalCorrect = results.filter((r) => r.isCorrect).length;
  const totalQuestions = results.length;
  const totalPct = Math.round((totalCorrect / totalQuestions) * 100);
  const overallLevel = getPerformanceLevel(totalPct);

  // Group by claim
  const claimLabels = testData.subject === "math" ? mathClaims : elaClaims;
  const claimGroups: Record<number, QuestionResult[]> = {};
  results.forEach((r) => {
    const claim = r.question.claim;
    if (!claimGroups[claim]) claimGroups[claim] = [];
    claimGroups[claim].push(r);
  });

  // Identify areas to improve
  const weakAreas: string[] = [];
  Object.entries(claimGroups).forEach(([claimStr, qResults]) => {
    const claim = parseInt(claimStr);
    const correct = qResults.filter((r) => r.isCorrect).length;
    const pct = Math.round((correct / qResults.length) * 100);
    if (pct < 70) {
      weakAreas.push(claimLabels[claim] || `Claim ${claim}`);
    }
  });

  // Identify specific weak domains/standards
  const weakStandards: string[] = [];
  results.forEach((r) => {
    if (!r.isCorrect) {
      const domain = r.question.domain;
      const domainName =
        testData.subject === "math" && domain
          ? mathDomains[domain] || domain
          : r.question.standard;
      if (!weakStandards.includes(domainName)) {
        weakStandards.push(domainName);
      }
    }
  });

  const subjectLabel =
    testData.subject === "math" ? "Mathematics" : "English Language Arts";

  const toggleQuestion = (id: number) => {
    const next = new Set(expandedQ);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpandedQ(next);
  };

  return (
    <div className="results-container">
      <div className="results-header">
        <h1 style={{ margin: "0 0 4px", fontSize: 22 }}>
          Practice Test Results
        </h1>
        <p style={{ margin: 0, opacity: 0.85 }}>
          Grade {testData.grade} {subjectLabel}
        </p>
      </div>

      <div className="results-body">
        {/* Score summary */}
        <div className="score-summary">
          <div className="score-card">
            <div className="score-value">
              {totalCorrect}/{totalQuestions}
            </div>
            <div className="score-label">Questions Correct</div>
          </div>
          <div className="score-card">
            <div className="score-value" style={{ color: overallLevel.color }}>
              {totalPct}%
            </div>
            <div className="score-label">{overallLevel.label}</div>
          </div>
        </div>

        {/* Claim breakdown */}
        <h2 style={{ fontSize: 18, marginBottom: 16 }}>
          Score by Category (Claims)
        </h2>
        {Object.entries(claimGroups).map(([claimStr, qResults]) => {
          const claim = parseInt(claimStr);
          const correct = qResults.filter((r) => r.isCorrect).length;
          const pct = Math.round((correct / qResults.length) * 100);
          const level = getPerformanceLevel(pct);

          return (
            <div key={claim} className="claim-section">
              <div className="claim-header">
                <span className="claim-title">
                  {claimLabels[claim] || `Claim ${claim}`}
                </span>
                <span className={`claim-score ${level.className}`}>
                  {correct}/{qResults.length} — {level.label}
                </span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${pct}%`,
                    background: level.color,
                  }}
                />
              </div>
            </div>
          );
        })}

        {/* Areas to improve */}
        {weakAreas.length > 0 && (
          <div className="improvement-section">
            <h3>Areas to Improve</h3>
            <ul>
              {weakAreas.map((area) => (
                <li key={area}>
                  <strong>{area}</strong> — Practice more questions in this
                  category.
                </li>
              ))}
              {weakStandards.length > 0 && (
                <li>
                  <strong>Specific topics to review:</strong>{" "}
                  {weakStandards.join(", ")}
                </li>
              )}
            </ul>
          </div>
        )}

        {weakAreas.length === 0 && (
          <div
            style={{
              background: "#e8f5e9",
              border: "1px solid #a5d6a7",
              borderRadius: 8,
              padding: "20px 24px",
              marginTop: 24,
            }}
          >
            <h3 style={{ color: "#2e7d32", margin: "0 0 8px" }}>
              Great Job!
            </h3>
            <p style={{ margin: 0, lineHeight: 1.5 }}>
              You scored well across all categories. Keep practicing to stay
              sharp!
            </p>
          </div>
        )}

        {/* Question-by-question review */}
        <h2 style={{ fontSize: 18, marginTop: 32, marginBottom: 16 }}>
          Question Review
        </h2>
        {results.map((r, i) => (
          <div key={r.question.id} className="question-review">
            <div
              className="question-review-header"
              onClick={() => toggleQuestion(r.question.id)}
            >
              <span>
                <strong>Q{i + 1}.</strong>{" "}
                {r.question.questionText.slice(0, 80)}
                {r.question.questionText.length > 80 ? "..." : ""}
              </span>
              <span>
                {r.isCorrect ? (
                  <span className="correct-badge">Correct</span>
                ) : (
                  <span className="incorrect-badge">Incorrect</span>
                )}
              </span>
            </div>
            {expandedQ.has(r.question.id) && (
              <div className="question-review-body">
                <p>
                  <strong>Question:</strong> {r.question.questionText}
                </p>
                <p>
                  <strong>Your answer:</strong>{" "}
                  {Array.isArray(r.userAnswer)
                    ? r.userAnswer.join(", ") || "(no answer)"
                    : r.userAnswer || "(no answer)"}
                </p>
                <p>
                  <strong>Correct answer:</strong>{" "}
                  {Array.isArray(r.question.correctAnswer)
                    ? r.question.correctAnswer.join(", ")
                    : r.question.correctAnswer}
                </p>
                {r.question.evidenceStatement && (
                  <p style={{ color: "#666", fontSize: 13 }}>
                    <strong>Skill tested:</strong>{" "}
                    {r.question.evidenceStatement}
                  </p>
                )}
                <p style={{ color: "#666", fontSize: 13 }}>
                  <strong>Standard:</strong> {r.question.standard} |{" "}
                  <strong>Claim:</strong>{" "}
                  {claimLabels[r.question.claim] || r.question.claim}
                  {r.question.domain && testData.subject === "math" && (
                    <>
                      {" "}
                      | <strong>Domain:</strong>{" "}
                      {mathDomains[r.question.domain] || r.question.domain}
                    </>
                  )}
                </p>
              </div>
            )}
          </div>
        ))}

        {/* Actions */}
        <div style={{ marginTop: 32, textAlign: "center" }}>
          <button className="retake-btn" onClick={() => router.push("/")}>
            Take Another Test
          </button>
        </div>
      </div>
    </div>
  );
}
