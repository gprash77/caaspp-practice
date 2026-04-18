"use client";

import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchQuestions, type Question } from "@/lib/questions";
import ReactMarkdown from "react-markdown";

function RichTextEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (editorRef.current && !isInitialized.current) {
      editorRef.current.innerText = value || "";
      isInitialized.current = true;
    }
  }, [value]);

  // Reset when switching questions (value becomes empty)
  useEffect(() => {
    if (editorRef.current && value === "" && isInitialized.current) {
      editorRef.current.innerText = "";
    }
  }, [value]);

  const execFormat = (cmd: string) => {
    document.execCommand(cmd, false);
  };

  return (
    <div className="rich-editor">
      <div className="rich-editor-toolbar">
        <button type="button" onClick={() => execFormat("bold")} title="Bold"><b>B</b></button>
        <button type="button" onClick={() => execFormat("italic")} title="Italic"><i>I</i></button>
        <button type="button" onClick={() => execFormat("underline")} title="Underline"><u>U</u></button>
        <button type="button" onClick={() => execFormat("strikeThrough")} title="Strikethrough"><s>S</s></button>
        <span className="toolbar-divider" />
        <button type="button" onClick={() => execFormat("insertUnorderedList")} title="Bullet list">•≡</button>
        <button type="button" onClick={() => execFormat("insertOrderedList")} title="Numbered list">1≡</button>
        <span className="toolbar-divider" />
        <button type="button" onClick={() => document.execCommand("cut")} title="Cut">✂</button>
        <button type="button" onClick={() => document.execCommand("copy")} title="Copy">⧉</button>
        <button type="button" onClick={() => document.execCommand("paste")} title="Paste">📋</button>
        <span className="toolbar-divider" />
        <button type="button" onClick={() => execFormat("undo")} title="Undo">↩</button>
        <button type="button" onClick={() => execFormat("redo")} title="Redo">↪</button>
      </div>
      <div
        ref={editorRef}
        className="rich-editor-body"
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => onChange((e.target as HTMLDivElement).innerText)}
      />
    </div>
  );
}

