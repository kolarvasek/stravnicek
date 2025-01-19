import React, { useState, useEffect } from "react";
import { mealInfo } from "../components/Mealinfo";

const CaloriesApi = ({ query }) => {
  const [nutritionData, setNutritionData] = useState(null);
  const apiKey = import.meta.env.VITE_CALORIES_API;

  useEffect(() => { // kdyz poslu input tak to posle dotaz na api a vrati nut. hodnoty
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.calorieninjas.com/v1/nutrition?query=${query}`,
          {
            method: "GET",
            headers: {
              "X-Api-Key": apiKey,
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();
        setNutritionData(result);

        if (result.items && result.items.length > 0) {
          await sendNutritionData(result.items); // posilam na backend(server.php)
        }
      } catch (error) {
        console.error("error getting data:", error);
      }
    };
    fetchData();
  }, [apiKey, query]);

  const sendNutritionData = async (data) => { // jsou ty data posilani
    try {
      const response = await fetch(
        "https://kolarva23.sps-prosek.cz/api/server.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ items: data }), // prevod na json 
        }
      );

      const text = await response.text();
      console.log("Raw response:", text);

      let parsedResponse;
      try {
        parsedResponse = JSON.parse(text);
        console.log(parsedResponse);
      } catch (error) {
        console.error("error with json data", text);
      }
    } catch (error) {
      console.error("error sending data", error);
    }
  };

  return (
    <div>
      <h1>Nutrition Data</h1>
    </div>
  );
};

export default CaloriesApi;
