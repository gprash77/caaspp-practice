import { evaluateGrade4Test4 } from "../lib/validation/grade4-test4";
const result=evaluateGrade4Test4();
console.log(JSON.stringify(result,null,2));
if(!result.passed)process.exitCode=1;
