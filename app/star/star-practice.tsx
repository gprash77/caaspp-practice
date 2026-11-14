'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { answerStarSession, createStarSession, isStarSession, pauseStarSession, remainingStarSeconds, resumeStarSession, starChoices, starSessionItems, summarizeStar, type StarSession, type StarSubject } from '@/lib/star-practice';
import s from './star.module.css';
const STORE = 'star-practice:grade4:v2';
export default function StarPractice() {
  const [subject, setSubject] = useState<StarSubject>('reading');
  const [formId, setFormId] = useState('reading-adaptive');
  const [sessions, setSessions] = useState<Record<string, StarSession>>({});
  const [ready, setReady] = useState(false), [savingError, setSavingError] = useState(false);
  const [allOpen, setAllOpen] = useState(false);
  const [screen, setScreen] = useState<'setup' | 'test' | 'results'>('setup');
  const [feedback, setFeedback] = useState(false), [learn, setLearn] = useState(false), [zoom, setZoom] = useState(false);
  const [seconds, setSeconds] = useState<StarSession['secondsPerItem']>(0);
  const [clock, setClock] = useState(0);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    try {
      const raw: unknown = JSON.parse(localStorage.getItem(STORE) || '{}');
      if (raw && typeof raw === 'object' && !Array.isArray(raw)) setSessions(Object.fromEntries(Object.entries(raw).filter(([key, value]) => isStarSession(value) && key === value.formId)));
    } catch { /* A damaged local notebook can be replaced with a fresh one. */ }
    setReady(true);
  }, []);
  useEffect(() => { if (ready) try { localStorage.setItem(STORE, JSON.stringify(sessions)); } catch { setSavingError(true); } }, [sessions, ready]);
  const form = starChoices.find(form => form.id === formId)!;
  const active = sessions[formId];
  const items = starSessionItems(active ?? { formId, answers: [] });
  const finished = !!active && active.answers.length === items.length;
  const index = Math.max(0, Math.min(items.length - 1, (active?.answers.length ?? 0) - (feedback ? 1 : 0)));
  const question = items[index];
  const start = (fresh = false) => {
    setSessions(previous => ({ ...previous, [formId]: !active || fresh ? createStarSession(formId, learn ? 'learn' : 'check', seconds) : resumeStarSession(active) }));
    setClock(Date.now()); setFeedback(false); setScreen(!fresh && finished ? 'results' : 'test');
  };
  const pause = () => {
    if (active) setSessions(previous => ({ ...previous, [formId]: pauseStarSession(previous[formId]) }));
    setFeedback(false); setScreen('setup');
  };
  const submit = (expired = false) => {
    if (!active || (!expired && active.draft === null) || feedback || finished) return;
    setSessions(previous => {
      const current = previous[formId];
      if (current.answers.length !== active.answers.length) return previous;
      return { ...previous, [formId]: answerStarSession(current, expired) };
    });
    if (active.mode === 'learn') setFeedback(true);
    else if (active.answers.length + 1 === items.length) setScreen('results');
    else heading.current?.focus();
  };
  const proceed = () => {
    setFeedback(false);
    if (finished) setScreen('results');
    else setSessions(previous => ({ ...previous, [formId]: resumeStarSession(previous[formId]) }));
    heading.current?.focus();
  };
  useEffect(() => {
    if (screen !== 'test' || !active?.secondsPerItem || feedback || finished) return;
    const interval = setInterval(() => setClock(Date.now()), 250);
    return () => clearInterval(interval);
  }, [screen, active?.secondsPerItem, feedback, finished]);
  const remaining = active ? remainingStarSeconds(active, clock || Date.now()) : 0;
  useEffect(() => {
    if (screen === 'test' && active?.secondsPerItem && active.deadline !== null && remaining === 0 && !feedback && !finished) submit(true);
  });
  const summary = active ? summarizeStar(active) : null;
  return <main className={`${s.shell} ${zoom ? s.large : ''}`}>
    <header className={s.top}><Link href="/">← CAASPP home</Link><strong>STAR Skill Practice · Grade 4</strong><button onClick={pause}>Test selection</button></header>
    {screen === 'setup' && <div className={s.setup}>
      <p className={s.kicker}>Reading & math · STAR format companion</p><h1>Get comfortable.<br />Show what you know.</h1>
      <p className={s.intro}>Practice the published STAR skill areas with 34-question Reading and Math sessions. Try adaptive practice, or choose a fixed Easy, Medium, or Hard test. Review answers and explanations when finished.</p>
      <div className={s.notice}><strong>Practice companion:</strong> Built around published STAR skills and sample formats. Adaptive practice uses three approximate levels and does not reproduce Renaissance’s testing algorithm or official scores. Easy builds foundations, Medium focuses on grade 4, and Hard adds extension skills.</div>
      <section className={s.card}><h2>Choose your test</h2><div className={s.subjects} role="group" aria-label="Subject">{(['reading', 'math'] as const).map(value => <button key={value} aria-pressed={subject === value} className={subject === value ? s.active : ''} onClick={() => { setSubject(value); setFormId(`${value}-adaptive`); }}>{value === 'reading' ? 'STAR Reading practice' : 'STAR Math practice'}</button>)}</div>
        <label className={s.label} htmlFor="star-form">Practice test</label><select id="star-form" value={formId} onChange={event => setFormId(event.target.value)}>{starChoices.filter(form => form.subject === subject).map(form => <option key={form.id} value={form.id}>{form.title} · {form.difficulty === 'adaptive' ? 'Adjusts after each answer' : form.difficulty[0].toUpperCase() + form.difficulty.slice(1)} · 34 questions</option>)}</select>
        <p>{subject === 'reading' ? 'Vocabulary, comprehension, literary text, author’s craft, and argument. Each question includes its own text.' : 'Numbers and operations, algebra, geometry and measurement, and data. Tables and diagrams are included. Use scratch paper; no calculator.'}</p>
        <label className={s.label} htmlFor="star-pacing">Practice pacing for a new attempt</label>
        <select id="star-pacing" value={seconds} onChange={event => setSeconds(Number(event.target.value) as StarSession['secondsPerItem'])}><option value={0}>Untimed</option><option value={120}>2 minutes per question</option><option value={180}>3 minutes per question</option><option value={240}>4 minutes per question</option></select>
        <small>Home practice settings, not verified SFUSD time limits. At zero, your selected answer is submitted; an unanswered question is marked unanswered. Use Pause to stop the timer before leaving. Existing attempts keep their pacing.</small>
        <label className={s.toggle}><input type="checkbox" checked={learn} onChange={event => setLearn(event.target.checked)} />Show feedback after each answer in a new attempt</label><small>Leave this off for an independent practice test. An existing attempt keeps its original feedback setting.</small>
        <button className={s.primary} disabled={!ready} onClick={() => start()}>{finished ? 'View saved results' : active ? `Resume · ${active?.answers.length ?? 0}/34 answered` : 'Start 34-question test →'}</button>
        {active && <p className={s.saved}>{active.answers.length}/34 answers saved for this form.</p>}
      </section>
      <section className={s.card}><h2>Before you begin</h2><ol><li>Find a quiet place and have scratch paper ready for math.</li><li>Read the question and all choices. You may change a choice before selecting Next.</li><li>After you enter an answer, it is locked for this attempt. You can review it when finished.</li><li>Adaptive practice starts at Medium, moves up one level after a correct answer and down after a missed answer, and stays within three levels. Hard questions can include skills beyond grade 4. It is normal to find some questions difficult.</li></ol><p>Use the Pause button to return to test selection; resume the same form on this browser. On the school assessment, follow the teacher’s instructions and assigned accommodations.</p></section>
      <section className={s.card}><h2>How this compares with STAR</h2><ul><li>34 questions, one answer at a time, with answers locked after Next.</li><li>Reading uses sentence completion and short, standalone texts; math includes computations, word problems, tables, and a labeled diagram.</li><li>Five published Reading categories and four Math categories are represented. Our question counts are a practice design, not an official grade 4 blueprint.</li><li>Adaptive practice changes levels, but uses a small original bank shared with the fixed tests. Repeating these forms measures familiarity as well as skill.</li><li>Results help choose what to study. They do not measure nationally normed achievement or predict school scores. Scores across different adaptive routes are not directly comparable.</li></ul></section>
      <details className={s.sources}><summary>About STAR & sources</summary><p><Link href="/alignment">Read the parent source and accuracy review →</Link></p><p>SFUSD lists Star Reading and Star Math for this grade. The November 13 school announcement explains that STAR may include domains not yet taught in class. Use these practice results to choose skills to discuss, alongside classroom work.</p><ul><li><a href="https://www.renaissance.com/products/assessment/star-assessments/star-reading/" target="_blank" rel="noreferrer">Renaissance Reading categories and sample questions</a></li><li><a href="https://www.renaissance.com/products/assessment/star-assessments/star-math/" target="_blank" rel="noreferrer">Renaissance Math categories and sample questions</a></li><li><a href="https://www.sfusd.edu/vi/node/12968" target="_blank" rel="noreferrer">SFUSD STAR assessment guidance</a></li><li><a href="https://www.sfusd.edu/rpa-dept/assessing-student-learning" target="_blank" rel="noreferrer">SFUSD assessment information for families</a></li><li><a href="https://star-help.renaissance.com/hc/en-us/articles/12039339363227-Taking-a-Star-Reading-Test" target="_blank" rel="noreferrer">Renaissance: taking Star Reading</a></li><li><a href="https://star-help.renaissance.com/hc/en-us/articles/11233182953499-What-Is-Star-Math" target="_blank" rel="noreferrer">Renaissance: Star Math overview</a></li></ul><p>This revised edition starts a fresh practice record. Older browser records are preserved separately and are not scored against the revised questions. Original practice content. Not affiliated with or endorsed by Renaissance or SFUSD. Real test settings and question counts vary by version. Reviewed November 14, 2026.</p></details>
    </div>}
    {screen === 'test' && active && <div className={s.testing}>
      <div className={s.toolbar}><span>{form.subject === 'reading' ? 'Reading' : 'Math'} · {form.title} · {form.difficulty}</span><div><button aria-pressed={zoom} onClick={() => setZoom(!zoom)}>Text size {zoom ? '−' : '+'}</button><button onClick={pause}>Pause · save & exit</button></div></div>
      <div className={s.progress}><span>Question {index + 1} of {items.length}</span><progress value={active.answers.length} max={items.length} aria-label="Answered questions" /><span>{active.answers.length} answered</span>{!!active.secondsPerItem && <span role="timer" aria-label="Time remaining" className={remaining <= 15 ? s.warning : undefined}>{Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, '0')}</span>}</div>
      <div className={question.passage ? s.split : s.single}>
        {question.passage && <article className={s.passage} aria-label="Reading passage"><p className={s.kicker}>Read the passage</p><h2>{question.title}</h2>{question.passage.split('\n\n').map(paragraph => <p key={paragraph}>{paragraph}</p>)}</article>}
        <section className={s.question} aria-label="Current question"><span className={s.badge}>{index + 1}</span>{active.mode === 'learn' && <p className={s.kicker}>{question.skill}</p>}<h2 ref={heading} tabIndex={-1}>{question.prompt}</h2>{question.table && <table className={s.dataTable}><caption>Data for this question</caption><thead><tr>{question.table.headers.map(header => <th key={header} scope="col">{header}</th>)}</tr></thead><tbody>{question.table.rows.map(row => <tr key={row[0]}>{row.map((cell, i) => i === 0 ? <th scope="row" key={i}>{cell}</th> : <td key={i}>{cell}</td>)}</tr>)}</tbody></table>}
          {question.diagram && <figure className={s.diagram}><svg viewBox="0 0 300 160" role="img" aria-label={`Rectangle, length ${question.diagram.length} ${question.diagram.unit}, width ${question.diagram.width} ${question.diagram.unit}. Not to scale.`}><rect x="40" y="35" width="180" height="90" fill="#e6f2fa" stroke="#075a94" strokeWidth="3" /><text x="130" y="24" textAnchor="middle">{question.diagram.length} {question.diagram.unit}</text><text x="230" y="85">{question.diagram.width} {question.diagram.unit}</text></svg><figcaption>Not to scale.</figcaption></figure>}
          <fieldset disabled={feedback}><legend className={s.srOnly}>Answer choices</legend>{question.options.map((option, choice) => <label key={choice} className={(feedback ? active.answers[index] === choice : active.draft === choice) ? s.chosen : s.choice}><input type="radio" name={question.id} checked={feedback ? active.answers[index] === choice : active.draft === choice} onChange={() => setSessions(previous => ({ ...previous, [formId]: { ...previous[formId], draft: choice } }))} /><span>{String.fromCharCode(65 + choice)}.</span>{option}</label>)}</fieldset>
          {feedback && <div className={s.feedback} role="status"><strong>{active.answers[index] === question.answer ? 'Correct.' : 'Let’s review.'}</strong><p>Answer: {question.options[question.answer]}</p><p>{question.explanation}</p><p><b>Strategy:</b> {question.tip}</p></div>}
          {feedback ? <button className={s.primary} onClick={proceed}>{finished ? 'View results' : 'Next question →'}</button> : <button className={s.primary} disabled={active.draft === null} onClick={() => submit()}>{active.answers.length + 1 === items.length ? 'Finish test & view results' : 'Next →'}</button>}
          <p className={s.help}>Your answer is entered when you select Next. You can change it before then.</p>
        </section>
      </div>
    </div>}
    {screen === 'results' && active && summary && <section className={s.results}>
      <p className={s.kicker}>{form.subject} · {form.title} · {form.difficulty}</p><h1>Your practice results</h1><div className={s.score}>{summary.correct}<span> / {summary.total} correct</span></div><p>Original practice raw score. This is not a STAR score or a prediction of your school results.</p>
      <h2>What to work on next</h2><div className={s.domains}>{Object.entries(summary.domains).map(([name, counts]) => <article key={name}><h3>{name}</h3><b>{counts.correct}/{counts.total} correct</b><p>{counts.correct === counts.total ? 'Review the explanations, then try another form.' : 'Rework the missed questions below and explain the strategy aloud.'}</p></article>)}</div><p className={s.help}>These categories follow published STAR skill areas. Counts show performance on these practice items, not official STAR domain scores.</p><p>{active.timedOut.length} questions reached the practice time limit. A selected answer was submitted automatically; unanswered items count as missed.</p><p>Levels attempted: {Object.entries(summary.levels).map(([name, counts]) => `${name}: ${counts.correct}/${counts.total}`).join(' · ')}. Level labels are author estimates, not calibrated STAR difficulty.</p>
      <div className={s.actions}><button className={s.primary} onClick={() => setScreen('setup')}>Choose another test</button><button onClick={() => start(true)}>Start a fresh attempt on this form</button><button onClick={() => setAllOpen(!allOpen)}>{allOpen ? "Collapse explanations" : "Expand all explanations"}</button><button onClick={() => { setAllOpen(true); setTimeout(() => window.print(), 0); }}>Print results & explanations</button></div>
      <h2>Review all {items.length} questions</h2>{items.map((question, i) => <details className={s.review} key={question.id} open={allOpen || undefined}><summary>{i + 1}. {active.answers[i] === question.answer ? '✓ Correct' : 'Review'} · {question.skill}</summary>{question.passage && <div className={s.reviewPassage}><strong>{question.title}</strong>{question.passage.split('\n\n').map(p => <p key={p}>{p}</p>)}</div>}<p className={s.help}>{question.domain} · {question.difficulty} · Skill reference: {question.alignment}{active.timedOut.includes(i) ? ' · Practice time limit reached' : ''}</p><h3>{question.prompt}</h3>{question.table && <table className={s.dataTable}><caption>Question data</caption><thead><tr>{question.table.headers.map(h => <th key={h}>{h}</th>)}</tr></thead><tbody>{question.table.rows.map(row => <tr key={row[0]}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>)}</tbody></table>}{question.diagram && <p>Rectangle: {question.diagram.length} × {question.diagram.width} {question.diagram.unit} (not to scale).</p>}<p>Your answer: {question.options[active.answers[i]] ?? 'Not answered'}</p><p><b>Correct answer: {question.options[question.answer]}</b></p><p>{question.explanation}</p><p><b>Strategy:</b> {question.tip}</p></details>)}
    </section>}
    <footer className={s.footer}>{savingError ? 'Browser storage is unavailable. Keep this page open or print your results before leaving.' : 'Saved on this browser only. Shared-device users share this practice record; it does not sync to school accounts.'}</footer>
  </main>;
}
