"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  fetchQuestions,
  mathClaims,
  elaClaims,
  mathDomains,
  type Question,
} from "@/lib/questions";
import { checkAnswer, isManuallyScored } from "@/lib/scoring";

interface TestData {
  grade: number;
  subject: "math" | "ela";
  testType?: "cat" | "pt";
  practiceTest?: number;
  answers: Record<number, string | string[]>;
  questionIds: number[];
}

interface QuestionResult {
  question: Question;
  userAnswer: string | string[];
  isCorrect: boolean;
}

function formatAnswer(answer: string | string[]): string {
  if (Array.isArray(answer)) {
    return answer.join(", ") || "(no answer)";
  }

  return answer || "(no answer)";
}

function getManualAnswerKey(question: Question): string | null {
  const answer = Array.isArray(question.correctAnswer)
    ? question.correctAnswer.join(", ")
    : question.correctAnswer;

  const normalized = answer.trim().toLowerCase();
  if (!normalized || normalized === "responses will vary. see rubric.") {
    return null;
  }

  return answer;
}

function getPerformanceLevel(pct: number): { label: string; color: string; className: string } {
  if (pct >= 80) return { label: "Above Standard", color: "#2e7d32", className: "good" };
  if (pct >= 50) return { label: "Near Standard", color: "#f57c00", className: "needs-work" };
  return { label: "Below Standard", color: "#c62828", className: "struggling" };
}

