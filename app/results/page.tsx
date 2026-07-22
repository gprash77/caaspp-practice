"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  fetchQuestions,
  mathClaims,
  elaClaims,
  mathDomains,
  type Question,
} from "@/lib/questions";
import { isManuallyScored, type ScoreResult } from "@/lib/scoring";
import { getAssessmentManifest } from "@/lib/assessment-manifest";
import { computeQuestionBankHash } from "@/lib/bank-identity";
import { getElaPtFlow } from "@/lib/assessment-flow";
import { resultStorageKey, type AttemptRecord, type SubmittedResultRecord } from "@/lib/attempt-records";
import {
  createManualScore,
  getManualRubric,
  type ManualRubricDefinition,
  type ManualScoreRecord,
  type ScorerRole,
} from "@/lib/manual-rubrics";

interface QuestionResult {
  question: Question;
  userAnswer: string | string[];
  isCorrect: boolean;
  score: ScoreResult;
  manualScore?: ManualScoreRecord;
}

function scoreFromManual(question: Question, manualScore?: ManualScoreRecord): ScoreResult {
  if (!manualScore) return { earnedPoints: 0, maxPoints: question.points, status: "manual" };
  return {
    earnedPoints: manualScore.awardedPoints,
    maxPoints: question.points,
    status: manualScore.awardedPoints === question.points
      ? "correct"
      : manualScore.awardedPoints > 0
        ? "partial"
        : "incorrect",
  };
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
  if (
    !normalized ||
    normalized === "responses will vary. see rubric." ||
    normalized.startsWith("see the two-point")
  ) {
    return null;
  }

  return answer;
}

function isPlaceholderExplanation(explanation?: string): boolean {
  if (!explanation) return true;
  return explanation.trim().toLowerCase() === "see the rubric for scoring guidance.";
}

function labelToText(
  label: string,
  options?: { label: string; text: string }[]
): string {
  const option = options?.find((entry) => entry.label === label);
  return option ? `${label}: ${option.text}` : label;
}

function getAutoScoredFallbackExplanation(question: Question): string | null {
  if (question.type === "multiple-choice" && typeof question.correctAnswer === "string") {
    return `The correct answer is ${labelToText(question.correctAnswer, question.options)}.`;
  }

  if (question.type === "multi-select" && Array.isArray(question.correctAnswer)) {
    const answers = question.correctAnswer.map((label) => labelToText(label, question.options));
    return `The correct answers are ${answers.join("; ")}.`;
  }

  if (question.type === "two-part" && Array.isArray(question.correctAnswer)) {
    const [partA, partB] = question.correctAnswer;
    return `Part A: ${labelToText(partA, question.partAOptions)}. Part B: ${labelToText(partB, question.partBOptions)}.`;
  }

  if (question.type === "grid-match" && Array.isArray(question.correctAnswer) && question.gridRows && question.gridColumns) {
    const mappings = question.correctAnswer.map((entry) => {
      const [rowIndex, colIndex] = entry.split(":").map(Number);
      const row = question.gridRows?.[rowIndex] ?? `Row ${rowIndex + 1}`;
      const column = question.gridColumns?.[colIndex] ?? `Column ${colIndex + 1}`;
      return `${row} -> ${column}`;
    });
    return `The correct matches are: ${mappings.join("; ")}.`;
  }

  if (question.type === "text-input" && typeof question.correctAnswer === "string") {
    return `The correct answer is ${question.correctAnswer}.`;
  }

  if (question.type === "table-input" && Array.isArray(question.correctAnswer)) {
    return `One valid response is ${question.correctAnswer.join(", ")}.`;
  }

  if (question.type === "fraction-model" && Array.isArray(question.correctAnswer)) {
    return `The correct model response is ${question.correctAnswer.join(", ")}.`;
  }

  if (question.type === "shade-grid" && Array.isArray(question.correctAnswer)) {
    return `One valid shaded pattern is ${question.correctAnswer.join(", ")}.`;
  }

  if (question.type === "line-plot" && Array.isArray(question.correctAnswer)) {
    return `One valid line plot is ${question.correctAnswer.join(", ")}.`;
  }

  return null;
}

function getPerformanceLevel(pct: number): { label: string; color: string; className: string } {
  if (pct >= 80) return { label: "Above Standard", color: "#2e7d32", className: "good" };
  if (pct >= 50) return { label: "Near Standard", color: "#f57c00", className: "needs-work" };
  return { label: "Below Standard", color: "#c62828", className: "struggling" };
}

