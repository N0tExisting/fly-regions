export default function regionsToSql(
  /** @type {import('../region').Regions} */ data
) {
  const values = data
    .map((reg) => {
      return `('${reg.code}','${reg.name}',${reg.gatewayAvailable},${reg.requiresPaidPlan},'POINT(${reg.longitude} ${reg.latitude})')`;
    })
    .join(",\n\t")
    .trimEnd();

  const sql = `INSERT INTO regions VALUES\n\t${values}\n;`;
  return sql;
}