export default function ResultsPage() {
  const router = useRouter();
  const [loadedResults, setLoadedResults] = useState<{
    testData: TestData;
    results: QuestionResult[];
  } | null>(null);
  const [expandedQ, setExpandedQ] = useState<Set<number>>(new Set());

  useEffect(() => {
    const stored = sessionStorage.getItem("testResults");
    if (!stored) {
      router.push("/");
      return;
    }
    let data: TestData;
    try {
      data = JSON.parse(stored);
    } catch {
      router.push("/");
      return;
    }
    fetchQuestions(data.grade, data.subject, data.testType || "cat", data.practiceTest || 1).then((questions) => {
      const qResults: QuestionResult[] = questions.map((q) => ({
        question: q,
        userAnswer: data.answers[q.id] || "",
        isCorrect: checkAnswer(q, data.answers[q.id] || ""),
      }));
      setLoadedResults({
        testData: data,
        results: qResults,
      });
      setExpandedQ(
        new Set(
          qResults
            .filter((result) => isManuallyScored(result.question) || !result.isCorrect)
            .map((result) => result.question.id)
        )
      );
    });
  }, [router]);

  if (!loadedResults || loadedResults.results.length === 0) {
    return <div style={{ padding: 40, textAlign: "center" }}>Loading results...</div>;
  }

  const { testData, results } = loadedResults;

  const autoScoredResults = results.filter((r) => !isManuallyScored(r.question));
  const manualResults = results.filter((r) => isManuallyScored(r.question));
  const totalCorrect = autoScoredResults.filter((r) => r.isCorrect).length;
  const totalAutoQuestions = autoScoredResults.length;
  const totalPct = totalAutoQuestions > 0 ? Math.round((totalCorrect / totalAutoQuestions) * 100) : 0;
  const overallLevel = getPerformanceLevel(totalPct);

  // Group by claim (only auto-scored for claim percentages)
  const claimLabels = testData.subject === "math" ? mathClaims : elaClaims;
  const claimGroups: Record<number, QuestionResult[]> = {};
  autoScoredResults.forEach((r) => {
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
  autoScoredResults.forEach((r) => {
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
          Grade {testData.grade} {subjectLabel} — Practice Test {testData.practiceTest || 1}
        </p>
      </div>

      <div className="results-body">
        {/* Score summary */}
        <div className="score-summary">
          <div className="score-card">
            <div className="score-value">
              {totalCorrect}/{totalAutoQuestions}
            </div>
            <div className="score-label">Auto-Scored Questions Correct</div>
          </div>
          <div className="score-card">
            <div className="score-value" style={{ color: overallLevel.color }}>
              {totalPct}%
            </div>
            <div className="score-label">{overallLevel.label}</div>
          </div>
        </div>
        {manualResults.length > 0 && (
          <div style={{
            background: "#e3f2fd",
            border: "1px solid #90caf9",
            borderRadius: 8,
            padding: "14px 20px",
            marginBottom: 24,
            fontSize: 14,
            lineHeight: 1.5,
          }}>
            <strong>Note:</strong> {manualResults.length} question{manualResults.length > 1 ? "s" : ""} (short-answer and essay writing) require manual scoring by a parent or teacher. The question review below now opens those items with the scoring guide, expected answer details, and rationale visible inline.
          </div>
        )}

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
        {results.map((r, i) => {
          const manual = isManuallyScored(r.question);
          const hasAnswer = Array.isArray(r.userAnswer)
            ? r.userAnswer.length > 0
            : r.userAnswer !== undefined && r.userAnswer !== "";

          return (
            <div key={r.question.id} className="question-review">
              <div
                className="question-review-header"
                onClick={() => toggleQuestion(r.question.id)}
              >
                <span>
                  <strong>Q{i + 1}.</strong>{" "}
                  {r.question.questionText
                    ? r.question.questionText.slice(0, 80) + (r.question.questionText.length > 80 ? "..." : "")
                    : "(Essay writing task)"}
                </span>
                <span>
                  {manual ? (
                    <span className="manual-badge">Needs Manual Scoring</span>
                  ) : r.isCorrect ? (
                    <span className="correct-badge">Correct</span>
                  ) : (
                    <span className="incorrect-badge">Incorrect</span>
                  )}
                </span>
              </div>
              {expandedQ.has(r.question.id) && (
                <div className="question-review-body">
                  {r.question.questionText && (
                    <p>
                      <strong>Question:</strong> {r.question.questionText}
                    </p>
                  )}
                  <p>
                    <strong>Your answer:</strong>{" "}
                    <span style={{
                      color: manual ? "#333" : r.isCorrect ? "#2e7d32" : "#c62828",
                      fontWeight: 600,
                    }}>
                      {formatAnswer(r.userAnswer)}
                    </span>
                    {!manual && (
                      <span style={{ marginLeft: 8 }}>
                        {r.isCorrect ? "✓" : "✗"}
                      </span>
                    )}
                  </p>
                  {!manual && !r.isCorrect && (
                    <p>
                      <strong>Correct answer:</strong>{" "}
                      <span style={{ color: "#2e7d32", fontWeight: 600 }}>
                        {Array.isArray(r.question.correctAnswer)
                          ? r.question.correctAnswer.join(", ")
                          : r.question.correctAnswer}
                      </span>
                    </p>
                  )}
                  {manual && getManualAnswerKey(r.question) && (
                    <p>
                      <strong>Expected answer:</strong>{" "}
                      <span style={{ color: "#2e7d32", fontWeight: 600 }}>
                        {getManualAnswerKey(r.question)}
                      </span>
                    </p>
                  )}
                  {!manual && r.question.explanation && (
                    <div style={{
                      background: r.isCorrect ? "#e8f5e9" : "#fff3e0",
                      border: `1px solid ${r.isCorrect ? "#a5d6a7" : "#ffcc80"}`,
                      borderRadius: 6,
                      padding: "12px 16px",
                      marginTop: 8,
                      marginBottom: 8,
                    }}>
                      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#333" }}>
                        <strong>Explanation:</strong> {r.question.explanation}
                      </p>
                    </div>
                  )}
                  {manual && (
                    <div style={{
                      background: "#fff8e1",
                      border: "1px solid #ffe082",
                      borderRadius: 6,
                      padding: "12px 16px",
                      marginTop: 8,
                      marginBottom: 8,
                    }}>
                      <p style={{ margin: "0 0 8px", fontWeight: 600, color: "#e65100" }}>
                        Answer and Scoring Guide ({r.question.points} point{r.question.points > 1 ? "s" : ""}):
                      </p>
                      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "#555" }}>
                        {r.question.rubric}
                      </p>
                      {r.question.explanation && (
                        <p style={{ margin: "8px 0 0", fontSize: 13, lineHeight: 1.6, color: "#555" }}>
                          <strong>Rationale:</strong> {r.question.explanation}
                        </p>
                      )}
                      {!hasAnswer && (
                        <p style={{ margin: "8px 0 0", color: "#c62828", fontSize: 13 }}>
                          No response was provided for this question.
                        </p>
                      )}
                    </div>
                  )}
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
          );
        })}

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
