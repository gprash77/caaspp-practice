-- CAASPP Practice Test Database Schema

-- Questions table
CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  subject TEXT NOT NULL CHECK (subject IN ('math', 'ela')),
  grade INTEGER NOT NULL,
  claim INTEGER NOT NULL,
  domain TEXT,
  target TEXT NOT NULL,
  dok INTEGER NOT NULL,
  standard TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('multiple-choice', 'multi-select', 'text-input', 'two-part', 'grid-match', 'short-answer', 'extended-writing')),
  test_type TEXT NOT NULL DEFAULT 'cat' CHECK (test_type IN ('cat', 'pt')),
  passage TEXT,
  passage_title TEXT,
  passage_author TEXT,
  student_directions TEXT,
  question_text TEXT NOT NULL,
  options JSONB,
  grid_rows TEXT[],
  grid_columns TEXT[],
  correct_answer JSONB NOT NULL,
  rubric TEXT NOT NULL,
  points INTEGER NOT NULL DEFAULT 1,
  evidence_statement TEXT,
  source TEXT DEFAULT 'Smarter Balanced Practice Test Scoring Guide',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access (questions are public)
CREATE POLICY "Allow anonymous read access" ON questions
  FOR SELECT USING (true);

-- Index for common queries
CREATE INDEX idx_questions_grade_subject ON questions(grade, subject);
CREATE INDEX idx_questions_test_type ON questions(grade, subject, test_type);
