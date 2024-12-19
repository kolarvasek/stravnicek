import React from "react";

export const mealInfo = (nutritionData) => {
  return nutritionData ? (
    <div className="p-4">
      {nutritionData.items.map((item, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
          <ul className="text-gray-600">
            <li className="mt-2">
              <strong>Calories:</strong> {item.calories}
            </li>
            <li className="mt-2">
              <strong>Protein:</strong> {item.protein_g}g
            </li>
            <li className="mt-2">
              <strong>Carbs:</strong> {item.carbohydrates_total_g}g
            </li>
            <li className="mt-2">
              <strong>Fat:</strong> {item.fat_total_g}g
            </li>
          </ul>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-center text-gray-600">Waiting for meal...</p>
  );
};
