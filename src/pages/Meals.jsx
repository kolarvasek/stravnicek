import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const Meals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          "https://kolarva23.sps-prosek.cz/api/server.php",
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
          console.error(result.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMeals();
  }, []);

  const deleteMeal = async (ID) => {
    try {
      const response = await fetch(
        "https://kolarva23.sps-prosek.cz/api/deleteMeal.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ id: ID }),
        }
      );
      const result = await response.json();
      if (result.status === true && Number(result.id) === Number(ID)) {
        setMeals((prevMeals) =>
          prevMeals.filter((meal) => Number(meal.ID) !== Number(ID))
        );
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

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

  const renderMeals = (mealList) => {
    if (mealList.length === 0) {
      return (
        <tr>
          <td
            colSpan="6"
            className="py-2 px-4 border-b border-gray-200 text-center text-gray-600 align-middle"
          >
            No meals found
          </td>
        </tr>
      );
    }

    return mealList.map((meal) => (
      <tr key={meal.ID}>
        <td className="py-2 px-4 border-b border-gray-200 text-sm sm:text-base">
          {meal.name}
        </td>
        <td className="py-2 px-4 border-b border-gray-200 text-sm sm:text-base">
          {meal.calories}
        </td>
        <td className="py-2 px-4 border-b border-gray-200 text-sm sm:text-base">
          {meal.protein}
        </td>
        <td className="py-2 px-4 border-b border-gray-200 text-sm sm:text-base">
          {meal.fats}
        </td>
        <td className="py-2 px-4 border-b border-gray-200 text-sm sm:text-base">
          {new Date(meal.time).toLocaleString()}
        </td>
        <td className="py-2 px-4 border-b border-gray-200 text-sm sm:text-base">
          <button
            onClick={() => deleteMeal(meal.ID)}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="p-2 sm:p-6 bg-gray-50 min-h-screen">
      <Navbar />
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-center">
        Meals
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Breakfast */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg overflow-x-auto">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-700">
            Breakfast
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white table-auto border-collapse">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-sm sm:text-base">
                    Name
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-sm sm:text-base">
                    Calories
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-sm sm:text-base">
                    Protein
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-sm sm:text-base">
                    Fats
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-sm sm:text-base">
                    Time
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-sm sm:text-base">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>{renderMeals(breakfast)}</tbody>
            </table>
          </div>
        </div>
        {/* Lunch */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg overflow-x-auto">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-700">
            Lunch
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white table-auto border-collapse">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-sm sm:text-base">
                    Name
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-sm sm:text-base">
                    Calories
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-sm sm:text-base">
                    Protein
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-sm sm:text-base">
                    Fats
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-sm sm:text-base">
                    Time
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-sm sm:text-base">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>{renderMeals(lunch)}</tbody>
            </table>
          </div>
        </div>
        {/* Dinner */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg overflow-x-auto">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-700">
            Dinner
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white table-auto border-collapse">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-sm sm:text-base">
                    Name
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-sm sm:text-base">
                    Calories
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-sm sm:text-base">
                    Protein
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-sm sm:text-base">
                    Fats
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-sm sm:text-base">
                    Time
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-sm sm:text-base">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>{renderMeals(dinner)}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meals;
