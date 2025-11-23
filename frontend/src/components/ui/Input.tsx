import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <div className="flex flex-col w-full gap-1">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <input
        {...props}
        className={`border rounded-md px-3 py-2 text-sm outline-none 
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
          ${props.className}`}
      />
    </div>
  );
};

export default Input;
