import React, { useState, useEffect } from "react";

const CaloriesApi = ({ query }) => {
  const [nutritionData, setNutritionData] = useState(null);
  const apiKey = import.meta.env.VITE_CALORIES_API;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.calorieninjas.com/v1/nutrition?query=${query}`, {
            method: "GET",
            headers: {
              "X-Api-Key": apiKey,
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();
        setNutritionData(result);
      } catch (error) {
        console.error("No data fetch ", error);
      }
    };
    fetchData();
  }, [apiKey, query]);

  const sendNutritionData = async (data) => { // to send data to the server 
    try {
      const response = await fetch(
        "http://localhost/stravnicek/php/server.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data), // convert value to json
        }
      );
      const result = await response.json(); 
      console.log(result);
    } catch (error) {
      console.error("Error sendign; ", error);
    }
  }

  return (
    <div>
      <h1>Nutrition Data</h1>
      {nutritionData ? ( // if nutritionData is not null then display the data else say loading...
        <pre>
          {JSON.stringify(nutritionData, null, 2)}
        </pre>) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CaloriesApi;