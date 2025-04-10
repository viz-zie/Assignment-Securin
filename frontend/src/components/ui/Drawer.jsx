// src/components/ui/Drawer.jsx
import React from 'react';

export const Drawer = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex">
      <div className="w-2/5 bg-white shadow-xl p-4 overflow-y-auto">
        <button onClick={onClose} className="text-red-500 font-bold float-right">Close ✕</button>
        {children}
      </div>
      <div className="flex-1 bg-black/30" onClick={onClose}></div>
    </div>
  );
};
