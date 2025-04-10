// src/components/ui/Pagination.jsx
import React from 'react';

export const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange, onLimitChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex justify-between items-center mt-4">
      <div>
        <label className="mr-2">Results per page:</label>
        <select value={itemsPerPage} onChange={e => onLimitChange(Number(e.target.value))} className="border p-1 rounded">
          {[15, 25, 35, 50].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
      <div className="flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i + 1}
            className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white'}`}
            onClick={() => onPageChange(i + 1)}>{i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
