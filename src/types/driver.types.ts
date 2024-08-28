import { Statistics } from "./statistics.types";

export interface Driver {
  name: string;
  shortName: string;
  stats: Statistics;
}