import { writeFile } from "node:fs/promises";
import regionsToSql from "./to-sql.mjs";
import getRegions from "./call-api.mjs";

export default async function refreshData() {
  const regions = getRegions();

  const json = JSON.stringify(regions);
  const sql = regionsToSql(data);

  await Promise.all([
    writeFile("../sql/data.sql", sql),
    writeFile("../fly-regions.json", json),
  ]);
}

refreshData().catch((err) => {
  console.error("Error updating the data:", err);
  process.exit(1);
});
