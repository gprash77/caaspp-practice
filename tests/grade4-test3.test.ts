import { existsSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { getManualRubric } from "@/lib/manual-rubrics";
import { getQuestions, type Question } from "@/lib/questions";
import { scoreResponse } from "@/lib/scoring";
import { evaluateGrade4Test3 } from "@/lib/validation/grade4-test3";

const section = (subject:"math"|"ela", testType:"cat"|"pt") => getQuestions(4,subject,testType,3,{includeUnavailable:true});
const mathCat=()=>section("math","cat"); const mathPt=()=>section("math","pt"); const elaCat=()=>section("ela","cat"); const elaPt=()=>section("ela","pt");
const all=()=>[...mathCat(),...mathPt(),...elaCat(),...elaPt()];
const wc=(value:string)=>value.trim().split(/\s+/).filter(Boolean).length;

describe("Grade 4 Test 3 locked original-bank gate",()=>{
  it("passes its independent 69-item fixture",()=>{
    expect(evaluateGrade4Test3()).toMatchObject({passed:true,errors:[],warnings:[],reviewedItems:69});
  });

  it("matches the full section and point blueprint",()=>{
    expect([mathCat().length,mathPt().length,elaCat().length,elaPt().length]).toEqual([31,5,30,3]);
    expect([mathCat(),mathPt(),elaCat(),elaPt()].map(q=>q.reduce((n,x)=>n+x.points,0))).toEqual([32,6,30,13]);
    expect(new Set(all().map(q=>q.id)).size).toBe(69);
  });

  it("rejects content and provenance mutations",()=>{
    const changed=structuredClone(elaCat());
    changed[0].questionText += " changed";
    changed[1].provenance!.sourceId="";
    const result=evaluateGrade4Test3({"ela-cat":changed});
    expect(result.passed).toBe(false);
    expect(result.errors.some(error=>error.field==="canonicalSha256")).toBe(true);
    expect(result.errors.some(error=>error.field==="provenance.sourceId")).toBe(true);
  });

  it("records complete original provenance",()=>{
    for(const q of all()) expect(q.provenance).toMatchObject({origin:"original",author:"CAASPP Practice Project",reviewedAt:"2026-07-22"});
  });
});

describe("Grade 4 Test 3 scoring contracts",()=>{
  it("scores every objective key and marks only rubric items manual",()=>{
    for(const q of all()) expect(scoreResponse(q,q.correctAnswer).status,`item ${q.id}`).toBe(q.scoringRule?.kind==="manual-rubric"?"manual":"correct");
  });

  it("enforces partial credit and ordered pairs",()=>{
    const partial=mathCat().find(q=>q.id===44020)!;
    expect(scoreResponse(partial,["14","1824"])).toMatchObject({earnedPoints:2,status:"correct"});
    expect(scoreResponse(partial,["14","1800"])).toMatchObject({earnedPoints:1,status:"partial"});
    expect(scoreResponse(partial,["12","1824"]).status).toBe("incorrect");
    const evidence=elaCat().find(q=>q.id===45004)!;
    expect(scoreResponse(evidence,["A","B"]).status).toBe("correct");
    expect(scoreResponse(evidence,["B","A"]).status).toBe("incorrect");
  });

  it("accepts valid seating plans and rejects all constraint violations",()=>{
    const q=mathPt().find(entry=>entry.id===44105)!;
    expect(scoreResponse(q,["4","6","4"]).status).toBe("correct");
    expect(scoreResponse(q,["7","5","0"]).status).toBe("correct");
    expect(scoreResponse(q,["0","6","5"]).status).toBe("incorrect");
    expect(scoreResponse(q,["8","0","5"]).status).toBe("incorrect");
    expect(scoreResponse(q,["9","1","1"]).status).toBe("incorrect");
    expect(scoreResponse(q,["4.5","6","3"]).status).toBe("incorrect");
  });

  it("registers all manual rubrics at their item point values",()=>{
    for(const id of [44104,45101,45103]){
      const q=all().find(entry=>entry.id===id)!;
      expect(getManualRubric(4,3,id)?.maxPoints).toBe(q.points);
      expect(scoreResponse(q,"student response").status).toBe("manual");
    }
  });
});

describe("Grade 4 Test 3 source and originality review",()=>{
  it("keeps every source within its approved band",()=>{
    const byTitle=new Map<string,string>();
    for(const q of elaCat()) if(q.passage&&q.passageTitle) byTitle.set(q.passageTitle,q.passage);
    expect(wc(byTitle.get("The Extra Stitch")!)).toBeGreaterThanOrEqual(850);
    expect(wc(byTitle.get("The Extra Stitch")!)).toBeLessThanOrEqual(1000);
    expect(wc(byTitle.get("Inside a Water Tower")!)).toBeGreaterThanOrEqual(900);
    expect(wc(byTitle.get("Inside a Water Tower")!)).toBeLessThanOrEqual(1050);
    for(const title of ["From Cotton Fiber to Cloth","Mapping a Neighborhood with Symbols"]){expect(wc(byTitle.get(title)!)).toBeGreaterThanOrEqual(430);expect(wc(byTitle.get(title)!)).toBeLessThanOrEqual(520);}
    expect(wc(elaPt()[0].passage!)).toBeGreaterThanOrEqual(1100);
    expect(wc(elaPt()[0].passage!)).toBeLessThanOrEqual(1350);
  });

  it("keeps audio files and transcript associations complete",()=>{
    const listening=elaCat().filter(q=>q.claim===3);
    expect(listening).toHaveLength(6);
    for(const q of listening){
      expect(q.audio?.transcript).toBe(q.passage);
      const file=path.join(process.cwd(),"public",q.audio!.src.replace(/^\//,""));
      expect(existsSync(file)).toBe(true);
      expect(statSync(file).size).toBeGreaterThan(100_000);
    }
  });

  it("has no exact prompt or passage reuse against Tests 1-2 or Grade 3",()=>{
    const current=all(); const prior:Question[]=[];
    for(let n=1;n<=18;n++)for(const s of ["math","ela"] as const)for(const t of ["cat","pt"] as const)prior.push(...getQuestions(3,s,t,n));
    for(let n=1;n<=2;n++)for(const s of ["math","ela"] as const)for(const t of ["cat","pt"] as const)prior.push(...getQuestions(4,s,t,n));
    expect(new Set(current.map(q=>q.questionText)).size).toBe(current.length);
    const prompts=new Set(prior.map(q=>q.questionText)); current.forEach(q=>expect(prompts.has(q.questionText),`item ${q.id}`).toBe(false));
    const passages=new Set(prior.map(q=>q.passage).filter(Boolean)); for(const passage of new Set(current.map(q=>q.passage).filter(Boolean)))expect(passages.has(passage)).toBe(false);
  });
});
