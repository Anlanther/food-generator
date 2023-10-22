import { Cuisine } from "./cuisine.model";
import { Location } from "./location.model";
import { Meal } from "./meal.model";

export interface Restaurant {
  name: string;
  cuisine: Cuisine;
  location: Location;
  meal: Meal;
}
