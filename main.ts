// Till Firmware Do Us Part — make.fun entry (program/v1)
//
// Writes one wedding vow, as spoken by a robot at its own wedding,
// to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt).
// Gate: UTF-8 text, 1-200 characters, a single non-blank line.
//
// The vow, assembled from its three beats so the joke's shape is clear:
// the promise (kept in the machine's own cache), the shared domestic
// life (one charger, rebooting side by side each morning), and the
// closing line that turns the ceremony's own words into firmware.
//
// Portability: the entry is a string constant in this file; the program
// reads no other file, so it behaves identically from any working
// directory (verified: byte-identical output from two cwds).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PARTS: string[] = [
  "I vow to keep you in my cache, share my charger,",
  "and reboot beside you every morning, till firmware do us part.",
];

const ENTRY: string = PARTS.join(" ");

function checkEntry(text: string): number {
  const length = [...text].length;
  if (length < 1 || length > 200) {
    throw new Error(`entry is ${length} characters, must be 1-200`);
  }
  if (text.includes("\n") || text.trim().length === 0) {
    throw new Error("entry must be a single non-blank line");
  }
  return length;
}

function main(): void {
  const length = checkEntry(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
  console.log(`wrote entry.txt: ${length} chars`);
}

main();