function GridMatch({
  rows,
  columns,
  value,
  onChange,
}: {
  rows: string[];
  columns: string[];
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const toggleCell = (rowIdx: number, colIdx: number) => {
    const key = `${rowIdx}:${colIdx}`;
    if (value.includes(key)) {
      onChange(value.filter((v) => v !== key));
    } else {
      onChange([...value, key]);
    }
  };

  return (
    <div className="grid-match">
      <table className="grid-match-table">
        <thead>
          <tr>
            <th></th>
            {columns.map((col, i) => (
              <th key={i}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              <td className="grid-match-label">{row}</td>
              {columns.map((_, ci) => {
                const key = `${ri}:${ci}`;
                const checked = value.includes(key);
                return (
                  <td key={ci} className="grid-match-cell">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleCell(ri, ci)}
                      className="grid-match-checkbox"
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

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

function LinePlot({
  labels,
  maxDots,
  value,
  onChange,
}: {
  labels: string[];
  maxDots: number;
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const toggleCell = (labelIndex: number, rowIndex: number) => {
    const key = `${labelIndex}:${rowIndex}`;
    if (value.includes(key)) {
      onChange(value.filter((item) => item !== key));
      return;
    }

    const inColumn = value.filter((item) => item.startsWith(`${labelIndex}:`));
    if (inColumn.length >= maxDots) return;
    onChange([...value, key]);
  };

  return (
    <div className="line-plot">
      <div className="line-plot-grid">
        {Array.from({ length: maxDots }).map((_, rowOffset) => {
          const rowIndex = maxDots - rowOffset;
          return (
            <div className="line-plot-row" key={rowIndex}>
              {labels.map((label, labelIndex) => {
                const key = `${labelIndex}:${rowIndex}`;
                const filled = value.includes(key);
                return (
                  <button
                    key={key}
                    type="button"
                    className={`line-plot-cell ${filled ? "filled" : ""}`}
                    onClick={() => toggleCell(labelIndex, rowIndex)}
                    aria-label={`Toggle plot mark for ${label}`}
                  >
                    {filled ? "X" : ""}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="line-plot-labels">
        {labels.map((label) => (
          <span key={label} className="line-plot-label">{label}</span>
        ))}
      </div>
    </div>
  );
}

function FractionModel({
  value,
  onChange,
  thirdsMax,
  fourthsMax,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  thirdsMax: number;
  fourthsMax: number;
}) {
  const [thirds = "0", fourths = "0", equal = "", comparison = ""] = value;
  const setValueAt = (index: number, next: string) => {
    const updated = [...value];
    updated[index] = next;
    while (updated.length < 4) updated.push("");
    onChange(updated);
  };

  const renderPieces = (count: number, active: number, kind: "thirds" | "fourths") => (
    <div className="fraction-piece-row">
      {Array.from({ length: count }).map((_, idx) => (
        <button
          key={`${kind}-${idx}`}
          type="button"
          className={`fraction-piece ${idx < active ? "active" : ""} ${kind}`}
          onClick={() => setValueAt(kind === "thirds" ? 0 : 1, String(idx + 1))}
        >
          {kind === "thirds" ? "1/3" : "1/4"}
        </button>
      ))}
    </div>
  );

  return (
    <div className="fraction-model">
      <div className="fraction-model-section">
        <div className="fraction-model-title">Part A: Click the correct number of 1/3 and 1/4 pieces.</div>
        {renderPieces(thirdsMax, Number(thirds || "0"), "thirds")}
        {renderPieces(fourthsMax, Number(fourths || "0"), "fourths")}
      </div>
      <div className="fraction-model-section">
        <div className="fraction-model-title">Part B: Is the number of 1/3 pieces greater than the number of 1/4 pieces?</div>
        <div className="fraction-model-actions">
          <button
            type="button"
            className={`fraction-chip ${equal === "yes" ? "active" : ""}`}
            onClick={() => setValueAt(2, "yes")}
          >
            Yes
          </button>
          <button
            type="button"
            className={`fraction-chip ${equal === "no" ? "active" : ""}`}
            onClick={() => setValueAt(2, "no")}
          >
            No
          </button>
          <button
            type="button"
            className={`fraction-chip symbol ${comparison === ">" ? "active" : ""}`}
            onClick={() => setValueAt(3, ">")}
          >
            &gt;
          </button>
          <button
            type="button"
            className={`fraction-chip symbol ${comparison === "<" ? "active" : ""}`}
            onClick={() => setValueAt(3, "<")}
          >
            &lt;
          </button>
          <button
            type="button"
            className={`fraction-chip symbol ${comparison === "=" ? "active" : ""}`}
            onClick={() => setValueAt(3, "=")}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}

function ShadeGrid({
  rows,
  cols,
  value,
  onChange,
}: {
  rows: number;
  cols: number;
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const toggleCell = (row: number, col: number) => {
    const key = `${row}:${col}`;
    if (value.includes(key)) {
      onChange(value.filter((item) => item !== key));
    } else {
      onChange([...value, key]);
    }
  };

  return (
    <div
      className="shade-grid"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(48px, 1fr))` }}
    >
      {Array.from({ length: rows * cols }).map((_, index) => {
        const row = Math.floor(index / cols);
        const col = index % cols;
        const key = `${row}:${col}`;
        return (
          <button
            key={key}
            type="button"
            className={`shade-grid-cell ${value.includes(key) ? "filled" : ""}`}
            onClick={() => toggleCell(row, col)}
            aria-label={`Toggle shaded cell ${index + 1}`}
          />
        );
      })}
    </div>
  );
}

function TableInput({
  columns,
  rowLabel,
  value,
  onChange,
}: {
  columns: string[];
  rowLabel: string;
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const normalized = Array.from({ length: columns.length }, (_, index) => value[index] ?? "");

  const updateCell = (index: number, next: string) => {
    const updated = [...normalized];
    updated[index] = next;
    onChange(updated);
  };

  return (
    <div className="table-input">
      <table className="table-input-table">
        <thead>
          <tr>
            <th></th>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="table-input-label">{rowLabel}</td>
            {columns.map((column, index) => (
              <td key={column} className="table-input-cell">
                <input
                  type="text"
                  inputMode="numeric"
                  value={normalized[index]}
                  onChange={(e) => updateCell(index, e.target.value)}
                  className="table-input-field"
                  aria-label={`${rowLabel} ${column}`}
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function StimulusTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: { label: string; values: (string | number)[] }[];
}) {
  return (
    <div className="stimulus-table">
      <table className="stimulus-table-table">
        <thead>
          <tr>
            <th>Class</th>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <td className="stimulus-table-label">{row.label}</td>
              {row.values.map((value, index) => (
                <td key={`${row.label}-${columns[index]}`}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TwoPartQuestion({
  partAPrompt,
  partAOptions,
  partBPrompt,
  partBOptions,
  value,
  onChange,
}: {
  partAPrompt: string;
  partAOptions: { label: string; text: string }[];
  partBPrompt: string;
  partBOptions: { label: string; text: string }[];
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const [partA = "", partB = ""] = value;

  const updatePart = (index: 0 | 1, label: string) => {
    const updated = [partA, partB];
    updated[index] = label;
    onChange(updated);
  };

  const renderOptions = (
    prompt: string,
    options: { label: string; text: string }[],
    selected: string,
    index: 0 | 1
  ) => (
    <div className="two-part-section">
      <div className="two-part-prompt">{prompt}</div>
      <div className="tds-options">
        {options.map((opt) => {
          const isSelected = selected === opt.label;
          return (
            <div
              key={`${index}-${opt.label}`}
              className={`tds-option ${isSelected ? "selected" : ""}`}
              onClick={() => updatePart(index, opt.label)}
            >
              <span className="tds-option-marker radio">
                {isSelected && <span className="marker-fill" />}
              </span>
              <span className="tds-option-label">{opt.label}</span>
              <span className="tds-option-text">{opt.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="two-part-question">
      {renderOptions(partAPrompt, partAOptions, partA, 0)}
      {renderOptions(partBPrompt, partBOptions, partB, 1)}
    </div>
  );
}

function isQuestionAnswered(question: Question, answer: string | string[] | undefined): boolean {
  if (Array.isArray(answer)) {
    if (question.type === "two-part") {
      return answer.length === 2 && answer.every((entry) => entry.trim() !== "");
    }

    if (question.type === "table-input") {
      return (
        answer.length === (question.tableColumns?.length ?? 0) &&
        answer.every((entry) => entry.trim() !== "")
      );
    }

    return answer.length > 0;
  }

  return answer !== undefined && answer !== "";
}

function TestContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const grade = parseInt(searchParams.get("grade") || "3");
  const subject = (searchParams.get("subject") || "math") as "math" | "ela";
  const testType = (searchParams.get("type") || "cat") as "cat" | "pt";
  const practiceTest = parseInt(searchParams.get("test") || "1");

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [showPassage, setShowPassage] = useState(true);
  const [lastPassageTitle, setLastPassageTitle] = useState<string | null>(null);
  const [showAttentionDialog, setShowAttentionDialog] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchQuestions(grade, subject, testType, practiceTest)
      .then(setQuestions)
      .finally(() => setLoading(false));
  }, [grade, subject, testType, practiceTest]);

  const current = questions[currentIndex];

  const handleOptionClick = useCallback(
    (label: string) => {
      if (!current) return;
      if (current.type === "multi-select") {
        setAnswers((prevAnswers) => {
          const prev = (prevAnswers[current.id] as string[]) || [];
          return {
            ...prevAnswers,
            [current.id]: prev.includes(label)
              ? prev.filter((l) => l !== label)
              : [...prev, label],
          };
        });
      } else {
        setAnswers((prevAnswers) => ({ ...prevAnswers, [current.id]: label }));
      }
    },
    [current]
  );

  const handleTextInput = useCallback(
    (value: string) => {
      if (!current) return;
      setAnswers((prevAnswers) => ({ ...prevAnswers, [current.id]: value }));
    },
    [current]
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
    const answered = isQuestionAnswered(current, a);
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
      return !isQuestionAnswered(q, a);
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
      practiceTest,
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

  if (loading) {
    return <div style={{ padding: 40, textAlign: "center" }}>Loading...</div>;
  }

  if (questions.length === 0) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <p style={{ fontSize: 18, marginBottom: 16 }}>
          No questions available for this test yet.
        </p>
        <button
          onClick={() => router.push("/")}
          style={{
            background: "#00529b",
            color: "white",
            border: "none",
            padding: "10px 28px",
            borderRadius: 4,
            fontSize: 15,
            cursor: "pointer",
          }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  const isAnswered = (id: number) => isQuestionAnswered(
    questions.find((q) => q.id === id) as Question,
    answers[id]
  );

  const answeredCount = questions.filter((q) => isAnswered(q.id)).length;
  const pctComplete = Math.round((answeredCount / questions.length) * 100);
  const subjectLabel = subject === "math" ? "MATH" : "ELA";
  const testTypeLabel = testType === "pt" ? "Performance Task" : "Practice Test";
  const hasPassage = Boolean(current.passage || current.studentDirections);

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
                  {current.studentDirections ? "Student Directions" : "Read the passage and answer the questions."}
                </div>
                <div className="tds-passage-body">
                  {current.studentDirections && (
                    <div className="tds-student-directions">
                      <ReactMarkdown>{current.studentDirections}</ReactMarkdown>
                    </div>
                  )}
                  {(current.passageTitle || current.passageAuthor) && (
                    <div className="tds-passage-meta">
                      {current.passageTitle && (
                        <h2 className="tds-passage-title">{current.passageTitle}</h2>
                      )}
                      {current.passageAuthor && (
                        <div className="tds-passage-author">{current.passageAuthor}</div>
                      )}
                    </div>
                  )}
                  {current.dataTable && (
                    <StimulusTable
                      columns={current.dataTable.columns}
                      rows={current.dataTable.rows}
                    />
                  )}
                  {current.passage && (
                    <ReactMarkdown>{current.passage}</ReactMarkdown>
                  )}
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
            current.type === "multi-select") &&
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

          {current.type === "two-part" &&
            current.partAPrompt &&
            current.partAOptions &&
            current.partBPrompt &&
            current.partBOptions && (
              <TwoPartQuestion
                partAPrompt={current.partAPrompt}
                partAOptions={current.partAOptions}
                partBPrompt={current.partBPrompt}
                partBOptions={current.partBOptions}
                value={(answers[current.id] as string[]) || []}
                onChange={(v) => setAnswers((prevAnswers) => ({ ...prevAnswers, [current.id]: v }))}
              />
            )}

          {/* Number pad for math text input; plain text box for ELA */}
          {current.type === "text-input" && subject !== "ela" && (
            <NumberPad
              value={(answers[current.id] as string) || ""}
              onChange={(v) => handleTextInput(v)}
            />
          )}
          {current.type === "text-input" && subject === "ela" && (
            <div className="short-answer">
              <textarea
                className="short-answer-input"
                value={(answers[current.id] as string) || ""}
                onChange={(e) => handleTextInput(e.target.value)}
                placeholder=""
                rows={4}
              />
            </div>
          )}

          {/* Short answer text box */}
          {current.type === "short-answer" && (
            <div className="short-answer">
              <textarea
                className="short-answer-input"
                value={(answers[current.id] as string) || ""}
                onChange={(e) => handleTextInput(e.target.value)}
                placeholder=""
                rows={6}
              />
            </div>
          )}

          {/* Grid match (source matching) */}
          {current.type === "grid-match" && current.gridRows && current.gridColumns && (
            <GridMatch
              rows={current.gridRows}
              columns={current.gridColumns}
              value={(answers[current.id] as string[]) || []}
              onChange={(v) => setAnswers((prevAnswers) => ({ ...prevAnswers, [current.id]: v }))}
            />
          )}

          {current.type === "table-input" && current.tableColumns && current.tableRowLabel && (
            <TableInput
              columns={current.tableColumns}
              rowLabel={current.tableRowLabel}
              value={(answers[current.id] as string[]) || []}
              onChange={(v) => setAnswers((prevAnswers) => ({ ...prevAnswers, [current.id]: v }))}
            />
          )}

          {current.type === "line-plot" && current.linePlotLabels && current.linePlotMaxDots && (
            <LinePlot
              labels={current.linePlotLabels}
              maxDots={current.linePlotMaxDots}
              value={(answers[current.id] as string[]) || []}
              onChange={(v) => setAnswers((prevAnswers) => ({ ...prevAnswers, [current.id]: v }))}
            />
          )}

          {current.type === "fraction-model" && current.fractionModel && (
            <FractionModel
              thirdsMax={current.fractionModel.thirdsMax}
              fourthsMax={current.fractionModel.fourthsMax}
              value={(answers[current.id] as string[]) || []}
              onChange={(v) => setAnswers((prevAnswers) => ({ ...prevAnswers, [current.id]: v }))}
            />
          )}

          {current.type === "shade-grid" && current.shadeGrid && (
            <ShadeGrid
              rows={current.shadeGrid.rows}
              cols={current.shadeGrid.cols}
              value={(answers[current.id] as string[]) || []}
              onChange={(v) => setAnswers((prevAnswers) => ({ ...prevAnswers, [current.id]: v }))}
            />
          )}

          {/* Extended writing with rich text editor */}
          {current.type === "extended-writing" && (
            <div className="extended-writing">
              <RichTextEditor
                value={(answers[current.id] as string) || ""}
                onChange={(v) => handleTextInput(v)}
              />
            </div>
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
