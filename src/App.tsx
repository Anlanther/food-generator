import { useEffect, useState } from "react";
import "./App.css";
import { RESTAURANTS } from "./constants/restaurant";
import { CUISINES, Cuisine } from "./models/cuisine.model";
import { LOCATIONS, Location } from "./models/location.model";
import { Meal } from "./models/meal.model";
import { Restaurant } from "./models/restaurant.model";

const NO_RESULTS = "Click the button to pick a place to eat";

const App = () => {
  const [answer, setAnswer] = useState<Restaurant>();
  const [filtered, setFiltered] = useState<Restaurant[]>(RESTAURANTS);
  const [history, setHistory] = useState<string[]>([]);
  const [cuisine, setCuisine] = useState<Cuisine>();
  const [locations, setLocations] = useState({
    parkCentral: false,
    popWalk: false,
    tkoPlaza: false,
    seaside: false,
    popcorn: false,
    tkoSpot: false,
  });

  useEffect(() => {
    const filtered = RESTAURANTS.filter((rest) => {
      const selectedLocations: Location[] = [];
      const objectArray = Object.entries(locations);
      objectArray.forEach((array) => {
        const translatedLocation = getLocation(array[0]);
        if (array[1]) selectedLocations.push(translatedLocation);
      });

      const cuisineMatch =
        cuisine === undefined ? true : rest.cuisine === cuisine;
      const locationsMatch = selectedLocations.includes(rest.location);

      return cuisineMatch && locationsMatch;
    });
    setFiltered(filtered);
  }, [cuisine, locations]);

  const getLocation = (location: string) => {
    if (location === "parkCentral") return Location.PARK_CENTRAL;
    if (location === "popWalk") return Location.POP_WALK;
    if (location === "tkoPlaza") return Location.TKO_PLAZA;
    if (location === "seaside") return Location.SEASIDE;
    if (location === "popcorn") return Location.POPCORN;
    if (location === "tkoSpot") return Location.TKO_SPOT;
    else throw new Error();
  };

  const generateRandom = (type?: Meal) => {
    if (!type) {
      const generatedAnswer =
        filtered[Math.floor(Math.random() * filtered.length)];
      generatedAnswer &&
        setHistory([
          ...history,
          `${generatedAnswer.name}, ${generatedAnswer.location}`,
        ]);
      return setAnswer(generatedAnswer ?? NO_RESULTS);
    }

    const filteredByMeal = filtered.filter(
      (rest) => rest.meal === type || rest.meal === "both"
    );
    const generatedAnswer =
      filteredByMeal[Math.floor(Math.random() * filteredByMeal.length)];
    generatedAnswer &&
      setHistory([
        ...history,
        `${generatedAnswer.name}, ${generatedAnswer.location}`,
      ]);
    setAnswer(generatedAnswer ?? NO_RESULTS);
  };

  const clear = () => {
    setAnswer(undefined);
    setFiltered(RESTAURANTS);
    setHistory([]);
    setCuisine(undefined);
  };

  const updateCuisine = (event: any) => {
    const selectValue: Cuisine | undefined =
      event.target.value === "" ? undefined : event.target.value;

    setCuisine(selectValue);
  };

  const updateLocations = (event: any) => {
    const value: string = event.target.value;

    if (value === Location.PARK_CENTRAL) {
      setLocations({ ...locations, parkCentral: !locations.parkCentral });
    } else if (value === Location.POPCORN) {
      setLocations({ ...locations, popcorn: !locations.popcorn });
    } else if (value === Location.POP_WALK) {
      setLocations({ ...locations, popWalk: !locations.popWalk });
    } else if (value === Location.SEASIDE) {
      setLocations({ ...locations, seaside: !locations.seaside });
    } else if (value === Location.TKO_PLAZA) {
      setLocations({ ...locations, tkoPlaza: !locations.tkoPlaza });
    } else if (value === Location.TKO_SPOT) {
      setLocations({ ...locations, tkoSpot: !locations.tkoSpot });
    }
  };

  return (
    <>
      <h1>Where to Eat?</h1>
      {answer && (
        <>
          <h2>{answer.name}</h2>
          <p>{answer.location}</p>
        </>
      )}
      <div>
        <button
          className="quick-button"
          type="button"
          onClick={() => generateRandom()}
        >
          Generate Random
        </button>
        <button
          className="quick-button"
          type="button"
          onClick={() => generateRandom("lunch")}
        >
          Generate Lunch
        </button>
        <button
          className="quick-button"
          type="button"
          onClick={() => generateRandom("dinner")}
        >
          Generate Dinner
        </button>
      </div>
      <div style={{ marginTop: "3px", marginBottom: "9px" }}>
        <select onChange={updateCuisine} value={cuisine} name="cuisine">
          <option value="">Any Cuisine</option>
          {CUISINES.map((cuisine) => (
            <option key={cuisine} value={cuisine}>
              {cuisine}
            </option>
          ))}
        </select>
      </div>
      {LOCATIONS.map((location, i) => (
        <span key={`l${i}`}>
          <input
            type="checkbox"
            key={location}
            name={location}
            value={location}
            onChange={updateLocations}
          />
          <label key={i}>{location}</label>
        </span>
      ))}
      <div>
        <button className="quick-button" type="button" onClick={clear}>
          Clear
        </button>
      </div>
      <p>Last 3 history:</p>
      {history.length <= 3
        ? history.map((item, i) => <p key={i}>{item}</p>)
        : history
            .slice(history.length - 3)
            .map((item, i) => <p key={i}>{item}</p>)}
    </>
  );
};
export default App;
