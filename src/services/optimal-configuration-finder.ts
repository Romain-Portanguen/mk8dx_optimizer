import { Configuration } from "../types/configuration.types";
import { IConfigurationScorer } from "./interfaces/configuration-scrorer.requirements";
import { IDataRepository } from "./interfaces/data-repository.requirements";
import { Driver } from "../types/driver.types";
import { Body } from "../types/body.types";
import { Tire } from "../types/tire.types";
import { Glider } from "../types/glider.types";

export class OptimalConfigurationFinder {
  private readonly dataRepository: IDataRepository;
  private readonly configurationScorer: IConfigurationScorer;

  // Algorithmic parameters
  private readonly INITIAL_MUTATION_RATE = 0.4;
  private readonly TOURNAMENT_SIZE = 3;
  private readonly POPULATION_SIZE = 100;
  private readonly GENERATIONS = 200;
  private readonly RESET_THRESHOLD = 20;
  private readonly ELITE_PERCENTAGE = 0.1;
  private readonly LOCAL_SEARCH_ITERATIONS = 10;
  private readonly DIVERSITY_THRESHOLD = 0.3;
  private readonly MEMORY_SIZE = 10;

  // Mutation rate adaptation
  private readonly MAX_MUTATION_RATE = 0.9;
  private readonly MUTATION_RATE_INCREASE_FACTOR = 1.5;
  private readonly MUTATION_RATE_DECREASE_FACTOR = 0.9;

  // Intelligent reset
  private readonly RESET_POPULATION_PERCENTAGE = 0.7;
  private readonly AGGRESSIVE_MUTATION_PROBABILITY = 0.7;
  private readonly TOP_CONFIGS_TO_KEEP = 5;

  constructor(dataRepository: IDataRepository, configurationScorer: IConfigurationScorer) {
    this.dataRepository = dataRepository;
    this.configurationScorer = configurationScorer;
  }

  findOptimalConfiguration(driverName: string, raceProfile = 'balanced'): Configuration | null {
    const driver = this.dataRepository.getDriverByName(driverName);
    if (!driver) {
      return null;
    }

    const [bodies, tires, gliders] = [
      this.dataRepository.getBodies(),
      this.dataRepository.getTires(),
      this.dataRepository.getGliders()
    ];

    return this.runGeneticAlgorithm(driver, bodies, tires, gliders, raceProfile);
  }

  private runGeneticAlgorithm(driver: Driver, bodies: Body[], tires: Tire[], gliders: Glider[], raceProfile: string): Configuration | null {
    let population = this.initializePopulation(bodies, tires, gliders);
    let bestConfiguration: Configuration | null = null;
    let bestScore = -Infinity;
    let generationsWithoutImprovement = 0;
    let memory: Configuration[] = [];
    let mutationRate = this.INITIAL_MUTATION_RATE;

    for (let generation = 0; generation < this.GENERATIONS; generation++) {
      const { bestConfig, bestScore: currentBestScore, scoredPopulation } = this.evaluatePopulation(population, driver, raceProfile);

      if (currentBestScore > bestScore) {
        bestScore = currentBestScore;
        bestConfiguration = bestConfig;
        generationsWithoutImprovement = 0;
        this.updateMemory(memory, bestConfig);
      } else {
        generationsWithoutImprovement++;
      }

      if (this.shouldReset(generationsWithoutImprovement, population)) {
        this.performIntelligentReset(population, scoredPopulation, bodies, tires, gliders, memory);
        generationsWithoutImprovement = 0;
        mutationRate = this.INITIAL_MUTATION_RATE;
      } else {
        mutationRate = this.adaptMutationRate(mutationRate, population);
      }

      population = this.evolvePopulation(scoredPopulation, bodies, tires, gliders, mutationRate);
      this.localSearch(population[0], driver, raceProfile, bodies, tires, gliders);
    }

    return bestConfiguration;
  }

  private initializePopulation(bodies: Body[], tires: Tire[], gliders: Glider[]): Configuration[] {
    return Array.from({ length: this.POPULATION_SIZE }, () => this.createRandomConfiguration(bodies, tires, gliders));
  }

  private createRandomConfiguration(bodies: Body[], tires: Tire[], gliders: Glider[]): Configuration {
    return {
      body: this.getRandomElement(bodies),
      tire: this.getRandomElement(tires),
      glider: this.getRandomElement(gliders)
    };
  }

  private getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  private evaluatePopulation(population: Configuration[], driver: Driver, raceProfile: string) {
    const scoredPopulation = population
      .map(config => ({
        configuration: config,
        score: this.configurationScorer.scoreConfiguration(driver, config, raceProfile)
      }))
      .sort((a, b) => b.score - a.score);

    return {
      bestConfig: scoredPopulation[0].configuration,
      bestScore: scoredPopulation[0].score,
      scoredPopulation
    };
  }

  private performIntelligentReset(population: Configuration[], scoredPopulation: { configuration: Configuration; score: number }[], bodies: Body[], tires: Tire[], gliders: Glider[], memory: Configuration[]): void {
    const resetCount = Math.floor(this.POPULATION_SIZE * this.RESET_POPULATION_PERCENTAGE);
    const bestConfigs = [...scoredPopulation.slice(0, this.TOP_CONFIGS_TO_KEEP).map(item => item.configuration), ...memory];

    for (let i = 0; i < resetCount; i++) {
      const baseConfig = this.getRandomElement(bestConfigs);
      population[this.POPULATION_SIZE - 1 - i] = this.mutateAggressively(baseConfig, bodies, tires, gliders);
    }
  }

