import React from "react";

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-white shadow rounded-xl p-5 border border-gray-200">
      {children}
    </div>
  );
};

export default Card;
