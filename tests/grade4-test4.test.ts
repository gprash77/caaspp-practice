import { existsSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { getManualRubric } from "@/lib/manual-rubrics";
import { getElaPtFlow } from "@/lib/assessment-flow";
import { getQuestions, type Question } from "@/lib/questions";
import { scoreResponse } from "@/lib/scoring";
import { evaluateGrade4Test4 } from "@/lib/validation/grade4-test4";

const section=(subject:"math"|"ela",testType:"cat"|"pt")=>getQuestions(4,subject,testType,4,{includeUnavailable:true});
const mathCat=()=>section("math","cat"),mathPt=()=>section("math","pt"),elaCat=()=>section("ela","cat"),elaPt=()=>section("ela","pt");
const all=()=>[...mathCat(),...mathPt(),...elaCat(),...elaPt()];
const wc=(value:string)=>value.trim().split(/\s+/).filter(Boolean).length;

describe("Grade 4 Test 4 locked Medium bank",()=>{
  it("passes its independent full-form fixture",()=>expect(evaluateGrade4Test4()).toMatchObject({passed:true,errors:[],warnings:[],reviewedItems:69}));
  it("matches the 69-item, 81-point scaffold",()=>{
    expect([mathCat().length,mathPt().length,elaCat().length,elaPt().length]).toEqual([31,5,30,3]);
    expect([mathCat(),mathPt(),elaCat(),elaPt()].map(q=>q.reduce((n,x)=>n+x.points,0))).toEqual([32,6,30,13]);
    expect(new Set(all().map(q=>q.id)).size).toBe(69);
    expect(mathCat().reduce((n,q)=>{n[q.claim-1]++;return n},[0,0,0,0])).toEqual([17,3,8,3]);
    expect(elaCat().reduce((n,q)=>{n[q.claim-1]++;return n},[0,0,0,0])).toEqual([15,6,6,3]);
  });
  it("registers the two-task Part 1 and separate full write",()=>expect(getElaPtFlow(4,4)).toMatchObject({part1ItemIds:[47101,47102],part2ItemIds:[47103]}));
  it("rejects locked content and provenance changes",()=>{const changed=structuredClone(elaCat());changed[0].questionText+=" changed";changed[1].provenance!.sourceId="";const result=evaluateGrade4Test4({"ela-cat":changed});expect(result.passed).toBe(false);expect(result.errors.some(e=>e.field==="canonicalSha256")).toBe(true);expect(result.errors.some(e=>e.field==="provenance.sourceId")).toBe(true)});
});

describe("Grade 4 Test 4 scoring and interaction contracts",()=>{
  it("scores every objective key and reserves manual status for rubric items",()=>{for(const q of all())expect(scoreResponse(q,q.correctAnswer).status,`item ${q.id}`).toBe(q.scoringRule?.kind==="manual-rubric"?"manual":"correct")});
  it("enforces CAT partial credit",()=>{const q=mathCat().find(x=>x.id===46020)!;expect(scoreResponse(q,["159","4"])).toMatchObject({earnedPoints:2,status:"correct"});expect(scoreResponse(q,["159","3"])).toMatchObject({earnedPoints:1,status:"partial"});expect(scoreResponse(q,["158","3"]).status).toBe("incorrect")});
  it("accepts valid pantry plans and rejects every boundary family",()=>{const q=mathPt().find(x=>x.id===46105)!;expect(scoreResponse(q,["12","2","2"]).status).toBe("correct");expect(scoreResponse(q,["15","2","3"]).status).toBe("correct");for(const response of [["11","2","2"],["12","1","2"],["12","2","1"],["16","2","2"],["12.5","2","2"]])expect(scoreResponse(q,response).status).toBe("incorrect")});
  it("enforces ELA PT 1/2/1 row cardinality",()=>{const q=elaPt().find(x=>x.id===47102)!;expect(q.gridSelection?.rowSelections).toEqual([{min:1,max:1},{min:2,max:2},{min:1,max:1}]);expect(scoreResponse(q,["0:0","1:0","1:1","2:2"]).status).toBe("correct");expect(scoreResponse(q,["0:0","1:0","2:2"]).status).toBe("incorrect")});
  it("registers all three manual rubrics",()=>{for(const id of [46104,47101,47103]){const q=all().find(x=>x.id===id)!;expect(getManualRubric(4,4,id)?.maxPoints).toBe(q.points)}});
});

describe("Grade 4 Test 4 source and originality review",()=>{
  it("keeps every source in its approved full-form band",()=>{const byTitle=new Map<string,string>();for(const q of elaCat())if(q.passage&&q.passageTitle)byTitle.set(q.passageTitle,q.passage);expect(wc(byTitle.get("The Unmarked Beat")!)).toBeGreaterThanOrEqual(950);expect(wc(byTitle.get("The Unmarked Beat")!)).toBeLessThanOrEqual(1050);expect(wc(byTitle.get("When a Drawbridge Opens")!)).toBeGreaterThanOrEqual(950);expect(wc(byTitle.get("When a Drawbridge Opens")!)).toBeLessThanOrEqual(1100);for(const title of ["From Clay to a Fired Bowl","Reading a Weather Map"]){expect(wc(byTitle.get(title)!)).toBeGreaterThanOrEqual(450);expect(wc(byTitle.get(title)!)).toBeLessThanOrEqual(520)}expect(wc(elaPt()[0].passage!)).toBeGreaterThanOrEqual(1150);expect(wc(elaPt()[0].passage!)).toBeLessThanOrEqual(1350)});
  it("has complete transcript/audio associations",()=>{for(const q of elaCat().filter(x=>x.claim===3)){expect(q.audio?.transcript).toBe(q.passage);const file=path.join(process.cwd(),"public",q.audio!.src.replace(/^\//,""));expect(existsSync(file)).toBe(true);expect(statSync(file).size).toBeGreaterThan(100_000)}});
  it("does not exactly reuse prompts or passages from prior banks",()=>{const prior:Question[]=[];for(let n=1;n<=18;n++)for(const s of ["math","ela"] as const)for(const t of ["cat","pt"] as const)prior.push(...getQuestions(3,s,t,n));for(let n=1;n<=3;n++)for(const s of ["math","ela"] as const)for(const t of ["cat","pt"] as const)prior.push(...getQuestions(4,s,t,n));const prompts=new Set(prior.map(q=>q.questionText));for(const q of all())expect(prompts.has(q.questionText),`item ${q.id}`).toBe(false);const passages=new Set(prior.map(q=>q.passage).filter(Boolean));for(const passage of new Set(all().map(q=>q.passage).filter(Boolean)))expect(passages.has(passage)).toBe(false)});
});
