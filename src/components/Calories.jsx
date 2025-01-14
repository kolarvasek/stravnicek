import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import Navbar from "../components/Navbar";
import LogInfo from "../components/LogInfo";
import { useNavigate } from "react-router-dom";

const Calories = () => {
  const [kalorie, setKalorie] = useState(0);
  const [chartKalorie, setChartKalorie] = useState([]);
  const [meals, setMeals] = useState([]);

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
        updateChart(result.meals);
      } else {
        console.error("error geting meals ", result.message);
      }
    } catch (error) {
      console.error("also error getting meals ", error);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const updateChart = (meals) => {
    const dailyCalories = Array(31).fill(0);
    meals.forEach((meal) => {
      const date = new Date(meal.time);
      const day = date.getDate();
      dailyCalories[day - 1] += meal.calories;
    });
    setChartKalorie(dailyCalories);
  };

  const navigate = useNavigate();
  return (
    <div className="bg-gray-100 min-h-screen overscroll-none">
      <Navbar />
      <div className="pt-24 px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
          <button
            className="shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out p-6 rounded-lg bg-slate-200 max-h-96"
            onClick={() => navigate("/meals")}
          >
            <h3 className="text-center text-2xl font-semibold text-gray-800 mb-4">
              Recent Meals
            </h3>
            <div className="scrollBox overflow-x-hidden overflow-y-auto max-h-72">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                      Calories
                    </th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {meals.length > 0 ? (
                    meals.map((meal, index) => (
                      <tr key={index}>
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
                        className="py-2 px-4 border-b border-gray-200 text-center text-gray-600"
                      >
                        No meals found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </button>
          <div className="shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out p-6 rounded-lg bg-slate-200 max-h-96">
            <div className="flex justify-center">
              <LineChart
                xAxis={[{ data: Array.from({ length: 31 }, (_, i) => i + 1) }]}
                series={[{ data: chartKalorie }]}
                width={500}
                height={300}
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
