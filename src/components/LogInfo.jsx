import React, { useState } from "react";
import Modal from "@mui/material/Modal";

const LogInfo = ({ onMealAdded }) => {
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

      await sendNutritionData(result.items); 
      setOpen(false);
      
      if (onMealAdded) { 
        onMealAdded();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const sendNutritionData = async (data) => {
    try {
      const response = await fetch(
        "https://kolarva23.sps-prosek.cz/api/server.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ items: data }),
        }
      );

      const result = await response.json();
      if (result.status === "success") {
        return result;
      }
    } catch (error) {
      return null;
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
                placeholder="Enter meal size and name(100g of chicken)"
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
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LogInfo;
