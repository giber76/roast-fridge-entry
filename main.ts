// roast-fridge-entry (Node 22, standard library only): writes a single
// funny line, under 200 characters and nothing else, to /output/entry.txt.
// The gate takes UTF-8 text of 1 to 200 characters, and the blind judge
// compares it two at a time against other lines.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for
// /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The line: the crisper drawer is where good intentions go to die, so the
// joke reframes it as end-of-life care — and the twist pays off in the
// last few words, on a detail only a fridge has: the humidity slider.
// "Hospice" is the surprise; "humidity slider" is what makes it a fridge
// joke and not a generic insult. It needs no setup, and it reads cleanly
// aloud in one pass. 108 characters, nothing else.
const LINE =
  "My fridge’s crisper drawer is where vegetables go to be forgotten — the only hospice with a humidity slider.";

// The gate takes 1 to 200 UTF-8 characters: refuse loudly rather than
// emit a text the gate would score 0.
if ([...LINE].length < 1 || [...LINE].length > 200) {
  throw new Error(`line is ${[...LINE].length} characters, outside 1-200`);
}
if (LINE.trim() !== LINE || LINE.includes('\n')) {
  throw new Error('line must be a single line with no surrounding space');
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), LINE, 'utf8');
