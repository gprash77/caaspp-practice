import { evaluateGrade4Phase4Test } from "../lib/validation/grade4-phase4";
const result = evaluateGrade4Phase4Test(7);
console.log(JSON.stringify(result, null, 2));
if (!result.passed) process.exitCode = 1;