function ManualRubricForm({
  rubric,
  existing,
  onSave,
}: {
  rubric: ManualRubricDefinition;
  existing?: ManualScoreRecord;
  onSave: (record: ManualScoreRecord) => void;
}) {
  const [scorerName, setScorerName] = useState(existing?.scorerName ?? "");
  const [scorerRole, setScorerRole] = useState<ScorerRole>(existing?.scorerRole ?? "parent");
  const [scoredAt, setScoredAt] = useState(
    existing?.scoredAt ? existing.scoredAt.slice(0, 10) : new Date().toISOString().slice(0, 10)
  );
  const [comments, setComments] = useState(existing?.comments ?? "");
  const [noScore, setNoScore] = useState(existing?.noScore ?? false);
  const [awardedPoints, setAwardedPoints] = useState(String(existing?.awardedPoints ?? 0));
  const [traits, setTraits] = useState<Record<string, string>>(
    rubric.kind === "traits"
      ? Object.fromEntries(rubric.traits.map((trait) => [trait.id, String(existing?.traits?.[trait.id] ?? 0)]))
      : {}
  );
  const [errors, setErrors] = useState<string[]>([]);

  return (
    <div style={{ borderTop: "1px solid #ffe082", marginTop: 14, paddingTop: 14 }}>
      <h4 style={{ margin: "0 0 12px" }}>Enter Manual Score</h4>
      {rubric.kind === "points" ? (
        <label style={{ display: "block", marginBottom: 10 }}>
          Awarded points (0–{rubric.maxPoints})
          <input
            aria-label="Awarded points"
            type="number"
            min={0}
            max={rubric.maxPoints}
            value={awardedPoints}
            disabled={noScore}
            onChange={(event) => setAwardedPoints(event.target.value)}
          />
        </label>
      ) : (
        rubric.traits.map((trait) => (
          <label key={trait.id} style={{ display: "block", marginBottom: 10 }}>
            {trait.label} ({trait.min}–{trait.max})
            <input
              aria-label={trait.label}
              type="number"
              min={trait.min}
              max={trait.max}
              value={traits[trait.id]}
              disabled={noScore}
              onChange={(event) => setTraits((current) => ({ ...current, [trait.id]: event.target.value }))}
            />
          </label>
        ))
      )}
      <label style={{ display: "block", marginBottom: 10 }}>
        <input type="checkbox" checked={noScore} onChange={(event) => setNoScore(event.target.checked)} />
        {" "}NS — insufficient, off-topic/off-purpose, copied, or not in English
      </label>
      <label style={{ display: "block", marginBottom: 10 }}>
        Scorer name
        <input aria-label="Scorer name" value={scorerName} onChange={(event) => setScorerName(event.target.value)} />
      </label>
      <label style={{ display: "block", marginBottom: 10 }}>
        Scorer role
        <select aria-label="Scorer role" value={scorerRole} onChange={(event) => setScorerRole(event.target.value as ScorerRole)}>
          <option value="parent">Parent</option>
          <option value="teacher">Teacher</option>
          <option value="other">Other</option>
        </select>
      </label>
      <label style={{ display: "block", marginBottom: 10 }}>
        Scoring date
        <input aria-label="Scoring date" type="date" value={scoredAt} onChange={(event) => setScoredAt(event.target.value)} />
      </label>
      <label style={{ display: "block", marginBottom: 10 }}>
        Comments (optional)
        <textarea aria-label="Scoring comments" value={comments} onChange={(event) => setComments(event.target.value)} rows={3} />
      </label>
      {errors.length > 0 && <ul role="alert">{errors.map((error) => <li key={error}>{error}</li>)}</ul>}
      <button
        className="retake-btn"
        onClick={() => {
          const outcome = createManualScore(rubric, {
            awardedPoints: Number(awardedPoints),
            traits: Object.fromEntries(Object.entries(traits).map(([key, value]) => [key, Number(value)])),
            noScore,
            scorerName,
            scorerRole,
            scoredAt,
            comments,
          });
          setErrors(outcome.errors);
          if (outcome.record) onSave(outcome.record);
        }}
      >
        SAVE MANUAL SCORE
      </button>
    </div>
  );
}

function ResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const attemptId = searchParams.get("attempt");
  const [loadedResults, setLoadedResults] = useState<{
    record: SubmittedResultRecord;
    testData: AttemptRecord;
    results: QuestionResult[];
  } | null>(null);
  const [expandedQ, setExpandedQ] = useState<Set<number>>(new Set());
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!attemptId) {
      Promise.resolve().then(() => setLoadError("This results link is missing its attempt ID."));
      return;
    }
    const stored = localStorage.getItem(resultStorageKey(attemptId));
    if (!stored) {
      Promise.resolve().then(() => setLoadError("No saved results were found for this attempt."));
      return;
    }
    let record: SubmittedResultRecord;
    try {
      record = JSON.parse(stored) as SubmittedResultRecord;
    } catch {
      Promise.resolve().then(() => setLoadError("The saved results record is malformed."));
      return;
    }
    const data = record.attempt;
    fetchQuestions(data.grade, data.subject, data.testType, data.practiceTest).then(async (questions) => {
      const manifest = getAssessmentManifest(data.grade, data.practiceTest);
      const currentHash = questions.length > 0 ? await computeQuestionBankHash(questions) : "";
      if (
        !manifest ||
        manifest.bankVersion !== data.bankVersion ||
        manifest.responseSchemaVersion !== data.responseSchemaVersion ||
        currentHash !== data.bankHash
      ) {
        setLoadError("These results belong to a different test-bank or response-schema version. They were not rescored.");
        return;
      }
      const attemptedQuestions = questions.filter((question) => record.questionIds.includes(question.id));
      if (attemptedQuestions.length !== record.questionIds.length) {
        setLoadError("The exact attempted question bank is no longer available. These results were not rescored.");
        return;
      }
      const qResults: QuestionResult[] = attemptedQuestions.map((q) => {
        const manualScore = record.manualScores[q.id];
        const score = isManuallyScored(q)
          ? scoreFromManual(q, manualScore)
          : record.objectiveScores[q.id];
        if (!score) throw new Error(`Missing stored score for item ${q.id}.`);
        return {
          question: q,
          userAnswer: data.answers[q.id] || "",
          isCorrect: score.status === "correct",
          score,
          manualScore,
        };
      });
      setLoadedResults({
        record,
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
    }).catch(() => setLoadError("The saved result could not be verified."));
  }, [attemptId]);

  if (loadError) {
    return (
      <div style={{ maxWidth: 720, margin: "64px auto", padding: 32 }}>
        <h1>Results unavailable</h1>
        <p>{loadError}</p>
        <button className="retake-btn" onClick={() => router.push("/")}>Back to Home</button>
      </div>
    );
  }

  if (!loadedResults || loadedResults.results.length === 0) {
    return <div style={{ padding: 40, textAlign: "center" }}>Loading results...</div>;
  }

  const { record, testData, results } = loadedResults;

  const autoScoredResults = results.filter((r) => !isManuallyScored(r.question));
  const manualResults = results.filter((r) => isManuallyScored(r.question));
  const scoredManualResults = manualResults.filter((result) => result.manualScore);
  const unscoredManualResults = manualResults.filter((result) => !result.manualScore);
  const scoredResults = [...autoScoredResults, ...scoredManualResults];
  const totalCorrect = scoredResults.reduce((sum, entry) => sum + entry.score.earnedPoints, 0);
  const totalScoredPoints = scoredResults.reduce((sum, entry) => sum + entry.score.maxPoints, 0);
  const totalPct = totalScoredPoints > 0 ? Math.round((totalCorrect / totalScoredPoints) * 100) : 0;
  const overallLevel = getPerformanceLevel(totalPct);

  // Unscored manual tasks are excluded until a scorer explicitly awards points, including zero.
  const claimLabels = testData.subject === "math" ? mathClaims : elaClaims;
  const claimGroups: Record<number, QuestionResult[]> = {};
  scoredResults.forEach((r) => {
    const claim = r.question.claim;
    if (!claimGroups[claim]) claimGroups[claim] = [];
    claimGroups[claim].push(r);
  });

  // Identify areas to improve
  const weakAreas: string[] = [];
  Object.entries(claimGroups).forEach(([claimStr, qResults]) => {
    const claim = parseInt(claimStr);
    const correct = qResults.reduce((sum, entry) => sum + entry.score.earnedPoints, 0);
    const possible = qResults.reduce((sum, entry) => sum + entry.score.maxPoints, 0);
    const pct = Math.round((correct / possible) * 100);
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

  const getQuestionExplanation = (question: Question): string | null => {
    if (!isPlaceholderExplanation(question.explanation)) {
      return question.explanation ?? null;
    }

    return getAutoScoredFallbackExplanation(question);
  };

  const toggleQuestion = (id: number) => {
    const next = new Set(expandedQ);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpandedQ(next);
  };

  const saveManualScore = (questionId: number, manualScore: ManualScoreRecord) => {
    const nextRecord: SubmittedResultRecord = {
      ...record,
      manualScores: { ...record.manualScores, [questionId]: manualScore },
    };
    localStorage.setItem(resultStorageKey(record.attempt.attemptId), JSON.stringify(nextRecord));
    setLoadedResults((current) => current ? {
      ...current,
      record: nextRecord,
      results: current.results.map((entry) => entry.question.id === questionId
        ? {
            ...entry,
            manualScore,
            score: scoreFromManual(entry.question, manualScore),
            isCorrect: manualScore.awardedPoints === entry.question.points,
          }
        : entry),
    } : current);
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
              {totalCorrect}/{totalScoredPoints}
            </div>
            <div className="score-label">
              {unscoredManualResults.length > 0 ? "Points Scored So Far" : "Total Points"}
            </div>
          </div>
          <div className="score-card">
            <div className="score-value" style={{ color: overallLevel.color }}>
              {totalPct}%
            </div>
            <div className="score-label">{overallLevel.label}</div>
          </div>
        </div>
        {unscoredManualResults.length > 0 && (
          <div style={{
            background: "#e3f2fd",
            border: "1px solid #90caf9",
            borderRadius: 8,
            padding: "14px 20px",
            marginBottom: 24,
            fontSize: 14,
            lineHeight: 1.5,
          }}>
            <strong>Provisional result:</strong> {unscoredManualResults.length} response{unscoredManualResults.length > 1 ? "s" : ""} still require manual scoring by a parent or teacher. An unscored response is distinct from a response awarded zero points.
          </div>
        )}

        {/* Claim breakdown */}
        <h2 style={{ fontSize: 18, marginBottom: 16 }}>
          Score by Category (Claims)
        </h2>
        {Object.entries(claimGroups).map(([claimStr, qResults]) => {
          const claim = parseInt(claimStr);
          const correct = qResults.reduce((sum, entry) => sum + entry.score.earnedPoints, 0);
          const possible = qResults.reduce((sum, entry) => sum + entry.score.maxPoints, 0);
          const pct = Math.round((correct / possible) * 100);
          const level = getPerformanceLevel(pct);

          return (
            <div key={claim} className="claim-section">
              <div className="claim-header">
                <span className="claim-title">
                  {claimLabels[claim] || `Claim ${claim}`}
                </span>
                <span className={`claim-score ${level.className}`}>
                  {correct}/{possible} — {level.label}
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
          const manualRubric = getManualRubric(testData.grade, testData.practiceTest, r.question.id);
          const ptFlow = testData.subject === "ela" && testData.testType === "pt"
            ? getElaPtFlow(testData.grade, testData.practiceTest)
            : undefined;
          const taskLabel = ptFlow?.part1ItemIds.includes(r.question.id)
            ? `Part 1 — Research Task ${ptFlow.part1ItemIds.indexOf(r.question.id) + 1}`
            : ptFlow?.part2ItemIds.includes(r.question.id)
              ? "Part 2 — Full Write"
              : `Q${i + 1}`;
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
                  <strong>{taskLabel}.</strong>{" "}
                  {r.question.questionText
                    ? r.question.questionText.slice(0, 80) + (r.question.questionText.length > 80 ? "..." : "")
                    : "(Essay writing task)"}
                </span>
                <span>
                  {manual ? (
                    r.manualScore ? (
                      <span className="correct-badge">Manually Scored ({r.score.earnedPoints}/{r.score.maxPoints})</span>
                    ) : (
                      <span className="manual-badge">Needs Manual Scoring</span>
                    )
                  ) : r.score.status === "partial" ? (
                    <span className="manual-badge">Partial Credit ({r.score.earnedPoints}/{r.score.maxPoints})</span>
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
                  {!manual && getQuestionExplanation(r.question) && (
                    <div style={{
                      background: r.isCorrect ? "#e8f5e9" : "#fff3e0",
                      border: `1px solid ${r.isCorrect ? "#a5d6a7" : "#ffcc80"}`,
                      borderRadius: 6,
                      padding: "12px 16px",
                      marginTop: 8,
                      marginBottom: 8,
                    }}>
                      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#333" }}>
                        <strong>Explanation:</strong> {getQuestionExplanation(r.question)}
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
                      {manualRubric && (
                        <ManualRubricForm
                          rubric={manualRubric}
                          existing={r.manualScore}
                          onSave={(manualScore) => saveManualScore(r.question.id, manualScore)}
                        />
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

export default function ResultsPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, textAlign: "center" }}>Loading results...</div>}>
      <ResultsContent />
    </Suspense>
  );
}
