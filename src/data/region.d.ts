export interface Region {
  code: string;
  name: string;
  latitude: number;
  longitude: number;
  gatewayAvailable: boolean;
  requiresPaidPlan: boolean;
}

export type Regions = Region[];

export interface PropsWithRegion {
  loc: Region;
}
