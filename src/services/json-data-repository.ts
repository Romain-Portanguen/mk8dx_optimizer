import { Body } from '../types/body.types';
import { Driver } from '../types/driver.types';
import { Tire } from '../types/tire.types';
import { Glider } from '../types/glider.types';
import { IDataRepository } from './interfaces/data-repository.requirements';

import driversData from '../data/mk8dx_driver_stats.json';
import bodiesData from '../data/mk8dx_body_stats.json';
import tiresData from '../data/mk8dx_tires_stats.json';
import glidersData from '../data/mk8dx_gliders_stats.json';

export class JsonDataRepository implements IDataRepository {
  private static instance: JsonDataRepository;
  private drivers: Driver[];
  private bodies: Body[];
  private tires: Tire[];
  private gliders: Glider[];

  private constructor() {
    this.drivers = driversData.drivers;
    this.bodies = bodiesData.bodies;
    this.tires = tiresData.tires;
    this.gliders = glidersData.gliders;
  }

  public static getInstance(): JsonDataRepository {
    if (!JsonDataRepository.instance) {
      JsonDataRepository.instance = new JsonDataRepository();
    }
    return JsonDataRepository.instance;
  }

  getDrivers(): Driver[] {
    return this.drivers;
  }

  getDriverByName(name: string): Driver | null {
    return this.drivers.find(driver => driver.name === name) || null;
  }

  getBodies(): Body[] {
    return this.bodies;
  }

  getTires(): Tire[] {
    return this.tires;
  }

  getGliders(): Glider[] {
    return this.gliders;
  }
}