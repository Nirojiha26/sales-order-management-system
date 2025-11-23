import React from "react";

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps {
  label?: string;
  value: string | number | undefined;
  options: SelectOption[];
  onChange: (value: string | number) => void;
  disabled?: boolean;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  value,
  options,
  onChange,
  disabled = false,
  className = ""
}) => {
  return (
    <div className="flex flex-col w-full gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      <select
        value={value ?? ""}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`border rounded-md px-3 py-2 text-sm outline-none
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          ${className}`}
      >
        <option value="">Select…</option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
