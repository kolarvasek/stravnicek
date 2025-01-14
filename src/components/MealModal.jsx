import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const MealModal = ({ meal, onClose, onDelete }) => (
  <Modal open={!!meal} onClose={onClose}>
    <Box sx={style}>
      <h3 className="text-xl mb-2">{meal.name}</h3>
      <p>Calories: {meal.calories}</p>
      <p>Protein: {meal.protein}</p>
      <p>Fats: {meal.fats}</p>
      <p>Sugar: {meal.sugar}</p>
      <p>Time: {meal.time}</p>
      <button
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        onClick={() => onDelete(meal.id)}
      >
        Delete
      </button>
    </Box>
  </Modal>
);

export default MealModal;
