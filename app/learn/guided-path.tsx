"use client";

import { useEffect, useMemo, useState } from "react";

import {
  guidedUnitsForSubject,
  type Grade4GuidedUnit,
} from "@/lib/grade4-guided-units";
import type { LearnSubject } from "@/lib/grade4-learn";

import styles from "./learn.module.css";

interface GuidedPathProps {
  subject: LearnSubject;
  answers: Record<string, number>;
  completedSteps: string[];
  shownHints: string[];
  onAnswer: (questionId: string, answerIndex: number) => void;
  onCompleteStep: (stepId: string) => void;
  onShowHint: (questionId: string) => void;
}

const firstOpenStep = (unit: Grade4GuidedUnit, completedSteps: string[]) => {
  const nextIndex = unit.steps.findIndex((step) => !completedSteps.includes(step.id));
  return nextIndex === -1 ? unit.steps.length - 1 : nextIndex;
};

export default function GuidedPath({
  subject,
  answers,
  completedSteps,
  shownHints,
  onAnswer,
  onCompleteStep,
  onShowHint,
}: GuidedPathProps) {
  const unit = guidedUnitsForSubject(subject)[0];
  const [stepIndex, setStepIndex] = useState(() => firstOpenStep(unit, completedSteps));

  useEffect(() => {
    setStepIndex(firstOpenStep(unit, completedSteps));
    // Switching subjects should open the learner's next unfinished step.
    // Existing progress updates are handled without moving the learner unexpectedly.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit.id]);

  const completedCount = useMemo(
    () => unit.steps.filter((step) => completedSteps.includes(step.id)).length,
    [completedSteps, unit.steps]
  );
  const step = unit.steps[stepIndex];
  const question = step.question;
  const selectedAnswer = question ? answers[question.id] : undefined;
  const answeredCorrectly = Boolean(question && selectedAnswer === question.correctIndex);
  const unitComplete = completedCount === unit.steps.length;

  const completeTeachingStep = () => {
    onCompleteStep(step.id);
    if (stepIndex < unit.steps.length - 1) setStepIndex(stepIndex + 1);
  };

  const goForward = () => {
    if (stepIndex < unit.steps.length - 1) setStepIndex(stepIndex + 1);
  };

  return (
    <section className={styles.guidedShell} aria-label={`${unit.title} guided unit`}>
      <aside className={styles.unitRail}>
        <div className={styles.unitSummary}>
          <p className={styles.unitKicker}>{subject === "math" ? "Math pilot unit" : "ELA pilot unit"}</p>
          <h2>{unit.title}</h2>
          <p>{unit.description}</p>
          <div className={styles.unitMeta}>
            <span>{unit.estimatedMinutes} min</span>
            <span>{completedCount}/{unit.steps.length} steps</span>
          </div>
          <progress max={unit.steps.length} value={completedCount} />
        </div>

        <nav className={styles.stepNav} aria-label={`${unit.title} steps`}>
          {unit.steps.map((candidate, index) => {
            const complete = completedSteps.includes(candidate.id);
            const unlocked = index === 0 || completedSteps.includes(unit.steps[index - 1].id);
            return (
              <button
                aria-current={index === stepIndex ? "step" : undefined}
                className={`${styles.stepButton} ${index === stepIndex ? styles.stepButtonActive : ""}`}
                disabled={!unlocked}
                key={candidate.id}
                onClick={() => setStepIndex(index)}
                type="button"
              >
                <span className={`${styles.stepNumber} ${complete ? styles.stepNumberComplete : ""}`}>
                  {complete ? "✓" : index + 1}
                </span>
                <span>
                  <small>{candidate.phase}</small>
                  {candidate.title}
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      <article className={styles.tutorial} data-testid="guided-tutorial">
        <div className={styles.tutorialTopline}>
          <span>{step.phase}</span>
          <span>Step {stepIndex + 1} of {unit.steps.length}</span>
        </div>
        <h2>{step.title}</h2>
        <p className={styles.tutorialGoal}><strong>Today&apos;s goal:</strong> {step.goal}</p>

        <div className={styles.outcomeCard}>
          <span>Unit goal</span>
          <p>{unit.outcome}</p>
          <div className={styles.standards} aria-label="California standards">
            {unit.standards.map((standard) => (
              <span className={styles.standard} key={standard}>{standard}</span>
            ))}
          </div>
        </div>

        <div className={styles.teachingGrid}>
          {step.teaching.map((section) => (
            <section className={styles.teachingCard} key={section.heading}>
              <h3>{section.heading}</h3>
              <p>{section.body}</p>
            </section>
          ))}
        </div>

        {step.strategy && (
          <section className={styles.strategyCard}>
            <h3>Your step-by-step plan</h3>
            <ol>
              {step.strategy.map((strategyStep) => <li key={strategyStep}>{strategyStep}</li>)}
            </ol>
          </section>
        )}

        {step.example && (
          <section className={styles.guidedExample}>
            <p className={styles.cardLabel}>Watch me</p>
            <h3>{step.example.prompt}</h3>
            <ol>
              {step.example.steps.map((exampleStep) => <li key={exampleStep}>{exampleStep}</li>)}
            </ol>
            <p className={styles.exampleAnswer}>{step.example.conclusion}</p>
          </section>
        )}

        {question ? (
          <section className={styles.guidedQuestion}>
            <p className={styles.cardLabel}>{step.phase === "Mastery check" ? "Show what you know" : "Your turn"}</p>
            <h3>{question.prompt}</h3>
            <div className={styles.options}>
              {question.options.map((option, optionIndex) => (
                <button
                  aria-pressed={selectedAnswer === optionIndex}
                  className={`${styles.option} ${selectedAnswer === optionIndex ? styles.optionSelected : ""}`}
                  key={option}
                  onClick={() => {
                    onAnswer(question.id, optionIndex);
                    if (optionIndex === question.correctIndex) onCompleteStep(step.id);
                  }}
                  type="button"
                >
                  <strong>{String.fromCharCode(65 + optionIndex)}.</strong> {option}
                </button>
              ))}
            </div>
            {!answeredCorrectly && !shownHints.includes(question.id) && (
              <button
                className={styles.hintButton}
                onClick={() => onShowHint(question.id)}
                type="button"
              >
                I need a hint
              </button>
            )}
            {shownHints.includes(question.id) && !answeredCorrectly && (
              <div className={styles.hint} role="note"><strong>Hint:</strong> {question.hint}</div>
            )}
            {selectedAnswer !== undefined && (
              <div
                className={`${styles.feedback} ${answeredCorrectly ? styles.correct : styles.incorrect}`}
                role="status"
              >
                <strong>{answeredCorrectly ? "You got it!" : "Good try—let's adjust."}</strong>{" "}
                {answeredCorrectly ? question.explanation : question.retry}
              </div>
            )}
            {answeredCorrectly && stepIndex < unit.steps.length - 1 && (
              <button className={styles.nextStepButton} onClick={goForward} type="button">
                Continue to the next step
              </button>
            )}
          </section>
        ) : (
          <button className={styles.nextStepButton} onClick={completeTeachingStep} type="button">
            {step.continueLabel ?? "Continue"}
          </button>
        )}

        {unitComplete && stepIndex === unit.steps.length - 1 && answeredCorrectly && (
          <div className={styles.celebration} role="status">
            <span aria-hidden="true">★</span>
            <div>
              <h3>Unit complete!</h3>
              <p>You finished every step. Revisit any step for review, or try the Practice Library next.</p>
            </div>
          </div>
        )}
      </article>
    </section>
  );
}
