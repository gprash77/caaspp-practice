'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { isStarSession, starForms, summarizeStar, type StarSession, type StarSubject } from '@/lib/star-practice';
import s from './star.module.css';
const STORE = 'star-practice:grade4:v1';
export default function StarPractice() {
  const [subject, setSubject] = useState<StarSubject>('reading');
  const [formId, setFormId] = useState('reading-1');
  const [sessions, setSessions] = useState<Record<string, StarSession>>({});
  const [ready, setReady] = useState(false), [savingError, setSavingError] = useState(false);
  const [allOpen, setAllOpen] = useState(false);
  const [screen, setScreen] = useState<'setup' | 'test' | 'results'>('setup');
  const [feedback, setFeedback] = useState(false), [learn, setLearn] = useState(false), [zoom, setZoom] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    try {
      const raw: unknown = JSON.parse(localStorage.getItem(STORE) || '{}');
      if (raw && typeof raw === 'object' && !Array.isArray(raw)) setSessions(Object.fromEntries(Object.entries(raw).filter(([key, value]) => isStarSession(value) && key === value.formId)));
    } catch { /* A damaged local notebook can be replaced with a fresh one. */ }
    setReady(true);
  }, []);
  useEffect(() => { if (ready) try { localStorage.setItem(STORE, JSON.stringify(sessions)); } catch { setSavingError(true); } }, [sessions, ready]);
  const form = starForms.find(form => form.id === formId)!;
  const active = sessions[formId];
  const finished = !!active && active.answers.length === form.items.length;
  const index = Math.max(0, Math.min(form.items.length - 1, (active?.answers.length ?? 0) - (feedback ? 1 : 0)));
  const question = form.items[index];
  const start = (fresh = false) => {
    if (!active || fresh) setSessions(previous => ({ ...previous, [formId]: { formId, mode: learn ? 'learn' : 'check', answers: [], draft: null } }));
    setFeedback(false); setScreen(!fresh && finished ? 'results' : 'test');
  };
  const submit = () => {
    if (!active || active.draft === null || feedback || finished) return;
    setSessions(previous => {
      const current = previous[formId];
      if (current.answers.length !== active.answers.length || current.draft === null) return previous;
      return { ...previous, [formId]: { ...current, answers: [...current.answers, current.draft], draft: null } };
    });
    if (active.mode === 'learn') setFeedback(true);
    else if (active.answers.length + 1 === form.items.length) setScreen('results');
  };
  const proceed = () => { setFeedback(false); if (finished) setScreen('results'); heading.current?.focus(); };
  const summary = active ? summarizeStar(active) : null;
  return <main className={`${s.shell} ${zoom ? s.large : ''}`}>
    <header className={s.top}><Link href="/">← CAASPP home</Link><strong>STAR Skill Practice · Grade 4</strong><button onClick={() => { setFeedback(false); setScreen('setup'); }}>Test selection</button></header>
    {screen === 'setup' && <div className={s.setup}>
      <p className={s.kicker}>Reading & math · Full-length original practice</p><h1>Get comfortable.<br />Show what you know.</h1>
      <p className={s.intro}>Six 34-question practice tests: Easy, Medium, and Hard for both Reading and Math. Choose answers one at a time, submit the test, then review every explanation.</p>
      <div className={s.notice}><strong>For SFUSD families:</strong> Renaissance Star is a district reading and math assessment. These are original fixed practice forms, separate from CAASPP. Their raw scores and skill groups do not predict a STAR scaled score, percentile, grade equivalent, or school proficiency level. Practice difficulty labels are approximate.</div>
      <section className={s.card}><h2>Choose your test</h2><div className={s.subjects} role="group" aria-label="Subject">{(['reading', 'math'] as const).map(value => <button key={value} aria-pressed={subject === value} className={subject === value ? s.active : ''} onClick={() => { setSubject(value); setFormId(`${value}-1`); }}>{value === 'reading' ? 'STAR Reading practice' : 'STAR Math practice'}</button>)}</div>
        <label className={s.label} htmlFor="star-form">Practice test</label><select id="star-form" value={formId} onChange={event => setFormId(event.target.value)}>{starForms.filter(form => form.subject === subject).map(form => <option key={form.id} value={form.id}>{form.title} · {form.difficulty[0].toUpperCase() + form.difficulty.slice(1)} · 34 questions</option>)}</select>
        <p>{subject === 'reading' ? 'Word meaning, literary reading, and informational reading. Every passage is included.' : 'Number operations, fractions and decimals, measurement, geometry, and data. Use scratch paper.'}</p>
        <label className={s.toggle}><input type="checkbox" checked={learn} onChange={event => setLearn(event.target.checked)} />Show feedback after each answer in a new attempt</label><small>Leave this off for an independent practice test. An existing attempt keeps its original feedback setting.</small>
        <button className={s.primary} disabled={!ready} onClick={() => start()}>{finished ? 'View saved results' : active?.answers.length || active?.draft !== undefined && active?.draft !== null ? `Resume · ${active?.answers.length ?? 0}/34 answered` : 'Start 34-question test →'}</button>
        {active && <p className={s.saved}>{active.answers.length}/34 answers saved for this form.</p>}
      </section>
      <section className={s.card}><h2>Before you begin</h2><ol><li>Find a quiet place and have scratch paper ready for math.</li><li>Read the question and all choices. You may change a choice before selecting Next.</li><li>After you enter an answer, it is locked for this attempt. You can review it when finished.</li><li>Take your time here. This practice has no timer and does not adapt question difficulty.</li></ol><p>Use the Pause button to return to test selection; resume the same form on this browser. On the school assessment, follow the teacher’s instructions and assigned accommodations.</p></section>
      <details className={s.sources}><summary>About STAR & sources</summary><p>SFUSD lists Star Reading and Star Math for this grade. The November 13 school announcement explains that STAR may include domains not yet taught in class. Use these practice results to choose skills to discuss, alongside classroom work.</p><ul><li><a href="https://www.sfusd.edu/vi/node/12968" target="_blank" rel="noreferrer">SFUSD STAR assessment guidance</a></li><li><a href="https://www.sfusd.edu/rpa-dept/assessing-student-learning" target="_blank" rel="noreferrer">SFUSD assessment information for families</a></li><li><a href="https://star-help.renaissance.com/hc/en-us/articles/12039339363227-Taking-a-Star-Reading-Test" target="_blank" rel="noreferrer">Renaissance: taking Star Reading</a></li><li><a href="https://star-help.renaissance.com/hc/en-us/articles/11233182953499-What-Is-Star-Math" target="_blank" rel="noreferrer">Renaissance: Star Math overview</a></li></ul><p>Original practice content. Not affiliated with or endorsed by Renaissance or SFUSD. Real test settings and question counts vary by version. Reviewed November 14, 2026.</p></details>
    </div>}
    {screen === 'test' && active && <div className={s.testing}>
      <div className={s.toolbar}><span>{form.subject === 'reading' ? 'Reading' : 'Math'} · {form.title} · {form.difficulty}</span><div><button aria-pressed={zoom} onClick={() => setZoom(!zoom)}>Text size {zoom ? '−' : '+'}</button><button onClick={() => { setFeedback(false); setScreen('setup'); }}>Pause · save & exit</button></div></div>
      <div className={s.progress}><span>Question {index + 1} of {form.items.length}</span><progress value={active.answers.length} max={form.items.length} aria-label="Answered questions" /><span>{active.answers.length} answered</span></div>
      <div className={question.passage ? s.split : s.single}>
        {question.passage && <article className={s.passage} aria-label="Reading passage"><p className={s.kicker}>Read the passage</p><h2>{question.title}</h2>{question.passage.split('\n\n').map(paragraph => <p key={paragraph}>{paragraph}</p>)}</article>}
        <section className={s.question} aria-label="Current question"><span className={s.badge}>{index + 1}</span><p className={s.kicker}>{question.skill}</p><h2 ref={heading} tabIndex={-1}>{question.prompt}</h2><fieldset disabled={feedback}><legend className={s.srOnly}>Answer choices</legend>{question.options.map((option, choice) => <label key={choice} className={(feedback ? active.answers[index] === choice : active.draft === choice) ? s.chosen : s.choice}><input type="radio" name={question.id} checked={feedback ? active.answers[index] === choice : active.draft === choice} onChange={() => setSessions(previous => ({ ...previous, [formId]: { ...previous[formId], draft: choice } }))} /><span>{String.fromCharCode(65 + choice)}.</span>{option}</label>)}</fieldset>
          {feedback && <div className={s.feedback} role="status"><strong>{active.answers[index] === question.answer ? 'Correct.' : 'Let’s review.'}</strong><p>Answer: {question.options[question.answer]}</p><p>{question.explanation}</p><p><b>Strategy:</b> {question.tip}</p></div>}
          {feedback ? <button className={s.primary} onClick={proceed}>{finished ? 'View results' : 'Next question →'}</button> : <button className={s.primary} disabled={active.draft === null} onClick={submit}>{active.answers.length + 1 === form.items.length ? 'Finish test & view results' : 'Next →'}</button>}
          <p className={s.help}>Your answer is entered when you select Next. You can change it before then.</p>
        </section>
      </div>
    </div>}
    {screen === 'results' && active && summary && <section className={s.results}>
      <p className={s.kicker}>{form.subject} · {form.title} · {form.difficulty}</p><h1>Your practice results</h1><div className={s.score}>{summary.correct}<span> / {summary.total} correct</span></div><p>Original practice raw score. This is not a STAR score or a prediction of your school results.</p>
      <h2>What to work on next</h2><div className={s.domains}>{Object.entries(summary.domains).map(([name, counts]) => <article key={name}><h3>{name}</h3><b>{counts.correct}/{counts.total} correct</b><p>{counts.correct === counts.total ? 'Review the explanations, then try another form.' : 'Rework the missed questions below and explain the strategy aloud.'}</p></article>)}</div><p className={s.help}>These are the practice site’s skill groups, not official STAR reporting domains.</p>
      <div className={s.actions}><button className={s.primary} onClick={() => setScreen('setup')}>Choose another test</button><button onClick={() => start(true)}>Start a fresh attempt on this form</button><button onClick={() => setAllOpen(!allOpen)}>{allOpen ? "Collapse explanations" : "Expand all explanations"}</button><button onClick={() => { setAllOpen(true); setTimeout(() => window.print(), 0); }}>Print results & explanations</button></div>
      <h2>Review all {form.items.length} questions</h2>{form.items.map((question, i) => <details className={s.review} key={question.id} open={allOpen || undefined}><summary>{i + 1}. {active.answers[i] === question.answer ? '✓ Correct' : 'Review'} · {question.skill}</summary>{question.passage && <div className={s.reviewPassage}><strong>{question.title}</strong>{question.passage.split('\n\n').map(p => <p key={p}>{p}</p>)}</div>}<h3>{question.prompt}</h3><p>Your answer: {question.options[active.answers[i]] ?? 'Not answered'}</p><p><b>Correct answer: {question.options[question.answer]}</b></p><p>{question.explanation}</p><p><b>Strategy:</b> {question.tip}</p></details>)}
    </section>}
    <footer className={s.footer}>{savingError ? 'Browser storage is unavailable. Keep this page open or print your results before leaving.' : 'Saved on this browser only. Shared-device users share this practice record; it does not sync to school accounts.'}</footer>
  </main>;
}
