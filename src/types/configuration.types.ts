import { Body } from "./body.types";
import { Driver } from "./driver.types";
import { Glider } from "./glider.types";
import { Tire } from "./tire.types";

export interface Configuration {
  body: Body;
  driver?: Driver;
  tire: Tire;
  glider: Glider;
}