  private mutateAggressively(config: Configuration, bodies: Body[], tires: Tire[], gliders: Glider[]): Configuration {
    return {
      body: Math.random() < this.AGGRESSIVE_MUTATION_PROBABILITY ? this.getRandomElement(bodies) : config.body,
      tire: Math.random() < this.AGGRESSIVE_MUTATION_PROBABILITY ? this.getRandomElement(tires) : config.tire,
      glider: Math.random() < this.AGGRESSIVE_MUTATION_PROBABILITY ? this.getRandomElement(gliders) : config.glider
    };
  }

  private evolvePopulation(scoredPopulation: { configuration: Configuration; score: number }[], bodies: Body[], tires: Tire[], gliders: Glider[], mutationRate: number): Configuration[] {
    const eliteCount = Math.floor(this.POPULATION_SIZE * this.ELITE_PERCENTAGE);
    const elites = scoredPopulation.slice(0, eliteCount).map(item => item.configuration);
    const newPopulation = [...elites];

    while (newPopulation.length < this.POPULATION_SIZE) {
      const parent1 = this.tournamentSelection(scoredPopulation);
      const parent2 = this.tournamentSelection(scoredPopulation);
      const child = this.crossover(parent1, parent2);
      this.mutate(child, bodies, tires, gliders, mutationRate);
      newPopulation.push(child);
    }

    return newPopulation;
  }

  private tournamentSelection(scoredPopulation: { configuration: Configuration; score: number }[]): Configuration {
    const tournament = Array.from({ length: this.TOURNAMENT_SIZE }, () => scoredPopulation[Math.floor(Math.random() * scoredPopulation.length)]);
    return tournament.reduce((best, current) => current.score > best.score ? current : best).configuration;
  }

  private crossover(parent1: Configuration, parent2: Configuration): Configuration {
    return {
      body: Math.random() < 0.5 ? parent1.body : parent2.body,
      tire: Math.random() < 0.5 ? parent1.tire : parent2.tire,
      glider: Math.random() < 0.5 ? parent1.glider : parent2.glider
    };
  }

  private mutate(configuration: Configuration, bodies: Body[], tires: Tire[], gliders: Glider[], mutationRate: number): void {
    if (Math.random() < mutationRate) configuration.body = this.getRandomElement(bodies);
    if (Math.random() < mutationRate) configuration.tire = this.getRandomElement(tires);
    if (Math.random() < mutationRate) configuration.glider = this.getRandomElement(gliders);
  }

  private localSearch(config: Configuration, driver: Driver, raceProfile: string, bodies: Body[], tires: Tire[], gliders: Glider[]): void {
    let bestLocalConfig = config;
    let bestLocalScore = this.configurationScorer.scoreConfiguration(driver, config, raceProfile);

    for (let i = 0; i < this.LOCAL_SEARCH_ITERATIONS; i++) {
      const neighbor = this.getRandomNeighbor(bestLocalConfig, bodies, tires, gliders);
      const neighborScore = this.configurationScorer.scoreConfiguration(driver, neighbor, raceProfile);

      if (neighborScore > bestLocalScore) {
        bestLocalConfig = neighbor;
        bestLocalScore = neighborScore;
      }
    }

    Object.assign(config, bestLocalConfig);
  }

  private getRandomNeighbor(config: Configuration, bodies: Body[], tires: Tire[], gliders: Glider[]): Configuration {
    const neighbor = { ...config };
    const componentToChange = Math.floor(Math.random() * 3);

    switch (componentToChange) {
      case 0:
        neighbor.body = this.getRandomElement(bodies.filter(b => b !== config.body));
        break;
      case 1:
        neighbor.tire = this.getRandomElement(tires.filter(t => t !== config.tire));
        break;
      case 2:
        neighbor.glider = this.getRandomElement(gliders.filter(g => g !== config.glider));
        break;
    }

    return neighbor;
  }

  private calculateDiversity(population: Configuration[]): number {
    const uniqueConfigurations = new Set(population.map(config => JSON.stringify(config)));
    return uniqueConfigurations.size / population.length;
  }

  private adaptMutationRate(currentRate: number, population: Configuration[]): number {
    const diversity = this.calculateDiversity(population);
    if (diversity < this.DIVERSITY_THRESHOLD) {
      return Math.min(currentRate * this.MUTATION_RATE_INCREASE_FACTOR, this.MAX_MUTATION_RATE);
    } else {
      return Math.max(currentRate * this.MUTATION_RATE_DECREASE_FACTOR, this.INITIAL_MUTATION_RATE);
    }
  }

  private updateMemory(memory: Configuration[], config: Configuration): void {
    if (!memory.some(c => JSON.stringify(c) === JSON.stringify(config))) {
      memory.push(config);
      if (memory.length > this.MEMORY_SIZE) {
        memory.shift();
      }
    }
  }

  private shouldReset(generationsWithoutImprovement: number, population: Configuration[]): boolean {
    return generationsWithoutImprovement >= this.RESET_THRESHOLD || this.calculateDiversity(population) < this.DIVERSITY_THRESHOLD;
  }

  private logGenerationInfo(generation: number, bestScore: number, mutationRate: number, population: Configuration[]): void {
    console.log(`Generation ${generation + 1}, Best Score: ${bestScore}, Mutation Rate: ${mutationRate.toFixed(2)}`);
    console.log(`Population Diversity: ${this.calculateDiversity(population).toFixed(2)}`);
  }
}
