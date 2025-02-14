import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import LogInfo from "./LogInfo";

const Dashboard = () => {
  const [meals, setMeals] = useState([]);
  const [dailyPieData, setDailyPieData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const response = await fetch(
        "https://kolarva23.sps-prosek.cz/api/server.php",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const result = await response.json();
      if (result.status === "success" && result.meals) {
        setMeals(result.meals);
        updateCharts(result.meals);
      } else {
        console.error("Error fetching meals");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateCharts = (meals) => {
    const today = new Date().toDateString();
    let breakfast = 0,
      lunch = 0,
      dinner = 0;

    meals.forEach((meal) => {
      const mealTime = new Date(meal.time);
      if (mealTime.toDateString() !== today) return;
      const cal = Number(meal.calories);
      const hour = mealTime.getHours();
      if (hour < 12) breakfast += cal;
      else if (hour < 17) lunch += cal;
      else dinner += cal;
    });

    setDailyPieData([
      { label: "Breakfast", value: breakfast || 1, color: "#FFA726" },
      { label: "Lunch", value: lunch || 1, color: "#66BB6A" },
      { label: "Dinner", value: dinner || 1, color: "#42A5F5" },
    ]);

    // Weekly meal data
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weeklyCalories = new Array(7).fill(0);

    meals.forEach((meal) => {
      const mealTime = new Date(meal.time);
      const dayIndex = mealTime.getDay();
      weeklyCalories[dayIndex] += Number(meal.calories);
    });

    setWeeklyData(weeklyCalories);
  };

  return (
    <div className="max-w-6xl mx-auto pt-16 pb-10 px-6 min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 mb-8 text-center">
        <h1 className="text-4xl font-bold">Stravnicek Dashboard</h1>
        <p className="mt-2 text-lg text-gray-400">
          Monitor your daily and weekly calorie intake.
        </p>
      </div>

      {loading ? (
        <div className="text-center text-xl text-gray-400 animate-pulse">
          Loading data...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Daily Intake Pie Chart */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-center mb-4">
              Daily Intake Breakdown
            </h2>
            <div className="flex justify-center">
              <PieChart
                series={[{ data: dailyPieData }]}
                width={300}
                height={300}
              />
            </div>
          </div>

          {/* Weekly Intake Bar Chart */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-center mb-4">
              Weekly Meal Breakdown
            </h2>
            <div className="flex justify-center">
              {weeklyData.every((val) => val === 0) ? (
                <p className="text-gray-400 text-center">No data available</p>
              ) : (
                <BarChart
                  xAxis={[
                    {
                      scaleType: "band",
                      data: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    },
                  ]}
                  series={[{ data: weeklyData, color: "#E91E63" }]}
                  width={500}
                  height={300}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Log Meal Section */}
      <div className="mt-8 bg-gray-800 rounded-lg shadow-lg p-6">
        <LogInfo onMealAdded={fetchMeals} />
      </div>
    </div>
  );
};

export default Dashboard;
