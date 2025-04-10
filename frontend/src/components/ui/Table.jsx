// src/components/ui/Table.jsx
import React from 'react';

export const Table = ({ children }) => (
  <div className="overflow-auto rounded shadow-sm">
    <table className="min-w-full border border-gray-300">{children}</table>
  </div>
);

export const TableHeader = ({ children }) => (
  <thead className="bg-gray-100">{children}</thead>
);

export const TableBody = ({ children }) => (
  <tbody className="divide-y divide-gray-200">{children}</tbody>
);

export const TableRow = ({ children, ...props }) => (
  <tr {...props} className="hover:bg-gray-50 cursor-pointer">{children}</tr>
);

export const TableCell = ({ children }) => (
  <td className="px-4 py-2 border border-gray-200">{children}</td>
);
