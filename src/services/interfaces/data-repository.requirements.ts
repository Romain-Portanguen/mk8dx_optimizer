import { Body } from "../../types/body.types";
import { Driver } from "../../types/driver.types";
import { Glider } from "../../types/glider.types";
import { Tire } from "../../types/tire.types";

export interface IDataRepository {
  getDrivers(): Driver[];
  getDriverByName(name: string): Driver | null;
  getBodies(): Body[];
  getTires(): Tire[];
  getGliders(): Glider[];
}