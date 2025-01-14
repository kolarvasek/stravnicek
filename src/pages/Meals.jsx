import React, { useState, useEffect } from "react";
import MealModal from "../components/MealModal";
import Navbar from "../components/Navbar";

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    // Fetch meals from the server
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          "http://localhost/stravnicek/php/server.php",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const result = await response.json();
        if (result.status === "success") {
          setMeals(result.meals);
        } else {
          console.error("error getting meals", result.message);
        }
      } catch (error) {
        console.error("also error getting meals", error);
      }
    };

    fetchMeals();
  }, []);

  const categorizeMeals = (meals) => {
    const breakfast = meals.filter(
      (meal) => new Date(meal.time).getHours() < 12
    );
    const lunch = meals.filter(
      (meal) =>
        new Date(meal.time).getHours() >= 12 &&
        new Date(meal.time).getHours() < 17
    );
    const dinner = meals.filter((meal) => new Date(meal.time).getHours() >= 17);
    return { breakfast, lunch, dinner };
  };

  const { breakfast, lunch, dinner } = categorizeMeals(meals);

  return (
    <div className="p-4">
        <Navbar />
      <h2 className="text-2xl mb-4">Meals</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h3 className="text-xl mb-2">Breakfast</h3>
          <table className="min-w-full bg-white">
            {breakfast.length > 0 ? (
              breakfast.map((meal, index) => (
                <tr key={index} onClick={() => setSelectedMeal(meal)}>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {meal.name}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {meal.calories}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {meal.time}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="py-2 px-4 border-b border-gray-200 text-center"
                >
                  No meals found
                </td>
              </tr>
            )}
          </table>
        </div>
        <div>
          <h3 className="text-xl mb-2">Lunch</h3>
          <table className="min-w-full bg-white">
            {lunch.length > 0 ? (
              lunch.map((meal, index) => (
                <tr key={index} onClick={() => setSelectedMeal(meal)}>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {meal.name}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {meal.calories}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {meal.time}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="py-2 px-4 border-b border-gray-200 text-center"
                >
                  No meals found
                </td>
              </tr>
            )}
          </table>
        </div>
        <div>
          <h3 className="text-xl mb-2">Dinner</h3>
          <table className="min-w-full bg-white">
            {dinner.length > 0 ? (
              dinner.map((meal, index) => (
                <tr key={index} onClick={() => setSelectedMeal(meal)}>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {meal.name}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {meal.calories}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {meal.time}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="py-2 px-4 border-b border-gray-200 text-center"
                >
                  No meals found
                </td>
              </tr>
            )}
          </table>
        </div>
      </div>
      {selectedMeal && (
        <MealModal meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
      )}
    </div>
  );
};

export default Meals;
