import { readFile, writeFile } from "node:fs/promises";
import regionsToSql from "./to-sql.mjs";

// TODO: use paths relative to current file
export default async function generateSql() {
  const file = await readFile("../fly-regions.json", { encoding: "utf-8" });
  /** @type {import('../region').Regions} */
  const data = JSON.parse(file);

  const sql = regionsToSql(data);

  await writeFile("../sql/data.sql", sql);
}

generateSql().catch(() => process.exit(1));
