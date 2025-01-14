import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { mealInfo } from "../components/Mealinfo";

const LogInfo = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [nutritionData, setNutritionData] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://api.calorieninjas.com/v1/nutrition?query=${inputSearch}`,
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

      await sendNutritionData(result.items); // backend
      setOpen(false);
    } catch (error) {
      console.error("error getting data", error);
    }
  };

  const sendNutritionData = async (data) => { // backend
    try {
      const response = await fetch(
        "http://localhost/stravnicek/php/server.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include credentials (cookies)
          body: JSON.stringify({ items: data }), // Convert value to JSON
        }
      );

      const text = await response.text();

      let parsedResponse;
      try { // json
        parsedResponse = JSON.parse(text);
        console.log(parsedResponse);
      } catch (error) {
        console.error("error with json", text);
      }
    } catch (error) {
      console.error("error to send data", error);
    }
  };

  return (
    <div>
      <div className="bttn flex justify-center mt-8">
        <button
          onClick={handleOpen}
          className="rounded-xl bg-blue-500 p-4 text-xl text-white hover:bg-blue-600 transition duration-300"
        >
          Add Meal
        </button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="flex justify-center items-center h-screen bg-black bg-opacity-50">
          <div className="bg-white text-black shadow-lg rounded-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Add a Meal
            </h2>
            <form onSubmit={handleSubmit} method="get">
              <input
                type="text"
                name="mealName"
                placeholder="Enter meal"
                className="border border-gray-300 rounded-md p-2 mb-3 w-full"
                onChange={(e) => setInputSearch(e.target.value)}
              />
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg w-full transition duration-300"
              >
                Submit
              </button>
            </form>
            {mealInfo(nutritionData)}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LogInfo;
