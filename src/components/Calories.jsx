import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import Navbar from "../components/Navbar";
import LogInfo from "../components/LogInfo";
import { useNavigate } from "react-router-dom";

const Calories = () => {
  const [chartKalorie, setChartKalorie] = useState([]);
  const [meals, setMeals] = useState([]);

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
        updateChart(result.meals);
      } else {
        console.error("error getting meals ");
      }
    } catch (error) {
      console.error("also error getting meals ", error);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  // graf
  const updateChart = (meals) => {
    const dailyCalories = Array(31).fill(0);
    meals.forEach((meal) => {
      const date = new Date(meal.time);
      const day = date.getDate();
      const calories = Number(meal.calories);
      dailyCalories[day - 1] += calories;
    });
    setChartKalorie(dailyCalories);
  };

  const navigate = useNavigate();
  return (
    <div className="bg-gray-100 min-h-screen overscroll-none">
      <Navbar />
      <div className="pt-24 px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
          {/* Recent Meals */}
          <div className="shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out p-6 rounded-lg bg-slate-200 max-h-96">
            <button
              onClick={() => navigate("/meals")}
              className="w-full h-full"
            >
              <h3 className="text-center text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
                Recent Meals
              </h3>
              <div className="scrollBox overflow-x-auto overflow-y-auto max-h-72">
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
                    </tr>
                  </thead>
                  <tbody>
                    {meals.length > 0 ? (
                      meals.slice(-5).map((meal, index) => (
                        <tr key={index}>
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
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="py-2 px-4 border-b border-gray-200 text-center text-gray-600 align-middle"
                        >
                          No meals found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </button>
          </div>
          {/* Calorie Chart */}
          <div className="shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out p-6 rounded-lg bg-slate-200 max-h-96">
            <div className="flex justify-center">
              <LineChart
                xAxis={[{ data: Array.from({ length: 31 }, (_, i) => i + 1) }]}
                series={[{ data: chartKalorie }]}
                width={window.innerWidth < 768 ? 300 : 500}
                height={window.innerWidth < 768 ? 200 : 300}
              />
            </div>
          </div>
        </div>
        <LogInfo onMealAdded={fetchMeals} />
      </div>
    </div>
  );
};

export default Calories;
