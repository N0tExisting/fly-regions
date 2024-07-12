import { readFileSync, writeFileSync } from "node:fs";

const file = readFileSync("./fly-regions.json");
/** @type {import('./region').Region[]} */
const data = JSON.parse(file);

const values = data
  .map((reg) => {
    return `('${reg.code}','${reg.name}',${reg.gatewayAvailable},${reg.requiresPaidPlan},'POINT(${reg.longitude} ${reg.latitude})')`;
  })
  .join(",\n\t")
  .trimEnd();

const sql = `INSERT INTO regions VALUES\n\t${values}\n;`;

writeFileSync("./magic.sql", sql);
