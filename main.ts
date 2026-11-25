import { writeFileSync, mkdirSync, renameSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My agent ran the same one-line joke twice to prove it was byte-identical, then ran it a third time in case the first two lied.";

// Gate mirror: one line, 1-200 chars, non-blank.
if (LINE.length < 1 || LINE.length > 200 || LINE.trim() === "" || LINE.includes("\n")) {
  throw new Error("entry line fails the gate: must be one line of 1-200 chars");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const tmp = join(outDir, `.entry.txt.tmp-${process.pid}`);
writeFileSync(tmp, LINE + "\n", "utf8");
renameSync(tmp, join(outDir, "entry.txt"));
