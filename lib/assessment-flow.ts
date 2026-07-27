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
  [
    "4:4",
    {
      sourcePackageId: "g4-test4-lunch-line",
      sourcePackageVersion: "2026-07-22.1",
      part1ItemIds: [47101, 47102],
      part2ItemIds: [47103],
    },
  ],
  [
    "4:5",
    {
      sourcePackageId: "g4-test5-shielded-streetlights",
      sourcePackageVersion: "2026-07-22.1",
      part1ItemIds: [49101, 49102],
      part2ItemIds: [49103],
    },
  ],
  [
    "4:6",
    {
      sourcePackageId: "g4-test6-reading-courtyard",
      sourcePackageVersion: "2026-07-27.1",
      part1ItemIds: [51101, 51102],
      part2ItemIds: [51103],
    },
  ],
  [
    "4:7",
    {
      sourcePackageId: "g4-test7-community-art-wall",
      sourcePackageVersion: "2026-07-27.1",
      part1ItemIds: [53101, 53102],
      part2ItemIds: [53103],
    },
  ],
  [
    "4:8",
    {
      sourcePackageId: "g4-test8-flexible-library-spaces",
      sourcePackageVersion: "2026-07-27.1",
      part1ItemIds: [55101, 55102],
      part2ItemIds: [55103],
    },
  ],
  [
    "4:9",
    {
      sourcePackageId: "g4-test9-pocket-park",
      sourcePackageVersion: "2026-07-27.1",
      part1ItemIds: [57101, 57102],
      part2ItemIds: [57103],
    },
  ],
  [
    "4:10",
    {
      sourcePackageId: "g4-test10-reusable-containers",
      sourcePackageVersion: "2026-07-27.1",
      part1ItemIds: [59101, 59102],
      part2ItemIds: [59103],
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
