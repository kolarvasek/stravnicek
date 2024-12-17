import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import Navbar from "../components/Navbar";
import LogInfo from "../components/LogInfo";
import { useNavigate } from "react-router-dom";

const Calories = () => {
  const [kalorie, setKalorie] = useState(0);
  const [chartKalorie, setChartKalorie] = useState([]);
  
  useEffect(() => {
    setChartKalorie([kalorie]);
  }, [kalorie]);

  const navigate = useNavigate();
  return (
    <div className="bg-gray-100 min-h-screen overscroll-none">
      <Navbar />
      <div className="pt-24 px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
          <button 
          className="shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out p-6 rounded-lg bg-slate-200 max-h-96"
          onClick={() => navigate("/meals")}>
              <h3 className="text-center text-2xl font-semibold text-gray-800 mb-4">
                Recent Meals
              </h3>
              <div className="scrollBox overflow-x-hidden overflow-y-auto max-h-72">
                <p className="text-center text-gray-600">Meals from database</p>
              </div>
          </button>
          <div className="shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out p-6 rounded-lg bg-slate-200 max-h-96">
            <div className="flex justify-center">
              <LineChart
                xAxis={[{ data: Array.from({ length: 20 }, (_, i) => i + 1) }]}
                series={[{ data: chartKalorie }]}
                width={500}
                height={300}
              />
            </div>
          </div>
        </div>
        <LogInfo />
      </div>
    </div>
  );
};

export default Calories;
