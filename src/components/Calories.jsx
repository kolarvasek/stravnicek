import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import Modal from "@mui/material/Modal";
import Navbar from "../components/Navbar";
import $ from "jquery";



const Calories = () => {
  const [kalorie, setKalorie] = useState(0);
  const [chartKalorie, setChartKalorie] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [inputSearch, setInputSearch] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [fats, setFats] = useState("");
  const [sugar, setSugar] = useState("");

  useEffect(() => {
    setChartKalorie([kalorie]);
  }, [kalorie]);

  const handleAddMeal = () => {
    const mealData = {
      mealName: inputSearch,
      calories: parseFloat(calories) || 0,
      protein: parseFloat(protein) || 0,
      fats: parseFloat(fats) || 0,
      sugar: parseFloat(sugar) || 0,
    };
  };
  const [name, setName] = useState("");
  const [result, setResult] = useState("");

  const handleChange = (e) => {
    switch (e.target.name) {
      case "mealName":
        setInputSearch(e.target.value);
        break;
      case "calories":
        setCalories(e.target.value);
        break;
      case "protein":
        setProtein(e.target.value);
        break;
      case "fats":
        setFats(e.target.value);
        break;
      case "sugar":
        setSugar(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      const form = $(e.target);
      $.ajax({
          type: "POST",
          url: form.attr("action"),
          data: form.serialize(),
          success(data) {
              setResult(data);
          },
      });
  };

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
              <form action="http://localhost:3000/server.php" method="post" onSubmit={(event) => handleSubmit(event)}>
                <input
                  type="text"
                  name="mealName"
                  placeholder="Enter meal"
                  className="border border-gray-300 rounded-md p-2 mb-3 w-full"
                  onChange={(event) =>
                    handleChange(event)
                }
                />
                <input
                  type="number"
                  name="calories"
                  placeholder="Calories"
                  className="border border-gray-300 rounded-md p-2 mb-3 w-full"
                  onChange={(event) =>
                    handleChange(event)
                }
                />
                <input
                  type="number"
                  name="protein"
                  placeholder="Protein (g)"
                  className="border border-gray-300 rounded-md p-2 mb-3 w-full"
                  onChange={(event) =>
                    handleChange(event)
                }
                />
                <input
                  type="number"
                  name="fats"
                  placeholder="Fats (g)"
                  className="border border-gray-300 rounded-md p-2 mb-3 w-full"
                  onChange={(event) =>
                    handleChange(event)
                }
                />
                <input
                  type="number"
                  name="sugar"
                  placeholder="Sugar (g)"
                  className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                  onChange={(event) =>
                    handleChange(event)
                }
                />
                <button
                  onClick={() => {
                    handleAddMeal();
                    handleClose();
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg w-full transition duration-300"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Calories;
