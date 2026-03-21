import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("RichTextEditor source-level regression checks", () => {
  const source = fs.readFileSync(
    path.resolve(__dirname, "../app/test/page.tsx"),
    "utf-8"
  );

  // Extract just the RichTextEditor function
  const editorSection = source.slice(
    source.indexOf("function RichTextEditor"),
    source.indexOf("function GridMatch")
  );

  it("RichTextEditor function exists in source", () => {
    expect(editorSection.length).toBeGreaterThan(0);
  });

  it("uses useRef (not dangerouslySetInnerHTML) for contentEditable", () => {
    expect(editorSection).toContain("useRef");
    expect(editorSection).toContain("editorRef");
    expect(editorSection).not.toContain("dangerouslySetInnerHTML");
  });

  it("uses ref={editorRef} on the contentEditable div", () => {
    expect(editorSection).toContain("ref={editorRef}");
    expect(editorSection).toContain("contentEditable");
  });

  it("has onInput handler for onChange", () => {
    expect(editorSection).toContain("onInput");
    expect(editorSection).toContain("onChange");
  });

  it("does not set innerHTML directly on render", () => {
    // dangerouslySetInnerHTML causes cursor reset on re-render
    expect(editorSection).not.toContain("dangerouslySetInnerHTML");
    expect(editorSection).not.toContain("innerHTML");
  });
});
