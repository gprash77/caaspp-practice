import {evaluateGrade4Test5} from "../lib/validation/grade4-test5";
const result=evaluateGrade4Test5();console.log(JSON.stringify(result,null,2));if(!result.passed)process.exitCode=1;
