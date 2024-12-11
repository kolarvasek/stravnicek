import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import Navbar from "../components/Navbar";
import LogInfo from "../components/LogInfo";
import $ from "jquery";

const Calories = () => {
  const [kalorie, setKalorie] = useState(0);
  const [chartKalorie, setChartKalorie] = useState([]);
  useEffect(() => {
    setChartKalorie([kalorie]);
  }, [kalorie]);

  return (
    <div className="bg-gray-100 h-screen">
      <Navbar />
      <div className="pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-5">
          <div className="container shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out p-6 rounded-lg bg-slate-200 max-h-96">
            <h3 className="text-center text-2xl font-semibold text-gray-800 mb-4">
              Recent Meals
            </h3>
            <div className="scrollBox overflow-x-hidden overflow-y-auto max-h-72">
              <p className="text-center text-gray-600">Meals from database</p>
            </div>
          </div>
          <div className="container shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out p-6 rounded-lg bg-slate-200 max-h-96">
            <LineChart
              xAxis={[{ data: Array.from({ length: 20 }, (_, i) => i + 1) }]}
              series={[{ data: chartKalorie }]}
              width={500}
              height={300}
            />
          </div>
        </div>
        <LogInfo />
      </div>
    </div>
  );
};

export default Calories;
