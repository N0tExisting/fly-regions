import { readFile } from "node:fs/promises";

/** @typedef {{ data: { platform: { regions: import('../region').Regions } } }} ApiResponse */
/** @typedef {{error: unknown}} ApiError */
/** @typedef {ApiError | ApiResponse} ApiResult */

export default async function getRegions() {
  const response = await fetch("https://api.fly.io/graphql", {
    method: "POST",
    // TODO: use paths relative to current file
    body: await readFile("../graphql/query.gql"),
    headers: {
      // TODO: Get the token safely
      Authorization: "FlyV1 <rest-of-token>",
    },
  });
  /** @type ApiResult */
  const result = await response.json();
  if ("error" in result)
    throw new Error("Error getting the Regions", {
      cause: { response, error },
    });
  const regions = result.data.platform.regions;

  return regions;
}
