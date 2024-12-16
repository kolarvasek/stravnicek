import React, { useState, useEffect } from "react";

const CaloriesApi = ({ query }) => {
  const [nutritionData, setNutritionData] = useState(null);
  const apiKey = import.meta.env.VITE_CALORIES_API;

  // Fetch data from the CalorieNinjas API
  useEffect(() => {
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

        // Send nutrition data to the backend
        if (result.items && result.items.length > 0) {
          await sendNutritionData(result.items);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [apiKey, query]);

  // Send nutrition data to the backend
  const sendNutritionData = async (data) => {
    try {
      const response = await fetch(
        "http://localhost/stravnicek/php/server.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ items: data }), // Convert value to JSON
        }
      );

      const text = await response.text();
      console.log("Raw response:", text);

      // Parse response only if it's valid JSON
      let parsedResponse;
      try {
        parsedResponse = JSON.parse(text);
        console.log(parsedResponse);
      } catch (error) {
        console.error("Error parsing JSON response:", text);
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div>
      <h1>Nutrition Data</h1>
      {nutritionData ? (
        <div>
          {nutritionData.items.map((item, index) => (
            <div key={index}>
              <h2>{item.name}</h2>
              <ul>
                <li>Calories: {item.calories}</li>
                <li>Protein: {item.protein_g}</li>
                <li>Carbs: {item.carbohydrates_total_g}g</li>
                <li>Fat: {item.fat_total_g}g</li>
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CaloriesApi;
