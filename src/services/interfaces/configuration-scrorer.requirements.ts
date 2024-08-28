import { Configuration } from "../../types/configuration.types";
import { Driver } from "../../types/driver.types";

export interface IConfigurationScorer {
  scoreConfiguration(driver: Driver, configuration: Configuration, raceProfile?: string): number;
  getMaxPossibleScore(raceProfile: string): number;
}