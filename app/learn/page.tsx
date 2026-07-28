"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import {
  grade4AlignedLessons,
  learnCoverage,
  lessonsForSubject,
  sfusdPriorityLabels,
  type LearnDifficulty,
} from "@/lib/grade4-learn-aligned";
import type { LearnSubject } from "@/lib/grade4-learn";

import styles from "./learn.module.css";

const STORAGE_KEY = "caaspp-learn:grade4:v2";

interface StoredLearnProgress {
  answers: Record<string, number | string>;
  reviewedWritten: string[];
}

const difficultyLabel: Record<LearnDifficulty, string> = {
  foundation: "Foundation",
  core: "Core",
  challenge: "Challenge",
};

export default function LearnPage() {
  const [subject, setSubject] = useState<LearnSubject>("math");
  const [domain, setDomain] = useState("all");
  const [selectedLessonId, setSelectedLessonId] = useState(lessonsForSubject("math")[0].id);
  const [answers, setAnswers] = useState<Record<string, number | string>>({});
  const [reviewedWritten, setReviewedWritten] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let parsed: StoredLearnProgress | undefined;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) parsed = JSON.parse(saved) as StoredLearnProgress;
    } catch {
      // A malformed local Learn record should not block the prep experience.
    }
    queueMicrotask(() => {
      if (parsed) {
        setAnswers(parsed.answers ?? {});
        setReviewedWritten(parsed.reviewedWritten ?? []);
      }
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const progress: StoredLearnProgress = { answers, reviewedWritten };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [answers, reviewedWritten, hydrated]);

  const subjectLessons = useMemo(() => lessonsForSubject(subject), [subject]);
  const domains = useMemo(
    () => Array.from(new Set(subjectLessons.map((lesson) => lesson.domain))),
    [subjectLessons]
  );
  const visibleLessons = domain === "all"
    ? subjectLessons
    : subjectLessons.filter((lesson) => lesson.domain === domain);
  const selectedLesson =
    grade4AlignedLessons.find((lesson) => lesson.id === selectedLessonId) ?? visibleLessons[0];
  const coverage = learnCoverage(subject);
  const answeredCount = subjectLessons
    .flatMap((lesson) => lesson.practice)
    .filter((question) => {
      const answer = answers[question.id];
      return question.type === "choice"
        ? typeof answer === "number"
        : typeof answer === "string" && answer.trim().length > 0;
    }).length;
  const completedLessons = subjectLessons.filter((lesson) =>
    lesson.practice.every((question) => {
      const answer = answers[question.id];
      return question.type === "choice"
        ? typeof answer === "number"
        : reviewedWritten.includes(question.id);
    })
  ).length;

  const selectSubject = (nextSubject: LearnSubject) => {
    setSubject(nextSubject);
    setDomain("all");
    setSelectedLessonId(lessonsForSubject(nextSubject)[0].id);
  };

  const selectDomain = (nextDomain: string) => {
    setDomain(nextDomain);
    const nextLesson = nextDomain === "all"
      ? subjectLessons[0]
      : subjectLessons.find((lesson) => lesson.domain === nextDomain);
    if (nextLesson) setSelectedLessonId(nextLesson.id);
  };

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Grade 4 Learn</p>
            <h1>California standards. SFUSD priorities. Real practice.</h1>
            <p>
              Build skills through original Math and English Language Arts lessons mapped to
              California Grade 4 standards and SFUSD&apos;s published Grade 4 learning priorities.
            </p>
          </div>
          <Link className={styles.homeLink} href="/">Back to practice tests</Link>
        </header>

        <div className={styles.notice} role="note">
          <strong>Independent preparation resource.</strong> Aligned to public California and SFUSD
          guidance; not endorsed by or affiliated with SFUSD. Learn is separate from assessment
          attempts and never reads active answers or reveals test-bank keys.
        </div>

        <section className={styles.dashboard} aria-label="Learn coverage and progress">
          <div className={styles.subjectTabs} role="group" aria-label="Choose a Learn subject">
            <button
              aria-pressed={subject === "math"}
              className={subject === "math" ? styles.subjectActive : ""}
              onClick={() => selectSubject("math")}
              type="button"
            >
              Math
            </button>
            <button
              aria-pressed={subject === "ela"}
              className={subject === "ela" ? styles.subjectActive : ""}
              onClick={() => selectSubject("ela")}
              type="button"
            >
              English Language Arts
            </button>
          </div>
          <div className={styles.stats}>
            <div><strong>{coverage.lessons}</strong><span>lessons</span></div>
            <div><strong>{coverage.practiceTasks}</strong><span>practice tasks</span></div>
            <div><strong>{coverage.standards}</strong><span>standards mapped</span></div>
            <div><strong>{completedLessons}/{coverage.lessons}</strong><span>lessons complete</span></div>
          </div>
          <div className={styles.progressRow}>
            <span>{answeredCount} of {coverage.practiceTasks} tasks attempted</span>
            <progress max={coverage.practiceTasks} value={answeredCount} />
          </div>
        </section>

        <div className={styles.layout}>
          <nav className={styles.nav} aria-label="Grade 4 lessons">
            <label className={styles.domainFilter}>
              <span>Filter by domain</span>
              <select value={domain} onChange={(event) => selectDomain(event.target.value)}>
                <option value="all">All {subject === "math" ? "Math" : "ELA"} domains</option>
                {domains.map((domainName) => (
                  <option key={domainName} value={domainName}>{domainName}</option>
                ))}
              </select>
            </label>
            <p className={styles.subjectLabel}>
              {subject === "math" ? "Math lessons" : "English Language Arts lessons"}
            </p>
            {visibleLessons.map((lesson) => {
              const attempted = lesson.practice.filter((question) => {
                const answer = answers[question.id];
                return typeof answer === "number" || (typeof answer === "string" && answer.trim());
              }).length;
              return (
                <button
                  className={`${styles.lessonButton} ${lesson.id === selectedLesson.id ? styles.lessonButtonActive : ""}`}
                  key={lesson.id}
                  onClick={() => setSelectedLessonId(lesson.id)}
                  type="button"
                >
                  <span>{lesson.title}</span>
                  <small>{attempted}/{lesson.practice.length}</small>
                </button>
              );
            })}
          </nav>

          <article className={styles.lesson} data-testid="learn-lesson">
            <div className={styles.tagGroup}>
              <div className={styles.standards} aria-label="California standards">
                {selectedLesson.standards.map((standard) => (
                  <span className={styles.standard} key={standard}>{standard}</span>
                ))}
              </div>
              <div className={styles.sfusdTags} aria-label="SFUSD priorities">
                {selectedLesson.sfusdPriorities.map((priority) => (
                  <span className={styles.sfusdTag} key={priority}>
                    {sfusdPriorityLabels[priority as keyof typeof sfusdPriorityLabels]}
                  </span>
                ))}
              </div>
            </div>
            <p className={styles.domainName}>{selectedLesson.domain}</p>
            <h2>{selectedLesson.title}</h2>
            <p className={styles.summary}>{selectedLesson.summary}</p>

            <h3>What to know</h3>
            <ul className={styles.learnPoints}>
              {selectedLesson.learn.map((point) => <li key={point}>{point}</li>)}
            </ul>

            <section className={styles.example}>
              <h3>Worked example</h3>
              <p><strong>{selectedLesson.workedExample.prompt}</strong></p>
              <ol>
                {selectedLesson.workedExample.steps.map((step) => <li key={step}>{step}</li>)}
              </ol>
              <p className={styles.conclusion}>{selectedLesson.workedExample.conclusion}</p>
            </section>

            <section className={styles.practice}>
              <h3>Practice</h3>
              <p className={styles.practiceIntro}>
                Move from Foundation to Challenge. Written tasks reveal guidance only after you
                draft your own response.
              </p>
              {selectedLesson.practice.map((question, questionIndex) => {
                const answer = answers[question.id];
                const reviewed = reviewedWritten.includes(question.id);
                return (
                  <div className={styles.question} key={question.id}>
                    <div className={styles.questionHeading}>
                      <p className={styles.questionPrompt}>
                        {questionIndex + 1}. {question.prompt}
                      </p>
                      <span className={`${styles.difficulty} ${styles[question.difficulty]}`}>
                        {difficultyLabel[question.difficulty]}
                      </span>
                    </div>
                    <p className={styles.questionStandard}>{question.standard}</p>

                    {question.type === "choice" ? (
                      <>
                        <div className={styles.options}>
                          {question.options.map((option, optionIndex) => (
                            <button
                              aria-pressed={answer === optionIndex}
                              className={styles.option}
                              key={option}
                              onClick={() => setAnswers((current) => ({
                                ...current,
                                [question.id]: optionIndex,
                              }))}
                              type="button"
                            >
                              <strong>{String.fromCharCode(65 + optionIndex)}.</strong> {option}
                            </button>
                          ))}
                        </div>
                        {typeof answer === "number" && (
                          <p
                            className={`${styles.feedback} ${answer === question.correctIndex ? styles.correct : styles.incorrect}`}
                            role="status"
                          >
                            <strong>{answer === question.correctIndex ? "Correct." : "Not yet."}</strong>{" "}
                            {question.explanation}
                          </p>
                        )}
                      </>
                    ) : (
                      <div className={styles.writtenPractice}>
                        <textarea
                          aria-label={`Response to practice task ${questionIndex + 1}`}
                          onChange={(event) => setAnswers((current) => ({
                            ...current,
                            [question.id]: event.target.value,
                          }))}
                          placeholder="Draft your response before reviewing the guidance."
                          rows={5}
                          value={typeof answer === "string" ? answer : ""}
                        />
                        <button
                          disabled={typeof answer !== "string" || answer.trim().length < 10}
                          onClick={() => setReviewedWritten((current) =>
                            current.includes(question.id) ? current : [...current, question.id]
                          )}
                          type="button"
                        >
                          Review my response
                        </button>
                        {reviewed && (
                          <div className={styles.guidance} role="status">
                            <h4>Check your response</h4>
                            <ul>{question.reviewCriteria.map((criterion) => <li key={criterion}>{criterion}</li>)}</ul>
                            <p><strong>One strong model:</strong> {question.modelResponse}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </section>
          </article>
        </div>
      </div>
    </main>
  );
}
