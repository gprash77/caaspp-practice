"use client";

import Link from "next/link";
import { useState } from "react";

import { grade4Lessons } from "@/lib/grade4-learn";

import styles from "./learn.module.css";

export default function LearnPage() {
  const [selectedLessonId, setSelectedLessonId] = useState(grade4Lessons[0].id);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const selectedLesson = grade4Lessons.find((lesson) => lesson.id === selectedLessonId) ?? grade4Lessons[0];

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Grade 4 Learn</p>
            <h1>Build skills before the test</h1>
            <p>
              Review a focused Math or ELA idea, follow a worked example, and try two original
              preparation questions. Every lesson shows the California Grade 4 standard it supports.
            </p>
          </div>
          <Link className={styles.homeLink} href="/">Back to practice tests</Link>
        </header>

        <div className={styles.notice} role="note">
          <strong>Preparation only.</strong> Learn is separate from practice-test attempts. It does
          not read active answers, reveal assessment keys, or coach you while a test is in progress.
        </div>

        <div className={styles.layout}>
          <nav className={styles.nav} aria-label="Grade 4 lessons">
            {(["math", "ela"] as const).map((subject) => (
              <div key={subject}>
                <p className={styles.subjectLabel}>{subject === "math" ? "Math" : "English Language Arts"}</p>
                {grade4Lessons.filter((lesson) => lesson.subject === subject).map((lesson) => (
                  <button
                    className={`${styles.lessonButton} ${lesson.id === selectedLesson.id ? styles.lessonButtonActive : ""}`}
                    key={lesson.id}
                    onClick={() => setSelectedLessonId(lesson.id)}
                    type="button"
                  >
                    {lesson.title}
                  </button>
                ))}
              </div>
            ))}
          </nav>

          <article className={styles.lesson} data-testid="learn-lesson">
            <div className={styles.standards}>
              {selectedLesson.standards.map((standard) => (
                <span className={styles.standard} key={standard}>{standard}</span>
              ))}
            </div>
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
              <h3>Try it</h3>
              {selectedLesson.practice.map((question, questionIndex) => {
                const selectedIndex = answers[question.id];
                const answered = selectedIndex !== undefined;
                const correct = answered && selectedIndex === question.correctIndex;
                return (
                  <div className={styles.question} key={question.id}>
                    <p className={styles.questionPrompt}>
                      {questionIndex + 1}. {question.prompt}
                    </p>
                    <div className={styles.options}>
                      {question.options.map((option, optionIndex) => (
                        <button
                          aria-pressed={selectedIndex === optionIndex}
                          className={styles.option}
                          key={option}
                          onClick={() => setAnswers((current) => ({ ...current, [question.id]: optionIndex }))}
                          type="button"
                        >
                          <strong>{String.fromCharCode(65 + optionIndex)}.</strong> {option}
                        </button>
                      ))}
                    </div>
                    {answered && (
                      <p
                        className={`${styles.feedback} ${correct ? styles.correct : styles.incorrect}`}
                        role="status"
                      >
                        <strong>{correct ? "Correct." : "Not yet."}</strong> {question.explanation}
                      </p>
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
