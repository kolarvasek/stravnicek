import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Modal from "@mui/material/Modal";
import { mealInfo } from "../components/Mealinfo";


const Meals = () => {
  const [open, setOpen] = useState(false);
  const [nutritionData, setNutritionData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMeals, setFilteredMeals] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const meals = [
    { name: "Egg", calories: 100, type: "Breakfast" },
    { name: "Chicken Salad", calories: 200, type: "Lunch" },
    { name: "Steak", calories: 300, type: "Dinner" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (!searchQuery) {
        setFilteredMeals(meals);
        return;
      }

      try {
        const response = await fetch(
          `https://api.calorieninjas.com/v1/nutrition?query=${searchQuery}`,
          {
            method: "GET",
            headers: {
              "X-Api-Key": import.meta.env.VITE_CALORIES_API,
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();
        setNutritionData(result);
        setFilteredMeals(
          meals.filter((meal) =>
            meal.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      } catch (error) {
        console.error("error getting data", error);
      }
    };

    fetchData();
  }, [searchQuery]);

  return (
    <div className="bg-gray-100 min-h-screen overscroll-none">
      <Navbar />
      <div className="pt-24 px-4 md:px-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Meals</h1>
        <input
          type="text"
          placeholder="Search for meals"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-50 p-2 mb-4 border border-gray-300 rounded-md"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {filteredMeals.map((meal, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 h-64 overflow-y-auto"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {meal.type}
              </h2>
              <p className="text-gray-600">{meal.name}</p>
              <button
                onClick={handleOpen}
                className="mt-2 bg-slate-100 text-black p-2 rounded-md w-full flex justify-between items-center"
              >
                <p>{meal.name}</p>
                <p>{meal.calories}</p>
              </button>
            </div>
          ))}
        </div>
      </div>

      <Modal open={open} onClose={handleClose}>
        <div className="flex justify-center items-center h-screen bg-black bg-opacity-50">
          <div className="bg-white text-black shadow-lg rounded-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Your meal
            </h2>
            <p>Data from databse</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Meals;
