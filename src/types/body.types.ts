import { Statistics } from "./statistics.types";

export interface Body {
  name: string;
  alternativeName?: string;
  stats: Statistics;
}