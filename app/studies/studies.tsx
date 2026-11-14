'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { studySources, studyUnits, type StudyLesson } from '@/lib/school-studies';
import s from './studies.module.css';

type Notebook = { lesson: string; responses: Record<string, string>; completed: string[] };
const STORAGE_KEY = 'school-studies:v1';
const lessons = studyUnits.flatMap(unit => unit.lessons);
const initial: Notebook = { lesson: 'matter-1', responses: {}, completed: [] };
function readNotebook(): Notebook {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (!raw || typeof raw !== 'object') return initial;
    const valid = new Set(lessons.map(lesson => lesson.id));
    return {
      lesson: valid.has(raw.lesson) ? raw.lesson : initial.lesson,
      responses: raw.responses && typeof raw.responses === 'object' && !Array.isArray(raw.responses)
        ? Object.fromEntries(Object.entries(raw.responses).filter(([key, value]) => typeof value === 'string' && lessons.some(l => l.questions.some((_, i) => `${l.id}:${i}` === key)))) as Record<string, string> : {},
      completed: Array.isArray(raw.completed) ? [...new Set(raw.completed.filter((id: unknown) => typeof id === 'string' && valid.has(id)))] as string[] : [],
    };
  } catch { return initial; }
}

function ParticleModel() {
  const [mixed, setMixed] = useState(true);
  return <section className={s.model} aria-label="Mixture model">
    <div><span className={s.eyebrow}>Try a model</span><h3>Same particles. Different arrangement.</h3><p>Toggle to compare a mixture and separated groups. Count the particles in each view.</p>
      <button className={s.secondary} onClick={() => setMixed(!mixed)}>{mixed ? 'Separate the groups' : 'Mix the groups'}</button></div>
    <div><div className={s.particles} role="img" aria-label={mixed ? 'Mixture: six blue circle particles and six orange square particles interspersed.' : 'Separated groups: the same six blue circle particles and six orange square particles grouped by type.'}>
      {Array.from({ length: 12 }, (_, i) => { const blue = mixed ? i % 2 === 0 : i < 6; return <span key={i} className={blue ? s.blue : s.orange} />; })}
    </div><p className={s.caption}>Blue circles = substance A · Orange squares = substance B. Symbols are enlarged. This model does not show water, paper, or the mechanism of separation.</p></div>
  </section>;
}

function LessonQuestions({ lesson, notebook, update }: { lesson: StudyLesson; notebook: Notebook; update: (key: string, value: string) => void }) {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  return <div className={s.questions}>{lesson.questions.map((question, index) => {
    const key = `${lesson.id}:${index}`;
    const response = notebook.responses[key] ?? '';
    const show = !!revealed[index];
    return <section className={s.question} key={key}>
      <span className={s.eyebrow}>Question {index + 1} · {question.choices ? 'Choose & explain' : 'Think & write'}</span>
      <h3>{question.prompt}</h3>
      {question.choices ? <fieldset><legend className={s.srOnly}>{question.prompt}</legend>{question.choices.map((choice, i) => <label key={choice} className={response === String(i) ? s.selectedChoice : s.choice}>
        <input type="radio" name={key} value={i} checked={response === String(i)} onChange={() => { update(key, String(i)); setRevealed(previous => ({ ...previous, [index]: false })); }} />{choice}
      </label>)}</fieldset> : <><label className={s.srOnly} htmlFor={key}>Your answer to question {index + 1}</label><textarea id={key} rows={4} value={response} placeholder="Explain in your own words. What evidence supports your idea?" onChange={event => update(key, event.target.value)} /></>}
      <button className={s.secondary} disabled={!!question.choices && !response} aria-expanded={show} aria-controls={`answer-${key}`} onClick={() => setRevealed(previous => ({ ...previous, [index]: !show }))}>{show ? 'Hide explanation' : question.choices ? 'Check my answer' : 'Show model answer & compare'}</button>
      {show && <div id={`answer-${key}`} className={s.feedback} role="status"><strong>{question.choices ? Number(response) === question.correct ? 'Correct — explain why.' : 'Revisit your idea.' : 'Model answer · your wording can differ'}</strong><p>{question.choices && <b>Answer: {question.choices[question.correct!]} </b>}{question.answer}</p>{!question.choices && <p>Self-check: Is my idea accurate? Did I use evidence? Can I improve the explanation? Written answers are for discussion, not automatically scored.</p>}</div>}
      <div className={s.printAnswer}><strong>Model answer: </strong>{question.choices && question.choices[question.correct!]} {question.answer}</div>
    </section>;
  })}</div>;
}

