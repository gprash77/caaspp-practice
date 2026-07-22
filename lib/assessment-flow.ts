export type ElaPtSegmentId = "part1" | "part1-review" | "part2-transition" | "part2";

export interface ElaPtFlowDefinition {
  sourcePackageId: string;
  sourcePackageVersion: string;
  part1ItemIds: number[];
  part2ItemIds: number[];
}

const ELA_PT_FLOWS = new Map<string, ElaPtFlowDefinition>([
  [
    "4:1",
    {
      sourcePackageId: "g4-test1-animals-surroundings",
      sourcePackageVersion: "2026-07-20.1",
      part1ItemIds: [41101, 41102],
      part2ItemIds: [41103],
    },
  ],
  [
    "4:2",
    {
      sourcePackageId: "g4-test2-outdoor-learning-spaces",
      sourcePackageVersion: "2026-07-22.1",
      part1ItemIds: [43101, 43102],
      part2ItemIds: [43103],
    },
  ],
  [
    "4:3",
    {
      sourcePackageId: "g4-test3-student-news",
      sourcePackageVersion: "2026-07-22.1",
      part1ItemIds: [45101, 45102],
      part2ItemIds: [45103],
    },
  ],
]);

export function getElaPtFlow(grade: number, testNumber: number): ElaPtFlowDefinition | undefined {
  return ELA_PT_FLOWS.get(`${grade}:${testNumber}`);
}

export function normalizeElaPtSegment(
  segment: unknown,
  transitionAccepted: boolean
): ElaPtSegmentId {
  if (transitionAccepted) return segment === "part2" ? "part2" : "part2";
  if (segment === "part1-review" || segment === "part2-transition") return segment;
  return "part1";
}
