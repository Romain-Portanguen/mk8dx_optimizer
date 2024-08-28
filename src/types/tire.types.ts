import { Statistics } from "./statistics.types";

export interface Tire {
  name: string;
  alternativeName?: string;
  stats: Statistics;
}