import { Configuration } from "../types/configuration.types";
import { Driver } from "../types/driver.types";
import { Statistics } from "../types/statistics.types";
import { IConfigurationScorer } from "./interfaces/configuration-scrorer.requirements";

export class ConfigurationScorer implements IConfigurationScorer {
  private scoreCache: Map<string, number> = new Map();
  private readonly MAX_STAT = 12;

  scoreConfiguration(driver: Driver, configuration: Configuration, raceProfile: string = 'balanced'): number {
    const cacheKey = this.getCacheKey(driver, configuration, raceProfile);
    if (this.scoreCache.has(cacheKey)) {
      return this.scoreCache.get(cacheKey)!;
    }

    const totalStats = this.combinedStats(driver, configuration);
    const score = this.calculateScore(totalStats, driver, raceProfile);

    this.scoreCache.set(cacheKey, score);
    return score;
  }

  getMaxPossibleScore(raceProfile: string): number {
    const weights = this.getWeights(raceProfile);
    let maxScore = 0;

    for (const [key, weight] of Object.entries(weights)) {
      maxScore += this.MAX_STAT * weight;
    }

    maxScore *= this.calculateSynergyBonus({ 
      Weight: this.MAX_STAT,
      Acceleration: this.MAX_STAT,
      'On-Road traction': this.MAX_STAT,
      'Off-Road Traction': this.MAX_STAT,
      'Mini-Turbo': this.MAX_STAT,
      'Ground Speed': this.MAX_STAT,
      'Water Speed': this.MAX_STAT,
      'Anti-Gravity Speed': this.MAX_STAT,
      'Air Speed': this.MAX_STAT,
      'Ground Handling': this.MAX_STAT,
      'Water Handling': this.MAX_STAT,
      'Anti-Gravity Handling': this.MAX_STAT,
      'Air Handling': this.MAX_STAT,
      Invincibility: this.MAX_STAT
    });

    return maxScore;
  }

  private getCacheKey(driver: Driver, configuration: Configuration, raceProfile: string): string {
    return `${driver.name}-${configuration.body.name}-${configuration.tire.name}-${configuration.glider.name}-${raceProfile}`;
  }

  private combinedStats(driver: Driver, configuration: Configuration): Statistics {
    return Object.entries(driver.stats).reduce((totalStats, [key, value]) => {
      totalStats[key as keyof Statistics] = value +
        configuration.body.stats[key as keyof Statistics] +
        configuration.tire.stats[key as keyof Statistics] +
        configuration.glider.stats[key as keyof Statistics];
      return totalStats;
    }, {} as Statistics);
  }

  private calculateScore(stats: Statistics, driver: Driver, raceProfile: string): number {
    const weights = this.getWeights(raceProfile);

    const speedScore = this.calculateAverageScore(stats, ['Ground Speed', 'Water Speed', 'Anti-Gravity Speed', 'Air Speed']);
    const handlingScore = this.calculateAverageScore(stats, ['Ground Handling', 'Water Handling', 'Anti-Gravity Handling', 'Air Handling']);
    const tractionScore = this.calculateAverageScore(stats, ['On-Road traction', 'Off-Road Traction']);

    let score = 0;
    score += this.calculateStatScore(speedScore, weights.Speed);
    score += this.calculateStatScore(stats.Acceleration, weights.Acceleration);
    score += this.calculateStatScore(handlingScore, weights.Handling);
    score += this.calculateStatScore(tractionScore, weights.Traction);
    score += this.calculateStatScore(stats['Mini-Turbo'], weights.MiniTurbo);
    score += this.calculateStatScore(stats.Weight, weights.Weight);
    score += this.calculateStatScore(stats.Invincibility, weights.Invincibility);

    score *= this.calculateSynergyBonus(stats);

    return score;
  }

  private calculateStatScore(statValue: number, weight: number): number {
    return Math.min(statValue, this.MAX_STAT) * weight;
  }

  private calculateSynergyBonus(stats: Statistics): number {
    const balance = this.calculateBalance(stats);
    return 1 + (balance / 100);
  }

  private calculateBalance(stats: Statistics): number {
    const values = Object.values(stats);
    const average = values.reduce((sum, value) => sum + value, 0) / values.length;
    const variance = values.reduce((sum, value) => sum + Math.pow(value - average, 2), 0) / values.length;
    return Math.max(0, 100 - Math.sqrt(variance));
  }

  private calculateAverageScore(stats: Statistics, keys: (keyof Statistics)[]): number {
    return keys.reduce((sum, key) => sum + (stats[key] || 0), 0) / keys.length;
  }

  private calculateBalanceScore(totalStat: number, driverStat: number): number {
    const improvement = Math.max(0, Math.min(totalStat - driverStat, this.MAX_STAT - driverStat));
    const balanceFactor = 1 - Math.abs(this.MAX_STAT/2 - totalStat) / (this.MAX_STAT/2);
    return improvement * balanceFactor;
  }

  private getWeights(raceProfile: string): { [key: string]: number } {
    const weights = {
      speed: { Speed: 3, Acceleration: 1.5, Handling: 2, Traction: 1, MiniTurbo: 1.5, Weight: 1, Invincibility: 0.5 },
      technical: { Speed: 2, Acceleration: 2, Handling: 3, Traction: 2, MiniTurbo: 2, Weight: 0.5, Invincibility: 0.5 },
      offroad: { Speed: 2, Acceleration: 2, Handling: 2, Traction: 3, MiniTurbo: 2, Weight: 1, Invincibility: 0.5 },
      balanced: { Speed: 2.5, Acceleration: 2, Handling: 2, Traction: 1.5, MiniTurbo: 1.5, Weight: 1, Invincibility: 0.5 }
    };
    return weights[raceProfile as keyof typeof weights] || weights.balanced;
  }
}