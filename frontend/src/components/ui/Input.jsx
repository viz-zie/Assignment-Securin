// src/components/ui/Input.jsx
import React from 'react';

export const Input = ({ placeholder, onChange, type = 'text' }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className="border border-gray-300 p-2 rounded w-full"
    />
  );
};
