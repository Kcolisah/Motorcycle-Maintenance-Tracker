window.MT_COMPARE_ROW_DEFINITIONS = [
  {
    label: "Category",
    detail: "Bike type",
    key: "category",
    type: "text"
  },
  {
    label: "Year",
    detail: "Model year",
    key: "year",
    type: "text"
  },
  {
    label: "Price",
    detail: "Starting price",
    key: "price",
    type: "number",
    lowerWins: true,
    formatter: "currency",
    unit: "value"
  },
  {
    label: "Engine",
    detail: "Configuration",
    key: "engine",
    type: "text"
  },
  {
    label: "Horsepower",
    detail: "Peak output",
    key: "horsepowerValue",
    displayKey: "horsepower",
    type: "number",
    higherWins: true,
    formatter: "horsepower",
    unit: "power"
  },
  {
    label: "Weight",
    detail: "Curb / wet weight",
    key: "weightLbs",
    displayKey: "weight",
    type: "number",
    lowerWins: true,
    formatter: "weight",
    unit: "weight"
  },
  {
    label: "0–60 mph",
    detail: "Acceleration",
    key: "zeroToSixtySeconds",
    displayKey: "zeroSixty",
    type: "number",
    lowerWins: true,
    formatter: "acceleration",
    unit: "acceleration"
  },
  {
    label: "Top Speed",
    detail: "Estimated max speed",
    key: "topSpeedMph",
    displayKey: "topSpeed",
    type: "number",
    higherWins: true,
    formatter: "speed",
    unit: "speed"
  },
  {
    label: "Power / Weight",
    detail: "Horsepower per pound",
    key: "powerToWeight",
    type: "number",
    higherWins: true,
    formatter: "powerToWeight",
    unit: "ratio"
  }
];
