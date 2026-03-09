"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getQuestions, type Question } from "@/lib/questions";
import ReactMarkdown from "react-markdown";

function NumberPad({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const handleKey = (key: string) => {
    if (key === "del") {
      onChange(value.slice(0, -1));
    } else if (key === "←") {
      // cursor left - no-op for simple input
    } else if (key === "→") {
      // cursor right - no-op for simple input
    } else {
      onChange(value + key);
    }
  };

  return (
    <div className="number-pad">
      <div className="number-pad-display">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="number-pad-input"
        />
      </div>
      <div className="number-pad-controls">
        <button onClick={() => handleKey("←")} className="pad-control">←</button>
        <button onClick={() => handleKey("→")} className="pad-control">→</button>
        <button onClick={() => {}} className="pad-control">↩</button>
        <button onClick={() => {}} className="pad-control">↪</button>
        <button onClick={() => handleKey("del")} className="pad-control">⌫</button>
      </div>
      <div className="number-pad-keys">
        {["1","2","3","4","5","6","7","8","9","0",".","/"].map((k) => (
          <button key={k} className="pad-key" onClick={() => handleKey(k)}>{k === "/" ? "÷" : k}</button>
        ))}
      </div>
    </div>
  );
}

function TestContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const grade = parseInt(searchParams.get("grade") || "3");
  const subject = (searchParams.get("subject") || "math") as "math" | "ela";
  const testType = (searchParams.get("type") || "cat") as "cat" | "pt";

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [showPassage, setShowPassage] = useState(true);
  const [lastPassageTitle, setLastPassageTitle] = useState<string | null>(null);
  const [showAttentionDialog, setShowAttentionDialog] = useState(false);

  useEffect(() => {
    const q = getQuestions(grade, subject, testType);
    setQuestions(q);
  }, [grade, subject, testType]);

  const current = questions[currentIndex];

  const handleOptionClick = useCallback(
    (label: string) => {
      if (!current) return;
      if (current.type === "multi-select") {
        const prev = (answers[current.id] as string[]) || [];
        if (prev.includes(label)) {
          setAnswers({ ...answers, [current.id]: prev.filter((l) => l !== label) });
        } else {
          setAnswers({ ...answers, [current.id]: [...prev, label] });
        }
      } else {
        setAnswers({ ...answers, [current.id]: label });
      }
    },
    [current, answers]
  );

  const handleTextInput = useCallback(
    (value: string) => {
      if (!current) return;
      setAnswers({ ...answers, [current.id]: value });
    },
    [current, answers]
  );

  const toggleFlag = useCallback(() => {
    if (!current) return;
    const newFlagged = new Set(flagged);
    if (newFlagged.has(current.id)) {
      newFlagged.delete(current.id);
    } else {
      newFlagged.add(current.id);
    }
    setFlagged(newFlagged);
  }, [current, flagged]);

  const goNext = useCallback(() => {
    if (!current) return;
    const a = answers[current.id];
    const answered = Array.isArray(a) ? a.length > 0 : a !== undefined && a !== "";
    if (!answered) {
      setShowAttentionDialog(true);
      return;
    }
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, questions.length, current, answers]);

  const goBack = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);

  const handleSubmit = useCallback(() => {
    const unanswered = questions.filter((q) => {
      const a = answers[q.id];
      if (Array.isArray(a)) return a.length === 0;
      return a === undefined || a === "";
    });
    if (unanswered.length > 0) {
      if (!confirm(`You have ${unanswered.length} unanswered question(s). Submit anyway?`)) {
        return;
      }
    }
    const data = {
      grade,
      subject,
      testType,
      answers,
      questionIds: questions.map((q) => q.id),
    };
    sessionStorage.setItem("testResults", JSON.stringify(data));
    router.push("/results");
  }, [grade, subject, testType, answers, questions, router]);

  useEffect(() => {
    if (current?.passageTitle && current.passageTitle !== lastPassageTitle) {
      setShowPassage(true);
      setLastPassageTitle(current.passageTitle);
    }
  }, [current, lastPassageTitle]);

  if (questions.length === 0) {
    return <div style={{ padding: 40, textAlign: "center" }}>Loading...</div>;
  }

  const isAnswered = (id: number) => {
    const a = answers[id];
    if (Array.isArray(a)) return a.length > 0;
    return a !== undefined && a !== "";
  };

  const answeredCount = questions.filter((q) => isAnswered(q.id)).length;
  const pctComplete = Math.round((answeredCount / questions.length) * 100);
  const subjectLabel = subject === "math" ? "MATH" : "ELA";
  const testTypeLabel = testType === "pt" ? "Performance Task" : "Practice Test";
  const hasPassage = subject === "ela" && current.passage;

  return (
    <div className="tds-wrapper">
      {/* Row 1: Top info bar */}
      <div className="tds-info-bar">
        <button className="tds-questions-btn" onClick={() => {
          const el = document.querySelector(".tds-question-nav");
          if (el) el.classList.toggle("expanded");
        }}>
          Questions ▾
        </button>
        <div className="tds-progress-bar">
          <div className="tds-progress-fill" style={{ width: `${pctComplete}%` }} />
        </div>
        <span className="tds-progress-text">
          {pctComplete}% Grade {grade} {subjectLabel} {testTypeLabel}
        </span>
        <span className="tds-session-label">GUEST SESSION</span>
        <button className="tds-help-icon" onClick={() => alert(
          "Test Navigation:\n\n" +
          "← Back: Go to the previous question\n" +
          "→ Next: Go to the next question\n" +
          "💾 Save: Save your progress\n" +
          "⏸ Pause: Take a break\n\n" +
          "Click question numbers to jump to any question.\n" +
          "You must answer each question before moving on."
        )} title="Help">?</button>
      </div>

      {/* Row 2: Navigation toolbar with icons */}
      <div className="tds-toolbar">
        <div className="tds-toolbar-left">
          <button
            className="tds-nav-icon"
            disabled={currentIndex === 0}
            onClick={goBack}
            title="Back"
          >
            <svg viewBox="0 0 24 24" width="22" height="22"><circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M14 8l-4 4 4 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span className="tds-icon-label">Back</span>
          </button>
          <button
            className="tds-nav-icon"
            onClick={currentIndex < questions.length - 1 ? goNext : handleSubmit}
            title={currentIndex < questions.length - 1 ? "Next" : "Submit"}
          >
            <svg viewBox="0 0 24 24" width="22" height="22"><circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M10 8l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span className="tds-icon-label">Next</span>
          </button>
          <button
            className={`tds-nav-icon ${flagged.has(current.id) ? "active-flag" : ""}`}
            onClick={toggleFlag}
            title="Flag for Review"
          >
            <svg viewBox="0 0 24 24" width="22" height="22"><rect x="3" y="2" width="18" height="20" rx="2" fill={flagged.has(current.id) ? "#f57c00" : "#4a90d9"} /><path d="M7 6h10M7 10h10M7 14h6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <span className="tds-icon-label">Save</span>
          </button>
          <button
            className="tds-nav-icon"
            onClick={() => {
              if (confirm("Are you sure you want to pause the test?")) {
                router.push("/");
              }
            }}
            title="Pause"
          >
            <svg viewBox="0 0 24 24" width="22" height="22"><circle cx="12" cy="12" r="11" fill="#f57c00"/><rect x="8" y="7" width="3" height="10" rx="1" fill="white"/><rect x="13" y="7" width="3" height="10" rx="1" fill="white"/></svg>
            <span className="tds-icon-label">Pause</span>
          </button>
        </div>
        <div className="tds-toolbar-right">
          <button className="tds-tool-icon" title="Line Reader">
            <svg viewBox="0 0 24 24" width="20" height="20"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="6" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="2"/></svg>
            <span className="tds-icon-label">Line Reader</span>
          </button>
          <button className="tds-tool-icon" title="Zoom Out">
            <svg viewBox="0 0 24 24" width="20" height="20"><circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="15" y1="15" x2="21" y2="21" stroke="currentColor" strokeWidth="2"/><line x1="7" y1="10" x2="13" y2="10" stroke="currentColor" strokeWidth="2"/></svg>
            <span className="tds-icon-label">Zoom Out</span>
          </button>
          <button className="tds-tool-icon" title="Zoom In">
            <svg viewBox="0 0 24 24" width="20" height="20"><circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="15" y1="15" x2="21" y2="21" stroke="currentColor" strokeWidth="2"/><line x1="7" y1="10" x2="13" y2="10" stroke="currentColor" strokeWidth="2"/><line x1="10" y1="7" x2="10" y2="13" stroke="currentColor" strokeWidth="2"/></svg>
            <span className="tds-icon-label">Zoom In</span>
          </button>
        </div>
      </div>

      {/* Row 3: Question progress dots */}
      <div className="tds-progress-dots">
        {questions.map((q, i) => (
          <div
            key={q.id}
            className={`tds-dot ${i === currentIndex ? "current" : ""} ${
              isAnswered(q.id) && i !== currentIndex ? "answered" : ""
            } ${flagged.has(q.id) ? "flagged" : ""}`}
            onClick={() => setCurrentIndex(i)}
            title={`Question ${i + 1}`}
          />
        ))}
      </div>

      {/* Main content area */}
      <div className={`tds-content ${hasPassage ? "split-view" : ""}`}>
        {/* ELA: passage on the left */}
        {hasPassage && (
          <div className="tds-passage-panel">
            {showPassage && (
              <>
                <div className="tds-passage-header">
                  Read the passage and answer the questions.
                </div>
                <div className="tds-passage-body">
                  <ReactMarkdown>{current.passage!}</ReactMarkdown>
                </div>
              </>
            )}
            <button
              className="tds-passage-toggle"
              onClick={() => setShowPassage(!showPassage)}
            >
              {showPassage ? "← →" : "← →"}
            </button>
          </div>
        )}

        {/* Question panel */}
        <div className="tds-question-panel">
          {/* Question number boxes (top of question panel for ELA) */}
          {hasPassage && (
            <div className="tds-question-numbers">
              {questions.map((q, i) => (
                <button
                  key={q.id}
                  className={`tds-q-num ${i === currentIndex ? "current" : ""} ${
                    isAnswered(q.id) && i !== currentIndex ? "answered" : ""
                  }`}
                  onClick={() => setCurrentIndex(i)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}

          {/* Question number badge */}
          <div className="tds-q-badge-row">
            <div className="tds-q-badge">{currentIndex + 1}</div>
            {!hasPassage && (
              <div className="tds-q-progress-line">
                <div className="tds-q-line-fill" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
              </div>
            )}
            <button className="tds-menu-icon" title="Options">≡</button>
          </div>
          <div className="tds-guest-label">GUEST</div>

          {/* Question text */}
          <div className="tds-question-text">
            {current.questionText}
            {current.type === "multi-select" && (
              <span style={{ color: "#c62828", display: "block", marginTop: 4, fontSize: 14 }}>
                (Select all that apply)
              </span>
            )}
          </div>

          {/* Answer options */}
          {(current.type === "multiple-choice" ||
            current.type === "multi-select" ||
            current.type === "two-part") &&
            current.options && (
              <div className="tds-options">
                {current.options.map((opt) => {
                  const currentAnswer = answers[current.id];
                  const isSelected = Array.isArray(currentAnswer)
                    ? currentAnswer.includes(opt.label)
                    : currentAnswer === opt.label;
                  const isMulti = current.type === "multi-select";

                  return (
                    <div
                      key={opt.label}
                      className={`tds-option ${isSelected ? "selected" : ""}`}
                      onClick={() => handleOptionClick(opt.label)}
                    >
                      <span className={`tds-option-marker ${isMulti ? "checkbox" : "radio"}`}>
                        {isSelected && !isMulti && <span className="marker-fill" />}
                        {isSelected && isMulti && <span className="marker-check">✓</span>}
                      </span>
                      <span className="tds-option-label">{opt.label}</span>
                      <span className="tds-option-text">{opt.text}</span>
                    </div>
                  );
                })}
              </div>
            )}

          {/* Number pad for text input */}
          {current.type === "text-input" && (
            <NumberPad
              value={(answers[current.id] as string) || ""}
              onChange={(v) => handleTextInput(v)}
            />
          )}
        </div>
      </div>

      {/* Submit button at bottom for last question */}
      {currentIndex === questions.length - 1 && (
        <div className="tds-submit-bar">
          <button className="tds-submit-btn" onClick={handleSubmit}>
            SUBMIT TEST
          </button>
        </div>
      )}

      {/* Attention dialog - must answer before proceeding */}
      {showAttentionDialog && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.45)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
        }}>
          <div style={{
            background: "white",
            borderRadius: 4,
            boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
            display: "flex",
            maxWidth: 440,
            width: "90%",
            overflow: "hidden",
          }}>
            <div style={{
              background: "#00529b",
              width: 80,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}>
              <svg viewBox="0 0 24 24" width="36" height="36" fill="white">
                <path d="M12 2C10.34 2 9 3.34 9 5v1.07C6.16 7.11 4 9.79 4 13v4l-2 2v1h20v-1l-2-2v-4c0-3.21-2.16-5.89-5-6.93V5c0-1.66-1.34-3-3-3zm0 20c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z"/>
              </svg>
            </div>
            <div style={{ padding: "20px 24px", flex: 1 }}>
              <h3 style={{ margin: "0 0 10px", fontSize: 17, fontWeight: 700, color: "#222" }}>
                Attention
              </h3>
              <p style={{ margin: "0 0 8px", fontSize: 13, lineHeight: 1.6, color: "#444" }}>
                Please answer question {currentIndex + 1} before continuing
                to the next screen. You must answer all questions on this
                page before moving to the next page.
              </p>
              <p style={{ margin: "0 0 16px", fontSize: 11, color: "#999" }}>
                [MessageCode: 12109]
              </p>
              <div style={{ textAlign: "right" }}>
                <button
                  onClick={() => setShowAttentionDialog(false)}
                  style={{
                    background: "#00529b",
                    color: "white",
                    border: "none",
                    padding: "8px 36px",
                    borderRadius: 3,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TestPage() {
  return (
    <Suspense
      fallback={<div style={{ padding: 40, textAlign: "center" }}>Loading test...</div>}
    >
      <TestContent />
    </Suspense>
  );
}
