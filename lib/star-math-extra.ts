import type { StarItem } from './star-practice';
export function extraMath(seed: number): StarItem[] {
  const n = seed + 1, prefix = `math-${n}-extra`;
  const q = (i: number, domain: string, skill: string, prompt: string, options: string[], answer: number, explanation: string): StarItem => {
    const shift = i % 4, rotated = [...options.slice(shift), ...options.slice(0, shift)];
    return { id: `${prefix}-${i}`, domain, skill, prompt, options: rotated, answer: (answer - shift + 4) % 4, explanation, tip: 'Work it out on paper, check the units, and compare your result with every choice.' };
  };
  const numeric = (i: number, domain: string, skill: string, prompt: string, value: number, wrong: number[], explanation: string) => q(i, domain, skill, prompt, [value, ...wrong].map(String), 0, explanation);
  const number = 300000 + (5 + n) * 1000 + 462, sub = 276000 + n * 314, result = 800000 - sub;
  const increment = 5 + n, start = 2 + n, cents = 31 + seed * 13, length = 8 + n, width = 4 + n;
  return [
    numeric(13, 'Number & operations', 'Place value', `What is the value of the digit in the thousands place in ${number.toLocaleString('en-US')}?`, (5 + n) * 1000, [(5 + n) * 100, (5 + n) * 10000, 5 + n], 'The thousands place counts groups of 1,000.'),
    numeric(14, 'Number & operations', 'Subtraction', `Find 800,000 − ${sub.toLocaleString('en-US')}.`, result, [result + 1000, result - 1000, 800000 + sub], `Subtract by place value to get ${result.toLocaleString('en-US')}; add ${sub.toLocaleString('en-US')} to check.`),
    numeric(15, 'Number & operations', 'Factors', `Which number is a factor of ${36 + n * 12}?`, 6, [7, 11, 13], `${36 + n * 12} ÷ 6 = ${6 + n * 2}, a whole number. The other choices do not divide it evenly.`),
    numeric(16, 'Number & operations', 'Multiples', 'What is the least positive multiple shared by 6 and 8?', 24, [12, 18, 30], 'Multiples of 6 include 6, 12, 18, 24. Multiples of 8 include 8, 16, 24.'),
    numeric(17, 'Number & operations', 'Patterns', `A pattern adds ${increment} each time: ${start}, ${start + increment}, ${start + 2 * increment}, ___. What comes next?`, start + 3 * increment, [start + 2 * increment + 1, start + 4 * increment, (start + 2 * increment) * 2], `Add ${increment} to ${start + 2 * increment} to get ${start + 3 * increment}.`),
    q(18, 'Fractions & decimals', 'Comparing fractions', 'Which comparison is true?', ['3/8 < 1/2', '3/8 > 1/2', '5/6 < 1/2', '1/4 = 1/2'], 0, 'One half is 4/8, so 3/8 is smaller.'),
    q(19, 'Fractions & decimals', 'Fraction multiplication', `What is ${n + 2} × 1/8?`, [`${n + 2}/8`, `${n + 2}/16`, `1/${8 * (n + 2)}`, `${n + 3}/8`], 0, `${n + 2} groups of one eighth make ${n + 2} eighths.`),
    q(20, 'Fractions & decimals', 'Tenths', `Which decimal equals ${n}/10?`, [`0.${n}`, `0.0${n}`, `${n}.0`, `0.${n}${n}`], 0, `${n} tenths is written as 0.${n}.`),
    numeric(21, 'Fractions & decimals', 'Hundredths', `Write ${cents}/100 as a decimal.`, cents / 100, [cents / 10, cents, (cents + 1) / 100], `${cents} hundredths means ${cents / 100}.`),
    numeric(22, 'Fractions & decimals', 'Adding tenths and hundredths', `What is ${n}/10 + 23/100? Give the decimal value.`, (10 * n + 23) / 100, [(n + 23) / 100, (10 * n + 23) / 10, (10 * n + 13) / 100], `${n}/10 = ${10 * n}/100. Add 23 hundredths to get ${10 * n + 23}/100.`),
    numeric(23, 'Measurement & geometry', 'Money', `A notebook costs $${n + 3}.75 and a folder costs $2.50. What is the total cost in dollars?`, n + 6.25, [n + 5.25, n + 6.75, n + 7.25], `Add $${n + 3}.75 + $2.50 = $${(n + 6.25).toFixed(2)}.`),
    numeric(24, 'Measurement & geometry', 'Perimeter', `A rectangle is ${length} m by ${width} m. What is its perimeter in meters?`, 2 * (length + width), [length + width, length * width, 2 * length + width], `Add all sides: ${length} + ${width} + ${length} + ${width}.`),
    numeric(25, 'Measurement & geometry', 'Missing side', `A rectangle has area ${length * width} cm² and length ${length} cm. What is its width in centimeters?`, width, [length, width + 1, length * width], `Divide area by length: ${length * width} ÷ ${length} = ${width}.`),
    numeric(26, 'Measurement & geometry', 'Time units', `How many seconds are in ${n + 3} minutes?`, (n + 3) * 60, [(n + 3) * 100, n + 63, (n + 3) * 6], `Each minute has 60 seconds, so multiply ${n + 3} by 60.`),
    numeric(27, 'Measurement & geometry', 'Capacity', `A container starts with ${n + 3} liters. After 1,250 milliliters are used, how many milliliters remain?`, (n + 3) * 1000 - 1250, [(n + 3) * 1000 + 1250, (n + 3) * 1000 - 250, 1250], `Convert ${n + 3} L to ${(n + 3) * 1000} mL, then subtract 1,250 mL.`),
    q(28, 'Measurement & geometry', 'Classifying angles', 'Which statement about a 120° angle is true?', ['It is obtuse because it is between 90° and 180°.', 'It is acute because it is larger than 90°.', 'It is a right angle.', 'It is a straight angle.'], 0, 'An obtuse angle is greater than 90° and less than 180°.'),
    q(29, 'Measurement & geometry', 'Shape properties', 'Which property must every rectangle have?', ['Four right angles.', 'All four sides equal.', 'Exactly one pair of parallel sides.', 'No lines of symmetry.'], 0, 'Every rectangle has four right angles. Its adjacent side lengths need not be equal.'),
    numeric(30, 'Measurement & geometry', 'Symmetry', 'How many lines of symmetry does a rectangle that is not a square have?', 2, [0, 1, 4], 'The vertical and horizontal center lines are symmetry lines; the diagonals are not.'),
    numeric(31, 'Measurement & geometry', 'Fractional data', 'Two ribbons are each 1/4 yard, and three ribbons are each 1/2 yard. What is the combined length in yards?', 2, [5, 3, 1], '2 × 1/4 = 1/2 and 3 × 1/2 = 1 1/2. Together they make 2 yards.'),
    q(32, 'Number & operations', 'Constraint planning', 'Small boxes hold 6 items and large boxes hold 10. Which plan holds 54–62 items and uses at least 2 of each box?', ['4 small and 3 large.', '1 small and 5 large.', '2 small and 2 large.', '8 small and no large.'], 0, '4 × 6 + 3 × 10 = 54. Both counts are at least 2. Each other plan fails a stated condition.'),
    numeric(33, 'Number & operations', 'Missing factor', `A club packs ${7 * (n + 6)} pencils equally into ${n + 6} bags. How many pencils go in each bag?`, 7, [6, 8, 9], `${7 * (n + 6)} ÷ ${n + 6} = 7.`),
    q(34, 'Number & operations', 'Multiplicative comparison', `Eli has ${n + 4} cards. Jo has 3 times as many. Which expression finds Jo’s cards?`, [`3 × ${n + 4}`, `3 + ${n + 4}`, `${n + 4} − 3`, `${n + 4} ÷ 3`], 0, 'Three times as many means three equal groups of Eli’s amount.')
  ];
}