export default function Studies() {
  const [notebook, setNotebook] = useState<Notebook>(initial);
  const [loaded, setLoaded] = useState(false);
  const [storageIssue, setStorageIssue] = useState(false);
  const [mode, setMode] = useState<'learn' | 'practice'>('learn');
  useEffect(() => { setNotebook(readNotebook()); setLoaded(true); }, []);
  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(notebook)); } catch { setStorageIssue(true); }
  }, [notebook, loaded]);
  const unit = studyUnits.find(unit => unit.lessons.some(lesson => lesson.id === notebook.lesson))!;
  const lesson = unit.lessons.find(lesson => lesson.id === notebook.lesson)!;
  const lessonIndex = unit.lessons.indexOf(lesson);
  const choose = (id: string) => { setNotebook(previous => ({ ...previous, lesson: id })); setMode('learn'); };
  const update = (key: string, value: string) => setNotebook(previous => ({ ...previous, responses: { ...previous.responses, [key]: value } }));
  const done = notebook.completed.includes(lesson.id);
  return <div className={s.shell}>
    <header className={s.header}><Link href="/">← CAASPP home</Link><span>THE HOME LEARNING NOTEBOOK</span><button className={s.secondary} onClick={() => window.print()}>Print lesson & answers</button></header>
    <main>
      <section className={s.hero}><div><p className={s.eyebrow}>Grades 4–5 · Learn together</p><h1>A little curiosity.<br />A bigger world.</h1><p>Science and California stories, one thoughtful conversation at a time.</p></div><aside className={s.startCard}><span className={s.eyebrow}>Your starting point</span><h2>Modeling Matter</h2><p>Begin with Chapters 1 & 2. Continue with Chapter 3, then the home review.</p><button className={s.primary} onClick={() => choose('matter-1')}>Start Unit 2 →</button><small>{notebook.completed.length} of {lessons.length} sections marked reviewed</small></aside></section>
      <section className={s.context}><strong>Aligned to the classroom topics.</strong> September, October, and November–December 2026 family newsletters confirm sky patterns, matter, California stewardship, and the upcoming history inquiry. Units 3–4 are publisher-sequence previews. Original study materials; not official Amplify questions or school test answers.</section>
      <div className={s.workspace}>
        <aside className={s.sidebar}><h2>Your study shelf</h2>{(['science', 'social'] as const).map(subject => <div key={subject}><h3>{subject === 'science' ? '01 / Science' : '02 / Social studies'}</h3>{studyUnits.filter(item => item.subject === subject).map(item => <button key={item.id} className={item.id === unit.id ? s.activeUnit : s.unit} aria-current={item.id === unit.id ? 'true' : undefined} onClick={() => choose(item.lessons[0].id)}><small>{item.label} · {item.status}</small><strong>{item.title}</strong><span>{item.lessons.filter(l => notebook.completed.includes(l.id)).length}/{item.lessons.length} reviewed</span></button>)}</div>)}
          <p className={s.localNote}>{storageIssue ? 'Saving is unavailable in this browser. Keep this page open or print your work.' : 'Answers and review marks save on this browser and device. Shared-device users share this notebook; it does not sync to a school account.'}</p>
        </aside>
        <article className={s.lesson} aria-busy={!loaded}>
          <div className={s.unitIntro}><span className={s.eyebrow}>{unit.subject === 'science' ? 'Science' : 'Social studies'} / {unit.label} / {unit.status}</span><h2>{unit.title}</h2><p>{unit.description}</p>{unit.note && <p className={s.note}>{unit.note}</p>}</div>
          <nav className={s.lessonNav} aria-label="Lesson sections">{unit.lessons.map((item, i) => <button key={item.id} className={item.id === lesson.id ? s.activeLesson : s.lessonButton} aria-current={item.id === lesson.id ? 'step' : undefined} onClick={() => choose(item.id)}><span>{notebook.completed.includes(item.id) ? '✓' : i + 1}</span>{item.title.split(' · ')[1]}</button>)}</nav>
          <div className={s.lessonHeading}><span className={s.eyebrow}>20–30 minutes · Read, try, explain</span><h2>{lesson.title}</h2><p>{lesson.focus}</p></div>
          <div className={s.modeNav} role="group" aria-label="Study mode"><button aria-pressed={mode === 'learn'} className={mode === 'learn' ? s.activeMode : s.secondary} onClick={() => setMode('learn')}>Teach together</button><button aria-pressed={mode === 'practice'} className={mode === 'practice' ? s.activeMode : s.secondary} onClick={() => setMode('practice')}>Practice & answers ({lesson.questions.length})</button></div>
          <div className={mode !== 'learn' ? s.hiddenScreen : ''}>
            <section className={s.parentGuide}><h3>For the grown-up</h3><p><b>A simple rhythm:</b> Recall yesterday’s idea (2 min) → read and talk (5 min) → try or draw (8 min) → answer and revise (8 min). Split across two days when helpful.</p><p>{lesson.coach}</p><p><b>Grade 4 support:</b> Read aloud, sketch first, then use “I think ___ because ___.” <b>Grade 5 stretch:</b> {lesson.stretch}</p></section>
            <section className={s.reading}><span className={s.eyebrow}>Read & discuss</span><h3>Let’s figure it out.</h3>{lesson.read.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>
            {lesson.id === 'matter-1' && <ParticleModel />}
            <section className={s.words}><h3>Words to use</h3><dl>{lesson.vocabulary.map(([word, meaning]) => <div key={word}><dt>{word}</dt><dd>{meaning}</dd></div>)}</dl></section>
            <section className={s.activity}><span className={s.eyebrow}>Your turn</span><h3>Try, draw, or investigate</h3><p>{lesson.activity}</p></section>
            <p className={s.misconception}><strong>Watch for this idea:</strong> {lesson.misconception}</p>
            <button className={s.primary} onClick={() => setMode('practice')}>Ready for practice →</button>
          </div>
          <div className={mode !== 'practice' ? s.hiddenScreen : ''}><p className={s.practiceIntro}>Try each question before opening the explanation. For written work, compare and revise together. Marking a section reviewed records your own review, not a mastery score.</p><LessonQuestions key={lesson.id} lesson={lesson} notebook={notebook} update={update} /></div>
          <footer className={s.lessonFooter}><button className={done ? s.secondary : s.primary} aria-pressed={done} onClick={() => setNotebook(previous => ({ ...previous, completed: done ? previous.completed.filter(id => id !== lesson.id) : [...previous.completed, lesson.id] }))}>{done ? '✓ Reviewed · undo' : 'Mark section reviewed'}</button>{lessonIndex < unit.lessons.length - 1 && <button className={s.secondary} onClick={() => choose(unit.lessons[lessonIndex + 1].id)}>Next section →</button>}</footer>
          <details className={s.sources}><summary>Sources & alignment notes</summary><p>The classroom newsletters establish topics, not exact assessment questions. Public references support the explanations below. Home sections do not reproduce a publisher lesson calendar.</p><ul>{unit.sources.map(key => <li key={key}><a href={studySources[key].url} target="_blank" rel="noreferrer">{studySources[key].title} ↗</a></li>)}</ul><p>Content reviewed November 14, 2026. Preview timing remains unconfirmed.</p></details>
        </article>
      </div>
    </main><footer className={s.bottom}>School Studies · A family companion for curiosity, evidence, and conversation.</footer>
  </div>;
}
