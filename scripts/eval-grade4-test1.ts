import { evaluateGrade4Test1 } from "../lib/validation/grade4-test1";

const evaluation = evaluateGrade4Test1();

console.log(`Grade 4 Test 1 official-fidelity gate: ${evaluation.passed ? "PASS" : "FAIL"}`);
console.log(`Reviewed ${evaluation.reviewedItems} runtime items against the locked 69-item fixture.`);

for (const warning of evaluation.warnings) {
  console.warn(`WARNING ${warning.field}: ${warning.message}`);
}

for (const error of evaluation.errors) {
  console.error(`ERROR ${error.section ?? "global"}${error.itemId ? ` item ${error.itemId}` : ""} ${error.field}: ${error.message}`);
}

if (!evaluation.passed) process.exitCode = 1;
