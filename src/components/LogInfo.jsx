import React, {useState} from 'react'
import Modal from "@mui/material/Modal";

const LogInfo = () => {
    const [calories, setCalories] = useState("");
    const [protein, setProtein] = useState("");
    const [fats, setFats] = useState("");
    const [sugar, setSugar] = useState("");
    const [inputSearch, setInputSearch] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSubmit = (e) => {}
    const [open, setOpen] = useState(false);


    const fetchData = async () => {
        try {
            const response = await fetch(
              `http://localhost/stravnicek/php/server.php`
            );
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }


    const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
        case "mealName":
        setInputSearch(value);
        break;
        case "calories":
        setCalories(value);
        break;
        case "protein":
        setProtein(value);
        break;
        case "fats":
        setFats(value);
        break;
        case "sugar":
        setSugar(value);
        break;
        default:
        break;
    }
    };

  return (
    <div>
      <div className="bttn flex justify-center mt-8">
        <button
          onClick={handleOpen}
          className="rounded-xl bg-blue-500 p-4 text-xl text-white hover:bg-blue-670 transition duration-300"
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
                onChange={handleChange}
              />
              <input
                type="number"
                name="calories"
                placeholder="Calories"
                className="border border-gray-300 rounded-md p-2 mb-3 w-full"
                onChange={handleChange}
              />
              <input
                type="number"
                name="protein"
                placeholder="Protein (g)"
                className="border border-gray-300 rounded-md p-2 mb-3 w-full"
                onChange={handleChange}
              />
              <input
                type="number"
                name="fats"
                placeholder="Fats (g)"
                className="border border-gray-300 rounded-md p-2 mb-3 w-full"
                onChange={handleChange}
              />
              <input
                type="number"
                name="sugar"
                placeholder="Sugar (g)"
                className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                onChange={handleChange}
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
}

export default LogInfo