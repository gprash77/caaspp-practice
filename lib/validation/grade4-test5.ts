import golden from "../../data/original/grade-4/test-5/golden.json";
import sources from "../../data/original/grade-4/test-5/sources.json";
import {getAssessmentManifest} from "../assessment-manifest";
import {getQuestions,type Question} from "../questions";
import {evaluateAssessmentBank,sectionHash,type EvalIssue,type EvalResult} from "./assessment-bank";
export type SectionId="math-cat"|"math-pt"|"ela-cat"|"ela-pt";export type{EvalIssue,EvalResult};export{sectionHash};
export function evaluateGrade4Test5(overrides:Partial<Record<SectionId,Question[]>>={}):EvalResult{const manifest=getAssessmentManifest(4,5,{includeUnavailable:true});if(!manifest)return{passed:false,errors:[{field:"manifest",message:"Grade 4 Test 5 manifest is unavailable."}],warnings:[],reviewedItems:0};return evaluateAssessmentBank({manifest,golden,sources,bankResolver:(g,s,t,n)=>getQuestions(g,s,t,n,{includeUnavailable:true}),overrides,requireOriginalProvenance:true});}
