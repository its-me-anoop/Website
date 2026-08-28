import fs from "node:fs";
import path from "node:path";
import type { z } from "zod";

/** Content lives in content/<site>/<collection>.json at the repo root. */
export const DEFAULT_ROOT = path.join(process.cwd(), "content");

/**
 * Read and validate one collection file. Throws with the file's path and
 * the offending field so a bad edit fails the build with a message a
 * content editor can act on.
 */
export function readCollection<T>(
  site: string,
  name: string,
  schema: z.ZodType<T>,
  root: string = DEFAULT_ROOT
): T {
  const file = path.join(root, site, `${name}.json`);
  const label = `content/${site}/${name}.json`;

  let raw: string;
  try {
    raw = fs.readFileSync(file, "utf8");
  } catch {
    throw new Error(`${label}: file is missing`);
  }

  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch (error) {
    throw new Error(`${label}: invalid JSON — ${(error as Error).message}`);
  }

  const result = schema.safeParse(data);
  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `${issue.path.join(".") || "(root)"}: ${issue.message}`)
      .join("; ");
    throw new Error(`${label}: ${issues}`);
  }
  return result.data;
}
