import React from "react";

interface FieldProps {
  label: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  name: string;
  required?: boolean;
}

const Field: React.FC<FieldProps> = ({
  label,
  value,
  handleChange,
  type,
  name,
  required = false,
}) => {
  return (
    <div>
      <label>{label}:</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        required
      />
    </div>
  );
};

export default Field;
